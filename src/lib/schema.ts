import { useEffect } from 'react'
import siteJson from '@/data/site.json'

/**
 * Shared JSON-LD builders.
 *
 * LocalBusiness facts (phone, street, map pin, opening hours) are read from
 * src/data/site.json ONLY, so the schema can never drift from what the page shows.
 * Hours come from contact.hours (the same values the Contact page prints).
 * Phone, street and map pin come from the `gbp` block, which must be copied
 * character for character from the verified Google Business Profile.
 */

export const ORIGIN = 'https://bmtechx.in'
export const ORG_ID = `${ORIGIN}/#organization`
export const LOCAL_BUSINESS_ID = `${ORIGIN}/#localbusiness`

type Json = Record<string, unknown>

interface GbpBlock {
  verified: boolean
  telephone: string
  street: string
  latitude: number | null
  longitude: number | null
  maps_url: string
}

const site = siteJson as unknown as {
  brand: { name: string }
  entity: {
    registered_address: { locality: string; region: string; postal_code: string; country: string }
  }
  contact: { email: string; hours: { mon_fri: string; sat: string; sun: string } }
  gbp: GbpBlock
}

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

/** "10:00-19:00" -> { opens: "10:00", closes: "19:00" }; "closed" -> null */
const parseRange = (range: string) => {
  const m = /^(\d{2}:\d{2})-(\d{2}:\d{2})$/.exec(range.trim())
  return m ? { opens: m[1], closes: m[2] } : null
}

/** Builds openingHoursSpecification from site.json contact.hours, merging days with identical hours. */
export function openingHours(): Json[] {
  const { mon_fri, sat, sun } = site.contact.hours
  const days: [string[], string][] = [
    [WEEKDAYS, mon_fri],
    [['Saturday'], sat],
    [['Sunday'], sun],
  ]
  const groups = new Map<string, string[]>()
  for (const [names, range] of days) {
    if (!parseRange(range)) continue
    groups.set(range, [...(groups.get(range) ?? []), ...names])
  }
  return [...groups.entries()].map(([range, dayOfWeek]) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek,
    ...parseRange(range),
  }))
}

const CITIES = ['Puducherry', 'Cuddalore', 'Villupuram', 'Chennai', 'Madurai']

/** The one LocalBusiness (ProfessionalService) node. Use on Home and Contact only. */
export function localBusinessSchema(): Json {
  const { gbp, entity, brand, contact } = site
  const addr = entity.registered_address
  const node: Json = {
    '@type': 'ProfessionalService',
    '@id': LOCAL_BUSINESS_ID,
    name: brand.name,
    url: `${ORIGIN}/`,
    image: `${ORIGIN}/og-image.png`,
    telephone: gbp.telephone,
    email: contact.email,
    priceRange: '₹₹',
    parentOrganization: { '@id': ORG_ID },
    address: {
      '@type': 'PostalAddress',
      streetAddress: gbp.street,
      addressLocality: addr.locality,
      addressRegion: addr.region,
      postalCode: addr.postal_code,
      addressCountry: addr.country,
    },
    openingHoursSpecification: openingHours(),
    areaServed: CITIES.map((name) => ({ '@type': 'City', name })),
    knowsLanguage: ['en', 'ta'],
  }
  if (gbp.maps_url) node.hasMap = gbp.maps_url
  // Only publish a map pin once it has been copied from the Google Business Profile.
  // A guessed pin is worse than none.
  if (gbp.latitude != null && gbp.longitude != null) {
    node.geo = { '@type': 'GeoCoordinates', latitude: gbp.latitude, longitude: gbp.longitude }
  }
  return node
}

export interface Crumb {
  name: string
  path: string // e.g. "/services/seo/"
}

/** BreadcrumbList from a list of crumbs. Always starts at Home. */
export function breadcrumbSchema(crumbs: Crumb[]): Json {
  const all = [{ name: 'Home', path: '/' }, ...crumbs]
  return {
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${ORIGIN}${c.path}`,
    })),
  }
}

export interface ServiceOffer {
  name: string
  price: number
  description?: string
}

/** Service node for a service page. Prices must come from pricing.json, never typed by hand. */
export function serviceSchema(opts: {
  path: string
  name: string
  serviceType: string
  description: string
  offers?: ServiceOffer[]
}): Json {
  const url = `${ORIGIN}${opts.path}`
  const node: Json = {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url,
    provider: { '@id': LOCAL_BUSINESS_ID },
    areaServed: [
      ...CITIES.map((name) => ({ '@type': 'City', name })),
      { '@type': 'State', name: 'Tamil Nadu' },
    ],
  }
  if (opts.offers?.length) {
    node.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${opts.name} plans`,
      itemListElement: opts.offers.map((o) => ({
        '@type': 'Offer',
        name: o.name,
        price: o.price,
        priceCurrency: 'INR',
        ...(o.description ? { description: o.description } : {}),
      })),
    }
  }
  return node
}

/** Injects a JSON-LD <script> into <head> with a stable id and removes it on unmount. */
export function useJsonLd(id: string, graph: Json[] | null) {
  const text = graph ? JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) : ''
  useEffect(() => {
    if (!text) return
    let el = document.getElementById(id) as HTMLScriptElement | null
    if (!el) {
      el = document.createElement('script')
      el.id = id
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = text
    return () => {
      el?.remove()
    }
  }, [id, text])
}
