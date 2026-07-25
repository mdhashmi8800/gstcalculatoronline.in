import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const blogPosts = await getCollection('blog');
  const guides = await getCollection('guides');
  const now = Date.now();

  const publishedBlog = blogPosts.filter(p => {
    if (p.data.draft) return false;
    if (p.data.date && new Date(p.data.date).getTime() > now) return false;
    return true;
  });

  const publishedGuides = guides.filter(g => {
    if (g.data.draft) return false;
    if (g.data.date && new Date(g.data.date).getTime() > now) return false;
    return true;
  });

  const items = [
    ...publishedBlog.map(p => ({
      title: p.data.title,
      pubDate: new Date(p.data.date),
      description: p.data.metaDescription || p.data.description || p.data.title,
      link: `/blog/${p.data.slug || p.slug}`,
    })),
    ...publishedGuides.map(g => ({
      title: g.data.title,
      pubDate: new Date(g.data.date),
      description: g.data.metaDescription || g.data.title,
      link: `/guides/${g.data.slug || g.slug}`,
    }))
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'GST Calculator Online - Tax Guides & Blog',
    description: 'Expert GST calculators, return filing guides, tax rate updates, and legal compliance manuals for Indian businesses.',
    site: context.site || 'https://gstcalculatoronline.in',
    items,
    customData: `<language>en-in</language>`,
  });
};
