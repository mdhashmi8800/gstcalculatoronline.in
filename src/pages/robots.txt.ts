import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const robotsText = `User-agent: *
Allow: /
Disallow: /search
Disallow: /search?

Sitemap: https://gstcalculatoronline.in/sitemap.xml
`;

  return new Response(robotsText, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, must-revalidate',
    },
  });
};
