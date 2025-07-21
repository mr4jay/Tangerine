
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { summarizePost } from '@/ai/flows/summarize-post-flow';
import { extractTags } from '@/ai/flows/extract-tags-flow';
import { generatePost } from '@/ai/flows/generate-post-flow';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import React from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { CodeBlock } from '@/components/blog/code-block';
import { PostData, calculateReadTime } from './posts';

const postsDirectory = path.join(process.cwd(), 'posts');

// Helper function to add a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
      try {
        const summaryResult = await summarizePost({ content: matterResult.content });
        summary = summaryResult.summary;
        // Note: This won't save it back to the file, it's generated on-the-fly.
        await delay(1000); // Add a delay to avoid hitting rate limits
      } catch (e) {
        console.error(`Failed to generate summary for ${slug}:`, e);
        summary = "Could not generate summary.";
      }
    }

    // AI-generate tags if they are missing
    if (!tags || tags.length === 0) {
        console.log(`Generating tags for ${slug}...`);
        try {
            const tagsResult = await extractTags({ content: matterResult.content });
            tags = tagsResult.tags;
            await delay(1000); // Add a delay to avoid hitting rate limits
        } catch(e) {
            console.error(`Failed to generate tags for ${slug}:`, e);
            tags = [];
        }
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
    try {
        const tagsResult = await extractTags({ content: matterResult.content });
        tags = tagsResult.tags;
    } catch (e) {
        console.error(`Failed to generate tags for ${slug}:`, e);
        tags = [];
    }
  }

  // AI-generate content if it's missing or very short
  if (!matterResult.content || matterResult.content.trim().length < 50) {
      console.log(`Generating content for ${slug}...`);
      try {
        const { content } = await generatePost({ title: matterResult.data.title, tags });
        matterResult.content = content;
      } catch(e) {
        console.error(`Failed to generate content for ${slug}:`, e);
        matterResult.content = "Could not generate content.";
      }
  }

  const contentReact = (await processor.process(matterResult.content)).result;
  const content = matterResult.content;

  const readTime = calculateReadTime(matterResult.content);

  // AI-generate summary if it's missing
  if (!summary) {
    console.log(`Generating summary for ${slug}...`);
    try {
        const summaryResult = await summarizePost({ content: matterResult.content });
        summary = summaryResult.summary;
    } catch (e) {
        console.error(`Failed to generate summary for ${slug}:`, e);
        summary = "Could not generate summary.";
    }
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
