
import { MetadataRoute } from 'next'
import { getSortedPostsData } from '@/lib/posts'
import { getProjects } from '@/lib/projects'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const posts = await getSortedPostsData();
  const postEntries: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const projects = getProjects();
  const projectEntries: MetadataRoute.Sitemap = projects.map(project => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const routes = ['', '/about', '/blog', '/resume'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));

  return [
    ...routes,
    ...postEntries,
    ...projectEntries,
  ]
}
