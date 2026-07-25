import { tools } from '../utils/tools';
import { faqs } from '../utils/faqs';
import { getCollection } from 'astro:content';

export async function GET() {
  const now = Date.now();

  const blogPosts = await getCollection('blog');
  const publishedBlog = blogPosts.filter(p => {
    if (p.data.draft) return false;
    if (p.data.date && new Date(p.data.date).getTime() > now) return false;
    return true;
  });

  const guides = await getCollection('guides');
  const publishedGuides = guides.filter(g => {
    if (g.data.draft) return false;
    if (g.data.date && new Date(g.data.date).getTime() > now) return false;
    return true;
  });

  const searchItems = [
    // Tools
    ...tools.map(t => ({
      title: t.name,
      desc: t.desc,
      url: t.url,
      category: t.categoryName,
      type: 'tool' as const,
      keywords: t.keywords.toLowerCase(),
      badge: t.badge || ''
    })),

    // Blog posts
    ...publishedBlog.map(p => ({
      title: p.data.title,
      desc: p.data.metaDescription || p.data.description || p.data.title,
      url: `/blog/${p.data.slug || p.slug}`,
      category: p.data.category || 'Tax Guides',
      type: 'article' as const,
      keywords: `${p.data.title} ${p.data.category || ''} ${p.data.metaDescription || ''}`.toLowerCase(),
      badge: p.data.readTime || ''
    })),

    // Guides
    ...publishedGuides.map(g => ({
      title: g.data.title,
      desc: g.data.metaDescription || g.data.title,
      url: `/guides/${g.data.slug || g.slug}`,
      category: g.data.category || 'Compliance Manuals',
      type: 'guide' as const,
      keywords: `${g.data.title} ${g.data.category || ''} ${g.data.metaDescription || ''}`.toLowerCase(),
      badge: g.data.readTime || ''
    })),

    // FAQs
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
