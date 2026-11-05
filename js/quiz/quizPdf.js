// Kajaria Tile Quiz — Client-Side Print & PDF Specification Generator
// Formats an A4 presentation sheet with Kajaria branding, specifications, and dealer notes.

import { logQuizEvent } from './quizData.js';

export function generateQuizPDF(quizState) {
  const { answers, results, activeMatchIndex } = quizState;
  const match = results[activeMatchIndex] || results[0];
  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const spaceName = (answers.space || 'Bathroom').replace('-', ' ').toUpperCase();
  const applicationName = (answers.application || 'both').toUpperCase();

  // Create printable popup window
  const printWindow = window.open('', '_blank', 'width=900,height=800');
  if (!printWindow) {
    alert('Please allow popups to download or print your Tile Suggestion PDF.');
    return;
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Kajaria Ceramics — Tile Direction (${spaceName})</title>
  <style>
    @page {
      size: A4;
      margin: 15mm 15mm 15mm 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.5;
      background: #ffffff;
      padding: 24px;
    }
    .pdf-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #15508B;
      padding-bottom: 16px;
      margin-bottom: 20px;
    }
    .pdf-logo {
      font-size: 26px;
      font-weight: 900;
      font-style: italic;
      color: #15508B;
      letter-spacing: -0.5px;
    }
    .pdf-tagline {
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .pdf-meta {
      text-align: right;
      font-size: 12px;
      color: #64748b;
    }
    .pdf-title-banner {
      background: #edf4fa;
      border-left: 4px solid #15508B;
      padding: 14px 18px;
      border-radius: 4px;
      margin-bottom: 22px;
    }
    .pdf-title-banner h1 {
      font-size: 20px;
      color: #082038;
      margin-bottom: 4px;
    }
    .pdf-title-banner p {
      font-size: 13px;
      color: #475569;
    }
    .summary-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 14px 0 22px;
    }
    .chip {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      color: #334155;
    }
    .section-title {
      font-size: 15px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #082038;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      margin-bottom: 14px;
    }
    .tiles-grid {
      display: grid;
      grid-template-columns: ${match.floorTile && match.wallTile ? '1fr 1fr' : '1fr'};
      gap: 16px;
      margin-bottom: 22px;
    }
    .tile-card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px;
      background: #fafafa;
    }
    .tile-role {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: #15508B;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .tile-name {
      font-size: 16px;
      font-weight: 700;
      color: #082038;
      margin-bottom: 4px;
    }
    .tile-sub {
      font-size: 12px;
      color: #64748b;
      margin-bottom: 10px;
    }
    .tile-img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 10px;
    }
    .specs-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      margin-top: 8px;
    }
    .specs-table td {
      padding: 4px 0;
      border-bottom: 1px solid #f1f5f9;
    }
    .specs-label {
      color: #64748b;
      width: 45%;
    }
    .specs-val {
      font-weight: 600;
      color: #1e293b;
    }
    .reasons-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 14px 18px;
      margin-bottom: 20px;
    }
    .reasons-box h4 {
      font-size: 13px;
      font-weight: 700;
      color: #082038;
      margin-bottom: 8px;
    }
    .reasons-list {
      list-style-type: none;
      font-size: 12px;
      color: #334155;
    }
    .reasons-list li {
      margin-bottom: 6px;
      position: relative;
      padding-left: 18px;
    }
    .reasons-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #15508B;
      font-weight: 800;
    }
    .disclaimer-box {
      border-top: 1px dashed #cbd5e1;
      padding-top: 14px;
      margin-top: 24px;
      font-size: 10px;
      color: #64748b;
      line-height: 1.6;
    }
    .print-actions {
      text-align: center;
      margin-bottom: 20px;
      padding: 12px;
      background: #082038;
      color: #ffffff;
      border-radius: 6px;
    }
    .btn-print {
      background: #15508B;
      color: white;
      border: none;
      padding: 8px 20px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 10px;
    }
    @media print {
      .print-actions {
        display: none;
      }
      body {
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="print-actions">
    <span>Ready to save or print your personalized tile specification sheet.</span>
    <button class="btn-print" onclick="window.print()">Print or Save as PDF</button>
  </div>

  <div class="pdf-header">
    <div>
      <div class="pdf-logo">Kajaria</div>
      <div class="pdf-tagline">India's No. 1 Tile Company</div>
    </div>
    <div class="pdf-meta">
      <div><strong>Personalized Tile Direction</strong></div>
      <div>Date: ${today}</div>
      <div>Reference: KJ-QUIZ-${Date.now().toString().slice(-6)}</div>
    </div>
  </div>

  <div class="pdf-title-banner">
    <h1>${match.title}</h1>
    <p>${match.summary}</p>
  </div>

  <div class="summary-chips">
    <span class="chip">Space: ${spaceName}</span>
    <span class="chip">Application: ${applicationName}</span>
    <span class="chip">Mood: ${(answers.mood || 'Natural').replace('-', ' ')}</span>
    <span class="chip">Surface: ${(answers.surface || 'Stone').replace('-', ' ')}</span>
    <span class="chip">Light: ${(answers.naturalLight || 'Some').replace('-', ' ')}</span>
    <span class="chip">Everyday: ${(answers.usage || 'Low maintenance').replace('-', ' ')}</span>
  </div>

  <div class="section-title">Recommended Product Specification</div>

  <div class="tiles-grid">
    ${match.floorTile ? `
      <div class="tile-card">
        <div class="tile-role">Floor Application</div>
        <div class="tile-name">${match.floorTile.name}</div>
        <div class="tile-sub">${match.floorTile.collection} · ${match.floorTile.category}</div>
        <img src="${match.floorTile.image}" class="tile-img" alt="${match.floorTile.name}">
        <table class="specs-table">
          <tr><td class="specs-label">Dimensions</td><td class="specs-val">${match.floorTile.size}</td></tr>
          <tr><td class="specs-label">Surface Look</td><td class="specs-val">${match.floorTile.surface}</td></tr>
          <tr><td class="specs-label">Finish</td><td class="specs-val">${match.floorTile.finish}</td></tr>
          <tr><td class="specs-label">Slip Rating</td><td class="specs-val">${match.floorTile.slipRating}</td></tr>
          <tr><td class="specs-label">Water Absorption</td><td class="specs-val">${match.floorTile.waterAbsorption}</td></tr>
        </table>
      </div>
    ` : ''}

    ${match.wallTile ? `
      <div class="tile-card">
        <div class="tile-role">Wall Application</div>
        <div class="tile-name">${match.wallTile.name}</div>
        <div class="tile-sub">${match.wallTile.collection} · ${match.wallTile.category}</div>
        <img src="${match.wallTile.image}" class="tile-img" alt="${match.wallTile.name}">
        <table class="specs-table">
          <tr><td class="specs-label">Dimensions</td><td class="specs-val">${match.wallTile.size}</td></tr>
          <tr><td class="specs-label">Surface Look</td><td class="specs-val">${match.wallTile.surface}</td></tr>
          <tr><td class="specs-label">Finish</td><td class="specs-val">${match.wallTile.finish}</td></tr>
          <tr><td class="specs-label">Thickness</td><td class="specs-val">${match.wallTile.thickness}</td></tr>
          <tr><td class="specs-label">Water Absorption</td><td class="specs-val">${match.wallTile.waterAbsorption}</td></tr>
        </table>
      </div>
    ` : ''}
  </div>

  <div class="reasons-box">
    <h4>Why this direction fits your space:</h4>
    <p style="font-size: 12px; color: #475569; margin-bottom: 10px;">${match.whyFits}</p>
    <ul class="reasons-list">
      ${match.reasons.map(r => `<li>${r}</li>`).join('')}
    </ul>
  </div>

  <div class="disclaimer-box">
    <strong>Important Notice:</strong> This document represents a design consultation recommendation generated by the Kajaria Tile Quiz Assistant. While digital reproductions strive for visual fidelity, actual ceramic tile colour tones, veining distribution, surface texture, and finish lustre can vary under specific room lighting. Please verify actual physical samples, verified slip suitability, box batch availability, and delivery pricing with your nearest authorised Kajaria dealer or Galaxy Experience Centre prior to purchase.
    <br><br>
    Visit <strong>https://www.kajariaceramics.com</strong> or locate an authorised Kajaria dealer using PIN code search.
  </div>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();

  logQuizEvent('pdf_downloaded', {
    matchTitle: match.title,
    floor: match.floorTile?.name,
    wall: match.wallTile?.name
  });
}
