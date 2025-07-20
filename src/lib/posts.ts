
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { summarizePost } from '@/ai/flows/summarize-post-flow';
import { extractTags } from '@/ai/flows/extract-tags-flow';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import React from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { CodeBlock } from '@/components/blog/code-block';

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
  contentReact?: React.ReactElement;
};

// Helper function to add a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to calculate reading time
const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return readTime;
};

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeReact, {
    Fragment: React.Fragment,
    jsx: jsx,
    jsxs: jsxs,
    components: {
      pre: CodeBlock,
    },
  });

export async function getSortedPostsData(): Promise<PostData[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData: PostData[] = [];

  for (const fileName of fileNames) {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const readTime = calculateReadTime(matterResult.content);

    let summary = matterResult.data.excerpt;
    let tags: string[] = matterResult.data.tags || [];

    // AI-generate summary if it's missing
    if (!summary) {
      console.log(`Generating summary for ${slug}...`);
      const summaryResult = await summarizePost({ content: matterResult.content });
      summary = summaryResult.summary;
      // Note: This won't save it back to the file, it's generated on-the-fly.
      await delay(1000); // Add a delay to avoid hitting rate limits
    }

    // AI-generate tags if they are missing
    if (!tags || tags.length === 0) {
        console.log(`Generating tags for ${slug}...`);
        const tagsResult = await extractTags({ content: matterResult.content });
        tags = tagsResult.tags;
        await delay(1000); // Add a delay to avoid hitting rate limits
    }
    
    allPostsData.push({
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
    });
  }


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

export async function getPostData(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
   if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  
  const contentReact = (await processor.process(matterResult.content)).result;

  const readTime = calculateReadTime(matterResult.content);

  let summary = matterResult.data.excerpt;
  let tags: string[] = matterResult.data.tags || [];

  // AI-generate summary if it's missing
  if (!summary) {
    console.log(`Generating summary for ${slug}...`);
    const summaryResult = await summarizePost({ content: matterResult.content });
    summary = summaryResult.summary;
  }

  // AI-generate tags if they are missing
  if (!tags || tags.length === 0) {
    console.log(`Generating tags for ${slug}...`);
    const tagsResult = await extractTags({ content: matterResult.content });
    tags = tagsResult.tags;
  }

  return {
    slug,
    contentReact,
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
