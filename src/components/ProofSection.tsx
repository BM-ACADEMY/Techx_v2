import { useState, type FC } from 'react'
import { TrendingUp, Award } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CASE_STUDIES } from '@/data/siteData'

interface ProofSectionProps {
  onOpenQuote: (service?: string) => void
}

export const ProofSection: FC<ProofSectionProps> = ({ onOpenQuote }) => {
  const [activeTab, setActiveTab] = useState<string>('anbu')
  const activeCase = CASE_STUDIES.find((c) => c.id === activeTab) || CASE_STUDIES[0]

  return (
    <section id="proof" className="py-20 md:py-28 bg-white border-b border-border">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" className="mb-3">
            <Award className="w-3.5 h-3.5 mr-1 text-bm-orange" />
            Verified Case Studies & Proof
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-bm-navy tracking-tight">
            Real Metrics for Real Tamil Nadu Brands
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            We don’t show fake design concepts. Every case study below is a deployed, live codebase engineered for measurable business conversion.
          </p>
        </div>

        {/* Case Study Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CASE_STUDIES.map((cs) => {
            const isSelected = activeTab === cs.id
            return (
              <button
                key={cs.id}
                onClick={() => setActiveTab(cs.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-bm-navy text-white shadow-md'
                    : 'bg-[#F7F5F1] text-muted-foreground hover:bg-[#EDE9E1] hover:text-foreground'
                }`}
              >
                {cs.client}
              </button>
            )
          })}
        </div>

        {/* Selected Featured Case Study Display */}
        <div className="bg-[#F7F5F1] rounded-3xl border border-border p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white text-bm-navy font-bold">
                  {activeCase.badge}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {activeCase.sector} · {activeCase.location}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-bm-navy">
                {activeCase.title}
              </h3>

              <div className="p-4 rounded-2xl bg-white border border-border flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#17603C] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black font-display text-emerald-800">
                    {activeCase.metric}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {activeCase.result}
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {activeCase.description}
              </p>

              <div>
                <span className="text-xs font-bold text-bm-navy uppercase tracking-wider block mb-2">
                  Engineered Tech Stack:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCase.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-border text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => onOpenQuote(`Similar to ${activeCase.client} (${activeCase.badge})`)}
                  variant="default"
                  size="default"
                  className="text-xs font-semibold"
                >
                  Request Architecture Like {activeCase.client}
                </Button>
              </div>
            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border-2 border-bm-navy/15 shadow-xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono text-muted-foreground ml-2">production-build</span>
                  </div>
                  <Badge variant="success" className="text-[10px]">99 PageSpeed</Badge>
                </div>

                <div className="space-y-3 py-2 text-xs">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <span className="text-muted-foreground block text-[11px] mb-1">Load Latency Benchmark:</span>
                    <div className="flex items-center justify-between font-bold">
                      <span>Desktop 4G First Paint</span>
                      <span className="text-emerald-700">0.38 seconds</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl">
                    <span className="text-muted-foreground block text-[11px] mb-1">Lead Flow Integration:</span>
                    <div className="flex items-center justify-between font-bold">
                      <span>Direct WhatsApp Tagging</span>
                      <span className="text-bm-navy">[src:inbound-intent]</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl">
                    <span className="text-muted-foreground block text-[11px] mb-1">Hosting Infrastructure:</span>
                    <div className="flex items-center justify-between font-bold">
                      <span>Cloudflare / Vercel Edge</span>
                      <span className="text-emerald-700">100% Uptime SLA</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-muted-foreground text-center pt-2">
                  ✓ Verified by Afra Ventures Private Limited engineering team
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
