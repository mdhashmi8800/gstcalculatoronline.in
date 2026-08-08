import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const robotsText = `User-agent: *
Allow: /
Disallow: /cdn-cgi/
Disallow: /admin
Disallow: /admin/
Disallow: /search
Disallow: /search-index.json

# Sitemap location
Sitemap: https://gstcalculatoronline.in/sitemap.xml
`;

  return new Response(robotsText, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, must-revalidate',
    },
  });
};
