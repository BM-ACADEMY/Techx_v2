import React from 'react'
import { 
  Globe, 
  ShoppingCart, 
  Search, 
  TrendingUp, 
  Bot, 
  ArrowRight, 
  Check, 
  Zap,
  Sparkles 
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ServicesSectionProps {
  onOpenQuote: (service?: string) => void
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuote }) => {
  const services = [
    {
      icon: Globe,
      id: "web-dev",
      title: "Custom Website Development",
      badge: "48h Sprint",
      badgeColor: "success",
      pricing: "From ₹2,999",
      delivery: "48 hrs – 7 days",
      description: "Engineered in React/Vite. Loads in under 1 second, outranking heavy WordPress sites on Google Core Web Vitals.",
      highlights: [
        "Single-page (₹2,999) & Multi-page (₹4,999)",
        "Domain and fast cloud hosting included (Year 1)",
        "Mobile-first responsive architecture",
        "Direct WhatsApp and enquiry forms with source tracking",
        "Zero plugin vulnerabilities or maintenance overhead"
      ]
    },
    {
      icon: ShoppingCart,
      id: "ecommerce",
      title: "Direct-to-Consumer eCommerce",
      badge: "0% Commission",
      badgeColor: "warm",
      pricing: "Fixed ₹9,999",
      delivery: "7–10 working days",
      description: "Your independent online store with razor-fast checkout, payment gateway, and automatic WhatsApp order dispatches.",
      highlights: [
        "Razorpay / PhonePe / UPI gateway integration",
        "Instant WhatsApp order notifications to your team",
        "Unlimited product catalog with zero commission",
        "Customer invoices, coupons, and discount campaigns",
        "Zero annual proprietary software license fee"
      ]
    },
    {
      icon: Search,
      id: "seo",
      title: "Local & Regional SEO Sprints",
      badge: "Google #1 Focus",
      badgeColor: "brand",
      pricing: "From ₹4,999/mo",
      delivery: "Monthly Retainer",
      description: "Systematic technical audit, Google Business Profile dominance, and local citations designed to capture high-intent buyers.",
      highlights: [
        "24-point deep technical SEO audit and fixes",
        "Google Maps / Local Business rank acceleration",
        "Targeted commercial keywords for Tamil Nadu",
        "Monthly transparent rank tracker and PDF reports",
        "AI Search Visibility optimization (ChatGPT & Perplexity)"
      ]
    },
    {
      icon: TrendingUp,
      id: "meta-ads",
      title: "Meta Ads & Lead Funnels",
      badge: "High ROAS",
      badgeColor: "warm",
      pricing: "₹7,499/mo",
      delivery: "Weekly Optimization",
      description: "High-converting Instagram and Facebook lead campaigns designed for regional South Indian audiences.",
      highlights: [
        "Up to 8 high-impact ad creatives and Tamil/English copy",
        "Direct WhatsApp click-to-chat ad funnels",
        "Pixel, Conversions API & CAPI setup",
        "Audience segment A/B testing and retargeting",
        "Zero markups on ad spend — billed directly to client card"
      ]
    },
    {
      icon: Bot,
      id: "whatsapp-automation",
      title: "WhatsApp Sales Autopilot",
      badge: "24/7 Lead Capture",
      badgeColor: "success",
      pricing: "₹3,999/mo",
      delivery: "Instant Setup",
      description: "Automate your lead qualification and catalogue sharing. Respond to customers within 10 seconds, day or night.",
      highlights: [
        "Meta Cloud API official integration",
        "Under-10-second instant greeting and qualification",
        "Automatic PDF brochure and price list delivery",
        "Smart source attribution ([src:web-inquiry])",
        "Seamless team member handover for closing"
      ]
    }
  ]

  return (
    <section id="services" className="py-20 md:py-28 bg-white border-b border-border">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" className="mb-3">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-bm-orange" />
            Complete Digital Growth Stack
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-bm-navy tracking-tight">
            Engineered for Revenue, Not Just Looks
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Every service is priced upfront. You know the exact deliverables, the exact turnaround timeline, and the exact cost before work begins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => {
            const Icon = svc.icon
            return (
              <Card
                key={svc.id}
                className="flex flex-col justify-between hover:shadow-xl hover:border-bm-navy/30 transition-all duration-300 rounded-2xl group bg-white border border-border"
              >
                <div>
                  <CardHeader className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-bm-navy/5 text-bm-navy flex items-center justify-center group-hover:bg-bm-navy group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge
                        variant={svc.badgeColor as any}
                        className="text-xs font-semibold"
                      >
                        {svc.badge}
                      </Badge>
                    </div>

                    <CardTitle className="text-xl font-bold text-bm-navy mb-2">
                      {svc.title}
                    </CardTitle>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl font-extrabold font-display text-bm-terracotta">
                        {svc.pricing}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        · {svc.delivery}
                      </span>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                      {svc.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6 pt-0">
                    <div className="pt-3 border-t border-dashed border-border/80 space-y-2.5">
                      {svc.highlights.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-foreground/80">
                          <Check className="w-4 h-4 text-[#1E7A4D] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="p-6 pt-0">
                  <Button
                    onClick={() => onOpenQuote(`${svc.title} (${svc.pricing})`)}
                    variant="outline"
                    className="w-full justify-between group-hover:bg-bm-navy group-hover:text-white transition-colors"
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            )
          })}

          {/* Custom Enterprise Card */}
          <Card className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-bm-navy-deep to-bm-navy text-white p-6 md:p-8 shadow-xl">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-orange-200 text-xs font-bold w-fit">
                <Zap className="w-3.5 h-3.5 text-bm-orange" />
                Custom Architecture
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Need a Custom SaaS or Enterprise Portal?
              </h3>
              <p className="text-sm text-bm-navy-soft leading-relaxed">
                From recruitment boards and hospital management to real-time warehouse inventory and automated WhatsApp CRM pipelines.
              </p>
              <ul className="space-y-2 text-xs text-gray-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Full-stack React + Node/Python microservices
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Role-based permissions & automated reports
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> End-to-end deployment with Docker & cloud
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Button
                onClick={() => onOpenQuote('Custom SaaS / Enterprise Portal')}
                variant="accent"
                className="w-full justify-center gap-2 font-semibold"
              >
                Schedule Technical Architecture Call
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
