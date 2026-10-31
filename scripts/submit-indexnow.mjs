import fs from 'fs';
import path from 'path';

/**
 * Automated IndexNow Submission Script
 * Protocol: https://www.indexnow.org/documentation
 *
 * Automatically extracts canonical URLs from the built sitemap.xml and submits
 * them to the IndexNow API endpoints (api.indexnow.org and bing.com).
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs [--dry-run] [--endpoint=bing|indexnow]
 */

const HOST = 'gstcalculatoronline.in';
const KEY = 'f8a2c1d4e6b3a7f9c2e5d8b1a4f7c0e3';
const KEY_LOCATION = `https://${HOST}/f8a2c1d4e6b3a7f9c2e5d8b1a4f7c0e3.txt`;

const ENDPOINTS = {
  indexnow: 'https://api.indexnow.org/indexnow',
  bing: 'https://www.bing.com/indexnow',
};

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const endpointArg = args.find((a) => a.startsWith('--endpoint='));
const selectedEndpoint = endpointArg ? endpointArg.split('=')[1] : 'indexnow';
const targetEndpointUrl = ENDPOINTS[selectedEndpoint] || ENDPOINTS.indexnow;

// 1. Locate sitemap
const sitemapPaths = [
  path.resolve('dist/client/sitemap.xml'),
  path.resolve('dist/sitemap.xml'),
];

let sitemapXml = '';
for (const p of sitemapPaths) {
  if (fs.existsSync(p)) {
    sitemapXml = fs.readFileSync(p, 'utf-8');
    console.log(`[IndexNow] Found sitemap at: ${p}`);
    break;
  }
}

if (!sitemapXml) {
  console.error('[IndexNow] ERROR: Could not find built sitemap.xml. Run `npm run build` first.');
  process.exit(1);
}

// 2. Extract URLs from sitemap
const locRegex = /<loc>(https:\/\/gstcalculatoronline\.in[^<]*)<\/loc>/g;
const urlList = [];
let match;
while ((match = locRegex.exec(sitemapXml)) !== null) {
  const url = match[1].trim();
  // Ensure no admin, search, or pagination query URLs sneak in
  if (!url.includes('/admin') && !url.includes('/search') && !urlList.includes(url)) {
    urlList.push(url);
  }
}

console.log(`[IndexNow] Discovered ${urlList.length} canonical URLs for submission.`);

if (urlList.length === 0) {
  console.warn('[IndexNow] Warning: No valid URLs found in sitemap.');
  process.exit(0);
}

// 3. Prepare payload
const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList,
};

console.log(`[IndexNow] Host: ${HOST}`);
console.log(`[IndexNow] Key Location: ${KEY_LOCATION}`);
console.log(`[IndexNow] Target Endpoint: ${targetEndpointUrl}`);
console.log(`[IndexNow] Total URLs in batch: ${urlList.length}`);

if (isDryRun) {
  console.log('[IndexNow] [DRY RUN] Would submit payload:');
  console.log(JSON.stringify({ ...payload, urlList: urlList.slice(0, 5) }, null, 2));
  console.log(`... and ${urlList.length - 5} more URLs.`);
  console.log('[IndexNow] Dry run complete. No network request sent.');
  process.exit(0);
}

// 4. Send HTTP POST request
async function submitIndexNow() {
  console.log(`[IndexNow] Submitting ${urlList.length} URLs to ${targetEndpointUrl}...`);
  try {
    const response = await fetch(targetEndpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'GSTCalculatorOnline-IndexNow-Submitter/1.0',
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    const text = await response.text();

    console.log(`[IndexNow] Response HTTP Status: ${status}`);
    if (text) {
      console.log(`[IndexNow] Response Body: ${text}`);
    }

    if (status === 200) {
      console.log('[IndexNow] SUCCESS (200 OK): URLs submitted and accepted successfully.');
    } else if (status === 202) {
      console.log('[IndexNow] ACCEPTED (202 Accepted): URLs received. Key verification pending.');
    } else if (status === 400) {
      console.error('[IndexNow] ERROR (400 Bad Request): Invalid payload format.');
    } else if (status === 403) {
      console.error('[IndexNow] ERROR (403 Forbidden): Key not valid or key location unreachable.');
    } else if (status === 422) {
      console.error('[IndexNow] ERROR (422 Unprocessable Entity): URLs do not match host or key mismatch.');
    } else if (status === 429) {
      console.warn('[IndexNow] WARNING (429 Too Many Requests): Rate limit exceeded. Try again later.');
    } else {
      console.warn(`[IndexNow] HTTP ${status}: Check response details above.`);
    }
  } catch (error) {
    console.error('[IndexNow] Network Error:', error.message);
  }
}

submitIndexNow();

