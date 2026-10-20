import React, { useState } from 'react'
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FAQS } from '@/data/siteData'
import { openWhatsApp as openWhatsAppChat } from '@/lib/whatsapp'

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const openWhatsApp = () => {
    openWhatsAppChat(
      `Hello BM TechX! I have a question before getting started with my project.\n[src:faq-inquiry]`
    )
  }

  return (
    <section id="faqs" className="py-20 md:py-28 bg-white border-b border-border">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="brand" className="mb-3">
            <HelpCircle className="w-3.5 h-3.5 mr-1 text-bm-orange" />
            Transparent Answers
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-bm-navy tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Clear terms, no hidden print, and total transparency about how we work.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={faq.q}
                className="border border-border rounded-2xl overflow-hidden transition-all duration-200 bg-[#F7F5F1]/40"
              >
                <button
                  type="button"
                  id={`faq-q-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${idx}`}
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-bm-navy hover:text-bm-orange transition-colors"
                >
                  <span>{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-bm-navy text-white' : 'text-muted-foreground'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-a-${idx}`}
                    role="region"
                    aria-labelledby={`faq-q-${idx}`}
                    className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-muted-foreground leading-relaxed animate-fade-in"
                  >
                    <p className="border-t border-border/80 pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Quick Help Card */}
        <div className="mt-12 bg-gradient-to-r from-bm-navy to-bm-navy-deep text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold font-display">
              Have a custom requirement or question?
            </h4>
            <p className="text-xs sm:text-sm text-bm-navy-soft">
              Speak directly with our engineering founders on WhatsApp. No sales pressure.
            </p>
          </div>
          <Button
            onClick={openWhatsApp}
            variant="action"
            size="lg"
            className="shrink-0 gap-2 font-semibold shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            Chat with Founder
          </Button>
        </div>
      </div>
    </section>
  )
}
