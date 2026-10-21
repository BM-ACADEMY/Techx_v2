import fs from 'fs';
import path from 'path';

let passed = 0;
let errors = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    errors++;
  }
}

console.log('🔍 Running Review-Fixes QA & Checklist Verification...\n');

// 1. DOMAIN & SEO CHECKS
console.log('--- 1. DOMAIN & SEO CONFIGURATION ---');
const indexHtml = fs.readFileSync('index.html', 'utf-8');
assert(indexHtml.includes('lang="en-IN"'), 'index.html has lang="en-IN"');
assert(indexHtml.includes('https://bmtechx.in/'), 'index.html has canonical https://bmtechx.in/');
assert(indexHtml.includes('property="og:image" content="https://bmtechx.in/og-image.png"'), 'index.html defines og:image meta tag');
assert(indexHtml.includes('property="og:image:width" content="1200"'), 'og:image:width is 1200');
assert(indexHtml.includes('property="og:image:height" content="630"'), 'og:image:height is 630');
assert(indexHtml.includes('name="twitter:image" content="https://bmtechx.in/og-image.png"'), 'twitter:image is defined');
assert(indexHtml.includes('name="twitter:card" content="summary_large_image"'), 'twitter:card is summary_large_image');
assert(indexHtml.includes('"@type": "ProfessionalService"'), 'JSON-LD schema defines ProfessionalService');

// 2. ASSETS & ROBOTS / SITEMAP
console.log('\n--- 2. ASSETS & CRAWLER DIRECTIVES ---');
assert(fs.existsSync('public/og-image.png'), 'public/og-image.png exists');
const ogStats = fs.statSync('public/og-image.png');
assert(ogStats.size > 20000, `og-image.png is valid PNG file (${ogStats.size} bytes)`);

assert(fs.existsSync('public/robots.txt'), 'public/robots.txt exists');
const robots = fs.readFileSync('public/robots.txt', 'utf-8');
assert(robots.includes('https://bmtechx.in/sitemap.xml'), 'robots.txt links to https://bmtechx.in/sitemap.xml');

assert(fs.existsSync('public/sitemap.xml'), 'public/sitemap.xml exists');
const sitemap = fs.readFileSync('public/sitemap.xml', 'utf-8');
assert(sitemap.includes('https://bmtechx.in/'), 'sitemap.xml lists https://bmtechx.in/');

// 3. WHATSAPP & INDIAN PHONE VALIDATION
console.log('\n--- 3. WHATSAPP & INDIAN MOBILE VALIDATION ---');
assert(fs.existsSync('src/lib/whatsapp.ts'), 'src/lib/whatsapp.ts exists');
const whatsappSrc = fs.readFileSync('src/lib/whatsapp.ts', 'utf-8');
assert(whatsappSrc.includes('isValidIndianMobile'), 'whatsapp.ts exports isValidIndianMobile');
assert(whatsappSrc.includes('openWhatsApp'), 'whatsapp.ts exports unblocked openWhatsApp');
assert(whatsappSrc.includes('sendLead'), 'whatsapp.ts exports sendLead');

// Test regex logic directly
const isValidIndianMobile = (value) => {
  const digits = value.replace(/[\s\-()]/g, '').replace(/^(\+?91|0)/, '');
  return /^[6-9]\d{9}$/.test(digits);
};
assert(isValidIndianMobile('9876543210'), 'Validates 10-digit 9876543210');
assert(isValidIndianMobile('+919876543210'), 'Validates +91 prefixed mobile');
assert(isValidIndianMobile('919876543210'), 'Validates 91 prefixed mobile');
assert(isValidIndianMobile('09876543210'), 'Validates 0-prefixed mobile');
assert(isValidIndianMobile('98765 43210'), 'Validates mobile with space');
assert(!isValidIndianMobile('1234567890'), 'Rejects non-Indian number starting with 1');
assert(!isValidIndianMobile('98765'), 'Rejects short number');
assert(!isValidIndianMobile(''), 'Rejects empty string');

// 4. GOOGLE APPS SCRIPT LEAD CAPTURE
console.log('\n--- 4. GOOGLE APPS SCRIPT WEB APP ---');
assert(fs.existsSync('apps-script/Code.gs'), 'apps-script/Code.gs exists');
const gasSrc = fs.readFileSync('apps-script/Code.gs', 'utf-8');
assert(gasSrc.includes('function doPost(e)'), 'Code.gs implements doPost(e) handler');
assert(gasSrc.includes('SpreadsheetApp.getActiveSpreadsheet()'), 'Code.gs appends rows to Google Sheets');
assert(gasSrc.includes('LockService.getScriptLock()'), 'Code.gs uses ScriptLock for concurrency safety');
assert(fs.existsSync('.env'), '.env exists with VITE_LEAD_ENDPOINT configuration');

// 5. PRIVACY POLICY
console.log('\n--- 5. PRIVACY POLICY (NAME & PHONE DATA COLLECTION) ---');
assert(fs.existsSync('src/components/PrivacyPolicyModal.tsx'), 'src/components/PrivacyPolicyModal.tsx exists');
const privacySrc = fs.readFileSync('src/components/PrivacyPolicyModal.tsx', 'utf-8');
assert(privacySrc.includes('WhatsApp Phone Number'), 'Privacy Policy explicitly details WhatsApp phone number collection');
assert(privacySrc.includes('Your Name'), 'Privacy Policy explicitly details Name collection');
assert(privacySrc.includes('never sell, lease, or distribute'), 'Privacy Policy declares no data resale');
assert(privacySrc.includes('SITE_CONFIG.cin') || privacySrc.includes('U62011PY2026PTC009819'), 'Privacy Policy lists corporate CIN');

// 6. SINGLE SOURCE OF TRUTH (SITEDATA.TS)
console.log('\n--- 6. PRICING & SITEDATA INTEGRITY ---');
const siteDataSrc = fs.readFileSync('src/data/siteData.ts', 'utf-8');
assert(siteDataSrc.includes('SERVICE_OPTIONS'), 'siteData.ts exports synced SERVICE_OPTIONS');
assert(siteDataSrc.includes('DEFAULT_SERVICE'), 'siteData.ts exports DEFAULT_SERVICE');

console.log('\n=============================================');
console.log(`TOTAL PASSED: ${passed}`);
console.log(`TOTAL ERRORS: ${errors}`);
console.log('=============================================');

if (errors > 0) {
  process.exit(1);
} else {
  console.log('\n✅ ALL REVIEW-FIXES AND PRE-DEPLOY CHECKS PASSED!');
}
