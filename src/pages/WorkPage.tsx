import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  ChevronRight,
  ArrowRight,
  FileCheck,
  CheckCircle2,
  Lock,
  Building,
  Hotel,
  ShieldCheck,
  Search,
  Megaphone,
} from 'lucide-react';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';

interface WorkPageProps {
  onOpenQuote?: (service?: string) => void;
}

export function WorkPage({ onOpenQuote }: WorkPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'real-estate' | 'seo' | 'social' | 'custom'>('all');

  // SEO Metadata & Schema Injection
  useEffect(() => {

    const schemaId = 'work-page-schema';
    let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://bmtechx.in/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Our Work',
              item: 'https://bmtechx.in/work/',
            },
          ],
        },
        {
          '@type': 'ItemList',
          name: 'BM TechX Client Results & Case Studies',
          description:
            'Real projects with verified numbers — verified property leads across three districts, villa SEO in Pondicherry, custom booking systems.',
          itemListElement: [
            {
              '@type': 'Article',
              position: 1,
              headline: 'Real Estate Multi-City Lead Generation (500 Verified Leads)',
              url: 'https://bmtechx.in/work/real-estate-multi-city/',
            },
            {
              '@type': 'Article',
              position: 2,
              headline: 'Boutique Villa SEO in Pondicherry (Growth Plan)',
              url: 'https://bmtechx.in/work/pondicherry-villa-seo/',
            },
            {
              '@type': 'Article',
              position: 3,
              headline: 'Custom Hotel Room Booking Platform',
              url: 'https://bmtechx.in/work/hotel-booking-system/',
            },
          ],
        },
      ],
    };

    scriptTag.textContent = JSON.stringify(schemaData);

    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, []);

  const caseStudies = [
    {
      id: 'npp-instagram',
      category: 'social',
      title: 'Instagram Growth for a Real Estate Page',
      clientName: 'Namma Pondy Properties (our own brand)',
      sector: 'Real Estate',
      city: 'Puducherry',
      service: 'Instagram content and reels',
      headlineNumber: '508,256',
      headlineUnit: 'views in 30 days (26 Jun to 25 Jul 2026)',
      cplTarget: '82.3% of views came from non-followers',
      summary:
        'We run the Instagram page of our own real estate brand using mobile-shot property reels. Instagram Insights for the period show 189,515 accounts reached and 13,261 interactions. Figures are read from Instagram Insights and the screenshot is available on request.',
      icon: Megaphone,
      href: '/services/social-media-marketing/',
      confidentialityNote: 'Source: Instagram Insights, 26 Jun to 25 Jul 2026. This is our own page, not a client page.',
    },
    {
      id: 'velai-vaaippu-smm',
      category: 'social',
      title: 'Social Media Management for a Job Platform',
      clientName: 'Velai Vaaippu',
      sector: 'Jobs and Careers',
      city: 'Tamil Nadu',
      service: 'Instagram management',
      headlineNumber: '22K+',
      headlineUnit: 'Instagram followers (Oct 2026)',
      cplTarget: 'Job-opening reels and student content',
      summary:
        'We manage the Instagram page for Velai Vaaippu, a job platform for job seekers, companies and colleges. The page publishes job openings and career content for a Tamil Nadu audience.',
      icon: Megaphone,
      href: '/services/social-media-marketing/',
      confidentialityNote: 'Follower count as shown on the public Instagram page in October 2026.',
    },
    {
      id: 'raahath-dental-gbp',
      category: 'seo',
      title: 'Google Business Profile for a Dental Clinic',
      clientName: 'Raahath Dental Care and Implant Centre',
      sector: 'Dental Clinic',
      city: 'Kottakuppam',
      service: 'Google Business Profile Growth plan',
      headlineNumber: '8 Oct 2026',
      headlineUnit: 'work started · results being recorded',
      cplTarget: 'Calls, directions and website clicks',
      summary:
        'We began optimising the clinic Google Business Profile on 8 October 2026. We recorded the starting numbers (calls, direction requests, website clicks) and will publish the comparison here once there are enough weeks of data to be meaningful.',
      icon: Search,
      href: '/services/seo/',
      confidentialityNote: 'Published with the clinic permission. No result is claimed yet.',
    },
    {
      id: 'real-estate-multi-city',
      category: 'real-estate',
      title: 'Real Estate Lead Generation across Three Districts',
      clientName: 'Residential Plots Developer',
      sector: 'Real Estate',
      city: 'Madurai, Trichy & Namakkal',
      service: 'Meta Lead Generation (4 Projects)',
      headlineNumber: '500',
      headlineUnit: 'Phone-Verified Leads',
      cplTarget: 'Under ₹40 CPL',
      summary:
        'Four residential layout projects running simultaneously across three districts. Every lead phone-verified before reaching the sales desk and delivered to WhatsApp in real time against a target CPL under ₹40.',
      icon: Building,
      href: '/industries/real-estate/',
      confidentialityNote: 'Client identity protected under written NDA · Operational metrics verified from Meta Ads Manager.',
    },
    {
      id: 'pondicherry-villa-seo',
      category: 'seo',
      title: 'Boutique Luxury Villa Local & Organic SEO Sprints',
      clientName: 'Boutique Villa (name withheld)',
      sector: 'Hospitality',
      city: 'Pondicherry',
      service: 'SEO Growth Plan (10 Keywords)',
      headlineNumber: '3 months',
      headlineUnit: 'SEO sprint · results being documented',
      cplTarget: 'Direct Bookings',
      summary:
        'A comprehensive 3-month SEO campaign targeting weekend travelers from Chennai and Bangalore searching for private pool stays. Technical speed optimization, Google Business Profile overhaul, and localized content citations.',
      icon: Search,
      href: '/services/seo/',
      confidentialityNote: 'Case study documentation in progress · Baseline metrics exported via Search Console.',
    },
    {
      id: 'hotel-booking-system',
      category: 'custom',
      title: 'Custom Direct Hotel Room Booking & Inventory Engine',
      clientName: 'Boutique Hotel Group',
      sector: 'Hospitality',
      city: 'Puducherry',
      service: 'Custom Web Application & Booking Engine',
      headlineNumber: '24',
      headlineUnit: 'client review items delivered',
      cplTarget: 'Direct Payment Gateway',
      summary:
        'A dedicated booking platform designed to bypass 18–25% OTA commissions. Built and refined through a 24-item client review protocol, with Razorpay integration and instant WhatsApp reservation confirmations.',
      icon: Hotel,
      href: '/services/website-development/',
      confidentialityNote: 'Custom software deployment · Zero recurring software subscription fees.',
    },
  ];

  const filteredStudies =
    selectedCategory === 'all'
      ? caseStudies
      : caseStudies.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-16 sm:space-y-24 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* ========================================================= */}
      {/* BREADCRUMB                                                */}
      {/* ========================================================= */}
      <nav aria-label="Breadcrumb" className="text-xs text-bm-ink-muted">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="hover:text-bm-navy transition-colors">
              Home
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="font-semibold text-bm-navy-deep">Our Work</span>
          </li>
        </ol>
      </nav>

      {/* ========================================================= */}
      {/* BLOCK 1 — H1 + ANSWER FIRST                              */}
      {/* ========================================================= */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-bm-wash-cool border border-bm-brand-soft px-3.5 py-1.5 rounded-full text-xs font-bold text-bm-navy">
          <Briefcase className="w-3.5 h-3.5 text-bm-orange" />
          <span>Verified Client Case Studies · Real Numbers Only</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-bm-navy-deep font-display tracking-tight">
          What we have actually delivered
        </h1>

        <p className="text-base sm:text-xl text-bm-ink font-medium leading-relaxed max-w-3xl mx-auto bg-white border border-bm-line p-6 sm:p-8 rounded-3xl shadow-sm">
          Real projects, named clients where they have agreed, and a verifiable number in every single one. If a client preferred not to be named publicly, we publish the sector and the city instead — <strong className="text-bm-navy-deep font-extrabold">we never publish anonymous or fabricated praise</strong>.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-bm-navy text-white shadow-sm'
                : 'bg-white border border-bm-line text-bm-ink hover:border-bm-brand-soft'
            }`}
          >
            All Case Studies
          </button>
          <button
            onClick={() => setSelectedCategory('real-estate')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'real-estate'
                ? 'bg-bm-navy text-white shadow-sm'
                : 'bg-white border border-bm-line text-bm-ink hover:border-bm-brand-soft'
            }`}
          >
            Real Estate Leads (500 Leads)
          </button>
          <button
            onClick={() => setSelectedCategory('seo')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'seo'
                ? 'bg-bm-navy text-white shadow-sm'
                : 'bg-white border border-bm-line text-bm-ink hover:border-bm-brand-soft'
            }`}
          >
            Local SEO
          </button>
          <button
            onClick={() => setSelectedCategory('social')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'social'
                ? 'bg-bm-navy text-white shadow-sm'
                : 'bg-white border border-bm-line text-bm-ink hover:border-bm-brand-soft'
            }`}
          >
            Social Media
          </button>
          <button
            onClick={() => setSelectedCategory('custom')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'custom'
                ? 'bg-bm-navy text-white shadow-sm'
                : 'bg-white border border-bm-line text-bm-ink hover:border-bm-brand-soft'
            }`}
          >
            Custom Booking Software
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 2 — CASE STUDY CARDS GRID                           */}
      {/* ========================================================= */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredStudies.map((study) => {
            const Icon = study.icon;
            return (
              <div
                key={study.id}
                className="bg-white rounded-3xl border border-bm-line p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-bm-brand-soft transition-all space-y-6"
              >
                <div className="space-y-4">
                  {/* Category & City */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-bm-wash-cool text-bm-navy flex items-center justify-center border border-bm-brand-soft/40">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-bm-navy bg-bm-wash-cool border border-bm-brand-soft/40 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-bm-orange" />
                      {study.city}
                    </span>
                  </div>

                  {/* Headline Metric Card */}
                  <div className="bg-bm-wash-cool p-4 rounded-2xl border border-bm-brand-soft/30 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-bm-ink-faint tracking-wider font-mono">
                      Headline Verified Metric
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-bm-navy-deep font-display">
                        {study.headlineNumber}
                      </span>
                      <span className="text-xs font-bold text-emerald-800">
                        {study.headlineUnit}
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-bm-ink-muted">
                      Target efficiency: {study.cplTarget}
                    </p>
                  </div>

                  {/* Title & Client */}
                  <div>
                    <h3 className="text-lg font-bold text-bm-navy-deep font-display leading-snug">
                      {study.title}
                    </h3>
                    <p className="text-xs text-bm-ink-faint mt-1">
                      Client: <span className="font-semibold text-bm-ink">{study.clientName}</span> · {study.service}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-bm-ink leading-relaxed">
                    {study.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-bm-line-soft space-y-3">
                  <p className="text-[10px] text-bm-ink-faint flex items-start gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{study.confidentialityNote}</span>
                  </p>

                  <Link
                    to={study.href}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-bm-navy bg-bm-wash-cool hover:bg-bm-navy hover:text-white transition-colors border border-bm-brand-soft/40"
                  >
                    <span>Explore Associated Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 3 — CASE STUDY ARCHITECTURAL TEMPLATE               */}
      {/* ========================================================= */}
      <section className="bg-bm-navy-deep text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-bm-brand-soft/20 space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-emerald-400 border border-white/10">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Editorial Standard</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            How We Document Every Case Study
          </h2>

          <p className="text-sm sm:text-base text-bm-brand-soft leading-relaxed">
            We hold a strict editorial discipline: the verifiable commercial result must appear in the first 40 words. No corporate fluff, no filler adjectives, and no anonymous quotes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 backdrop-blur-sm">
            <span className="font-mono text-xs font-bold text-emerald-400">01. Result First</span>
            <h3 className="text-sm font-bold text-white">Headline Number</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Opens with the exact commercial shift: “Cost per lead fell to ₹38 across 500 phone-verified property leads in Madurai.”
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 backdrop-blur-sm">
            <span className="font-mono text-xs font-bold text-emerald-400">02. Situation</span>
            <h3 className="text-sm font-bold text-white">Prerequisites & Problem</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              3–4 concise sentences detailing the client’s real bottleneck before our engagement began.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 backdrop-blur-sm">
            <span className="font-mono text-xs font-bold text-emerald-400">03. What We Built</span>
            <h3 className="text-sm font-bold text-white">Concrete Actions</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Countable deliverables: code changes, landing pages, tracking pixels, and specific creative tests.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 backdrop-blur-sm">
            <span className="font-mono text-xs font-bold text-emerald-400">04. Named Quote</span>
            <h3 className="text-sm font-bold text-white">Verified Attribution</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Named client with verified role. If a client prefers privacy, we publish without a quote rather than invent an anonymous one.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 4 — CLIENT PRIVACY & PERMISSIONS PROTOCOL           */}
      {/* ========================================================= */}
      <section className="bg-white rounded-3xl border border-bm-line p-8 sm:p-12 shadow-sm space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-bm-navy bg-bm-wash-cool border border-bm-brand-soft/40 px-3 py-1 rounded-full uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-bm-navy" />
            <span>Strict Privacy Governance</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            Client Permissions & Verification Checklist
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">
            We never publish a client’s business name or private analytics without completing our 5-point authorization protocol:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-bm-wash-cool border border-bm-line-soft flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <span className="text-xs text-bm-ink font-semibold">Written permission to display business name</span>
          </div>

          <div className="p-4 rounded-2xl bg-bm-wash-cool border border-bm-line-soft flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <span className="text-xs text-bm-ink font-semibold">Written verification for all published numbers</span>
          </div>

          <div className="p-4 rounded-2xl bg-bm-wash-cool border border-bm-line-soft flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <span className="text-xs text-bm-ink font-semibold">Explicit client logo usage approval</span>
          </div>

          <div className="p-4 rounded-2xl bg-bm-wash-cool border border-bm-line-soft flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <span className="text-xs text-bm-ink font-semibold">Named quote signed off with verified title</span>
          </div>

          <div className="p-4 rounded-2xl bg-bm-wash-cool border border-bm-line-soft flex items-start gap-3 sm:col-span-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <span className="text-xs text-bm-ink font-semibold">Final case study draft sent to client for review before public publishing</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 5 — CLOSING CTA: DIRECT CLIENT INTRODUCTION         */}
      {/* ========================================================= */}
      <section className="bg-bm-navy-deep text-white p-8 sm:p-12 rounded-3xl space-y-6 border border-bm-brand-soft/20 text-center max-w-4xl mx-auto shadow-xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Want to talk to one of these clients before you decide?
          </h2>
          <p className="text-sm text-bm-brand-soft leading-relaxed">
            We will introduce you directly to a client in your industry. Message us on WhatsApp and ask to speak with an existing partner.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <WhatsAppCTA
            src="work-footer"
            intent="Hi BM TechX — I would like an introduction to an existing client in my industry before making a decision."
            label="Request Client Reference on WhatsApp"
            variant="primary"
            className="w-full sm:w-auto text-base py-4 px-8 justify-center shadow-lg"
          />
          {onOpenQuote && (
            <button
              onClick={() => onOpenQuote('Case Study Consultation')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 hover:bg-white/10 px-6 py-4 rounded-xl text-sm font-semibold transition-colors"
            >
              <span>Request Scoping Call</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default WorkPage;
