import assert from 'node:assert';

console.log('Testing GST Calculator Formulas...\n');

// 1. Standard GST Exclusive (Add GST)
function calculateExclusive(base, rate) {
  const gstAmount = Math.round(((base * rate) / 100) * 100) / 100;
  const total = Math.round((base + gstAmount) * 100) / 100;
  const cgst = Math.round((gstAmount / 2) * 100) / 100;
  const sgst = Math.round((gstAmount - cgst) * 100) / 100;
  const igst = gstAmount;
  return { base, rate, gstAmount, total, cgst, sgst, igst };
}

// Test: 10,000 at 18%
const res18 = calculateExclusive(10000, 18);
assert.strictEqual(res18.gstAmount, 1800);
assert.strictEqual(res18.total, 11800);
assert.strictEqual(res18.cgst, 900);
assert.strictEqual(res18.sgst, 900);
assert.strictEqual(res18.igst, 1800);
console.log('✓ Exclusive 18% GST: PASS (₹10,000 -> GST ₹1,800, Total ₹11,800)');

// Test: 5,000 at 5%
const res5 = calculateExclusive(5000, 5);
assert.strictEqual(res5.gstAmount, 250);
assert.strictEqual(res5.total, 5250);
assert.strictEqual(res5.cgst, 125);
assert.strictEqual(res5.sgst, 125);
console.log('✓ Exclusive 5% GST: PASS (₹5,000 -> GST ₹250, Total ₹5,250)');

// Test: 20,000 at 28%
const res28 = calculateExclusive(20000, 28);
assert.strictEqual(res28.gstAmount, 5600);
assert.strictEqual(res28.total, 25600);
assert.strictEqual(res28.cgst, 2800);
assert.strictEqual(res28.sgst, 2800);
console.log('✓ Exclusive 28% GST: PASS (₹20,000 -> GST ₹5,600, Total ₹25,600)');

// 2. Reverse GST / Inclusive (Extract GST)
function calculateInclusive(total, rate) {
  const base = Math.round((total / (1 + rate / 100)) * 100) / 100;
  const gstAmount = Math.round((total - base) * 100) / 100;
  const cgst = Math.round((gstAmount / 2) * 100) / 100;
  const sgst = Math.round((gstAmount - cgst) * 100) / 100;
  return { total, rate, base, gstAmount, cgst, sgst };
}

// Test: 11,800 inclusive at 18%
const rev18 = calculateInclusive(11800, 18);
assert.strictEqual(rev18.base, 10000);
assert.strictEqual(rev18.gstAmount, 1800);
assert.strictEqual(rev18.cgst, 900);
assert.strictEqual(rev18.sgst, 900);
console.log('✓ Reverse 18% GST: PASS (₹11,800 -> Base ₹10,000, Tax ₹1,800)');

// Test: 10,500 inclusive at 5%
const rev5 = calculateInclusive(10500, 5);
assert.strictEqual(rev5.base, 10000);
assert.strictEqual(rev5.gstAmount, 500);
assert.strictEqual(rev5.cgst, 250);
assert.strictEqual(rev5.sgst, 250);
console.log('✓ Reverse 5% GST: PASS (₹10,500 -> Base ₹10,000, Tax ₹500)');

// 3. GST Split (50:50)
function calculateSplit(gstTax) {
  const cgst = Math.round((gstTax / 2) * 100) / 100;
  const sgst = Math.round((gstTax - cgst) * 100) / 100;
  return { gstTax, cgst, sgst };
}
const splitTest = calculateSplit(1800);
assert.strictEqual(splitTest.cgst, 900);
assert.strictEqual(splitTest.sgst, 900);
console.log('✓ GST Split: PASS (₹1,800 -> CGST ₹900, SGST ₹900)');

// 4. Section 50 Interest
function calculateInterest(netCashTax, days, annualRate = 18) {
  return Math.round(((netCashTax * annualRate * days) / (365 * 100)) * 100) / 100;
}
// Test: ₹1,00,000 for 30 days at 18%
const intRes = calculateInterest(100000, 30, 18);
assert.strictEqual(intRes, 1479.45);
console.log('✓ Section 50 Interest: PASS (₹1,00,000 for 30 days @ 18% = ₹1,479.45)');

// 5. Rule 89(4) Export Refund
function calculateExportRefund(zeroRatedTurnover, netItc, adjustedTotalTurnover) {
  return Math.round(((zeroRatedTurnover * netItc) / adjustedTotalTurnover) * 100) / 100;
}
// Test: ₹50,00,000 export turnover, ₹10,00,000 net ITC, ₹1,00,00,000 adjusted turnover
const expRefund = calculateExportRefund(5000000, 1000000, 10000000);
assert.strictEqual(expRefund, 500000);
console.log('✓ Rule 89(4) Export Refund: PASS (50% export ratio = ₹5,00,000 refund)');

// 6. Discount & GST
function calculateDiscountAndGst(originalPrice, discountPercent, gstRate) {
  const discountAmount = Math.round(((originalPrice * discountPercent) / 100) * 100) / 100;
  const discountedBase = Math.round((originalPrice - discountAmount) * 100) / 100;
  const gstAmount = Math.round(((discountedBase * gstRate) / 100) * 100) / 100;
  const grandTotal = Math.round((discountedBase + gstAmount) * 100) / 100;
  return { originalPrice, discountAmount, discountedBase, gstAmount, grandTotal };
}
// Test: ₹1,000 item, 10% discount, 18% GST -> base ₹900, GST ₹162, Total ₹1,062
const discRes = calculateDiscountAndGst(1000, 10, 18);
assert.strictEqual(discRes.discountAmount, 100);
assert.strictEqual(discRes.discountedBase, 900);
assert.strictEqual(discRes.gstAmount, 162);
assert.strictEqual(discRes.grandTotal, 1062);
console.log('✓ GST Discount: PASS (₹1,000 with 10% off + 18% GST = ₹1,062)');

console.log('\n========================================');
console.log('ALL STATUTORY GST CALCULATIONS VERIFIED!');
console.log('========================================');

