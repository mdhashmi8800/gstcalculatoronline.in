# Website Canonical URL & Redirect Map

**Domain:** `https://gstcalculatoronline.in/`  
**Protocol:** HTTPS  
**Canonical Hostname:** Non-WWW (`https://gstcalculatoronline.in`)  
**Canonical Path Format:** Strict non-trailing slash (except root `/`)  
**Generated Date:** October 31, 2026

---

## 1. URL Architecture Standards

Every URL on `gstcalculatoronline.in` adheres to the following protocol:
1. **HTTPS Enforcement:** Any non-secure `http://` request is upgraded via edge 301 to `https://`.
2. **Non-WWW Enforcement:** `www.gstcalculatoronline.in` is redirected via edge 301 to `gstcalculatoronline.in`.
3. **Trailing Slash Standardization:** Paths with a trailing slash (e.g. `/reverse-gst-calculator/`) are redirected via Astro edge middleware with **HTTP 301** to their non-trailing slash counterpart (`/reverse-gst-calculator`). The homepage (`/`) remains the sole path retaining a trailing slash.
4. **Canonical Tag Consistency:** Every indexable HTTP 200 page includes `<link rel="canonical" href="https://gstcalculatoronline.in{path}" />` exactly matching its clean canonical form.

---

## 2. Legacy `/tools/*` URL Migration Map

All historical `/tools/*` paths are mapped via permanent HTTP 301 redirects to maintain equity, preserve backlinks, and avoid duplicate content penalties.

| Legacy URL | Target Canonical URL | HTTP Status | Indexing Directive | Sitemap Inclusion |
| :--- | :--- | :--- | :--- | :--- |
| `/tools` | `/` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/gst-calculator` | `/gst-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/reverse-gst-calculator` | `/reverse-gst-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/gst-inclusive-calculator` | `/gst-inclusive-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/gst-exclusive-calculator` | `/gst-exclusive-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/gst-split-calculator` | `/gst-split-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/igst-calculator` | `/igst-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/cgst-calculator` | `/cgst-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/sgst-calculator` | `/sgst-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/18-percent-gst-calculator` | `/18-percent-gst-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/12-percent-gst-calculator` | `/12-percent-gst-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/5-percent-gst-calculator` | `/5-percent-gst-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/28-percent-gst-calculator` | `/28-percent-gst-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/gst-rate-calculator` | `/gst-rate-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/gst-rates` | `/gst-rates` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/gst-formula` | `/gst-formula` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/gst-refund-calculator` | `/gst-refund-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/late-fee-calculator` | `/late-fee-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/interest-calculator` | `/interest-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/composition-calculator` | `/composition-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/invoice-builder` | `/invoice-builder` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/gst-rate-finder` | `/gst-rate-finder` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/gst-profit-calculator` | `/gst-profit-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/gst-discount-calculator` | `/gst-discount-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/add-gst-to-price` | `/gst-calculator` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/remove-gst-from-total` | `/reverse-gst-calculator`| 301 Moved Permanently | Follow / Redirect | Excluded |
| `/tools/category/*` | `/category/*` | 301 Moved Permanently | Follow / Redirect | Excluded |

---

## 3. Blog & Pagination Route Map

Pagination and duplicate slug aliases are normalized to prevent crawl loops, 404 errors, and thin content indexation.

| Source Route | Target Canonical Route | HTTP Status | Indexing Directive | Sitemap Inclusion |
| :--- | :--- | :--- | :--- | :--- |
| `/blog/page` | `/blog` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/blog/page/1` | `/blog` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/blog/page/2` | `/blog/page/2` | 200 OK | `noindex, follow` | Excluded |
| `/blog/page/3` | `/blog/page/3` | 200 OK | `noindex, follow` | Excluded |
| `/blog/page/4` | `/blog/page/4` | 200 OK | `noindex, follow` | Excluded |
| `/blog/page/5` | `/blog/page/5` | 200 OK | `noindex, follow` | Excluded |
| `/blog/gst-in-india-vs-sales-tax-in-usa-—-key-differences-explained` | `/blog/gst-india-vs-sales-tax-usa` | 301 Moved Permanently | Follow / Redirect | Excluded |
| `/blog/gst-in-india-vs-sales-tax-in-usa-key-differences-explained` | `/blog/gst-india-vs-sales-tax-usa` | 301 Moved Permanently | Follow / Redirect | Excluded |

---

## 4. Primary Public Indexable Inventory (Sitemap Included)

All 90 indexable URLs return HTTP 200 and are submitted via XML sitemap and IndexNow.

### Core Calculators & Tools (24 URLs)
1. `https://gstcalculatoronline.in/` (Homepage)
2. `https://gstcalculatoronline.in/gst-calculator`
3. `https://gstcalculatoronline.in/reverse-gst-calculator`
4. `https://gstcalculatoronline.in/gst-inclusive-calculator`
5. `https://gstcalculatoronline.in/gst-exclusive-calculator`
6. `https://gstcalculatoronline.in/gst-split-calculator`
7. `https://gstcalculatoronline.in/igst-calculator`
8. `https://gstcalculatoronline.in/cgst-calculator`
9. `https://gstcalculatoronline.in/sgst-calculator`
10. `https://gstcalculatoronline.in/18-percent-gst-calculator`
11. `https://gstcalculatoronline.in/12-percent-gst-calculator`
12. `https://gstcalculatoronline.in/5-percent-gst-calculator`
13. `https://gstcalculatoronline.in/28-percent-gst-calculator`
14. `https://gstcalculatoronline.in/gst-rate-calculator`
15. `https://gstcalculatoronline.in/gst-refund-calculator`
16. `https://gstcalculatoronline.in/late-fee-calculator`
17. `https://gstcalculatoronline.in/interest-calculator`
18. `https://gstcalculatoronline.in/composition-calculator`
19. `https://gstcalculatoronline.in/invoice-builder`
20. `https://gstcalculatoronline.in/gst-rate-finder`
21. `https://gstcalculatoronline.in/gst-profit-calculator`
22. `https://gstcalculatoronline.in/gst-discount-calculator`
23. `https://gstcalculatoronline.in/gst-formula`
24. `https://gstcalculatoronline.in/gst-rates`

### Tool Categories (5 URLs)
25. `https://gstcalculatoronline.in/category/tax-slabs`
26. `https://gstcalculatoronline.in/category/late-fees`
27. `https://gstcalculatoronline.in/category/interest-penalties`
28. `https://gstcalculatoronline.in/category/composition-scheme`
29. `https://gstcalculatoronline.in/category/utilities`

### Informational Hubs & Guides (3 URLs)
30. `https://gstcalculatoronline.in/blog`
31. `https://gstcalculatoronline.in/guides`
32. `https://gstcalculatoronline.in/guides/e-invoicing-threshold-rules`
33. `https://gstcalculatoronline.in/guides/gst-compliance-checklist-2026`

### Institutional & Legal Pages (7 URLs)
34. `https://gstcalculatoronline.in/about`
35. `https://gstcalculatoronline.in/contact`
36. `https://gstcalculatoronline.in/editorial-policy`
37. `https://gstcalculatoronline.in/disclaimer`
38. `https://gstcalculatoronline.in/privacy-policy`
39. `https://gstcalculatoronline.in/terms-and-conditions`
40. `https://gstcalculatoronline.in/sitemap-page`

### Blog Category Archives (11 URLs)
41. `https://gstcalculatoronline.in/blog/category/gst-basics`
42. `https://gstcalculatoronline.in/blog/category/small-business`
43. `https://gstcalculatoronline.in/blog/category/gst-compliance`
44. `https://gstcalculatoronline.in/blog/category/gst-advanced`
45. `https://gstcalculatoronline.in/blog/category/gst-sector-wise`
46. `https://gstcalculatoronline.in/blog/category/gst-refund`
47. `https://gstcalculatoronline.in/blog/category/gst-registration`
48. `https://gstcalculatoronline.in/blog/category/gst-career`
49. `https://gstcalculatoronline.in/blog/category/input-tax-credit`
50. `https://gstcalculatoronline.in/blog/category/gst-audit`
51. `https://gstcalculatoronline.in/blog/category/gst-rates`

### Knowledge Base & Articles (39 URLs)
52. `https://gstcalculatoronline.in/blog/gst-india-vs-sales-tax-usa`
53. `https://gstcalculatoronline.in/blog/how-gst-works-in-australia-2026-guide`
54. `https://gstcalculatoronline.in/blog/gst-calculation-examples`
55. `https://gstcalculatoronline.in/blog/gst-for-freelancers`
56. `https://gstcalculatoronline.in/blog/gst-formula-mathematical-guide`
57. `https://gstcalculatoronline.in/blog/latest-gst-updates`
58. `https://gstcalculatoronline.in/blog/gst-on-clothes`
59. `https://gstcalculatoronline.in/blog/gst-on-electronics`
60. `https://gstcalculatoronline.in/blog/gst-on-gold`
61. `https://gstcalculatoronline.in/blog/anti-profiteering-measure-gst-rules`
62. `https://gstcalculatoronline.in/blog/gst-council-constitution-role-decisions`
63. `https://gstcalculatoronline.in/blog/gst-ecommerce-operators-vendors`
64. `https://gstcalculatoronline.in/blog/gst-imports-exports-zero-rated`
65. `https://gstcalculatoronline.in/blog/gst-penalties-late-fees-interest`
66. `https://gstcalculatoronline.in/blog/gst-portal-navigation-guide-services`
67. `https://gstcalculatoronline.in/blog/gst-practitioner-gstp-exam-guide`
68. `https://gstcalculatoronline.in/blog/gst-real-estate-sector-rules`
69. `https://gstcalculatoronline.in/blog/gst-restaurants-food-delivery-itc`
70. `https://gstcalculatoronline.in/blog/gstr-2a-vs-gstr-2b-reconciliation`
71. `https://gstcalculatoronline.in/blog/gstr-3b-filing-step-by-step`
72. `https://gstcalculatoronline.in/blog/mixed-supply-vs-composite-supply`
73. `https://gstcalculatoronline.in/blog/time-of-supply-gst-rules`
74. `https://gstcalculatoronline.in/blog/value-of-supply-gst-rules`
75. `https://gstcalculatoronline.in/blog/place-of-supply-gst-rules`
76. `https://gstcalculatoronline.in/blog/gst-audit-and-assessment-types`
77. `https://gstcalculatoronline.in/blog/eway-bill-system-guide`
78. `https://gstcalculatoronline.in/blog/gst-refund-process-online`
79. `https://gstcalculatoronline.in/blog/reverse-charge-mechanism-rcm`
80. `https://gstcalculatoronline.in/blog/composition-scheme-gst-guide`
81. `https://gstcalculatoronline.in/blog/gst-small-businesses-impact`
82. `https://gstcalculatoronline.in/blog/sac-code-services-guide`
83. `https://gstcalculatoronline.in/blog/hsn-code-guide-india`
84. `https://gstcalculatoronline.in/blog/gst-invoice-rules-format`
85. `https://gstcalculatoronline.in/blog/input-tax-credit-itc-rules`
86. `https://gstcalculatoronline.in/blog/cgst-sgst-igst-explained`
87. `https://gstcalculatoronline.in/blog/gst-rates-india-2026`
88. `https://gstcalculatoronline.in/blog/gst-return-filing-checklist`
89. `https://gstcalculatoronline.in/blog/gst-registration-guide`
90. `https://gstcalculatoronline.in/blog/what-is-gst`

---

## 5. Non-Public / Utility / Excluded Paths

| Path | Status | Robots Directive | Sitemap Inclusion | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| `/admin` | 200 OK | `noindex, nofollow` | Excluded | Decap CMS editorial backend login |
| `/search` | 200 OK | `Disallow: /search` | Excluded | Client-side search interface (prevents spider crawling) |
| `/search-index.json` | 200 OK | Not applicable | Excluded | JSON static search data asset |
| `/404.html` | 404 Not Found | `noindex` | Excluded | Custom 404 error page |

