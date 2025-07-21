
'use server';

import fs from 'fs';
import path from 'path';
import { generatePost } from '@/ai/flows/generate-post-flow';
import { summarizePost } from '@/ai/flows/summarize-post-flow';
import { extractTags } from '@/ai/flows/extract-tags-flow';
import { generateImage } from '@/ai/flows/generate-image-flow';
import { format } from 'date-fns';

const postsDirectory = path.join(process.cwd(), 'posts');

// Function to create and save a new post file
export async function createPostAction(title: string, tags: string[]): Promise<{ slug: string }> {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (fs.existsSync(fullPath)) {
    throw new Error('A post with a similar title already exists.');
  }

  // Helper function to add a delay to avoid hitting potential rate limits on the AI service
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // 1. Generate content
  const { content } = await generatePost({ title, tags });
  await delay(1000);

  // 2. Generate summary from content
  const { summary } = await summarizePost({ content });
  await delay(1000);

  // 3. Generate better tags from content
  const { tags: finalTags } = await extractTags({ content });
  await delay(1000);

  // 4. Generate image from title and refined tags
  const { imageUrl } = await generateImage({ topic: title, tags: finalTags });

  const frontmatter = `---
title: '${title.replace(/'/g, "''")}'
excerpt: '${summary.replace(/'/g, "''")}'
imageUrl: '${imageUrl}'
aiHint: '${finalTags.slice(0, 2).join(' ').toLowerCase()}'
publishDate: '${format(new Date(), 'yyyy-MM-dd')}'
tags:
${finalTags.map(tag => `  - '${tag.replace(/'/g, "''")}'`).join('\n')}
---

${content}
`;

  fs.writeFileSync(fullPath, frontmatter, 'utf8');
  
  return { slug };
}
