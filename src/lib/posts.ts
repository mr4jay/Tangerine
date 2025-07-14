import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { summarizePost } from '@/ai/flows/summarize-post-flow';

const postsDirectory = path.join(process.cwd(), 'posts');

export type PostData = {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  aiHint: string;
  publishDate: string;
  contentHtml?: string;
};

export async function getSortedPostsData(): Promise<PostData[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // AI-generate the summary instead of using the static excerpt
    let summary = matterResult.data.excerpt; // Fallback to excerpt
    try {
      const summaryResult = await summarizePost({ content: matterResult.content });
      summary = summaryResult.summary;
    } catch (error) {
        console.error(`Failed to generate summary for ${slug}:`, error);
        // Fallback to the static excerpt if AI fails
    }

    return {
      slug,
      excerpt: summary,
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

  // AI-generate the summary instead of using the static excerpt
  let summary = matterResult.data.excerpt; // Fallback to excerpt
  try {
      const summaryResult = await summarizePost({ content: matterResult.content });
      summary = summaryResult.summary;
  } catch (error) {
      console.error(`Failed to generate summary for ${slug}:`, error);
      // Fallback to the static excerpt if AI fails
  }

  return {
    slug,
    contentHtml,
    excerpt: summary,
    ...(matterResult.data as { 
        title: string; 
        imageUrl: string; 
        aiHint: string; 
        publishDate: string; 
      }),
  };
}
