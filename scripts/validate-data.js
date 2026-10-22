import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, '../src/data');

console.log('🔍 Running BM TechX Single Source of Truth Validation...\n');

let errors = [];
let warnings = [];

// 1. Validate site.json
try {
  const sitePath = path.join(dataDir, 'site.json');
  const site = JSON.parse(fs.readFileSync(sitePath, 'utf8'));

  if (!site.brand?.name) errors.push('site.json: brand.name is missing');
  if (!site.entity?.cin) errors.push('site.json: entity.cin is missing');
  if (!site.contact?.whatsapp?.number_e164) errors.push('site.json: contact.whatsapp.number_e164 is missing');
  if (!Array.isArray(site.service_area) || site.service_area.length === 0) {
    errors.push('site.json: service_area is empty');
  }

  console.log(`✓ site.json: Validated entity "${site.entity?.legal_name}" (CIN: ${site.entity?.cin})`);
} catch (e) {
  errors.push(`site.json read error: ${e.message}`);
}

// 2. Validate pricing.json
try {
  const pricingPath = path.join(dataDir, 'pricing.json');
  const pricing = JSON.parse(fs.readFileSync(pricingPath, 'utf8'));

  if (pricing.currency !== 'INR') errors.push('pricing.json: currency must be INR');
  if (pricing.gst_percent !== 18) errors.push('pricing.json: gst_percent must be 18');

  // Verify one-time plans
  pricing.one_time.forEach((plan) => {
    if (!plan.id) errors.push(`pricing.json: one_time plan missing id`);
    if (typeof plan.price !== 'number' || plan.price <= 0) {
      errors.push(`pricing.json: invalid price on plan ${plan.id}`);
    }
    if (!plan.delivery) errors.push(`pricing.json: plan ${plan.id} missing delivery SLA`);
  });

  // Verify monthly plans
  pricing.monthly.forEach((plan) => {
    if (!plan.id) errors.push(`pricing.json: monthly plan missing id`);
    if (plan.price && (typeof plan.price !== 'number' || plan.price <= 0)) {
      errors.push(`pricing.json: invalid price on monthly plan ${plan.id}`);
    }
  });

  (pricing.extras || []).forEach((x) => {
    if (!x.id) errors.push('pricing.json: extra plan missing id');
    if (typeof x.price !== 'number' || x.price <= 0) errors.push(`pricing.json: invalid price on extra ${x.id}`);
    if (!Array.isArray(x.includes) || x.includes.length === 0) errors.push(`pricing.json: extra ${x.id} has no includes`);
  });
  console.log(`✓ pricing.json: Validated ${pricing.one_time.length} one-time and ${pricing.monthly.length} monthly plans.`);
} catch (e) {
  errors.push(`pricing.json read error: ${e.message}`);
}

// 3. Validate proof.json
try {
  const proofPath = path.join(dataDir, 'proof.json');
  const proof = JSON.parse(fs.readFileSync(proofPath, 'utf8'));

  const validTypes = Object.keys(proof.block_types || {});

  // Helper to validate proof item
  const checkItem = (item, location) => {
    if (!validTypes.includes(item.type)) {
      errors.push(`proof.json (${location}): Unknown proof type "${item.type}" in item ${item.id}`);
    }
    if (item.status === 'FILLED') {
      const hasContent = item.value || item.label || item.detail || (Array.isArray(item.items) && item.items.length > 0);
      if (!hasContent) {
        errors.push(`proof.json (${location}): Item ${item.id} is marked FILLED but lacks required content.`);
      }
    }
  };

  // Check global proof slots
  proof.global.proof.forEach((item) => checkItem(item, 'global'));

  // Check service proof slots
  Object.entries(proof.services || {}).forEach(([serviceSlug, s]) => {
    s.proof.forEach((item) => checkItem(item, serviceSlug));
  });

  console.log(`✓ proof.json: Verified proof slot integrity across ${Object.keys(proof.services || {}).length} services.`);
} catch (e) {
  errors.push(`proof.json read error: ${e.message}`);
}

// Summary output
console.log('\n--- VALIDATION SUMMARY ---');
if (warnings.length > 0) {
  console.log(`⚠️ Warnings (${warnings.length}):`);
  warnings.forEach((w) => console.log(`  - ${w}`));
}

if (errors.length > 0) {
  console.error(`❌ Validation Failed (${errors.length} errors):`);
  errors.forEach((err) => console.error(`  - ${err}`));
  process.exit(1);
} else {
  console.log('✅ ALL DATA SOURCES VALIDATED SUCCESSFULLY (0 errors)\n');
  process.exit(0);
}
