const WP_API_BASE = import.meta.env.PUBLIC_WP_API_URL
  ? `${import.meta.env.PUBLIC_WP_API_URL}/wp-json/wp/v2`
  : 'https://cms.bestfinancetool.com/wp-json/wp/v2';

const cache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL = 10 * 60 * 1000;

async function fetchWP<T>(url: string, skipCache = false): Promise<{ data: T; headers?: Headers }> {
  if (!skipCache) {
    const cached = cache.get(url);
    if (cached && cached.expiry > Date.now()) {
      return { data: cached.data };
    }
  }

  const response = await fetch(url, {
    headers: { 'User-Agent': 'gstcalculatoronline.in' },
  });

  if (!response.ok) {
    throw new Error(`WordPress API error ${response.status}: ${response.statusText} for ${url}`);
  }

  const data = await response.json();
  cache.set(url, { data, expiry: Date.now() + CACHE_TTL });
  return { data, headers: response.headers };
}

let cachedCategoryId: number | null = null;

async function getCategoryId(): Promise<number> {
  if (cachedCategoryId) return cachedCategoryId;
  const { data } = await fetchWP<Array<{ id: number }>>(
    `${WP_API_BASE}/categories?slug=gst-calculator&_fields=id`
  );
  if (!data || data.length === 0) {
    throw new Error('WordPress category "GST Calculator" not found');
  }
  cachedCategoryId = data[0].id;
  return cachedCategoryId;
}

export interface WPHeading {
  depth: number;
  slug: string;
  text: string;
}

export interface WPPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage: string | null;
  featuredImageAlt: string;
  author: string;
  categories: string[];
  link: string;
  headings: WPHeading[];
}

interface WPRawEmbeddedAuthor {
  name: string;
  avatar_urls?: Record<string, string>;
}

interface WPRawEmbeddedTerm {
  name: string;
  slug: string;
}

interface WPRawEmbeddedMedia {
  source_url: string;
  alt_text: string;
}

interface WPRawPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  link: string;
  _embedded?: {
    author?: WPRawEmbeddedAuthor[];
    'wp:term'?: WPRawEmbeddedTerm[][];
    'wp:featuredmedia'?: WPRawEmbeddedMedia[];
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractHeadings(html: string): WPHeading[] {
  const headingRegex = /<h([2-3])([^>]*)>([\s\S]*?)<\/h\1>/gi;
  const headings: WPHeading[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(html)) !== null) {
    const depth = parseInt(match[1]);
    const text = match[3].replace(/<[^>]*>/g, '').trim();
    if (text) {
      headings.push({ depth, slug: slugify(text), text });
    }
  }
  return headings;
}

function mapPost(post: WPRawPost): WPPost {
  const name = post._embedded?.author?.[0]?.name || 'Anonymous';
  const excerpt = post.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() || '';
  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const imageAlt = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || '';
  const terms = post._embedded?.['wp:term']?.flat()?.map(t => t.name) || [];

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    content: post.content.rendered,
    excerpt,
    date: post.date,
    modified: post.modified,
    featuredImage: image,
    featuredImageAlt: imageAlt,
    author: name,
    categories: terms.length > 0 ? terms : ['GST Calculator'],
    link: post.link,
    headings: extractHeadings(post.content.rendered),
  };
}

export interface PaginatedResult {
  posts: WPPost[];
  total: number;
  totalPages: number;
  page: number;
}

export async function getPosts(page = 1, perPage = 9): Promise<PaginatedResult> {
  const catId = await getCategoryId();
  const url = `${WP_API_BASE}/posts?categories=${catId}&_embed&page=${page}&per_page=${perPage}&_fields=id,slug,title,content,excerpt,date,modified,link,_embedded`;

  const { data, headers } = await fetchWP<WPRawPost[]>(url);
  const total = parseInt(headers?.get('X-WP-Total') || '0');
  const totalPages = parseInt(headers?.get('X-WP-TotalPages') || '0');

  return {
    posts: data.map(mapPost),
    total,
    totalPages,
    page,
  };
}

export async function getAllPosts(): Promise<WPPost[]> {
  const catId = await getCategoryId();
  const url = `${WP_API_BASE}/posts?categories=${catId}&_embed&per_page=100&_fields=id,slug,title,content,excerpt,date,modified,link,_embedded`;
  const { data } = await fetchWP<WPRawPost[]>(url);
  return data.map(mapPost);
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const catId = await getCategoryId();
  const url = `${WP_API_BASE}/posts?categories=${catId}&slug=${slug}&_embed&_fields=id,slug,title,content,excerpt,date,modified,link,_embedded`;
  try {
    const { data } = await fetchWP<WPRawPost[]>(url);
    if (!data || data.length === 0) return null;
    return mapPost(data[0]);
  } catch {
    return null;
  }
}

export async function getLatestPosts(count = 4): Promise<WPPost[]> {
  const all = await getAllPosts();
  return all.slice(0, count);
}

export async function getRelatedPosts(currentSlug: string, count = 4): Promise<WPPost[]> {
  const all = await getAllPosts();
  return all.filter(p => p.slug !== currentSlug).slice(0, count);
}

export async function getTotalPosts(): Promise<number> {
  const catId = await getCategoryId();
  const url = `${WP_API_BASE}/posts?categories=${catId}&per_page=1&_fields=id`;
  const { headers } = await fetchWP<unknown[]>(url);
  return parseInt(headers?.get('X-WP-Total') || '0');
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
