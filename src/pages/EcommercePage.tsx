import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Check,
  X,
  RefreshCw,
  ChevronRight,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Package,
} from 'lucide-react';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { ProofBlock } from '@/components/ProofBlock';
import { NotForBlock } from '@/components/NotForBlock';
import { FAQ } from '@/components/FAQ';

interface EcommercePageProps {
  onOpenQuote?: (service?: string) => void;
}

export function EcommercePage({ onOpenQuote }: EcommercePageProps) {
  // SEO Metadata & Schema Injection
  useEffect(() => {
    document.title = 'Ecommerce Website in Pondicherry | Rs 9,999 Store';

    const schemaId = 'ecom-schema';
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
              name: 'Ecommerce Website',
              item: 'https://bmtechx.in/services/ecommerce-website/',
            },
          ],
        },
        {
          '@type': 'Service',
          name: 'Online Store Development in Pondicherry',
          serviceType: 'Ecommerce Web Development',
          description:
            'Sell online for Rs 9,999 — unlimited products, payment gateway, no yearly renewal fee. Live in 7-10 working days.',
          provider: {
            '@type': 'Organization',
            name: 'BM TechX',
            url: 'https://bmtechx.in',
          },
          areaServed: [
            { '@type': 'City', name: 'Puducherry' },
            { '@type': 'City', name: 'Cuddalore' },
            { '@type': 'City', name: 'Villupuram' },
            { '@type': 'State', name: 'Tamil Nadu' },
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Online Store Plan',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Complete Online Store',
                  description:
                    'Independent custom ecommerce website with Razorpay payment gateway, unlimited products, and zero yearly software renewal fee.',
                },
                price: 9999,
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

  const ecomFaqs = [
    {
      q: 'Is ₹9,999 really the full price?',
      a: 'For the store as described on this page, yes, plus 18% GST. The external operational costs we don’t charge — payment gateway transaction percentage (~2%), couriers, or ad spend — are listed transparently in our table so you can budget honestly.',
    },
    {
      q: 'Really no yearly renewal fee?',
      a: 'Correct. The ₹9,999 online store has no yearly platform subscription or software renewal fee. Our ₹2,999 and ₹4,999 static websites renew at ₹1,999 a year for domain and server — this online store does not bill you a software renewal.',
    },
    {
      q: 'Which payment gateway do you use?',
      a: 'Razorpay, PayU, or Cashfree — whichever approves your business fastest. The account is set up 100% in your business name and payments go straight to your bank account. We never sit between you and your customer revenue.',
    },
    {
      q: 'How many products can I add?',
      a: 'Unlimited. We upload your first 20 products as part of the initial onboarding and build; after that, you add products yourself through the clean dashboard. We show you exactly how in a 20-minute walkthrough call.',
    },
    {
      q: 'Can I sell in Tamil Nadu only, or all over India?',
      a: 'Anywhere you can ship. You configure shipping pin codes, regional delivery zones, and tiered shipping charges directly from your dashboard.',
    },
    {
      q: 'What about GST on my online sales?',
      a: 'That is between you and your accountant, depending on your business turnover and category. The store comes configured to capture GST numbers and output standard compliant tax invoices.',
    },
  ];

  const notForItems = [
    'If you have fewer than 5 products and an active Instagram — you may not need a full store yet. A single-page website at ₹2,999 with a WhatsApp direct checkout button often converts better for micro-brands.',
    'If you need a multi-seller marketplace with commission cuts and independent vendor dashboards (Amazon / Flipkart clone) — that is an enterprise custom portal, quoted separately.',
    'If you need real-time automatic inventory synchronization with a physical shop’s legacy desktop billing software (e.g. Tally or Marg) — that requires custom ERP middleware.',
    'If nobody knows your brand or product yet — building a store is not the first problem to solve. You need brand discovery and trust before checkout software.',
  ];

  const totalCostBreakdown = [
    {
      item: 'The Online Store',
      chargedBy: 'BM TechX',
      cost: '₹9,999 one-time (+ 18% GST)',
      note: 'Complete custom store, payment gateway, WhatsApp order alerts',
    },
    {
      item: 'Store Software Renewal (Year 2+)',
      chargedBy: 'BM TechX',
      cost: '₹0 / year',
      note: 'Zero software licence renewal fee. Ever.',
    },
    {
      item: 'Payment Gateway Fee',
      chargedBy: 'Razorpay / Cashfree',
      cost: '~2% + GST per transaction',
      note: 'Direct transaction fee charged by the banking gateway',
    },
    {
      item: 'Product Photography',
      chargedBy: 'You, or BM TechX Shoot',
      cost: 'Quoted on requirement',
      note: 'Clear photos on white background or on-location shoot',
    },
    {
      item: 'Delivery & Shipping',
      chargedBy: 'Shiprocket / India Post',
      cost: 'Per shipment (approx ₹40–₹90)',
      note: 'Paid to your selected logistics courier partner',
    },
    {
      item: 'Customer Acquisition / Ads',
      chargedBy: 'Meta / Google Ads',
      cost: 'From ₹4,999/mo (Optional)',
      note: 'Only needed when expanding beyond existing WhatsApp/Instagram buyers',
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
            <span className="font-semibold text-bm-navy-deep">Ecommerce Website</span>
          </li>
        </ol>
      </nav>

      {/* ========================================================= */}
      {/* BLOCK 1 — H1 + ANSWER FIRST                              */}
      {/* ========================================================= */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-bm-wash-cool border border-bm-brand-soft px-3.5 py-1.5 rounded-full text-xs font-bold text-bm-navy">
          <ShoppingCart className="w-3.5 h-3.5 text-bm-orange" />
          <span>Independent D2C Store · Unlimited Products · Zero Monthly Rent</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-bm-navy-deep font-display tracking-tight">
          Online store development in Pondicherry
        </h1>

        <p className="text-base sm:text-xl text-bm-ink font-medium leading-relaxed max-w-3xl mx-auto bg-white border border-bm-line p-6 sm:p-8 rounded-3xl shadow-sm">
          An online store from BM TechX costs <strong className="text-bm-navy-deep font-extrabold">₹9,999 plus GST, one time, with unlimited products and no yearly renewal fee</strong>. It goes live in 7–10 working days with a payment gateway connected, order management dashboard, and instant WhatsApp alerts when an order comes in. Most platforms charge you every month forever; this one you pay for once.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <WhatsAppCTA
            src="offer-9999"
            intent="Hi BM TechX — I want to build the ₹9,999 online store for my products."
            label="Order ₹9,999 Store on WhatsApp"
            variant="primary"
            className="text-sm sm:text-base py-3.5 px-6 shadow-md"
          />
          <Link
            to="/pricing/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-white border border-bm-line hover:border-bm-brand px-5 py-3.5 rounded-xl text-bm-navy transition-colors shadow-sm"
          >
            <span>Compare all prices</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 2 — THE "NO-RENEWAL" POINT (MAJOR DIFFERENTIATOR)   */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-br from-bm-navy-deep via-bm-brand to-[#08182b] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-bm-brand-soft/20 space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>The Single Strongest Differentiator</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Selling Online Shouldn’t Mean a Monthly Bill That Never Ends
          </h2>

          <p className="text-sm sm:text-base text-bm-brand-soft leading-relaxed">
            Most platforms charge you forever: $39/month for the base plan, $19/month for an upsell app, $15/month for discount coupons, and $29/month for order tracking. Over three years, you end up spending over <span className="text-white font-bold underline decoration-amber-400">₹1,50,000</span> just to keep your store online.
          </p>
        </div>

        {/* Big Impact Callout Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 backdrop-blur-sm">
            <span className="text-xs uppercase font-extrabold tracking-wider text-rose-300">The Traditional Platform Trap</span>
            <div className="text-3xl font-extrabold text-white font-display">₹38,000+ / Year</div>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center gap-2"><X className="w-4 h-4 text-rose-400" /> Monthly recurring Shopify/SaaS app rent</li>
              <li className="flex items-center gap-2"><X className="w-4 h-4 text-rose-400" /> Additional fees for currency and shipping plugins</li>
              <li className="flex items-center gap-2"><X className="w-4 h-4 text-rose-400" /> Commission percentage deducted on third-party gateways</li>
              <li className="flex items-center gap-2"><X className="w-4 h-4 text-rose-400" /> Missed payments freeze your entire business</li>
            </ul>
          </div>

          <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 space-y-4 relative shadow-lg">
            <div className="absolute top-4 right-4 bg-emerald-500 text-bm-navy-deep text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
              Zero Renewal
            </div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300">BM TechX Architecture</span>
            <div className="text-3xl font-extrabold text-white font-display">₹9,999 One-Time</div>
            <ul className="space-y-2 text-xs text-emerald-100">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> ₹0 yearly software licensing fees</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited products & categories included</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 0% agency cut on your sales volume</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 100% independent ownership of customer data</li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-bm-brand-soft leading-relaxed max-w-3xl">
          *Note: You will still pay your payment gateway their standard transaction percentage (~2% per swipe) — everyone does, and no ethical agency can remove banking interchange fees. But the store itself never bills you again.
        </p>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 3 — WHAT'S INCLUDED VS NOT INCLUDED                 */}
      {/* ========================================================= */}
      <section className="bg-white rounded-3xl border border-bm-line p-8 sm:p-12 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            Inclusions vs. Honest Exclusions
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">
            We put exactly what is inside the ₹9,999 package and what is not, so you never get caught by surprise scope creep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Included Card */}
          <div className="bg-bm-wash-cool rounded-2xl p-6 sm:p-7 border border-bm-brand-soft/40 space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <Check className="w-5 h-5" />
              <span>What is 100% Included for ₹9,999:</span>
            </div>
            <ul className="space-y-2.5 text-xs text-bm-ink">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Unlimited products and collections:</strong> Upload as many items as you want.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Payment gateway integration:</strong> Razorpay, Cashfree, or UPI QR codes.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Owner’s order management dashboard:</strong> Manage orders, shipping statuses, and customer addresses from your phone.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Instant WhatsApp order notifications:</strong> Alerts sent straight to your delivery team when a customer pays.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>First 20 products catalog entry:</strong> We upload and format your initial batch of items for you.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Mobile-first fast checkout:</strong> Tested on real Android devices over mobile data.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Domain & SSL:</strong> Domain registered in your business name with full ownership.</span>
              </li>
            </ul>
          </div>

          {/* Not Included Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-bm-line space-y-4">
            <div className="flex items-center gap-2 text-bm-accent-price-text font-bold text-sm">
              <X className="w-5 h-5 text-bm-accent-price" />
              <span>What is NOT Included (Billed Separately):</span>
            </div>
            <ul className="space-y-2.5 text-xs text-bm-ink-muted">
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-bm-accent-price mt-0.5 shrink-0" />
                <span><strong>Product photography shoots:</strong> You provide high-res photos, or book our commercial shoot team separately.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-bm-accent-price mt-0.5 shrink-0" />
                <span><strong>Data entry beyond 20 products:</strong> We train you to add products yourself in 20 minutes, or quote batch catalog entry.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-bm-accent-price mt-0.5 shrink-0" />
                <span><strong>Paid advertising spend:</strong> Ad budget for Meta or Google is paid directly by you to the ad platforms.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-bm-accent-price mt-0.5 shrink-0" />
                <span><strong>Logistics / courier courier accounts:</strong> You contract directly with your preferred courier (e.g. Shiprocket or India Post).</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-bm-accent-price mt-0.5 shrink-0" />
                <span><strong>GST filing or corporate bookkeeping:</strong> The store generates invoices, but your tax filings are handled by your CA.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-2">
          <span className="font-mono text-xs font-bold text-bm-navy bg-bm-wash-cool border border-bm-brand-soft/50 px-4 py-2 rounded-xl inline-block">
            ₹9,999 + GST · Turnaround: 7–10 Working Days · Zero Annual Platform Fee
          </span>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 4 — WHAT IT ACTUALLY COSTS TO SELL ONLINE           */}
      {/* ========================================================= */}
      <section className="bg-white rounded-3xl border border-bm-line p-8 sm:p-12 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold text-amber-900">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Honest Budget Planning</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            What It Actually Costs to Sell Online
          </h2>

          <p className="text-sm sm:text-base text-bm-ink leading-relaxed">
            The store build is ₹9,999. Here is everything else you should budget for in the real world, so there are never awkward surprises down the road:
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-bm-line-soft">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-bm-wash-cool text-bm-navy-deep font-bold border-b border-bm-line-soft">
              <tr>
                <th className="py-3 px-4 font-display">Line Item</th>
                <th className="py-3 px-4">Who Charges It</th>
                <th className="py-3 px-4 font-display">Typical Cost</th>
                <th className="py-3 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bm-line-soft">
              {totalCostBreakdown.map((row, idx) => (
                <tr key={idx} className="hover:bg-bm-wash-cool/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-bm-navy-deep">{row.item}</td>
                  <td className="py-3.5 px-4 text-bm-ink-muted">{row.chargedBy}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-bm-navy">{row.cost}</td>
                  <td className="py-3.5 px-4 text-xs text-bm-ink-faint">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Brutal Honesty Callout */}
        <div className="p-6 rounded-2xl bg-bm-wash-warm border border-bm-wash-warm-line space-y-3">
          <h3 className="text-sm font-bold text-bm-navy-deep flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-bm-accent-price" />
            The Golden Rule: A Store With No Traffic Makes No Sales
          </h3>
          <p className="text-xs sm:text-sm text-bm-ink leading-relaxed">
            If your total budget right now is ₹9,999, here is our honest advice: build the store, sell to your existing WhatsApp contacts and Instagram audience first, and come back for paid advertising once profits start coming in. We would rather give you that honest recommendation than sell you an expensive ad retainer that your cash flow cannot sustain.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 4b — PROOF SYSTEM (SLOTS FROM PROOF.JSON)           */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-bm-navy bg-bm-wash-cool border border-bm-brand-soft/40 px-3 py-1 rounded-full uppercase tracking-wider">
            Verified Proof
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            Stores We Have Actually Built
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">
            We show the owner’s real operational dashboard, not just cosmetic mockups. You see exactly how easy it is to manage orders yourself.
          </p>
        </div>

        <div className="space-y-4">
          <ProofBlock id="ecom-strip" />
          <ProofBlock id="ecom-samples" />
          <ProofBlock id="ecom-case-1" />
          <ProofBlock id="ecom-testimonial-1" />
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 5 — WHO THIS IS NOT FOR (DISQUALIFIERS)             */}
      {/* ========================================================= */}
      <section>
        <NotForBlock items={notForItems} />
      </section>

      {/* ========================================================= */}
      {/* BLOCK 6 — FAQ ACCORDION (WITH FAQPAGE SCHEMA)             */}
      {/* ========================================================= */}
      <section>
        <FAQ
          items={ecomFaqs}
          title="Online Store FAQ"
          subtitle="Honest answers regarding payment gateways, product limits, shipping, and zero-renewal terms."
        />
      </section>

      {/* ========================================================= */}
      {/* BLOCK 7 — CLOSING CTA                                     */}
      {/* ========================================================= */}
      <section className="bg-bm-navy-deep text-white p-8 sm:p-12 rounded-3xl space-y-6 border border-bm-brand-soft/20 text-center max-w-4xl mx-auto shadow-xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
            <Package className="w-3.5 h-3.5" />
            <span>Consult Before Buying</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Tell us what you sell. We will tell you whether you need a store yet.
          </h2>
          <p className="text-sm text-bm-brand-soft leading-relaxed">
            Message us on WhatsApp. We will evaluate your product count and distribution model, and tell you whether the ₹9,999 store is the right commercial decision today.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <WhatsAppCTA
            src="ecom-footer"
            intent="Hi BM TechX — I want to consult about an online store for my business. I sell: "
            label="Consult on WhatsApp"
            variant="primary"
            className="w-full sm:w-auto text-base py-4 px-8 justify-center shadow-lg"
          />
          {onOpenQuote && (
            <button
              onClick={() => onOpenQuote('Online Store (₹9,999)')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 hover:bg-white/10 px-6 py-4 rounded-xl text-sm font-semibold transition-colors"
            >
              <span>Request Store Blueprint</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default EcommercePage;
