import { useEffect, useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'

interface Festival {
  id: string
  name: string
  start: string // YYYY-MM-DD, India time
  end: string // YYYY-MM-DD, inclusive
  greeting: string
  offer?: { enabled: boolean; text: string; cta?: string; intent?: string }
}

/** Today's date in India as YYYY-MM-DD, so every visitor sees the same festival window. */
function todayIST(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date())
}

/**
 * Shows a festival greeting (and an optional bonus offer) between the start and end
 * dates in /festivals.json. Hides itself outside the window, if malformed, or if the
 * visitor closes it for the session. The offer line never carries a price.
 */
export function FestivalBanner() {
  const [festival, setFestival] = useState<Festival | null>(null)
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    let alive = true
    fetch('/festivals.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { festivals?: Festival[] } | null) => {
        if (!alive || !j || !Array.isArray(j.festivals)) return
        const today = todayIST()
        const hit = j.festivals.find((f) => f && f.start <= today && today <= f.end)
        if (!hit) return
        let dismissed = false
        try {
          dismissed = sessionStorage.getItem(`festival-closed-${hit.id}`) === '1'
        } catch {
          /* storage unavailable: show the banner */
        }
        setClosed(dismissed)
        setFestival(hit)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  if (!festival || closed || !festival.greeting) return null
  const offer = festival.offer && festival.offer.enabled && festival.offer.text ? festival.offer : null

  const close = () => {
    setClosed(true)
    try {
      sessionStorage.setItem(`festival-closed-${festival.id}`, '1')
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="bg-[#FFE600]/10 border-b border-[#FFE600]/30 text-sm" role="region" aria-label={`${festival.name} greeting`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3">
        <Sparkles className="w-4 h-4 text-[#FFE600] shrink-0" aria-hidden="true" />
        <p className="flex-1 text-[#F8FAFC] leading-snug">
          <span className="font-semibold">{festival.greeting}</span>
          {offer && <span className="text-[#F8FAFC]/80"> {offer.text}</span>}
        </p>
        {offer && (
          <WhatsAppCTA
            src={`festival-${festival.id}`}
            intent={offer.intent || `I saw your ${festival.name} offer and would like details`}
            label={offer.cta || 'Ask about this offer'}
            variant="outline"
            size="sm"
            icon={false}
            className="shrink-0"
          />
        )}
        <button type="button" onClick={close} aria-label="Close greeting" className="shrink-0 p-1 text-[#F8FAFC]/60 hover:text-[#F8FAFC]">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
