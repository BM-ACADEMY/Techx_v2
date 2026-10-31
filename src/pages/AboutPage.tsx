import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  MapPin, 
  Award, 
  Building2, 
  FileCheck2, 
  CheckCircle2, 
  Clock, 
  Code2, 
  XCircle, 
  Bot, 
  ExternalLink 
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteData';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';

export function AboutPage() {
  useEffect(() => {

    // Organization & Breadcrumb Schema
    const orgSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://bmtechx.in/#organization",
          "name": "BM TechX",
          "legalName": "Afra Ventures Private Limited",
          "url": "https://bmtechx.in",
          "logo": "https://bmtechx.in/images/logo.png",
          "foundingDate": "2026-09",
          "identifier": {
            "@type": "PropertyValue",
            "name": "CIN",
            "value": "U62011PY2026PTC009819"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "78 Lenin Street, Kosapalayam",
            "addressLocality": "Puducherry",
            "postalCode": "605013",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-99449-40051",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["en", "ta"]
          },
          "sameAs": [
            "https://www.facebook.com/bmtechx",
            "https://www.instagram.com/bmtechx"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://bmtechx.in/about/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://bmtechx.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "About",
              "item": "https://bmtechx.in/about/"
            }
          ]
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'about-schema';
    script.text = JSON.stringify(orgSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('about-schema');
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto space-y-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-bm-ink-faint flex items-center gap-2">
        <Link to="/" className="hover:text-bm-navy">Home</Link>
        <span>/</span>
        <span className="text-bm-ink font-semibold">About</span>
      </nav>

      {/* BLOCK 1: H1 + ANSWER FIRST */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-bm-orange bg-bm-orange/10 px-3.5 py-1 rounded-full">
          <Building2 className="w-3.5 h-3.5" /> Incorporated in Puducherry
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-bm-navy-deep tracking-tight">
          Who you are actually dealing with: the BM TechX team in Puducherry
        </h1>
        <p className="text-lg text-bm-ink leading-relaxed">
          BM TechX is a digital agency in Puducherry and a brand of{' '}
          <strong className="text-bm-navy-deep font-bold">Afra Ventures Private Limited</strong>, 
          a company registered in September 2026 under CIN{' '}
          <code className="font-mono text-sm bg-bm-wash-cool px-2 py-0.5 rounded text-bm-navy font-bold">
            {SITE_CONFIG.cin}
          </code>
          . We build custom-coded websites, run SEO and Meta ads, and automate WhatsApp for businesses across Tamil Nadu. We publish our prices, we commit to dates, and the domain we register is always in your name.
        </p>
      </div>

      {/* BLOCK 2: WHY WE PUT THE REGISTRATION ON THE PAGE (Trigger 1: I've been cheated before) */}
      <section className="bg-white rounded-2xl border-2 border-bm-line/80 p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-bm-line pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-bm-navy-deep">
                Why we put the company registration right here
              </h2>
              <p className="text-xs text-bm-ink-muted">Direct verification. No defensiveness. Complete accountability.</p>
            </div>
          </div>
          <a
            href="https://www.mca.gov.in/content/mca/global/en/home.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-lg transition-colors w-fit"
          >
            Verify on MCA Portal <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="prose prose-sm text-bm-ink-muted space-y-4 max-w-none">
          <p className="text-base text-bm-ink leading-relaxed">
            Most people who come to us have been let down before — money paid, work half-done, calls stopped being answered. It happens often enough in this industry that we assume it about every new enquiry.
          </p>
          <p className="leading-relaxed">
            So: we&apos;re a registered private limited company with a CIN you can look up on the Ministry of Corporate Affairs (MCA) portal. We have a GST number and issue proper invoices. Our office is in Puducherry and you&apos;re welcome to come to it. Our team have names, faces and roles, listed below.
          </p>
          <p className="font-semibold text-bm-navy-deep">
            None of that guarantees good work. But it means there&apos;s someone to hold responsible, which is more than the last person offered.
          </p>
        </div>

        {/* Legal Registry Snapshot Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-bm-line bg-bm-wash-cool/40 p-4 rounded-xl">
          <div>
            <span className="text-[11px] font-bold text-bm-ink-faint uppercase tracking-wider block">Legal Entity Name</span>
            <span className="font-bold text-bm-navy-deep text-sm">{SITE_CONFIG.legalName}</span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-bm-ink-faint uppercase tracking-wider block">Corporate Identity Number (CIN)</span>
            <span className="font-mono font-bold text-bm-navy text-sm">{SITE_CONFIG.cin}</span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-bm-ink-faint uppercase tracking-wider block">Registered Address</span>
            <span className="text-xs text-bm-ink">{SITE_CONFIG.address}</span>
          </div>
        </div>
      </section>

      {/* BLOCK 3: THE TEAM (STABLE ANCHORS REQUIRED) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-bm-navy/10 flex items-center justify-center text-bm-navy">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-bm-navy-deep">The Delivery Team</h2>
            <p className="text-xs text-bm-ink-muted">Real people with specific responsibilities. Clickable bio anchors link from our blogs.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kamar Anchor */}
          <div 
            id="kamar" 
            className="bg-white rounded-2xl border border-bm-line p-6 shadow-sm hover:border-bm-navy/40 transition-all space-y-3 scroll-mt-24"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-bm-orange bg-bm-orange/10 px-2 py-0.5 rounded-full uppercase">
                  Founder
                </span>
                <h3 className="text-2xl font-black text-bm-navy-deep mt-1">Kamar</h3>
                <p className="text-xs font-semibold text-bm-ink-muted">Founder & Strategy</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-bm-navy text-white font-black text-lg flex items-center justify-center">
                K
              </div>
            </div>
            <p className="text-sm text-bm-ink leading-relaxed">
              Runs strategy and closes most of our client relationships directly. If you&apos;re signing something at BM TechX, you&apos;ve spoken to him.
            </p>
            <div className="pt-3 border-t border-bm-line/60 flex items-center gap-2 text-xs text-bm-ink-faint">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Fixed-price delivery commitments & approvals
            </div>
          </div>

          {/* Karthika Anchor */}
          <div 
            id="karthika" 
            className="bg-white rounded-2xl border border-bm-line p-6 shadow-sm hover:border-bm-navy/40 transition-all space-y-3 scroll-mt-24"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-bm-orange bg-bm-orange/10 px-2 py-0.5 rounded-full uppercase">
                  Delivery Lead
                </span>
                <h3 className="text-2xl font-black text-bm-navy-deep mt-1">Karthika</h3>
                <p className="text-xs font-semibold text-bm-ink-muted">SEO & Operations</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-800 text-white font-black text-lg flex items-center justify-center">
                Ka
              </div>
            </div>
            <p className="text-sm text-bm-ink leading-relaxed">
              Runs search delivery across every client — audits, optimisation, Google Business Profiles, reporting. Most of what happens to your rankings happens at her desk.
            </p>
            <div className="pt-3 border-t border-bm-line/60 flex items-center gap-2 text-xs text-bm-ink-faint">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Search Console, Schema markup, Map Pack ranking
            </div>
          </div>

          {/* Imran Anchor */}
          <div 
            id="imran" 
            className="bg-white rounded-2xl border border-bm-line p-6 shadow-sm hover:border-bm-navy/40 transition-all space-y-3 scroll-mt-24"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-bm-orange bg-bm-orange/10 px-2 py-0.5 rounded-full uppercase">
                  Creative
                </span>
                <h3 className="text-2xl font-black text-bm-navy-deep mt-1">Imran</h3>
                <p className="text-xs font-semibold text-bm-ink-muted">Content & Design</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-bm-terracotta text-white font-black text-lg flex items-center justify-center">
                I
              </div>
            </div>
            <p className="text-sm text-bm-ink leading-relaxed">
              Writes and designs what goes on your site and your ads. Conversion-focused copy without corporate fluff, tailored for regional Indian buyers.
            </p>
            <div className="pt-3 border-t border-bm-line/60 flex items-center gap-2 text-xs text-bm-ink-faint">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Direct-response copy, UX wireframes, Ad scripts
            </div>
          </div>

          {/* Babila Anchor */}
          <div 
            id="babila" 
            className="bg-white rounded-2xl border border-bm-line p-6 shadow-sm hover:border-bm-navy/40 transition-all space-y-3 scroll-mt-24"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-bm-orange bg-bm-orange/10 px-2 py-0.5 rounded-full uppercase">
                  Performance
                </span>
                <h3 className="text-2xl font-black text-bm-navy-deep mt-1">Babila</h3>
                <p className="text-xs font-semibold text-bm-ink-muted">Social Media & Meta Ads</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-800 text-white font-black text-lg flex items-center justify-center">
                B
              </div>
            </div>
            <p className="text-sm text-bm-ink leading-relaxed">
              Runs campaigns and social delivery. Builds high-intent Facebook & Instagram funnels that feed pre-qualified leads into your WhatsApp channel.
            </p>
            <div className="pt-3 border-t border-bm-line/60 flex items-center gap-2 text-xs text-bm-ink-faint">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Meta CAPI, retargeting funnels, lead verification
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 4: HOW WE'RE DIFFERENT, SPECIFICALLY */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-bm-orange uppercase tracking-wider">Five Commitments</span>
          <h2 className="text-2xl font-bold text-bm-navy-deep mt-1">How we&apos;re different, specifically</h2>
          <p className="text-sm text-bm-ink-muted">Not vague values — five specific engineering and business rules we enforce every day.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-bm-line shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-bm-wash-warm text-bm-terracotta border border-bm-wash-warm-line flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-lg font-bold text-bm-navy-deep">We publish prices.</h3>
            <p className="text-sm text-bm-ink-muted leading-relaxed">
              Every single price is listed publicly on{' '}
              <Link to="/pricing" className="text-bm-navy font-bold underline hover:text-bm-orange">
                one page
              </Link>
              . You will never be quoted based on how big your office is or how much money you look like you have.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-bm-line shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-bm-wash-cool text-bm-navy border border-bm-line flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-bm-navy-deep">We write the code.</h3>
            <p className="text-sm text-bm-ink-muted leading-relaxed">
              Not slow themes, not bloated page builders. Faster mobile sites, fewer breakages, zero annual plugin subscriptions, and nothing rented.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-bm-line shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-bm-navy-deep">We commit to dates.</h3>
            <p className="text-sm text-bm-ink-muted leading-relaxed">
              48 working hours for a one-page site. The clock is visible on our site and it starts the moment your content arrives.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-bm-line shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center">
              <XCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-bm-navy-deep">We say no.</h3>
            <p className="text-sm text-bm-ink-muted leading-relaxed">
              Every service page has a &ldquo;who this is not for&rdquo; section. We would rather lose an unsuitable sale in week one than an unhappy client in month three.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-bm-line shadow-sm space-y-3 md:col-span-2 lg:col-span-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-bm-navy-deep">We automate our own business first.</h3>
            <p className="text-sm text-bm-ink-muted leading-relaxed">
              The WhatsApp assistant that replies to you is the exact system we sell. That is why a ₹2,999 website is profitable for us to deliver at speed, and why you get an answer even when you message at 10:00 PM.
            </p>
          </div>
        </div>
      </section>

      {/* BLOCK 5: THE WIDER GROUP */}
      <section className="bg-gradient-to-br from-bm-navy/5 to-transparent p-8 rounded-2xl border border-bm-line space-y-4">
        <div className="flex items-center gap-3">
          <Award className="w-7 h-7 text-bm-navy" />
          <h2 className="text-2xl font-bold text-bm-navy-deep">The Wider Group: BM Academy</h2>
        </div>
        <p className="text-sm text-bm-ink leading-relaxed">
          BM TechX sits alongside several other initiatives under <strong>Afra Ventures Private Limited</strong> — including{' '}
          <strong>BM Academy</strong>, our skill-building and technology learning division, which has trained 1,400+ engineering learners and guided 150+ into careers across Tamil Nadu.
        </p>
        <p className="text-sm text-bm-ink-muted leading-relaxed">
          That connection is practical, not decorative: it is how our engineering team stays current with modern frameworks, and it is where several of our technical contributors were directly trained.
        </p>
      </section>

      {/* BLOCK 6: WHERE WE WORK */}
      <section className="bg-white rounded-2xl border border-bm-line p-8 space-y-6">
        <div className="flex items-center gap-3">
          <MapPin className="w-7 h-7 text-bm-terracotta" />
          <div>
            <h2 className="text-2xl font-bold text-bm-navy-deep">Where We Work</h2>
            <p className="text-xs text-bm-ink-muted">Puducherry head office, serving businesses across Tamil Nadu</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-bm-ink leading-relaxed">
          <p>
            Based at <strong>78 Lenin Street, Kosapalayam, Puducherry 605013</strong>. We work actively with clients across{' '}
            <strong className="text-bm-navy-deep">Cuddalore, Villupuram, Chennai, Madurai, Tiruchirappalli and Namakkal</strong>.
          </p>
          <p className="text-bm-ink-muted">
            Websites, SEO, Meta ads and WhatsApp automation are delivered remotely with regular screen shares and WhatsApp voice/video calls. Only photography and video shoots require our presence on site — outside Puducherry, on-site shoots are priced on requirement.
          </p>
          <div className="p-4 bg-bm-wash-cool rounded-xl border border-bm-line text-xs text-bm-ink-muted flex items-start gap-2">
            <FileCheck2 className="w-4 h-4 text-bm-navy flex-shrink-0 mt-0.5" />
            <span>
              <strong>Authenticity Note:</strong> We don&apos;t claim fake &ldquo;global offices in Dubai or London&rdquo;. We are proud to be a registered Puducherry technology company building real software for real regional businesses.
            </span>
          </div>
        </div>
      </section>

      {/* BLOCK 7: CTA */}
      <section className="bg-bm-navy-deep text-white p-8 sm:p-10 rounded-2xl text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Come and see the office, or just message us.
        </h2>
        <p className="text-sm text-white/80 max-w-xl mx-auto">
          Visit us at Kosapalayam, Puducherry, or start a WhatsApp chat right now. No sales pitches — just straight answers to your questions.
        </p>
        <div className="flex justify-center pt-2">
          <WhatsAppCTA 
            src="about-footer"
            label="Message Us on WhatsApp"
            intent="I want to connect with your team"
            size="lg"
          />
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
