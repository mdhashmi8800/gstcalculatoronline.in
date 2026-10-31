import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const htmlFiles = getAllHtmlFiles(DIST_DIR);
const validRoutes = new Set();

htmlFiles.forEach(file => {
  let relativePath = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  if (relativePath.startsWith('client/')) relativePath = relativePath.slice(7);
  let routePath = '/' + relativePath.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  if (routePath === '/index') routePath = '/';
  validRoutes.add(routePath);
});

// Also add static files
if (fs.existsSync(path.join(DIST_DIR, 'client', 'sitemap.xml')) || fs.existsSync(path.join(DIST_DIR, 'sitemap.xml'))) validRoutes.add('/sitemap.xml');
if (fs.existsSync(path.join(DIST_DIR, 'client', 'robots.txt')) || fs.existsSync(path.join(DIST_DIR, 'robots.txt'))) validRoutes.add('/robots.txt');
if (fs.existsSync(path.join(DIST_DIR, 'client', 'rss.xml')) || fs.existsSync(path.join(DIST_DIR, 'rss.xml'))) validRoutes.add('/rss.xml');

// Add all public static files & assets
function addStaticFiles(dir, prefix = '') {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      addStaticFiles(filePath, `${prefix}/${file}`);
    } else {
      validRoutes.add(`${prefix}/${file}`);
    }
  });
}
addStaticFiles(path.resolve('public'));
addStaticFiles(path.join(DIST_DIR, 'client', '_astro'), '/_astro');


console.log(`Found ${validRoutes.size} valid local routes.`);

const brokenLinks = [];
const redirectLinks = [];

// Known redirects in astro.config.mjs
const redirects = new Set([
  '/tools',
  '/tools/gst-calculator',
  '/tools/reverse-gst-calculator',
  '/tools/gst-inclusive-calculator',
  '/tools/gst-exclusive-calculator',
  '/tools/add-gst-to-price',
  '/tools/remove-gst-from-total',
  '/tools/gst-split-calculator',
  '/tools/cgst-calculator',
  '/tools/sgst-calculator',
  '/tools/igst-calculator',
  '/tools/5-percent-gst-calculator',
  '/tools/12-percent-gst-calculator',
  '/tools/18-percent-gst-calculator',
  '/tools/28-percent-gst-calculator',
  '/tools/gst-rate-calculator',
  '/tools/gst-refund-calculator',
  '/tools/late-fee-calculator',
  '/tools/interest-calculator',
  '/tools/composition-calculator',
  '/tools/invoice-builder',
  '/tools/gst-rate-finder',
  '/tools/gst-profit-calculator',
  '/tools/gst-discount-calculator',
  '/tools/gst-formula',
  '/tools/gst-rates',
  '/tools/category/tax-slabs',
  '/tools/category/late-fees',
  '/tools/category/interest-penalties',
  '/tools/category/composition-scheme',
  '/tools/category/utilities',
  '/add-gst-to-price',
  '/remove-gst-from-total',
  '/blog/page/1',
  '/blog/gst-in-india-vs-sales-tax-in-usa-key-differences-explained',
  '/blog/gst-in-india-vs-sales-tax-in-usa-—-key-differences-explained',
]);

htmlFiles.forEach(file => {
  let relativePath = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  if (relativePath.startsWith('client/')) relativePath = relativePath.slice(7);
  let pageRoute = '/' + relativePath.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  if (pageRoute === '/index') pageRoute = '/';

  const html = fs.readFileSync(file, 'utf8');
  const hrefMatches = [...html.matchAll(/href=["']([^"'#?]+)(?:[#?][^"']*)?["']/gi)];

  hrefMatches.forEach(m => {
    let href = m[1].trim();
    if (href.startsWith('https://gstcalculatoronline.in')) {
      href = href.replace('https://gstcalculatoronline.in', '') || '/';
    }
    if (!href.startsWith('/')) return; // external or anchor
    if (href.startsWith('//')) return; // protocol-relative

    // normalize trailing slash
    let clean = href.endsWith('/') && href.length > 1 ? href.slice(0, -1) : href;

    if (redirects.has(clean) || redirects.has(href)) {
      redirectLinks.push({ fromPage: pageRoute, target: href });
    } else if (!validRoutes.has(clean) && !validRoutes.has(href)) {
      brokenLinks.push({ fromPage: pageRoute, target: href });
    }
  });
});

console.log('\n--- BROKEN INTERNAL LINKS (Pointing to 404) ---');
console.log('Count:', brokenLinks.length);
brokenLinks.forEach(b => console.log(`${b.fromPage} -> ${b.target}`));

console.log('\n--- INTERNAL LINKS POINTING TO REDIRECTS ---');
console.log('Count:', redirectLinks.length);
redirectLinks.forEach(r => console.log(`${r.fromPage} -> ${r.target}`));

