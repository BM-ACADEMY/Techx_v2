import { getSiteConfig } from '@/data/dataLayer'

/**
 * Secondary "prefer email?" link shown under the main WhatsApp button.
 * Opens a pre-written email. [src:...] is the last token so enquiries can be traced.
 */
export function EmailCTA({ src, subject, tone = 'dark' }: { src: string; subject: string; tone?: 'dark' | 'light' }) {
  const email = getSiteConfig().contact.email || 'admin@bmtechx.in'
  const body = `Hi BM TechX,\n\nMy business name:\nWhat I need:\nMy city:\n\nPlease send a written scope and price. [src:${src}]`
  const href = `mailto:${email}?subject=${encodeURIComponent(`Enquiry from bmtechx.in: ${subject}`)}&body=${encodeURIComponent(body)}`
  const muted = tone === 'dark' ? 'text-bm-brand-soft' : 'text-bm-ink-muted'
  const link = tone === 'dark' ? 'text-white' : 'text-bm-navy'
  return (
    <p className={`text-xs sm:text-sm ${muted} text-center mt-3`}>
      Prefer email?{' '}
      <a href={href} className={`font-bold underline underline-offset-2 ${link}`}>
        Write to {email}
      </a>
      . We reply within one working day.
    </p>
  )
}
