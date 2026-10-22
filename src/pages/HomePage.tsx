import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Zap,
  Sparkles,
  Award,
  Star,
  Layers,
  ShoppingBag,
  Search,
  Target,
  Share2,
  Bot,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { CaseStudyCard } from '@/components/CaseStudyCard';
import { NotForBlock } from '@/components/NotForBlock';
import { FAQ } from '@/components/FAQ';
import { getSiteConfig } from '@/data/dataLayer';

interface HomePageProps {
  onOpenQuote?: (service?: string) => void;
}

export function HomePage({ onOpenQuote }: HomePageProps) {
  const site = getSiteConfig();

  useEffect(() => {

    const homeSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://bmtechx.in/#website',
          'url': 'https://bmtechx.in/',
          'name': 'BM TechX',
          'description': 'Fixed-price digital growth for Tamil Nadu businesses',
          'publisher': { '@id': 'https://bmtechx.in/#organization' },
        },
        {
          '@type': 'ProfessionalService',
          '@id': 'https://bmtechx.in/#localbusiness',
          'name': 'BM TechX',
          'image': 'https://bmtechx.in/assets/office.jpg',
          'url': 'https://bmtechx.in',
          'telephone': '+91-99449-40051',
          'priceRange': '₹₹',
          'parentOrganization': { '@id': 'https://bmtechx.in/#organization' },
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '78 Lenin Street, Kosapalayam',
            'addressLocality': 'Puducherry',
            'addressRegion': 'Puducherry',
            'postalCode': '605013',
            'addressCountry': 'IN',
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': 11.9338,
            'longitude': 79.8297,
          },
          'openingHoursSpecification': [
            {
              '@type': 'OpeningHoursSpecification',
              'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              'opens': '10:00',
              'closes': '19:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              'dayOfWeek': 'Saturday',
              'opens': '10:00',
              'closes': '17:00',
            },
          ],
          'areaServed': [
            { '@type': 'City', 'name': 'Puducherry' },
            { '@type': 'City', 'name': 'Cuddalore' },
            { '@type': 'City', 'name': 'Villupuram' },
            { '@type': 'City', 'name': 'Chennai' },
            { '@type': 'City', 'name': 'Madurai' },
          ],
          'knowsLanguage': ['en', 'ta'],
        },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'home-schema';
    script.text = JSON.stringify(homeSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('home-schema');
      if (existing) existing.remove();
    };
  }, []);

  const homeFaqItems = [
    {
      q: 'How much does a website cost in Pondicherry?',
      a: 'A single-page website costs ₹2,999 plus GST and goes live in 48 working hours, with the domain and server included for the first year. A multi-page site is ₹4,999 plus GST. An online store with unlimited products is ₹9,999 plus GST. These are fixed prices, not starting prices.',
    },
    {
      q: 'Do I have to pay every year?',
      a: 'The ₹2,999 and ₹4,999 websites renew at ₹1,999 plus GST a year, which covers your domain and server. The ₹9,999 online store has no yearly renewal fee at all.',
    },
    {
      q: 'Is GST included in your prices?',
      a: 'No. All prices shown exclude 18% GST. So a ₹2,999 website is ₹3,539 including GST. We show the pre-GST figure because that is how the invoice reads.',
    },
    {
      q: 'How long does SEO take to show results?',
      a: 'Three to six months for meaningful movement, and longer on competitive terms. Anyone promising you first position in 30 days is telling you something that is not true. Our minimum engagement is three months because anything shorter cannot produce a result worth showing you.',
    },
    {
      q: 'Do you work outside Pondicherry?',
      a: 'Yes. We work across Cuddalore, Villupuram, Chennai, Madurai, Trichy and Namakkal. Website, SEO, ads and social work are all delivered remotely. Only photo and video shoots need us on site, and shoots outside Puducherry are priced on requirement.',
    },
    {
      q: 'What happens if you miss the delivery date?',
      a: 'The 48-working-hour clock starts when we have your content and your logo, and you can see it running. If we miss it for a reason that is ours, you do not pay the balance until it is live. We would rather commit to a date and be held to it than give you a vague estimate.',
    },
  ];

  const disqualifiers = [
    'Your budget is under ₹2,999 — we cannot build anything we would put our name on for less.',
    'You need it live tomorrow — 48 working hours is the floor, and it starts when your content arrives.',
    'You want a guarantee of first position on Google — no honest agency can promise that, and we will not.',
    'You want us to manage your ad spend without paying a management fee.',
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* ========================================================= */}
      {/* BLOCK 1 — HERO WITH AMBIENT MUSTARD GLOW                  */}
      {/* ========================================================= */}
      <section className="relative pt-12 sm:pt-20 pb-12 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient Subtle Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(255,230,0,0.20),transparent_70%)] pointer-events-none blur-2xl" />

        <div className="relative text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] px-4 py-1.5 rounded-full text-xs font-bold text-[#0A0B0E] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FFE600] animate-ping"></span>
            <span>Puducherry & Tamil Nadu · Fixed Prices on the Page</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0A0B0E] font-display tracking-tight leading-[1.06]">
            Fixed-price digital growth for{' '}
            <span className="text-gradient-mustard">Tamil Nadu businesses</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Websites, ads, SEO and WhatsApp automation — priced on this page, delivered on the date we commit to. Built in Puducherry, working across Tamil Nadu.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <WhatsAppCTA
              src="home-hero"
              intent="I'd like to know more about your services"
              label="Message us on WhatsApp"
              size="lg"
              className="w-full sm:w-auto shadow-md"
            />
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base font-extrabold rounded-2xl border-2 border-black hover:border-black text-black bg-white hover:bg-black hover:text-white transition-all shadow-sm"
            >
              <Link to="/pricing">See all prices →</Link>
            </Button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-black fill-[#FFE600]" /> 48-Hour Web Delivery
            </span>
            <span className="text-[#E2E8F0]">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> MCA Registered Entity
            </span>
            <span className="text-[#E2E8F0]">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-black" /> Prices Include Year 1 Server
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* INFINITE MARQUEE TICKER BANNER                            */}
      {/* ========================================================= */}
      <div className="w-full overflow-hidden border-y border-[#E2E8F0] bg-white py-3.5 shadow-sm">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-black uppercase tracking-widest text-slate-700">
          <span className="flex items-center gap-2 text-[#0A0B0E]">
            <span className="text-black font-extrabold bg-[#FFE600] px-1.5 py-0.5 rounded text-[10px]">✦</span> 48-Hour Rapid Delivery
          </span>
          <span className="flex items-center gap-2 text-black font-extrabold">
            <span>✦</span> 100% Fixed Published Prices
          </span>
          <span className="flex items-center gap-2 text-[#0A0B0E]">
            <span className="text-black font-extrabold bg-[#FFE600] px-1.5 py-0.5 rounded text-[10px]">✦</span> High-Speed Custom React Code
          </span>
          <span className="flex items-center gap-2 text-emerald-700 font-bold">
            <span>✦</span> WhatsApp Lead Automation
          </span>
          <span className="flex items-center gap-2 text-[#0A0B0E]">
            <span className="text-black font-extrabold bg-[#FFE600] px-1.5 py-0.5 rounded text-[10px]">✦</span> Fast, mobile-first build
          </span>
          <span className="flex items-center gap-2 text-black font-extrabold">
            <span>✦</span> Zero Platform Commission Stores
          </span>
          <span className="flex items-center gap-2 text-[#0A0B0E]">
            <span className="text-black font-extrabold bg-[#FFE600] px-1.5 py-0.5 rounded text-[10px]">✦</span> Puducherry & Chennai Local Teams
          </span>

          {/* Duplicated for seamless infinite loop */}
          <span className="flex items-center gap-2 text-[#0A0B0E]">
            <span className="text-black font-extrabold bg-[#FFE600] px-1.5 py-0.5 rounded text-[10px]">✦</span> 48-Hour Rapid Delivery
          </span>
          <span className="flex items-center gap-2 text-black font-extrabold">
            <span>✦</span> 100% Fixed Published Prices
          </span>
          <span className="flex items-center gap-2 text-[#0A0B0E]">
            <span className="text-black font-extrabold bg-[#FFE600] px-1.5 py-0.5 rounded text-[10px]">✦</span> High-Speed Custom React Code
          </span>
          <span className="flex items-center gap-2 text-emerald-700 font-bold">
            <span>✦</span> WhatsApp Lead Automation
          </span>
          <span className="flex items-center gap-2 text-[#0A0B0E]">
            <span className="text-black font-extrabold bg-[#FFE600] px-1.5 py-0.5 rounded text-[10px]">✦</span> Fast, mobile-first build
          </span>
          <span className="flex items-center gap-2 text-black font-extrabold">
            <span>✦</span> Zero Platform Commission Stores
          </span>
          <span className="flex items-center gap-2 text-[#0A0B0E]">
            <span className="text-black font-extrabold bg-[#FFE600] px-1.5 py-0.5 rounded text-[10px]">✦</span> Puducherry & Chennai Local Teams
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* BLOCK 2 — CORE OFFER STRIP                               */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto" aria-label="Core Offers">
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1F5F9] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FFE600] px-2.5 py-1 rounded-md">
                Core Fixed-Price Packages
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Prices read from single source of truth. Excludes 18% GST.
              </p>
            </div>
            <Link
              to="/pricing"
              className="text-xs font-bold text-black hover:underline inline-flex items-center gap-1"
            >
              View Full Rate Card <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 — Website */}
            <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-[#E2E8F0] hover:border-black/30 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Website
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#0A0B0E] font-display">
                  ₹2,999
                </div>
                <p className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg inline-block">
                  ⚡ Live in 48 working hours
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A one-page custom-coded website. Domain and high-speed server included for year one.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E2E8F0]">
                <Link
                  to="/services/website-development"
                  className="text-xs font-bold text-black hover:text-slate-700 flex items-center justify-between"
                >
                  <span>Explore Website Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2 — Online Store */}
            <div className="bg-white p-6 rounded-2xl border-2 border-[#FFE600] shadow-md transition-all flex flex-col justify-between relative ring-2 ring-[#FFE600]/20">
              <div className="absolute -top-3 right-4 bg-[#FFE600] text-black text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm border border-black/10">
                Zero Commission
              </div>
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Online Store
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#0A0B0E] font-display">
                  ₹9,999
                </div>
                <p className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg inline-block">
                  🛒 No yearly renewal fee
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Sell online with unlimited products, Razorpay/UPI integration, and WhatsApp order alerts.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F1F5F9]">
                <Link
                  to="/services/ecommerce-website"
                  className="text-xs font-bold text-black hover:text-slate-700 flex items-center justify-between"
                >
                  <span>Explore eCommerce Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3 — SEO */}
            <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-[#E2E8F0] hover:border-black/30 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Search Optimization
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#0A0B0E] font-display">
                    ₹2,999
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">/month</span>
                </div>
                <p className="text-xs font-bold text-black bg-[#FFE600]/25 border border-[#FFE600]/60 px-2.5 py-1 rounded-lg inline-block">
                  📍 Google Maps SEO
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Get found on Google Maps when people nearby search for what you sell. Real deliverables and honest timelines.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E2E8F0]">
                <Link
                  to="/services/seo"
                  className="text-xs font-bold text-black hover:text-slate-700 flex items-center justify-between"
                >
                  <span>Explore SEO Tiers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 3 — THE ANSWER-FIRST PARAGRAPH (AI Search Extract) */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto text-center" aria-label="Executive Agency Summary">
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-10 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider bg-[#FFE600]/25 border border-[#FFE600]/60 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-black" /> Direct Entity Summary
          </div>
          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
            BM TechX is a digital marketing agency in Pondicherry that publishes its prices. We build custom-coded websites from ₹2,999, online stores from ₹9,999, and run SEO, Meta ads and social media on monthly plans from ₹4,999 — for businesses in Puducherry, Cuddalore, Villupuram and across Tamil Nadu. You can see every price before you talk to anyone.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 4 — GLOBAL PROOF BAR                               */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-6" aria-label="Verifiable Credentials">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Registered Company
              </p>
              <p className="text-sm font-bold text-[#0A0B0E]">{site.entity.legal_name}</p>
              <p className="font-mono text-[11px] text-slate-600 font-bold">CIN: {site.entity.cin}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFE600]/25 text-black border border-[#FFE600]/60 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-black" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Talent Ecosystem
              </p>
              <p className="text-sm font-bold text-[#0A0B0E]">1,400+ Trained Learners</p>
              <p className="text-xs text-slate-600">150+ Placed via BM Academy</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 border border-amber-200 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Customer Rating
              </p>
              <p className="text-sm font-bold text-[#0A0B0E]">5.0 ★ Client Satisfaction</p>
              <p className="text-xs text-slate-600">Pondicherry & Tamil Nadu</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 5 — SERVICES (6 Outcome-Driven Cards)              */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-10" aria-label="Services Portfolio">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FFE600]/25 border border-[#FFE600]/60 px-3.5 py-1 rounded-full">
            Outcome-Led Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A0B0E] font-display tracking-tight">
            Six ways we help your business grow
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Each headline is an outcome, not a vague agency buzzword.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service 1 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E8F0] hover:border-black/30 transition-all shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] text-black border border-[#E2E8F0] flex items-center justify-center">
                <Layers className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0B0E] leading-snug font-display">
                Get a website that actually loads
              </h3>
              <p className="text-xs text-black font-extrabold bg-[#FFE600]/30 px-2 py-0.5 rounded w-fit">
                Custom-coded, live in 48 hours, from ₹2,999.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero slow WordPress themes. Loads in under 2 seconds on 4G mobile networks across Tamil Nadu.
              </p>
            </div>
            <Link
              to="/services/website-development"
              className="mt-4 pt-4 border-t border-[#F1F5F9] text-xs font-bold text-black hover:text-slate-600 flex items-center justify-between"
            >
              <span>Explore Website Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E8F0] hover:border-black/30 transition-all shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0B0E] leading-snug font-display">
                Start selling online this week
              </h3>
              <p className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded w-fit">
                Unlimited products, no yearly renewal, ₹9,999.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete custom store with payment gateway integration, order alerts, and 0% platform commission.
              </p>
            </div>
            <Link
              to="/services/ecommerce-website"
              className="mt-4 pt-4 border-t border-[#F1F5F9] text-xs font-bold text-black hover:text-slate-600 flex items-center justify-between"
            >
              <span>Explore Store Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E8F0] hover:border-black/30 transition-all shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0B0E] leading-snug font-display">
                Be found when people search for what you sell
              </h3>
              <p className="text-xs text-cyan-800 font-bold bg-cyan-50 px-2 py-0.5 rounded w-fit">
                Google Maps SEO from ₹2,999. Real deliverables.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Google Business Profile optimisation, posts, review growth and honest timelines.
              </p>
            </div>
            <Link
              to="/services/seo"
              className="mt-4 pt-4 border-t border-[#F1F5F9] text-xs font-bold text-black hover:text-slate-600 flex items-center justify-between"
            >
              <span>Explore SEO Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Service 4 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E8F0] hover:border-black/30 transition-all shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0B0E] leading-snug font-display">
                Turn Facebook & Instagram into enquiries
              </h3>
              <p className="text-xs text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded w-fit">
                ₹4,999/mo management. Leads directly to WhatsApp.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Creative ads in Tamil & English. Cost-per-lead tracking across real estate, hospitality, and retail.
              </p>
            </div>
            <Link
              to="/services/meta-ads"
              className="mt-4 pt-4 border-t border-[#F1F5F9] text-xs font-bold text-black hover:text-slate-600 flex items-center justify-between"
            >
              <span>Explore Meta Ads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Service 5 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E8F0] hover:border-black/30 transition-all shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0B0E] leading-snug font-display">
                Stop worrying about what to post
              </h3>
              <p className="text-xs text-indigo-800 font-bold bg-indigo-50 px-2 py-0.5 rounded w-fit">
                Instagram management from ₹7,999/month. We report enquiries, not likes.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Professional graphics, localized captions, and active community management that drive direct inquiries.
              </p>
            </div>
            <Link
              to="/services/social-media-marketing"
              className="mt-4 pt-4 border-t border-[#F1F5F9] text-xs font-bold text-black hover:text-slate-600 flex items-center justify-between"
            >
              <span>Explore Social Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Service 6 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E8F0] hover:border-black/30 transition-all shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0B0E] leading-snug font-display">
                Answer every enquiry in two minutes, at 11pm
              </h3>
              <p className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded w-fit">
                The LeadOS system we run our own agency on.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated qualification, Google Sheets CRM sync, and multi-day follow-ups for high-volume businesses.
              </p>
            </div>
            <Link
              to="/services/whatsapp-automation"
              className="mt-4 pt-4 border-t border-[#F1F5F9] text-xs font-bold text-black hover:text-slate-600 flex items-center justify-between"
            >
              <span>Explore Automation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 6 — WHY US (The 4 Contrast Points)                 */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-10" aria-label="Why Choose BM TechX">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FFE600] px-3.5 py-1 rounded-full shadow-sm">
            Our Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A0B0E] font-display tracking-tight">
            How we do business differently
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] space-y-3 shadow-sm hover:shadow-md hover:border-black/30 transition-all">
            <div className="text-3xl font-black text-black font-display flex items-center justify-between">
              <span>01</span>
              <span className="w-2 h-2 rounded-full bg-[#FFE600]" />
            </div>
            <h3 className="text-base font-bold text-[#0A0B0E] font-display">The price is on the page</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Most agencies make you sit through a call before quoting. Ours are published — ₹2,999, ₹9,999, ₹4,999 a month. If they change, they change on this page first.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] space-y-3 shadow-sm hover:shadow-md hover:border-black/30 transition-all">
            <div className="text-3xl font-black text-black font-display flex items-center justify-between">
              <span>02</span>
              <span className="w-2 h-2 rounded-full bg-[#FFE600]" />
            </div>
            <h3 className="text-base font-bold text-[#0A0B0E] font-display">The date is on the page</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A one-page website is live in 48 working hours. Not "about a week". The clock starts when we have your content, and you can watch it run.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] space-y-3 shadow-sm hover:shadow-md hover:border-black/30 transition-all">
            <div className="text-3xl font-black text-black font-display flex items-center justify-between">
              <span>03</span>
              <span className="w-2 h-2 rounded-full bg-[#FFE600]" />
            </div>
            <h3 className="text-base font-bold text-[#0A0B0E] font-display">We write the code</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We don't buy a theme and tweak the colors. Custom-coded sites load faster, break less, and aren't one plugin update away from going down.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] space-y-3 shadow-sm hover:shadow-md hover:border-black/30 transition-all">
            <div className="text-3xl font-black text-black font-display flex items-center justify-between">
              <span>04</span>
              <span className="w-2 h-2 rounded-full bg-[#FFE600]" />
            </div>
            <h3 className="text-base font-bold text-[#0A0B0E] font-display">We automate our own agency</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The WhatsApp assistant that replies to you is the same system we sell. That is why we can deliver a ₹2,999 website profitably, and why you get answers at 10pm.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 7 — FEATURED CASE STUDY                            */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto space-y-6" aria-label="Featured Client Result">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FFE600] px-3.5 py-1 rounded-full shadow-sm">
            Featured Case Study
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0B0E] font-display">
            Real Estate Lead Generation Across Three Districts
          </h2>
        </div>

        <CaseStudyCard id="ads-case-realestate" onSelect={() => onOpenQuote && onOpenQuote('Real Estate Campaign')} />
      </section>

      {/* ========================================================= */}
      {/* BLOCK 8 — PROCESS (Times, Not Adjectives)                 */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8" aria-label="Delivery Process">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FFE600] px-3.5 py-1 rounded-full shadow-sm">
            Simple 4-Step Flow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A0B0E] font-display tracking-tight">
            How we take your project live
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] space-y-2 relative shadow-sm hover:shadow-md transition-all">
            <span className="text-xs font-black text-black bg-[#FFE600] px-2 py-0.5 rounded uppercase font-mono inline-block">Step 01</span>
            <h3 className="text-base font-bold text-[#0A0B0E] font-display">You message us</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              WhatsApp us any hour. Tell us what business you run and what you want to achieve.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] space-y-2 relative shadow-sm hover:shadow-md transition-all">
            <span className="text-xs font-black text-black bg-[#FFE600] px-2 py-0.5 rounded uppercase font-mono inline-block">Step 02</span>
            <h3 className="text-base font-bold text-[#0A0B0E] font-display">We send written scope</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Within one working day, you receive the full scope and exact price before you pay a single rupee.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] space-y-2 relative shadow-sm hover:shadow-md transition-all">
            <span className="text-xs font-black text-black bg-[#FFE600] px-2 py-0.5 rounded uppercase font-mono inline-block">Step 03</span>
            <h3 className="text-base font-bold text-[#0A0B0E] font-display">We build to the clock</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              48 working hours for single-page sites; 7–10 working days for full stores. The clock starts on intake.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] space-y-2 relative shadow-sm hover:shadow-md transition-all">
            <span className="text-xs font-black text-black bg-[#FFE600] px-2 py-0.5 rounded uppercase font-mono inline-block">Step 04</span>
            <h3 className="text-base font-bold text-[#0A0B0E] font-display">You go live</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We hand over full ownership. Domain and hosting accounts are registered under your business name.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 9 — WHO THIS IS NOT FOR (Disqualifiers)             */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto" aria-label="Client Fit">
        <NotForBlock items={disqualifiers} />
      </section>

      {/* ========================================================= */}
      {/* BLOCK 10 — FAQ (Automatic FAQPage Schema)                */}
      {/* ========================================================= */}
      <FAQ
        items={homeFaqItems}
        title="Frequently Asked Questions"
        subtitle="Every answer matches our verified service contracts."
      />

      {/* ========================================================= */}
      {/* BLOCK 11 — CLOSE (Final CTA)                             */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto text-center" aria-label="Closing Call To Action">
        <div className="bg-[#0A0B0E] border-2 border-[#FFE600] rounded-3xl p-8 sm:p-14 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="space-y-3 relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-black bg-[#FFE600] px-3.5 py-1 rounded-full inline-block shadow">
              Zero Pressure Consultation
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-white">
              Send us a message. You'll get a price, not a sales call.
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Message us on WhatsApp right now. Our engineering team in Puducherry will reply with exact figures.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
            <WhatsAppCTA
              src="home-footer"
              intent="I'd like to know more about your services"
              label="WhatsApp us now"
              size="lg"
              className="w-full sm:w-auto shadow-[0_0_25px_rgba(255,230,0,0.3)] !bg-[#FFE600] !text-black hover:!bg-white"
            />
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base font-extrabold rounded-2xl bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all"
            >
              <Link to="/pricing">See all prices →</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
