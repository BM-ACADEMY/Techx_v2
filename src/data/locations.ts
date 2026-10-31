/**
 * City landing pages. Facts here must stay true and provable: no client names, no
 * rankings, no numbers. Lead-generation mentions are limited to what was delivered. Prices are read from pricing.json in LocationPage.
 */
export interface LocationData {
  slug: string
  city: string
  headline: string
  answer: string
  intro: string
  businessTypes: string[]
  areas: string[]
  howWeWork: string[]
  faqs: { q: string; a: string }[]
}

export const LOCATIONS: LocationData[] = [
  {
    slug: 'puducherry',
    city: 'Puducherry',
    headline: 'Digital marketing company in Puducherry, with an office you can visit',
    answer:
      'BM TechX is based in Kosapalayam, Puducherry. We build custom-coded websites, online stores, local SEO, Meta Ads and WhatsApp automation at published prices, so a Puducherry business knows the cost before the first call.',
    intro:
      'Puducherry customers search on their phones, check Google Maps and message on WhatsApp before they walk in. A business here needs a fast site, a complete Google profile and a quick reply to every enquiry. That is the work we do, and our office is in the same town.',
    businessTypes: [
      'Cafes, restaurants and guest houses',
      'Boutiques, jewellery and retail shops',
      'Clinics, dental and wellness centres',
      'Schools, coaching and training institutes',
      'Real estate and plot developers',
      'Service businesses such as salons, repair and interiors',
    ],
    areas: ['White Town', 'Kosapalayam', 'Lawspet', 'Reddiarpalayam', 'Muthialpet', 'Villianur', 'Ariyankuppam'],
    howWeWork: [
      'Message us on WhatsApp with your business and what you sell.',
      'We reply with a written scope, price and delivery time.',
      'Work starts only after you agree the scope and price in writing.',
      'We build, test on phones and set up your domain and hosting.',
    ],
    faqs: [
      {
        q: 'Do you work with businesses in Puducherry only?',
        a: 'No. We are based in Puducherry and serve businesses across Tamil Nadu. Most work is done over WhatsApp and calls, so distance does not slow delivery.',
      },
      {
        q: 'Can I meet the team in Puducherry?',
        a: 'Our registered office is at 78 Lenin Street, Kosapalayam, Puducherry 605013. Message us on WhatsApp first so we can confirm a time, as we are open Monday to Saturday, 10 AM to 7 PM.',
      },
      {
        q: 'What does a website cost for a small Puducherry shop?',
        a: 'A single-page website starts at the price on our pricing page and is delivered in 48 working hours. A multi-page site and an online store are priced there too. All prices exclude 18% GST.',
      },
      {
        q: 'Will my business show up on Google Maps?',
        a: 'Maps ranking depends on a complete, verified Google Business Profile, consistent name, address and phone details, and genuine reviews. Our local SEO plan covers the profile work. We do not promise a position on Google.',
      },
    ],
  },
  {
    slug: 'cuddalore',
    city: 'Cuddalore',
    headline: 'Website and digital marketing for Cuddalore businesses',
    answer:
      'We build websites, online stores, local SEO and WhatsApp lead systems for Cuddalore businesses at published prices. We work from Puducherry, close by, and run the project on WhatsApp and calls.',
    intro:
      'Many Cuddalore businesses still depend on word of mouth and a Facebook page. A proper website, a verified Google profile and a WhatsApp button turn a search for your service into an enquiry. We set that up and tell you in writing what you get.',
    businessTypes: [
      'Retail and wholesale shops',
      'Clinics, labs and pharmacies',
      'Schools, tuition and training centres',
      'Contractors, builders and hardware suppliers',
      'Hotels, function halls and caterers',
      'Local manufacturers and traders selling beyond the town',
    ],
    areas: ['Cuddalore Old Town', 'Manjakuppam', 'Thirupapuliyur', 'Semmandalam'],
    howWeWork: [
      'Send your business details and what you want the site to do on WhatsApp.',
      'Get a fixed written quote and timeline.',
      'We build and test the site, with your changes during the build.',
      'Your site goes live on your domain and your enquiries arrive on WhatsApp.',
    ],
    faqs: [
      {
        q: 'Do you visit Cuddalore?',
        a: 'Most projects run on WhatsApp and calls, which keeps delivery fast and the price fixed. Ask us on WhatsApp if you need an in-person meeting and we will confirm what is possible.',
      },
      {
        q: 'Can you get my Cuddalore business to rank on Google?',
        a: 'We can set up the technical SEO, the Google Business Profile and local pages that give you a fair chance. Rankings take months and no honest agency can guarantee a position.',
      },
      {
        q: 'Do I need an online store or just a website?',
        a: 'If customers only call or visit, a website with a WhatsApp button is enough. If you want to take orders and payments online, choose the online store plan. We will tell you which fits.',
      },
      {
        q: 'Are there monthly fees after the website is live?',
        a: 'For websites, the first year of domain and hosting is included and renewal is listed on the pricing page. The online store has no software renewal fee. Monthly plans such as SEO and ads are separate and optional.',
      },
    ],
  },
  {
    slug: 'villupuram',
    city: 'Villupuram',
    headline: 'Websites, SEO and ads for Villupuram district businesses',
    answer:
      'BM TechX builds websites, online stores, local SEO and WhatsApp enquiry systems for businesses in Villupuram, Tindivanam and Gingee. Prices are published and the scope is written before you pay.',
    intro:
      'Customers in Villupuram district search for local services on their phones, often in Tamil. A site that loads quickly, shows your prices and opens WhatsApp in one tap helps you win those enquiries. We build that and keep the cost clear.',
    businessTypes: [
      'Shops and showrooms',
      'Colleges, schools and coaching centres',
      'Clinics and hospitals',
      'Real estate and plot developers',
      'Event halls and caterers',
      'Agri and trading businesses',
    ],
    areas: ['Villupuram town', 'Tindivanam', 'Gingee', 'Vikravandi'],
    howWeWork: [
      'Tell us about your business on WhatsApp.',
      'We send a written scope, price and delivery time.',
      'We build, you review, we fix, then we go live.',
      'We hand over your domain, hosting details and source code.',
    ],
    faqs: [
      {
        q: 'Can you build a site with Tamil content?',
        a: 'Yes. Send the Tamil text you want or tell us on WhatsApp and we will plan the pages around it. We do not promise Tamil copywriting unless it is agreed in the written scope.',
      },
      {
        q: 'How long does a website take?',
        a: 'A single-page site is delivered in 48 working hours once we have your details, logo and photos. Larger sites and stores take longer and the timeline is in the quote.',
      },
      {
        q: 'Can you run Facebook and Instagram ads for my business?',
        a: 'Yes. Meta Ads management is a monthly plan, and your ad spend is paid directly to Meta with no markup from us.',
      },
      {
        q: 'Do I own the website?',
        a: 'Yes. You get the source code and your domain. There is no builder licence tying you to us.',
      },
    ],
  },
  {
    slug: 'chennai',
    city: 'Chennai',
    headline: 'Website development and digital marketing for Chennai businesses',
    answer:
      'BM TechX serves Chennai businesses remotely from Puducherry. You get custom-coded websites, online stores, SEO, Meta Ads and WhatsApp automation at published prices, managed through WhatsApp and video or phone calls.',
    intro:
      'Chennai is a crowded market, so a slow template site or an unverified Google profile costs you enquiries. We focus on a fast, clean build, clear pricing and a working WhatsApp lead flow, and we are honest that Chennai SEO takes time.',
    businessTypes: [
      'Online sellers and D2C brands',
      'Clinics, dental and wellness practices',
      'Consultants, agencies and professional services',
      'Training institutes and coaching',
      'Real estate and interior businesses',
      'Local service brands across the city',
    ],
    areas: ['T. Nagar', 'Anna Nagar', 'Velachery', 'OMR', 'Tambaram', 'Adyar'],
    howWeWork: [
      'Message us on WhatsApp and book a call if you prefer to talk.',
      'We send a written scope, price and delivery time.',
      'We build and share a staging link for your review.',
      'We launch on your domain and support you after go-live.',
    ],
    faqs: [
      {
        q: 'You are in Puducherry. Can you really work with Chennai clients?',
        a: 'Yes. The whole process runs on WhatsApp, calls and shared links, so being in a different city makes no difference to the work or the price.',
      },
      {
        q: 'Is SEO in Chennai different?',
        a: 'Competition is higher, so results take longer and need steady monthly work. We set honest expectations in writing and report on the work done each month.',
      },
      {
        q: 'Do prices change for Chennai?',
        a: 'No. Our listed prices are the same everywhere. All prices exclude 18% GST. Photo or video shoots outside Puducherry are priced on requirement.',
      },
      {
        q: 'Can you manage ads and a website together?',
        a: 'Yes. We can build the site, set up tracking, run Meta Ads and connect enquiries to WhatsApp so you see which ad produced each lead.',
      },
    ],
  },
  {
    slug: "madurai",
    city: "Madurai",
    headline: "Website development and digital marketing in Madurai",
    answer: "BM TechX builds custom-coded websites, online stores, local SEO, Meta Ads and WhatsApp lead systems for Madurai businesses at published prices. We work remotely from Puducherry, so you get a written scope, price and delivery time before any work starts.",
    intro: "Madurai is a busy retail, textile, jewellery, education and hospitality market, and a large share of its visitors and shoppers search on their phones first. A Madurai business needs a quick site, a complete Google profile and a fast WhatsApp reply. We set these up and keep the price clear from the start. We have worked on lead generation projects in the Madurai region, and we can show you the approach when we speak.",
    businessTypes: ["Textile, saree and jewellery shops", "Hotels, lodges and tourism services", "Coaching centres, colleges and training institutes", "Clinics, dental and diagnostic centres", "Real estate and plot developers", "Restaurants, bakeries and caterers"],
    areas: ["Anna Nagar", "KK Nagar", "Tallakulam", "Thirunagar", "Simmakkal", "Goripalayam", "Thirupparankundram"],
    howWeWork: ["Message us on WhatsApp with your business and what you sell.", "We reply with a written scope, price and delivery time.", "Work starts only after you agree the scope and price in writing.", "We build and test on phones, then hand over your domain and hosting. Everything for Madurai is done remotely over WhatsApp and calls."],
    faqs: [
      { q: "Are you in Madurai? How do we work together?", a: "We are based in Puducherry and work with Madurai clients over WhatsApp and calls. You send us the details, we send a written scope and price, and we share progress on your phone as we go." },
      { q: "Can you help a shop with both a website and Google Maps?", a: "Yes. A website and a complete Google Business Profile work together. Our local SEO plan covers the profile, and we do not promise any position on Google." },
      { q: "Can the website be in Tamil?", a: "Yes. We can write pages in Tamil, English or both, depending on who your customers are." },
      { q: "Is the price the same as in Puducherry?", a: "Yes. Listed prices are the same everywhere in Tamil Nadu. All prices exclude 18% GST." },
    ],
  },
  {
    slug: "tiruchirappalli",
    city: "Tiruchirappalli",
    headline: "Website development and digital marketing in Tiruchirappalli (Trichy)",
    answer: "BM TechX builds custom-coded websites, online stores, local SEO, Meta Ads and WhatsApp lead systems for Tiruchirappalli (Trichy) businesses at published prices, delivered remotely from Puducherry with a written scope first.",
    intro: "Trichy has a large base of educational institutions, engineering and fabrication businesses, retailers, jewellers and service providers. Customers look up a business on their phone, check the location and then call or message. A good site, a verified Google profile and a quick reply convert that interest into enquiries. We have run lead generation for plot projects around Trichy, so we know how local buyers respond to ads.",
    businessTypes: ["Engineering, fabrication and industrial suppliers", "Colleges, schools and coaching centres", "Jewellery, textile and general retail", "Hospitals, clinics and dental centres", "Real estate layouts and builders", "Restaurants, hotels and wedding services"],
    areas: ["Srirangam", "Thillai Nagar", "Cantonment", "Woraiyur", "Tennur", "KK Nagar", "Ariyamangalam"],
    howWeWork: ["Message us on WhatsApp with your business and what you sell.", "We reply with a written scope, price and delivery time.", "Work starts only after you agree the scope and price in writing.", "We build and test on phones, then hand over your domain and hosting. Everything for Tiruchirappalli is done remotely over WhatsApp and calls."],
    faqs: [
      { q: "Do you work with Trichy businesses remotely?", a: "Yes. All planning, approvals and updates happen on WhatsApp and calls. We have no need for site visits for most websites and campaigns." },
      { q: "Can you build a website for an engineering or industrial business?", a: "Yes. We build clear service and product pages with an enquiry button, so buyers can send a requirement on WhatsApp. Larger quote-based builds are scoped and priced separately." },
      { q: "Do you run Meta Ads for Trichy audiences?", a: "Yes. Meta Ads management has a published monthly price, and the ad spend is billed by Meta to you directly." },
      { q: "Can you guarantee Google ranking?", a: "No. We set up the technical SEO and your Google profile properly. Rankings take months and no honest agency guarantees a position." },
    ],
  },
  {
    slug: "namakkal",
    city: "Namakkal",
    headline: "Website development and digital marketing in Namakkal",
    answer: "BM TechX builds custom-coded websites, online stores, local SEO, Meta Ads and WhatsApp lead systems for Namakkal businesses at published prices, delivered remotely from Puducherry with a written scope before work starts.",
    intro: "Namakkal and nearby towns such as Rasipuram, Tiruchengode and Paramathi Velur have strong trading, transport, poultry, textile and manufacturing businesses. Many of them still depend on word of mouth, which means customers outside the town do not find them. A clear website and a complete Google profile make it easy for a new buyer to find you and contact you on WhatsApp. We have run lead generation for plot projects around Namakkal.",
    businessTypes: ["Transport, logistics and truck body businesses", "Poultry, egg and agri product traders", "Textile and powerloom units", "Manufacturers and suppliers who want export or wholesale enquiries", "Real estate plots and layouts", "Hospitals, schools and local retail"],
    areas: ["Namakkal town", "Rasipuram", "Tiruchengode", "Paramathi Velur", "Sendamangalam", "Kumarapalayam"],
    howWeWork: ["Message us on WhatsApp with your business and what you sell.", "We reply with a written scope, price and delivery time.", "Work starts only after you agree the scope and price in writing.", "We build and test on phones, then hand over your domain and hosting. Everything for Namakkal is done remotely over WhatsApp and calls."],
    faqs: [
      { q: "Can a trader or manufacturer get wholesale enquiries from a website?", a: "A clear product page, photos and a WhatsApp enquiry button help buyers contact you. We cannot promise the number of enquiries, but we can make it easy to reach you." },
      { q: "Do you cover towns around Namakkal?", a: "Yes. We serve Namakkal, Rasipuram, Tiruchengode and nearby towns remotely." },
      { q: "What if my customers speak Tamil?", a: "We can write the site in Tamil, English or both, and set up WhatsApp replies in either language." },
      { q: "What does a website cost?", a: "Prices are published and the same in every town. All prices exclude 18% GST. See the pricing on this page." },
    ],
  },
]

export const getLocation = (slug: string): LocationData | undefined =>
  LOCATIONS.find((l) => l.slug === slug)
