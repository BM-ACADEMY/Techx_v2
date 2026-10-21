import { SITE_CONFIG } from '@/data/siteData'

/** Build a wa.me link with a pre-filled message. */
export const buildWhatsAppUrl = (message?: string): string => {
  const base = `https://wa.me/${SITE_CONFIG.phones.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/**
 * Open WhatsApp in a new tab. Call this directly from a click/submit handler
 * (never from a timer) so browsers do not block it as a popup.
 */
export const openWhatsApp = (message?: string): void => {
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
}

/**
 * Fire-and-forget lead capture. Set VITE_LEAD_ENDPOINT to a Google Apps Script
 * web app URL (or any endpoint that accepts a JSON POST) to store every lead.
 * Returns true if a request was sent; never throws.
 */
const DEFAULT_LEAD_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbymJUvwGtNdO4AfINxNGrwiVvoLcJiUCTYxeNuzAyPQ7sAhfMPJSch31og7YxbQ8rk/exec'

export const sendLead = (lead: Record<string, string>): boolean => {
  const endpoint =
    (import.meta.env.VITE_LEAD_ENDPOINT as string | undefined) || DEFAULT_LEAD_ENDPOINT
  if (!endpoint) return false
  try {
    void fetch(endpoint, {
      method: 'POST',
      // text/plain avoids a CORS preflight, which Apps Script web apps do not answer
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...lead, submittedAt: new Date().toISOString() }),
      keepalive: true,
    }).catch(() => undefined)
    return true
  } catch {
    return false
  }
}

/** Indian mobile numbers: optional +91/91/0 prefix, then 10 digits starting 6-9. */
export const isValidIndianMobile = (value: string): boolean => {
  const digits = value.replace(/[\s\-()]/g, '').replace(/^(\+?91|0)/, '')
  return /^[6-9]\d{9}$/.test(digits)
}
