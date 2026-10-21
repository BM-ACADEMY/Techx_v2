# BM TechX — Website & SEO Kit

Everything needed to build, optimise and automate the new bmtechx.in.

**Prepared 18 September 2026 · Target launch 9 November 2026**

---

## Start here

| You are | Read in this order |
|---|---|
| **Kamar** | `SEO-PLAN.md` → *Blocked until you decide* in `DEV-GUIDE.md` §2 → `TESTING.md` sign-off table |
| **Dev** | `DEV-GUIDE.md` §0 (today) → §4 build order → `autopilot/AUTOPILOT-SPEC.md` → `TESTING.md` |
| **Karthika** | `SEO-PLAN.md` → `seo/keyword-map.csv` → `tracking/` |
| **Imran** | `content/` — all copy is written, with the SEO built in |
| **Whoever tests** | `TESTING.md`, ticking `tracking/test-cases.csv` as you go |

---

## Files

```
README.md                      This file
DEV-GUIDE.md                   Build order, acceptance criteria, deploy rules
SEO-PLAN.md                    Month-by-month plan (client format — reusable)
TESTING.md                     134 tests, launch gate, regression suite, sign-off
PROOF-SYSTEM.md                8 proof block types, per-service map, empty-slot behaviour
COMPONENT-CONTRACT.md          What the developer may change freely — and what must not move

content/                       Page copy, SEO-ready, frontmatter carries all metadata
  00-home.md                   01-services-index.md
  02-website-development.md    03-ecommerce-website.md
  04-seo.md                    05-meta-ads.md
  06-social-media-marketing.md 07-whatsapp-automation.md
  08-pricing.md                09-about.md
  10-contact.md                11-industry-real-estate.md
  12-work-index.md

seo/
  robots.txt                   ← DEPLOY THIS FIRST
  keyword-map.csv              41 keywords, 6 tiers, target page each
  title-meta-map.csv           Title + meta + H1 for every page, char counts checked
  redirect-map.csv             Every 301, one hop
  schema/                      organization · localbusiness · service-seo ·
                               faq-home · article · breadcrumb-example

data/
  site.json                    Entity, NAP, phones, hours, team, profiles
  pricing.json                 Every price — site AND bot read this file
  proof.json                   Every case study, stat, testimonial, work sample — 37 slots
  theme.json                   All colour, type, spacing and ANIMATION tokens

autopilot/
  AUTOPILOT-SPEC.md            9 stages, 8 n8n workflows, test script, rollout
  guardrails.json              Hard rules. Load at the top of the Sales Engine.
  cta-links.md                 Source-tagged WhatsApp CTA for every page
  whatsapp-templates.md        12 message templates
  lead-payload.schema.json     One payload shape for every lead source

tracking/
  events-spec.md               GA4 events, UTMs, server-side, dashboard
  content-tracker.csv          18 pieces, 12 weeks, pre-filled
  test-cases.csv               134 tests, trackable — 12 marked as launch blockers
```

---

## Three rules that hold the kit together

**1 · Two files are the only source of truth.**
`data/site.json` and `data/pricing.json`. Nothing else hardcodes a price, a phone number or an
address. Change one file, it changes the website *and* what the WhatsApp assistant quotes. This
is what stops the pricing page and the bot disagreeing in front of a customer.

**2 · Every CTA carries its source.**
`wa.me/...?text=...%5Bsrc%3Aecom-page%5D`. The tag is invisible to the buyer and tells the
automation which page produced the lead, which product they want and which follow-up to run —
without asking a single qualifying question. Full map in `autopilot/cta-links.md`.

**3 · Proof is data, not markup.**
Every service page carries proof blocks that render from `data/proof.json`. An unfilled slot shows a
labelled placeholder on staging and **nothing at all** in production. Kamar fills one by changing
`EMPTY` to `FILLED` and adding the fields — no developer. See `PROOF-SYSTEM.md`.

**4 · The look and the motion are tokens.**
`data/theme.json` holds every colour, typeface, spacing value, radius and animation timing, plus one
switch (`motion.level`) that sets how animated the whole site is. The developer restyles the entire
site from that file without opening a content file. See `COMPONENT-CONTRACT.md`.

**5 · Every page answers one buyer trigger.**
Each content file's frontmatter carries a `buyer_trigger` number (1–8, from the Execution Pattern
document). No page and no post gets written without one. Content that answers no trigger is
content nobody was looking for.

---

## Do these two things today

**1. Open crawler access** — `DEV-GUIDE.md` §0.
Non-Google crawlers are being refused. ChatGPT, Perplexity and Claude cannot read a single page.
It's a config change, not a project.

**2. Lock the public NAP** — one address, one phone, into `data/site.json`.
Four deliverables, every directory and the LocalBusiness schema are all waiting on this one
answer. It's the only true blocker in the kit.

---

## Still marked PENDING

Fallbacks are written into the content files. **Do not invent values.**

- `nap.address_line` and `nap.phone` — Kamar
- `entity.gstin` — needed on the trust footer
- `profiles.*` — add each URL as the profile is claimed; they feed `Organization.sameAs`
- Client names on `/work/` — written permission required; sector-and-city fallbacks are in place
- BM Academy learner and placement figures — verify before publishing
- `CCBot` allow or disallow in `robots.txt` — Kamar's call, currently set to allow

---

## Companion documents

| Document | Covers |
|---|---|
| **Website Rebuild & Autopilot Plan** | What to build and why — audit, positioning, architecture, blueprints |
| **SEO Playbook 2026–27** | The method, plus the client-delivery SOP for the three SEO tiers |
| **Organic Lead Engine: Execution Pattern** | Who does what on which day — the 8 buyer triggers, production line, rhythm, targets |
| **This kit** | The files that turn all three into a deployed website |
