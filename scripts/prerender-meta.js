// Runs after `vite build`. For every route in src/data/seo-routes.json it writes
// dist/<route>/index.html: the normal app shell with that page's own title, description,
// canonical and social tags already in the HTML. Crawlers and WhatsApp/LinkedIn previews
// read these without running JavaScript; visitors still get the normal React app.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ORIGIN = 'https://bmtechx.in'
const routes = JSON.parse(fs.readFileSync(path.join(root, 'src/data/seo-routes.json'), 'utf-8'))
const shell = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const swap = (html, re, replacement) => {
  if (!re.test(html)) throw new Error(`prerender-meta: pattern not found: ${re}`)
  return html.replace(re, replacement)
}

// ---------------------------------------------------------------------------------------------
// Prices in the HTML itself. Each page's <noscript> block gets the real prices for that page,
// read from src/data/pricing.json (the same file the React pages use), so the prices are in
// view-source and readable with JavaScript switched off. Nothing here is typed by hand.
const pricing = JSON.parse(fs.readFileSync(path.join(root, 'src/data/pricing.json'), 'utf-8'))
const inr = (n) => '₹' + Number(n).toLocaleString('en-IN')
const per = (i) => (i.period === 'month' || i.unit === 'month' ? ' a month' : i.unit === 'package' ? ' per package' : '')
const trimSlash = (p) => p.replace(/\/+$/, '') || '/'
// Extras are grouped; each group has its own service page.
const GROUP_PAGE = {
  'digital-invitations': '/services/digital-invitations',
  'lead-generation': '/services/lead-generation',
  'personal-branding': '/services/personal-branding',
  'catering-branding': '/services/catering-branding',
  'add-ons': '/services/quick-start-add-ons',
}
const priced = [...pricing.one_time, ...pricing.monthly, ...pricing.extras].filter((i) => typeof i.price === 'number')
const pageOf = (i) => (i.page ? trimSlash(i.page) : GROUP_PAGE[i.group] || null)

const itemHtml = (i, withIncludes) => {
  let s = `<li><strong>${esc(i.name)}</strong>: ${inr(i.price)}${per(i)}`
  if (i.delivery) s += ` (ready in ${esc(i.delivery)})`
  if (i.upfront_3_months && i.upfront_3_months.price) s += `, or ${inr(i.upfront_3_months.price)} for 3 months paid upfront`
  if (withIncludes && Array.isArray(i.includes) && i.includes.length) s += `<br><small>Includes: ${i.includes.map(esc).join(', ')}</small>`
  return s + '</li>'
}
const quoteHtml = (i) => `<li><strong>${esc(i.name)}</strong>: price on request. ${esc(i.note || '')}</li>`
const gstLine = pricing.prices_exclude_gst ? `<p><small>Prices exclude ${pricing.gst_percent}% GST.</small></p>` : ''
const summary = () => {
  const from = (ids) => Math.min(...priced.filter((i) => ids.includes(i.id)).map((i) => i.price))
  return `<ul>
<li>Websites from ${inr(from(['web-single', 'web-multi']))}</li>
<li>Online stores from ${inr(from(['store']))}</li>
<li>Google Maps SEO from ${inr(from(['seo-starter', 'seo-growth', 'seo-business']))} a month</li>
<li>Meta Ads management from ${inr(from(['meta-ads']))} a month</li>
<li>Instagram management from ${inr(from(['smm-starter', 'smm-growth', 'smm-business']))} a month</li>
<li>Digital invitations from ${inr(Math.min(...priced.filter((i) => i.group === 'digital-invitations').map((i) => i.price)))}</li>
</ul>
<p><a href="/pricing/">See every price on the pricing page</a></p>`
}

const pricesFor = (routePath) => {
  const p = trimSlash(routePath)
  if (p === '/pricing') {
    const block = (title, items, withIncludes = true) => (items.length ? `<h2>${title}</h2><ul>${items.map((i) => itemHtml(i, withIncludes)).join('\n')}</ul>` : '')
    return block('One-time projects', pricing.one_time.filter((i) => typeof i.price === 'number')) +
      block('Monthly services', pricing.monthly.filter((i) => typeof i.price === 'number')) +
      block('Extras and add-ons', pricing.extras, false) +
      `<h2>Priced after a short call</h2><ul>${pricing.quote_only.map(quoteHtml).join('\n')}</ul>` + gstLine
  }
  const own = priced.filter((i) => pageOf(i) === p)
  const quote = pricing.quote_only.filter((i) => i.page && trimSlash(i.page) === p)
  if (own.length) {
    return `<h2>Prices</h2><ul>${own.map((i) => itemHtml(i, true)).join('\n')}${quote.map(quoteHtml).join('\n')}</ul>${gstLine}<p><a href="/pricing/">All prices</a></p>`
  }
  if (quote.length) {
    // Quote-only page (no fixed price): say so, then list the published prices for everything else.
    return `<h2>Price</h2><ul>${quote.map(quoteHtml).join('\n')}</ul><h2>Our published prices</h2>${summary()}${gstLine}`
  }
  return `<h2>Our published prices</h2>${summary()}${gstLine}`
}

const noscriptFor = (r) => `<noscript>
      <main style="max-width:720px;margin:48px auto;padding:0 16px;font-family:system-ui,sans-serif;line-height:1.6;color:#F8FAFC">
        <style>noscript main a{color:#FFE600}noscript main h1,noscript main h2{color:#FFFFFF;margin:1.2em 0 .4em}noscript main h1{font-size:1.6em;line-height:1.25}noscript main h2{font-size:1.2em}</style>
        <h1>${esc(r.title.replace(/\s*\|\s*BM TechX\s*$/, ''))}</h1>
        <p>${esc(r.description)}</p>
        ${pricesFor(r.path)}
        <h2>Contact BM TechX</h2>
        <ul>
          <li>WhatsApp: <a href="https://wa.me/919944940051">+91 99449 40051</a></li>
          <li>Phone: <a href="tel:+919944940051">+91 99449 40051</a></li>
          <li>Email: <a href="mailto:admin@bmtechx.in">admin@bmtechx.in</a></li>
        </ul>
      </main>
    </noscript>`

let count = 0
for (const r of routes) {
  const url = r.path === '/' ? `${ORIGIN}/` : `${ORIGIN}${r.path}/`
  let html = shell
  html = swap(html, /<title>.*?<\/title>/s, `<title>${esc(r.title)}</title>`)
  html = swap(html, /<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(r.description)}"`)
  html = swap(html, /<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`)
  html = swap(html, /<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(r.title)}"`)
  html = swap(html, /<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(r.description)}"`)
  html = swap(html, /<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`)
  html = swap(html, /<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${esc(r.title)}"`)
  html = swap(html, /<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${esc(r.description)}"`)
  html = swap(html, /<noscript>\s*<main[\s\S]*?<\/noscript>/, () => noscriptFor(r))
  if (r.path === '/') {
    fs.writeFileSync(path.join(dist, 'index.html'), html)
  } else {
    const dir = path.join(dist, r.path)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'), html)
  }
  count++
}

// Sitemap generated from the same list so it can never drift
const today = new Date().toISOString().slice(0, 10)
const urls = routes
  .map((r) => `  <url>\n    <loc>${r.path === '/' ? `${ORIGIN}/` : `${ORIGIN}${r.path}/`}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n')
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
)

console.log(`prerender-meta: wrote ${count} route shells (with prices in <noscript>) and sitemap.xml`)
