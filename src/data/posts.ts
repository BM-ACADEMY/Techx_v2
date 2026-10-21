/**
 * Blog articles. Rules: no statistics we cannot source, no client names,
 * no rankings. Prices are tokens like {{web-single}} and are filled from
 * pricing.json by the page, so they can never drift from the pricing page.
 */
export type PostBlock =
  | { h: string }
  | { p: string }
  | { ul: string[] }

export interface Post {
  slug: string
  title: string
  description: string
  tag: string
  readTime: string
  date: string // ISO
  excerpt: string
  related: { label: string; to: string }
  blocks: PostBlock[]
}

export const POSTS: Post[] = [
  {
    slug: 'website-cost-puducherry',
    title: 'How Much Does a Website Cost in Puducherry? (Published Prices, 2026)',
    description:
      'What a business website costs in Puducherry and Tamil Nadu: single page, multi-page and online store, what is included, and what to ask about renewals.',
    tag: 'Pricing',
    readTime: '5 min read',
    date: '2026-10-21',
    excerpt:
      'A plain breakdown of what a single-page site, a multi-page site and an online store cost, and the questions to ask any agency before you pay.',
    related: { label: 'See website development services', to: '/services/website-development' },
    blocks: [
      { p: 'Quotes for the same website can differ by ten times. This guide explains what drives the price so you can compare quotes properly. The prices below are the ones we publish on our pricing page. All prices exclude 18% GST.' },
      { h: 'What we charge' },
      { ul: [
        'Single-page website: {{web-single}}, delivered in 48 working hours.',
        'Multi-page website: {{web-multi}}, delivered in 5 to 7 working days.',
        'Online store: {{store}}, delivered in 7 to 10 working days.',
      ] },
      { h: 'Which one do you need?' },
      { p: 'A single page is enough when you need to be found, show what you do and get enquiries on WhatsApp or phone: a tutor, a clinic, a salon, a small contractor. A multi-page site suits a business with several services that each deserve their own page, because each page can appear in Google for its own search. An online store is for businesses that want to take orders and payments online.' },
      { h: 'Questions to ask any agency' },
      { ul: [
        'Who owns the domain and hosting? They should be registered in your name and email.',
        'What is the renewal cost in year two, for hosting, domain and any software licence?',
        'Is the price fixed in writing, and what exactly is in the scope?',
        'Can I edit text and photos later, or do I pay for every change?',
        'Will it load quickly on a mid-range phone with ordinary mobile data?',
      ] },
      { h: 'Where the extra cost usually hides' },
      { p: 'Cheap quotes often leave out the domain, hosting, a contact form that actually reaches you, or the second year renewal. Expensive quotes often include meetings, project managers and custom features you may not need. Ask for a line-by-line list and remove what you will not use.' },
      { h: 'A note on honesty' },
      { p: 'A website does not bring customers by itself. It gives people who already hear about you somewhere to check you out, and it lets Google show you to people searching for what you sell. If you also want to be found on Google Maps and in search, that is a separate monthly service, and you can see its price on the pricing page.' },
    ],
  },
  {
    slug: 'wordpress-vs-custom-code',
    title: 'WordPress vs Custom Code for a Small Business: Honest Pros and Cons',
    description:
      'WordPress or a custom-coded website? Where each one wins for a small business in India: cost, speed, editing, security and long-term ownership.',
    tag: 'Website',
    readTime: '6 min read',
    date: '2026-10-21',
    excerpt:
      'Neither is always better. Here is when WordPress is the right call, when custom code is, and what to ask before you decide.',
    related: { label: 'See website development services', to: '/services/website-development' },
    blocks: [
      { p: 'We build custom-coded sites, so we are not neutral. This guide tries to be fair anyway, because the right choice depends on what you need.' },
      { h: 'Where WordPress is the better choice' },
      { ul: [
        'You or your staff want to edit pages and publish posts yourselves every week.',
        'You need a plugin that already does a specific job, such as bookings or memberships.',
        'You expect to hire different people over the years, and WordPress developers are easy to find.',
      ] },
      { h: 'Where custom code is the better choice' },
      { ul: [
        'The site is mostly fixed: services, about, contact, a few pages that change rarely.',
        'Speed on mobile matters and you want to avoid carrying many plugins.',
        'You want fewer moving parts to update and fewer things that can break after an update.',
      ] },
      { h: 'The real trade-offs' },
      { p: 'WordPress gives you an editor and a large ecosystem, but every plugin is extra code to keep updated, and a badly chosen set of plugins can make a site slow. Custom code is usually lighter and has fewer parts, but changes go through a developer unless an editing panel is built in. Neither choice protects you from a poor design or weak content.' },
      { h: 'How to check any website for yourself' },
      { ul: [
        'Open the site on your phone on mobile data. Does it feel quick?',
        'Run it through Google PageSpeed Insights and read the mobile result yourself.',
        'Ask who will do updates and what each change costs.',
        'Ask for the domain and hosting to be in your name.',
      ] },
      { h: 'Our recommendation' },
      { p: 'If you will rarely change the site, a fast custom-coded site is a good fit and our prices start at {{web-single}}. If you want to publish often and edit everything yourself, tell us, and we will say honestly whether WordPress would serve you better.' },
    ],
  },
  {
    slug: 'get-customers-from-google-maps',
    title: 'How to Get Customers From Google Maps (A Practical Guide for Local Businesses)',
    description:
      'Set up and improve your Google Business Profile so nearby customers can find, call and visit you. Steps, mistakes to avoid and how to ask for real reviews.',
    tag: 'Local SEO',
    readTime: '7 min read',
    date: '2026-10-21',
    excerpt:
      'The steps that matter on Google Maps: a complete profile, consistent details, real photos, real reviews. No tricks, no guaranteed positions.',
    related: { label: 'See local SEO services', to: '/services/seo' },
    blocks: [
      { p: 'When someone searches for a service near them, Google often shows a map with three or four businesses first. Your Google Business Profile decides whether you are in that list. Nobody can guarantee a position, but a few habits improve your chances.' },
      { h: '1. Claim and complete your profile' },
      { ul: [
        'Choose the most accurate primary category for what you do.',
        'Add your services, opening hours, phone number, WhatsApp link and website.',
        'Write a clear description in plain words that mentions your town and what you offer.',
        'Add the areas you serve if you travel to customers.',
      ] },
      { h: '2. Keep your name, address and phone identical everywhere' },
      { p: 'Use exactly the same business name, address and phone number on your profile, your website, Instagram, Justdial and any other listing. Different spellings confuse both Google and customers.' },
      { h: '3. Add real photos' },
      { p: 'Upload photos of your shop front, your team, your work and your products. Real photos build trust and are more useful than stock pictures. Add a few new ones regularly.' },
      { h: '4. Ask every happy customer for a review' },
      { ul: [
        'Send your review link on WhatsApp right after you deliver the work or service.',
        'Ask politely and make it one tap.',
        'Reply to every review, good or bad, within a couple of days.',
        'Never buy reviews or write them yourself. Google can remove them and may penalise the profile.',
      ] },
      { h: '5. Post updates' },
      { p: 'A short weekly post about a new product, an offer or a tip shows the profile is active. Add a call or WhatsApp button to the post.' },
      { h: 'What to expect' },
      { p: 'Maps visibility builds over weeks and months, depends on your competition, and cannot be guaranteed. Measure calls, direction requests and website clicks in your profile insights rather than chasing one exact position. If you would like us to handle this for you, our local SEO plans start at {{seo-starter}} per month.' },
    ],
  },
  {
    slug: 'whatsapp-business-setup-checklist',
    title: 'WhatsApp Business Setup Checklist for Small Businesses in India',
    description:
      'A step-by-step checklist to set up WhatsApp Business properly: profile, catalogue, quick replies, labels, away messages and a click-to-chat link.',
    tag: 'WhatsApp',
    readTime: '5 min read',
    date: '2026-10-21',
    excerpt:
      'Ten things to set up in the free WhatsApp Business app so enquiries are answered quickly and nothing gets lost.',
    related: { label: 'See WhatsApp automation', to: '/services/whatsapp-automation' },
    blocks: [
      { p: 'Most local businesses get their enquiries on WhatsApp. The free WhatsApp Business app already has tools that save time. Set these up before you think about paid automation.' },
      { h: 'The checklist' },
      { ul: [
        'Use a separate number for the business, not your personal one.',
        'Fill the business profile: name, address, hours, website and a short description.',
        'Add your products or services to the catalogue with photos and prices.',
        'Create quick replies for the questions you answer every day: price, location, timings, how to book.',
        'Set a greeting message that welcomes new chats and says what to send you.',
        'Set an away message for closed hours that says when you will reply.',
        'Use labels to mark new enquiries, quotes sent, confirmed and paid.',
        'Create a click-to-chat link and put it on your website, Instagram bio and Google profile.',
        'Print a QR code for your counter or packaging that opens the chat.',
        'Back up your chats and keep a second person with access, so one phone is not a single point of failure.',
      ] },
      { h: 'Rules to follow' },
      { ul: [
        'Only message people who have contacted you or agreed to hear from you.',
        'Use the official app or the official WhatsApp Business Platform. Unofficial tools can get your number banned.',
        'Reply quickly. A slow reply is the main reason enquiries go cold.',
      ] },
      { h: 'When to go beyond the app' },
      { p: 'If you receive more enquiries than your team can answer, or you want leads logged automatically in a sheet and routed to the right person, that is where an automation system helps. WhatsApp automation is priced after a short scope call, and we will tell you honestly if the free app is enough for you.' },
    ],
  },
  {
    slug: 'website-checklist-clinic-school-shop',
    title: 'Website Checklist for a Clinic, School or Shop',
    description:
      'What a clinic, school or shop website must include: contact details, timings, services, fees, map, WhatsApp and the pages people actually look for.',
    tag: 'Website',
    readTime: '6 min read',
    date: '2026-10-21',
    excerpt:
      'The pages and details a local clinic, school or shop website needs so visitors find what they came for and contact you.',
    related: { label: 'See website development services', to: '/services/website-development' },
    blocks: [
      { p: 'Visitors to a local business website want a few things quickly: what you do, where you are, when you are open and how to reach you. Use this checklist to see what is missing.' },
      { h: 'For every business' },
      { ul: [
        'Your name, address, phone and WhatsApp button on every page, tapping to call or chat.',
        'Opening hours and a map link.',
        'A clear list of services in simple words.',
        'Real photos of the place and the people.',
        'A fast mobile experience, because most visitors arrive from a phone.',
        'Your registered business details in the footer.',
      ] },
      { h: 'Clinics' },
      { ul: [
        'Doctors, departments and visiting hours.',
        'How to book an appointment by call or WhatsApp.',
        'Emergency contact details, shown clearly.',
        'Keep wording factual. Health advertising in India has rules, so avoid promises about cures or results.',
      ] },
      { h: 'Schools and colleges' },
      { ul: [
        'Courses or classes, fees, and the admission process step by step.',
        'Admission dates and an enquiry form or WhatsApp number.',
        'Facilities, transport and contact for parents.',
        'Fee and result information that you can stand behind.',
      ] },
      { h: 'Shops and restaurants' },
      { ul: [
        'Products or menu with prices.',
        'Ways to order: call, WhatsApp or online store.',
        'Delivery area and timings.',
        'Photos that match what customers actually receive.',
      ] },
      { h: 'Next step' },
      { p: 'Most of these businesses are well served by a single-page site at {{web-single}} or a multi-page site at {{web-multi}}. Send us what you have on WhatsApp and we will tell you which fits.' },
    ],
  },
]

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug)
}
