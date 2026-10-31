import fs from 'fs';

const updates = {
  'composition-scheme-gst-guide.md': 'metaTitle: "GST Composition Scheme Guide: Limits, Rates & Rules"',
  'gst-audit-and-assessment-types.md': 'metaTitle: "GST Audit & Assessment Guide: Types & Thresholds"',
  'gst-council-constitution-role-decisions.md': 'metaTitle: "GST Council Guide: Structure, Role & Decision Rules"',
  'gst-ecommerce-operators-vendors.md': 'metaTitle: "GST Guide for E-Commerce: TCS, Registration & Rules"',
  'gst-in-india-vs-sales-tax-in-usa-—-key-differences-explained.md': 'metaTitle: "GST in India vs US Sales Tax: Differences (2026)"',
  'gst-invoice-rules-format.md': 'metaTitle: "GST Invoice Rules: Mandatory Formats & Limits (2026)"',
  'gst-portal-navigation-guide-services.md': 'metaTitle: "How to Use GST Portal: Services, Ledgers & Filing"',
  'gst-practitioner-gstp-exam-guide.md': 'metaTitle: "GST Practitioner (GSTP) Exam: Eligibility & Guide"',
  'gst-rates-india-2026.md': 'metaTitle: "GST Tax Slabs in India: 5%, 12%, 18% & 28% Rates (2026)"',
  'gst-real-estate-sector-rules.md': 'metaTitle: "GST on Real Estate 2026: Tax Rates (1% & 5%) & Rules"',
  'gst-registration-guide.md': 'metaTitle: "GST Registration Guide: Online Process & Checklist"',
  'gst-restaurants-food-delivery-itc.md': 'metaTitle: "GST on Restaurants & Food Delivery: 5% vs 18% Slabs"',
  'gst-return-filing-checklist.md': 'metaTitle: "GST Return Filing Checklist: Forms, Dates & Process"',
  'gst-small-businesses-impact.md': 'metaTitle: "GST Guide for Small Businesses: Schemes & Exemptions"',
  'gstr-3b-filing-step-by-step.md': 'metaTitle: "How to File GSTR-3B Online: Step-by-Step Filing Guide"',
  'hsn-code-guide-india.md': 'metaTitle: "HSN Code Guide for GST: Classification & Digit Rules"',
  'input-tax-credit-itc-rules.md': 'metaTitle: "Input Tax Credit (ITC) Rules under GST: Claiming Guide"',
  'mixed-supply-vs-composite-supply.md': 'metaTitle: "Composite vs Mixed Supply in GST: Rules & Tax Rates"',
  'place-of-supply-gst-rules.md': 'metaTitle: "Place of Supply Rules in GST: Goods & Services Guide"',
  'reverse-charge-mechanism-rcm.md': 'metaTitle: "Reverse Charge Mechanism (RCM) in GST: Rules & List"',
  'what-is-gst.md': 'metaTitle: "What is GST in India: Complete Beginner\'s Guide (2026)"',
};

const dir = 'src/content/blog/';
for (const [file, newLine] of Object.entries(updates)) {
  const p = dir + file;
  if (!fs.existsSync(p)) {
    console.error('File not found:', file);
    continue;
  }
  let c = fs.readFileSync(p, 'utf8');
  // replace metaTitle line
  if (/^metaTitle:.*$/m.test(c)) {
    c = c.replace(/^metaTitle:.*$/m, newLine);
  } else if (/^title:.*$/m.test(c)) {
    c = c.replace(/^(title:.*$)/m, `$1\n${newLine}`);
  }
  fs.writeFileSync(p, c, 'utf8');
  console.log('Optimized metaTitle in:', file);
}

