import React, { useEffect, useRef } from 'react'
import { X, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/data/siteData'

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-white dark:bg-card rounded-3xl shadow-2xl border border-border p-6 sm:p-8 text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Close privacy policy"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2 border-b border-border pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Transparent Data Privacy</span>
            </div>
            <h2 id="privacy-policy-title" className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
              Privacy Policy
            </h2>
            <p className="text-xs text-muted-foreground">
              Last updated: October 2026 · {SITE_CONFIG.legalName} (CIN: {SITE_CONFIG.cin})
            </p>
          </div>

          {/* Section 1: Information We Collect */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#1E7A4D]" />
              1. Information We Collect
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              When you submit an enquiry through our quote form or contact us via WhatsApp, we collect:
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-foreground/90 pl-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Your Name:</strong> Used to address you personally in communications.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>WhatsApp Phone Number:</strong> Used solely to send your fixed-price quote, project scope, sprint updates, and order confirmations.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Business / Brand Name & Requirements:</strong> Used to evaluate technical feasibility and estimate timelines.</span>
              </li>
            </ul>
          </div>

          {/* Section 2: How We Use Your Data */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-foreground">
              2. How We Use Your Data
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              We operate with strict business transparency:
            </p>
            <ul className="space-y-1 text-xs sm:text-sm text-foreground/90 list-disc list-inside">
              <li>To provide written project proposals, quotes, and tax invoices.</li>
              <li>To respond to your inquiries on WhatsApp or phone calls.</li>
              <li>We <strong>never sell, lease, or distribute</strong> your contact details to third-party telemarketers or advertisers.</li>
              <li>All lead submissions are encrypted in transit via SSL/HTTPS.</li>
            </ul>
          </div>

          {/* Section 3: Data Retention & Deletion */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-foreground">
              3. Data Retention & Your Rights
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              You retain full ownership of your personal data. If you ever want us to delete your contact number and enquiry records from our internal systems, simply message us on WhatsApp at <strong>{SITE_CONFIG.phones.whatsappDisplay}</strong> or email <strong>{SITE_CONFIG.email}</strong>, and we will purge your records within 24 business hours.
            </p>
          </div>

          {/* Section 4: Registered Entity */}
          <div className="p-4 rounded-2xl bg-muted/60 border border-border text-xs text-muted-foreground space-y-1">
            <p className="font-bold text-foreground">Operating Company Details:</p>
            <p>{SITE_CONFIG.legalName} · Ministry of Corporate Affairs (MCA) Registered</p>
            <p>CIN: {SITE_CONFIG.cin}</p>
            <p>Address: {SITE_CONFIG.address}</p>
          </div>

          <div className="pt-2 flex justify-end">
            <Button onClick={onClose} variant="default" className="w-full sm:w-auto px-6">
              Close Privacy Policy
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyModal
