import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getAllPosts } from '../lib/blog';

/**
 * Converts any date value to a YYYY-MM-DD string safe for sitemaps.
 * WordPress can return "0000-00-00 00:00:00", Date objects, full ISO strings, etc.
 * Falls back to today's date if the value is missing or invalid.
 */
function toSitemapDate(raw: string | Date | null | undefined, fallback: string): string {
  if (!raw) return fallback;
  try {
    const d = raw instanceof Date ? raw : new Date(String(raw).trim());
    if (isNaN(d.getTime())) return fallback;
    const year = d.getUTCFullYear();
    // Reject absurd years (WordPress "0000-00-00" parses to year 0 or negative)
    if (year < 2000 || year > 2100) return fallback;
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
  } catch {
    return fallback;
  }
}

export const GET: APIRoute = async () => {
  const publishedBlogPosts = await getAllPosts();

  // Find latest blog post date to accurately represent the blog index freshness
  const latestBlogDate = publishedBlogPosts.length > 0
    ? toSitemapDate(publishedBlogPosts[0].modified || publishedBlogPosts[0].date, '2026-10-31')
    : '2026-10-31';

  const staticPages = [
    { url: 'https://gstcalculatoronline.in/', changefreq: 'daily', priority: '1.0', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/gst-calculator', changefreq: 'weekly', priority: '0.9', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/reverse-gst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/gst-inclusive-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/gst-exclusive-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/gst-split-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/igst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/gst-rate-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/gst-refund-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/late-fee-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/interest-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/composition-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/invoice-builder', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/gst-rate-finder', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/gst-profit-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/gst-discount-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/cgst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/sgst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/18-percent-gst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/12-percent-gst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/5-percent-gst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/28-percent-gst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/gst-formula', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/gst-rates', changefreq: 'weekly', priority: '0.8', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/blog', changefreq: 'daily', priority: '0.7', lastmod: latestBlogDate },
    { url: 'https://gstcalculatoronline.in/guides', changefreq: 'daily', priority: '0.7', lastmod: '2026-08-31' },
    { url: 'https://gstcalculatoronline.in/about', changefreq: 'monthly', priority: '0.6', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/contact', changefreq: 'monthly', priority: '0.5', lastmod: '2026-07-31' },
    { url: 'https://gstcalculatoronline.in/sitemap-page', changefreq: 'weekly', priority: '0.5', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/privacy-policy', changefreq: 'monthly', priority: '0.3', lastmod: '2026-07-31' },
    { url: 'https://gstcalculatoronline.in/terms-and-conditions', changefreq: 'monthly', priority: '0.3', lastmod: '2026-07-31' },
    { url: 'https://gstcalculatoronline.in/disclaimer', changefreq: 'monthly', priority: '0.3', lastmod: '2026-07-31' },
    { url: 'https://gstcalculatoronline.in/editorial-policy', changefreq: 'monthly', priority: '0.3', lastmod: '2026-10-31' },
  ];

  const dynamicBlogPages = publishedBlogPosts.map((post) => {
    const cleanSlug = post.slug.toLowerCase().replace(/^\/+|\/+$/g, '');
    return {
      url: `https://gstcalculatoronline.in/blog/${cleanSlug}`,
      changefreq: 'weekly' as const,
      priority: '0.6',
      lastmod: toSitemapDate(post.modified || post.date, '2026-07-26')
    };
  });

  const blogCategorySlugs = Array.from(new Set(
    publishedBlogPosts.map((post) => post.category.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''))
  ));

  const blogCategoryPages = blogCategorySlugs.map((slug) => {
    const postsInCat = publishedBlogPosts.filter(p => p.category.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') === slug);
    const catLastMod = postsInCat.length > 0
      ? toSitemapDate(postsInCat[0].modified || postsInCat[0].date, '2026-07-26')
      : '2026-07-26';
    return {
      url: `https://gstcalculatoronline.in/blog/category/${slug}`,
      changefreq: 'weekly' as const,
      priority: '0.5',
      lastmod: catLastMod
    };
  });

  const allGuides = await getCollection('guides');
  const now = Date.now();
  const publishedGuides = allGuides.filter(g => {
    if (g.data.draft) return false;
    if (g.data.date && new Date(g.data.date).getTime() > now) return false;
    return true;
  });

  const dynamicGuidePages = publishedGuides.map((guide) => {
    const cleanGuideSlug = (guide.data.slug || guide.slug).toLowerCase().replace(/^\/+|\/+$/g, '');
    return {
      url: `https://gstcalculatoronline.in/guides/${cleanGuideSlug}`,
      changefreq: 'weekly' as const,
      priority: '0.6',
      lastmod: toSitemapDate(guide.data.lastUpdated || guide.data.date, '2026-08-31')
    };
  });

  const toolCategoryPages = [
    { url: 'https://gstcalculatoronline.in/category/tax-slabs', changefreq: 'weekly', priority: '0.6', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/category/late-fees', changefreq: 'weekly', priority: '0.6', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/category/interest-penalties', changefreq: 'weekly', priority: '0.6', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/category/composition-scheme', changefreq: 'weekly', priority: '0.6', lastmod: '2026-10-31' },
    { url: 'https://gstcalculatoronline.in/category/utilities', changefreq: 'weekly', priority: '0.6', lastmod: '2026-10-31' },
  ];

  const pages = [
    ...staticPages,
    ...toolCategoryPages,
    ...dynamicBlogPages,
    ...blogCategoryPages,
    ...dynamicGuidePages,
  ];

  const seen = new Set<string>();
  const uniquePages = pages.filter(p => {
    if (seen.has(p.url)) return false;
    seen.add(p.url);
    return true;
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${uniquePages
    .map(
      (page) => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
};
