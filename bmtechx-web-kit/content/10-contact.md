---
url: /contact/
template: contact
title: "Contact BM TechX | Pondicherry Digital Agency"
meta_description: "Message us on WhatsApp and get a written scope and price before you pay anything. Based in Puducherry, working across Tamil Nadu."
h1: "Talk to us on WhatsApp"
primary_keyword: "bm techx contact"
buyer_trigger: 8   # WhatsApp-native
schema: [ProfessionalService, BreadcrumbList]
cta_source_tag: "contact"
status: blocked
blocker: "NAP address and phone are PENDING in data/site.json. This page carries LocalBusiness schema and must match the Google Business Profile exactly — do not build until Kamar locks the NAP."
---

## BLOCK 1 — H1 + ANSWER FIRST

# Talk to us on WhatsApp

The fastest way to reach us is WhatsApp — message any hour and you'll get a first reply within minutes. Tell us what you sell and what you need, and we'll send back a written scope and a price before you pay anything.

**Button (large, primary):** Message us on WhatsApp → CTA component, `src:contact-page`

---

## BLOCK 2 — THE OTHER WAYS

| | |
|---|---|
| **WhatsApp** | *[NAP / WhatsApp number — from data/site.json]* |
| **Phone** | *[Calls number — from data/site.json]* |
| **Hours** | Mon–Fri 10:00–19:00 · Sat 10:00–17:00 · Sun closed |
| **Office** | *[NAP ADDRESS — PENDING]* |

> DEV: this block's values render from `data/site.json`. The address and phone must match the Google Business Profile character for character — that consistency is a top local ranking factor and the whole reason the LocalBusiness schema on this page exists.

---

## BLOCK 3 — MAP

> Embedded Google map, lazy-loaded on interaction so it doesn't cost you LCP. Pin must match the Google Business Profile pin exactly.

---

## BLOCK 4 — THE FORM

> Secondary to WhatsApp, not primary. Four fields maximum.

If you'd rather write it out:

- Your name
- WhatsApp number
- What you sell / your business
- What you need — website, store, SEO, ads, social, automation, not sure

**Button:** Send

> DEV: posts to the n8n webhook (see `autopilot/lead-payload.schema.json`), never to an inbox. Honeypot field plus time-to-submit check. No CAPTCHA — at this volume it blocks more real leads than spam.

---

## BLOCK 5 — WHAT HAPPENS NEXT

1. You'll get a first reply within minutes on WhatsApp, or within one working hour if you used the form.
2. We'll ask two or three questions — what you sell, which city, roughly what budget.
3. You'll get a written scope and price. Before any payment.
4. If we're not the right fit, we'll say so and tell you why.

---

## BLOCK 6 — TRUST FOOTER

BM TechX is a brand of **Afra Ventures Private Limited** · CIN U62011PY2026PTC009819 · GSTIN *[PENDING]*
