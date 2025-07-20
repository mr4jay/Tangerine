
import { getPostData, getSortedPostsData, PostData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ClientBlogContent from './client-blog-content';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

// This is now a pure Server Component.
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);
  if (!post) {
    notFound();
  }
  const allPosts = await getSortedPostsData();

  return (
    <>
      <Header />
      <ClientBlogContent post={post} allPosts={allPosts} />
      <Footer />
    </>
  );
}


// Note: generateMetadata and generateStaticParams must remain in a server context.
// Next.js is smart enough to handle this separation. We just can't have them in the final client component.
// The functions below will NOT be part of the client bundle.

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostData(params.slug);
  if (!post) {
    return {};
  }
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
      type: 'article',
      publishedTime: post.publishDate,
      authors: ['Rajure Ajay Kumar'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}

export async function generateStaticParams() {
  const allPosts = await getSortedPostsData();
  const paths = allPosts.map(p => ({ slug: p.slug }));
  return paths;
}
