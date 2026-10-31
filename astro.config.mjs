// @ts-check
import { fileURLToPath } from 'node:url';
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
    '/tools': { status: 301, destination: '/' },
    '/tools/gst-calculator': { status: 301, destination: '/gst-calculator' },
    '/tools/reverse-gst-calculator': { status: 301, destination: '/reverse-gst-calculator' },
    '/tools/gst-inclusive-calculator': { status: 301, destination: '/gst-inclusive-calculator' },
    '/tools/gst-exclusive-calculator': { status: 301, destination: '/gst-exclusive-calculator' },
    '/tools/add-gst-to-price': { status: 301, destination: '/gst-exclusive-calculator' },
    '/tools/remove-gst-from-total': { status: 301, destination: '/reverse-gst-calculator' },
    '/tools/gst-split-calculator': { status: 301, destination: '/gst-split-calculator' },
    '/tools/cgst-calculator': { status: 301, destination: '/cgst-calculator' },
    '/tools/sgst-calculator': { status: 301, destination: '/sgst-calculator' },
    '/tools/igst-calculator': { status: 301, destination: '/igst-calculator' },
    '/tools/5-percent-gst-calculator': { status: 301, destination: '/5-percent-gst-calculator' },
    '/tools/12-percent-gst-calculator': { status: 301, destination: '/12-percent-gst-calculator' },
    '/tools/18-percent-gst-calculator': { status: 301, destination: '/18-percent-gst-calculator' },
    '/tools/28-percent-gst-calculator': { status: 301, destination: '/28-percent-gst-calculator' },
    '/tools/gst-rate-calculator': { status: 301, destination: '/gst-rate-calculator' },
    '/tools/gst-refund-calculator': { status: 301, destination: '/gst-refund-calculator' },
    '/tools/late-fee-calculator': { status: 301, destination: '/late-fee-calculator' },
    '/tools/interest-calculator': { status: 301, destination: '/interest-calculator' },
    '/tools/composition-calculator': { status: 301, destination: '/composition-calculator' },
    '/tools/invoice-builder': { status: 301, destination: '/invoice-builder' },
    '/tools/gst-rate-finder': { status: 301, destination: '/gst-rate-finder' },
    '/tools/gst-profit-calculator': { status: 301, destination: '/gst-profit-calculator' },
    '/tools/gst-discount-calculator': { status: 301, destination: '/gst-discount-calculator' },
    '/tools/gst-formula': { status: 301, destination: '/gst-formula' },
    '/tools/gst-rates': { status: 301, destination: '/gst-rates' },
    '/tools/category/tax-slabs': { status: 301, destination: '/category/tax-slabs' },
    '/tools/category/late-fees': { status: 301, destination: '/category/late-fees' },
    '/tools/category/interest-penalties': { status: 301, destination: '/category/interest-penalties' },
    '/tools/category/composition-scheme': { status: 301, destination: '/category/composition-scheme' },
    '/tools/category/utilities': { status: 301, destination: '/category/utilities' },
    '/add-gst-to-price': { status: 301, destination: '/gst-exclusive-calculator' },
    '/remove-gst-from-total': { status: 301, destination: '/reverse-gst-calculator' },
    '/blog/page/1': { status: 301, destination: '/blog' },
    '/blog/page': { status: 301, destination: '/blog' },
    '/blog/gst-in-india-vs-sales-tax-in-usa-key-differences-explained': { status: 301, destination: '/blog/gst-india-vs-sales-tax-usa' },
    '/blog/gst-in-india-vs-sales-tax-in-usa-—-key-differences-explained': { status: 301, destination: '/blog/gst-india-vs-sales-tax-usa' },
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        picomatch: fileURLToPath(new URL('./src/utils/picomatch-esm.mjs', import.meta.url)),
      },
    },
  },

  adapter: cloudflare(),
});