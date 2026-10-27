/**
 * Blog articles. Rules: no statistics we cannot source, no client names,
 * no rankings. Prices are tokens like {{web-single}} and are filled from
 * pricing.json by the page, so they can never drift from the pricing page.
 */
export interface PostImage {
  src: string // full URL without size params; the page adds width/crop params
  alt: string
  credit?: { name: string; url: string } // photographer credit (Unsplash licence courtesy)
}

export type PostBlock =
  | { h: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { img: PostImage }
  | { table: { head: string[]; rows: string[][] } }
  | { cta: { label: string; intent: string } } // in-article WhatsApp button

export interface Post {
  slug: string
  title: string
  description: string
  tag: string
  readTime: string
  date: string // ISO
  updated?: string // ISO, last meaningful edit
  excerpt: string
  hero?: PostImage
  related: { label: string; to: string }
  blocks: PostBlock[]
  faqs?: { q: string; a: string }[]
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
    title: 'WordPress vs Custom-Coded Website: Which Should Your Business Choose?',
    description:
      'Compare WordPress and custom-coded websites on cost, SEO, speed and security. Find the right fit for your Pondicherry business. Get a free website audit.',
    tag: 'Website',
    readTime: '9 min read',
    date: '2026-10-21',
    updated: '2026-10-27',
    excerpt:
      'WordPress is often the better starting point for standard business websites, blogs and sites that need frequent content updates. Custom-coded websites are often better for specialised features, complex workflows and applications. The right choice depends on your requirements, budget and how your business will grow.',
    hero: {
      src: 'https://images.unsplash.com/photo-1678341859828-bfb1a2bd527a',
      alt: 'Laptop displaying the WordPress logo, representing the WordPress vs custom-coded website decision',
      credit: { name: 'Deng Xiang', url: 'https://unsplash.com/@dengxiangs' },
    },
    related: { label: 'See website development services', to: '/services/website-development' },
    blocks: [
      { p: 'Neither option wins in every category. The right choice for a business in Pondicherry, Cuddalore, Villupuram, Dindivanam or anywhere in Tamil Nadu depends on what the website actually needs to do. This guide compares both approaches so you can decide before you invest.' },
      { h: 'WordPress vs custom-coded website: comparison table' },
      { table: {
        head: ['Factor', 'WordPress website', 'Custom-coded website'],
        rows: [
          ['Initial cost', 'Often lower for standard websites', 'Can be higher for specialised features'],
          ['Development time', 'Usually faster for standard requirements', 'Depends on the complexity of the project'],
          ['Content updates', 'Convenient dashboard', 'Dashboard can be built, but depends on the project'],
          ['Design flexibility', 'High with themes and customisation', 'High, with design tailored to requirements'],
          ['SEO', 'Supports SEO through good structure and suitable tools', 'Supports SEO through good technical implementation'],
          ['Performance', 'Can be fast with proper optimisation', 'Can be fast with efficient architecture'],
          ['Security', 'Requires core, theme and plugin maintenance', 'Requires secure coding, dependency updates and server maintenance'],
          ['Integrations', 'Many ready-made plugins and integrations', 'Custom integrations can be developed'],
          ['Ongoing maintenance', 'Updates, backups and plugin compatibility checks', 'Code maintenance, testing and dependency updates'],
          ['Best suited for', 'Business websites, blogs and many online stores', 'Complex portals, specialised applications and custom workflows'],
        ],
      } },
      { p: 'Your final result depends on how the website is designed, developed, hosted and maintained.' },
      { cta: { label: 'Get your free consultation', intent: 'I read the WordPress vs custom website guide and would like a free consultation.' } },

      { h: '1. Website cost: which option is more affordable?' },
      { img: {
        src: 'https://images.unsplash.com/photo-1579397256979-cc326aefe273',
        alt: 'Close-up of source code on a computer screen, representing custom-coded website development',
        credit: { name: 'Dominik Malinowski', url: 'https://unsplash.com/@flac666' },
      } },
      { p: 'Cost is one of the first things business owners consider when comparing WordPress and custom-coded websites. Compare the complete project, not just the initial quotation.' },
      { h3: 'WordPress website cost' },
      { p: 'For a typical small business, WordPress can be cost-effective because developers can use existing tools rather than build every feature from scratch. A quotation may include design and development, theme or page-builder customisation, contact forms and WhatsApp integration, basic on-page SEO setup, mobile responsiveness, and domain and hosting. Premium themes, plugins, e-commerce functions and specialised integrations can increase the price.' },
      { h3: 'Custom-coded website cost' },
      { p: 'Custom development costs depend on the amount of design, programming, testing and integration required. A simple custom-coded website can be affordable if its requirements are limited. A customer portal, reporting dashboard or complex booking system can need significantly more development time.' },
      { p: 'A quotation may include UI/UX design, frontend and backend development, database setup, authentication and access controls, third-party integrations, and testing, deployment and documentation.' },
      { h3: 'Example for a business in Tamil Nadu' },
      { p: 'Imagine a women\'s boutique in Cuddalore needs a website with product photos, store information, an enquiry form and WhatsApp ordering. A WordPress website may meet these needs without building a complete shopping platform from scratch.' },
      { p: 'Now imagine the same business wants a custom inventory system, multiple branches, staff permissions, automated stock updates and integration with an existing billing system. Custom development may become more appropriate. The best investment is the option that meets your requirements without unnecessary development costs.' },

      { h: '2. SEO: can both websites rank on Google?' },
      { img: {
        src: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc',
        alt: 'The letters S, E and O representing search engine optimisation for WordPress and custom websites',
        credit: { name: 'Merakist', url: 'https://unsplash.com/@merakist' },
      } },
      { p: 'Yes. Both WordPress and custom-coded websites can rank on Google. Search visibility depends on content quality, search intent, technical accessibility, mobile usability, page experience, internal linking and how relevant your pages are to users. The platform alone does not guarantee rankings.' },
      { h3: 'When WordPress helps with SEO' },
      { p: 'WordPress is convenient for businesses that regularly publish blogs, service pages and location-based content, for example pages for searches like "website design in Cuddalore" or "SEO services in Villupuram". The team can publish and update these through the dashboard, and suitable SEO tools help manage metadata, XML sitemaps and other optimisation tasks.' },
      { h3: 'When custom development helps with SEO' },
      { p: 'Custom development gives developers more control over page rendering, URL structure, metadata, structured data and performance. That control only helps when it is implemented correctly. A custom website with missing metadata, poor internal links or thin content may perform worse than a well-maintained WordPress website.' },
      { h3: 'What should your business prioritise?' },
      { p: 'Choose the platform that makes it practical to keep up your SEO work. If you want to publish articles every week, WordPress may make content management easier. If you are building a specialised web application, custom development may fit better. Either way, plan for keyword research, useful content, technical SEO and regular performance reviews.' },
      { cta: { label: 'Chat with us on WhatsApp', intent: 'I would like to know more about WordPress vs custom websites for my business.' } },

      { h: '3. Speed and mobile performance' },
      { p: 'Many customers in Pondicherry, Cuddalore and the rest of Tamil Nadu find businesses on their phones. If your website loads slowly, is hard to navigate or displays poorly on a small screen, visitors may leave before contacting you.' },
      { h3: 'WordPress performance' },
      { p: 'WordPress speed depends on hosting quality, theme and page-builder choices, the number and quality of plugins, image sizes and formats, caching, and database and server configuration. A lightweight WordPress site on good hosting can perform well. A site overloaded with animations, scripts and plugins may struggle.' },
      { h3: 'Custom website performance' },
      { p: 'Custom development gives the developer more control over which scripts, components and resources are included. This can reduce unnecessary code, but it is not a guarantee. Poorly written code, oversized images or weak hosting can still slow a custom site down.' },
      { p: 'Practical tip: ask your developer to test mobile performance before launch and after major changes. Do not judge speed only by how quickly the site opens on the developer\'s computer.' },

      { h: '4. Security and website maintenance' },
      { img: {
        src: 'https://images.unsplash.com/photo-1774898989484-0b9becf69efb',
        alt: 'Padlock resting on a computer keyboard, representing website security and maintenance',
        credit: { name: 'Sasun Bughdaryan', url: 'https://unsplash.com/@sasun1990' },
      } },
      { p: 'A website is not a one-time project. It needs ongoing attention after launch.' },
      { h3: 'WordPress security' },
      { p: 'WordPress security depends on keeping the core software, themes and plugins updated, along with strong passwords, sensible access permissions, backups and suitable security controls. Avoid installing plugins just for attractive features; check that they are maintained, compatible and necessary.' },
      { h3: 'Custom website security' },
      { p: 'Custom-coded websites need secure authentication, input validation, access control, protected data handling and timely dependency updates. Fewer third-party plugins does not mean automatically secure. Vulnerabilities can exist in application code, libraries, APIs and server configuration.' },
      { h3: 'Which is easier to maintain?' },
      { p: 'For a standard company website, WordPress maintenance is often straightforward when the setup is simple and documented. A custom application may need specialist support, especially with complex backend logic or integrations.' },
      { p: 'Before choosing, ask your developer:' },
      { ul: [
        'Who will manage security updates?',
        'How often will backups run, and how is the site restored after a failure?',
        'What happens if a feature stops working?',
        'Is technical support included in the quotation?',
      ] },

      { h: '5. Content updates: can you manage the website yourself?' },
      { img: {
        src: 'https://images.unsplash.com/photo-1753351052363-53ce102830eb',
        alt: 'Smiling small business owner standing in her shop, representing owners who update their own website',
        credit: { name: 'Vitaly Gariev', url: 'https://unsplash.com/@silverkblack' },
      } },
      { p: 'For small business owners and women entrepreneurs, being able to make quick updates saves time and money. Imagine you run a home bakery in Pondicherry and want to add a Diwali special menu, update prices and post new product photos. With WordPress, these changes can usually be made through the dashboard after a short introduction.' },
      { p: 'With a custom-coded website, it depends on how it is built. A custom content dashboard can make updates just as convenient, but that feature must be included in the project.' },
      { h3: 'Choose WordPress if you regularly update' },
      { ul: ['Blog articles', 'Service descriptions', 'Course details', 'Product images and prices', 'Testimonials and announcements', 'Landing pages for marketing campaigns'] },
      { h3: 'Choose custom development if you need' },
      { ul: ['Complex dashboards', 'Data-driven reports', 'Special approval workflows', 'Different permissions for different users', 'Automated information from other systems'] },
      { cta: { label: 'Find the right fit for your business', intent: 'I would like help choosing WordPress or custom development for my website.' } },

      { h: '6. Design flexibility: which gives you more creative freedom?' },
      { img: {
        src: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e',
        alt: 'Website wireframe sketches on paper with a pen, representing website design planning',
        credit: { name: 'Kelly Sikkema', url: 'https://unsplash.com/@kellysikkema' },
      } },
      { p: 'Both options support professional, mobile-friendly designs. WordPress offers themes, page builders and reusable blocks, so businesses can create attractive websites without starting from zero. Custom development lets the team build the interface around a specific design system or user journey.' },
      { p: 'A real estate agency serving Pondicherry and Villupuram might need property filters, location search, enquiry tracking and individual property pages. WordPress can handle a standard listing site with suitable tools; a large property platform with complex filters, user accounts and integrations may benefit from custom development.' },
      { p: 'WordPress does not have to look like a template, and custom code does not automatically look better. Design quality depends on planning, usability and execution.' },

      { h: '7. Scalability: what happens when your business grows?' },
      { h3: 'WordPress for growing businesses' },
      { p: 'WordPress can grow with additional pages, content, integrations and e-commerce features. A training institute in Pondicherry could start with course information and enquiry forms, then add blog content and online payments later.' },
      { h3: 'Custom development for growing systems' },
      { p: 'Custom development may be appropriate when growth means more complex operations rather than more pages: a multi-branch appointment system, a customer portal with personal dashboards, a subscription platform, a multi-vendor marketplace, or a reporting system that connects several business tools.' },
      { p: 'The key question is not whether the website will grow, but what kind of growth you expect. More content does not automatically need custom code. Complex workflows may.' },

      { h: '8. Real business examples from Pondicherry and Tamil Nadu' },
      { img: {
        src: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04',
        alt: 'Clothing boutique interior with hanging racks, an example of a small business website use case',
        credit: { name: 'Clark Street Mercantile', url: 'https://unsplash.com/@mercantile' },
      } },
      { h3: 'Women\'s boutique in Pondicherry' },
      { p: 'Needs a home page, product gallery, location, Instagram links and WhatsApp enquiries. Recommended starting point: WordPress. The owner can update images and product details without a fully custom application.' },
      { h3: 'Real estate agency in Cuddalore' },
      { p: 'Wants to show plots and houses, publish property details, receive enquiries and create location pages. Recommended starting point: WordPress, depending on the listing requirements. Advanced property matching or agent dashboards can be evaluated later.' },
      { h3: 'Training institute in Villupuram' },
      { p: 'Needs course pages, trainer profiles, blog articles, student enquiries and WhatsApp contact. Recommended starting point: WordPress. If it later needs a full learning management system with assessments and progress tracking, compare specialist LMS products with custom development.' },
      { h3: 'Multi-branch service company' },
      { p: 'Needs staff logins, branch-level reporting, customer records, approvals and integration with internal software. Recommended starting point: a requirements assessment before choosing. A custom application may be justified, but check whether an existing business system can do the job at a lower total cost.' },
      { cta: { label: 'Get a requirements assessment', intent: 'I would like a requirements assessment for my website project.' } },

      { h: '9. Common myths about WordPress and custom development' },
      { ul: [
        'Myth: WordPress is only for beginners. It supports professional business sites, content-heavy platforms and many online stores.',
        'Myth: custom-coded websites always rank better. Content, structure, technical implementation and user experience matter more than the technology label.',
        'Myth: WordPress is always cheaper. A heavily customised WordPress site with many paid plugins can cost more to build and maintain.',
        'Myth: custom websites never get hacked. Every website needs security planning; custom code changes the risks, it does not remove them.',
        'Myth: every growing business needs custom code. Many businesses grow on WordPress for years. Choose custom development when real requirements justify it.',
      ] },

      { h: '10. How to choose the right website for your business' },
      { p: 'Answer these questions before you ask for a quotation:' },
      { ul: [
        'What is the main goal: enquiries, online sales, bookings, information or a full digital product?',
        'Who will update the content, and how often?',
        'Which features are essential at launch, and which can wait?',
        'What is the total budget, including hosting, domain renewal, premium tools, maintenance and future improvements?',
        'Who will maintain the website: updates, backups, troubleshooting and support?',
        'Can the website grow without a complete rebuild?',
        'Will you get admin access, domain control, backups and documentation?',
      ] },
      { h3: 'A simple decision rule' },
      { ul: [
        'Choose WordPress if you need a professional business website, regular content updates, blogging, standard integrations or a manageable starting budget.',
        'Choose custom-coded development if you need specialised application logic, complex integrations, custom user workflows or something standard tools cannot support efficiently.',
        'Choose a hybrid if you need WordPress for marketing content and a separate custom application for specialised operations.',
      ] },
      { p: 'You do not need the most complicated website. You need the right website for your business goals.' },

      { h: 'How BM TechX can help' },
      { p: 'BM TechX helps businesses in Pondicherry, Cuddalore, Villupuram, Dindivanam and across Tamil Nadu plan their online presence through website development and digital marketing. The first step is understanding what your website needs to achieve. Depending on your requirements, the project may involve:' },
      { ul: [
        'Business website planning and development',
        'Custom-coded website and application planning',
        'Mobile-friendly design',
        'On-page SEO and location-based content',
        'Google Business Profile optimisation',
        'WhatsApp enquiry integration',
        'Website performance and conversion improvements',
      ] },
      { p: 'Whether you are launching your first business website or improving an existing one, start with a clear plan, a realistic budget and the features your customers actually need. You can compare our published website packages on the pricing page, starting at {{web-single}}.' },

      { h: 'Final thoughts' },
      { p: 'The WordPress vs custom-coded website debate is not about one universal winner. WordPress can be a practical, flexible choice for many small businesses. Custom development gives more control when requirements are specialised. Both need good design, security, performance work and ongoing maintenance. Identify your goals and the features you genuinely need before you spend money.' },
    ],
    faqs: [
      { q: 'Is WordPress better than a custom-coded website?', a: 'WordPress is often better for standard business websites, blogs and projects that need frequent content updates. Custom-coded websites are often better for specialised features, complex workflows and applications. The right choice depends on your requirements.' },
      { q: 'Is a custom-coded website more expensive than WordPress?', a: 'It can be, particularly when the project includes complex features, backend systems or integrations. The cost depends on the scope. Compare complete quotations, including maintenance and recurring fees, rather than assuming one option is always cheaper.' },
      { q: 'Which website is better for SEO?', a: 'Both WordPress and custom-coded websites can rank on Google. Content quality, technical SEO, site structure, mobile usability and performance matter more than the development method alone.' },
      { q: 'Can I switch from WordPress to a custom-coded website later?', a: 'Yes. The work depends on your existing content, URLs, design, data and functionality. Plan redirects carefully to protect existing search visibility, and make sure important content and data are transferred correctly.' },
      { q: 'Which website should a small business in Pondicherry choose?', a: 'For a typical small business that needs service pages, contact forms, WhatsApp enquiries and SEO blogs, WordPress is a sensible starting point. If you need complex booking systems, customer dashboards or specialised integrations, evaluate custom development first.' },
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
