import type { FC } from 'react'
import { ArrowRight, Zap, CheckCircle2, Shield, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/data/siteData'

interface HeroProps {
  onOpenQuote: (service?: string) => void
}

export const Hero: FC<HeroProps> = ({ onOpenQuote }) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello BM TechX team! I'm interested in starting a website project with 48h turnaround.\n[src:hero-cta]`
    )
    window.open(`https://wa.me/${SITE_CONFIG.phones.whatsapp}?text=${text}`, '_blank')
  }

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden subtle-grid">
      {/* Glow decorations */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-bm-navy/10 via-bm-orange/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border shadow-xs text-xs font-semibold text-bm-navy">
              <span className="flex h-2 w-2 rounded-full bg-bm-orange animate-pulse" />
              <span>Published Fixed Prices · Puducherry & Tamil Nadu</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-[#1E7A4D] font-bold">48-Hour Delivery</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-bm-navy tracking-tight leading-[1.08]">
              Websites that load in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bm-navy via-bm-terracotta to-bm-orange">
                0.5 seconds.
              </span>
              <br />
              Zero WordPress bloat.
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We engineer custom-coded websites and eCommerce stores from{' '}
              <strong className="text-foreground font-semibold">₹2,999</strong>. Includes domain, high-speed cloud hosting, and on-page SEO. No fragile plugins, no slow page weights, and no surprise developer invoices.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Button
                onClick={() => onOpenQuote()}
                variant="default"
                size="lg"
                className="w-full sm:w-auto text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <span>View Fixed Pricing (from ₹2,999)</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>

              <Button
                onClick={openWhatsApp}
                variant="action"
                size="lg"
                className="w-full sm:w-auto text-sm font-semibold gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp (Instant)</span>
              </Button>
            </div>

            {/* Bullet Proof Points */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-foreground/80 font-medium">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-[#1E7A4D]" />
                <span>Domain + Server Included</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-[#1E7A4D]" />
                <span>Core Web Vitals 99+</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#1E7A4D]" />
                <span>100% Code Ownership</span>
              </div>
            </div>
          </div>

          {/* Interactive Benchmark Card / Live Widget */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border-2 border-bm-navy/15 shadow-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-bm-navy text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Live Audit Benchmark
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-bm-orange flex items-center justify-center">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-bm-navy">Engineering Difference</h3>
                  <p className="text-xs text-muted-foreground">BM TechX Custom Code vs Standard Agency</p>
                </div>
              </div>

              {/* Head-to-Head Comparison Bars */}
              <div className="space-y-4">
                {/* Metric 1 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-foreground">Google PageSpeed Score</span>
                    <span className="text-emerald-700 font-bold">99 / 100</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-emerald-600 rounded-full w-[99%]" />
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Typical WordPress Agency: 38/100</span>
                    <span className="text-emerald-700 font-semibold">+160% faster</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-foreground">Largest Contentful Paint (LCP)</span>
                    <span className="text-emerald-700 font-bold">0.4 seconds</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-emerald-600 rounded-full w-[95%]" />
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Standard Template: 3.4 seconds</span>
                    <span className="text-emerald-700 font-semibold">Instant first paint</span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-foreground">Security & Plugin Vulnerabilities</span>
                    <span className="text-emerald-700 font-bold">0 Fragile Plugins</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-emerald-600 rounded-full w-[100%]" />
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Standard WordPress: 20-30 third-party plugins</span>
                    <span className="text-emerald-700 font-semibold">Zero plugin lock-in</span>
                  </div>
                </div>
              </div>

              {/* Callout Footer */}
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Shield className="w-4 h-4 text-bm-navy" />
                  <span>Tested on Jio / Airtel 4G</span>
                </div>
                <button
                  onClick={() => onOpenQuote('Multi-Page Website (₹4,999)')}
                  className="font-bold text-bm-navy hover:text-bm-orange flex items-center gap-1 group"
                >
                  Order High-Speed Site
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Metrics Strip */}
        <div className="mt-14 pt-8 border-t border-border/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3">
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-bm-navy">
              ₹2,999
            </div>
            <div className="text-xs text-muted-foreground font-medium mt-1">
              Starting Website Price
            </div>
          </div>
          <div className="p-3">
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-bm-terracotta">
              48 Hours
            </div>
            <div className="text-xs text-muted-foreground font-medium mt-1">
              Fastest Turnaround Delivery
            </div>
          </div>
          <div className="p-3">
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#1E7A4D]">
              99+
            </div>
            <div className="text-xs text-muted-foreground font-medium mt-1">
              Core Web Vitals Score
            </div>
          </div>
          <div className="p-3">
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-bm-navy">
              4.9 / 5★
            </div>
            <div className="text-xs text-muted-foreground font-medium mt-1">
              Client Satisfaction Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
