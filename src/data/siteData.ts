export interface PricingPlan {
  id: string
  name: string
  price: number
  period?: string
  delivery?: string
  recommended?: boolean
  badge?: string
  description: string
  includes: string[]
  excludes?: string[]
  renewal?: {
    amount: number
    period: string
    note?: string
  }
}

export interface CaseStudy {
  id: string
  title: string
  client: string
  sector: string
  location: string
  result: string
  metric: string
  badge: string
  tech: string[]
  description: string
}

export const SITE_CONFIG = {
  name: "BM TechX",
  legalName: "Afra Ventures Private Limited",
  cin: "U62011PY2026PTC009819",
  tagline: "Fixed-price digital growth for Tamil Nadu businesses",
  description: "BM TechX builds custom-coded, ultra-fast websites, eCommerce stores, SEO, and WhatsApp automation at guaranteed fixed prices.",
  phones: {
    whatsapp: "919403892971",
    whatsappDisplay: "+91 94038 92971",
    calls: "919944940051",
    callsDisplay: "+91 99449 40051",
  },
  email: "teamkamarweb@gmail.com",
  address: "78 Lenin Street, Kosapalayam, Puducherry 605013",
  operatingHours: "Mon – Sat: 10:00 AM – 7:00 PM IST",
  serviceAreas: ["Puducherry", "Chennai", "Cuddalore", "Villupuram", "Madurai", "Trichy", "Coimbatore"],
}

export const ONE_TIME_PLANS: PricingPlan[] = [
  {
    id: "web-single",
    name: "Single-Page Launchpad",
    price: 2999,
    delivery: "48 working hours",
    description: "Ideal for local businesses, consultants, and service providers wanting a high-converting fast presence.",
    includes: [
      "Custom-coded responsive single-page site",
      "Domain included for Year 1",
      "High-speed cloud hosting for Year 1",
      "100% Mobile & tablet optimized",
      "Lead enquiry form + direct WhatsApp CTA",
      "Basic on-page SEO & Schema markup",
      "Google Maps & Social links integration"
    ],
    excludes: [
      "Content writing beyond client draft",
      "Payment gateway / cart checkout",
      "User authentication / portal"
    ],
    renewal: {
      amount: 1999,
      period: "year",
      note: "Covers domain + hosting renewal from Year 2"
    }
  },
  {
    id: "web-multi",
    name: "Multi-Page Growth Hub",
    price: 4999,
    delivery: "5–7 working days",
    recommended: true,
    badge: "Most Popular",
    description: "Complete corporate architecture for established companies looking to dominate local search.",
    includes: [
      "5–8 Custom-coded reactive pages",
      "Domain + Cloud hosting for Year 1",
      "Core Web Vitals 95+ performance guarantee",
      "Multi-channel enquiry forms with spam filters",
      "Advanced on-page SEO & OpenGraph tags",
      "Google Business Profile link-up & Analytics",
      "WhatsApp automated quick-enquiry trigger",
      "SSL Certificate & Automated daily backups"
    ],
    excludes: [
      "Product photography & custom illustration shoots",
      "Payment gateway checkout"
    ],
    renewal: {
      amount: 1999,
      period: "year",
      note: "Covers domain + hosting renewal from Year 2"
    }
  },
  {
    id: "store",
    name: "Full eCommerce Engine",
    price: 9999,
    delivery: "7–10 working days",
    badge: "Maximum ROI",
    description: "Direct-to-consumer store with zero monthly marketplace cut, instant payment settlement, and WhatsApp alerts.",
    includes: [
      "Unlimited products & categories catalogue",
      "Razorpay / PhonePe / UPI Payment gateway",
      "Live order management dashboard",
      "Instant WhatsApp order alert dispatch",
      "Customer invoice generation & receipt emails",
      "First 20 products uploaded & formatted",
      "Coupon code & discount campaign engine",
      "0% platform transaction commissions"
    ],
    excludes: [
      "Product studio photography",
      "Ad spend budgets"
    ],
    renewal: {
      amount: 0,
      period: "year",
      note: "Zero annual software license fees. Cloud hosting as per usage."
    }
  }
]

export const MONTHLY_PLANS: PricingPlan[] = [
  {
    id: "seo-starter",
    name: "Local SEO Sprint",
    price: 4999,
    period: "month",
    description: "Dominate Google Maps and local Puducherry/TN search queries for high-intent keywords.",
    includes: [
      "24-point technical SEO audit & fixes",
      "5 Primary high-intent target keywords",
      "2 Core service pages fully optimized/mo",
      "1 Long-form SEO article (800+ words)",
      "4 Google Business Profile promotional updates",
      "Google Review acquisition funnel setup",
      "Monthly transparent performance rank report"
    ]
  },
  {
    id: "seo-growth",
    name: "Market Leader SEO",
    price: 8999,
    period: "month",
    recommended: true,
    badge: "Recommended",
    description: "Accelerate organic traffic and capture regional Tamil Nadu search dominance.",
    includes: [
      "Everything in Local SEO Sprint",
      "10 High-value commercial keywords",
      "4 Pages optimized & refreshed per month",
      "2 Authority technical articles (1,200+ words)",
      "8 Google Business Profile posts & geo-tags",
      "Managed local directory citations (10/mo)",
      "Competitor gap analysis & AI search visibility (ChatGPT/Perplexity)",
      "Bi-weekly ranking tracking & WhatsApp check-in"
    ]
  },
  {
    id: "meta-growth",
    name: "Meta Ads & Funnel Engine",
    price: 7499,
    period: "month",
    description: "Targeted Instagram & Facebook lead generation campaigns tailored to South Indian audiences.",
    includes: [
      "Campaign strategy & audience persona mapping",
      "Up to 8 high-converting ad creatives & copy variants",
      "Pixel setup, Conversions API & CAPI event tracking",
      "Direct-to-WhatsApp ad funnels with pre-filled lead tags",
      "Continuous A/B split testing & ROAS optimization",
      "Weekly budget pacing & transparent spend oversight"
    ]
  },
  {
    id: "whatsapp-auto",
    name: "WhatsApp Sales Autopilot",
    price: 3999,
    period: "month",
    badge: "24/7 Automation",
    description: "Never lose a buyer to delay. Automated instant lead qualification, catalog sharing, and team routing.",
    includes: [
      "Official Meta WhatsApp Cloud API integration",
      "Instant response automation (<10 seconds round-the-clock)",
      "Smart qualification flow based on buyer inquiry source",
      "Digital brochure & price card auto-dispatcher",
      "Multi-agent lead handover & notification alerts",
      "Monthly message performance analytics"
    ]
  }
]

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "anbu",
    title: "Organic Products eCommerce Store",
    client: "Anbu Nature Products",
    sector: "D2C Retail & Wellness",
    location: "Puducherry & Chennai",
    result: "340% increase in online direct orders within 60 days",
    metric: "3.4x Sales",
    badge: "eCommerce",
    tech: ["React", "Vite", "Tailwind CSS", "Razorpay", "WhatsApp API"],
    description: "Replaced an abandoned, slow WordPress site with a lightning-fast custom web app. Checkout latency dropped from 9.4s to 0.8s, resulting in a dramatic conversion boost."
  },
  {
    id: "academy",
    title: "EdTech Learning & Placement Portal",
    client: "Academywhytap / BM Academy",
    sector: "Education & Career Services",
    location: "Tamil Nadu",
    result: "10,000+ monthly learners handled with 99.98% uptime",
    metric: "10k+ Active Users",
    badge: "Web Platform",
    tech: ["Vite", "TypeScript", "Tailwind CSS", "Node.js"],
    description: "Engineered student dashboard, syllabus previews, and direct counselor chat routing that generated 180+ qualified admissions per batch."
  },
  {
    id: "jobportal",
    title: "Regional Employment Marketplace",
    client: "CT Job Portal",
    sector: "Recruitment & HR Tech",
    location: "South India",
    result: "Instant search & filtering across 5,000+ candidate listings",
    metric: "0.2s Search Time",
    badge: "Web App",
    tech: ["React", "Tailwind CSS", "Radix UI", "REST API"],
    description: "Designed a clean, distraction-free candidate and recruiter interface that made mobile job applications take under 60 seconds."
  },
  {
    id: "realestate",
    title: "Property & Plot Listing Portal",
    client: "Namma Pondy Properties",
    sector: "Real Estate & Plots",
    location: "Puducherry & Cuddalore",
    result: "Ranked #1 for 14 targeted local property keywords in 90 days",
    metric: "#1 Google Rank",
    badge: "SEO & Web",
    tech: ["Custom Code", "Local SEO Engine", "WhatsApp Link-up"],
    description: "Zero WordPress plugins. Every listing generates a direct WhatsApp lead with the exact property ID embedded."
  }
]

export const FAQS = [
  {
    q: "Why do you build custom-coded websites instead of WordPress?",
    a: "WordPress sites rely on 20+ plugins, which makes them slow (PageSpeed scores typically under 45), vulnerable to security breaches, and requiring costly recurring plugin updates. Our custom-coded React + Vite websites score 95-100 on Google Core Web Vitals, load in under 1 second, and will never break after a plugin update."
  },
  {
    q: "Are the prices really fixed, or are there hidden fees later?",
    a: "Our prices are 100% fixed and published transparently. What you see on this page (e.g. ₹2,999 for a single-page site, ₹4,999 for a multi-page site) is exactly what you pay. No surprise developer invoices, no 'hidden setup fee'. Prices exclude 18% GST as standard business practice."
  },
  {
    q: "How does the 48-hour delivery work for the single-page website?",
    a: "Once you provide your business details, logo, and core services, our engineering sprint begins immediately. Within 48 business hours, your site is fully coded, mobile-tested, domain-configured, and live on the internet."
  },
  {
    q: "What happens after year 1? Are there heavy renewal fees?",
    a: "No lock-in traps. From Year 2, the renewal is just ₹1,999/year which covers your standard domain registration and high-speed cloud hosting. You own 100% of your source code and data."
  },
  {
    q: "How does the WhatsApp Lead Automation work?",
    a: "Every button on your website embeds an invisible tracking tag. When a customer taps 'Chat on WhatsApp', it opens their WhatsApp with their exact service interest pre-filled. If you choose our Automation tier, an automated assistant qualifies them instantly within 10 seconds, even at 2 AM."
  }
]
