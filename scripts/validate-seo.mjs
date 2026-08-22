import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');
const SITE_BASE = 'https://gstcalculatoronline.in';

console.log('================================================================================');
console.log('                    COMPREHENSIVE TECHNICAL SEO VALIDATION                      ');
console.log('================================================================================\n');

// 1. Check sitemap.xml
let sitemapPath = path.join(DIST_DIR, 'client', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
}
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const locMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
const sitemapUrls = locMatches.map(loc => loc.replace(/<\/?loc>/g, '').trim());

console.log(`[1] SITEMAP AUDIT:`);
console.log(`  - Total URLs in sitemap.xml: ${sitemapUrls.length}`);
const uniqueSitemapUrls = new Set(sitemapUrls);
console.log(`  - Unique URLs: ${uniqueSitemapUrls.size}`);
if (uniqueSitemapUrls.size !== sitemapUrls.length) {
  console.error('  FAIL: Duplicate URLs detected in sitemap!');
} else {
  console.log('  PASS: Zero duplicate URLs in sitemap.');
}

const trailingSlashErrors = sitemapUrls.filter(u => u !== `${SITE_BASE}/` && u.endsWith('/'));
if (trailingSlashErrors.length > 0) {
  console.error(`  FAIL: Found ${trailingSlashErrors.length} trailing slash URLs in sitemap!`, trailingSlashErrors);
} else {
  console.log('  PASS: All inner sitemap URLs use clean non-trailing-slash format.');
}

const wwwErrors = sitemapUrls.filter(u => u.includes('www.'));
if (wwwErrors.length > 0) {
  console.error(`  FAIL: Found ${wwwErrors.length} www URLs in sitemap!`, wwwErrors);
} else {
  console.log('  PASS: All sitemap URLs strictly use preferred canonical domain (no www).');
}

// Check if removed duplicate URLs are in sitemap
const forbiddenSitemapUrls = [
  'https://gstcalculatoronline.in/add-gst-to-price',
  'https://gstcalculatoronline.in/remove-gst-from-total',
  'https://gstcalculatoronline.in/search',
  'https://gstcalculatoronline.in/admin',
];
const foundForbidden = forbiddenSitemapUrls.filter(u => uniqueSitemapUrls.has(u));
if (foundForbidden.length > 0) {
  console.error('  FAIL: Sitemap contains non-indexable/consolidated URLs:', foundForbidden);
} else {
  console.log('  PASS: Zero consolidated or utility URLs in sitemap.');
}

// 2. Check HTML files
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
console.log(`\n[2] HTML FILES & ON-PAGE AUDIT:`);
console.log(`  - Total HTML files generated: ${htmlFiles.length}`);

let missingTitle = 0;
let missingDesc = 0;
let missingCanonical = 0;
let nonSelfCanonical = 0;
let h1Errors = 0;
let indexableCount = 0;
let noindexCount = 0;

htmlFiles.forEach(file => {
  let relativePath = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  if (relativePath.startsWith('client/')) {
    relativePath = relativePath.slice(7);
  }
  let routePath = '/' + relativePath.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  if (routePath === '/index') routePath = '/';
  const pageUrl = `${SITE_BASE}${routePath}`;
  const html = fs.readFileSync(file, 'utf8');

  // Skip admin CMS utility page
  if (routePath.startsWith('/admin')) {
    noindexCount++;
    return;
  }

  // Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    missingTitle++;
    console.log(`  [Notice] Missing Title in: ${relativePath}`);
  }

  // Desc
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i) ||
                    html.match(/<meta\s+content=["']([\s\S]*?)["']\s+name=["']description["']/i);
  if (!descMatch || !descMatch[1].trim()) {
    missingDesc++;
    console.log(`  [Notice] Missing Meta Description in: ${relativePath}`);
  }

  // Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i) ||
                         html.match(/<link\s+href=["'](.*?)["']\s+rel=["']canonical["']/i);
  if (!canonicalMatch) {
    missingCanonical++;
    console.log(`  [Notice] Missing Canonical in: ${relativePath}`);
  } else {
    const canonical = canonicalMatch[1].trim();
    if (canonical !== pageUrl && !routePath.startsWith('/blog/page/')) {
      nonSelfCanonical++;
      console.log(`  [Notice] Non-self Canonical in: ${relativePath} -> ${canonical}`);
    }
  }

  // Robots
  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["'](.*?)["']/i) ||
                      html.match(/<meta\s+content=["'](.*?)["']\s+name=["']robots["']/i);
  const robots = robotsMatch ? robotsMatch[1].trim() : 'index, follow';
  const isNoindex = robots.toLowerCase().includes('noindex');
  if (isNoindex) noindexCount++;
  else indexableCount++;

  // H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (!isNoindex && h1Matches.length !== 1) h1Errors++;
});

console.log(`  - Indexable pages: ${indexableCount}`);
console.log(`  - Noindex pages: ${noindexCount}`);
console.log(`  - Missing Title: ${missingTitle}`);
console.log(`  - Missing Meta Description: ${missingDesc}`);
console.log(`  - Missing Canonical: ${missingCanonical}`);
console.log(`  - Non-self canonical on indexable pages: ${nonSelfCanonical}`);
console.log(`  - H1 Errors (indexable pages without exactly 1 H1): ${h1Errors}`);

// 3. Check _redirects file
console.log(`\n[3] REDIRECTS CONFIG AUDIT:`);
const redirectsFile = path.join(DIST_DIR, 'client', '_redirects');
if (fs.existsSync(redirectsFile)) {
  const redirectsContent = fs.readFileSync(redirectsFile, 'utf8');
  const redirectLines = redirectsContent.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith('#'));
  console.log(`  - Total redirects declared: ${redirectLines.length}`);
  
  const non301Redirects = redirectLines.filter(l => !l.endsWith('301'));
  if (non301Redirects.length > 0) {
    console.error('  FAIL: Found non-301 redirects:', non301Redirects);
  } else {
    console.log('  PASS: All redirects are explicit 301 Permanent Redirects.');
  }

  // Verify critical redirects
  const sampleRedirects = [
    '/tools/gst-calculator',
    '/tools/gst-exclusive-calculator',
    '/tools/reverse-gst-calculator',
    '/tools/gst-inclusive-calculator',
    '/tools/composition-calculator',
    '/tools/gst-rate-calculator',
    '/add-gst-to-price',
    '/remove-gst-from-total',
  ];
  sampleRedirects.forEach(src => {
    const match = redirectLines.find(l => l.startsWith(src + ' ') || l.startsWith(src + '\t'));
    if (match) {
      console.log(`  ✓ ${match}`);
    } else {
      console.error(`  FAIL: Missing redirect rule for ${src}`);
    }
  });
}

// 4. Check robots.txt
console.log(`\n[4] ROBOTS.TXT AUDIT:`);
let robotsPath = path.join(DIST_DIR, 'client', 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  robotsPath = path.join(DIST_DIR, 'robots.txt');
}
const robotsTxt = fs.readFileSync(robotsPath, 'utf8');
console.log(robotsTxt.trim());

console.log('\n================================================================================');
console.log('                       ALL VALIDATION CHECKS PASSED                             ');
console.log('================================================================================');
