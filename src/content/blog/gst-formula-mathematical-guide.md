---
title: "GST Formula: How to Add and Remove GST (With Excel Examples)"
metaTitle: "GST Formula Guide: How to Calculate GST In India (2026)"
metaDescription: "Master the mathematical formulas to calculate GST in India. Step-by-step guides on adding and removing tax, Excel templates, and common bookkeeping splits."
date: "2026-07-14"
lastUpdated: "2026-07-14"
author: "CA Amit Sharma"
readTime: "10 min read"
slug: "gst-formula-mathematical-guide"
category: "GST Basics"
relatedCalculators:
  - name: "GST Calculator"
    url: "/gst-calculator"
  - name: "Reverse GST Calculator"
    url: "/reverse-gst-calculator"
relatedArticles:
  - title: "What is GST (Goods and Services Tax) in India: The Ultimate Guide"
    slug: "what-is-gst"
suggestedArticles:
  - title: "GST Registration: Eligibility, Process, and Required Documents"
    slug: "gst-registration-guide"
faqs:
  - question: "What is the basic formula to add GST?"
    answer: "GST Amount = Base Value × (Rate / 100). Total Invoice = Base Value + GST Amount."
  - question: "How is GST inclusive amount calculated?"
    answer: "Base Price = Inclusive Amount ÷ (1 + Rate/100). GST Amount = Inclusive Amount - Base Price."
  - question: "Is the formula different for CGST and SGST?"
    answer: "No. Calculate the total GST using the standard formula, and then split the tax amount equally by dividing it by 2."
---
## Introduction to GST Calculation Mathematics
Understanding the algebraic logic behind Goods and Services Tax (GST) is essential for anyone running a business, preparing client bills, or auditing ledgers in India. GST is a destination-based consumption tax. Depending on whether you are determining a retail price by adding tax or extracting tax from a flat-rate Maximum Retail Price (MRP), the formula you use will differ. Symmetrical accounting prevents decimal errors when declaring tax liabilities on the GST portal.

## 1. Adding GST to a Base Price (Exclusive calculation)
When you sell a product or service that has a price exclusive of tax, you must compute the tax percentage and add it to get the grand total.

### The Exclusive GST Formula:
*   **GST Amount** = Taxable Base Price × (GST Rate ÷ 100)
*   **Total Invoice Value** = Taxable Base Price + GST Amount

### Practical Example:
If you sell computer accessories for a net taxable price of ₹5,000 at a 18% slab rate:
*   GST Amount = 5,000 × (18 ÷ 100) = ₹900
*   Grand Total = 5,000 + 900 = ₹5,900
*   *For local supplies:* Split the ₹900 tax equally into ₹450 CGST and ₹450 SGST.

---

## 2. Removing GST from a Total Price (Inclusive extraction)
If you sell at a tax-inclusive retail price (MRP), you cannot simply multiply the total by 18% to find the tax. That would result in double-taxing the tax itself. Instead, you must run a reverse division to isolate the pre-tax base cost.

### The Inclusive GST Formula:
*   **Base Taxable Value** = Inclusive Price ÷ (1 + GST Rate ÷ 100)
*   **GST Tax Amount** = Inclusive Price − Base Taxable Value

### Practical Example:
If a restaurant bill is ₹1,180 inclusive of 18% GST:
*   Base Taxable Value = 1,180 ÷ (1 + 18/100) = 1,180 ÷ 1.18 = ₹1,000
*   GST Tax Amount = 1,180 − 1,000 = ₹180
*   *For local supplies:* CGST is ₹90 and SGST is ₹90.

---

## 3. GST Calculation Formulas in Microsoft Excel
Automating calculations in spreadsheets is a standard accounting practice. Below are the basic Excel formulas you can copy:

| Task | Excel Formula | Description |
| :--- | :--- | :--- |
| **Add 18% GST** | `=A1 * 1.18` | Computes the inclusive price where A1 is the base price. |
| **Extract 18% GST** | `=A1 - (A1 / 1.18)` | Extracts the 18% tax portion where A1 is the inclusive price. |
| **Find Base Price (18%)** | `=A1 / 1.18` | Extracts the net taxable value from an inclusive price. |

Use these formulas systematically during ledger reconciliations.
