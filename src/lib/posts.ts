import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { summarizePost } from '@/ai/flows/summarize-post-flow';
import { extractTags } from '@/ai/flows/extract-tags-flow';

const postsDirectory = path.join(process.cwd(), 'posts');

export type PostData = {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  aiHint: string;
  publishDate: string;
  tags: string[];
  readTime: number; // in minutes
  contentHtml?: string;
};

// Helper function to calculate reading time
const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return readTime;
};

export async function getSortedPostsData(): Promise<PostData[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const readTime = calculateReadTime(matterResult.content);

    // AI-generate the summary and tags
    let summary = matterResult.data.excerpt; // Fallback to excerpt
    let tags: string[] = matterResult.data.tags || []; // Fallback to frontmatter tags

    try {
      const [summaryResult, tagsResult] = await Promise.all([
        summarizePost({ content: matterResult.content }),
        extractTags({ content: matterResult.content })
      ]);
      summary = summaryResult.summary;
      tags = tagsResult.tags;
    } catch (error) {
        console.error(`Failed to generate AI content for ${slug}:`, error);
    }

    return {
      slug,
      excerpt: summary,
      tags,
      readTime,
      ...(matterResult.data as { 
        title: string; 
        imageUrl: string; 
        aiHint: string; 
        publishDate: string; 
      }),
    };
  }));

  return allPostsData.sort((a, b) => {
    if (a.publishDate < b.publishDate) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const readTime = calculateReadTime(matterResult.content);

  // AI-generate the summary and tags
  let summary = matterResult.data.excerpt; // Fallback to excerpt
  let tags: string[] = matterResult.data.tags || [];

  try {
      const [summaryResult, tagsResult] = await Promise.all([
        summarizePost({ content: matterResult.content }),
        extractTags({ content: matterResult.content })
      ]);
      summary = summaryResult.summary;
      tags = tagsResult.tags;
  } catch (error) {
      console.error(`Failed to generate AI content for ${slug}:`, error);
  }

  return {
    slug,
    contentHtml,
    excerpt: summary,
    tags,
    readTime,
    ...(matterResult.data as { 
        title: string; 
        imageUrl: string; 
        aiHint: string; 
        publishDate: string; 
      }),
  };
}
