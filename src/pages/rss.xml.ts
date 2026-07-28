import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getAllPosts } from '../lib/wordpress';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const guides = await getCollection('guides');
  const now = Date.now();

  const publishedGuides = guides.filter(g => {
    if (g.data.draft) return false;
    if (g.data.date && new Date(g.data.date).getTime() > now) return false;
    return true;
  });

  let wpPosts: Array<{ title: string; pubDate: Date; description: string; link: string }> = [];
  try {
    const published = await getAllPosts();
    wpPosts = published.map(p => ({
      title: p.title,
      pubDate: new Date(p.date),
      description: p.excerpt || p.title,
      link: `/blog/${p.slug}`,
    }));
  } catch {
    // WordPress API unavailable; skip WP posts
  }

  const items = [
    ...wpPosts,
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
