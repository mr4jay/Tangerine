
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { summarizePost } from '@/ai/flows/summarize-post-flow';
import { extractTags } from '@/ai/flows/extract-tags-flow';
import { generatePost } from '@/ai/flows/generate-post-flow';
import { generateImage } from '@/ai/flows/generate-image-flow';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import React from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { CodeBlock } from '@/components/blog/code-block';
import { format } from 'date-fns';

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
  content?: string; // The raw markdown content
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
    if (!fileName.endsWith('.md')) continue;
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

  let matterResult = matter(fileContents);
  
  let summary = matterResult.data.excerpt;
  let tags: string[] = matterResult.data.tags || [];

  // AI-generate tags if they are missing
  if (!tags || tags.length === 0) {
    console.log(`Generating tags for ${slug}...`);
    const tagsResult = await extractTags({ content: matterResult.content });
    tags = tagsResult.tags;
  }

  // AI-generate content if it's missing or very short
  if (!matterResult.content || matterResult.content.trim().length < 50) {
      console.log(`Generating content for ${slug}...`);
      const { content } = await generatePost({ title: matterResult.data.title, tags });
      matterResult.content = content;
  }

  const contentReact = (await processor.process(matterResult.content)).result;
  const content = matterResult.content;

  const readTime = calculateReadTime(matterResult.content);

  // AI-generate summary if it's missing
  if (!summary) {
    console.log(`Generating summary for ${slug}...`);
    const summaryResult = await summarizePost({ content: matterResult.content });
    summary = summaryResult.summary;
  }

  return {
    slug,
    content,
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

// Function to create and save a new post file
export async function createPost(title: string, tags: string[]): Promise<{ slug: string }> {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (fs.existsSync(fullPath)) {
    throw new Error('A post with a similar title already exists.');
  }

  // 1. Generate content
  const { content } = await generatePost({ title, tags });

  // 2. Generate summary from content
  const { summary } = await summarizePost({ content });

  // 3. Generate image from title
  const { imageUrl } = await generateImage({ topic: title });

  // 4. Generate better tags from content
  const { tags: finalTags } = await extractTags({ content });

  const frontmatter = `---
title: '${title.replace(/'/g, "''")}'
excerpt: '${summary.replace(/'/g, "''")}'
imageUrl: '${imageUrl}'
aiHint: '${title.split(' ').slice(0, 2).join(' ').toLowerCase()}'
publishDate: '${format(new Date(), 'yyyy-MM-dd')}'
tags:
${finalTags.map(tag => `  - '${tag.replace(/'/g, "''")}'`).join('\n')}
---

${content}
`;

  fs.writeFileSync(fullPath, frontmatter, 'utf8');
  
  return { slug };
}
