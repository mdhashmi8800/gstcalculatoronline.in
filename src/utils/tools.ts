export interface Tool {
  id: string;
  name: string;
  desc: string;
  url: string;
  icon: 'calculator' | 'fee' | 'interest' | 'composition' | 'invoice' | 'finder';
  category: 'tax-slabs' | 'late-fees' | 'interest-penalties' | 'composition-scheme' | 'utilities';
  categoryName: 'Tax Slab Calculators' | 'Filing Late Fees' | 'Interest Penalties' | 'Composition Scheme' | 'Utilities';
  keywords: string;
  badge?: string;
}

export const tools: Tool[] = [
  {
    id: 'gst-calculator',
    name: 'Online GST Calculator',
    desc: 'Standard GST calculator to add or remove GST (5%, 12%, 18%, 28%) and compute CGST/SGST/IGST splits.',
    url: '/gst-calculator',
    icon: 'calculator',
    category: 'tax-slabs',
    categoryName: 'Tax Slab Calculators',
    keywords: 'tax cgst sgst igst invoice add remove calculator standard slabs india rates',
    badge: 'Popular'
  },
  {
    id: 'reverse-gst-calculator',
    name: 'Reverse GST Calculator',
    desc: 'Subtract GST from final price to calculate the original taxable base price of any goods/services.',
    url: '/reverse-gst-calculator',
    icon: 'calculator',
    category: 'tax-slabs',
    categoryName: 'Tax Slab Calculators',
    keywords: 'reverse original price back calculate subtract remove tax reverse invoice net rate'
  },
  {
    id: 'gst-inclusive-calculator',
    name: 'GST Inclusive Calculator',
    desc: 'Extract baseline taxable cost and exact GST breakdown details when final price is inclusive of tax.',
    url: '/gst-inclusive-calculator',
    icon: 'calculator',
    category: 'tax-slabs',
    categoryName: 'Tax Slab Calculators',
    keywords: 'inclusive base value remove tax total invoice gross extract tax'
  },
  {
    id: 'gst-exclusive-calculator',
    name: 'GST Exclusive Calculator',
    desc: 'Determine final invoice totals and CGST/SGST/IGST splits by adding tax on top of base exclusive prices.',
    url: '/gst-exclusive-calculator',
    icon: 'calculator',
    category: 'tax-slabs',
    categoryName: 'Tax Slab Calculators',
    keywords: 'exclusive add tax base invoice price net add tax addition'
  },
  {
    id: 'gst-split-calculator',
    name: 'GST Split Calculator',
    desc: 'Split a direct GST tax amount or transaction value into Central (CGST) and State (SGST) portions.',
    url: '/gst-split-calculator',
    icon: 'calculator',
    category: 'tax-slabs',
    categoryName: 'Tax Slab Calculators',
    keywords: 'split divide cgst sgst igst tax local interstate sharing split tax'
  },
  {
    id: 'igst-calculator',
    name: 'IGST Calculator',
    desc: 'Compute Integrated Goods and Services Tax (IGST) liabilities specifically for interstate transactions.',
    url: '/igst-calculator',
    icon: 'calculator',
    category: 'tax-slabs',
    categoryName: 'Tax Slab Calculators',
    keywords: 'igst integrated interstate transaction tax import export cross border'
  },
  {
    id: 'gst-rate-calculator',
    name: 'GST Rate Calculator',
    desc: 'Determine the active GST tax percentage slab rate from base cost and final price/tax inputs.',
    url: '/gst-rate-calculator',
    icon: 'calculator',
    category: 'tax-slabs',
    categoryName: 'Tax Slab Calculators',
    keywords: 'rate percentage slab percent figure out verify tax check rate'
  },
  {
    id: 'gst-refund-calculator',
    name: 'GST Refund Calculator',
    desc: 'Estimate tax refunds for zero-rated exports and inverted duty structure (Rule 89) business scenarios.',
    url: '/gst-refund-calculator',
    icon: 'calculator',
    category: 'tax-slabs',
    categoryName: 'Tax Slab Calculators',
    keywords: 'refund claim rules export zero rated inverted duty rule 89 refund excess tax',
    badge: 'Rule 89'
  },
  {
    id: 'late-fee-calculator',
    name: 'GSTR-3B Late Fee Calculator',
    desc: 'Calculate daily filing late fees for delayed GSTR-3B filings, optimized with aggregate turnover caps.',
    url: '/late-fee-calculator',
    icon: 'fee',
    category: 'late-fees',
    categoryName: 'Filing Late Fees',
    keywords: 'late fee return fine gstr-3b penalty penalty fee caps turnover delay deadline',
    badge: 'Updated'
  },
  {
    id: 'interest-calculator',
    name: 'GST Interest Calculator (Section 50)',
    desc: 'Compute interest at 18% per annum on delayed tax payments and 24% per annum for wrongly utilized ITC.',
    url: '/interest-calculator',
    icon: 'interest',
    category: 'interest-penalties',
    categoryName: 'Interest Penalties',
    keywords: 'interest penalty delayed tax payment input tax credit itc claim section 50 cash ledger',
    badge: 'Section 50'
  },
  {
    id: 'composition-calculator',
    name: 'Composition Scheme Calculator',
    desc: 'Compute quarterly flat-rate tax liabilities for traders, restaurants, and small service providers.',
    url: '/composition-calculator',
    icon: 'composition',
    category: 'composition-scheme',
    categoryName: 'Composition Scheme',
    keywords: 'composition scheme merchant trader rate 1% 5% 6% tax liability small business'
  },
  {
    id: 'invoice-builder',
    name: 'GST Invoice Builder',
    desc: 'Create professional GST invoices with auto CGST/SGST/IGST split, PDF export, and print-ready layout.',
    url: '/invoice-builder',
    icon: 'invoice',
    category: 'utilities',
    categoryName: 'Utilities',
    keywords: 'invoice builder gst invoice cgst sgst igst pdf print tax invoice professional',
    badge: 'New'
  },
  {
    id: 'gst-rate-finder',
    name: 'GST Rate Finder',
    desc: 'Search and filter GST rates for 100+ goods and services by category, HSN code, or product name.',
    url: '/gst-rate-finder',
    icon: 'finder',
    category: 'utilities',
    categoryName: 'Utilities',
    keywords: 'gst rate finder hsn sac code search directory goods services tax rate lookup',
    badge: 'New'
  },
  {
    id: 'gst-profit-calculator',
    name: 'GST Profit Calculator',
    desc: 'Calculate taxable values, profit margin markup additions, and tax splits from cost prices.',
    url: '/gst-profit-calculator',
    icon: 'calculator',
    category: 'utilities',
    categoryName: 'Utilities',
    keywords: 'profit margin markup sell price cost price retail wholesale markup tax'
  },
  {
    id: 'gst-discount-calculator',
    name: 'GST Discount Calculator',
    desc: 'Compute discounted prices, tax liabilities, and splits before or after tax inclusion.',
    url: '/gst-discount-calculator',
    icon: 'calculator',
    category: 'utilities',
    categoryName: 'Utilities',
    keywords: 'discount percentage rebate sale price discount add remove tax'
  }
];

export function getToolById(id: string): Tool | undefined {
  return tools.find(t => t.id === id);
}

export function getToolsByCategory(category: Tool['category']): Tool[] {
  return tools.filter(t => t.category === category);
}

export function getPopularTools(): Tool[] {
  return tools.filter(t => t.badge === 'Popular' || t.id === 'gst-calculator' || t.id === 'reverse-gst-calculator' || t.id === 'late-fee-calculator' || t.id === 'interest-calculator');
}
