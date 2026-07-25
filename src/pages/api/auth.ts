import type { APIRoute } from 'astro';

export const prerender = false;

function getEnv(locals: any): Record<string, string | undefined> {
  const env: Record<string, string | undefined> = {};

  try {
    if (import.meta && import.meta.env) {
      Object.assign(env, import.meta.env);
    }
  } catch {}

  try {
    if (typeof process !== 'undefined' && process.env) {
      Object.assign(env, process.env);
    }
  } catch {}

  try {
    if (locals && locals.runtime && locals.runtime.env) {
      Object.assign(env, locals.runtime.env);
    }
  } catch {}

  return env;
}

export const GET: APIRoute = async ({ locals }) => {
  const env = getEnv(locals);
  const clientId = env.GITHUB_CLIENT_ID;

  if (!clientId) {
    const errorHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Decap CMS Setup Needed</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; text-align: center; }
          .card { background: #1e293b; border-radius: 12px; padding: 32px; max-width: 480px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
          h2 { color: #38bdf8; margin-top: 0; }
          p { color: #94a3b8; line-height: 1.6; }
          code { background: #0f172a; color: #f43f5e; padding: 4px 8px; border-radius: 4px; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Configuration Required</h2>
          <p>Decap CMS GitHub OAuth requires <code>GITHUB_CLIENT_ID</code> and <code>GITHUB_CLIENT_SECRET</code> to be set in Cloudflare Worker environment/secrets.</p>
          <p>Please add these secrets in Cloudflare Dashboard (Workers &gt; Settings &gt; Variables &amp; Secrets) or run <code>npx wrangler secret put GITHUB_CLIENT_ID</code>.</p>
        </div>
      </body>
      </html>
    `;
    return new Response(errorHtml, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`;
  return Response.redirect(redirectUrl, 302);
};

