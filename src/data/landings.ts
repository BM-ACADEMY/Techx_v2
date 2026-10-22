/**
 * New service landing pages (digital invitations, lead generation, personal
 * branding, catering branding, quick-start add-ons).
 * Rules: no client names, no results, no ranking or follower promises.
 * Prices come from pricing.json `extras` by group.
 */
export interface Landing {
  slug: string
  group: string // pricing.json extras group
  navLabel: string
  headline: string
  answer: string
  intro: string
  whoFor: string[]
  howItWorks: string[]
  notFor: string[]
  faqs: { q: string; a: string }[]
  related: { label: string; to: string }[]
}

export const LANDINGS: Landing[] = [
  {
    slug: 'digital-invitations',
    group: 'digital-invitations',
    navLabel: 'Digital Invitations',
    headline: 'Digital Wedding and Event Invitations in Puducherry and Tamil Nadu',
    answer:
      'Share one link on WhatsApp instead of printing and posting hundreds of cards. We design image, video and web invitations for weddings, nikah, housewarmings, birthdays and other functions, in Tamil, English or both, with the venue map, event details and a WhatsApp RSVP button. Prices start at the figure below.',
    intro:
      'Most families already send the invitation on WhatsApp, often as a photo of the printed card. A proper digital invitation gives guests the date, time, venue and a map in one place, and lets you update details if something changes. You still decide whether to print cards for elders and close relatives.',
    whoFor: [
      'Families planning a wedding, nikah, engagement or reception',
      'Housewarming, ear-piercing, birthday and naming ceremonies',
      'Event planners and function halls who want to offer digital invitations',
      'Institutions sending invitations for inaugurations and annual days',
    ],
    howItWorks: [
      'Send the event details, photos and any wording you want on WhatsApp.',
      'We send a design preview for your approval.',
      'We make one round of corrections, then give you the final image, video and link.',
      'Share the link with your guests on WhatsApp, Instagram or by SMS.',
    ],
    notFor: [
      'Printed cards, printing or home delivery. We do digital invitations only.',
      'Live streaming of the function.',
    ],
    faqs: [
      { q: 'Can the invitation be in Tamil?', a: 'Yes. We can do Tamil, English or a bilingual layout. Other languages can be quoted on request.' },
      { q: 'Can I change the details after you deliver?', a: 'One round of corrections is included before delivery. If the date or venue changes later, message us and we will quote the update.' },
      { q: 'Does the video use copyrighted film songs?', a: 'No. We use royalty-free music so your link is not blocked or removed. If you want a specific song, you take the responsibility for its use.' },
      { q: 'Will guests be able to confirm they are coming?', a: 'The web invitation has a WhatsApp button, so guests can message you directly to confirm.' },
      { q: 'How long does it take?', a: 'We agree the delivery time with you in writing when you confirm the order, based on the plan and how soon your function is.' },
    ],
    related: [
      { label: 'Website development', to: '/services/website-development' },
      { label: 'See all pricing', to: '/pricing' },
    ],
  },
  {
    slug: 'lead-generation',
    group: 'lead-generation',
    navLabel: 'Verified Leads',
    headline: 'Verified Lead Generation for Real Estate, Schools and Clinics',
    answer:
      'We run a Meta Ads campaign for your business and deliver phone-verified leads to your WhatsApp, in packages of 100 or 200 leads at a fixed price, with ad spend included. Every lead is checked by phone before it reaches your sales team. We do not guarantee that a lead will buy, visit or join, because that depends on your offer and your follow-up.',
    intro:
      'Businesses that sell high-value items, such as plots, courses or treatments, need a steady flow of real enquiries more than they need followers. A lead package is a defined number of enquiries for a defined fee. It is suited to real estate, schools and colleges, coaching centres and clinics.',
    whoFor: [
      'Plot developers, builders and property promoters',
      'Schools, colleges and coaching centres during admission season',
      'Clinics and dental or wellness centres with appointment slots to fill',
      'Any business with a clear offer and a team ready to call back quickly',
    ],
    howItWorks: [
      'Tell us your offer, location, price range and who your buyer is.',
      'We agree the package, timeline and what counts as a valid lead, in writing.',
      'We build the creatives and the campaign, and start the ads.',
      'Each lead is verified by phone, then sent to your WhatsApp and a shared lead sheet.',
      'You get a written report when the package is complete.',
    ],
    notFor: [
      'Businesses that cannot call back leads within a day. Slow follow-up wastes the leads.',
      'Anyone who wants a guaranteed number of sales or admissions.',
      'Clinics that want to advertise cures or guaranteed results. Healthcare advertising has rules and we follow them.',
    ],
    faqs: [
      { q: 'What counts as a lead?', a: 'A real person who showed interest in your offer, with a phone number we have checked. We define this with you in writing before the campaign starts.' },
      { q: 'Is ad spend included?', a: 'Yes. The package price covers the campaign management, the ad spend and the verification.' },
      { q: 'How long does a package take?', a: 'It depends on your location, offer and budget. We give a realistic timeline in writing before you pay.' },
      { q: 'Can you guarantee sales?', a: 'No. We deliver verified enquiries. Sales depend on your price, your property or course, and how quickly your team follows up.' },
      { q: 'Do you work outside Puducherry?', a: 'Yes. We run campaigns for businesses across Tamil Nadu, including Madurai, Tiruchirappalli and Namakkal.' },
    ],
    related: [
      { label: 'Meta Ads management', to: '/services/meta-ads' },
      { label: 'Real estate marketing', to: '/industries/real-estate' },
    ],
  },
  {
    slug: 'personal-branding',
    group: 'personal-branding',
    navLabel: 'Personal Branding',
    headline: 'Personal Branding for Doctors, Lawyers, Coaches and Founders',
    answer:
      'We build your professional presence on Instagram, LinkedIn and Google, with a clear positioning, a personal website, and a steady schedule of posts and Reels in your own voice. Plans are monthly. We do not promise followers, views or clients, because those depend on your field and on you showing up.',
    intro:
      'People look you up before they call you. What they see in the first minute, on your profile, on Google and on your website, decides whether they trust you. Personal branding is the work of making that first impression clear and consistent, then adding useful content regularly so people remember you.',
    whoFor: [
      'Doctors, dentists and other professionals who rely on referrals and reputation',
      'Lawyers, consultants and chartered accountants',
      'Coaches, trainers, educators and speakers',
      'Founders and business owners who want to be the face of their company',
    ],
    howItWorks: [
      'We talk through what you do, who you want to reach and how you want to be seen.',
      'We write your positioning and bio and set up or clean your profiles.',
      'You record short videos using our shooting guide and scripts, or we shoot on your Growth and Authority plans.',
      'We edit, schedule and publish, and report every month.',
    ],
    notFor: [
      'People who cannot give a little time each month for recording or approvals.',
      'Anyone who wants guaranteed followers, viral posts or paid fame.',
      'Professionals whose rules restrict advertising. We follow your professional body’s rules and will tell you if a request breaks them.',
    ],
    faqs: [
      { q: 'Do I need to be on camera?', a: 'Reels with you speaking work best, but we can start with posts, carousels and voice-over style videos if you prefer.' },
      { q: 'Does the plan include a website?', a: 'Starter includes a one-page personal website in the first month. Authority includes a multi-page website.' },
      { q: 'Will you write in my voice?', a: 'Yes. You review everything before it goes live, and we adjust the tone until it sounds like you.' },
      { q: 'Can you run ads for me too?', a: 'Yes. Meta Ads management is a separate monthly service with a published price. Ad spend is paid directly to Meta.' },
      { q: 'How soon will I see results?', a: 'Presence builds gradually. We report what was published and how people responded each month. We do not promise a number.' },
    ],
    related: [
      { label: 'Instagram management', to: '/services/social-media-marketing' },
      { label: 'Website development', to: '/services/website-development' },
    ],
  },
  {
    slug: 'catering-branding',
    group: 'catering-branding',
    navLabel: 'Catering & Food Branding',
    headline: 'Branding and Marketing for Caterers and Food Businesses',
    answer:
      'We help caterers, cloud kitchens and food brands look professional and get enquiries: a menu catalogue, a Google profile, a WhatsApp catalogue that answers quote requests, and regular posts and Reels of your food and events. Plans are monthly and ad spend is separate.',
    intro:
      'Event and bulk food orders usually start with a message, then a menu, then a quote. Caterers who reply quickly with a clear menu and good photos are easier to choose. We set up the pieces that make that first reply fast and professional, and keep your page active between events.',
    whoFor: [
      'Wedding and event caterers',
      'Home kitchens and cloud kitchens taking bulk or party orders',
      'Biryani, sweets and snack businesses selling by order',
      'Restaurants that want to be found for events and functions',
    ],
    howItWorks: [
      'Send us your menus, photos and the events you want to win.',
      'We design your menu card and catalogue, and set up your Google profile and WhatsApp catalogue.',
      'We shoot on mobile at your kitchen or events, edit the Reels and publish on a schedule.',
      'You get a monthly report with the enquiries that came in.',
    ],
    notFor: [
      'Businesses that cannot handle more orders at present. Marketing before capacity causes bad reviews.',
      'Anyone who wants guaranteed order volumes.',
    ],
    faqs: [
      { q: 'Can you design our menu card?', a: 'Yes. The Starter plan includes a menu card or catalogue design, which you can print or share on WhatsApp.' },
      { q: 'Do you shoot at our events?', a: 'Growth and Business plans include mobile shoots. Camera crew shoots are quoted separately.' },
      { q: 'Will you post photos of our clients?', a: 'Only with their permission. We will not publish a client or their event without it.' },
      { q: 'Can the WhatsApp reply include prices?', a: 'Yes. We set up an auto-reply with your menu and a request for event date, guests and venue so you can quote quickly.' },
      { q: 'Is ad spend included?', a: 'No. If you want ads, Meta Ads management is a separate service and you pay Meta directly.' },
    ],
    related: [
      { label: 'Instagram management', to: '/services/social-media-marketing' },
      { label: 'Google Maps SEO', to: '/services/seo' },
    ],
  },
  {
    slug: 'quick-start-add-ons',
    group: 'add-ons',
    navLabel: 'Quick-Start Add-Ons',
    headline: 'Quick-Start Add-Ons: Menu QR, WhatsApp Catalogue and Review Kit',
    answer:
      'Three small, fixed-price setups for businesses that want to start simply: a menu QR page, a WhatsApp catalogue with auto-replies, and a Google review collection kit. Each is a one-time fee and can be the first step before a website, Google Maps SEO or automation.',
    intro:
      'Not every business needs a full website on day one. A restaurant may only need a menu customers can scan, a shop may only need its products on WhatsApp, and almost everyone benefits from a simple way to ask for Google reviews. These add-ons are quick to deliver and easy to understand.',
    whoFor: [
      'Restaurants, cafes, bakeries and sweet shops',
      'Small shops and service businesses that take orders on WhatsApp',
      'Any local business that wants more Google reviews',
    ],
    howItWorks: [
      'Message us with your business and which add-on you want.',
      'Send your menu, products or Google profile link.',
      'We build and send it for approval.',
      'You print or share it the same day it is approved.',
    ],
    notFor: [
      'Businesses that need payments or a shopping cart. See our online store instead.',
    ],
    faqs: [
      { q: 'Can I upgrade later?', a: 'Yes. Many customers start with an add-on and move to a website or Google Maps SEO later. We will tell you honestly when a bigger service is worth it.' },
      { q: 'Does the menu QR need monthly payment?', a: 'The one-time fee covers the build and free updates for 30 days. We will quote any later update or hosting on request.' },
      { q: 'Will the review kit guarantee reviews?', a: 'No. It makes it easy for happy customers to leave one. Never pay for or write fake reviews, as Google can remove them.' },
    ],
    related: [
      { label: 'Google Maps SEO', to: '/services/seo' },
      { label: 'WhatsApp automation', to: '/services/whatsapp-automation' },
    ],
  },
]

export const getLanding = (slug: string): Landing | undefined =>
  LANDINGS.find((l) => l.slug === slug)
