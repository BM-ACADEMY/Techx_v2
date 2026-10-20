import { useState, type FC } from 'react'
import { Check, X, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ONE_TIME_PLANS, MONTHLY_PLANS, GST_RATE, formatINR, planOptionLabel, type PricingPlan } from '@/data/siteData'
import { openWhatsApp } from '@/lib/whatsapp'

interface PricingSectionProps {
  onOpenQuote: (service?: string) => void
}

export const PricingSection: FC<PricingSectionProps> = ({ onOpenQuote }) => {
  const [tab, setTab] = useState<'onetime' | 'monthly'>('onetime')

  const plans = tab === 'onetime' ? ONE_TIME_PLANS : MONTHLY_PLANS

  const openWhatsAppForPlan = (plan: PricingPlan) => {
    openWhatsApp(
      `Hello BM TechX team! I'd like to book the "${plan.name}" plan for ${formatINR(plan.price)}${plan.period ? `/${plan.period}` : ''}.\n[src:pricing-card-${plan.id}]`
    )
  }

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#F7F5F1] border-b border-border relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="brand" className="mb-3">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            100% Transparent · Published Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-bm-navy tracking-tight">
            No Surprise Invoices. Ever.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground">
            What you see is what you pay. Every deliverable is locked before we code a single line.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-border shadow-sm mt-8">
            <button
              type="button"
              aria-pressed={tab === 'onetime'}
              onClick={() => setTab('onetime')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                tab === 'onetime'
                  ? 'bg-bm-navy text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              One-Time Web Projects
            </button>
            <button
              type="button"
              aria-pressed={tab === 'monthly'}
              onClick={() => setTab('monthly')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                tab === 'monthly'
                  ? 'bg-bm-navy text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly Growth Retainers
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className={`grid grid-cols-1 ${tab === 'onetime' ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-8 items-stretch`}>
          {plans.map((plan) => {
            const isFeatured = plan.recommended
            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl transition-all duration-300 ${
                  isFeatured
                    ? 'border-2 border-bm-navy bg-white shadow-2xl scale-[1.02] z-10'
                    : 'border border-border bg-white shadow-md hover:shadow-xl'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-bm-terracotta text-white shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <CardHeader className="p-6 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl font-bold text-bm-navy">
                        {plan.name}
                      </CardTitle>
                    </div>

                    <div className="my-3">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold font-display text-bm-navy">
                          {formatINR(plan.price)}
                        </span>
                        {plan.period && (
                          <span className="text-sm font-semibold text-muted-foreground">
                            /{plan.period}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Excluding {GST_RATE}% GST · Delivered in {plan.delivery || 'ongoing sprint'}
                      </div>
                    </div>

                    <CardDescription className="text-xs text-muted-foreground leading-relaxed min-h-[36px]">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6 pt-2 space-y-4">
                    <div className="pt-2 border-t border-border space-y-2">
                      <div className="text-xs font-bold text-bm-navy uppercase tracking-wider">
                        Included in this sprint:
                      </div>
                      {plan.includes.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs text-foreground/85">
                          <Check className="w-3.5 h-3.5 text-[#1E7A4D] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {plan.excludes && plan.excludes.length > 0 && (
                      <div className="pt-2 border-t border-dashed border-border/80 space-y-1.5">
                        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                          Excluded (can be quoted separately):
                        </div>
                        {plan.excludes.map((item) => (
                          <div key={item} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                            <X className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {plan.renewal && (
                      <div className="pt-2 border-t border-border/80 text-[11px] text-muted-foreground bg-gray-50 p-2.5 rounded-lg">
                        <strong>Year 2 renewal:</strong>{' '}
                        {plan.renewal.amount > 0 ? (
                          <span>{formatINR(plan.renewal.amount)}/{plan.renewal.period} ({plan.renewal.note})</span>
                        ) : (
                          <span className="text-emerald-700 font-semibold">{plan.renewal.note}</span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </div>

                <CardFooter className="p-6 pt-0 space-y-2 flex flex-col">
                  <Button
                    onClick={() => openWhatsAppForPlan(plan)}
                    variant={isFeatured ? 'action' : 'default'}
                    size="lg"
                    className="w-full justify-center gap-1.5 text-xs font-bold"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Book via WhatsApp
                  </Button>

                  <button
                    type="button"
                    onClick={() => onOpenQuote(planOptionLabel(plan))}
                    className="text-xs text-muted-foreground hover:text-bm-navy font-medium py-1 transition-colors"
                  >
                    Or request written quotation form →
                  </button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Bottom policy reassurance */}
        <div className="mt-14 max-w-3xl mx-auto bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-bm-navy">
              Need custom milestone payments or corporate invoice?
            </h4>
            <p className="text-xs text-muted-foreground">
              We provide formal GST invoices (Afra Ventures Private Limited), written sprint contracts, and 50% milestone structuring for qualifying projects.
            </p>
          </div>
          <Button
            onClick={() => onOpenQuote('Corporate Milestone Contract')}
            variant="outline"
            size="sm"
            className="shrink-0 text-xs font-semibold"
          >
            Contact Accounts Desk
          </Button>
        </div>
      </div>
    </section>
  )
}
