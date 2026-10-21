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

console.log(`prerender-meta: wrote ${count} route shells and sitemap.xml`)
