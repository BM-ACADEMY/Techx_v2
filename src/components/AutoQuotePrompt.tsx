import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const KEY = 'bm-quote-prompt-shown'

/**
 * Opens the quote form once per visit on the home page, on desktop only,
 * after the visitor has had time to read (30 seconds or 60% scroll).
 * Never on phones: an instant full-screen popup on mobile can hurt Google rankings
 * and annoy visitors. Never again after it has been shown or the visitor opened any
 * quote form themselves.
 */
export function AutoQuotePrompt({ isBusy, onOpen }: { isBusy: boolean; onOpen: () => void }) {
  const { pathname } = useLocation()
  const busyRef = useRef(isBusy)
  busyRef.current = isBusy
  const openRef = useRef(onOpen)
  openRef.current = onOpen

  useEffect(() => {
    if (pathname !== '/') return
    if (typeof window === 'undefined' || !window.matchMedia('(min-width: 1024px)').matches) return
    try {
      if (sessionStorage.getItem(KEY) === '1') return
    } catch {
      /* storage blocked: still allow, it will just repeat on reload */
    }

    let done = false
    const fire = () => {
      if (done) return
      done = true
      if (busyRef.current) return
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        /* ignore */
      }
      openRef.current()
    }

    const timer = window.setTimeout(fire, 30000)
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max > 0 && window.scrollY / max > 0.6) fire()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [pathname])

  return null
}
