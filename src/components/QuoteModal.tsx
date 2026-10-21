import React, { useEffect, useId, useRef, useState } from 'react'
import { X, Send, CheckCircle2, MessageSquare, PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SITE_CONFIG, SERVICE_OPTIONS, DEFAULT_SERVICE } from '@/data/siteData'
import { buildWhatsAppUrl, isValidIndianMobile, openWhatsApp, sendLead } from '@/lib/whatsapp'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  initialService?: string
}

const labelClass = 'block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5'

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialService = DEFAULT_SERVICE,
}) => {
  const uid = useId()
  const ids = {
    name: `${uid}-name`,
    phone: `${uid}-phone`,
    business: `${uid}-business`,
    service: `${uid}-service`,
    notes: `${uid}-notes`,
    title: `${uid}-title`,
  }

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [service, setService] = useState(initialService)
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})

  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Sync the dropdown whenever the modal is opened for a different service.
  useEffect(() => {
    if (isOpen) setService(initialService)
  }, [isOpen, initialService])

  // Escape to close, focus trap, focus the dialog on open, lock page scroll.
  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        resetAndClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
    // resetAndClose only touches state setters and onClose
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const nextErrors: { name?: string; phone?: string } = {}
    if (!name.trim()) nextErrors.name = 'Please enter your name.'
    if (!isValidIndianMobile(phone)) {
      nextErrors.phone = 'Enter a valid 10-digit Indian mobile number.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const message =
      `Hello BM TechX Team!\n\nI want to start a project:\n` +
      `• Name: ${name.trim()}\n` +
      `• Business: ${businessName.trim() || 'Not specified'}\n` +
      `• Phone: ${phone.trim()}\n` +
      `• Required Service: ${service}\n` +
      (notes.trim() ? `• Specific Notes: ${notes.trim()}\n` : '') +
      `\n[src:techx-v2-web-quote]`

    // Store the lead first so it survives even if WhatsApp never opens.
    sendLead({
      name: name.trim(),
      phone: phone.trim(),
      business: businessName.trim(),
      service,
      notes: notes.trim(),
      source: 'techx-v2-web-quote',
    })

    // Open WhatsApp directly inside the submit handler so it is not popup-blocked.
    openWhatsApp(message)
    setWhatsappUrl(buildWhatsAppUrl(message))
    setSubmitted(true)
  }

  function resetAndClose() {
    setSubmitted(false)
    setWhatsappUrl('')
    setErrors({})
    setName('')
    setPhone('')
    setBusinessName('')
    setNotes('')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={resetAndClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ids.title}
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] p-6 md:p-8 text-[#0A0B0E]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-[#F1F5F9] hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4" role="status">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 id={ids.title} className="text-2xl font-bold font-display text-[#0A0B0E]">
              Your request is ready on WhatsApp
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you, <strong>{name.trim()}</strong>! We opened WhatsApp with your details filled in.
              Just press send. If it did not open, use the button below.
            </p>
            <div className="pt-4 flex flex-col gap-2">
              <Button asChild className="w-full bg-[#FFE600] hover:bg-black hover:text-white text-black font-extrabold rounded-xl transition-all">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="w-4 h-4" />
                  Open WhatsApp again
                </a>
              </Button>
              <Button onClick={resetAndClose} variant="outline" className="w-full bg-white border-[#E2E8F0] text-black hover:bg-[#F1F5F9] rounded-xl">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFE600] text-black text-xs font-bold mb-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-black animate-ping" aria-hidden="true" />
                Fixed-Price Quote
              </div>
              <h2 id={ids.title} className="text-2xl font-bold font-display text-[#0A0B0E]">
                Start Your Project
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Share your requirements and we will reply on WhatsApp with a clear quote and timeline.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor={ids.name} className={labelClass}>
                  Your Full Name *
                </label>
                <Input
                  id={ids.name}
                  required
                  autoComplete="name"
                  placeholder="e.g. Arun Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#F8F9FA] border-[#CBD5E1] text-[#0A0B0E] placeholder:text-slate-400 focus:border-black focus:ring-1 focus:ring-black rounded-xl"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? `${ids.name}-err` : undefined}
                />
                {errors.name && (
                  <p id={`${ids.name}-err`} className="mt-1 text-xs text-red-600 font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={ids.phone} className={labelClass}>
                    WhatsApp Phone *
                  </label>
                  <Input
                    id={ids.phone}
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="e.g. 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-[#F8F9FA] border-[#CBD5E1] text-[#0A0B0E] placeholder:text-slate-400 focus:border-black focus:ring-1 focus:ring-black rounded-xl"
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={errors.phone ? `${ids.phone}-err` : undefined}
                  />
                  {errors.phone && (
                    <p id={`${ids.phone}-err`} className="mt-1 text-xs text-red-600 font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor={ids.business} className={labelClass}>
                    Business / Brand Name
                  </label>
                  <Input
                    id={ids.business}
                    autoComplete="organization"
                    placeholder="e.g. Pondy Organics"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="bg-[#F8F9FA] border-[#CBD5E1] text-[#0A0B0E] placeholder:text-slate-400 focus:border-black focus:ring-1 focus:ring-black rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={ids.service} className={labelClass}>
                  Select Desired Service
                </label>
                <select
                  id={ids.service}
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] bg-[#F8F9FA] text-[#0A0B0E] text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                >
                  {/* Keep any custom label passed by a card (e.g. "Similar to X") selectable */}
                  {!SERVICE_OPTIONS.includes(service) && <option value={service}>{service}</option>}
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={ids.notes} className={labelClass}>
                  Brief Project Requirements (Optional)
                </label>
                <Textarea
                  id={ids.notes}
                  placeholder="Tell us about your target launch date, key features or competitors you like..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="bg-[#F8F9FA] border-[#CBD5E1] text-[#0A0B0E] placeholder:text-slate-400 focus:border-black focus:ring-1 focus:ring-black rounded-xl"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full flex-1 justify-center gap-2 bg-[#FFE600] hover:bg-black hover:text-white text-black font-extrabold rounded-xl shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  Send Quote Request on WhatsApp
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> We reply on WhatsApp
                </span>
                <a
                  href={`tel:+${SITE_CONFIG.phones.calls}`}
                  className="flex items-center gap-1 hover:text-black font-semibold"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-black" /> Call: {SITE_CONFIG.phones.callsDisplay}
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
