import siteJson from './site.json';
import pricingJson from './pricing.json';
import proofJson from './proof.json';
import themeJson from './theme.json';

// --- SITE TYPES ---
export interface RegisteredAddress {
  street: string;
  locality: string;
  region: string;
  postal_code: string;
  country: string;
}

export interface EntityInfo {
  legal_name: string;
  cin: string;
  incorporated: string;
  registered_address: RegisteredAddress;
  gstin: string;
}

export interface ContactChannel {
  number_e164: string;
  display: string;
  _note?: string;
}

export interface WorkingHours {
  mon_fri: string;
  sat: string;
  sun: string;
  timezone: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio_page: string;
}

export interface SiteData {
  brand: {
    name: string;
    tagline: string;
    domain: string;
    description_30w: string;
  };
  entity: EntityInfo;
  nap: {
    name: string;
    address_line: string;
    phone: string;
  };
  contact: {
    whatsapp: ContactChannel;
    calls: ContactChannel;
    email: string;
    hours: WorkingHours;
  };
  service_area: string[];
  profiles: Record<string, string>;
  team: TeamMember[];
  policy: {
    gst_note: string;
    commitment: string;
    upfront: string;
    ad_spend: string;
    shoots: string;
  };
}

// --- PRICING TYPES ---
export interface OneTimePlan {
  id: string;
  name: string;
  price: number;
  delivery: string;
  includes: string[];
  excludes: string[];
  renewal: {
    amount: number;
    period: string;
    from_year?: number;
    covers?: string;
    note?: string;
  };
  page: string;
}

export interface MonthlyPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  keywords?: number;
  recommended?: boolean;
  upfront_3_months?: { price: number; save: number; setup_free: boolean };
  includes?: string[];
  excludes?: string[];
  page: string;
}

export interface ExtraPlan {
  id: string;
  name: string;
  price: number;
  unit: 'one-time' | 'month' | 'package';
  group: string;
  includes: string[];
  excludes?: string[];
  recommended?: boolean;
  note?: string;
}

export interface ComboItem {
  id: string;
  discount?: number;
}

export interface Combo {
  id: string;
  title: string;
  note: string;
  items: ComboItem[];
}

export interface QuoteOnlyPlan {
  id: string;
  name: string;
  note: string;
  page: string;
  autopilot: string;
}

export interface PricingData {
  currency: string;
  gst_percent: number;
  prices_exclude_gst: boolean;
  last_updated: string;
  one_time: OneTimePlan[];
  monthly: MonthlyPlan[];
  extras: ExtraPlan[];
  combos: Combo[];
  quote_only: QuoteOnlyPlan[];
}

// --- PROOF TYPES ---
export type ProofBlockType =
  | 'result_strip'
  | 'case_study'
  | 'before_after'
  | 'testimonial'
  | 'logo_wall'
  | 'work_sample'
  | 'credential'
  | 'live_metric';

export type ProofStatus = 'FILLED' | 'EMPTY' | 'DRAFT';

export interface ProofItem {
  id: string;
  type: ProofBlockType;
  status: ProofStatus;
  label?: string;
  value?: string;
  detail?: string;
  note?: string;
  source?: string;
  context?: string;
  items?: Array<{ value: string; label: string; context?: string }>;
  client?: string;
  client_fallback?: string;
  sector?: string;
  city?: string;
  service?: string;
  headline_number?: string;
  headline_label?: string;
  summary?: string;
  link?: string;
  before?: string;
  after?: string;
  period?: string;
  person?: string;
  role?: string;
  business?: string;
  quote?: string;
  _needs?: string;
  _placeholder_text?: string;
  _slots?: number;
  _note?: string;
}

export interface ProofData {
  version: string;
  updated: string;
  block_types: Record<string, string>;
  global: {
    proof: ProofItem[];
  };
  services: Record<
    string,
    {
      page: string;
      proof: ProofItem[];
    }
  >;
}

// --- DATA ACCESSORS ---
export const site: SiteData = siteJson as SiteData;
export const pricing: PricingData = pricingJson as PricingData;
export const proof: ProofData = proofJson as ProofData;
export const theme = themeJson;

export function getSiteConfig(): SiteData {
  return site;
}

export function getPricing(): PricingData {
  return pricing;
}

export function getOneTimePlans(): OneTimePlan[] {
  return pricing.one_time;
}

export function getMonthlyPlans(): MonthlyPlan[] {
  return pricing.monthly;
}

export function getComboById(id: string): Combo | undefined {
  return pricing.combos.find((c) => c.id === id);
}

export function getExtrasByGroup(group: string): ExtraPlan[] {
  return pricing.extras.filter((x) => x.group === group);
}

export function getPlanById(id: string): OneTimePlan | MonthlyPlan | ExtraPlan | undefined {
  const oneTime = pricing.one_time.find((p) => p.id === id);
  if (oneTime) return oneTime;
  return pricing.monthly.find((p) => p.id === id) ?? pricing.extras.find((p) => p.id === id);
}

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Proof System Slot Filter:
 * In Production: Only returns items with status === 'FILLED'.
 * In Development/Staging: Returns 'FILLED' and labeled placeholders for 'EMPTY'.
 */
export function getGlobalProof(isProduction = import.meta.env.PROD): ProofItem[] {
  if (isProduction) {
    return proof.global.proof.filter((item) => item.status === 'FILLED');
  }
  return proof.global.proof;
}

export function getServiceProof(serviceSlug: string, isProduction = import.meta.env.PROD): ProofItem[] {
  const service = proof.services[serviceSlug];
  if (!service) return [];
  if (isProduction) {
    return service.proof.filter((item) => item.status === 'FILLED');
  }
  return service.proof;
}

/**
 * Validates that an item marked FILLED has minimum required attributes
 */
export function validateProofItem(item: ProofItem): { valid: boolean; reason?: string } {
  if (item.status !== 'FILLED') {
    return { valid: true };
  }
  if (item.type === 'result_strip' && Array.isArray(item.items) && item.items.length > 0) {
    return { valid: true };
  }
  if (!item.value && !item.detail && !item.label) {
    return {
      valid: false,
      reason: `Proof item ${item.id} is marked FILLED but lacks value/detail/label/items.`,
    };
  }
  return { valid: true };
}

export function getProofItemById(id: string): ProofItem | undefined {
  const globalMatch = proof.global.proof.find((item) => item.id === id);
  if (globalMatch) return globalMatch;

  for (const service of Object.values(proof.services || {})) {
    const match = service.proof.find((item) => item.id === id);
    if (match) return match;
  }
  return undefined;
}
