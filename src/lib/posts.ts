
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
  .use(remarkRehype)
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
  
  const contentReact = (await processor.process(matterResult.content)).result as React.ReactElement;

  const readTime = calculateReadTime(matterResult.content);

  let summary = matterResult.data.excerpt;
  let tags: string[] = matterResult.data.tags || [];

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
