export interface PDFData {
  baseAmount: string;
  cgst: string | null;
  sgst: string | null;
  igst: string | null;
  totalGst: string;
  effectiveRate: string;
  grandTotal: string;
  gstRate: string;
  isAdd: boolean;
  isIntrastate: boolean;
  title?: string;
}

// Convert numbers to words in Indian numbering format (e.g. Rupees Ten Thousand Only)
function numberToWordsIndian(num: number): string {
  if (num === 0) return 'Rupees Zero Only';
  
  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];
  
  function convertLessThanThousand(n: number): string {
    let str = '';
    if (n >= 100) {
      str += ones[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n > 0) {
      if (str !== '') str += 'and ';
      if (n < 20) {
        str += ones[n] + ' ';
      } else {
        str += tens[Math.floor(n / 10)] + ' ';
        if (n % 10 > 0) {
          str += ones[n % 10] + ' ';
        }
      }
    }
    return str.trim();
  }
  
  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);
  
  let result = '';
  
  if (rupees > 0) {
    let temp = rupees;
    const crores = Math.floor(temp / 10000000);
    temp %= 10000000;
    const lakhs = Math.floor(temp / 100000);
    temp %= 100000;
    const thousands = Math.floor(temp / 1000);
    temp %= 1000;
    const hundredsAndBelow = temp;
    
    if (crores > 0) {
      result += convertLessThanThousand(crores) + ' Crore ';
    }
    if (lakhs > 0) {
      result += convertLessThanThousand(lakhs) + ' Lakh ';
    }
    if (thousands > 0) {
      result += convertLessThanThousand(thousands) + ' Thousand ';
    }
    if (hundredsAndBelow > 0) {
      result += convertLessThanThousand(hundredsAndBelow) + ' ';
    }
    result = result.trim();
  } else {
    result = 'Zero';
  }
  
  let words = 'Rupees ' + result;
  
  if (paise > 0) {
    words += ' and ' + convertLessThanThousand(paise) + ' Paise';
  }
  
  words += ' Only';
  return words.replace(/\s+/g, ' ');
}

// Variables to store loaded base64 fonts
let robotoRegularBase64: string | null = null;
let robotoBoldBase64: string | null = null;
let robotoItalicBase64: string | null = null;

// Convert ArrayBuffer to Base64 in browser
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Fetch and load Roboto fonts concurrently
async function loadRobotoFonts() {
  if (robotoRegularBase64 && robotoBoldBase64 && robotoItalicBase64) return;

  const [regularRes, boldRes, italicRes] = await Promise.all([
    fetch('/fonts/Roboto-Regular.ttf'),
    fetch('/fonts/Roboto-Bold.ttf'),
    fetch('/fonts/Roboto-Italic.ttf')
  ]);

  if (!regularRes.ok || !boldRes.ok || !italicRes.ok) {
    throw new Error('Failed to fetch Roboto fonts from the server');
  }

  const [regularBuf, boldBuf, italicBuf] = await Promise.all([
    regularRes.arrayBuffer(),
    boldRes.arrayBuffer(),
    italicRes.arrayBuffer()
  ]);

  robotoRegularBase64 = arrayBufferToBase64(regularBuf);
  robotoBoldBase64 = arrayBufferToBase64(boldBuf);
  robotoItalicBase64 = arrayBufferToBase64(italicBuf);
}

// Format numbers and values into clean Indian Currency Format
function formatIndianCurrency(valueStrOrNum: string | number): string {
  let num: number;
  if (typeof valueStrOrNum === 'string') {
    num = parseFloat(valueStrOrNum.replace(/[^\d.-]/g, '')) || 0;
  } else {
    num = valueStrOrNum;
  }
  
  const formatter = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `₹${formatter.format(num)}`;
}

export async function generateCalculationPDF(customData?: Partial<PDFData>) {
  // 1. Load jsPDF and QRious if not present
  if (!(window as any).jspdf) {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    document.head.appendChild(s);
    await new Promise(resolve => s.onload = resolve);
  }
  if (!(window as any).QRious) {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js';
    document.head.appendChild(s);
    await new Promise(resolve => s.onload = resolve);
  }

  // Load custom fonts before PDF construction
  await loadRobotoFonts();

  const { jsPDF } = (window as any).jspdf;
  const QRious = (window as any).QRious;

  // 2. Grabbing data from the DOM as fallback
  const getElText = (id: string): string => {
    const el = document.getElementById(id);
    return el ? el.innerText.trim() : '';
  };
  const isHidden = (id: string): boolean => {
    const el = document.getElementById(id);
    return el ? el.classList.contains('hidden') : true;
  };

  const isHomepage = !!document.getElementById('home-res-taxable');

  const rawBase = customData?.baseAmount || 
    (isHomepage ? getElText('home-res-taxable') : getElText('res-taxable-val')) || '₹0.00';
  const baseAmount = formatIndianCurrency(rawBase);
  
  const rawTotalGst = customData?.totalGst || 
    (isHomepage ? getElText('home-res-total-tax') : getElText('res-total-tax')) || '₹0.00';
  const totalGst = formatIndianCurrency(rawTotalGst);
  
  const rawGrandTotal = customData?.grandTotal || 
    (isHomepage ? getElText('home-res-grand-total') : getElText('res-grand-total')) || '₹0.00';
  const grandTotal = formatIndianCurrency(rawGrandTotal);
  
  const effectiveRate = customData?.effectiveRate || 
    (isHomepage ? getElText('home-res-effective') : getElText('res-effective-rate')) || '0.00%';

  const isIntrastate = customData?.isIntrastate !== undefined ? customData.isIntrastate :
    (isHomepage ? !isHidden('home-res-cgst-row') : !isHidden('res-cgst-row'));

  const cgst = customData?.cgst !== undefined ? customData.cgst :
    (isIntrastate ? (isHomepage ? getElText('home-res-cgst') : getElText('res-cgst-val')) : null);
  const formattedCgst = cgst ? formatIndianCurrency(cgst) : null;

  const sgst = customData?.sgst !== undefined ? customData.sgst :
    (isIntrastate ? (isHomepage ? getElText('home-res-sgst') : getElText('res-sgst-val')) : null);
  const formattedSgst = sgst ? formatIndianCurrency(sgst) : null;

  const igst = customData?.igst !== undefined ? customData.igst :
    (!isIntrastate ? (isHomepage ? getElText('home-res-igst') : getElText('res-igst-val')) : null);
  const formattedIgst = igst ? formatIndianCurrency(igst) : null;

  // Calculate rate dynamically if not present
  let gstRate = customData?.gstRate;
  if (!gstRate) {
    const baseNum = parseFloat(baseAmount.replace(/[^\d.-]/g, '')) || 0;
    const taxNum = parseFloat(totalGst.replace(/[^\d.-]/g, '')) || 0;
    const computedRate = baseNum > 0 ? (taxNum / baseNum * 100) : 0;
    gstRate = computedRate.toFixed(2).replace(/\.00$/, '') + '%';
  }

  // Determine GST type (Add / Remove)
  let isAdd = customData?.isAdd;
  if (isAdd === undefined) {
    const typeRad = document.querySelector('input[name="calc-type"]:checked') as HTMLInputElement | null;
    if (typeRad) {
      isAdd = typeRad.value === 'add';
    } else {
      const typeHidden = document.getElementById('calcTypeHidden') as HTMLInputElement | null;
      if (typeHidden) {
        isAdd = typeHidden.value === 'add';
      } else {
        const activeSegment = document.querySelector('.segmented-btn.active');
        if (activeSegment) {
          isAdd = activeSegment.textContent?.toLowerCase().includes('add') ?? true;
        } else {
          isAdd = true;
        }
      }
    }
  }

  const title = customData?.title || 
    (document.querySelector('h1')?.innerText?.replace(/Calculator.*/gi, 'Report') || 'GST Calculation Report');

  // Report unique metadata
  const reportNo = Math.floor(100000 + Math.random() * 900000);
  const reportId = `GCR-${reportNo}`;
  const generatedAt = new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // Calculate shareable URL for the QR code
  const getShareableURL = (): string => {
    const url = new URL(window.location.href);
    url.search = '';
    const form = document.querySelector('form');
    if (form) {
      form.querySelectorAll('input, select, textarea').forEach((input) => {
        const el = input as HTMLInputElement | HTMLSelectElement;
        if (el.name) {
          if ((el.type === 'radio' || el.type === 'checkbox')) {
            const radio = el as HTMLInputElement;
            if (radio.checked) url.searchParams.set(radio.name, radio.value);
          } else if (el.value !== '') {
            url.searchParams.set(el.name, el.value);
          }
        }
      });
    } else {
      const amountInput = document.getElementById('home-amount') as HTMLInputElement | null;
      const calcRateHidden = document.getElementById('calcRateHidden') as HTMLInputElement | null;
      const calcTypeHidden = document.getElementById('calcTypeHidden') as HTMLInputElement | null;
      const taxTypeRadio = document.querySelector('input[name="home-tax-type"]:checked') as HTMLInputElement | null;
      if (amountInput) {
        const rawAmount = amountInput.value.replace(/[^\d.-]/g, '');
        url.searchParams.set('amount', rawAmount);
      }
      if (calcRateHidden) url.searchParams.set('rate', calcRateHidden.value);
      if (calcTypeHidden) url.searchParams.set('type', calcTypeHidden.value);
      if (taxTypeRadio) url.searchParams.set('taxtype', taxTypeRadio.value);
    }
    return url.toString();
  };

  let shareUrl = getShareableURL();
  if (!shareUrl.includes('?') || shareUrl.endsWith('?')) {
    shareUrl = window.location.href;
  }

  // Create QR Code
  const qr = new QRious({
    value: shareUrl,
    size: 150,
    level: 'M'
  });
  const qrDataUrl = qr.toDataURL();

  // Initialize jsPDF document (A4 size: 210mm x 297mm)
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Register embedded Roboto fonts
  doc.addFileToVFS('Roboto-Regular.ttf', robotoRegularBase64!);
  doc.addFileToVFS('Roboto-Bold.ttf', robotoBoldBase64!);
  doc.addFileToVFS('Roboto-Italic.ttf', robotoItalicBase64!);

  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
  doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
  doc.addFont('Roboto-Italic.ttf', 'Roboto', 'italic');

  // Set default font to Roboto
  doc.setFont('Roboto', 'normal');

  // --- BRANDED HEADER ---
  // Vector Logo Icon
  doc.setFillColor(16, 185, 129); // Emerald green (#10b981)
  doc.roundedRect(15, 15, 10, 10, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(7);
  doc.text('GST', 20, 21.5, { align: 'center' });

  // Brand Name
  doc.setTextColor(15, 23, 42); // Navy (#0f172a)
  doc.setFontSize(13);
  doc.text('gstcalculatoronline', 28, 21.5);
  const brandW = doc.getTextWidth('gstcalculatoronline');
  doc.setTextColor(16, 185, 129); // Emerald Green
  doc.text('.in', 28 + brandW, 21.5);

  // Subtitle
  doc.setTextColor(100, 116, 139); // Muted Slate (#64748b)
  doc.setFont('Roboto', 'normal');
  doc.setFontSize(7.5);
  doc.text('PREMIUM TAX ACCOUNTING SUITE', 28, 25.5);

  // Document Title
  doc.setTextColor(15, 23, 42);
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(14.5);
  doc.text(title, 15, 36);

  // Report Meta details
  doc.setFont('Roboto', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Report ID: ', 15, 41.5);
  doc.setFont('Roboto', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(reportId, 30, 41.5);

  doc.setFont('Roboto', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Generated: ', 65, 41.5);
  doc.setFont('Roboto', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(generatedAt, 81, 41.5);

  // QR Code (verification link)
  doc.addImage(qrDataUrl, 'PNG', 170, 15, 25, 25);
  doc.setFont('Roboto', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(6.5);
  doc.text('Scan to verify calculation', 182.5, 42.5, { align: 'center' });

  // Divider line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.25);
  doc.line(15, 46, 195, 46);

  // --- CALCULATION DETAILS GRID ---
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, 50, 180, 28, 1.5, 1.5, 'F');
  doc.setDrawColor(241, 245, 249);
  doc.roundedRect(15, 50, 180, 28, 1.5, 1.5, 'S');

  // Draw Grid Panel Vertical Divider
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.2);
  doc.line(105, 53, 105, 75);

  const keyX1 = 22, valX1 = 52;
  const keyX2 = 112, valX2 = 145;
  let gridY = 57;

  const drawPair = (key: string, val: string, kX: number, vX: number, curY: number) => {
    doc.setFont('Roboto', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.text(key, kX, curY);
    doc.setFont('Roboto', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(8.5);
    doc.text(val, vX, curY);
  };

  drawPair('Country:', 'India (IN)', keyX1, valX1, gridY);
  drawPair('GST Rate:', gstRate, keyX2, valX2, gridY);
  gridY += 7;
  drawPair('Currency:', 'INR (Rupees, ₹)', keyX1, valX1, gridY);
  drawPair('GST Type:', isAdd ? 'Add GST (Exclusive)' : 'Remove GST (Inclusive)', keyX2, valX2, gridY);
  gridY += 7;
  drawPair('Supply Type:', isIntrastate ? 'Intra-State (Local Split)' : 'Inter-State (IGST)', keyX1, valX1, gridY);
  drawPair('Effective Rate:', effectiveRate, keyX2, valX2, gridY);

  // --- FINANCIAL BREAKDOWN SUMMARY TABLE ---
  let tableY = 86;
  doc.setFont('Roboto', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10.5);
  doc.text('Financial Breakdown Statement', 15, tableY);

  // Header background
  doc.setFillColor(241, 245, 249);
  doc.rect(15, tableY + 4, 180, 8, 'F');

  // Header texts
  doc.setFont('Roboto', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(8);
  doc.text('PARTICULARS / TAX ITEM', 20, tableY + 9.5);
  doc.text('TAX RATE', 120, tableY + 9.5, { align: 'center' });
  doc.text('AMOUNT (INR)', 190, tableY + 9.5, { align: 'right' });

  interface TableRow {
    label: string;
    rate: string;
    val: string;
    isBold?: boolean;
    isTotal?: boolean;
  }

  const tableRows: TableRow[] = [
    { label: 'Base Taxable Amount (Principal Value)', rate: isAdd ? '-' : '100%', val: baseAmount }
  ];

  if (isIntrastate) {
    const rateHalf = (parseFloat(gstRate) / 2).toFixed(2).replace(/\.00$/, '') + '%';
    tableRows.push({ label: 'CGST (Central Goods & Services Tax)', rate: rateHalf, val: formattedCgst || '₹0.00' });
    tableRows.push({ label: 'SGST (State Goods & Services Tax)', rate: rateHalf, val: formattedSgst || '₹0.00' });
  } else {
    tableRows.push({ label: 'IGST (Integrated Goods & Services Tax)', rate: gstRate, val: formattedIgst || '₹0.00' });
  }

  tableRows.push({ label: 'Total Tax Component (GST)', rate: gstRate, val: totalGst, isBold: true });
  tableRows.push({ label: 'Grand Invoice Total (Tax Inclusive)', rate: isAdd ? '100% + GST' : '100%', val: grandTotal, isBold: true, isTotal: true });

  let rowY = tableY + 12;
  tableRows.forEach((row) => {
    if (row.isTotal) {
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.35);
      doc.line(15, rowY, 195, rowY);
      rowY += 2;
    }

    if (row.isBold) {
      doc.setFont('Roboto', 'bold');
      doc.setTextColor(15, 23, 42);
    } else {
      doc.setFont('Roboto', 'normal');
      doc.setTextColor(51, 65, 85);
    }

    doc.setFontSize(8.5);
    doc.text(row.label, 20, rowY + 5);
    doc.text(row.rate, 120, rowY + 5, { align: 'center' });
    doc.text(row.val, 190, rowY + 5, { align: 'right' });

    if (!row.isTotal) {
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.2);
      doc.line(15, rowY + 8, 195, rowY + 8);
      rowY += 8;
    } else {
      rowY += 8;
    }
  });

  // --- GRAND TOTAL HIGHLIGHT CARD ---
  const cardY = rowY + 4;
  doc.setFillColor(240, 253, 244); // light green background
  doc.setDrawColor(16, 185, 129); // emerald border
  doc.setLineWidth(0.35);
  doc.roundedRect(15, cardY, 180, 20, 1.5, 1.5, 'FD');

  // Label
  doc.setFont('Roboto', 'bold');
  doc.setTextColor(4, 120, 87); // emerald-700
  doc.setFontSize(8.5);
  doc.text('GRAND TOTAL (IN WORDS)', 20, cardY + 6);

  // In Words text
  const grandTotalNum = parseFloat(grandTotal.replace(/[^\d.-]/g, '')) || 0;
  const inWords = numberToWordsIndian(grandTotalNum);
  doc.setFont('Roboto', 'italic');
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(7.5);
  const wrappedWords = doc.splitTextToSize(inWords, 115);
  doc.text(wrappedWords, 20, cardY + 11.5);

  // Large Amount Value
  doc.setFont('Roboto', 'bold');
  doc.setTextColor(5, 150, 105); // emerald-600
  doc.setFontSize(16.5);
  doc.text(grandTotal, 190, cardY + 12.5, { align: 'right' });

  // --- TAX COMPOSITION BREAKDOWN GRAPH ---
  const chartY = cardY + 28;
  doc.setFont('Roboto', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10.5);
  doc.text('Tax Composition Breakdown', 15, chartY);

  doc.setFont('Roboto', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.text('Visual representation of the ratio between base amount and total GST tax.', 15, chartY + 4);

  // Stacked bar calculation
  const barY = chartY + 7;
  const barH = 6;
  const totalBarW = 180;

  const baseNum = parseFloat(baseAmount.replace(/[^\d.-]/g, '')) || 0;
  const taxNum = parseFloat(totalGst.replace(/[^\d.-]/g, '')) || 0;
  const totalNum = baseNum + taxNum;
  const basePct = totalNum > 0 ? (baseNum / totalNum * 100) : 100;
  const gstPct = 100 - basePct;

  const baseBarW = (totalBarW * basePct) / 100;
  const gstBarW = (totalBarW * gstPct) / 100;

  // Background
  doc.setFillColor(241, 245, 249);
  doc.rect(15, barY, totalBarW, barH, 'F');

  // Base segment (Dark Slate / Navy)
  if (baseBarW > 0) {
    doc.setFillColor(30, 41, 59);
    doc.rect(15, barY, baseBarW, barH, 'F');
  }

  // GST segment (Emerald Green)
  if (gstBarW > 0) {
    doc.setFillColor(16, 185, 129);
    doc.rect(15 + baseBarW, barY, gstBarW, barH, 'F');
  }

  // Outline Border
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.25);
  doc.rect(15, barY, totalBarW, barH, 'S');

  // Legend and Labels
  const legendY = barY + 10;
  
  // Base Legend
  doc.setFillColor(30, 41, 59);
  doc.rect(20, legendY - 2, 3, 3, 'F');
  doc.setFont('Roboto', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(`Base Taxable Amount: ${basePct.toFixed(1)}% (${baseAmount})`, 25, legendY);

  // GST Legend
  doc.setFillColor(16, 185, 129);
  doc.rect(110, legendY - 2, 3, 3, 'F');
  doc.text(`GST Tax Component: ${gstPct.toFixed(1)}% (${totalGst})`, 115, legendY);

  // --- CALCULATION NOTES & REGULATORY NOTICE ---
  const notesY = legendY + 10;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, notesY, 180, 24, 1.5, 1.5, 'F');
  doc.setDrawColor(241, 245, 249);
  doc.roundedRect(15, notesY, 180, 24, 1.5, 1.5, 'S');

  doc.setFont('Roboto', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(8);
  doc.text('Calculation Notes & Compliance', 20, notesY + 5.5);

  doc.setFont('Roboto', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(7);
  
  const formulaStr = isAdd 
    ? `Formula used (Exclusive GST): GST Amount = Base Amount x (GST Rate / 100); Grand Total = Base Amount + GST Amount.`
    : `Formula used (Inclusive GST): Base Amount = Inclusive Amount / (1 + GST Rate / 100); GST Amount = Inclusive Amount - Base Amount.`;
  
  doc.text(formulaStr, 20, notesY + 10);
  doc.text('Tax split and computations strictly follow CGST/SGST/IGST divisions under the Indian Goods and Services Tax (GST) Act, 2017.', 20, notesY + 14);

  doc.setFont('Roboto', 'italic');
  doc.setTextColor(100, 116, 139);
  doc.text('Notice: This is an auto-generated accounting statement computed via gstcalculatoronline.in. No physical signature is required.', 20, notesY + 18.5);

  // --- COMPLIANT FOOTER ---
  const footerY = 276;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.25);
  doc.line(15, footerY - 5, 195, footerY - 5);

  // Disclaimer text
  doc.setFont('Roboto', 'normal');
  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFontSize(6.2);
  const disclaimerText = 'Disclaimer: This report is for information purposes and verification check only. The calculations are verified mathematically but should be double-checked with a certified Chartered Accountant (CA) or tax consultant before commercial filings.';
  const wrappedDisclaimer = doc.splitTextToSize(disclaimerText, 130);
  doc.text(wrappedDisclaimer, 15, footerY - 1.5);

  // Metadata and links
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.setFont('Roboto', 'bold');
  doc.text('www.gstcalculatoronline.in', 195, footerY, { align: 'right' });
  doc.setFont('Roboto', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(`ID: ${reportId} | Version: 1.2.0 | Page 1 of 1`, 195, footerY + 4, { align: 'right' });

  // Download PDF
  const reportNoFormatted = reportNo.toString();
  doc.save(`GST-Calculation-Report-${reportNoFormatted}.pdf`);
}
