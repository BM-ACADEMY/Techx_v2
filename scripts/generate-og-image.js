import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="25%" r="60%">
      <stop offset="0%" stop-color="#FFE600" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#08090D" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE600" />
      <stop offset="100%" stop-color="#FFB800" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#232636" stroke-width="1" stroke-opacity="0.4" />
    </pattern>
  </defs>

  <!-- Deep Cyber Ground -->
  <rect width="1200" height="630" fill="#08090D" />
  <rect width="1200" height="630" fill="url(#grid)" />
  <rect width="1200" height="630" fill="url(#glow)" />

  <!-- Outer Card Border -->
  <rect x="24" y="24" width="1152" height="582" rx="28" fill="none" stroke="#232636" stroke-width="2" />

  <!-- Top Logo & Badge Area -->
  <g transform="translate(80, 80)">
    <!-- Yellow Rounded Icon Badge -->
    <rect width="64" height="64" rx="16" fill="#FFE600" />
    <!-- Black Chevron Code Brackets -->
    <path d="M 27 23 L 18 32 L 27 41" fill="none" stroke="#000000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 37 23 L 46 32 L 37 41" fill="none" stroke="#000000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />

    <!-- BM TechX Text -->
    <text x="84" y="44" font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="42" fill="#FFE600" letter-spacing="-1">BM Techx</text>

    <!-- Tamil Nadu Pill -->
    <rect x="330" y="16" width="180" height="32" rx="16" fill="#FFE600" fill-opacity="0.1" stroke="#FFE600" stroke-opacity="0.4" stroke-width="1.5" />
    <text x="420" y="37" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="12" fill="#FFE600" text-anchor="middle" letter-spacing="1.5">TAMIL NADU &amp; PONDY</text>
  </g>

  <!-- Headline -->
  <text x="80" y="240" font-family="'Syne', 'Outfit', sans-serif" font-weight="800" font-size="56" fill="#FFFFFF" letter-spacing="-1.5">
    Fixed-Price Digital Growth for
  </text>
  <text x="80" y="310" font-family="'Syne', 'Outfit', sans-serif" font-weight="800" font-size="56" fill="url(#textGrad)" letter-spacing="-1.5">
    Tamil Nadu Businesses
  </text>

  <!-- Subtitle -->
  <text x="80" y="375" font-family="'Outfit', sans-serif" font-weight="400" font-size="22" fill="#94A3B8">
    Custom-coded websites from ₹2,999 in 48h, eCommerce stores, SEO &amp; WhatsApp automation.
  </text>

  <!-- Feature Badges -->
  <g transform="translate(80, 435)">
    <!-- Badge 1 -->
    <g>
      <rect width="280" height="52" rx="14" fill="#12141D" stroke="#FFE600" stroke-width="1.5" stroke-opacity="0.5" />
      <text x="140" y="32" font-family="'Outfit', sans-serif" font-weight="700" font-size="15" fill="#FFE600" text-anchor="middle">⚡ Web from ₹2,999 (48h)</text>
    </g>

    <!-- Badge 2 -->
    <g transform="translate(300, 0)">
      <rect width="250" height="52" rx="14" fill="#12141D" stroke="#232636" stroke-width="1.5" />
      <text x="125" y="32" font-family="'Outfit', sans-serif" font-weight="700" font-size="15" fill="#FFFFFF" text-anchor="middle">🛒 Online Store ₹9,999</text>
    </g>

    <!-- Badge 3 -->
    <g transform="translate(570, 0)">
      <rect width="290" height="52" rx="14" fill="#12141D" stroke="#10B981" stroke-width="1.5" stroke-opacity="0.5" />
      <text x="145" y="32" font-family="'Outfit', sans-serif" font-weight="700" font-size="15" fill="#10B981" text-anchor="middle">💬 WhatsApp Lead Automation</text>
    </g>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(80, 545)">
    <text x="0" y="0" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="14" fill="#94A3B8">
      URL: <tspan fill="#FFE600">https://bmtechx.in</tspan> · Corporate CIN: <tspan fill="#FFFFFF">U62011PY2026PTC009819</tspan>
    </text>
  </g>
</svg>
`;

async function generate() {
  const outputPath = path.resolve('public', 'og-image.png');
  await sharp(Buffer.from(svg))
    .png({ quality: 95 })
    .toFile(outputPath);
  console.log(`Generated ${outputPath} (1200x630)`);
}

generate().catch(console.error);
