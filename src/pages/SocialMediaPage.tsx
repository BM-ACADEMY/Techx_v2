import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Share2,
  Check,
  TrendingUp,
  ChevronRight,
  ArrowRight,
  Camera,
  BarChart3,
} from 'lucide-react';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { ProofBlock } from '@/components/ProofBlock';
import { NotForBlock } from '@/components/NotForBlock';
import { FAQ } from '@/components/FAQ';

interface SocialMediaPageProps {
  onOpenQuote?: (service?: string) => void;
}

export function SocialMediaPage({ onOpenQuote }: SocialMediaPageProps) {
  // SEO Metadata & Schema Injection
  useEffect(() => {

    const schemaId = 'smm-service-schema';
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
              name: 'Services',
              item: 'https://bmtechx.in/services/',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Social Media Marketing',
              item: 'https://bmtechx.in/services/social-media-marketing/',
            },
          ],
        },
        {
          '@type': 'Service',
          name: 'Social Media Management in Pondicherry',
          serviceType: 'Social Media Marketing & Management',
          description:
            'Social media managed from Rs 6,999 a month. Content, posting, replies and reporting that leads with enquiries instead of reach and impressions.',
          provider: {
            '@type': 'Organization',
            name: 'BM TechX',
            url: 'https://bmtechx.in',
          },
          areaServed: [
            { '@type': 'City', name: 'Puducherry' },
            { '@type': 'City', name: 'Cuddalore' },
            { '@type': 'City', name: 'Villupuram' },
            { '@type': 'City', name: 'Chennai' },
            { '@type': 'State', name: 'Tamil Nadu' },
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Social Media Management Plans',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Starter SMM',
                  description: '1 platform, 12 posts, 2 reels/month, comment and DM replies.',
                },
                price: 6999,
                priceCurrency: 'INR',
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Growth SMM',
                  description: '2 platforms, 20 posts, 4 reels/month, 3x/week stories, monthly review call.',
                },
                price: 8999,
                priceCurrency: 'INR',
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Business SMM',
                  description: '3 platforms, 30 posts, 8 reels/month, daily stories, extended community management.',
                },
                price: 14999,
                priceCurrency: 'INR',
              },
            ],
          },
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

  const smmFaqs = [
    {
      q: 'How much does social media management cost in India?',
      a: 'Ours starts at ₹6,999 a month plus GST for one platform. What varies most between agencies is what is actually produced — always check how many unique posts, how many localized video reels, and who specifically handles inbound comments and direct messages.',
    },
    {
      q: 'Do you reply to comments and direct messages (DMs)?',
      a: 'Yes, during regular business hours across all plans. For after-hours inquiries, our WhatsApp Automation handles the initial instant response and routes to a human strategist the next morning.',
    },
    {
      q: 'Do you post in Tamil or English?',
      a: 'Mostly English with targeted Tamil hooks and captions, which data shows performs best across Tamil Nadu and Puducherry for commercial brands. If your customer base is strictly Tamil-first, we customize the linguistic mix accordingly.',
    },
    {
      q: 'Do you handle the photoshoot or video recording?',
      a: 'Yes, shoots are quoted separately based on requirement. Mobile smartphone video shoots and professional cinema camera shoots carry different rates, and shoots outside Puducherry are quoted on travel requirements.',
    },
    {
      q: 'Can I review and approve the content before it goes live?',
      a: 'Yes. A collaborative visual content calendar is shared in advance every single month for your sign-off before scheduling.',
    },
  ];

  const notForItems = [
    'If you need immediate customer inquiries in the next 30 days — organic social media builds audience trust over months. Targeted Meta Ads are far faster and produce leads within 24 hours; we will advise you honestly to pick ads instead.',
    'If you cannot supply authentic photos or let our team shoot on location — quality social presence demands genuine business material. We refuse to pad your feed with generic stock photos from Canva.',
    'If your primary goal is vanity follower-count growth — we will not buy fake followers or use follow-unfollow automation bots that destroy your account reach.',
    'If nobody on your team can approve content within 48 hours — approval bottlenecks stall content calendars and hurt algorithmic consistency.',
  ];

  const plansComparison = [
    { deliverable: 'Platforms Managed', starter: '1 Platform (e.g. Instagram)', growth: '2 Platforms (IG + FB)', business: '3 Platforms (IG + FB + LinkedIn)' },
    { deliverable: 'Posts Per Month', starter: '12 Posts', growth: '20 Posts', business: '30 Posts (Daily)' },
    { deliverable: 'Original Video Reels', starter: '2 Reels', growth: '4 Reels', business: '8 Reels' },
    { deliverable: 'Stories Shared', starter: 'Weekly', growth: '3× per week', business: 'Daily Stories' },
    { deliverable: 'Comment & DM Replies', starter: 'Business hours', growth: 'Business hours', business: 'Extended hours' },
    { deliverable: 'Content Calendar in Advance', starter: 'Yes', growth: 'Yes', business: 'Yes' },
    { deliverable: 'Monthly Performance Report', starter: 'Monthly PDF', growth: 'PDF + Review Call', business: 'PDF + Fortnightly Strategy Call' },
  ];

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
            <Link to="/services/" className="hover:text-bm-navy transition-colors">
              Services
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="font-semibold text-bm-navy-deep">Social Media Marketing</span>
          </li>
        </ol>
      </nav>

      {/* ========================================================= */}
      {/* BLOCK 1 — H1 + ANSWER FIRST                              */}
      {/* ========================================================= */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-bm-wash-cool border border-bm-brand-soft px-3.5 py-1.5 rounded-full text-xs font-bold text-bm-navy">
          <Share2 className="w-3.5 h-3.5 text-bm-orange" />
          <span>Inquiries Over Vanity Likes · Content, Reels & DM Replies</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-bm-navy-deep font-display tracking-tight">
          Social media management in Pondicherry
        </h1>

        <p className="text-base sm:text-xl text-bm-ink font-medium leading-relaxed max-w-3xl mx-auto bg-white border border-bm-line p-6 sm:p-8 rounded-3xl shadow-sm">
          Social media management starts at <strong className="text-bm-navy-deep font-extrabold">₹6,999 a month plus GST</strong>, with Growth at ₹8,999 and Business at ₹14,999. We plan the content, produce it, post it, reply to comments and messages, and report on customer inquiries — not on empty reach. We deliver this where a business asks for it; if what you actually need is leads next week, we’ll point you at{' '}
          <Link to="/services/meta-ads/" className="text-bm-accent-price font-bold hover:underline">
            paid ads →
          </Link>{' '}
          instead and explain why.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <WhatsAppCTA
            src="smm-hero"
            intent="Hi BM TechX — I'd like to consult regarding social media management for my brand."
            label="Inquire on WhatsApp"
            variant="primary"
            className="text-sm sm:text-base py-3.5 px-6 shadow-md"
          />
          <Link
            to="/pricing/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-white border border-bm-line hover:border-bm-brand px-5 py-3.5 rounded-xl text-bm-navy transition-colors shadow-sm"
          >
            <span>See all pricing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 2 — 3-TIER PRICING MATRIX                           */}
      {/* ========================================================= */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            Three Monthly Retainer Plans
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">
            All prices exclude 18% GST. 3-month minimum commitment. Original shoots quoted separately.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Starter Plan */}
          <div className="bg-white rounded-3xl border border-bm-line p-6 sm:p-8 flex flex-col justify-between shadow-sm space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-bm-ink-faint font-mono">Starter</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-bm-navy-deep">₹6,999</span>
                <span className="text-xs text-bm-ink-muted">/ month (+ GST)</span>
              </div>
              <p className="text-xs text-bm-ink-muted leading-relaxed">
                Consistent active baseline for single-platform brands needing clean visuals and prompt DM handling.
              </p>
              <ul className="space-y-2.5 text-xs text-bm-ink pt-3 border-t border-bm-line-soft">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 1 Primary Platform (Instagram or FB)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 12 Custom Posts per month</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 2 Short-Form Video Reels</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Weekly Story Updates</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Business hours comment & DM replies</li>
              </ul>
            </div>
            <WhatsAppCTA
              src="smm-starter"
              intent="I want the Starter SMM plan (₹6,999/mo)"
              label="Choose Starter Plan"
              className="w-full text-xs py-3 justify-center"
            />
          </div>

          {/* Growth Plan (Recommended) */}
          <div className="bg-white rounded-3xl border-2 border-bm-navy p-6 sm:p-8 flex flex-col justify-between shadow-xl relative space-y-6 scale-[1.02] z-10">
            <div className="absolute -top-3.5 left-6 bg-bm-navy text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Most Popular
            </div>
            <div className="space-y-4 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-bm-orange font-mono">Growth</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-bm-navy-deep">₹8,999</span>
                <span className="text-xs text-bm-ink-muted">/ month (+ GST)</span>
              </div>
              <p className="text-xs text-bm-ink-muted leading-relaxed">
                Active multi-channel presence with regular reels and interactive stories to generate customer DMs.
              </p>
              <ul className="space-y-2.5 text-xs text-bm-ink pt-3 border-t border-bm-line-soft">
                <li className="flex items-center gap-2 font-semibold text-emerald-800"><Check className="w-4 h-4 text-emerald-600" /> 2 Platforms (Instagram + Facebook)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 20 Custom Posts per month</li>
                <li className="flex items-center gap-2 font-semibold text-emerald-800"><Check className="w-4 h-4 text-emerald-600" /> 4 Short-Form Video Reels</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 3× per week Interactive Stories</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Monthly Report + 30-min strategy call</li>
              </ul>
            </div>
            <WhatsAppCTA
              src="smm-growth"
              intent="I want the Growth SMM plan (₹8,999/mo)"
              label="Choose Growth Plan"
              variant="primary"
              className="w-full text-xs py-3 justify-center shadow-md"
            />
          </div>

          {/* Business Tier */}
          <div className="bg-white rounded-3xl border border-bm-line p-6 sm:p-8 flex flex-col justify-between shadow-sm space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-bm-ink-faint font-mono">Business Tier</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-bm-navy-deep">₹14,999</span>
                <span className="text-xs text-bm-ink-muted">/ month (+ GST)</span>
              </div>
              <p className="text-xs text-bm-ink-muted leading-relaxed">
                Daily multi-channel content engine with extended community management and fortnightly strategy calls.
              </p>
              <ul className="space-y-2.5 text-xs text-bm-ink pt-3 border-t border-bm-line-soft">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 3 Platforms (IG + FB + LinkedIn/YouTube)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 30 Posts (Daily Publishing)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 8 Video Reels per month</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Daily Active Stories</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Extended hours DM response</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Monthly Report + Fortnightly Strategy Calls</li>
              </ul>
            </div>
            <WhatsAppCTA
              src="smm-business"
              intent="I want the Business SMM plan (₹14,999/mo)"
              label="Choose Business Plan"
              className="w-full text-xs py-3 justify-center"
            />
          </div>
        </div>

        {/* Detailed Deliverables Table */}
        <div className="bg-white rounded-3xl border border-bm-line p-6 sm:p-8 max-w-5xl mx-auto shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-bm-navy-deep font-display">
            Plan Comparison & Specifics
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-bm-wash-cool text-bm-navy-deep font-bold border-b border-bm-line-soft">
                <tr>
                  <th className="py-3 px-4 font-display">Deliverable</th>
                  <th className="py-3 px-4">Starter (₹6,999)</th>
                  <th className="py-3 px-4 text-bm-navy font-extrabold">Growth (₹8,999)</th>
                  <th className="py-3 px-4">Business (₹14,999)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bm-line-soft">
                {plansComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-bm-wash-cool/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-bm-navy-deep">{row.deliverable}</td>
                    <td className="py-3.5 px-4 text-bm-ink-muted">{row.starter}</td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-800">{row.growth}</td>
                    <td className="py-3.5 px-4 font-semibold text-bm-navy">{row.business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-bm-wash-cool p-4 rounded-2xl text-xs text-bm-ink-muted flex items-start gap-2.5">
            <Camera className="w-4 h-4 text-bm-navy shrink-0 mt-0.5" />
            <p>
              <strong>Photography & Video Shoots:</strong> Quoted separately. Smartphone content shoots and high-end cinema camera shoots are priced differently. Shoots outside Puducherry are quoted on travel requirements.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 3 — WHAT WE REPORT, AND WHAT WE DON'T               */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-br from-bm-navy-deep via-bm-brand to-[#08182b] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-bm-brand-soft/20 space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Reporting Transparency · Leads Over Likes</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            What We Report — and What We Deliberately Don’t
          </h2>

          <p className="text-sm sm:text-base text-bm-brand-soft leading-relaxed">
            Most social media reports open with impressions, reach, and follower count. Those numbers go up whether or not your actual business does.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-3 backdrop-blur-sm">
            <span className="text-xs uppercase font-extrabold tracking-wider text-rose-300 font-mono">Page 1 Priority</span>
            <h3 className="text-xl font-bold text-white font-display">How Many People Messaged You</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Every monthly report opens with real intent metrics: <strong>inbound DMs, WhatsApp clicks, comments asking for price/location, saves, and shares</strong>. These are the metrics that signal real buying consideration.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-3 backdrop-blur-sm">
            <span className="text-xs uppercase font-extrabold tracking-wider text-bm-brand-soft font-mono">Accountability</span>
            <h3 className="text-xl font-bold text-white font-display">We Report Bad Months Honestly</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              If an experimental creative failed or reach dipped, we state it openly in the report, explain what algorithm factor caused it, and define the corrective action for next month. You will hear it from us first.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 3b — PROOF SYSTEM (SLOTS FROM PROOF.JSON)           */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-bm-navy bg-bm-wash-cool border border-bm-brand-soft/40 px-3 py-1 rounded-full uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-bm-orange" />
            <span>First-Party Proof</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            What We Do With Our Own Property Brand's Page
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted max-w-2xl">
            These are real numbers from our own brand, Namma Pondy Properties. First-party proof presented honestly as first-party proof.
          </p>
        </div>

        {/* Proof Slots from proof.json */}
        <div className="space-y-4">
          <ProofBlock id="smm-strip-own" />
          <ProofBlock id="smm-samples" />
          <ProofBlock id="smm-case-1" />
          <ProofBlock id="smm-testimonial-1" />
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 4 — WHO THIS IS NOT FOR (DISQUALIFIERS)             */}
      {/* ========================================================= */}
      <section>
        <NotForBlock items={notForItems} />
      </section>

      {/* ========================================================= */}
      {/* BLOCK 5 — FAQ ACCORDION (WITH FAQPAGE SCHEMA)             */}
      {/* ========================================================= */}
      <section>
        <FAQ
          items={smmFaqs}
          title="Social Media Marketing FAQ"
          subtitle="Honest answers regarding pricing, languages, photoshoots, DM responses, and content approval workflows."
        />
      </section>

      {/* ========================================================= */}
      {/* BLOCK 6 — CLOSING CTA                                     */}
      {/* ========================================================= */}
      <section className="bg-bm-navy-deep text-white p-8 sm:p-12 rounded-3xl space-y-6 border border-bm-brand-soft/20 text-center max-w-4xl mx-auto shadow-xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Send us your page. We’ll tell you honestly whether social is your best next spend.
          </h2>
          <p className="text-sm text-bm-brand-soft leading-relaxed">
            Message your Instagram or Facebook profile link on WhatsApp. We will review your recent content and tell you whether organic social or paid ads will produce faster commercial results.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <WhatsAppCTA
            src="smm-footer"
            intent="Hi BM TechX — Here is my social media page: . Is social media my best next spend?"
            label="Review My Social Page on WhatsApp"
            variant="primary"
            className="w-full sm:w-auto text-base py-4 px-8 justify-center shadow-lg"
          />
          {onOpenQuote && (
            <button
              onClick={() => onOpenQuote('Social Media Growth Plan (₹8,999/mo)')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 hover:bg-white/10 px-6 py-4 rounded-xl text-sm font-semibold transition-colors"
            >
              <span>Request Social Audit</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default SocialMediaPage;
