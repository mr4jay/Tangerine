
import React from 'react';

// This file contains only types and client-safe utility functions.
// All file-system and server-only logic has been moved to posts-server.ts or actions.

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

// Helper function to calculate reading time
export const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return readTime;
};
