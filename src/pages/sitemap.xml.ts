import type { APIRoute } from 'astro';

const staticPages = [
  { url: 'https://gstcalculatoronline.in/', changefreq: 'daily', priority: '1.0' },
  { url: 'https://gstcalculatoronline.in/tools', changefreq: 'weekly', priority: '0.9' },
  { url: 'https://gstcalculatoronline.in/tools/gst-calculator', changefreq: 'weekly', priority: '0.9' },
  { url: 'https://gstcalculatoronline.in/tools/reverse-gst-calculator', changefreq: 'weekly', priority: '0.8' },
  { url: 'https://gstcalculatoronline.in/tools/gst-inclusive-calculator', changefreq: 'weekly', priority: '0.8' },
  { url: 'https://gstcalculatoronline.in/tools/gst-exclusive-calculator', changefreq: 'weekly', priority: '0.8' },
  { url: 'https://gstcalculatoronline.in/tools/gst-split-calculator', changefreq: 'weekly', priority: '0.8' },
  { url: 'https://gstcalculatoronline.in/tools/igst-calculator', changefreq: 'weekly', priority: '0.8' },
  { url: 'https://gstcalculatoronline.in/tools/gst-rate-calculator', changefreq: 'weekly', priority: '0.8' },
  { url: 'https://gstcalculatoronline.in/tools/gst-refund-calculator', changefreq: 'weekly', priority: '0.8' },
  { url: 'https://gstcalculatoronline.in/tools/late-fee-calculator', changefreq: 'weekly', priority: '0.8' },
  { url: 'https://gstcalculatoronline.in/tools/interest-calculator', changefreq: 'weekly', priority: '0.8' },
  { url: 'https://gstcalculatoronline.in/tools/composition-calculator', changefreq: 'weekly', priority: '0.8' },
  { url: 'https://gstcalculatoronline.in/blog', changefreq: 'weekly', priority: '0.7' },
  { url: 'https://gstcalculatoronline.in/about', changefreq: 'monthly', priority: '0.5' },
  { url: 'https://gstcalculatoronline.in/contact', changefreq: 'monthly', priority: '0.5' },
  { url: 'https://gstcalculatoronline.in/privacy-policy', changefreq: 'monthly', priority: '0.3' },
  { url: 'https://gstcalculatoronline.in/terms-and-conditions', changefreq: 'monthly', priority: '0.3' },
  { url: 'https://gstcalculatoronline.in/disclaimer', changefreq: 'monthly', priority: '0.3' },
];

export const GET: APIRoute = async () => {
  const currentDate = new Date().toISOString().split('T')[0];

  // Fetch blog posts dynamically during build
  const postFiles = import.meta.glob('../content/blog/*.md', { eager: true });
  const dynamicBlogPages = Object.values(postFiles).map((post: any) => ({
    url: `https://gstcalculatoronline.in/blog/${post.frontmatter.slug}`,
    changefreq: 'monthly',
    priority: '0.6'
  }));

  const pages = [...staticPages, ...dynamicBlogPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
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
