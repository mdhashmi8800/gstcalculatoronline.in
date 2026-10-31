import fs from 'fs';

const updates = {
  'gst-on-clothes.md': {
    from: 'metaTitle: "GST Rates on Clothes & Textiles in India: Full Guide with HSN Codes (2026)"',
    to: 'metaTitle: "GST Rates on Clothes & Textiles in India (2026)"'
  },
  'gst-on-gold.md': {
    from: 'metaTitle: "GST on Gold Jewellery in India: 3% Rate, Making Charges & HSN Codes (2026)"',
    to: 'metaTitle: "GST on Gold Jewellery in India: 3% Rate & Slabs"'
  },
  'latest-gst-updates.md': {
    from: 'metaTitle: "Latest GST Updates 2026: Council Decisions, Rate Changes & CBIC Amendments"',
    to: 'metaTitle: "Latest GST Updates 2026: Council Decisions & Rules"'
  },
  'gst-calculation-examples.md': {
    from: 'metaTitle: "GST Calculation Examples: Local vs Interstate Invoicing with CGST, SGST, IGST"',
    to: 'metaTitle: "GST Calculation Examples: CGST, SGST & IGST Invoicing"'
  },
  'gst-for-freelancers.md': {
    from: 'metaTitle: "GST Guide for Freelancers in India: Thresholds, Invoicing & Taxes (2026)"',
    to: 'metaTitle: "GST Guide for Freelancers in India (2026 Rules)"'
  },
  'how-gst-works-in-australia-2026-guide.md': {
    from: 'metaTitle: How GST Works in Australia (2026 Guide) | Rate, Registration & Examples',
    to: 'metaTitle: "How GST Works in Australia: Rates & Registration"'
  },
  'gst-on-electronics.md': {
    from: 'metaTitle: "GST Rates on Electronics in India: Mobiles, Laptops, TVs & More (2026)"',
    to: 'metaTitle: "GST Rates on Electronics in India: Mobiles & Laptops"'
  },
  'gst-imports-exports-zero-rated.md': {
    from: 'metaTitle: "GST Export & Import Rules: LUT, Zero-Rated Supplies & IGST Refund"',
    to: 'metaTitle: "GST Export & Import Rules: LUT & Zero-Rated Supplies"'
  },
  'anti-profiteering-measure-gst-rules.md': {
    from: 'metaTitle: "GST Anti-Profiteering Clause: Rules, Complaints & CCI Investigation"',
    to: 'metaTitle: "GST Anti-Profiteering Rules: Legal Framework Guide"'
  },
  'eway-bill-system-guide.md': {
    from: 'metaTitle: "E-Way Bill Guide: Rules, Threshold Limits & online Generation Steps"',
    to: 'metaTitle: "E-Way Bill Guide: Rules, Limits & Online Generation"'
  }
};

for (const [file, u] of Object.entries(updates)) {
  const p = 'src/content/blog/' + file;
  let c = fs.readFileSync(p, 'utf8');
  if (c.includes(u.from)) {
    c = c.replace(u.from, u.to);
    fs.writeFileSync(p, c, 'utf8');
    console.log('Updated:', file);
  } else {
    console.error('Target not found in:', file);
  }
}

// Fix missing image alt in sales tax post
const files = fs.readdirSync('src/content/blog');
const salesTaxFile = files.find(f => f.includes('sales-tax'));
if (salesTaxFile) {
  let c = fs.readFileSync('src/content/blog/' + salesTaxFile, 'utf8');
  if (c.includes('![](/uploads/chatgpt-image-jul-26-2026-10_00_44-pm.png)')) {
    c = c.replace(
      '![](/uploads/chatgpt-image-jul-26-2026-10_00_44-pm.png)',
      '![Detailed comparison infographic between Indian Goods and Services Tax (GST) and United States Sales Tax](/uploads/chatgpt-image-jul-26-2026-10_00_44-pm.png)'
    );
    fs.writeFileSync('src/content/blog/' + salesTaxFile, c, 'utf8');
    console.log('Updated image ALT in:', salesTaxFile);
  } else {
    console.log('Image tag not found in:', salesTaxFile);
  }
}

