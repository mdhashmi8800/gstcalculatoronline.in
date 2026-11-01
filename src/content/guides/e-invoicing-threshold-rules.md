---
title: "E-Invoicing Rules & Invoice Reference Number (IRN) Guide"
metaTitle: "E-Invoicing Rules & IRN Guide: Thresholds, Mandates & FAQs"
metaDescription: "Comprehensive guide to GST E-Invoicing in India. Learn aggregate turnover thresholds (₹5 Cr), IRN generation workflow, signed QR codes, exemptions, and penalties."
date: "2026-07-15"
lastUpdated: "2026-10-31"
author: "Mehakma"
readTime: "12 min read"
slug: "e-invoicing-threshold-rules"
category: "Invoicing & E-Way Bill"
draft: false
faqs:
  - question: "What is the aggregate turnover threshold for E-Invoicing in India?"
    answer: "Currently, e-invoicing is mandatory for all registered businesses whose aggregate annual turnover exceeded ₹5 Crore in any preceding financial year from 2017-18 onwards."
  - question: "Can an E-Invoice (IRN) be modified after generation?"
    answer: "No. An IRN cannot be edited once generated. If there is an error, the IRN must be cancelled within 24 hours on the IRP portal. After 24 hours, modifications can only be made by issuing a Credit Note (CN) or Debit Note (DN) under Section 34."
  - question: "Can an E-Invoice be cancelled after generation?"
    answer: "Yes, an E-invoice (IRN) can be cancelled on the Invoice Registration Portal (IRP) within 24 hours of generation, provided the associated E-Way Bill is not already in transit."
  - question: "Does E-Invoicing apply to B2C (Business-to-Consumer) transactions?"
    answer: "No. E-invoicing under Rule 48(4) strictly applies to B2B supplies, export transactions, and supplies to SEZ developers/units. However, entities with turnover over ₹500 Cr must generate a Dynamic QR Code on B2C invoices."
  - question: "What happens if a taxpayer fails to generate an E-Invoice when mandatory?"
    answer: "Under Rule 48(5), an invoice issued without an IRN is legally invalid. The supplier faces penalties under Section 122 (up to ₹10,000 per invoice or tax amount, whichever is higher), and the buyer is barred from claiming Input Tax Credit (ITC)."
---

Electronic Invoicing (commonly known as **E-Invoicing**) is a transformative pillar of India's Goods and Services Tax (GST) compliance architecture. Introduced under **Rule 48(4) of the Central Goods and Services Tax (CGST) Rules, 2017**, e-invoicing is an automated, standardized protocol where Business-to-Business (B2B) invoices, credit notes, and debit notes are electronically uploaded, validated, and digitally signed by a government-authorized **Invoice Registration Portal (IRP)**.

Rather than creating an invoice directly on the government portal, businesses continue to generate invoices within their internal ERP or accounting software (such as Tally, SAP, Zoho Books, or Marg). That invoice data is then transmitted via API or bulk JSON upload to an IRP, which verifies the structure, generates a unique **Invoice Reference Number (IRN)**, appends a digital signature, and attaches a machine-readable **signed QR Code**.

In this authoritative manual, our indirect tax advisory team breaks down the statutory rules, current turnover thresholds, generation mechanics, sector exemptions, and penal safeguards governing electronic invoicing in India.

---

## 1. Aggregate Turnover Threshold & Evolution Timeline

The GST Council rolled out the e-invoicing system in phased tranches, gradually reducing the annual aggregate turnover threshold to bring MSMEs into the standardized digital net:

| Phase | Effective Date | Aggregate Turnover Threshold | Statutory Notification |
| :--- | :--- | :--- | :--- |
| **Phase I** | 1st October 2020 | ₹500 Crore+ | Notification No. 13/2020 – Central Tax |
| **Phase II** | 1st January 2021 | ₹100 Crore+ | Notification No. 88/2020 – Central Tax |
| **Phase III** | 1st April 2021 | ₹50 Crore+ | Notification No. 05/2021 – Central Tax |
| **Phase IV** | 1st April 2022 | ₹20 Crore+ | Notification No. 01/2022 – Central Tax |
| **Phase V** | 1st October 2022 | ₹10 Crore+ | Notification No. 17/2022 – Central Tax |
| **Phase VI** | 1st August 2023 | ₹5 Crore+ (Current Mandate) | Notification No. 10/2023 – Central Tax |

### How to Calculate Aggregate Turnover for Threshold Testing
Under Section 2(6) of the CGST Act, **Aggregate Turnover** includes the sum total of:
- All taxable supplies (excluding inward supplies on which tax is payable on reverse charge basis)
- Exempt supplies
- Export of goods or services or both
- Inter-state supplies of persons having the same Permanent Account Number (PAN) across all states in India

> [!IMPORTANT]
> The threshold condition states: If a taxpayer's aggregate turnover has exceeded **₹5 Crore in *any* financial year from 2017-18 onwards**, the business is legally obligated to implement e-invoicing from the effective date, even if turnover falls below ₹5 Crore in subsequent years.

---

## 2. Transactions Subject to E-Invoicing

E-Invoicing is mandatory for specific categories of outward commercial transactions:
1. **Business-to-Business (B2B) Tax Invoices:** Supplies of goods or services provided to another GST-registered person.
2. **Supplies to Special Economic Zones (SEZ):** Supplies made to SEZ Developers or SEZ Units (with or without payment of IGST).
3. **Deemed Exports:** Outward supplies categorized under deemed export notifications.
4. **Export Supplies:** Direct export of goods or services outside India (both with payment of tax and under Letter of Undertaking/Bond).
5. **Credit Notes and Debit Notes:** Credit and debit notes issued under Section 34 of the CGST Act relating to B2B or export transactions.

---

## 3. Exempted Categories & Non-Applicable Entities

Rule 48(4) explicitly exempts certain classes of taxpayers and transaction streams from the e-invoicing mandate, regardless of their aggregate annual turnover:

1. **Special Economic Zone (SEZ) Units:** While supplies *to* an SEZ unit require e-invoicing, SEZ units themselves are exempt from issuing e-invoices (Note: SEZ developers are *not* exempt).
2. **Insurers, Banking Companies & Financial Institutions:** Including Non-Banking Financial Companies (NBFCs) and cooperative banks.
3. **Goods Transport Agencies (GTA):** Supplying services in relation to transportation of goods by road in a goods carriage.
4. **Suppliers of Passenger Transportation Services:** E.g., airlines, luxury bus operators, and passenger rail services.
5. **Multiplex Cinema Theatres:** Admission to exhibition of cinematograph films in multiplex screens issuing electronic tickets.
6. **Government Departments & Local Authorities:** Exempted via Notification No. 73/2020-Central Tax.
7. **Business-to-Consumer (B2C) Supplies:** Standard consumer sales do not require an IRN under Rule 48(4) (though taxpayers with >₹500 Cr turnover must display a dynamic B2C QR code under separate provisions).

---

## 4. Architectural Anatomy of an E-Invoice

An authentic electronic invoice consists of three statutory data elements:

### 4.1 Invoice Reference Number (IRN)
The IRN is a **64-character alphanumeric cryptographic hash** computed via the SHA-256 algorithm. It is generated using a combination of:
- Supplier GSTIN
- Document Type (e.g., INV, CRN, DBN)
- Document Number
- Financial Year (e.g., 2026-27)

Because the hash function is deterministic and unique, duplicate invoice numbers for the same financial year are automatically rejected by the IRP validation engine.

### 4.2 Digitally Signed QR Code
The IRP signs the payload containing key invoice parameters (Supplier GSTIN, Buyer GSTIN, Invoice Number, Date, Invoice Value, Number of line items, HSN Code of primary item, and the unique IRN) with its own private key. This signed QR code must be rendered on the face of the printed or PDF invoice copy provided to the customer.

### 4.3 Standardized JSON Schema (INV-01)
India adopted the international standard format (PEPPOL / ISO 20022), designated as **Form GST INV-01**. This ensures that ERPs across different companies and software platforms communicate seamlessly with standardized tax classifications.

---

## 5. End-to-End Workflow: Generating an E-Invoice

```
[Supplier ERP / Accounting Software]
               │ (Prepares Invoice JSON adhering to INV-01 Schema)
               ▼
   [Invoice Registration Portal (IRP)]
   (e.g., einvoice1.gst.gov.in / Cygnet / Cleartax)
               │ (Validates schema, de-duplicates hash, signs payload)
               ▼
   [Generates IRN + Signed QR Code]
               │
      ┌────────┴────────┐
      ▼                 ▼
[Supplier ERP]   [GST Common Portal] ──► Auto-populates GSTR-1
(Prints signed   [E-Way Bill Portal]  ──► Auto-creates Part-A of EWB
 QR code on bill)
```

1. **Generation in ERP:** The accountant records the transaction in billing software.
2. **Payload Creation:** The software extracts required mandatory fields (GSTIN, HSN, Place of Supply, item values, tax splits) into a standardized JSON file.
3. **IRP Submission:** The JSON payload is posted via secure API or web upload to one of the authorized IRP portals (NIC or private authorized partners).
4. **Validation & Hashing:** The IRP verifies GSTIN validity, checks for hash uniqueness, applies a digital signature, and attaches the 64-character IRN and QR code.
5. **Data Mirroring:** The IRP automatically pushes the confirmed invoice data to:
   - **Form GSTR-1** of the supplier for effortless return preparation.
   - **Form GSTR-2B** of the buyer for automated input tax credit reconciliation.
   - **E-Way Bill System** to instantly generate Part-A of Form GST EWB-01.

---

## 6. Amendment, Modification & Cancellation Rules

Tax professionals frequently face scenarios requiring invoice cancellations or billing adjustments:

### Can an E-Invoice be Modified?
**No.** Once an IRN is created on the IRP, the record cannot be edited or modified under any circumstances. If there is a typographical or calculation error, the taxpayer has only two choices:
1. **Cancel the IRN within 24 hours:** If the 24-hour window has not elapsed, cancel the IRN directly on the IRP. Note that an IRN cannot be cancelled if an active E-Way Bill is attached and transit has begun.
2. **Issue a Credit Note / Debit Note:** If the 24-hour cancellation window has expired, the supplier must issue a credit note (to reduce value/tax) or debit note (to increase value/tax) under Section 34 of the CGST Act. The credit/debit note itself must then undergo the e-invoicing workflow on the IRP.

> [!WARNING]
> Re-using the same invoice number for a new IRN after cancellation is strictly prohibited by the IRP system. You must generate a fresh invoice with a new serial number.

---

## 7. Legal Ramifications of Non-Compliance

Operating without e-invoicing when legally mandated carries severe statutory repercussions for both supplier and buyer:

### 1. Invalidation of the Invoice (Rule 48(5))
Under Rule 48(5) of the CGST Rules, any invoice issued by a taxpayer subject to e-invoicing that lacks an IRN is **deemed to have not been issued at all**. 

### 2. Supplier Penalties (Section 122)
- **Failure to issue invoice:** Penalty of 100% of the tax due or ₹10,000, whichever is higher, under Section 122(1)(i).
- **Incorrect or improper invoice generation:** General penalty of up to ₹25,000 under Section 122(3)(e).

### 3. Buyer's Inability to Claim Input Tax Credit (ITC)
Under Section 16(2)(a), a registered person is entitled to claim ITC only if they are in possession of a valid tax invoice. Since an invoice missing a required IRN is legally void under Rule 48(5), **the buyer's Input Tax Credit will be disallowed by audit authorities**, leading to commercial disputes and blocked working capital.

### 4. Detention of Goods in Transit
Consignments intercepted during transit carrying an invoice that lacks a valid signed QR code can be detained under Section 129, resulting in penalties equal to 200% of the applicable tax.

---

## 8. Summary Checklist for Businesses

To guarantee flawless compliance with Indian e-invoicing regulations:
- [x] Verify your annual turnover across all financial years from 2017-18 to confirm whether your business crosses the ₹5 Crore threshold.
- [x] Integrate an API-enabled accounting package capable of generating PEPPOL/INV-01 compliant JSON payloads.
- [x] Ensure your master supplier and customer records feature valid 15-digit GSTINs, 6-digit HSN codes, and exact pin-code combinations.
- [x] Print the signed QR code visibly on all tax invoices delivered to corporate customers.
- [x] Reconcile monthly GSTR-1 figures with IRP records to verify 100% data transmission before filing GSTR-3B.
