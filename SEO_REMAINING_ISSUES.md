# External SEO Verification & Post-Deployment Action Plan

**Target Domain:** `https://gstcalculatoronline.in/`  
**Report Date:** October 31, 2026  
**Status:** Codebase Implementation Complete — Awaiting Deployment & Search Engine Recrawl

---

## 1. Overview of Remaining Post-Deployment Tasks

All internal architectural, technical, mathematical, schema, and metadata issues identified in the codebase audit have been resolved and verified via automated test suites.

However, search engine indexation, ranking changes, and crawl statistics operate asynchronously within external Google and Bing infrastructure. The tasks in this document cannot be executed inside the local code repository and require webmaster action following deployment to Cloudflare Pages.

---

## 2. Immediate Post-Deployment Action Items

### Action 1: Execute IndexNow API Batch Submission
Once the updated build is deployed to production:
1. Open terminal with outbound internet access.
2. Run the newly created automation script:
   ```bash
   node scripts/submit-indexnow.mjs
   ```
3. Verify that the response returns `HTTP 200 OK` or `HTTP 202 Accepted`. This instantly notifies Bing, Yandex, Seznam, and IndexNow partner crawlers to fetch all 90 refreshed canonical URLs.

---

### Action 2: Google Search Console (GSC) Recrawl & Validation

1. **Submit XML Sitemap:**
   - Navigate to **Indexing > Sitemaps** in GSC.
   - Resubmit `https://gstcalculatoronline.in/sitemap.xml`.
   - Confirm status shows "Success" with 90 discovered pages.

2. **Trigger "Page with redirect" Validation:**
   - Go to **Indexing > Pages > Page with redirect** (71 reported URLs).
   - Click **Validate Fix**. Googlebot will verify that intermediate hops and temporary redirects have been resolved to permanent 301 edge redirects.

3. **Verify Resolution of the 404 URL:**
   - Go to **Indexing > Pages > Not found (404)** (1 reported URL: `/blog/page`).
   - Click **Validate Fix**. Googlebot will confirm `/blog/page` now issues an HTTP 301 redirect to `/blog`.

4. **URL Inspection & Priority Recrawl:**
   - Submit priority landing pages in the URL Inspection Tool and click **Request Indexing**:
     - `https://gstcalculatoronline.in/` (Homepage)
     - `https://gstcalculatoronline.in/18-percent-gst-calculator`
     - `https://gstcalculatoronline.in/reverse-gst-calculator`
     - `https://gstcalculatoronline.in/gst-split-calculator`
     - `https://gstcalculatoronline.in/gst-inclusive-calculator`
     - `https://gstcalculatoronline.in/gst-calculator`
     - `https://gstcalculatoronline.in/interest-calculator`
     - `https://gstcalculatoronline.in/gst-rates`

---

### Action 3: Bing Webmaster Tools Actions

1. **Submit Updated Sitemap:**
   - Go to **Sitemaps** in Bing Webmaster Tools.
   - Resubmit `https://gstcalculatoronline.in/sitemap.xml`.

2. **Verify Title Tag Audit Fixes:**
   - Navigate to **SEO Reports**.
   - Note the previous warning: *"10 pages have overly long title tags"*.
   - Run an on-demand site scan to verify that all 97 pages now have titles `<= 60 characters`.

3. **Verify Image Alt Attribute Resolution:**
   - Check the warning: *"1 image is missing ALT"*.
   - Confirm the fix on `/blog/gst-in-india-vs-sales-tax-in-usa-key-differences-explained`.

---

## 3. Ongoing Monitoring & Crawl Health Cadence

### Week 1 – 2 (Post-Deployment Crawl Verification)
- **Crawl Stats (GSC):**
  - Verify that HTTP 302 responses decline toward 0% and HTTP 200 responses rise above 90%.
  - Verify that median crawl response time remains below 100 ms.
- **Index Status:**
  - Track progression of "Crawled - currently not indexed" (24 URLs) and "Discovered - currently not indexed" (6 URLs) moving into the valid Indexed inventory.

### Month 1 – 3 (CTR & SERP Snippet Optimization)
- Monitor organic CTR across Google and Bing for the revised target titles and meta descriptions:
  - Homepage CTR (baseline: 0.36% on Bing, 0.28% on Google Desktop).
  - Reverse GST Calculator CTR (baseline: 0.25% on Bing).
  - 18% GST Calculator CTR (baseline: 2.61% on Bing).

### Month 3 – 12 (Off-Page Authority & Backlink Building)
- Execute the 6-pillar outreach campaign outlined in `SEO_BACKLINK_STRATEGY.md`:
  - Launch embeddable widget for external accounting blogs.
  - Distribute MSME Excel GST invoice templates.
  - Submit tools to software directories (Product Hunt, AlternativeTo).
  - Publish technical tax case studies on CA community portals.

---

## 4. Summary Table of Issue Status

| Issue Category | Technical Scope | Resolution Status | Required Post-Deploy Action |
| :--- | :--- | :--- | :--- |
| **Cloudflare Edge 302s** | Edge routing configuration | **Fixed in Codebase** | Monitor GSC Crawl Stats after deploy |
| **GSC 404 URL** | Breadcrumb link + missing route | **Fixed in Codebase** | Click "Validate Fix" in GSC |
| **Missing Image ALT** | Blog post markdown | **Fixed in Codebase** | Run Bing on-demand SEO scan |
| **Titles > 60 Chars** | Blog frontmatter & template | **Fixed in Codebase** | Verify SERP snippet refresh |
| **Missing Meta Description** | Admin route template | **Fixed in Codebase** | Resolved internally |
| **Dynamic Sitemap Lastmod** | Sitemap API generator | **Fixed in Codebase** | Resubmit sitemap in GSC & Bing |
| **Robots.txt Crawling** | robots.txt API route | **Fixed in Codebase** | Verified valid |
| **Statutory Interest Rules** | E-E-A-T & calculator accuracy | **Fixed in Codebase** | Accurate content live |
| **IndexNow Submissions** | Automated submission script | **Engine Built** | Run `node scripts/submit-indexnow.mjs` |
| **Backlink Deficiency** | Off-page authority | **Strategy Built** | Execute outreach roadmap |

