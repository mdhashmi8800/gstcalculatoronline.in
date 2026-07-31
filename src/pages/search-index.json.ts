import { tools } from '../utils/tools';
import { faqs } from '../utils/faqs';
import { getCollection } from 'astro:content';
import { getAllPosts } from '../lib/blog';

export async function GET() {
  const now = Date.now();

  const guides = await getCollection('guides');
  const publishedGuides = guides.filter(g => {
    if (g.data.draft) return false;
    if (g.data.date && new Date(g.data.date).getTime() > now) return false;
    return true;
  });

  let wpPosts: Array<{ title: string; desc: string; url: string; category: string; type: 'article'; keywords: string; badge: string }> = [];
  try {
    const published = await getAllPosts();
    wpPosts = published.map(p => ({
      title: p.title,
      desc: p.excerpt || p.title,
      url: `/blog/${p.slug}`,
      category: p.categories[0] || 'Tax Guides',
      type: 'article' as const,
      keywords: `${p.title} ${p.categories.join(' ')} ${p.excerpt}`.toLowerCase(),
      badge: ''
    }));
  } catch {
    // WordPress API unavailable
  }

  const searchItems = [
    ...tools.map(t => ({
      title: t.name,
      desc: t.desc,
      url: t.url,
      category: t.categoryName,
      type: 'tool' as const,
      keywords: t.keywords.toLowerCase(),
      badge: t.badge || ''
    })),

    ...wpPosts,

    ...publishedGuides.map(g => ({
      title: g.data.title,
      desc: g.data.metaDescription || g.data.title,
      url: `/guides/${g.data.slug || g.slug}`,
      category: g.data.category || 'Compliance Manuals',
      type: 'guide' as const,
      keywords: `${g.data.title} ${g.data.category || ''} ${g.data.metaDescription || ''}`.toLowerCase(),
      badge: g.data.readTime || ''
    })),

    ...faqs.map(f => ({
      title: f.question,
      desc: f.answer,
      url: f.url,
      category: f.category,
      type: 'faq' as const,
      keywords: `${f.question} ${f.answer} ${f.category} faq`.toLowerCase(),
      badge: 'FAQ'
    }))
  ];

  return new Response(JSON.stringify(searchItems), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}