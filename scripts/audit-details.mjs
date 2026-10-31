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
console.log('Auditing', htmlFiles.length, 'HTML files...\n');

const titles = [];
const missingAlts = [];
const missingDescs = [];
const imagesFound = [];

htmlFiles.forEach(file => {
  let relativePath = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  if (relativePath.startsWith('client/')) relativePath = relativePath.slice(7);
  let routePath = '/' + relativePath.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  if (routePath === '/index') routePath = '/';

  const html = fs.readFileSync(file, 'utf8');

  // Title
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  let rawTitle = titleMatch ? titleMatch[1].trim() : '';
  const decodedTitle = rawTitle
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  titles.push({ route: routePath, title: decodedTitle, length: decodedTitle.length });

  // Desc
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i) ||
                    html.match(/<meta\s+content=["'](.*?)["']\s+name=["']description["']/i);
  if (!descMatch || !descMatch[1].trim()) {
    missingDescs.push(routePath);
  }

  // Images
  const imgMatches = [...html.matchAll(/<img\b([^>]*)>/gi)];
  imgMatches.forEach(m => {
    const imgTag = m[0];
    const attrs = m[1];
    imagesFound.push({ route: routePath, tag: imgTag });
    // check alt
    const hasAlt = /alt\s*=\s*["'][^"']*["']/i.test(attrs) || /alt\s*=\s*""/i.test(attrs) || /alt\s*=\s*''/i.test(attrs);
    if (!hasAlt) {
      missingAlts.push({ route: routePath, img: imgTag });
    }
  });
});

console.log('--- MISSING DESCRIPTIONS ---');
console.log(missingDescs);

console.log('\n--- TOTAL IMAGES FOUND ---', imagesFound.length);
console.log('--- IMAGES MISSING ALT ATTRIBUTE ---', missingAlts.length);
missingAlts.forEach(m => console.log(m));

console.log('\n--- ALL TITLES LONGER THAN 60 CHARS ---');
const longTitles = titles.filter(t => t.length > 60).sort((a, b) => b.length - a.length);
console.log(`Found ${longTitles.length} titles longer than 60 characters:`);
longTitles.forEach((t, i) => {
  console.log(`${i+1}. [${t.length} chars] ${t.route} -> "${t.title}"`);
});

console.log('\n--- TARGET LANDING PAGES (Phase 3 & 4) ---');
const targetPages = [
  '/',
  '/18-percent-gst-calculator',
  '/reverse-gst-calculator',
  '/gst-split-calculator',
  '/gst-inclusive-calculator',
  '/gst-calculator',
  '/gst-discount-calculator',
  '/gst-refund-calculator',
  '/interest-calculator',
  '/gst-rates',
];
targetPages.forEach(p => {
  const item = titles.find(t => t.route === p);
  if (item) {
    console.log(`[${item.length} chars] ${p}: "${item.title}"`);
  } else {
    console.log(`NOT FOUND: ${p}`);
  }
});

