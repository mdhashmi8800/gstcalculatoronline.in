// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://gstcalculatoronline.in',

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },

  trailingSlash: 'never',

  redirects: {
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
  },

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});