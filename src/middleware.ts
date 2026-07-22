import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  let redirectNeeded = false;
  let targetHost = url.host;
  let targetPath = url.pathname;

  // 1. Redirect www to non-www
  if (targetHost.startsWith('www.')) {
    targetHost = targetHost.replace(/^www\./, '');
    redirectNeeded = true;
  }

  // 2. Redirect trailing slashes to non-trailing slashes (except root '/')
  if (targetPath.length > 1 && targetPath.endsWith('/')) {
    targetPath = targetPath.slice(0, -1);
    redirectNeeded = true;
  }

  if (redirectNeeded) {
    const destination = `${url.protocol}//${targetHost}${targetPath}${url.search}`;
    return context.redirect(destination, 301);
  }

  return next();
});
