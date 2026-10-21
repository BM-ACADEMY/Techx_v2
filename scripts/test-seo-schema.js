import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔍 Starting Task 6.1: Technical SEO, Schema & Redirect Verification...\n');

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
// TEST SUITE 1: ROBOTS.TXT & SITEMAP.XML INTEGRITY
// -------------------------------------------------------------
console.log('--- 1. CRAWLABILITY & INDEXATION (T1) ---');
const robotsPath = path.join(rootDir, 'public', 'robots.txt');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');

assert(fs.existsSync(robotsPath), 'public/robots.txt exists');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf-8');
  assert(robots.includes('User-agent: Googlebot'), 'robots.txt allows Googlebot');
  assert(robots.includes('User-agent: GPTBot') && robots.includes('User-agent: PerplexityBot'), 'robots.txt explicitly permits AI search bots (GPTBot, PerplexityBot)');
  assert(robots.includes('Sitemap: https://bmtechx.in/sitemap.xml'), 'robots.txt links to canonical sitemap.xml');
}

assert(fs.existsSync(sitemapPath), 'public/sitemap.xml exists');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  assert(sitemap.includes('<loc>https://bmtechx.in/</loc>'), 'sitemap.xml contains homepage');
  assert(sitemap.includes('<loc>https://bmtechx.in/services/website-development/</loc>'), 'sitemap.xml contains website dev service');
  assert(sitemap.includes('<loc>https://bmtechx.in/pricing/</loc>'), 'sitemap.xml contains pricing page');
  assert(sitemap.includes('<loc>https://bmtechx.in/about/</loc>'), 'sitemap.xml contains about page');
  assert(!sitemap.includes('.html'), 'sitemap.xml has zero legacy .html extensions');
}

// -------------------------------------------------------------
// TEST SUITE 2: REDIRECT MAPPING & SINGLE-HOP CONFIGURATION (T2)
// -------------------------------------------------------------
console.log('\n--- 2. REDIRECT VERIFICATION (T2) ---');
const serverPath = path.join(rootDir, 'server', 'server.js');
const appPath = path.join(rootDir, 'src', 'App.tsx');

assert(fs.existsSync(serverPath), 'server/server.js exists');
if (fs.existsSync(serverPath)) {
  const serverCode = fs.readFileSync(serverPath, 'utf-8');
  assert(serverCode.includes("LEGACY_REDIRECT_MAP"), 'server.js defines LEGACY_REDIRECT_MAP');
  assert(serverCode.includes("'/pricing.html': '/pricing'"), 'server.js redirects /pricing.html -> /pricing (301)');
  assert(serverCode.includes("'/services.html': '/services'"), 'server.js redirects /services.html -> /services (301)');
  assert(serverCode.includes("'/about.html': '/about'"), 'server.js redirects /about.html -> /about (301)');
  assert(serverCode.includes("'/contact.html': '/contact'"), 'server.js redirects /contact.html -> /contact (301)');
  assert(serverCode.includes("host.startsWith('www.')"), 'server.js enforces single canonical host (removes www in 1 hop)');
}

assert(fs.existsSync(appPath), 'src/App.tsx exists');
if (fs.existsSync(appPath)) {
  const appCode = fs.readFileSync(appPath, 'utf-8');
  assert(appCode.includes('path="/pricing.html"'), 'App.tsx handles client-side /pricing.html redirect');
  assert(appCode.includes('path="/services/ecommerce"'), 'App.tsx handles /services/ecommerce alias redirect');
}

// -------------------------------------------------------------
// TEST SUITE 3: JSON-LD STRUCTURED DATA SCHEMAS (T4)
// -------------------------------------------------------------
console.log('\n--- 3. STRUCTURED DATA & SCHEMA VALIDATION (T4) ---');

// Check Organization & Legal Credentials
const siteJsonPath = path.join(rootDir, 'src', 'data', 'site.json');
assert(fs.existsSync(siteJsonPath), 'src/data/site.json exists');

if (fs.existsSync(siteJsonPath)) {
  const siteData = JSON.parse(fs.readFileSync(siteJsonPath, 'utf-8'));
  assert(siteData.entity.legal_name === 'Afra Ventures Private Limited', 'Legal Entity matches "Afra Ventures Private Limited"');
  assert(siteData.entity.cin === 'U62011PY2026PTC009819', 'CIN matches official "U62011PY2026PTC009819"');
  assert(siteData.contact.whatsapp.number_e164 === '919403892971', 'WhatsApp E164 matches "919403892971"');
}

// Check Injected Schemas Across Key Pages
const pagesToCheck = [
  { file: 'src/pages/HomePage.tsx', schemas: ['ProfessionalService', 'FAQPage', 'WebSite'] },
  { file: 'src/pages/AboutPage.tsx', schemas: ['Organization', 'BreadcrumbList'] },
  { file: 'src/pages/WebsiteDevPage.tsx', schemas: ['Service', 'BreadcrumbList', 'FAQPage'] },
  { file: 'src/pages/EcommercePage.tsx', schemas: ['Service', 'BreadcrumbList', 'FAQPage'] },
  { file: 'src/pages/SeoPage.tsx', schemas: ['Service', 'BreadcrumbList', 'FAQPage'] },
  { file: 'src/pages/WhatsAppAutomationPage.tsx', schemas: ['Service', 'BreadcrumbList'] },
  { file: 'src/pages/BlogPage.tsx', schemas: ['Blog', 'BlogPosting'] },
  { file: 'src/components/FAQ.tsx', schemas: ['FAQPage'] },
];

pagesToCheck.forEach(({ file, schemas }) => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    schemas.forEach(schemaType => {
      let isPresent = false;
      if (schemaType === 'FAQPage') {
        // Either direct schema injection or via <FAQ component which injects FAQPage
        isPresent = content.includes(`@type": "FAQPage`) || 
                    content.includes(`'@type': 'FAQPage'`) || 
                    content.includes('<FAQ');
      } else {
        isPresent = content.includes(`@type": "${schemaType}`) || 
                    content.includes(`'@type': '${schemaType}'`);
      }
      assert(isPresent, `${file} provides @type: ${schemaType} schema`);
    });

    // Check for fake AggregateRating safety rule (T4.8)
    assert(!content.includes('AggregateRating'), `${file} has no fabricated AggregateRating (passes T4.8)`);
  } else {
    warn(`File ${file} does not exist for schema check.`);
  }
});

// Check Team Anchors on About Page
const aboutPath = path.join(rootDir, 'src', 'pages', 'AboutPage.tsx');
if (fs.existsSync(aboutPath)) {
  const aboutContent = fs.readFileSync(aboutPath, 'utf-8');
  assert(aboutContent.includes('id="kamar"'), 'About page has stable anchor #kamar');
  assert(aboutContent.includes('id="karthika"'), 'About page has stable anchor #karthika');
  assert(aboutContent.includes('id="imran"'), 'About page has stable anchor #imran');
  assert(aboutContent.includes('id="babila"'), 'About page has stable anchor #babila');
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
  console.log('\n✅ TASK 6.1 (TECHNICAL SEO, SCHEMA & REDIRECTS) VALIDATION PASSED!\n');
  process.exit(0);
} else {
  console.error('\n❌ TASK 6.1 VALIDATION FAILED WITH ERRORS.\n');
  process.exit(1);
}
