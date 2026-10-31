import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  AlertCircle,
  CreditCard,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { ProofBlock } from '@/components/ProofBlock';
import { NotForBlock } from '@/components/NotForBlock';
import { FAQ } from '@/components/FAQ';

interface MetaAdsPageProps {
  onOpenQuote?: (service?: string) => void;
}

export function MetaAdsPage({ onOpenQuote }: MetaAdsPageProps) {
  // SEO Metadata & Schema Injection
  useEffect(() => {

    const schemaId = 'meta-ads-schema';
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
              name: 'Meta Ads',
              item: 'https://bmtechx.in/services/meta-ads/',
            },
          ],
        },
        {
          '@type': 'Service',
          name: 'Facebook & Meta Ads Management in Pondicherry',
          serviceType: 'Performance Marketing & Paid Social',
          description:
            'Meta ads managed for Rs 4,999 a month plus your ad spend. Leads delivered to WhatsApp. Real cost-per-lead data from campaigns across Tamil Nadu.',
          provider: {
            '@type': 'Organization',
            name: 'BM TechX',
            url: 'https://bmtechx.in',
          },
          areaServed: [
            { '@type': 'City', name: 'Puducherry' },
            { '@type': 'City', name: 'Cuddalore' },
            { '@type': 'City', name: 'Villupuram' },
            { '@type': 'City', name: 'Madurai' },
            { '@type': 'City', name: 'Trichy' },
            { '@type': 'City', name: 'Namakkal' },
            { '@type': 'State', name: 'Tamil Nadu' },
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Meta Ads Management Plans',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Meta Ads Management',
                  description:
                    'Monthly performance advertising management with creative direction, pixel setup, and real-time WhatsApp lead delivery.',
                },
                price: 4999,
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

  const metaAdsFaqs = [
    {
      q: 'How much does Facebook ads management cost in India?',
      a: 'Our management fee is a flat ₹4,999 a month plus 18% GST. Ad spend is separate, paid by you directly to Meta, typically ₹10,000–₹15,000 a month minimum to be effective. Agencies charging a percentage markup on ad spend have an incentive to push you to spend more; we charge a flat fee so our advice remains unbiased.',
    },
    {
      q: 'Whose ad account is it?',
      a: '100% yours. We request partner access to your Meta Business Manager. If we ever part ways, you retain full ownership of the account, the Meta Pixel data, custom audiences, and all historical campaign learnings.',
    },
    {
      q: 'How fast do leads arrive?',
      a: 'Usually within hours of a campaign being approved and going live. Whether they are highly qualified buyers depends on targeting and creative refinement, which is what the first two weeks of testing are dedicated to.',
    },
    {
      q: 'Do you make the videos and images?',
      a: 'We provide creative direction and copywriting (what to shoot and what to say). Video shoots on location are quoted separately based on requirement — mobile shoots and professional cinema camera shoots carry different rates, and shoots outside Puducherry are quoted on travel requirements.',
    },
    {
      q: 'Should I do Meta Ads or SEO first?',
      a: 'If you need inquiries and customer calls this month, Meta Ads is the fastest route. If you are building an organic digital asset for the next three years, SEO is the compounder. With a limited budget under ₹25,000/month, doing one properly beats splitting budget poorly across both.',
    },
  ];

  const notForItems = [
    'If your monthly ad budget is under ₹10,000 — Meta’s machine learning algorithm will not receive enough conversion data to optimize. Build an organic audience first.',
    'If you want the agency to pay ad spend from its own bank account — we never touch your ad spend or take custody of ad funds. It is billed directly by Meta to your credit/debit card.',
    'If nobody on your team can answer incoming inquiries within one hour — paid ads will generate inquiries that turn ice-cold while sitting in your inbox. Fix answering availability first.',
    'If you expect a contractual guarantee of closed product sales — we commit to running the campaign properly, optimizing CPL, and verifying inquiries. Converting an interested lead on the phone is your sales team’s role.',
  ];

  const trapsList = [
    {
      num: '01',
      title: 'Boosted a Post Instead of Running a Lead Campaign',
      desc: 'Boosting a post tells Meta to find users who like, double-tap, and comment — people who rarely buy anything. A dedicated lead campaign optimizes strictly for customer inquiries and phone numbers. Different objective, completely different business outcome.',
    },
    {
      num: '02',
      title: 'Changed the Budget Every Two Days',
      desc: 'Every time you adjust budgets drastically or pause ads randomly, Meta resets its learning phase. Algorithmic stabilization requires patience and data discipline.',
    },
    {
      num: '03',
      title: 'Broken or Missing Meta Pixel / Conversions API',
      desc: 'Without server-side conversion tracking feeding back to Meta, the algorithm is blindly guessing who to show your ad to next. We configure both the browser Pixel and Conversions API.',
    },
    {
      num: '04',
      title: 'Leads Came In and Nobody Called Them Fast Enough',
      desc: 'The single most common reason ad campaigns fail. A lead called within minutes is far more likely to convert than one called the next day. If your team cannot answer fast, our WhatsApp automation is the fix, not more ad budget.',
    },
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
            <span className="font-semibold text-bm-navy-deep">Meta Ads</span>
          </li>
        </ol>
      </nav>

      {/* ========================================================= */}
      {/* BLOCK 1 — H1 + ANSWER FIRST                              */}
      {/* ========================================================= */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-bm-wash-cool border border-bm-brand-soft px-3.5 py-1.5 rounded-full text-xs font-bold text-bm-navy">
          <Target className="w-3.5 h-3.5 text-bm-orange" />
          <span>Real-Time Leads to WhatsApp · Zero Agency Ad Spend Markup</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-bm-navy-deep font-display tracking-tight">
          Facebook and Instagram ads agency in Pondicherry that brings enquiries
        </h1>

        <p className="text-base sm:text-xl text-bm-ink font-medium leading-relaxed max-w-3xl mx-auto bg-white border border-bm-line p-6 sm:p-8 rounded-3xl shadow-sm">
          We manage Meta ads for <strong className="text-bm-navy-deep font-extrabold">₹4,999 a month plus GST, with your ad spend billed separately and paid directly by you</strong>. Leads arrive on your WhatsApp as they come in, not in an unread spreadsheet at the end of the month. We’ve run lead campaigns for residential property across Madurai, Trichy and Namakkal against a target cost per lead of under ₹40 — and we’ll tell you before you start whether your sector can realistically hit a number like that.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <WhatsAppCTA
            src="meta-ads-hero"
            intent="Hi BM TechX — I'd like to consult regarding Meta/Facebook ads for my business."
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
      {/* BLOCK 2 — HOW THE MONEY WORKS (FEE VS AD SPEND)          */}
      {/* ========================================================= */}
      <section className="bg-white rounded-3xl border border-bm-line p-8 sm:p-12 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold text-emerald-800">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Complete Financial Transparency</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            How the Money Works
          </h2>

          <p className="text-sm sm:text-base text-bm-ink leading-relaxed">
            Ad-spend confusion is where most agency relationships in this industry go sour. We keep the two amounts completely separate from day one:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-bm-wash-cool rounded-2xl p-6 sm:p-8 border border-bm-brand-soft/50 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-bm-navy font-mono">Amount 1</span>
              <h3 className="text-xl font-bold text-bm-navy-deep font-display">
                Our Management Fee
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-bm-navy-deep">₹4,999</span>
                <span className="text-xs text-bm-ink-muted">/ month (+ 18% GST)</span>
              </div>
              <p className="text-xs text-bm-ink leading-relaxed">
                Covers all our strategic and technical work: campaign setup, creative direction, copy, audience targeting, pixel configuration, daily ad monitoring, WhatsApp lead routing, and honest reporting.
              </p>
            </div>
            <div className="pt-4 border-t border-bm-line-soft text-[11px] text-bm-ink-faint">
              Billed monthly by Afra Ventures Private Limited.
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-bm-line space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">Amount 2</span>
              <h3 className="text-xl font-bold text-bm-navy-deep font-display">
                Your Direct Ad Spend
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-emerald-800">Paid Directly to Meta</span>
              </div>
              <p className="text-xs text-bm-ink-muted leading-relaxed">
                Billed directly to your own credit/debit card inside your own Meta Ads Manager. We never touch your ad budget and we never take a percentage markup. You can log into Meta at any time and verify every single rupee spent.
              </p>
            </div>
            <div className="pt-4 border-t border-bm-line-soft text-[11px] text-bm-ink-faint">
              Typical starting ad budget: ₹10,000–₹15,000/month (₹300–₹500/day).
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>How much ad spend do you really need?</strong> Realistically at least ₹10,000 to ₹15,000 a month to generate statistically significant data. Below approximately ₹300 a day, Meta does not receive enough conversion events to optimize its machine learning, and you end up buying low-intent clicks. If your ad budget is too thin, we will say so honestly before taking your fee.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 3 — WHAT WE ACTUALLY DO (FULL DELIVERABLES)         */}
      {/* ========================================================= */}
      <section className="bg-white rounded-3xl border border-bm-line p-8 sm:p-12 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            What We Actually Deliver
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">
            Here is the complete operational checklist executed for your brand every month:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-bm-wash-cool border border-bm-line-soft space-y-2">
            <span className="font-mono text-xs font-bold text-bm-navy">01. Setup & Tracking</span>
            <h3 className="text-base font-bold text-bm-navy-deep">Pixel & Conversions API</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              Full Meta Pixel and server-side Conversions API integration to ensure iOS privacy updates do not blind your campaign tracking.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-bm-wash-cool border border-bm-line-soft space-y-2">
            <span className="font-mono text-xs font-bold text-bm-navy">02. Creative Strategy</span>
            <h3 className="text-base font-bold text-bm-navy-deep">Creative Direction</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              Guidance on what to shoot and high-converting ad copy. Roughly 90% English with targeted Tamil hooks — proven to perform best in Tamil Nadu.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-bm-wash-cool border border-bm-line-soft space-y-2">
            <span className="font-mono text-xs font-bold text-bm-navy">03. Machine Learning</span>
            <h3 className="text-base font-bold text-bm-navy-deep">Continuous A/B Testing</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              Testing creative variants, headlines, and lookalike audiences. We kill unprofitable ads quickly and scale top-converting angles.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-bm-wash-cool border border-bm-line-soft space-y-2">
            <span className="font-mono text-xs font-bold text-bm-navy">04. Real-Time Routing</span>
            <h3 className="text-base font-bold text-bm-navy-deep">Instant WhatsApp Delivery</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              Leads are routed directly to your team’s WhatsApp within seconds of form submission. A lead contacted within minutes is far more likely to convert.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-bm-wash-cool border border-bm-line-soft space-y-2">
            <span className="font-mono text-xs font-bold text-bm-navy">05. Quality Control</span>
            <h3 className="text-base font-bold text-bm-navy-deep">Lead Phone Verification</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              For high-volume lead campaigns, we implement phone/OTP verification before lead handover so your sales team never wastes time on fake numbers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-bm-wash-cool border border-bm-line-soft space-y-2">
            <span className="font-mono text-xs font-bold text-bm-navy">06. Performance Truth</span>
            <h3 className="text-base font-bold text-bm-navy-deep">CPL & Pipeline Reporting</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              Transparent reporting on Cost Per Lead (CPL), Cost Per Qualified Lead (CPQL), and what creative shifts will be tested next.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 4 — PROOF SYSTEM (REAL NUMBERS FROM REAL CAMPAIGNS) */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Campaign Results</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            Real Numbers from Real Campaigns
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted max-w-2xl">
            Cost per lead varies significantly by sector — real estate, education, healthcare, and retail behave differently. Here is verified delivery from residential campaigns in Tamil Nadu.
          </p>
        </div>

        {/* Proof Slots from proof.json (ads-strip is FILLED) */}
        <div className="space-y-4">
          <ProofBlock id="ads-strip" />
          <ProofBlock id="ads-case-realestate" />
          <ProofBlock id="ads-cpl-table" />
          <ProofBlock id="ads-sample-delivery" />
          <ProofBlock id="ads-testimonial-1" />
        </div>

        <div className="p-5 rounded-2xl bg-white border border-bm-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-bm-navy-deep">
              Want to see the multi-district real estate case study?
            </h3>
            <p className="text-xs text-bm-ink-muted mt-0.5">
              Review how 500 phone-verified residential plot leads were generated across Madurai, Trichy, and Namakkal.
            </p>
          </div>
          <Link
            to="/industries/real-estate/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-bm-navy hover:text-bm-orange whitespace-nowrap"
          >
            <span>Read Real Estate Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 5 — WHY ADS STOP WORKING (THE 4 TRAPS)               */}
      {/* ========================================================= */}
      <section className="bg-bm-navy-deep text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-bm-brand-soft/20 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-300 font-mono">
            Diagnostic Guide
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Why Facebook Ads Usually Stop Working
          </h2>
          <p className="text-sm sm:text-base text-bm-brand-soft leading-relaxed">
            Most business owners who tried running Facebook ads and gave up ran into one of these four operational traps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trapsList.map((trap, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2 backdrop-blur-sm">
              <span className="font-mono text-xs font-bold text-rose-400">{trap.num}.</span>
              <h3 className="text-base font-bold text-white font-display">{trap.title}</h3>
              <p className="text-xs text-gray-300 leading-relaxed">{trap.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/10 p-5 rounded-2xl border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Losing leads because nobody answers fast enough?</h4>
            <p className="text-xs text-bm-brand-soft">
              Our automated WhatsApp LeadOS answers within 60 seconds and books qualified calls on autopilot.
            </p>
          </div>
          <Link
            to="/services/whatsapp-automation/"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 whitespace-nowrap"
          >
            <span>Explore WhatsApp Automation →</span>
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 6 — WHO THIS IS NOT FOR (DISQUALIFIERS)             */}
      {/* ========================================================= */}
      <section>
        <NotForBlock items={notForItems} />
      </section>

      {/* ========================================================= */}
      {/* BLOCK 7 — FAQ ACCORDION (WITH FAQPAGE SCHEMA)             */}
      {/* ========================================================= */}
      <section>
        <FAQ
          items={metaAdsFaqs}
          title="Meta & Facebook Ads FAQ"
          subtitle="Honest answers regarding ad spend separation, account ownership, creative shoots, and lead arrival speed."
        />
      </section>

      {/* ========================================================= */}
      {/* BLOCK 8 — CLOSING CTA                                     */}
      {/* ========================================================= */}
      <section className="bg-bm-navy-deep text-white p-8 sm:p-12 rounded-3xl space-y-6 border border-bm-brand-soft/20 text-center max-w-4xl mx-auto shadow-xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Tell us your sector and budget. We’ll tell you the cost per lead to expect.
          </h2>
          <p className="text-sm text-bm-brand-soft leading-relaxed">
            Message us on WhatsApp with your industry and target city. We will give you realistic CPL expectations based on real campaign data in Tamil Nadu.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <WhatsAppCTA
            src="meta-ads-footer"
            intent="Hi BM TechX — My business sector is: , and my target monthly ad budget is: . What CPL should I expect?"
            label="Inquire on WhatsApp"
            variant="primary"
            className="w-full sm:w-auto text-base py-4 px-8 justify-center shadow-lg"
          />
          {onOpenQuote && (
            <button
              onClick={() => onOpenQuote('Meta Ads Management (₹4,999/mo)')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 hover:bg-white/10 px-6 py-4 rounded-xl text-sm font-semibold transition-colors"
            >
              <span>Request Ads Proposal</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default MetaAdsPage;
