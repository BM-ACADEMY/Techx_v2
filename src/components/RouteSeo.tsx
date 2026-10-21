import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import routes from '@/data/seo-routes.json'

const ORIGIN = 'https://bmtechx.in'

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Keeps title, description, canonical and social tags in sync with the current route.
 * The same src/data/seo-routes.json file feeds scripts/prerender-meta.js, so crawlers and
 * link previews get these exact tags without running JavaScript.
 */
export function RouteSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
    const route = routes.find((r) => r.path === clean)
    const url = `${ORIGIN}${clean === '/' ? '/' : `${clean}/`}`

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }

    if (!route) {
      // Unknown URL (404 page): keep it out of the index
      document.title = 'Page Not Found (404) | BM TechX'
      setMeta('meta[name="robots"]', 'name', 'robots', 'noindex, follow')
      return
    }

    setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large')
    document.title = route.title
    setMeta('meta[name="description"]', 'name', 'description', route.description)
    canonical.href = url
    setMeta('meta[property="og:title"]', 'property', 'og:title', route.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', route.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', route.title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', route.description)
  }, [pathname])

  return null
}

export default RouteSeo
