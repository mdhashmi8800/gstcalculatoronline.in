import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  const now = Date.now();

  const staticPages = [
    { url: 'https://gstcalculatoronline.in/', changefreq: 'daily', priority: '1.0', lastmod: today },
    { url: 'https://gstcalculatoronline.in/gst-calculator', changefreq: 'weekly', priority: '0.9', lastmod: today },
    { url: 'https://gstcalculatoronline.in/reverse-gst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/gst-inclusive-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/gst-exclusive-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/gst-split-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/igst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/gst-rate-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/gst-refund-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/late-fee-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/interest-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/composition-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/invoice-builder', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/gst-rate-finder', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/gst-profit-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/gst-discount-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/cgst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/sgst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/18-percent-gst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/12-percent-gst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/5-percent-gst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/28-percent-gst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/gst-formula', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/gst-rates', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/remove-gst-from-total', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/add-gst-to-price', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { url: 'https://gstcalculatoronline.in/blog', changefreq: 'daily', priority: '0.7', lastmod: today },
    { url: 'https://gstcalculatoronline.in/guides', changefreq: 'daily', priority: '0.7', lastmod: today },
    { url: 'https://gstcalculatoronline.in/about', changefreq: 'monthly', priority: '0.6', lastmod: today },
    { url: 'https://gstcalculatoronline.in/contact', changefreq: 'monthly', priority: '0.5', lastmod: today },
    { url: 'https://gstcalculatoronline.in/sitemap-page', changefreq: 'weekly', priority: '0.5', lastmod: today },
    { url: 'https://gstcalculatoronline.in/privacy-policy', changefreq: 'monthly', priority: '0.3', lastmod: today },
    { url: 'https://gstcalculatoronline.in/terms-and-conditions', changefreq: 'monthly', priority: '0.3', lastmod: today },
    { url: 'https://gstcalculatoronline.in/disclaimer', changefreq: 'monthly', priority: '0.3', lastmod: today },
    { url: 'https://gstcalculatoronline.in/editorial-policy', changefreq: 'monthly', priority: '0.3', lastmod: today },
  ];

  // Fetch published blog posts from content collection
  const allBlogPosts = await getCollection('blog');
  const publishedBlogPosts = allBlogPosts.filter(p => {
    if (p.data.draft) return false;
    if (p.data.date && new Date(p.data.date).getTime() > now) return false;
    return true;
  });

  const dynamicBlogPages = publishedBlogPosts.map((post) => ({
    url: `https://gstcalculatoronline.in/blog/${(post.data.slug || post.slug).toLowerCase()}`,
    changefreq: 'weekly',
    priority: '0.6',
    lastmod: post.data.lastUpdated || post.data.date || today
  }));

  // Fetch published guides from content collection
  const allGuides = await getCollection('guides');
  const publishedGuides = allGuides.filter(g => {
    if (g.data.draft) return false;
    if (g.data.date && new Date(g.data.date).getTime() > now) return false;
    return true;
  });

  const dynamicGuidePages = publishedGuides.map((guide) => ({
    url: `https://gstcalculatoronline.in/guides/${(guide.data.slug || guide.slug).toLowerCase()}`,
    changefreq: 'weekly',
    priority: '0.6',
    lastmod: guide.data.lastUpdated || guide.data.date || today
  }));

  // Helper to slugify category names
  const slugify = (text: string) => text.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  // Extract unique blog categories
  const blogCategorySet = new Set<string>();
  publishedBlogPosts.forEach((post) => {
    const cat = post.data.category || 'General';
    blogCategorySet.add(slugify(cat));
  });

  const dynamicBlogCategoryPages = Array.from(blogCategorySet).map((slug) => ({
    url: `https://gstcalculatoronline.in/blog/category/${slug}`,
    changefreq: 'weekly',
    priority: '0.5',
    lastmod: today
  }));

  // Static tool categories
  const toolCategoryPages = [
    { url: 'https://gstcalculatoronline.in/category/tax-slabs', changefreq: 'weekly', priority: '0.6', lastmod: today },
    { url: 'https://gstcalculatoronline.in/category/late-fees', changefreq: 'weekly', priority: '0.6', lastmod: today },
    { url: 'https://gstcalculatoronline.in/category/interest-penalties', changefreq: 'weekly', priority: '0.6', lastmod: today },
    { url: 'https://gstcalculatoronline.in/category/composition-scheme', changefreq: 'weekly', priority: '0.6', lastmod: today },
    { url: 'https://gstcalculatoronline.in/category/utilities', changefreq: 'weekly', priority: '0.6', lastmod: today },
  ];

  const pages = [
    ...staticPages, 
    ...toolCategoryPages, 
    ...dynamicBlogPages, 
    ...dynamicGuidePages, 
    ...dynamicBlogCategoryPages
  ];

  // Deduplicate URLs
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
