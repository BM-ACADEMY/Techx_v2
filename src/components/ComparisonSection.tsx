import type { FC } from 'react'
import { Check, X, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const ComparisonSection: FC = () => {
  const comparisonRows = [
    {
      metric: "Google Core Web Vitals Score",
      bmTechX: "95–100 / 100 (Instant paint)",
      wordpress: "30–55 / 100 (Fails Google ranking test)",
      winner: true
    },
    {
      metric: "Mobile Page Load Latency",
      bmTechX: "Under 0.8 seconds on 4G networks",
      wordpress: "3.5 to 7.0 seconds (High bounce rates)",
      winner: true
    },
    {
      metric: "Plugin Dependency & Vulnerabilities",
      bmTechX: "0 Fragile Plugins. 100% Clean Code.",
      wordpress: "20–35 third-party plugins requiring monthly patches",
      winner: true
    },
    {
      metric: "Code & Asset Ownership",
      bmTechX: "100% Yours. No locked builders or licenses.",
      wordpress: "Locked into Elementor / Divi annual fee subscriptions",
      winner: true
    },
    {
      metric: "Annual Renewal Cost Trap",
      bmTechX: "Guaranteed ₹1,999/yr for domain + server only",
      wordpress: "₹8,000 to ₹15,000/yr in recurring plugin updates",
      winner: true
    },
    {
      metric: "Inbound Lead Conversion",
      bmTechX: "Direct WhatsApp routing with page source tags",
      wordpress: "Generic forms that get drowned in spam bots",
      winner: true
    }
  ]

  return (
    <section id="comparison" className="py-20 md:py-28 bg-[#F7F5F1] border-b border-border">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" className="mb-3">
            <Zap className="w-3.5 h-3.5 mr-1 text-bm-orange" />
            Engineering Comparison
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-bm-navy tracking-tight">
            Why Custom Code Beats WordPress Every Single Time
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            A website that takes 4 seconds to load loses 53% of mobile visitors before they even read your headline. Here is why we refuse to build with bloated templates.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-border shadow-xl overflow-hidden">
          <div className="grid grid-cols-12 bg-bm-navy text-white p-4 sm:p-6 text-xs sm:text-sm font-bold tracking-wide">
            <div className="col-span-5 sm:col-span-4 uppercase text-bm-navy-soft">
              Evaluation Criteria
            </div>
            <div className="col-span-4 sm:col-span-4 text-emerald-400 flex items-center gap-1.5">
              <span>BM TechX (Custom Code)</span>
            </div>
            <div className="col-span-3 sm:col-span-4 text-gray-400">
              Typical WordPress Agency
            </div>
          </div>

          <div className="divide-y divide-border">
            {comparisonRows.map((row) => (
              <div
                key={row.metric}
                className="grid grid-cols-12 p-4 sm:p-6 items-center text-xs sm:text-sm hover:bg-gray-50/80 transition-colors"
              >
                <div className="col-span-5 sm:col-span-4 font-bold text-bm-navy pr-2">
                  {row.metric}
                </div>
                <div className="col-span-4 sm:col-span-4 text-emerald-800 font-semibold flex items-start gap-1.5 pr-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{row.bmTechX}</span>
                </div>
                <div className="col-span-3 sm:col-span-4 text-muted-foreground flex items-start gap-1.5">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="hidden sm:inline">{row.wordpress}</span>
                  <span className="sm:hidden text-[11px] text-red-700">Poor / Slow</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50/60 p-5 text-center text-xs sm:text-sm text-emerald-950 font-medium border-t border-emerald-100">
            ⚡ Bottom line: You pay once for clean, high-performing code that works 24/7 rather than paying every year for software fixes.
          </div>
        </div>
      </div>
    </section>
  )
}
