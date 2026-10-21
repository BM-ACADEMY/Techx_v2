# Analytics & event specification

One page, so Karthika can read the data without asking dev what anything means.

**Rule:** a conversion event is something a human chose to do. A pageview renamed "lead" is not
a conversion, and reporting it as one is how agencies lose clients.

---

## Properties to verify before launch

| Tool | What to confirm |
|---|---|
| Google Search Console | Domain property verified. Old URLs' data exported before the rebuild. |
| Bing Webmaster Tools | Verified. Free, and it feeds Copilot. |
| GA4 | Enhanced measurement on. Internal IP filtered. India timezone and INR currency set. |
| Meta Events Manager | Pixel live **and** Conversions API server events firing. |
| Google Business Profile | Website link UTM-tagged so GBP traffic is separable. |

---

## Events

| Event | Fires when | Parameters | Conversion? |
|---|---|---|---|
| `whatsapp_click` | Any WhatsApp CTA tapped | `src`, `page_path`, `service` | **Yes** |
| `form_submit` | Contact/enquiry form submitted | `page_path`, `service`, `form_id` | **Yes** |
| `phone_click` | Phone number tapped | `page_path` | **Yes** |
| `booking_confirmed` | Call slot confirmed | `slot_time`, `service` | **Yes** |
| `pricing_view` | `/pricing/` reaches 50% scroll depth | `page_path` | No — strong intent signal |
| `price_card_click` | An offer strip card clicked | `offer_id` | No |
| `case_study_view` | Case study reaches 75% scroll | `client_slug` | No |
| `article_read` | Blog post reaches 75% scroll | `slug`, `service_cluster` | No |
| `faq_expand` | FAQ item opened | `question` | No — tells you what worries buyers |
| `not_for_view` | "Who this is not for" block viewed | `page_path` | No |

**`faq_expand` and `not_for_view` are worth more than they look.** After one quarter they tell
you which objection actually blocks your buyers, which feeds the content calendar directly.

---

## UTM conventions

Consistent tagging or the reporting is worthless.

```
utm_source    = google | facebook | instagram | whatsapp | gbp | linkedin | email
utm_medium    = organic | cpc | social | referral | profile | broadcast
utm_campaign  = {yyyy-mm}-{what}          e.g. 2026-10-website-cost-article
utm_content   = {variant}                 e.g. carousel-a
```

**Google Business Profile website link** — tag it, or GBP traffic hides inside "organic":
```
https://bmtechx.in/?utm_source=gbp&utm_medium=profile&utm_campaign=google-business-profile
```

---

## Server-side events

Browser-only pixels lose a large share of events to ad blockers, iOS restrictions and tab
closures. Your Meta ad optimisation is only as good as the signal it gets back.

On lead creation, the **n8n Lead Integrator** — not the browser — sends:

1. GA4 Measurement Protocol → `generate_lead`
2. Meta Conversions API → `Lead`, with hashed phone for matching

Deduplicate against the browser event using a shared `event_id`, or you will double-count and
flatter yourself.

---

## The weekly dashboard

Looker Studio, free, six tiles. Not a paid tool until this is genuinely outgrown.

| Tile | Source | Shows |
|---|---|---|
| Qualified organic leads | Leads sheet | This month vs last vs baseline |
| Leads by service line | Leads sheet | **Which of the eight produced zero** |
| Non-brand organic clicks | GSC | 4-week trend |
| Top landing pages by lead | GA4 + sheet | Which content actually converts |
| Local pack position | Rank tracker | 5 core queries, fixed location |
| GBP actions | GBP Insights | Calls, direction requests, website taps |

---

## Launch-day checklist

- [ ] GA4 receiving events from the new site
- [ ] `whatsapp_click` firing with the correct `src` on **every** CTA — tap each one on a real phone
- [ ] Form submit writes to the leads sheet **and** fires both server events
- [ ] Meta CAPI events visible in Events Manager with good match quality
- [ ] GSC: new sitemap submitted, old URLs' redirects verified
- [ ] Internal traffic filtered — office IP and team devices
- [ ] Baseline export saved to the shared drive **before** any of this changed anything
