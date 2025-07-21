
'use server';

// This file is renamed to avoid naming conflicts with the original resume.ts
// It is explicitly marked as a server component.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const resumePath = path.join(process.cwd(), 'resume.md');

export async function getResumeData() {
  const fileContents = fs.readFileSync(resumePath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    ...matterResult.data,
  };
}
