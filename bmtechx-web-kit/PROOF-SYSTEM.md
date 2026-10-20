# PROOF SYSTEM

Every service page carries proof. Where there is no proof yet, the page carries a **labelled empty
slot** that Kamar fills later without a developer.

This is the part of the site that turns a visitor into a buyer. Copy explains what you do; proof is
what makes someone believe it.

---

## The principle

> A business owner in Tamil Nadu has been let down before. He is not evaluating your services —
> he is managing the risk of paying you. Proof is how that risk drops.

So every service page must answer three questions **before** the price is even considered:

1. **Have you done this before?** → case study, work sample
2. **Did it work?** → result strip, before/after
3. **Will you still be here in six months?** → credential, testimonial, registered entity

A service page with no proof block is not finished, even if every word on it is right.

---

## The eight block types

| Type | What it is | Strongest for | Needs permission? |
|---|---|---|---|
| **result_strip** | 3–4 hard numbers in a row | Every page. The fastest proof to read. | No, if aggregated |
| **case_study** | Client, sector, city, one headline number | Ads, SEO, custom builds | Yes, for the name |
| **before_after** | One metric, before and after, period stated | SEO, ads | Usually |
| **testimonial** | Named person, role, business | Every page | Yes |
| **logo_wall** | Client logos | Homepage | Yes, each one |
| **work_sample** | Screenshot or photo of the thing you built | Websites, stores, social | Sometimes |
| **credential** | Registration, GST, certifications, PageSpeed score | Every page | No |
| **live_metric** | Google rating and review count, pulled at build | Homepage, contact | No |

**No anonymous testimonials, ever.** A quote without a name is worth less than no quote — buyers
discount it and AI systems cannot use it. If a client will not go on record, publish the case study
without a quote.

---

## Which blocks go on which page

Order matters: strongest proof highest.

| Page | Proof blocks, in order |
|---|---|
| **Home** | result_strip (global) · logo_wall or sector chips · featured case_study · live_metric |
| **Website development** | work_sample ×6 · result_strip · credential (PageSpeed) · case_study · testimonial |
| **Ecommerce** | work_sample ×4 · result_strip · case_study · testimonial |
| **SEO** | before_after · case_study · result_strip · work_sample (sample report) · testimonial |
| **Meta Ads** | **result_strip (FILLED)** · case_study · before_after (CPL by sector) · work_sample · testimonial |
| **Social media** | result_strip (own page metrics) · work_sample ×6 · case_study · testimonial |
| **WhatsApp automation** | credential (we run our own on it) · work_sample (transcript) · result_strip · case_study |
| **Custom builds** | case_study · work_sample ×4 |
| **Industry pages** | Inherit the parent service's proof. Add industry-specific items only. |

Each service's blocks are defined in **`data/proof.json`**. Nothing is hardcoded in a template.

---

## The empty slot — the important part

An unfilled slot is **not** a blank space and **not** "coming soon". It behaves differently in two
places:

### On staging — a labelled placeholder

```
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│                                                  │
│   PROOF SLOT — work_sample                       │
│   Screenshot of a site you built                 │
│                                                  │
│   Needs: 6 screenshots of real sites, each with  │
│   business name (or sector + city), what it      │
│   does, delivery time, live URL if permitted.    │
│                                                  │
│   web-samples · 380 × 260 · proof.json           │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

Dashed amber outline. Shows the block type, what goes there, exactly what is needed, the slot id,
and the space it will occupy — so Kamar knows what to supply and can see the page will still look
right once it is filled.

### On production — nothing at all

The slot renders **nothing**. No box, no placeholder, no "coming soon". The section reflows as
though the slot were not there, and a section whose slots are **all** empty hides entirely.

**Why it matters:** a visible empty box says "this business has no clients". Silence says nothing.
Silence is better. And because staging shows the slot loudly, an empty slot can never ship
unnoticed.

Configured in `data/theme.json` → `proof_slot`.

---

## Filling a slot — Kamar, five minutes, no developer

Open `data/proof.json`, find the slot by its id, and:

1. Change `"status": "EMPTY"` to `"status": "FILLED"`
2. Add the fields the block type needs
3. Delete the `_needs` and `_placeholder_text` lines
4. Save

That is all. The block appears on the next build.

**Before:**
```json
{
  "id": "web-testimonial-1",
  "type": "testimonial",
  "status": "EMPTY",
  "_needs": "Named client, role, business.",
  "_placeholder_text": "Client quote — name, role, business"
}
```

**After:**
```json
{
  "id": "web-testimonial-1",
  "type": "testimonial",
  "status": "FILLED",
  "quote": "The site was live in two days and we had three enquiries the first week.",
  "name": "[NAME]",
  "role": "Owner",
  "business": "[BUSINESS]",
  "city": "Cuddalore",
  "photo": "/assets/proof/[slug].jpg"
}
```

**A `FILLED` item missing a required field fails the build.** That is deliberate — it makes a
half-filled proof block impossible to ship.

### The third status: DRAFT

`DRAFT` means the content is written but something is outstanding — usually permission, sometimes a
number that does not exist yet. It behaves exactly like `EMPTY` (hidden in production) but the
staging placeholder shows the drafted content, so you can see how it will look while you chase the
missing piece.

---

## What is filled today, and what is not

Thirty-seven slots across the site. Two are `FILLED` at launch. That is the honest position.

| Status | Count | Which |
|---|---|---|
| **FILLED** | 2 | Meta Ads result strip — 500 verified leads, 3 districts, under ₹40 target CPL · Company registration credential (CIN), sitewide |
| **DRAFT** | 7 | Real estate case study · Balified Villa SEO · NPP social metrics · BM Academy figures (×2) · hotel booking build · "we run our own agency on it" |
| **EMPTY** | 28 | Everything else |

**This is not a problem to hide. It is a list of work.** Every `DRAFT` needs one specific thing —
a permission, a verification, or a number that arrives on a known date.

---

## The eight things worth doing first

Ranked by impact against effort. Items 1–4 need nobody's permission and can be done this week.

| # | Do this | Unblocks | Effort |
|---|---|---|---|
| 1 | Screenshot 6 sites you have built | `web-samples` — the highest-converting block on your biggest-traffic page | 1 hour |
| 2 | Run PageSpeed on one of your sites, screenshot the green score | `web-credential-speed` — proves the custom-coded claim, instantly verifiable | 15 min |
| 3 | Anonymise one page of a real monthly report | `seo-sample-report` — shows the buyer exactly what they receive | 30 min |
| 4 | Pull a current 30-day Instagram insights screenshot | `smm-strip-own` — real numbers, your own page, no permission needed | 15 min |
| 5 | Ask the real-estate client for name permission | `ads-case-realestate` — your strongest asset on the whole site | One call |
| 6 | Count your actual clients and projects | `g-stat-clients`, `g-stat-projects` | 1 hour |
| 7 | Verify the BM Academy 1,400 / 150 figures | `g-stat-academy`, schools industry page | 1 hour |
| 8 | Claim the Google Business Profile, get to 10 reviews | `g-live-reviews` | Ongoing |

Items 1–4 take **two hours in total** and fill four slots across three service pages. Start there.

---

## Rules that protect you

1. **Never invent a number.** Not a rounded one, not a "conservative estimate". One invented figure that a client questions costs more than every empty slot on the site.
2. **Aggregate before you publish.** "500 leads across four projects" is safe. One client's exact spend is not.
3. **Written permission for every client name**, before publishing — not a verbal yes. The checklist is in `content/12-work-index.md`.
4. **Every claim needs a source you could produce** if challenged. Screenshot, invoice, report, log.
5. **Date your proof.** "5.08 lakh views, 26 June – 25 July 2026" beats "5 lakh+ views" — it is checkable, and checkable claims are what AI systems cite.
6. **Refresh quarterly.** A case study from two years ago reads as the last time anything went well.
7. **Own-brand proof is legitimate** when labelled as such. "What we do with our own property brand's page" is honest and strong. Presenting it as a client result is not.

---

## Proof and AI visibility

The same blocks do a second job. Specific, dated, attributed claims are exactly what language
models quote when someone asks "who does digital marketing in Pondicherry" — and three of the top
five AI-visibility factors are citation and mention signals.

A page saying *"we deliver measurable results"* gives a model nothing to quote. A page saying
*"500 phone-verified property leads across Madurai, Trichy and Namakkal against a target cost per
lead under ₹40"* gives it a sentence it can lift with your name attached.

**Filling these slots is SEO work, not just sales collateral.** Treat it with the same priority.
