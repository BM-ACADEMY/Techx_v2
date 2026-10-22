import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

interface Slots {
  enabled: boolean
  month: string // YYYY-MM
  total: number
  left: number
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/**
 * Shows real onboarding capacity from /slots.json (edited by hand on the server).
 * Hides itself if disabled, malformed, or if the month is not the current month,
 * so it can never show stale or invented numbers.
 */
export function SlotsBanner({ className = '' }: { className?: string }) {
  const [slots, setSlots] = useState<Slots | null>(null)

  useEffect(() => {
    let alive = true
    fetch('/slots.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: Slots | null) => {
        if (alive && j) setSlots(j)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  if (!slots || !slots.enabled) return null
  const now = new Date()
  const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  if (slots.month !== current) return null
  if (!Number.isFinite(slots.total) || !Number.isFinite(slots.left) || slots.total <= 0) return null
  const left = Math.max(0, Math.min(slots.left, slots.total))
  const month = MONTHS[now.getMonth()]

  return (
    <div className={`inline-flex items-center gap-2 text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 px-3.5 py-1.5 rounded-full ${className}`}>
      <Clock className="w-3.5 h-3.5" />
      <span>
        {left > 0
          ? `${left} of ${slots.total} new-client slots left for ${month}`
          : `${month} slots are full. Message us to join the waitlist.`}
      </span>
    </div>
  )
}
