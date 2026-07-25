import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const env = (locals as any).runtime?.env || process.env;
  const clientId = env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return new Response(
      'GITHUB_CLIENT_ID is not configured in Cloudflare Worker environment variables.',
      { status: 500 }
    );
  }

  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`;
  return Response.redirect(redirectUrl, 302);
};
