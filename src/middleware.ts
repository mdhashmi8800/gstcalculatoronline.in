import { defineMiddleware } from 'astro:middleware';

const TOOLS_REDIRECT_MAP: Record<string, string> = {
  '/tools': '/',
  '/tools/gst-calculator': '/gst-calculator',
  '/tools/reverse-gst-calculator': '/reverse-gst-calculator',
  '/tools/gst-inclusive-calculator': '/gst-inclusive-calculator',
  '/tools/gst-exclusive-calculator': '/gst-exclusive-calculator',
  '/tools/gst-split-calculator': '/gst-split-calculator',
  '/tools/igst-calculator': '/igst-calculator',
  '/tools/gst-rate-calculator': '/gst-rate-calculator',
  '/tools/gst-refund-calculator': '/gst-refund-calculator',
  '/tools/late-fee-calculator': '/late-fee-calculator',
  '/tools/interest-calculator': '/interest-calculator',
  '/tools/composition-calculator': '/composition-calculator',
  '/tools/invoice-builder': '/invoice-builder',
  '/tools/gst-rate-finder': '/gst-rate-finder',
  '/tools/category/tax-slabs': '/category/tax-slabs',
  '/tools/category/late-fees': '/category/late-fees',
  '/tools/category/interest-penalties': '/category/interest-penalties',
  '/tools/category/composition-scheme': '/category/composition-scheme',
  '/tools/category/utilities': '/category/utilities',
};

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

  // 3. Handle legacy /tools paths directly in 1 hop (with or without trailing slash)
  if (targetPath.startsWith('/tools')) {
    const cleanToolsPath = (targetPath.length > 1 && targetPath.endsWith('/'))
      ? targetPath.slice(0, -1)
      : targetPath;

    const mappedTarget = TOOLS_REDIRECT_MAP[cleanToolsPath] || '/';
    return context.redirect(`https://${targetHost}${mappedTarget}${url.search}`, 301);
  }

  // 4. Admin CMS passthrough with host/scheme canonicalisation
  if (targetPath.startsWith('/admin')) {
    if (redirectNeeded) {
      return context.redirect(`https://${targetHost}${targetPath}${url.search}`, 301);
    }
    return next();
  }

  // 5. Redirect trailing slashes to non-trailing-slash URLs (except root '/').
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

