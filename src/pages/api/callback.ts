import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ locals, url }) => {
  const code = url.searchParams.get('code');
  if (!code) {
    return new Response('Missing code parameter in authorization callback.', { status: 400 });
  }

  const env = (locals as any).runtime?.env || process.env;
  const clientId = env.GITHUB_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response('GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is missing.', { status: 500 });
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = (await response.json()) as { access_token?: string; error?: string };

    if (!data.access_token) {
      return new Response(`OAuth Error: ${data.error || 'Failed to exchange authorization code'}`, { status: 400 });
    }

    const payload = JSON.stringify({ token: data.access_token, provider: 'github' });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Authorizing Decap CMS...</title>
      </head>
      <body>
        <p>Logging into Decap CMS...</p>
        <script>
          (function() {
            function receiveMessage(e) {
              console.log("Decap OAuth handshake received message:", e);
              window.opener.postMessage(
                'authorization:github:success:${payload}',
                e.origin
              );
            }
            window.addEventListener("message", receiveMessage, false);
            window.opener.postMessage("authorizing:github", "*");
          })();
        </script>
      </body>
      </html>
    `;

    return new Response(htmlContent, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err: any) {
    return new Response(`OAuth Server Error: ${err.message}`, { status: 500 });
  }
};
