
import { MetadataRoute } from 'next'
import { getSortedPostsData } from '@/lib/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajay-kumar-portfolio.vercel.app';
  
  // Get all posts
  const posts = await getSortedPostsData();
  const postEntries: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Main pages
  const routes = ['', 'blog', '#about', '#projects', '#skills', '#certifications', '#contact'].map((route) => ({
    url: `${siteUrl}/${route.startsWith('#') ? '' : route}${route.startsWith('#') ? route : ''}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return [
    ...routes,
    ...postEntries,
  ]
}
