import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');
const SITE_BASE = 'https://gstcalculatoronline.in';

if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

// Read sitemap.xml
let sitemapPath = path.join(DIST_DIR, 'client', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
}
let sitemapUrls = new Set();
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const locMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
  locMatches.forEach(loc => {
    const url = loc.replace(/<\/?loc>/g, '').trim();
    sitemapUrls.add(url);
  });
}

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

const auditResults = [];

htmlFiles.forEach(file => {
  let relativePath = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  if (relativePath.startsWith('client/')) {
    relativePath = relativePath.slice(7);
  }
  
  // Calculate relative route URL
  let routePath = '/' + relativePath.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  if (routePath === '/index') routePath = '/';
  
  const pageUrl = `${SITE_BASE}${routePath}`;
  const html = fs.readFileSync(file, 'utf8');

  // Extract Title
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'MISSING';

  // Extract Meta Description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i) ||
                    html.match(/<meta\s+content=["'](.*?)["']\s+name=["']description["']/i);
  const description = descMatch ? descMatch[1].trim() : 'MISSING';

  // Extract Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i) ||
                         html.match(/<link\s+href=["'](.*?)["']\s+rel=["']canonical["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : 'MISSING';

  // Extract Robots
  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["'](.*?)["']/i) ||
                      html.match(/<meta\s+content=["'](.*?)["']\s+name=["']robots["']/i);
  const robots = robotsMatch ? robotsMatch[1].trim() : 'index, follow';
  const isNoindex = robots.toLowerCase().includes('noindex');

  // Extract H1s
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const h1Count = h1Matches.length;

  // Extract Internal Links
  const internalLinkMatches = html.match(/href=["'](\/[^"']*|https:\/\/gstcalculatoronline\.in[^"']*)["']/g) || [];

  // Categorize Page Type
  let pageType = 'Static Page';
  if (routePath === '/') pageType = 'Homepage';
  else if (routePath.startsWith('/blog/category/')) pageType = 'Blog Category';
  else if (routePath.startsWith('/blog/page/')) pageType = 'Blog Pagination';
  else if (routePath.startsWith('/blog/')) pageType = 'Blog Post';
  else if (routePath.startsWith('/category/')) pageType = 'Tool Category';
  else if (routePath.startsWith('/guides/')) pageType = 'Guide';
  else if (routePath.endsWith('-calculator') || routePath.includes('calculator') || routePath.includes('builder') || routePath.includes('finder')) pageType = 'Calculator Tool';
  else if (routePath === '/search' || routePath === '/admin' || routePath === '/404') pageType = 'Utility / Admin';

  const inSitemap = sitemapUrls.has(pageUrl);
  const isSelfCanonical = (canonical === pageUrl);

  auditResults.push({
    file: relativePath,
    url: pageUrl,
    pageType,
    indexable: !isNoindex,
    canonical,
    isSelfCanonical,
    sitemap: inSitemap,
    title,
    description,
    h1Count,
    internalLinksCount: internalLinkMatches.length,
  });
});

console.log('================================================================================');
console.log('                          SEO AUDIT RESULT SUMMARY                              ');
console.log('================================================================================\n');

const totalUrls = auditResults.length;
const indexableUrls = auditResults.filter(r => r.indexable).length;
const noindexUrls = auditResults.filter(r => !r.indexable).length;
const canonicalizedUrls = auditResults.filter(r => !r.isSelfCanonical).length;
const sitemapUrlsCount = auditResults.filter(r => r.sitemap).length;
const missingTitleCount = auditResults.filter(r => r.title === 'MISSING').length;
const missingDescCount = auditResults.filter(r => r.description === 'MISSING').length;
const h1IssueCount = auditResults.filter(r => r.indexable && r.h1Count !== 1).length;

console.log(`Total HTML Pages Generated: ${totalUrls}`);
console.log(`Indexable Pages (index, follow): ${indexableUrls}`);
console.log(`Noindex Pages (noindex): ${noindexUrls}`);
console.log(`Self-Canonical Pages: ${auditResults.filter(r => r.isSelfCanonical).length}`);
console.log(`Canonicalized (Non-Self) Pages: ${canonicalizedUrls}`);
console.log(`Pages Included in Sitemap.xml: ${sitemapUrlsCount}`);
console.log(`Sitemap Total URLs in XML: ${sitemapUrls.size}`);
console.log(`Missing Title Count: ${missingTitleCount}`);
console.log(`Missing Description Count: ${missingDescCount}`);
console.log(`H1 Issues (Indexable pages not having exactly 1 H1): ${h1IssueCount}\n`);

console.log('--------------------------------------------------------------------------------');
console.log('PAGE DETAILS TABLE');
console.log('--------------------------------------------------------------------------------');
console.log('| URL | Page Type | Indexable? | Self Canonical? | Sitemap? | H1 Count |');
console.log('| --- | --------- | ---------- | --------------- | -------- | -------- |');

auditResults.forEach(r => {
  console.log(`| ${r.url} | ${r.pageType} | ${r.indexable ? 'YES' : 'NO'} | ${r.isSelfCanonical ? 'YES' : 'NO (' + r.canonical + ')'} | ${r.sitemap ? 'YES' : 'NO'} | ${r.h1Count} |`);
});
