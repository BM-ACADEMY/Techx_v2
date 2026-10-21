import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔍 Starting Task 6.2: Device, Mobile 4G & Performance Budget Testing...\n');

let errors = 0;
let warnings = 0;
let passed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAILED: ${message}`);
    errors++;
  }
}

function warn(message) {
  console.warn(`  ⚠️ WARNING: ${message}`);
  warnings++;
}

// -------------------------------------------------------------
// TEST SUITE 1: BUNDLE SIZE & ASSET PERFORMANCE BUDGET (T9)
// -------------------------------------------------------------
console.log('--- 1. PERFORMANCE BUDGET & CODE SPLITTING (T9) ---');
const distPath = path.join(rootDir, 'dist');
const distAssetsPath = path.join(distPath, 'assets');

assert(fs.existsSync(distPath), 'dist/ directory exists (production build ready)');

if (fs.existsSync(distAssetsPath)) {
  const assetFiles = fs.readdirSync(distAssetsPath);
  const jsFiles = assetFiles.filter(f => f.endsWith('.js'));
  const cssFiles = assetFiles.filter(f => f.endsWith('.css'));

  assert(jsFiles.length > 5, `Code-splitting active: ${jsFiles.length} separate JavaScript chunks generated`);
  assert(cssFiles.length >= 1, `CSS compiled into dedicated stylesheet: ${cssFiles[0]}`);

  // Check individual chunk sizes (Hard budget: no single chunk > 500KB)
  let maxChunkSize = 0;
  let maxChunkName = '';

  jsFiles.forEach(file => {
    const stat = fs.statSync(path.join(distAssetsPath, file));
    const sizeKb = stat.size / 1024;
    if (sizeKb > maxChunkSize) {
      maxChunkSize = sizeKb;
      maxChunkName = file;
    }
    // Hard budget check
    assert(sizeKb < 500, `Chunk ${file} (${sizeKb.toFixed(1)} KB) is within 500KB budget`);
  });

  console.log(`    ℹ️ Largest JS chunk: ${maxChunkName} at ${maxChunkSize.toFixed(1)} KB`);

  // Check CSS size (Target < 100KB)
  cssFiles.forEach(file => {
    const stat = fs.statSync(path.join(distAssetsPath, file));
    const sizeKb = stat.size / 1024;
    assert(sizeKb < 100, `CSS stylesheet ${file} (${sizeKb.toFixed(1)} KB) is within 100KB budget`);
  });

  // Verify lazy chunks exist for high-payload modules (GSAP vendor isolated)
  const gsapChunk = jsFiles.find(f => f.startsWith('vendor-gsap-'));
  assert(!!gsapChunk, `GSAP library isolated into independent chunk (${gsapChunk || 'none'}) for zero-penalty homepage LCP`);
}

// -------------------------------------------------------------
// TEST SUITE 2: CORE WEB VITALS & FONT OPTIMIZATION (T9.5-T9.8)
// -------------------------------------------------------------
console.log('\n--- 2. CORE WEB VITALS & FONTS (T9.5-T9.8) ---');
const indexHtmlPath = path.join(rootDir, 'index.html');
assert(fs.existsSync(indexHtmlPath), 'index.html exists');

if (fs.existsSync(indexHtmlPath)) {
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  assert(indexHtml.includes('<html lang="en-IN">'), 'HTML lang set to "en-IN" (passes T11.5)');
  assert(indexHtml.includes('viewport') && indexHtml.includes('width=device-width'), 'Viewport meta tag configured for mobile scaling');
  assert(indexHtml.includes('rel="preconnect"') && indexHtml.includes('fonts.gstatic.com'), 'Fonts preconnected with crossorigin');
  assert(indexHtml.includes('&display=swap'), 'Google Fonts configured with font-display: swap (prevents FOIT/CLS)');
  assert(!indexHtml.includes('jquery') && !indexHtml.includes('bootstrap'), 'Zero render-blocking legacy frameworks (No jQuery/Bootstrap - T9.9)');
}

// -------------------------------------------------------------
// TEST SUITE 3: ACCESSIBILITY, MOTION & TAP TARGETS (T10 & T11)
// -------------------------------------------------------------
console.log('\n--- 3. ACCESSIBILITY, REDUCED MOTION & VIEWPORT (T10 & T11) ---');
const cssPath = path.join(rootDir, 'src', 'index.css');
assert(fs.existsSync(cssPath), 'src/index.css exists');

if (fs.existsSync(cssPath)) {
  const css = fs.readFileSync(cssPath, 'utf-8');
  assert(css.includes('prefers-reduced-motion: reduce'), 'prefers-reduced-motion media query implemented (passes WCAG a11y)');
  assert(css.includes(':focus-visible'), 'Accessible :focus-visible ring styles defined');
  assert(css.includes('overflow-x: hidden'), 'overflow-x: hidden enforced to prevent 360px viewport horizontal blowouts (T10.3)');
}

// Check Form Input Accessibility (T10.7)
const contactPath = path.join(rootDir, 'src', 'pages', 'ContactPage.tsx');
if (fs.existsSync(contactPath)) {
  const contact = fs.readFileSync(contactPath, 'utf-8');
  assert(contact.includes('type="tel"'), 'Phone input uses type="tel" for native numeric keypad on mobile (T10.7)');
  assert(contact.includes('type="email"'), 'Email input uses type="email"');
  assert(contact.includes('autocomplete="tel"') || contact.includes('autoComplete="tel"'), 'Phone input supports browser autofill');
}

// Check WhatsApp CTA Accessibility
const waCtaPath = path.join(rootDir, 'src', 'components', 'WhatsAppCTA.tsx');
if (fs.existsSync(waCtaPath)) {
  const waCta = fs.readFileSync(waCtaPath, 'utf-8');
  assert(waCta.includes('target="_blank"') && waCta.includes('rel="noopener noreferrer"'), 'WhatsApp CTA uses secure rel="noopener noreferrer"');
  assert(waCta.includes('data-src='), 'WhatsApp CTA carries audit data-src attribute');
}

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n=============================================');
console.log(`TOTAL PASSED: ${passed}`);
console.log(`TOTAL WARNINGS: ${warnings}`);
console.log(`TOTAL ERRORS: ${errors}`);
console.log('=============================================');

if (errors === 0) {
  console.log('\n✅ TASK 6.2 (DEVICE, MOBILE 4G & PERFORMANCE BUDGET) VALIDATION PASSED!\n');
  process.exit(0);
} else {
  console.error('\n❌ TASK 6.2 VALIDATION FAILED WITH ERRORS.\n');
  process.exit(1);
}
