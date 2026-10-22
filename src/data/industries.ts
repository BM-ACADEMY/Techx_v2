/**
 * Industry landing pages. Same rules as locations.ts: no claims, no client
 * names, no numbers we cannot prove. Prices come from pricing.json.
 */
export interface IndustryData {
  slug: string
  name: string // e.g. "Clinics"
  headline: string
  answer: string
  intro: string
  needs: string[]
  avoid: string[]
  plans: string[] // pricing.json ids
  combo?: string // pricing.json combos id
  faqs: { q: string; a: string }[]
}

export const INDUSTRIES: IndustryData[] = [
  {
    slug: 'clinics',
    name: 'Clinics',
    headline: 'Website for a Clinic in Puducherry and Tamil Nadu',
    answer:
      'A clinic website should tell a patient who the doctors are, where you are, when you are open and how to book, and it should load fast on a phone. Our single-page site is delivered in 48 working hours and multi-page sites in 5 to 7 working days, at published prices.',
    intro:
      'Patients usually look for a clinic on Google Maps or search, check the timings and phone number, and then call or message on WhatsApp. A good clinic website supports that exact journey and nothing more. We keep the wording factual because healthcare advertising in India has rules about claims.',
    needs: [
      'Doctors, qualifications, departments and visiting hours',
      'Appointment by call or WhatsApp, one tap from every page',
      'Address, map link and parking or landmark directions',
      'Services and facilities in plain language',
      'Emergency contact details shown clearly',
      'A Google Business Profile that matches the website',
    ],
    avoid: [
      'Promises of cures or guaranteed results',
      'Before and after photos without consent',
      'Patient reviews or names without written permission',
    ],
    plans: ['web-single', 'web-multi', 'seo-starter'],
    combo: 'combo-clinic',
    faqs: [
      { q: 'Can patients book appointments on the website?', a: 'The simplest and most used method is a WhatsApp or call button. If you need a booking system with slots, tell us, and we will scope and price it separately.' },
      { q: 'Can you write the content about our doctors and treatments?', a: 'Yes, from the details you give us. You approve every line before it goes live, and we avoid claims we cannot support.' },
      { q: 'Will the clinic appear on Google Maps?', a: 'That depends on your Google Business Profile, not the website alone. Our local SEO plan covers the profile work, but nobody can guarantee a position.' },
      { q: 'Who owns the domain and the site?', a: 'You do. The domain and hosting are registered in your name.' },
    ],
  },
  {
    slug: 'schools',
    name: 'Schools and Colleges',
    headline: 'Website for a School or Coaching Centre in Tamil Nadu',
    answer:
      'A school website should show courses, fees, the admission process and how parents can contact you, and it should work well on a phone. We build it at published prices: a multi-page site in 5 to 7 working days.',
    intro:
      'Parents compare several schools or coaching centres before they visit. They look for classes and fees, the admission steps, facilities, transport and a number to call. A site that answers these quickly gets more genuine enquiries than one that only has a long welcome message.',
    needs: [
      'Courses or classes with age groups and timings',
      'Fees and the admission process, step by step',
      'Admission dates and an enquiry form or WhatsApp number',
      'Facilities, transport and safety information',
      'Photos of the campus and activities, with permission for any child shown',
      'Tamil and English content where your parents expect it',
    ],
    avoid: [
      'Result or ranking claims you cannot show proof for',
      'Photos of students without parents consent',
      'Fee details that differ from what the office quotes',
    ],
    plans: ['web-multi', 'web-single', 'seo-starter'],
    combo: 'combo-education',
    faqs: [
      { q: 'Can the site have an admission enquiry form?', a: 'Yes. Enquiries reach you on WhatsApp and are logged, so nothing is lost.' },
      { q: 'Can the content be in Tamil?', a: 'Yes, we can build pages in Tamil, English or both.' },
      { q: 'Can we update fees and dates ourselves?', a: 'Small text changes can be sent to us on WhatsApp. If you want a panel you can edit yourself, tell us and we will scope it.' },
      { q: 'Do you also run ads for admissions?', a: 'Yes, Meta Ads management is a separate monthly service. You pay Meta directly for the ad spend.' },
    ],
  },
  {
    slug: 'restaurants',
    name: 'Restaurants and Shops',
    headline: 'Website for a Restaurant, Bakery or Shop in Puducherry',
    answer:
      'A restaurant or shop website should show your menu or products with prices, your timings and address, and a one-tap way to order or enquire on WhatsApp. A single-page site is delivered in 48 working hours, and an online store in 7 to 10 working days.',
    intro:
      'Most customers decide where to eat or shop from their phone, usually after checking Google Maps. They want the menu, the price, the location and a quick way to order. We build the site around those four things and connect it to your WhatsApp.',
    needs: [
      'Menu or product list with prices and photos',
      'Opening hours, address and map link',
      'Order by WhatsApp or call, one tap from every page',
      'Delivery area and timings if you deliver',
      'An online store if you want to take payments online',
      'Google Business Profile and Instagram links',
    ],
    avoid: [
      'Stock photos that do not match your food or products',
      'Menu prices that differ from the shop',
      'A site that takes many seconds to load on mobile data',
    ],
    plans: ['web-single', 'store', 'meta-ads'],
    combo: 'combo-food',
    faqs: [
      { q: 'Can customers order from the website?', a: 'They can order through WhatsApp from any page. If you want a cart and online payment, our online store is the right fit.' },
      { q: 'Can I change the menu or prices?', a: 'Send us the change on WhatsApp and we update it. We can discuss an editing panel if you change items often.' },
      { q: 'Do you take a commission on orders?', a: 'No. Payments go to your own payment gateway account.' },
      { q: 'Can you help with Instagram and Google Maps too?', a: 'Yes. Social media management and local SEO are separate monthly services with published prices.' },
    ],
  },
  {
    slug: 'doctors-dentists',
    name: 'Doctors and Dentists',
    headline: 'Personal Branding for Doctors and Dentists in Puducherry and Tamil Nadu',
    answer:
      'Patients look up a doctor before they book: your profile, your Google listing, and what you say about your practice. We build that presence with a clear profile, a personal website, factual posts and Reels, and Google Maps SEO for your clinic. Plans are monthly at published prices, and the content stays factual, as medical advertising rules require.',
    intro:
      'Patients choose a doctor on trust. They check Google, read reviews and look at how you explain things. Good branding for a doctor is clear, calm and educational: who you are, what you treat, where you sit and how to book. It is not exaggeration. We follow the advertising rules that apply to medical professionals in India, and we will tell you if a request breaks them.',
    needs: [
      'A clear profile with qualifications, specialities and clinic details',
      'Educational posts and short videos that explain common concerns',
      'A Google Business Profile that matches your website and signage',
      'A personal website with appointment booking by call or WhatsApp',
      'A simple, respectful way to ask patients for Google reviews',
      'Consistent name, address and phone everywhere you are listed',
    ],
    avoid: [
      'Claims of cures, guaranteed results or being the best',
      'Before and after photos without written patient consent',
      'Publishing patient names or cases without permission',
    ],
    plans: ['pb-starter', 'pb-growth', 'seo-starter'],
    combo: 'combo-doctor',
    faqs: [
      { q: 'Are you allowed to promote a doctor?', a: 'Medical advertising in India is restricted. We keep everything informational and factual, and we will refuse content that promises cures or compares you with other doctors.' },
      { q: 'Do I need to appear on camera?', a: 'Short videos of you explaining a topic work well, but we can start with posts and carousels if you prefer.' },
      { q: 'Can you manage my clinic Google listing too?', a: 'Yes. Google Maps SEO is a separate monthly plan, and the combination is priced in the pack on this page.' },
      { q: 'Who approves what is published?', a: 'You do. Nothing goes live without your approval.' },
    ],
  },
  {
    slug: 'professionals',
    name: 'Consultants and Professional Firms',
    headline: 'Personal Branding for Lawyers, Chartered Accountants and Consultants',
    answer:
      'Clients check a professional online before they call. We build a clear, informational profile on Instagram, LinkedIn and Google, plus a personal website, within the rules your professional body sets. Plans are monthly at published prices. We never promise clients or rankings.',
    intro:
      'Lawyers, chartered accountants and many consultants are bound by rules on advertising and solicitation. That means branding for them is about being easy to find and understand, not about promotion. A clear profile, a useful website and articles that explain your area of work help the right clients find you. Please confirm what your Bar Council, ICAI or other body allows, and we will work inside it.',
    needs: [
      'A professional profile and bio that states your areas of work plainly',
      'A personal or firm website with your address, contact details and practice areas',
      'Informational articles and posts that explain common questions',
      'A Google Business Profile with correct details',
      'A LinkedIn presence that is consistent with your website',
      'Content that follows your professional body’s advertising rules',
    ],
    avoid: [
      'Soliciting clients or advertising where your body forbids it',
      'Claims about win rates, success or being the best',
      'Publishing client names or matters without written permission',
    ],
    plans: ['pb-starter', 'pb-growth', 'seo-starter'],
    combo: 'combo-professional',
    faqs: [
      { q: 'Can a lawyer have a website and social media?', a: 'Rules differ by profession and change over time. Generally an informational website and professional profile are acceptable, and solicitation is not. Please check with your Bar Council or institute. We will follow what you confirm.' },
      { q: 'Will you write articles for me?', a: 'We draft informational articles from your input. You review and approve them, and you remain responsible for their content.' },
      { q: 'Can you guarantee clients from this?', a: 'No. Branding makes you easier to find and trust. It does not guarantee enquiries.' },
      { q: 'Does the plan include a website?', a: 'Starter includes a one-page personal website in the first month. Authority includes a multi-page website.' },
    ],
  },
  {
    slug: 'coaches-educators',
    name: 'Coaches and Educators',
    headline: 'Personal Branding for Coaches, Trainers and Educators in Tamil Nadu',
    answer:
      'Coaches and educators sell trust. We build your presence with a clear message, a personal website, regular Reels and posts, and optional Meta Ads to bring enquiries. Plans are monthly at published prices. We do not promise followers or admissions.',
    intro:
      'Parents, students and professionals choose a coach or teacher by watching how they explain things. Short videos that teach one useful idea, a clear page with your batches, fees and contact details, and quick replies on WhatsApp do more than a long list of credentials. We help you show that consistently.',
    needs: [
      'A clear message: who you teach, what changes for them, and how',
      'Short teaching Reels and carousels that show how you explain',
      'A personal website with courses, timings, fees and an enquiry button',
      'WhatsApp enquiry handling that replies the same day',
      'Optional Meta Ads management for batches or seasons',
      'Student feedback shown only with their permission',
    ],
    avoid: [
      'Result or rank claims you cannot show proof for',
      'Using students’ photos or names without consent',
      'Fees on the website that differ from what the office quotes',
    ],
    plans: ['pb-starter', 'pb-growth', 'meta-ads'],
    combo: 'combo-coach',
    faqs: [
      { q: 'Do you make the videos or do I?', a: 'On Starter you record using our shooting guide and scripts and we edit. Growth and Authority include mobile shoots by our team.' },
      { q: 'Can you also run ads for my batch?', a: 'Yes. Meta Ads management is a separate monthly service, and ad spend is paid directly to Meta.' },
      { q: 'Can the content be in Tamil?', a: 'Yes. We can plan posts and scripts in Tamil, English or both.' },
      { q: 'Will this guarantee admissions?', a: 'No. We improve how you are seen and how easily people can contact you. Admissions depend on your teaching, your fees and your follow-up.' },
    ],
  },
]

export function getIndustry(slug: string): IndustryData | undefined {
  return INDUSTRIES.find((i) => i.slug === slug)
}
