import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const robotsText = `User-agent: *
Allow: /
Disallow: /cdn-cgi/

# Block only internal API endpoints
Disallow: /search-index.json

# Sitemap location
Sitemap: https://gstcalculatoronline.in/sitemap.xml
Sitemap: https://gstcalculatoronline.in/sitemap-news.xml
`;

  return new Response(robotsText, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, must-revalidate',
    },
  });
};
