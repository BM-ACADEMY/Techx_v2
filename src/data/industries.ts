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
    faqs: [
      { q: 'Can customers order from the website?', a: 'They can order through WhatsApp from any page. If you want a cart and online payment, our online store is the right fit.' },
      { q: 'Can I change the menu or prices?', a: 'Send us the change on WhatsApp and we update it. We can discuss an editing panel if you change items often.' },
      { q: 'Do you take a commission on orders?', a: 'No. Payments go to your own payment gateway account.' },
      { q: 'Can you help with Instagram and Google Maps too?', a: 'Yes. Social media management and local SEO are separate monthly services with published prices.' },
    ],
  },
]

export function getIndustry(slug: string): IndustryData | undefined {
  return INDUSTRIES.find((i) => i.slug === slug)
}
