---
title: "GST Invoicing Examples: CGST, SGST, and IGST Billing Scenarios"
metaTitle: "GST Calculation Examples: Local vs Interstate Invoicing with CGST, SGST, IGST"
metaDescription: "Explore 6 practical GST invoicing examples for goods and services. Learn CGST/SGST splits for intra-state sales, IGST for interstate supplies, and how to handle mixed transactions."
date: "2026-07-14"
lastUpdated: "2026-07-18"
author: "CA Amit Sharma"
readTime: "10 min read"
slug: "gst-calculation-examples"
category: "GST Basics"
relatedCalculators:
  - name: "GST Calculator"
    url: "/gst-calculator"
  - name: "GST Split Calculator"
    url: "/gst-split-calculator"
  - name: "IGST Calculator"
    url: "/igst-calculator"
relatedArticles:
  - title: "What is GST (Goods and Services Tax) in India: The Ultimate Guide"
    slug: "what-is-gst"
  - title: "CGST, SGST & IGST Explained: India's Three GST Components"
    slug: "cgst-sgst-igst-explained"
suggestedArticles:
  - title: "GST Registration: Eligibility, Process, and Required Documents"
    slug: "gst-registration-guide"
faqs:
  - question: "When do I charge IGST instead of CGST and SGST?"
    answer: "IGST is charged when the supplier is in one state and the place of supply is in a different state (interstate transaction), or when goods/services are imported into India. For all intra-state (same state) transactions, CGST and SGST are charged equally."
  - question: "Can I charge CGST and SGST to an out-of-state customer?"
    answer: "No. Interstate sales must always charge IGST. Charging CGST/SGST to an out-of-state buyer is a compliance error that can attract penalties and create reconciliation problems in GSTR-1 and GSTR-3B."
  - question: "Is showing CGST/SGST split on the invoice mandatory?"
    answer: "Yes. Tax invoices must explicitly display separate line items for CGST, SGST, and IGST amounts to be legally valid under CBIC rules. A combined 'GST' amount without the split is not compliant."
  - question: "What is the CGST and SGST rate for an 18% GST item?"
    answer: "For an item with 18% GST: CGST = 9% and SGST = 9%. The CGST and SGST rates are always equal to each other and together equal the total GST rate."
  - question: "How do I calculate GST on a mixed invoice with goods and services?"
    answer: "For mixed invoices, apply GST separately to each line item at its applicable rate. Sum up CGST, SGST, and IGST columns separately. The tax type (CGST/SGST vs IGST) depends on whether the transaction is intra-state or inter-state."
---

## Understanding GST Billing: When to Use CGST/SGST vs IGST

Correct invoice generation is the foundation of GST compliance. A wrong tax type (charging IGST when you should charge CGST+SGST, or vice versa) can create cascading issues across your GSTR-1 filing, your customer's ITC claims, and your own reconciliation process.

The key rule is simple:
- **Intra-state** (same state): Charge **CGST + SGST**
- **Inter-state** (different states or imports): Charge **IGST**

This guide walks through 6 practical scenarios that cover the most common billing situations Indian businesses face.

---

## Scenario 1: Local Goods Sale (Intra-State, Same State)

**Situation:** A textile shop in Surat (Gujarat) sells dress material to a retailer in Ahmedabad (also Gujarat) for ₹50,000. The goods attract 5% GST.

| Component | Calculation | Amount |
|---|---|---|
| Taxable Value | — | ₹50,000 |
| CGST (2.5%) | ₹50,000 × 2.5% | ₹1,250 |
| SGST (2.5%) | ₹50,000 × 2.5% | ₹1,250 |
| **Total Invoice** | ₹50,000 + ₹2,500 | **₹52,500** |

**Tax Code:** CGST + SGST (both Gujarat supplier and Gujarat buyer)

---

## Scenario 2: Interstate Goods Sale

**Situation:** A manufacturer in Pune (Maharashtra) ships industrial equipment worth ₹2,00,000 to a factory in Chennai (Tamil Nadu). GST rate: 18%.

| Component | Calculation | Amount |
|---|---|---|
| Taxable Value | — | ₹2,00,000 |
| IGST (18%) | ₹2,00,000 × 18% | ₹36,000 |
| CGST | Not applicable | — |
| SGST | Not applicable | — |
| **Total Invoice** | ₹2,00,000 + ₹36,000 | **₹2,36,000** |

**Tax Code:** IGST only (Maharashtra supplier → Tamil Nadu buyer = interstate)

---

## Scenario 3: Professional Services (Intra-State)

**Situation:** A Chartered Accountant firm in Mumbai (Maharashtra) provides audit services worth ₹1,50,000 to a company also in Mumbai. GST rate on CA services: 18%.

| Component | Calculation | Amount |
|---|---|---|
| Taxable Value | — | ₹1,50,000 |
| CGST (9%) | ₹1,50,000 × 9% | ₹13,500 |
| SGST (9%) | ₹1,50,000 × 9% | ₹13,500 |
| **Total Invoice** | ₹1,50,000 + ₹27,000 | **₹1,77,000** |

**ITC for Recipient:** The Mumbai company can claim ₹13,500 CGST + ₹13,500 SGST = ₹27,000 as ITC.

---

## Scenario 4: IT Services — Interstate with IGST

**Situation:** A Noida (Uttar Pradesh) software company delivers a ₹5,00,000 project to a client in Bengaluru (Karnataka). GST rate: 18%.

| Component | Calculation | Amount |
|---|---|---|
| Taxable Value | — | ₹5,00,000 |
| IGST (18%) | ₹5,00,000 × 18% | ₹90,000 |
| **Total Invoice** | ₹5,00,000 + ₹90,000 | **₹5,90,000** |

**Important:** The Bengaluru client can claim ₹90,000 IGST as ITC — which can be used to offset CGST, SGST, or IGST liabilities.

---

## Scenario 5: Restaurant Services (5% GST, No ITC)

**Situation:** A restaurant in Jaipur (Rajasthan) charges a dine-in customer ₹2,400 for food and beverages. Restaurants without hotel accommodation charge 5% GST with no ITC.

| Component | Calculation | Amount |
|---|---|---|
| Food Bill | — | ₹2,400 |
| CGST (2.5%) | ₹2,400 × 2.5% | ₹60 |
| SGST (2.5%) | ₹2,400 × 2.5% | ₹60 |
| **Final Bill** | ₹2,400 + ₹120 | **₹2,520** |

**Note:** Restaurants charging 5% GST cannot claim ITC on inputs (raw materials, equipment). This is a mandatory trade-off in the restaurant GST scheme.

---

## Scenario 6: Mixed Invoice (Goods + Services, Different Rates)

**Situation:** A printing company in Hyderabad (Telangana) bills a client in Hyderabad for printing services (18% GST) and paper supply (12% GST) in a single invoice.

| Item | Taxable Value | CGST | SGST | Total |
|---|---|---|---|---|
| Printing Services (SAC 998912, 18%) | ₹30,000 | ₹2,700 (9%) | ₹2,700 (9%) | ₹35,400 |
| Paper Supply (HSN 4802, 12%) | ₹15,000 | ₹900 (6%) | ₹900 (6%) | ₹16,800 |
| **Total** | **₹45,000** | **₹3,600** | **₹3,600** | **₹52,200** |

Each line item is taxed at its applicable GST rate. The invoice shows separate CGST and SGST for each line.

---

## GST Calculation Formulas Reference

### Adding GST to a Price (Exclusive Price)
```
GST Amount = Base Price × GST Rate ÷ 100
Total Invoice = Base Price + GST Amount
CGST = SGST = GST Amount ÷ 2  (for intra-state)
IGST = GST Amount              (for inter-state)
```

### Removing GST from an Inclusive Price
```
Base Price = Inclusive Amount ÷ (1 + GST Rate ÷ 100)
GST Amount = Inclusive Amount - Base Price
```

**Example:** Removing 18% GST from ₹59,000 inclusive price:
- Base Price = 59,000 ÷ 1.18 = **₹50,000**
- GST Amount = 59,000 - 50,000 = **₹9,000**
- CGST = SGST = ₹4,500 each

---

## Key Rules to Remember

1. **Determine Place of Supply first** — same state = CGST+SGST; different state = IGST
2. **Each line item gets its own GST rate** — don't average rates across items
3. **Always show the split** — never just write "GST" without specifying CGST/SGST/IGST
4. **E-commerce sellers:** Even if the buyer and seller are in the same state, some platform-mediated sales may attract TCS rules
5. **Import of goods:** Always IGST at the applicable rate + Customs Duty

Use our [GST Calculator](/gst-calculator) for instant computation, or the [GST Split Calculator](/gst-split-calculator) to break any GST amount into CGST/SGST components.
