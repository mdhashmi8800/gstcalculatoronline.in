import { getCollection, type CollectionEntry } from 'astro:content';

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  description?: string;
  excerpt: string;
  date: string;
  modified: string;
  author: string;
  categories: string[];
  readTime?: string;
  category: string;
  draft?: boolean;
  relatedCalculators?: Array<{ name: string; url: string }>;
  relatedArticles?: Array<{ title: string; slug: string }>;
  suggestedArticles?: Array<{ title: string; slug: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  entry: CollectionEntry<'blog'>;
}

function mapEntry(entry: CollectionEntry<'blog'>): BlogPost {
  const data = entry.data;
  const slug = data.slug || entry.id;
  const date = String(data.date);
  const modified = String(data.lastUpdated || data.date);
  return {
    slug,
    title: data.title,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    description: data.description,
    excerpt: data.metaDescription || data.description || data.title,
    date,
    modified,
    author: data.author,
    categories: [data.category],
    readTime: data.readTime,
    category: data.category,
    draft: data.draft,
    relatedCalculators: data.relatedCalculators,
    relatedArticles: data.relatedArticles,
    suggestedArticles: data.suggestedArticles,
    faqs: data.faqs,
    entry,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const now = Date.now();
  const posts = await getCollection('blog');
  return posts
    .filter((p) => {
      if (import.meta.env.DEV) return true;
      if (p.data.draft) return false;
      if (p.data.date && new Date(String(p.data.date)).getTime() > now) return false;
      return true;
    })
    .map(mapEntry)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export interface PaginatedResult {
  posts: BlogPost[];
  total: number;
  totalPages: number;
  page: number;
}

export async function getPosts(page = 1, perPage = 9): Promise<PaginatedResult> {
  const all = await getAllPosts();
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  return {
    posts: all.slice(start, start + perPage),
    total,
    totalPages,
    page,
  };
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug) || null;
}

export async function getLatestPosts(count = 4): Promise<BlogPost[]> {
  const all = await getAllPosts();
  return all.slice(0, count);
}

export async function getRelatedPosts(currentSlug: string, count = 4): Promise<BlogPost[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.slug !== currentSlug).slice(0, count);
}

export async function getTotalPosts(): Promise<number> {
  const all = await getAllPosts();
  return all.length;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
