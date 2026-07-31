import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  // Resolve the protocol the client actually used. Cloudflare exposes it via
  // x-forwarded-proto; fall back to the request URL scheme.
  const forwardedProto = context.request.headers.get('x-forwarded-proto') || '';
  const incomingProto = (forwardedProto === 'http' || forwardedProto === 'https')
    ? forwardedProto
    : url.protocol.replace(':', '');

  let redirectNeeded = false;
  let targetHost = url.host;
  let targetPath = url.pathname;

  // 1. Force HTTPS with a permanent (301) redirect so http:// never serves content.
  if (incomingProto !== 'https') {
    redirectNeeded = true;
  }

  // 2. Canonicalise host: redirect www -> non-www.
  if (targetHost.startsWith('www.')) {
    targetHost = targetHost.replace(/^www\./, '');
    redirectNeeded = true;
  }

  // Admin CMS and legacy /tools routes must still get scheme/host canonicalisation,
  // but keep their existing passthrough for everything else.
  if (targetPath.startsWith('/admin') || targetPath.startsWith('/tools')) {
    if (redirectNeeded) {
      return context.redirect(`https://${targetHost}${targetPath}${url.search}`, 301);
    }
    return next();
  }

  // 3. Redirect trailing slashes to non-trailing-slash URLs (except root '/').
  if (targetPath.length > 1 && targetPath.endsWith('/')) {
    targetPath = targetPath.slice(0, -1);
    redirectNeeded = true;
  }

  if (redirectNeeded) {
    const destination = `https://${targetHost}${targetPath}${url.search}`;
    return context.redirect(destination, 301);
  }

  return next();
});
