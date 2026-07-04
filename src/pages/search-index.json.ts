import { tools } from '../utils/tools';
import { faqs } from '../utils/faqs';

export async function GET() {
  const posts = Object.values(import.meta.glob('../content/blog/*.md', { eager: true })) as any[];

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
    ...posts.map(p => ({
      title: p.frontmatter.title,
      desc: p.frontmatter.metaDescription || p.frontmatter.description,
      url: `/blog/${p.frontmatter.slug}`,
      category: p.frontmatter.category || 'Tax Guides',
      type: 'article' as const,
      keywords: `${p.frontmatter.title} ${p.frontmatter.category || ''} ${p.frontmatter.metaDescription || ''}`.toLowerCase(),
      badge: p.frontmatter.readTime || ''
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
