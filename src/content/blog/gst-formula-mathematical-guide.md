---
title: "GST Formula: How to Add and Remove GST (With Excel Examples)"
metaTitle: "GST Formula Guide: How to Calculate GST in India (2026)"
metaDescription: "Master the mathematical formulas to calculate GST in India. Step-by-step guides on adding and removing tax, CGST/SGST splits, Excel templates, multi-rate calculations, and reverse GST extraction."
date: "2026-07-14"
lastUpdated: "2026-07-18"
author: "Hashmi Akbar"
readTime: "12 min read"
slug: "gst-formula-mathematical-guide"
category: "GST Basics"
relatedCalculators:
  - name: "GST Calculator"
    url: "/gst-calculator"
  - name: "Reverse GST Calculator"
    url: "/reverse-gst-calculator"
  - name: "GST Split Calculator"
    url: "/gst-split-calculator"
relatedArticles:
  - title: "What is GST (Goods and Services Tax) in India: The Ultimate Guide"
    slug: "what-is-gst"
  - title: "GST Invoicing Examples: CGST, SGST, and IGST Billing Scenarios"
    slug: "gst-calculation-examples"
suggestedArticles:
  - title: "GST Registration: Eligibility, Process, and Required Documents"
    slug: "gst-registration-guide"
faqs:
  - question: "What is the basic formula to add GST to a price?"
    answer: "GST Amount = Base Value × (GST Rate ÷ 100). Total Invoice = Base Value + GST Amount. For 18% GST on ₹10,000: GST = ₹1,800; Total = ₹11,800."
  - question: "How is GST removed from an inclusive amount?"
    answer: "Base Price = Inclusive Amount ÷ (1 + GST Rate ÷ 100). GST Amount = Inclusive Amount - Base Price. For ₹11,800 inclusive at 18%: Base = ₹10,000; GST = ₹1,800."
  - question: "How do I calculate CGST and SGST from the total GST?"
    answer: "CGST = SGST = Total GST Amount ÷ 2. For ₹1,800 total GST: CGST = ₹900; SGST = ₹900. For inter-state supply, the full GST is IGST."
  - question: "Is the formula different for different GST slabs?"
    answer: "The formula is identical for all slabs (5%, 12%, 18%, 28%). Only the rate value changes. For 5%: GST = Base × 0.05. For 12%: GST = Base × 0.12. For 28%: GST = Base × 0.28."
  - question: "How do I calculate GST rate from base price and tax amount?"
    answer: "GST Rate (%) = (GST Amount ÷ Base Price) × 100. If you paid ₹1,800 tax on a ₹10,000 base: Rate = (1,800 ÷ 10,000) × 100 = 18%."
---

## Introduction to GST Calculation Mathematics

Understanding the algebraic logic behind Goods and Services Tax (GST) is essential for anyone running a business, preparing client bills, filing GSTR-1 returns, or auditing ledgers in India. GST is a destination-based, multi-stage consumption tax. Depending on whether you are determining a retail price by adding tax or extracting tax from a tax-inclusive MRP, the formula differs.

This guide covers all core GST formulas with worked examples, Excel templates, and multi-rate scenarios.

---

## Formula 1: Adding GST to a Base Price (Exclusive Calculation)

When your price is **exclusive of tax** (net taxable price), you add GST on top to reach the final invoice value.

### The Formula:
```
GST Amount = Base Price × GST Rate ÷ 100
Total Invoice = Base Price + GST Amount
CGST = GST Amount ÷ 2  (intra-state)
SGST = GST Amount ÷ 2  (intra-state)
IGST = GST Amount       (inter-state)
```

### Examples Across All GST Slabs:

| Base Price | GST Rate | GST Amount | CGST | SGST | Total Invoice |
|---|---|---|---|---|---|
| ₹10,000 | 5% | ₹500 | ₹250 | ₹250 | ₹10,500 |
| ₹10,000 | 12% | ₹1,200 | ₹600 | ₹600 | ₹11,200 |
| ₹10,000 | 18% | ₹1,800 | ₹900 | ₹900 | ₹11,800 |
| ₹10,000 | 28% | ₹2,800 | ₹1,400 | ₹1,400 | ₹12,800 |

### Worked Example — 18% GST on Services:
A management consultant charges ₹50,000 for advisory services (18% GST, intra-state):
- GST Amount = ₹50,000 × 18% = ₹9,000
- CGST = ₹4,500 | SGST = ₹4,500
- **Invoice Total = ₹59,000**

---

## Formula 2: Removing GST from an Inclusive Price (Reverse Calculation)

When the price **already includes GST** (e.g., MRP on a product, restaurant bill), you need to extract the base price and GST separately.

**⚠️ Common Mistake:** Many people calculate GST from an inclusive price as: Inclusive × 18% = GST. This is **wrong** — it over-calculates the tax because you're applying the rate to the tax-inclusive amount.

### The Correct Formula:
```
Base Price = Inclusive Price ÷ (1 + GST Rate ÷ 100)
GST Amount = Inclusive Price − Base Price
```

This can be simplified to:
```
GST Amount = Inclusive Price × GST Rate ÷ (100 + GST Rate)
```

### Examples Across All GST Slabs:

| Inclusive Price | GST Rate | Base Price | GST Amount |
|---|---|---|---|
| ₹10,500 | 5% | ₹10,000 | ₹500 |
| ₹11,200 | 12% | ₹10,000 | ₹1,200 |
| ₹11,800 | 18% | ₹10,000 | ₹1,800 |
| ₹12,800 | 28% | ₹10,000 | ₹2,800 |

### Worked Example — Restaurant Bill:
A restaurant bill is ₹1,416 inclusive of 18% GST:
- Base Price = ₹1,416 ÷ 1.18 = **₹1,200**
- GST Amount = ₹1,416 − ₹1,200 = **₹216**
- CGST = ₹108 | SGST = ₹108

---

## Formula 3: Finding the GST Rate from Amount and Base Price

If you know the base price and the tax amount but not the GST rate:

```
GST Rate (%) = (GST Amount ÷ Base Price) × 100
```

**Example:** You paid ₹54,000 including GST. After extracting, base = ₹45,000 and GST = ₹9,000.
- GST Rate = (9,000 ÷ 45,000) × 100 = **20%**

*(This would be a non-standard rate — use to verify invoices)*

---

## Formula 4: Multi-Item Invoice with Mixed GST Rates

For invoices with goods/services at different rates, calculate GST separately for each line:

```
Line Item GST = Line Item Value × GST Rate ÷ 100
Total CGST = Sum of all CGST amounts
Total SGST = Sum of all SGST amounts
Grand Total = Sum of all taxable values + Total CGST + Total SGST
```

### Example — Mixed Invoice:

| Item | Value | Rate | CGST | SGST |
|---|---|---|---|---|
| Consulting services | ₹20,000 | 18% | ₹1,800 | ₹1,800 |
| Software license | ₹10,000 | 18% | ₹900 | ₹900 |
| Hardware supply | ₹5,000 | 12% | ₹300 | ₹300 |
| **Total** | **₹35,000** | — | **₹3,000** | **₹3,000** |
| **Grand Total** | | | | **₹41,000** |

---

## Formula 5: Composition Scheme Tax Calculation

For businesses under the Composition Scheme, tax is computed differently — as a flat percentage of **turnover**, not on individual transactions:

```
Quarterly Tax = Total Quarterly Turnover × Composition Rate ÷ 100
```

| Composition Category | Rate | Example (₹5,00,000 turnover) |
|---|---|---|
| Manufacturers / Traders | 1% | ₹5,000 |
| Restaurants (not serving alcohol) | 5% | ₹25,000 |
| Service providers (Mixed suppliers) | 6% | ₹30,000 |

---

## GST Formulas in Microsoft Excel

Automate these calculations in your Excel or Google Sheets:

| Task | Excel Formula | Notes |
|---|---|---|
| Add 5% GST | `=A1*1.05` | A1 = base price |
| Add 12% GST | `=A1*1.12` | A1 = base price |
| Add 18% GST | `=A1*1.18` | A1 = base price |
| Add 28% GST | `=A1*1.28` | A1 = base price |
| Extract 18% GST from inclusive | `=A1-A1/1.18` | A1 = inclusive price |
| Find base from 18% inclusive | `=A1/1.18` | A1 = inclusive price |
| Calculate CGST (any rate) | `=(A1*B1/100)/2` | A1=base, B1=GST% |
| Calculate SGST (any rate) | `=(A1*B1/100)/2` | Same as CGST |
| Calculate IGST (any rate) | `=A1*B1/100` | A1=base, B1=GST% |
| Find GST rate from amounts | `=(B1/A1)*100` | A1=base, B1=GST amount |

### Dynamic Formula for Any Rate:
To make one formula work for any GST rate (stored in cell C1):
```
GST Amount = A1 * C1 / 100
Inclusive Total = A1 * (1 + C1/100)
Base from Inclusive = A1 / (1 + C1/100)
```

---

## Quick Reference: All GST Rate Multipliers

| Operation | 5% | 12% | 18% | 28% |
|---|---|---|---|---|
| Add GST (multiply by) | 1.05 | 1.12 | 1.18 | 1.28 |
| Remove GST (divide by) | 1.05 | 1.12 | 1.18 | 1.28 |
| Extract tax from inclusive | ×0.04762 | ×0.10714 | ×0.15254 | ×0.21875 |

*(Extracted tax multiplier = Rate ÷ (100 + Rate))*

---

## Key Formula Principles to Remember

1. **Never apply the rate to an inclusive price** to find the GST — always divide first
2. **CGST = SGST** for intra-state; both equal half of total GST
3. **IGST = Full GST amount** for inter-state — no splitting
4. **Composition tax is on turnover**, not on individual transaction values
5. The formula is **identical across all slabs** — only the rate changes

Use our online [GST Calculator](/gst-calculator) to apply these formulas instantly, or the [GST Formula page](/gst-formula) for an interactive formula reference tool.
