import { defineMiddleware } from 'astro:middleware';

const REDIRECT_MAP: Record<string, string> = {
  '/tools': '/',
  '/tools/gst-calculator': '/gst-calculator',
  '/tools/reverse-gst-calculator': '/reverse-gst-calculator',
  '/tools/gst-inclusive-calculator': '/gst-inclusive-calculator',
  '/tools/gst-exclusive-calculator': '/gst-exclusive-calculator',
  '/tools/add-gst-to-price': '/gst-exclusive-calculator',
  '/tools/remove-gst-from-total': '/reverse-gst-calculator',
  '/tools/gst-split-calculator': '/gst-split-calculator',
  '/tools/cgst-calculator': '/cgst-calculator',
  '/tools/sgst-calculator': '/sgst-calculator',
  '/tools/igst-calculator': '/igst-calculator',
  '/tools/5-percent-gst-calculator': '/5-percent-gst-calculator',
  '/tools/12-percent-gst-calculator': '/12-percent-gst-calculator',
  '/tools/18-percent-gst-calculator': '/18-percent-gst-calculator',
  '/tools/28-percent-gst-calculator': '/28-percent-gst-calculator',
  '/tools/gst-rate-calculator': '/gst-rate-calculator',
  '/tools/gst-refund-calculator': '/gst-refund-calculator',
  '/tools/late-fee-calculator': '/late-fee-calculator',
  '/tools/interest-calculator': '/interest-calculator',
  '/tools/composition-calculator': '/composition-calculator',
  '/tools/invoice-builder': '/invoice-builder',
  '/tools/gst-rate-finder': '/gst-rate-finder',
  '/tools/gst-profit-calculator': '/gst-profit-calculator',
  '/tools/gst-discount-calculator': '/gst-discount-calculator',
  '/tools/gst-formula': '/gst-formula',
  '/tools/gst-rates': '/gst-rates',
  '/tools/category/tax-slabs': '/category/tax-slabs',
  '/tools/category/late-fees': '/category/late-fees',
  '/tools/category/interest-penalties': '/category/interest-penalties',
  '/tools/category/composition-scheme': '/category/composition-scheme',
  '/tools/category/utilities': '/category/utilities',
  '/add-gst-to-price': '/gst-exclusive-calculator',
  '/remove-gst-from-total': '/reverse-gst-calculator',
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

  // 3. Admin CMS passthrough with host/scheme canonicalisation
  if (targetPath.startsWith('/admin')) {
    if (redirectNeeded) {
      return context.redirect(`https://${targetHost}${targetPath}${url.search}`, 301);
    }
    return next();
  }

  // 4. Normalize trailing slash for path lookup (except root '/')
  const cleanPath = (targetPath.length > 1 && targetPath.endsWith('/'))
    ? targetPath.slice(0, -1)
    : targetPath;

  if (cleanPath !== targetPath) {
    targetPath = cleanPath;
    redirectNeeded = true;
  }

  // 5. Handle direct legacy or consolidated route mappings
  if (REDIRECT_MAP[targetPath]) {
    targetPath = REDIRECT_MAP[targetPath];
    redirectNeeded = true;
  } else if (targetPath.startsWith('/tools')) {
    targetPath = '/';
    redirectNeeded = true;
  }

  if (redirectNeeded) {
    const destination = `https://${targetHost}${targetPath}${url.search}`;
    return context.redirect(destination, 301);
  }

  return next();
});


