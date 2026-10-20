# DEV GUIDE — bmtechx.in rebuild

Everything needed to build and ship the new site. Read this file top to bottom once before
writing any code.

**Target launch: 9 November 2026.**

---

## 0 · The one thing to do today

`seo/robots.txt` — **open crawler access.**

bmtechx.in currently refuses non-Google crawlers. Google indexes the site fine, so this is an
allow-list somewhere: either a `robots.txt` rule or a bot-management setting at the CDN.

**Why it matters:** ChatGPT, Perplexity, Claude and Copilot cannot read a single page. In a year
when most local searches return an AI answer, the site is ineligible for all of them. It also
blocks Ahrefs, Semrush and Screaming Frog, which is why the site has never been properly audited.

**Acceptance test.** From outside the office network, with a non-Google user agent:

```bash
for url in / /pricing.html /blog/seo-services-pondicherry.html; do
  curl -s -o /dev/null -w "%{http_code} $url\n" \
    -A "Mozilla/5.0 (compatible; TestBot/1.0)" "https://bmtechx.in$url"
done
```

All must return `200`. Check the CDN rules separately — a permissive `robots.txt` means nothing
if the edge returns 403.

This is a configuration change, not a project. It is the highest-leverage hour available.

---

## 1 · What's in this kit

```
bmtechx-web-kit/
├── README.md                     Start here
├── DEV-GUIDE.md                  This file
├── SEO-PLAN.md                   Month-by-month plan, client format
├── content/                      Page copy, SEO-ready, with frontmatter
├── seo/                          robots, keyword map, redirects, JSON-LD
│   └── schema/
├── data/                         site.json + pricing.json — single sources of truth
├── autopilot/                    Spec, guardrails, CTA map, templates, payload schema
└── tracking/                     Event spec, content tracker
```

**Two files govern everything:**

- `data/site.json` — entity, NAP, phone numbers, hours, team, profiles
- `data/pricing.json` — every price on the site *and* every price the WhatsApp assistant may quote

Nothing else may hardcode a price, a phone number or an address. Change one file, it changes
everywhere. This is what stops the pricing page and the bot disagreeing in front of a customer.

---

## 2 · Blocked until Kamar decides

| Blocker | Blocks | Why it can't be worked around |
|---|---|---|
| **Public NAP** — one address, one phone | `/contact/`, LocalBusiness schema, trust footer, all directories | Name-address-phone consistency is a top local ranking factor. Guessing and fixing later means rebuilding every citation. |
| **GSTIN** | Trust footer, invoices | Needed on the footer for trigger 1. |
| **Client name permissions** | `/work/`, case study cards | Publishing a client name without written permission is not acceptable. Fallbacks are in the content files. |
| **CCBot allow/disallow** | `robots.txt` | Genuinely Kamar's call. Default in the file is allow. |

Build everything else. Use the fallbacks written into the content files. Do **not** invent values.

---

## 3 · Stack

**Recommended: Astro.** Static HTML output — which is what search and AI crawlers want — with
content collections for blog posts and case studies, so nobody edits the same navigation in
nineteen places.

**Honest trade-off:** a build step and a short learning curve. If the team can't absorb that
inside this window, ship as plain static files. The architecture works either way. Do **not**
let this decision delay the launch.

```
Framework   Astro 5.x (or plain static HTML)
Styling     Hand-written CSS. No Tailwind, no Bootstrap.
JS          Vanilla only. No jQuery. No framework for a brochure site.
Images      AVIF + WebP fallback, explicit width/height
Fonts       Self-hosted, 2 weights max, font-display: swap
Hosting     Current host is fine. Add a CDN with correct bot rules.
Forms       POST to the n8n webhook. Never to an inbox.
```

---

## 4 · Build order

D1–D4 are blockers: content has nowhere to land and no way to convert without them.

| ID | Ticket | Acceptance criteria — not done until this is true |
|---|---|---|
| **D1** | Open crawler access | Section 0 test returns 200 on all sampled URLs, verified at the CDN layer |
| **D2** | Title / meta / canonical system | Any page's title, description and canonical settable without touching a template. No two pages share a title. Values from `seo/title-meta-map.csv`. |
| **D3** | URL structure + 301 map | Every row in `seo/redirect-map.csv` live. `curl -sIL` shows exactly **one** 301. Zero chains. |
| **D4** | Blog article template | Named author + bio link, published and updated dates, TOC, FAQ block, related posts, WhatsApp CTA, `Article` schema. **Renders correctly with JavaScript disabled.** |
| **D5** | Service page template | All blocks from the content files, including delivery badge, "who this is not for", case study cards |
| **D6** | Pricing engine | Changing `data/pricing.json` updates every price on the site **and** the price the bot quotes. Verified by changing one value and checking both. |
| **D7** | Schema layer | All files in `seo/schema/` validate with zero errors in Google's Rich Results Test. Live reviews block rendering. |
| **D8** | WhatsApp CTA component | One component used everywhere, auto-generating the prefilled message from `src`. Sticky mobile bar. Every tag in `autopilot/cta-links.md` implemented. |
| **D9** | Forms → n8n + server events | Submission writes to the leads sheet with source and UTM **before** any reply fires. GA4 and Meta CAPI server events confirmed in both dashboards. |
| **D10** | Auto sitemap + indexing ping | Publishing a post updates `sitemap.xml` and pings Search Console with nobody remembering to |
| **D11** | Performance budget | LCP < 2.0s on a mid-range Android over 4G. Page weight < 500KB. Hero image < 120KB. |
| **D12** | Legal pages + real 404 | Privacy, terms, refund, cookie consent live. 404 offers search and top services. |
| **D13** | Analytics & event spec | Every event in `tracking/events-spec.md` firing with correct parameters |
| **D14** | Staging + deploy checklist | Staging is `noindex`. Production deploy runs the section 7 checklist. |

---

## 5 · Page build order

Build in this order — it front-loads the pages that earn money.

**Sprint 1 (27 Sep – 11 Oct)**
`/` · `/pricing/` · `/contact/` · `/services/` · website-development · ecommerce · seo · meta-ads · social-media

**Sprint 2 (12 – 26 Oct)**
`/work/` + 2 case studies · `/about/` · `/industries/real-estate/` · blog migration · whatsapp-automation · all schema

**Sprint 3 (27 Oct – 9 Nov)**
CTA tags everywhere · webhook + server events · booking flow · guardrails · legal pages · redirects · performance · **launch**

Copy for every page is in `content/`, with frontmatter carrying title, meta, keywords, schema
types and CTA source tag. Do not rewrite it during build — if something reads wrong, flag it to
Imran rather than fixing it in the template.

---

## 6 · Non-negotiables

1. **Server-render everything.** Content that only exists after hydration is invisible to most AI crawlers. Test with JavaScript off.
2. **Answer-first openings survive design.** The first paragraph of every page is what gets extracted into AI answers and snippets. Do not let a hero image push it below the fold.
3. **One H1 per page.** Never style-by-heading.
4. **Explicit width and height on every image.** This is most of your CLS.
5. **No chat widget loading 300KB before anyone asks.** Load on interaction.
6. **No CAPTCHA.** At this volume it blocks more real leads than spam. Honeypot + time-to-submit check instead.
7. **Test on a mid-range Android on mobile data.** Not office wi-fi, not an iPhone. That is the actual buyer.
8. **Never hardcode a price, phone number or address.** They come from `data/`.

---

## 7 · Deploy

**Cadence**

| When | What | Rule |
|---|---|---|
| Tuesday, before 4pm | Feature deploy | Time to catch a problem the same day |
| Friday pm | Content deploy | Never alongside a code change — if something breaks you need to know which one did it |
| Any time | Hotfix | Site down, form broken, wrong price live. **These three only.** |
| Never | — | No deploys after 5pm Friday or on Saturday |

**Post-deploy check — five minutes, every time**

1. Homepage and one deep page load on mobile data
2. Submit the contact form; confirm the row appears on the leads sheet
3. Tap a WhatsApp CTA; confirm the prefilled message carries the right `src` tag
4. View source on one page; confirm no `noindex` and the canonical is correct
5. Search Console → URL Inspection on whatever just published

Whoever deploys posts `✓ post-deploy check done` in the team group. No exceptions — this is how
a silent form failure gets caught in an hour instead of a month.

**Launch day, additionally**

- [ ] `noindex` removed from production *(the single most common launch-day disaster)*
- [ ] Every redirect in `redirect-map.csv` verified with `curl -sIL`
- [ ] New sitemap submitted in Search Console and Bing
- [ ] Top 10 URLs manually requested for indexing
- [ ] All schema passes the Rich Results Test
- [ ] Every CTA tapped on a real phone
- [ ] Baseline export confirmed saved **before** any of this

Expect a 2–4 week ranking wobble after a URL structure change. **Do not panic-revert during it.**

---

## 8 · Handover to Karthika

When the build is done she must be able to, without asking dev:

- Publish a blog post with title, meta, author, schema and internal links
- Change a price in one file and see it update everywhere, site and bot
- Add a case study
- Read every analytics event and know what it means
- See which CTA produced which lead

If any of those needs a developer, D2, D4, D6 or D13 isn't finished.
