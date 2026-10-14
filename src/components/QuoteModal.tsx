import React, { useState } from 'react'
import { X, Send, CheckCircle2, MessageSquare, PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SITE_CONFIG } from '@/data/siteData'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  initialService?: string
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Multi-Page Website (₹4,999)',
}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [service, setService] = useState(initialService)
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) return

    const message = encodeURIComponent(
      `Hello BM TechX Team!\n\nI want to start a project:\n` +
      `• Name: ${name}\n` +
      `• Business: ${businessName || 'Not specified'}\n` +
      `• Phone: ${phone}\n` +
      `• Required Service: ${service}\n` +
      (notes ? `• Specific Notes: ${notes}\n` : '') +
      `\n[src:techx-v2-web-quote]`
    )

    const whatsappUrl = `https://wa.me/${SITE_CONFIG.phones.whatsapp}?text=${message}`
    setSubmitted(true)

    // Open WhatsApp in a new tab
    setTimeout(() => {
      window.open(whatsappUrl, '_blank')
    }, 600)
  }

  const resetAndClose = () => {
    setSubmitted(false)
    setName('')
    setPhone('')
    setBusinessName('')
    setNotes('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-surface bg-white dark:bg-card rounded-2xl shadow-2xl border border-border p-6 md:p-8 overflow-hidden text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-[#17603C] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-display text-bm-navy">
              Redirecting to WhatsApp...
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Thank you, <strong>{name}</strong>! Your inquiry details are pre-formatted for instant priority discussion with our engineering team.
            </p>
            <div className="pt-4 flex flex-col gap-2">
              <Button onClick={resetAndClose} variant="default" className="w-full">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bm-navy/5 text-bm-navy text-xs font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-[#1E7A4D] animate-ping" />
                Guaranteed Fixed-Price Quote
              </div>
              <h2 className="text-2xl font-bold font-display text-bm-navy">
                Start Your Project
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Share your requirements. Get a transparent quote & sprint timeline in minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Your Full Name *
                </label>
                <Input
                  required
                  placeholder="e.g. Arun Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    WhatsApp Phone *
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder="e.g. 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Business / Brand Name
                  </label>
                  <Input
                    placeholder="e.g. Pondy Organics"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Select Desired Service
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="Single-Page Website (₹2,999 / 48h)">Single-Page Website (₹2,999 / 48h)</option>
                  <option value="Multi-Page Website (₹4,999)">Multi-Page Website (₹4,999)</option>
                  <option value="Full eCommerce Store (₹9,999)">Full eCommerce Store (₹9,999)</option>
                  <option value="Local SEO Sprint (₹4,999/mo)">Local SEO Sprint (₹4,999/mo)</option>
                  <option value="Market Leader SEO (₹8,999/mo)">Market Leader SEO (₹8,999/mo)</option>
                  <option value="Meta Ads & Funnels (₹7,499/mo)">Meta Ads & Funnels (₹7,499/mo)</option>
                  <option value="WhatsApp Automation System (₹3,999/mo)">WhatsApp Automation System (₹3,999/mo)</option>
                  <option value="Custom Web Application / Enterprise Software">Custom Web App / Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Brief Project Requirements (Optional)
                </label>
                <Textarea
                  placeholder="Tell us about your target launch date, key features or competitors you like..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  variant="action"
                  size="lg"
                  className="w-full flex-1 justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Quote Request on WhatsApp
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-[#1E7A4D]" /> Quick 10-Min WhatsApp Response
                </span>
                <span className="flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5 text-bm-navy" /> Call: {SITE_CONFIG.phones.callsDisplay}
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
