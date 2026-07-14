export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  url: string;
  category: string;
  keywords: string;
}

export const faqs: FAQItem[] = [
  {
    id: 'calculate-gst-online',
    question: "How do I calculate GST online?",
    answer: "You can calculate GST by entering the transaction amount and selecting the appropriate GST slab (5%, 12%, 18%, 28%) in our GST Calculator. It will automatically show the CGST, SGST, and IGST breakdowns for both 'Add GST' (exclusive) and 'Remove GST' (inclusive) types.",
    url: "/gst-calculator#faq",
    category: "General GST",
    keywords: "calculate gst online cgst sgst igst split add remove rate slab"
  },
  {
    id: 'updated-tax-laws',
    question: "Is this GST Calculator updated with the latest Indian tax laws?",
    answer: "Yes, all our calculators are updated in accordance with the latest Central Goods and Services Tax (CGST) and State Goods and Services Tax (SGST) regulations, including rationalized late fees and Section 50 interest calculations.",
    url: "/#faq",
    category: "General GST",
    keywords: "latest tax laws update cgst sgst rules amendments act regulations"
  },
  {
    id: 'difference-cgst-sgst-igst',
    question: "What is the difference between CGST, SGST, and IGST?",
    answer: "CGST (Central GST) and SGST (State GST) are levied on transactions within a single state (intrastate) and are shared equally between the Centre and State. IGST (Integrated GST) is levied on interstate transactions and imports, collected by the Centre and distributed to the consumption state.",
    url: "/igst-calculator#faq",
    category: "General GST",
    keywords: "difference cgst sgst igst central state integrated supply local interstate"
  },
  {
    id: 'interest-late-payments',
    question: "How is interest calculated on late GST payments?",
    answer: "Under Section 50 of the CGST Act, interest is levied at 18% per annum on delayed tax payments made through the Electronic Cash Ledger (net tax liability). For wrongful utilization of Input Tax Credit (ITC), interest is charged at 24% per annum.",
    url: "/interest-calculator#faq",
    category: "Interest & RCM",
    keywords: "interest calculation late payments section 50 delay cash ledger net liability itc"
  },
  {
    id: 'interest-net-gross',
    question: "Is interest under Section 50 calculated on gross or net tax liability?",
    answer: "Under Section 50 of the CGST Act, interest is calculated on the **net cash liability** (the portion paid via the Electronic Cash Ledger) rather than the gross liability, provided the return is filed voluntarily. However, if the return is filed after the commencement of any audit or recovery proceedings, interest is payable on the gross tax liability.",
    url: "/interest-calculator#faq",
    category: "Interest & RCM",
    keywords: "interest net gross liability electronic cash ledger itc adjustment section 50"
  },
  {
    id: 'daily-late-fee-gstr3b',
    question: "What is the daily late fee for filing GSTR-3B late?",
    answer: "The standard late fee for late filing of GSTR-3B is ₹50 per day for returns with tax liability (₹25 CGST + ₹25 SGST) and ₹20 per day for NIL returns. These fees are subject to turnover-based caps ranging from ₹500 to ₹10,000 per return.",
    url: "/late-fee-calculator#faq",
    category: "Filing & Late Fees",
    keywords: "daily late fee filing gstr-3b standard nil return cap limit delayed"
  },
  {
    id: 'late-fee-turnover-caps',
    question: "What are the aggregate turnover-based caps for GSTR-3B late fees?",
    answer: "Late fees are capped based on aggregate turnover: (1) NIL returns: capped at ₹500. (2) Turnover up to ₹1.5 Crores: capped at ₹2,000. (3) Turnover ₹1.5 Crores to ₹5 Crores: capped at ₹5,000. (4) Turnover above ₹5 Crores: capped at ₹10,000.",
    url: "/late-fee-calculator#faq",
    category: "Filing & Late Fees",
    keywords: "turnover caps late fee limit aggregate threshold maximum penalty"
  },
  {
    id: 'difference-inclusive-exclusive',
    question: "What is the difference between GST inclusive and exclusive prices?",
    answer: "A GST inclusive price already includes the tax component within the listed price (such as MRP retail prices). A GST exclusive price is the pre-tax base price, meaning GST will be calculated and added on top of it at checkout.",
    url: "/gst-exclusive-calculator#faq",
    category: "General GST",
    keywords: "inclusive exclusive tax base price total mrp price addition subtraction"
  },
  {
    id: 'extract-base-price',
    question: "How do I extract the base price from a GST-inclusive amount?",
    answer: "To extract the base price, divide the total GST inclusive amount by (1 + GST Rate/100). For example, to remove 18% GST from ₹11,800: Base Price = 11,800 ÷ 1.18 = ₹10,000. The GST amount is the remaining ₹1,800.",
    url: "/gst-inclusive-calculator#faq",
    category: "General GST",
    keywords: "extract base price remove tax divide calculation formula backward"
  },
  {
    id: 'composition-scheme-eligibility',
    question: "Who is eligible for the GST Composition Scheme?",
    answer: "Taxpayers with an annual aggregate turnover of up to ₹1.5 Crores (₹75 Lakhs for North-Eastern states) can opt for the Composition Scheme to pay tax at flat rates (1% for traders/manufacturers, 5% for restaurants). Service providers can opt for the scheme with a limit of ₹50 Lakhs at a flat rate of 6%.",
    url: "/composition-calculator#faq",
    category: "Composition Scheme",
    keywords: "composition scheme aggregate turnover limit threshold restaurant trader service"
  },
  {
    id: 'composition-dealer-itc',
    question: "Can a composition dealer claim Input Tax Credit (ITC)?",
    answer: "No. A taxpayer opting for the Composition Scheme is barred from claiming Input Tax Credit (ITC) on purchases. They also cannot collect GST from their customers or issue tax invoices (they issue a 'Bill of Supply' instead).",
    url: "/composition-calculator#faq",
    category: "Composition Scheme",
    keywords: "composition dealer input tax credit itc claim collect bill supply"
  },
  {
    id: 'free-to-use',
    question: "Is this online GST calculator platform free to use?",
    answer: "Yes, our website and all of its 11 calculators (GST, Reverse GST, Interest, Late Fees, Composition, Refund, etc.) are completely free to use. There are no limits, registrations, or hidden fees.",
    url: "/#faq",
    category: "General GST",
    keywords: "free calculator cost registry registration charge limit subscription"
  },
  {
    id: 'gst-return-due-dates',
    question: "What are the GST return filing due dates?",
    answer: "GSTR-1 (outward supplies) is due by the 11th of the following month for monthly filers or the 13th for quarterly QRMP filers. GSTR-3B (summary return) is due by the 20th monthly or the 22nd/24th quarterly. Annual returns (GSTR-9) are due by December 31st.",
    url: "/blog/gst-return-filing-checklist",
    category: "Filing & Late Fees",
    keywords: "due dates returns gstr-1 gstr-3b annual deadline monthly quarterly"
  },
  {
    id: 'rcm-mechanism-works',
    question: "How does the Reverse Charge Mechanism (RCM) work?",
    answer: "Under RCM, the recipient (buyer) pays GST instead of the supplier. This applies to specific notified goods and services like GTA, legal services, and director services. RCM tax must be paid in cash via the Electronic Cash Ledger, and the recipient can claim Input Tax Credit on the amount paid.",
    url: "/blog/reverse-charge-mechanism-rcm",
    category: "Interest & RCM",
    keywords: "rcm reverse charge buyer pays supplier legal gta cash ledger"
  },
  {
    id: 'verify-gstin',
    question: "How can I verify a GST number (GSTIN)?",
    answer: "You can verify any GSTIN through the GST Portal's Search Taxpayer tool at gst.gov.in. Enter the 15-digit GSTIN to check the business name, registration date, status, and filing history of the taxpayer.",
    url: "/#faq",
    category: "Refund & Invoicing",
    keywords: "verify gstin check business name search taxpayer registration status"
  },
  {
    id: 'einvoicing-applicability',
    question: "What is E-invoicing and who needs it?",
    answer: "E-invoicing is the electronic reporting of B2B invoices on the government IRP portal. It is mandatory for businesses with aggregate annual turnover exceeding ₹5 Crores. Invoices not generated through E-invoicing are treated as invalid for Input Tax Credit claims.",
    url: "/blog/eway-bill-system-guide",
    category: "Refund & Invoicing",
    keywords: "e-invoicing electronic invoice B2B threshold 5 crore irp portal"
  },
  {
    id: 'rule89-refund-formula',
    question: "What is the Rule 89 refund formula for zero-rated supplies?",
    answer: "Under Rule 89(4) of the CGST Rules, the refund for zero-rated supply of goods without payment of tax is calculated as: **Refund Amount = (Turnover of zero-rated supply of goods + Turnover of zero-rated supply of services) × Net ITC ÷ Adjusted Total Turnover**.",
    url: "/gst-refund-calculator#faq",
    category: "Refund & Invoicing",
    keywords: "rule 89 refund zero rated supply exports formula inverted duty structure"
  },
  {
    id: 'itc-apportionment-blocked',
    question: "What is blocked credit under GST Section 17(5)?",
    answer: "Blocked credit under Section 17(5) refers to specific purchases on which Input Tax Credit is not allowed, even if used for business. Examples include motor vehicles (with exceptions), food and beverages, outdoor catering, beauty treatment, life insurance, and works contract services for immovable property.",
    url: "/blog/input-tax-credit-itc-rules",
    category: "Interest & RCM",
    keywords: "blocked credit section 17 5 input tax credit itc food vehicle catering"
  }
];
