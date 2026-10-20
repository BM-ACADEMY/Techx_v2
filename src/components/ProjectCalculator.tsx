import React, { useState } from 'react'
import { Calculator, Check, ArrowRight, Clock, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CUSTOM_APP_PRICE, GST_RATE, formatINR, getPlan } from '@/data/siteData'
import { openWhatsApp } from '@/lib/whatsapp'

interface BaseOption {
  id: string
  name: string
  price: number
  days: number
  description: string
}

interface AddonOption {
  id: string
  name: string
  price: number
  days: number
  description: string
}

const BASE_OPTIONS: BaseOption[] = [
  {
    id: 'single',
    name: 'Single-Page Sprint',
    price: getPlan('web-single').price,
    days: 2,
    description: 'High-converting one-page site ready in 48 hours.'
  },
  {
    id: 'multi',
    name: 'Multi-Page Business',
    price: getPlan('web-multi').price,
    days: 6,
    description: 'Full 5-8 page corporate presence with SEO setup.'
  },
  {
    id: 'ecommerce',
    name: 'Online eCommerce Store',
    price: getPlan('store').price,
    days: 9,
    description: 'Full store with payment gateway and WhatsApp alerts.'
  },
  {
    id: 'portal',
    name: 'Custom Web Application',
    price: CUSTOM_APP_PRICE,
    days: 14,
    description: 'Bespoke dashboards, student/job portals, or booking systems.'
  }
]

const ADDONS: AddonOption[] = [
  {
    id: 'extra-pages',
    name: '5 Additional Custom Pages',
    price: 1999,
    days: 2,
    description: 'Expanded service silos and portfolio galleries'
  },
  {
    id: 'whatsapp-bot',
    name: 'Instant WhatsApp Lead Dispatcher',
    price: 1999,
    days: 1,
    description: 'Auto-route buyer queries with source attribution'
  },
  {
    id: 'seo-pack',
    name: 'Advanced SEO & Schema Architecture',
    price: 1499,
    days: 1,
    description: 'Rank higher locally on Google Maps & AI search'
  },
  {
    id: 'brand-design',
    name: 'Brand Identity & Social Kit',
    price: 1499,
    days: 2,
    description: 'Vector logo, favicon, and social media banner kit'
  },
  {
    id: 'payment-gateway',
    name: 'Razorpay / UPI Payment Gateway',
    price: 1999,
    days: 1,
    description: 'Direct zero-commission automated checkout integration'
  }
]

const onActivate = (action: () => void) => (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    action()
  }
}

export const ProjectCalculator: React.FC = () => {
  const [selectedBase, setSelectedBase] = useState<string>('multi')
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['whatsapp-bot', 'seo-pack'])

  const baseItem = BASE_OPTIONS.find((b) => b.id === selectedBase) || BASE_OPTIONS[1]

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id)
    return sum + (addon ? addon.price : 0)
  }, 0)

  const addonsDays = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id)
    return sum + (addon ? addon.days : 0)
  }, 0)

  const totalPrice = baseItem.price + addonsTotal
  const totalDays = baseItem.days + Math.min(addonsDays, 4) // overlap buffer

  const handleWhatsAppBooking = () => {
    const addonNames = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ')

    openWhatsApp(
      `Hello BM TechX! I configured an instant quote on your website:\n\n` +
      `• Base Plan: ${baseItem.name} (${formatINR(baseItem.price)})\n` +
      `• Add-ons: ${addonNames || 'None'}\n` +
      `• Estimated Total: ${formatINR(totalPrice)} + GST\n` +
      `• Target Delivery: ~${totalDays} working days\n\n` +
      `Can we discuss and kick off our project sprint?\n[src:interactive-calculator]`
    )
  }

  return (
    <section id="calculator" className="py-20 md:py-28 bg-[#EDE9E1]/50 border-y border-border relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="brand" className="mb-3">
            <Calculator className="w-3.5 h-3.5 mr-1" />
            Interactive Scope & Price Estimator
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-bm-navy">
            Calculate Your Exact Cost in 10 Seconds
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            No guessing games. Select your platform foundation and optional add-ons to preview guaranteed pricing and timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <span>1. Select Platform Foundation</span>
              </h3>
              <div role="radiogroup" aria-label="Platform foundation" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BASE_OPTIONS.map((opt) => {
                  const isSelected = selectedBase === opt.id
                  return (
                    <div
                      key={opt.id}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => setSelectedBase(opt.id)}
                      onKeyDown={onActivate(() => setSelectedBase(opt.id))}
                      className={`cursor-pointer p-4 rounded-xl border transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-bm-navy ${
                        isSelected
                          ? 'border-bm-navy bg-white shadow-md ring-2 ring-bm-navy/10'
                          : 'border-border bg-white/70 hover:bg-white hover:border-gray-400'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sm text-bm-navy">{opt.name}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-bm-navy/5 text-bm-navy">
                          {formatINR(opt.price)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1.5">{opt.description}</p>
                      <div className="mt-3 flex items-center text-xs text-emerald-700 font-medium">
                        <Clock className="w-3 h-3 mr-1" /> Delivery: ~{opt.days} working days
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <span>2. Choose Optional Growth Add-ons</span>
              </h3>
              <div role="group" aria-label="Optional add-ons" className="space-y-2.5">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id)
                  return (
                    <div
                      key={addon.id}
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                      onClick={() => toggleAddon(addon.id)}
                      onKeyDown={onActivate(() => toggleAddon(addon.id))}
                      className={`cursor-pointer p-3.5 rounded-xl border flex items-center justify-between transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                          : 'border-border bg-white/70 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-emerald-600 text-white' : 'border border-gray-400 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">{addon.name}</div>
                          <div className="text-xs text-muted-foreground">{addon.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-bm-navy">
                          +{formatINR(addon.price)}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Real-time Summary Card */}
          <div className="lg:col-span-5 sticky top-24">
            <Card aria-live="polite" className="border-2 border-bm-navy/20 bg-white shadow-xl overflow-hidden rounded-2xl">
              <div className="bg-bm-navy text-white p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-bm-navy-soft font-semibold">
                    Instant Quote Summary
                  </span>
                  <Badge variant="outline" className="text-white border-white/30 text-xs">
                    Guaranteed Rate
                  </Badge>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold font-display">
                    {formatINR(totalPrice)}
                  </span>
                  <span className="text-xs text-bm-navy-soft">+ {GST_RATE}% GST</span>
                </div>
                <div className="mt-1 text-xs text-bm-navy-soft flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-300" />
                  Estimated Turnaround: <strong className="text-white">{totalDays} working days</strong>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-dashed border-border">
                    <span className="text-muted-foreground">Foundation:</span>
                    <span className="font-semibold text-foreground">{baseItem.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-dashed border-border">
                    <span className="text-muted-foreground">Domain & Cloud Server:</span>
                    <span className="font-semibold text-emerald-700">Included (Year 1)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-dashed border-border">
                    <span className="text-muted-foreground">Core Web Vitals 95+:</span>
                    <span className="font-semibold text-emerald-700">Guaranteed</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-dashed border-border">
                    <span className="text-muted-foreground">Selected Add-ons:</span>
                    <span className="font-semibold text-foreground">{selectedAddons.length} added</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-dashed border-border">
                    <span className="text-muted-foreground">Full Source Code Ownership:</span>
                    <span className="font-semibold text-emerald-700">100% Yours</span>
                  </div>
                </div>

                <div className="bg-orange-50/80 border border-orange-200/80 rounded-xl p-3 text-xs text-orange-950 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Zero hidden charges:</strong> No recurring mandatory maintenance contracts or locked source code.
                  </div>
                </div>

                <Button
                  onClick={handleWhatsAppBooking}
                  variant="action"
                  size="lg"
                  className="w-full text-sm font-semibold justify-center gap-2 shadow-md"
                >
                  Lock In This Quote on WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-[#1E7A4D]" />
                  Includes 30-day post-launch warranty support
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
