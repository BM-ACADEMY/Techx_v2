# Source-tagged WhatsApp CTA links

Every CTA on the site carries its context into the prefilled WhatsApp message. The `[src:...]`
tag is invisible to the buyer and tells the automation **which page produced the lead, which
service they want, and which follow-up sequence to run** — without asking a single qualifying
question first.

This one convention removes most of the friction that currently makes the assistant re-ask
things the visitor has already told you.

---

## The component

Build this **once**, use it everywhere. Never hand-write a `wa.me` link.

```html
<!-- Usage: <wa-cta src="ecom-page" label="Get the ₹9,999 store"></wa-cta> -->
<a class="wa-cta"
   href="https://wa.me/919403892971?text={{ encodeURIComponent(message) }}"
   data-src="{{ src }}"
   rel="noopener"
   target="_blank">{{ label }}</a>
```

```js
// message template — keep the tag LAST so it survives the customer editing the message
const message = `Hi BM TechX — ${intent} [src:${src}]`;
```

**Rules**

1. The number comes from `data/site.json` → `contact.whatsapp.number_e164`. Never hardcoded.
2. `[src:...]` is always the **last** thing in the message — people delete the start, rarely the end.
3. Fire a GA4 event `whatsapp_click` with `src` as a parameter on every tap (see `tracking/events-spec.md`).
4. On mobile, also render the sticky bottom bar using the page's own `src`.

---

## The full tag map

| Page | `src` tag | Prefilled intent | Autopilot route |
|---|---|---|---|
| Home — hero | `home-hero` | `I'd like to know more about your services` | Qualify |
| Home — footer | `home-footer` | `I'd like to know more about your services` | Qualify |
| Services hub | `services-hub` | `I'm not sure which service I need` | Qualify |
| Website dev page | `web-dev` | `I'm interested in a website` | Quote: web-single / web-multi |
| Website dev — footer | `web-dev-footer` | `I'm interested in a website` | Quote: web-single / web-multi |
| **₹2,999 card** | `offer-2999` | `I want the ₹2,999 single-page website` | **Quote direct: web-single** |
| **₹4,999 card** | `offer-4999` | `I want the ₹4,999 multi-page website` | **Quote direct: web-multi** |
| Ecommerce page | `ecom-page` | `I'm interested in the ₹9,999 online store` | Quote: store |
| Ecommerce — footer | `ecom-footer` | `I'm interested in the ₹9,999 online store` | Quote: store |
| **₹9,999 card** | `offer-9999` | `I want the ₹9,999 online store` | **Quote direct: store** |
| SEO page | `seo` | `I'm interested in SEO` | Qualify then quote tier |
| **SEO audit block** | `seo-audit` | `Why does my competitor rank above me? My business is: ` | **Audit flow — high intent** |
| SEO — footer | `seo-footer` | `I'm interested in SEO` | Qualify then quote tier |
| Meta ads page | `meta-ads` | `I'm interested in Facebook/Instagram ads` | Qualify then quote |
| Meta ads — footer | `meta-ads-footer` | `I'm interested in Facebook/Instagram ads` | Qualify then quote |
| Social media page | `smm` | `I'm interested in social media management` | Qualify then quote |
| Social media — footer | `smm-footer` | `I'm interested in social media management` | Qualify then quote |
| WhatsApp automation | `wa-auto` | `I'd like to know about WhatsApp automation` | **ROUTE_TO_HUMAN** |
| WhatsApp automation — footer | `wa-auto-footer` | `I'd like to book a scope call for WhatsApp automation` | **ROUTE_TO_HUMAN** |
| Pricing page | `pricing` | `I've seen your prices — I'd like to start` | Qualify then quote |
| Pricing — footer | `pricing-footer` | `I've seen your prices — I'd like to start` | Qualify then quote |
| Work / case studies | `work-footer` | `Can I speak to one of your clients?` | **ROUTE_TO_HUMAN** |
| About | `about-footer` | `I'd like to know more about BM TechX` | Qualify |
| Contact | `contact-page` | `Hi BM TechX` | Qualify |
| Real estate industry | `ind-realestate` | `I have a property project and need leads` | Qualify then quote: meta-ads |
| Real estate — footer | `ind-realestate-footer` | `I have a property project and need leads` | Qualify then quote: meta-ads |
| Hotels & villas | `ind-hotels` | `I run a hotel/villa in Pondicherry` | Qualify |
| Blog — in-article | `blog-{{slug}}` | `I read your article on {{topic}}` | Qualify — nurture sequence |
| Blog — sidebar audit | `blog-audit` | `Can you check my website?` | Audit flow |
| Sticky mobile bar | `sticky-{{page}}` | `Hi BM TechX` | Qualify |
| Google Business Profile | `gbp` | `Hi BM TechX` | Qualify — tag as local |
| Instagram bio | `ig-bio` | `Hi BM TechX` | Qualify |

---

## Two flows worth building properly

**`seo-audit` — the highest-intent tag on the site.**
The visitor has just been told their competitor outranks them and is emotionally engaged. The
assistant should: acknowledge, ask only for the business name and city, confirm a human will
reply with the specific reason, and notify Karthika immediately. Do **not** try to auto-generate
the audit answer — a wrong diagnosis here loses a hot lead.

**`offer-2999` / `offer-9999` — the pure autopilot path.**
The buyer has already decided. The assistant should confirm the price and GST, confirm what's
included and excluded, collect logo + text + photos, tell them the clock starts on receipt, and
take payment details. No demo call, no discovery. This is the path that makes a ₹2,999 product
profitable, and it should need zero human time until provisioning.

---

## Testing

Before launch, tap **every** CTA on a real phone and confirm:

1. WhatsApp opens with the message prefilled.
2. The `[src:...]` tag is present and correct.
3. The automation reads the tag and does **not** ask which service they want.
4. The GA4 `whatsapp_click` event fires with the right `src`.

A CTA with a missing or wrong tag silently drops the lead into generic qualification —
it still works, it just wastes the advantage.
