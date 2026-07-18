import type { APIRoute } from 'astro';

const staticPages = [
  { url: 'https://gstcalculatoronline.in/', changefreq: 'daily', priority: '1.0', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/gst-calculator', changefreq: 'weekly', priority: '0.9', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/reverse-gst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/gst-inclusive-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/gst-exclusive-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/gst-split-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/igst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/gst-rate-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/gst-refund-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/late-fee-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/interest-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/composition-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/invoice-builder', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/gst-rate-finder', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/gst-profit-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/gst-discount-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/cgst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/sgst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/18-percent-gst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/12-percent-gst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/5-percent-gst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/28-percent-gst-calculator', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/gst-formula', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/gst-rates', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/remove-gst-from-total', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/add-gst-to-price', changefreq: 'weekly', priority: '0.8', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/blog', changefreq: 'weekly', priority: '0.7', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/about', changefreq: 'monthly', priority: '0.6', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/contact', changefreq: 'monthly', priority: '0.5', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/sitemap-page', changefreq: 'monthly', priority: '0.5', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/search', changefreq: 'monthly', priority: '0.4', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/privacy-policy', changefreq: 'monthly', priority: '0.3', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/terms-and-conditions', changefreq: 'monthly', priority: '0.3', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/disclaimer', changefreq: 'monthly', priority: '0.3', lastmod: '2026-07-18' },
  { url: 'https://gstcalculatoronline.in/editorial-policy', changefreq: 'monthly', priority: '0.3', lastmod: '2026-07-18' },
];

export const GET: APIRoute = async () => {
  // Fetch blog posts dynamically during build
  const postFiles = import.meta.glob('../content/blog/*.md', { eager: true });

  const dynamicBlogPages = Object.values(postFiles).map((post: any) => ({
    url: `https://gstcalculatoronline.in/blog/${post.frontmatter.slug.toLowerCase()}`,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: post.frontmatter.lastUpdated || post.frontmatter.date || '2026-07-18'
  }));

  // Helper to slugify category names (must match blog/category/[category].astro slugify)
  const slugify = (text: string) => text.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  // Extract ONLY unique blog categories that actually exist in blog posts
  const blogCategorySet = new Set<string>();
  Object.values(postFiles).forEach((post: any) => {
    const cat = post.frontmatter.category || 'General';
    blogCategorySet.add(slugify(cat));
  });

  const dynamicBlogCategoryPages = Array.from(blogCategorySet).map((slug) => ({
    url: `https://gstcalculatoronline.in/blog/category/${slug}`,
    changefreq: 'weekly',
    priority: '0.5',
    lastmod: '2026-07-18'
  }));

  // Static tool categories
  const toolCategoryPages = [
    { url: 'https://gstcalculatoronline.in/category/tax-slabs', changefreq: 'weekly', priority: '0.6', lastmod: '2026-07-18' },
    { url: 'https://gstcalculatoronline.in/category/late-fees', changefreq: 'weekly', priority: '0.6', lastmod: '2026-07-18' },
    { url: 'https://gstcalculatoronline.in/category/interest-penalties', changefreq: 'weekly', priority: '0.6', lastmod: '2026-07-18' },
    { url: 'https://gstcalculatoronline.in/category/composition-scheme', changefreq: 'weekly', priority: '0.6', lastmod: '2026-07-18' },
    { url: 'https://gstcalculatoronline.in/category/utilities', changefreq: 'weekly', priority: '0.6', lastmod: '2026-07-18' },
  ];

  const pages = [...staticPages, ...toolCategoryPages, ...dynamicBlogPages, ...dynamicBlogCategoryPages];

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
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, must-revalidate',
    },
  });
};
