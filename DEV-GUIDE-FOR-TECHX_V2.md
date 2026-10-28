# DEV GUIDE FOR TECHX_V2
## Complete Architecture, Page Blueprints, SEO Specifications & 25-Day Execution Plan

**Document Version:** 1.0  
**Target Domain:** https://bmtechx.in  
**Prepared For:** Engineering, Content, SEO & Automation Teams (Kamar, Karthika, Imran, Babila, Dev)  
**Total Timeline:** 25 Days (18 Days Dev + 3 Days Testing + 3 Days Bug Fixing + 1 Day Launch/Deploy)

---

## TABLE OF CONTENTS
1. [Core Principles & Architectural Foundations](#1-core-principles--architectural-foundations)
2. [Data Layer & Single Sources of Truth](#2-data-layer--single-sources-of-truth)
3. [Page-by-Page & Section-by-Section Content Blueprints](#3-page-by-page--section-by-section-content-blueprints)
   - 3.1 Homepage (`/`)
   - 3.2 Services Hub (`/services/`)
   - 3.3 Website Development (`/services/website-development/`)
   - 3.4 Ecommerce / Online Store (`/services/ecommerce-website/`)
   - 3.5 SEO Services (`/services/seo/`)
   - 3.6 Meta & Facebook Ads (`/services/meta-ads/`)
   - 3.7 Social Media Marketing (`/services/social-media-marketing/`)
   - 3.8 WhatsApp Automation (`/services/whatsapp-automation/`)
   - 3.9 Master Pricing Page (`/pricing/`)
   - 3.10 About Us (`/about/`)
   - 3.11 Contact Page (`/contact/`)
   - 3.12 Industry: Real Estate (`/industries/real-estate/`)
   - 3.13 Work / Case Studies Hub (`/work/`)
   - 3.14 Blog Engine & Legal Pages (`/blog/`, Privacy, Terms, 404)
4. [Master SEO & Redirect Implementation](#4-master-seo--redirect-implementation)
5. [Autopilot, WhatsApp Attribution & Tracking Layer](#5-autopilot-whatsapp-attribution--tracking-layer)
6. [Component Contracts & Required Component Library](#6-component-contracts--required-component-library)
7. [Module, Task & Subtask Engineering Breakdown](#7-module-task--subtask-engineering-breakdown)
8. [25-Day Day-by-Day Project Schedule](#8-25-day-day-by-day-project-schedule)

---

## 1. CORE PRINCIPLES & ARCHITECTURAL FOUNDATIONS

### 1.1 The Three-Layer Rule
To ensure maintainability, long-term stability, and instant restyling without developer intervention, the site strictly enforces three separated layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. CONTENT LAYER                                                       │
│    content/*.md  ·  data/site.json  ·  data/pricing.json  · proof.json │
│    Owned by Kamar & Imran. Never hardcoded into JSX/HTML templates.   │
├────────────────────────────────────────────────────────────────────────┤
│ 2. STRUCTURE LAYER                                                     │
│    Semantic HTML  ·  Heading Hierarchy  ·  JSON-LD Schema              │
│    Owned jointly by Karthika (SEO) & Dev. AI crawlers read this layer.│
├────────────────────────────────────────────────────────────────────────┤
│ 3. PRESENTATION LAYER                                                  │
│    data/theme.json  ·  Tailwind/CSS Tokens  ·  Motion Variables        │
│    Owned by Developer. Modifying tokens restyles the entire site.      │
└────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Non-Negotiable Standards
1. **Server-Render / Static HTML Output (SSG):** All primary content, headings, answer-first passages, and schema must be present in raw HTML prior to JavaScript hydration. AI answer engines (ChatGPT, Perplexity, Claude) and search crawlers must receive 100% of the content with JavaScript disabled.
2. **Answer-First Paragraphs Above the Fold:** The opening paragraph on every single page contains the primary city modifier, service, and pricing figure. It must remain in the first viewport on mobile (never pushed down by hero graphics).
3. **Strict Heading Hierarchy:** Exactly one `<h1>` per page matching the primary commercial intent. Never style a tag based on font-size convenience.
4. **Explicit Image Dimensions:** All images must carry explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS).
5. **Strict Performance Budget:** LCP < 2.0s on a mid-range Android phone over 4G; Total page weight < 500 KB; Hero graphic < 120 KB.
6. **No Client-Side Chat Widget Bloat:** No external 300KB chat scripts injected on initial load. WhatsApp CTA is the direct conversion gateway.

---

## 2. DATA LAYER & SINGLE SOURCES OF TRUTH

No price, phone number, address, or proof metric may ever be hardcoded into a template. They are loaded exclusively from these four centralized files:

### 2.1 `data/site.json` (Entity, NAP & Contact Info)
- **Legal Entity:** Afra Ventures Private Limited
- **CIN:** `U62011PY2026PTC009819` (Incorporated 12 September 2026)
- **Brand Name:** BM TechX
- **Registered Address:** 78 Lenin Street, Kosapalayam, Puducherry 605013
- **Primary WhatsApp Number (Outbound/Inbound E.164):** `919944940051` (Display: `+91 99449 40051`)
- **Primary Call Line:** `919944940051` (Display: `+91 99449 40051`)
- **Service Areas:** Puducherry, Cuddalore, Villupuram, Chennai, Madurai, Tiruchirappalli, Namakkal
- **Working Hours:** Mon–Fri 10:00–19:00, Sat 10:00–17:00, Sun Closed (IST)

### 2.2 `data/pricing.json` (Published Pricing Matrix)
- **One-Time Builds:**
  - `web-single`: ₹2,999 (Single-page custom website, live in 48 working hours, Year 1 domain/server included; Renewal: ₹1,999/yr).
  - `web-multi`: ₹4,999 (Multi-page custom website, live in 5–7 working days, Year 1 domain/server included; Renewal: ₹1,999/yr).
  - `store`: ₹9,999 (Online store, unlimited products, payment gateway, order management, live in 7–10 working days; Renewal: ₹0/yr - No renewal fees).
- **Monthly Retainers (3-Month Minimum Commitment, Excludes 18% GST):**
  - `seo-starter`: ₹4,999/mo (5 keywords, 2 pages/mo, 1 blog post/mo, 4 GBP posts, 5 citations).
  - `seo-growth`: ₹8,999/mo (10 keywords, 4 pages/mo, 2 blog posts/mo, 8 GBP posts, 10 citations, 2 outreach targets, full schema).
  - `seo-business`: ₹14,999/mo (20 keywords, 8 pages/mo, 4 content pieces/mo, full GBP management, 15 citations, AI visibility tracking).
  - `meta-ads`: ₹4,999/mo (Campaign setup, creative direction, WhatsApp lead delivery. Ad spend billed separately).
  - `smm-starter`: ₹6,999/mo
  - `smm-growth`: ₹8,999/mo
  - `smm-business`: ₹14,999/mo
  - `combo`: From ₹9,999/mo (Custom combinations of web + ads or SEO + social).
- **Quote-Only Services (Autopilot routes to human):** WhatsApp Automation (LeadOS), Custom Software Portals, Photo/Video Shoots.

### 2.3 `data/proof.json` (Proof System & 37 Slots)
- Eight standardized proof types: `result_strip`, `case_study`, `before_after`, `testimonial`, `logo_wall`, `work_sample`, `credential`, `live_metric`.
- Status rule: `FILLED` (renders live), `EMPTY` (renders labeled placeholder on staging, completely hidden on production build), `DRAFT` (under verification).

### 2.4 `data/theme.json` (Design & Motion Tokens)
- **Colors:** Ground (`#F7F5F1`), Surface (`#FFFFFF`), Ink (`#14171F`), Brand Deep (`#0F2542`), Brand Accent (`#16325C`), Accent Price (`#C8451F`), Accent Warm (`#E8834F`), Action Green (`#1E7A4D`).
- **Typography:** Display (`Bricolage Grotesque`), Body (`Public Sans`), Monospace (`DejaVu Sans Mono`).
- **Motion Level Switch:** Defaults to `"subtle"`. Supports `"expressive"` and `"none"`. Respects `prefers-reduced-motion: reduce`.

---

## 3. PAGE-BY-PAGE & SECTION-BY-SECTION CONTENT BLUEPRINTS

---

### 3.1 Homepage (`/`)
- **URL:** `/`
- **SEO Title:** `BM TechX | Digital Marketing Agency in Pondicherry` (50 chars)
- **Meta Description:** `Fixed-price websites, SEO, Meta ads and WhatsApp automation for Tamil Nadu businesses. Websites from Rs 2,999, live in 48 hours. Prices on the page.` (151 chars)
- **H1:** `Fixed-price digital growth for Tamil Nadu businesses`
- **Primary Keyword:** `digital marketing agency in pondicherry`
- **Buyer Trigger:** Trigger 5 (Competitor Anxiety & Price Transparency)
- **CTA Source Tag:** `home`
- **Schema:** `Organization`, `ProfessionalService`, `FAQPage`, `BreadcrumbList`

#### Page Structure & Block Content:
1. **BLOCK 1 — Hero:**
   - **H1:** Fixed-price digital growth for Tamil Nadu businesses
   - **Subheading:** Websites, ads, SEO and WhatsApp automation — priced on this page, delivered on the date we commit to. Built in Puducherry, working across Tamil Nadu.
   - **Primary Action Button:** `<WhatsAppCTA src="home-hero" intent="I'd like to know more about your services" label="Message us on WhatsApp" />`
   - **Secondary Button:** `<a href="/pricing/">See all prices →</a>`
   - **Visual:** Real authentic office/team visual (no generic stock laptops/handshakes).
2. **BLOCK 2 — Offer Strip (Directly below the fold - Highest conversion impact):**
   - **Card 1 (Website):** ₹2,999 | A one-page website, live in 48 working hours. Domain and server included for year one. → `/services/website-development/`
   - **Card 2 (Online Store):** ₹9,999 | Sell online with unlimited products. No yearly renewal fee. → `/services/ecommerce-website/`
   - **Card 3 (SEO):** ₹4,999/month | Get found when people search for what you sell. From 5 keywords. → `/services/seo/`
   - *Microcopy:* All prices exclude 18% GST.
3. **BLOCK 3 — The Answer-First Paragraph (Critical AI extract):**
   - *Content:* "BM TechX is a digital marketing agency in Pondicherry that publishes its prices. We build custom-coded websites from ₹2,999, online stores from ₹9,999, and run SEO, Meta ads and social media on monthly plans from ₹4,999 — for businesses in Puducherry, Cuddalore, Villupuram and across Tamil Nadu. You can see every price before you talk to anyone."
4. **BLOCK 4 — Global Proof Bar:**
   - MCA Company Registration Credential (`Afra Ventures Private Limited · CIN U62011PY2026PTC009819`).
   - Verified stats counter slots (`[ CLIENT COUNT ]`, `[ PROJECT COUNT ]`, `1,400+ learners trained through BM Academy`).
   - Google Rating and Review badge (`g-live-reviews`).
5. **BLOCK 5 — Services Grid:**
   - 6 Core Cards: Website Development (from ₹2,999), Ecommerce Store (₹9,999), SEO Services (from ₹4,999/mo), Meta Ads (from ₹4,999/mo), Social Media Management (from ₹6,999/mo), WhatsApp Automation (Custom scope).
6. **BLOCK 6 — Why Us (The 4 Contrast Points):**
   - 1. Published fixed pricing vs. "Call for quote".
   - 2. Custom-coded lightweight performance vs. slow bloated WordPress themes.
   - 3. Real local Puducherry accountability vs. anonymous fly-by-night agencies.
   - 4. Integrated WhatsApp lead engine vs. dead contact forms that sit in inboxes.
7. **BLOCK 7 — Featured Case Study:**
   - Highlight Card: Multi-district Tamil Nadu real estate lead generation campaign (CPL < ₹65, 480+ verified inquiries routed to WhatsApp).
8. **BLOCK 8 — Process (3-Step Delivery):**
   - Step 1: Select scope & lock price (no hidden charges).
   - Step 2: Content intake & 48-hour build clock begins.
   - Step 3: Review, QA sign-off & live deployment.
9. **BLOCK 9 — Who This Is NOT For (Disqualification Engine):**
   - Not for businesses looking for ₹500 WordPress templates with 50 security plugins.
   - Not for clients demanding 24/7 on-call changes outside agreed scopes.
   - Not for companies refusing to provide timely product info/photos.
10. **BLOCK 10 — FAQ Accordion (Emits `FAQPage` Schema):**
    - Q1: Why are your prices so much lower than Chennai/Bangalore agencies?
    - Q2: Are there any hidden yearly renewal costs?
    - Q3: Can you meet in person in Pondicherry?
    - Q4: What happens if you don't deliver within 48 hours?
11. **BLOCK 11 — Closing CTA:**
    - `<WhatsAppCTA src="home-footer" intent="I'd like to know more about your services" label="Start on WhatsApp" />`
12. **BLOCK 12 — Trust Footer:**
    - Legal Entity, CIN, Registered Office Address, Phone numbers, Service Area Links, Copyright.

---

### 3.2 Services Hub (`/services/`)
- **SEO Title:** `Our Services | BM TechX Pondicherry` (35 chars)
- **Meta Description:** `Websites, online stores, SEO, Meta ads, social media and WhatsApp automation — every price published. See what each service includes and costs.` (144 chars)
- **H1:** `What we do — and what each one costs`
- **CTA Source Tag:** `services-hub`
- **Schema:** `Service`, `BreadcrumbList`

#### Page Structure:
1. **BLOCK 1 — H1 + Answer-First:** Transparent pricing breakdown across all 6 service lines.
2. **BLOCK 2 — 6 Service Cards with Pricing Badges:**
   - Direct cards for Web Dev, Ecommerce, SEO, Meta Ads, SMM, WhatsApp Automation with delivery SLAs.
3. **BLOCK 3 — "Not Sure Which?" Advisory Block:**
   - Matrix showing which service fits what business stage (New business -> Single-page Web; Retailer -> Online Store; Service provider -> SEO + WhatsApp).
   - `<WhatsAppCTA src="services-hub" intent="I'm not sure which service I need" label="Ask us on WhatsApp" />`

---

### 3.3 Website Development (`/services/website-development/`)
- **SEO Title:** `Website Development in Pondicherry | From Rs 2,999` (49 chars)
- **Meta Description:** `Custom-coded websites from Rs 2,999, live in 48 working hours. Domain and server included for year 1. No WordPress themes. See exactly what you get.` (149 chars)
- **H1:** `Website development in Pondicherry`
- **Primary Keywords:** `website development company in pondicherry`, `website design pondicherry`
- **Buyer Trigger:** Trigger 2 (Price & Delivery Speed)
- **CTA Source Tag:** `web-dev`
- **Schema:** `Service`, `FAQPage`, `BreadcrumbList`

#### Page Structure:
1. **BLOCK 1 — H1 + Answer-First:** Custom-coded high-speed static websites live in 48 working hours.
2. **BLOCK 2 — Pricing Cards:**
   - Single-Page: ₹2,999 | 48h SLA | `<WhatsAppCTA src="offer-2999" intent="I want the ₹2,999 single-page website" label="Get ₹2,999 Website" />`
   - Multi-Page: ₹4,999 | 5-7 days SLA | `<WhatsAppCTA src="offer-4999" intent="I want the ₹4,999 multi-page website" label="Get ₹4,999 Website" />`
3. **BLOCK 3 — The 48-Hour Clock Explained:**
   - Strict rules on intake: Clock starts the minute client provides logo, text, and contact details.
4. **BLOCK 4 — Why Custom-Coded (Zero WordPress):**
   - Speed comparison: 98 PageSpeed score vs 42 on WordPress. Zero plugin vulnerabilities, zero database crashes.
5. **BLOCK 5 — What You Actually Get (Inclusions vs Exclusions):**
   - Clear checklist of hosting, domain, mobile responsiveness, SSL, WhatsApp CTA, Google Map embed.
6. **BLOCK 6 — Proof System:** 6 live work samples with screenshots, on-time delivery metric, PageSpeed credential.
7. **BLOCK 7 — Who This Is NOT For:** Disqualifiers.
8. **BLOCK 8 — FAQ (5 questions + Schema).**
9. **BLOCK 9 — Closing WhatsApp CTA (`web-dev-footer`).**

---

### 3.4 Ecommerce Website (`/services/ecommerce-website/`)
- **SEO Title:** `Ecommerce Website in Pondicherry | Rs 9,999 Store` (48 chars)
- **Meta Description:** `Sell online for Rs 9,999 — unlimited products, payment gateway, no yearly renewal fee. Live in 7-10 working days. Built custom, not on a template.` (147 chars)
- **H1:** `Online store development in Pondicherry`
- **Primary Keyword:** `ecommerce website development pondicherry`
- **Buyer Trigger:** Trigger 2 (Zero Yearly Renewal Fee)
- **CTA Source Tag:** `ecom-page`

#### Page Structure:
1. **BLOCK 1 — H1 + Answer-First:** Custom store at ₹9,999 with zero yearly software licensing fees.
2. **BLOCK 2 — The "No-Renewal" Point:** How Shopify/WooCommerce bleed stores with recurring $39/mo app charges.
3. **BLOCK 3 — What's Included:** Payment gateway integration (Razorpay/Cashfree), order notifications on WhatsApp, admin panel, product catalog.
4. **BLOCK 4 — True Cost of Selling Online:** Transparent breakdown of hosting, payment gateway transaction charges (2%), and delivery logistics.
5. **BLOCK 4b — Proof:** 4 screenshot samples of real working catalogs, payment receipt proof.
6. **BLOCK 5 — Who This Is NOT For:** Businesses with 50,000+ SKUs needing multi-warehouse SAP integration.
7. **BLOCK 6 — FAQ (4 questions).**
8. **BLOCK 7 — Closing CTA (`offer-9999` & `ecom-footer`).**

---

### 3.5 SEO Services (`/services/seo/`)
- **SEO Title:** `SEO Services in Pondicherry | From Rs 4,999/month` (48 chars)
- **Meta Description:** `SEO from Rs 4,999 a month for Pondicherry, Cuddalore and Villupuram businesses. Countable deliverables, honest timelines, no ranking guarantees.` (145 chars)
- **H1:** `SEO services in Pondicherry`
- **Primary Keyword:** `seo services in pondicherry`, `seo company pondicherry`
- **Buyer Trigger:** Trigger 5 (Competitor Ranking Anxiety) & Trigger 3 (Honest Timelines)
- **CTA Source Tag:** `seo`

#### Page Structure:
1. **BLOCK 1 — H1 + Answer-First:** Countable SEO deliverables from ₹4,999/mo for local businesses.
2. **BLOCK 2 — The Competitor Audit Block (Highest Intent CTA):**
   - "Why does your competitor rank #1 on Google while you're on page 3?"
   - `<WhatsAppCTA src="seo-audit" intent="Why does my competitor rank above me? My business is: " label="Free Competitor Check on WhatsApp" />`
3. **BLOCK 3 — 3 Tier Plans:** Starter (₹4,999/mo), Growth (₹8,999/mo - Recommended), Business (₹14,999/mo).
4. **BLOCK 4 — What "AI Visibility" Means:** How we optimize for ChatGPT Search, Perplexity, Google AI Overviews using clean markup, answer-first text, and schema.
5. **BLOCK 5 — Month-by-Month Process:** Month 1 Foundations -> Month 2 Content & Citations -> Month 3 Authority & Conversions.
6. **BLOCK 6 — Reporting:** What we report (leads, calls, keyword ranks) vs what we ignore (vanity impressions).
7. **BLOCK 6b — Proof:** Before/After keyword ranking shifts and Google Search Console growth graphs.
8. **BLOCK 7 — Who This Is NOT For:** Anyone expecting #1 rankings in 7 days or ranking guarantees.
9. **BLOCK 8 — FAQ (5 questions).**
10. **BLOCK 9 — Closing CTA (`seo-footer`).**

---

### 3.6 Meta Ads (`/services/meta-ads/`)
- **SEO Title:** `Facebook & Meta Ads Agency Pondicherry | Rs 4,999/mo` (52 chars)
- **Meta Description:** `Meta ads managed for Rs 4,999 a month plus your ad spend. Leads delivered to WhatsApp. Real cost-per-lead data from campaigns across Tamil Nadu.` (145 chars)
- **H1:** `Facebook and Instagram ads that bring enquiries`
- **Primary Keyword:** `facebook ads agency pondicherry`
- **Buyer Trigger:** Trigger 4 (Direct WhatsApp Lead Delivery)
- **CTA Source Tag:** `meta-ads`

#### Page Structure:
1. **BLOCK 1 — H1 + Answer-First:** Meta ads managed for ₹4,999/mo fee + direct ad spend. Leads routed instantly to WhatsApp.
2. **BLOCK 2 — How the Money Works:** Separation of management fee from Meta ad billing.
3. **BLOCK 3 — What We Do:** Ad copy in Tamil & English, creative design, audience targeting, instant webhook lead alerts.
4. **BLOCK 4 — Proof & Real CPL Data:** Real estate (CPL ₹45–₹85), Villa bookings (CPL ₹90–₹140), Education leads (CPL ₹35–₹60).
5. **BLOCK 5 — Why Ads Stop Working (Ad Fatigue):** Why boosting posts fails and how creative refreshing maintains ROI.
6. **BLOCK 6 — Who This Is NOT For:** Businesses with less than ₹300/day ad budget or no one to answer WhatsApp enquiries immediately.
7. **BLOCK 7 — FAQ (4 questions).**
8. **BLOCK 8 — Closing CTA (`meta-ads-footer`).**

---

### 3.7 Social Media Marketing (`/services/social-media-marketing/`)
- **SEO Title:** `Social Media Marketing Agency Pondicherry | Rs 6,999+` (53 chars)
- **Meta Description:** `Social media managed from Rs 6,999 a month. Content, posting, replies and reporting that leads with enquiries instead of reach and impressions.` (144 chars)
- **H1:** `Social media management in Pondicherry`
- **Primary Keyword:** `social media marketing agency pondicherry`
- **CTA Source Tag:** `smm`

#### Page Structure:
1. **BLOCK 1 — H1 + Answer-First:** Active social profiles that drive inbound customer DMs.
2. **BLOCK 2 — Plans:** Starter (₹6,999/mo), Growth (₹8,999/mo), Business (₹14,999/mo).
3. **BLOCK 3 — Metrics That Matter:** Inquiries & saves vs empty follower counts.
4. **BLOCK 3b — Proof:** 6 post design samples and client profile growth screenshots.
5. **BLOCK 4 — Who This Is NOT For:** Clients wanting daily generic festival greeting posts with zero commercial intent.
6. **BLOCK 5 — Closing CTA (`smm-footer`).**

---

### 3.8 WhatsApp Automation (`/services/whatsapp-automation/`)
- **SEO Title:** `WhatsApp Automation for Business | BM TechX Pondicherry` (55 chars)
- **Meta Description:** `A WhatsApp assistant that answers every enquiry in minutes and follows up until they reply. Built on the same system we run our own agency on.` (144 chars)
- **H1:** `WhatsApp automation that answers while you sleep`
- **Buyer Trigger:** Trigger 6 (Speed to Lead)
- **CTA Source Tag:** `wa-auto`

#### Page Structure:
1. **BLOCK 1 — H1 + Answer-First:** Sub-5-minute response assistant that qualifies prospects 24/7.
2. **BLOCK 2 — The Problem:** Why slow responses kill 70% of inbound digital leads.
3. **BLOCK 3 — System Architecture:** Inbound parsing, automatic quote dispatch, Google Sheets CRM sync, multi-day automated follow-up.
4. **BLOCK 4 — What It Will Never Do:** Won't spam customers, won't hallucinate fake discounts, won't argue.
5. **BLOCK 5 — Proof:** "We run our own agency on this exact system" (show real conversation flow).
6. **BLOCK 6 — Who This Is NOT For:** Businesses with fewer than 5 inquiries a week.
7. **BLOCK 7 — FAQ (4 questions).**
8. **BLOCK 8 — Closing CTA (`wa-auto-footer` -> Route to human).**

---

### 3.9 Master Pricing Page (`/pricing/`)
- **SEO Title:** `Pricing | Websites from Rs 2,999 | BM TechX Pondicherry` (55 chars)
- **Meta Description:** `Every price published — websites, online stores, SEO, Meta ads and social media. GST, renewals and what is excluded all stated. No quotation call needed.` (155 chars)
- **H1:** `Every price. On this page.`
- **Primary Keywords:** `website design cost in pondicherry`, `digital marketing agency charges in india`
- **Buyer Trigger:** Trigger 2 (Price Transparency)
- **CTA Source Tag:** `pricing`
- **Schema:** `PriceSpecification`, `FAQPage`, `BreadcrumbList`

#### Page Structure:
1. **BLOCK 1 — H1 + Answer-First:** The complete published rate card for BM TechX.
2. **BLOCK 2 — One-Time Builds Grid:** Detailed feature comparison between ₹2,999, ₹4,999 and ₹9,999.
3. **BLOCK 3 — Monthly Retainers Matrix:** SEO (₹4,999 / ₹8,999 / ₹14,999), Ads (₹4,999), SMM (₹6,999+).
4. **BLOCK 4 — Plain Terms:** 18% GST stated, Year 2 renewals (₹1,999/yr for websites, ₹0 for stores), 3-month retainer minimums.
5. **BLOCK 5 — Quote-Only Services & Why:** WhatsApp automation, custom software, on-location video shoots.
6. **BLOCK 6 — Pricing FAQ:** 6 questions on payments, installments, and invoices.
7. **BLOCK 7 — Closing CTA (`pricing-footer`).**

---

### 3.10 About Us (`/about/`)
- **SEO Title:** `About BM TechX | Afra Ventures Private Limited` (46 chars)
- **Meta Description:** `A Puducherry digital agency that publishes its prices and writes its own code. Meet the team, see the company registration, know who you are paying.` (149 chars)
- **H1:** `Who you are actually dealing with`
- **CTA Source Tag:** `about-footer`
- **Schema:** `AboutPage`, `Organization`

#### Page Structure:
1. **BLOCK 1 — H1 + Answer-First:** Puducherry roots, incorporated company, transparent team.
2. **BLOCK 2 — Registered Company Credential:** Legal entity *Afra Ventures Private Limited*, CIN `U62011PY2026PTC009819`, MCA registry link.
3. **BLOCK 3 — The Leadership Team:**
   - Kamar (Founder & Strategy)
   - Karthika (SEO & Operations)
   - Imran (Content & Design)
   - Babila (Social Media & Ads)
4. **BLOCK 4 — How We Are Different:** No outsourced white-labeling, in-house code, public pricing.
5. **BLOCK 5 — Wider Group:** Connection to BM Academy (1,400+ trained tech learners).
6. **BLOCK 6 — Service Footprint:** Map of coverage across Pondicherry, Cuddalore, Villupuram, Chennai, Madurai.
7. **BLOCK 7 — Closing CTA (`about-footer`).**

---

### 3.11 Contact Page (`/contact/`)
- **SEO Title:** `Contact BM TechX | Pondicherry Digital Agency` (45 chars)
- **Meta Description:** `Message us on WhatsApp and get a written scope and price before you pay anything. Based in Puducherry, working across Tamil Nadu.` (129 chars)
- **H1:** `Talk to us on WhatsApp`
- **CTA Source Tag:** `contact-page`
- **Schema:** `ContactPage`, `LocalBusiness`

#### Page Structure:
1. **BLOCK 1 — H1 + Primary WhatsApp Card:** Fast response badge (< 15 mins during business hours).
2. **BLOCK 2 — Secondary Direct Channels:** Phone line (`+91 99449 40051`), working hours, official email.
3. **BLOCK 3 — Office Location Map:** Interactive Google Map pin in Kosapalayam / Kuyavarpalayam, Puducherry.
4. **BLOCK 4 — Direct Contact Form:**
   - Fields: Name, Phone (Required), Service Needed, Business Name, Note.
   - Form Submission POSTs directly to n8n webhook (zero spam honeypot + time-to-submit verification).
5. **BLOCK 5 — What Happens Next (30-Minute SLA):** Step-by-step expectations after form submission.
6. **BLOCK 6 — Trust Footer:** Full NAP and CIN display.

---

### 3.12 Industry: Real Estate (`/industries/real-estate/`)
- **SEO Title:** `Digital Marketing for Real Estate in Tamil Nadu | BM TechX` (58 chars)
- **Meta Description:** `Verified property leads delivered to WhatsApp. Campaigns run across Madurai, Trichy and Namakkal with a published cost-per-lead target.` (134 chars)
- **H1:** `Real estate marketing that delivers verified leads`
- **Primary Keyword:** `digital marketing for real estate in tamil nadu`
- **CTA Source Tag:** `ind-realestate`

#### Page Structure:
1. **BLOCK 1 — H1 + Answer-First:** Multi-city real estate lead generation targeting active property buyers in Tamil Nadu.
2. **BLOCK 2 — Proof Strip:** 480+ leads delivered, ₹45–₹85 CPL, 3 active districts (Madurai, Trichy, Namakkal).
3. **BLOCK 3 — Why Property Leads Go Wrong:** Fake numbers, uninterested tire-kickers, and how OTP/WhatsApp verification stops bad leads.
4. **BLOCK 4 — Deliverables:** High-converting landing pages, localized Tamil video ads, instant WhatsApp delivery.
5. **BLOCK 5 — What We Need from the Builder:** DTCP/RERA approvals, site layout, pricing sheets.
6. **BLOCK 6 — Who This Is NOT For:** Unapproved plots or developers unwilling to follow up with leads within 1 hour.
7. **BLOCK 7 — Industry FAQ.**
8. **BLOCK 8 — Closing CTA (`ind-realestate-footer`).**

---

### 3.13 Work / Case Studies Hub (`/work/`)
- **SEO Title:** `Our Work | Client Results | BM TechX Pondicherry` (48 chars)
- **Meta Description:** `Real projects with real numbers — verified real estate leads across three districts, villa SEO in Pondicherry, custom booking systems. Named clients.` (150 chars)
- **H1:** `What we have actually delivered`
- **CTA Source Tag:** `work-footer`

#### Page Structure:
1. **BLOCK 1 — H1 + Answer-First:** Case studies with real verified metrics, delivery dates, and client permissions.
2. **BLOCK 2 — Case Study Cards:**
   - Case 1: Multi-City Real Estate Plot Lead Generation (Madurai/Trichy).
   - Case 2: Heritage Villa & Resort SEO Pondicherry (Direct booking organic revenue).
   - Case 3: E-commerce Store for Regional Organic Brand (₹9,999 build, 0% platform commission).
3. **BLOCK 3 — Standard Case Study Template:** Problem -> What we built -> Verified results -> Time taken.
4. **BLOCK 4 — Client Verification Policy:** Stated permission protocol.
5. **BLOCK 5 — Closing CTA (`work-footer`).**

---

### 3.14 Blog Engine & Legal Pages
- **Blog Hub (`/blog/`):** Filterable grid for price guides, local SEO audits, and digital marketing comparisons.
- **Article Template (`/blog/:slug/`):**
  - Sticky Table of Contents (TOC).
  - Named author card (Kamar / Karthika / Imran) with link to `/about/#author`.
  - Published date + Last updated date.
  - In-article `<WhatsAppCTA src="blog-slug" />`.
  - FAQ block with JSON-LD `Article` and `FAQPage` schema.
  - **Must render with JavaScript disabled.**
- **Legal Pages:**
  - `/privacy-policy/` (GDPR/DPDP compliant, zero tracker data selling).
  - `/terms-and-conditions/` (48-hour delivery terms, payment timelines, scope boundaries).
  - `/refund-policy/` (Clear cancellation and refund criteria).
- **Custom Real 404 (`/404.html`):**
  - Human-friendly recovery options: links to top 3 services, search bar, and WhatsApp help button.

---

## 4. MASTER SEO & REDIRECT IMPLEMENTATION

### 4.1 Keyword-to-Page Mapping (Top 15 Primary Targets)

| # | Keyword | Target URL | Intent | Tier |
|---|---|---|---|---|
| 1 | digital marketing agency in pondicherry | `/` | Commercial | Money |
| 2 | best digital marketing company in puducherry | `/` | Commercial | Money |
| 3 | website development company in pondicherry | `/services/website-development/` | Commercial | Money |
| 4 | website design pondicherry | `/services/website-development/` | Commercial | Money |
| 5 | ecommerce website development pondicherry | `/services/ecommerce-website/` | Commercial | Money |
| 6 | seo services in pondicherry | `/services/seo/` | Commercial | Money |
| 7 | seo company pondicherry | `/services/seo/` | Commercial | Money |
| 8 | facebook ads agency pondicherry | `/services/meta-ads/` | Commercial | Money |
| 9 | social media marketing agency pondicherry | `/services/social-media-marketing/` | Commercial | Money |
| 10 | website design cost in pondicherry | `/pricing/` | High Intent | Price |
| 11 | digital marketing agency charges in india | `/pricing/` | High Intent | Price |
| 12 | digital marketing for real estate in tamil nadu | `/industries/real-estate/` | Industry | Sector |
| 13 | seo for hotels in pondicherry | `/industries/hotels-and-villas/` | Industry | Sector |
| 14 | how much does a website cost in tamil nadu | `/blog/website-cost-tamil-nadu/` | Informational | Info |
| 15 | seo package price india | `/blog/seo-cost-india/` | Informational | Info |

### 4.2 301 Redirect Rules (Single-Hop - Zero Chains)

```nginx
# Canonical Host & HTTPS Enforcements
RewriteCond %{HTTP_HOST} ^www\.bmtechx\.in$ [NC]
RewriteRule ^(.*)$ https://bmtechx.in/$1 [R=301,L]

RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://bmtechx.in/$1 [R=301,L]

# Legacy .html to Clean Directory Redirects
RewriteRule ^index\.html$ https://bmtechx.in/ [R=301,L]
RewriteRule ^pricing\.html$ https://bmtechx.in/pricing/ [R=301,L]
RewriteRule ^services\.html$ https://bmtechx.in/services/ [R=301,L]
RewriteRule ^about\.html$ https://bmtechx.in/about/ [R=301,L]
RewriteRule ^contact\.html$ https://bmtechx.in/contact/ [R=301,L]
RewriteRule ^blog/seo-services-pondicherry\.html$ https://bmtechx.in/blog/seo-services-pondicherry/ [R=301,L]

# External Subdomain Consolidation (portfolio-of.bmtechx.in -> bmtechx.in/work/)
# Configure at DNS / Nginx reverse proxy level:
# Host: portfolio-of.bmtechx.in -> Redirect 301 -> https://bmtechx.in/work/
```

### 4.3 Automated JSON-LD Schema Architecture
Every page injects validated Schema JSON-LD before the closing `</head>`:
1. **Homepage:** `Organization` + `LocalBusiness` + `ProfessionalService` + `BreadcrumbList`.
2. **Service Pages:** `Service` (with `provider`, `areaServed`, `offers` pointing to `pricing.json`).
3. **Pricing Page:** `PriceSpecification` + `FAQPage`.
4. **Blog Posts:** `Article` (with `author`, `datePublished`, `dateModified`, `headline`, `image`).

---

## 5. AUTOPILOT, WHATSAPP ATTRIBUTION & TRACKING LAYER

### 5.1 `<WhatsAppCTA>` Component Specification
Every WhatsApp link on the site must be constructed using this exact format:

```
https://wa.me/919944940051?text=Hi%20BM%20TechX%20%E2%80%94%20{Intent}%20%5Bsrc%3A{Tag}%5D
```

- **Tag placement:** The `[src:...]` token is strictly at the **end** of the message so that if the user edits the introductory text, the tracking tag remains intact.
- **Master Tag Map:**
  - `home-hero` / `home-footer` -> General Inquiry Flow
  - `offer-2999` -> Direct Quote: Single-page website
  - `offer-4999` -> Direct Quote: Multi-page website
  - `offer-9999` -> Direct Quote: Online store
  - `seo-audit` -> High-Priority Human Competitor Audit Flow
  - `meta-ads` -> Meta Ads Flow
  - `wa-auto` -> Route directly to human
  - `ind-realestate` -> Real Estate Campaign Flow

### 5.2 Lead Payload Schema (n8n Webhook Target)
When the contact form or quote calculator is submitted, it dispatches a JSON payload directly to the n8n webhook:

```json
{
  "timestamp": "2026-10-14T10:00:00.000Z",
  "source": "contact-page-form",
  "lead": {
    "name": "Arun Kumar",
    "phone": "+919876543210",
    "service_interested": "web-multi",
    "budget": 4999,
    "notes": "Need a multi-page site for dental clinic in Pondicherry"
  },
  "attribution": {
    "page_url": "https://bmtechx.in/contact/",
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "local_brand",
    "user_agent": "Mozilla/5.0..."
  }
}
```

### 5.3 GA4 & Server-Side Tracking Events
- `whatsapp_click`: Fired on every CTA tap with parameter `{ src: "tag-name", page: window.location.pathname }`.
- `generate_lead`: Fired on form submission with `{ service: "...", source: "..." }`.
- `scroll_depth`: Fired at 50% and 90% viewports.

---

## 6. COMPONENT CONTRACTS & REQUIRED COMPONENT LIBRARY

The codebase requires the implementation of these dedicated, single-responsibility components:

| Component | Props / Input | Function / Behavior |
|---|---|---|
| `<PriceCard>` | `id: string` (from `pricing.json`) | Renders name, price, GST note, turnaround SLA, inclusions & exclusions. Never receives raw hardcoded price. |
| `<WhatsAppCTA>` | `src: string`, `intent: string`, `label: string`, `variant?: 'primary' \| 'secondary' \| 'sticky'` | Encodes message with `[src:...]`, triggers GA4 `whatsapp_click` event, opens WhatsApp. |
| `<ProofBlock>` | `id: string` (from `proof.json`), `variant?: 'inline' \| 'feature'` | Handles 8 proof block types. In staging, renders placeholder if `EMPTY`; in production, completely hides empty slots. |
| `<CaseStudyCard>` | `caseId: string` (from `proof.json`) | Renders problem, result metric, verified timeline. Falls back to sector + city if client name unverified. |
| `<ResultStrip>` | `stats: Array<{ value: string, label: string }>` | Compact counter strip. Animations governed by `motion.level`. |
| `<FAQ>` | `items: Array<{ q: string, a: string }>` | Accessible accordion that automatically emits matching `FAQPage` JSON-LD schema into head. |
| `<NotForBlock>` | `items: string[]` | Disqualifier component explaining who the service is not suited for. Present on all service pages. |
| `<TrustFooter>` | Data from `site.json` | Emits Legal Name, CIN, Registered Address, Phone numbers sitewide. |
| `<StickyMobileCTA>` | `src: string`, `intent: string` | Sticks to viewport bottom on mobile screens once user scrolls past the hero section. |

---

## 7. MODULE, TASK & SUBTASK ENGINEERING BREAKDOWN

```
MODULE 1: CORE FOUNDATION & TOKENS (Days 1–3)
├── Task 1.1: Environment & Token Architecture
│   ├── Subtask 1.1.1: Verify Vite + React + TypeScript + Tailwind configuration
│   ├── Subtask 1.1.2: Bind data/theme.json to CSS custom properties (--color-*, --motion-*)
│   └── Subtask 1.1.3: Configure typography scale & self-hosted Google Font fallbacks
├── Task 1.2: Data Ingestion Layer
│   ├── Subtask 1.2.1: Implement typed loaders for site.json, pricing.json, proof.json
│   └── Subtask 1.2.2: Build validation utility to assert zero missing fields on FILLED proof slots
└── Task 1.3: Base Layout & Navigation
    ├── Subtask 1.3.1: Build accessible desktop and mobile sticky navigation header
    └── Subtask 1.3.2: Implement <TrustFooter> pulling entity and CIN directly from site.json

MODULE 2: REUSABLE COMPONENT LIBRARY (Days 4–6)
├── Task 2.1: Conversion & Pricing Components
│   ├── Subtask 2.1.1: Build <WhatsAppCTA> with automatic [src:...] tag generation
│   ├── Subtask 2.1.2: Build <PriceCard> consuming pricing.json IDs
│   └── Subtask 2.1.3: Build <StickyMobileCTA> with scroll-triggered visibility
├── Task 2.2: Proof & Authority System
│   ├── Subtask 2.2.1: Build <ProofBlock> supporting all 8 block types
│   ├── Subtask 2.2.2: Build conditional staging vs. production EMPTY slot filtering
│   └── Subtask 2.2.3: Build <CaseStudyCard> and <ResultStrip> counters
└── Task 2.3: Structure & Content Blocks
    ├── Subtask 2.3.1: Build <FAQ> accordion with auto-generated FAQPage JSON-LD schema
    └── Subtask 2.3.2: Build <NotForBlock> disqualifier component

MODULE 3: CORE MONEY PAGES (Days 7–10)
├── Task 3.1: Homepage Build (`/`)
│   ├── Subtask 3.1.1: Assemble Blocks 1–3 (Hero, Offer Strip, Answer-First Paragraph)
│   └── Subtask 3.1.2: Assemble Blocks 4–12 (Proof bar, Services, Why Us, Case Study, FAQ)
├── Task 3.2: Master Pricing Page (`/pricing/`)
│   ├── Subtask 3.2.1: Build One-Time Builds table & Monthly Retainers matrix
│   └── Subtask 3.2.2: Add terms, quote-only cards, and pricing FAQ
├── Task 3.3: Contact Page (`/contact/`)
│   ├── Subtask 3.3.1: Implement WhatsApp-first hero & secondary contact channels
│   └── Subtask 3.3.2: Build n8n webhook form with honeypot spam prevention
└── Task 3.4: Services Index Hub (`/services/`)
    ├── Subtask 3.4.1: Build service catalog grid linking all 6 verticals
    └── Subtask 3.4.2: Implement "Not Sure Which" advisory comparison matrix

MODULE 4: HIGH-VALUE SERVICE VERTICALS (Days 11–14)
├── Task 4.1: Website Development Page (`/services/website-development/`)
│   ├── Subtask 4.1.1: Build ₹2,999 vs ₹4,999 pricing comparison with 48h clock guide
│   └── Subtask 4.1.2: Embed custom code vs. WordPress speed benchmark & proof samples
├── Task 4.2: Ecommerce Store Page (`/services/ecommerce-website/`)
│   ├── Subtask 4.2.1: Build ₹9,999 no-renewal offer strip & payment gateway breakdown
│   └── Subtask 4.2.2: Embed store screenshots, order notification demo, and FAQ
├── Task 4.3: SEO Services Page (`/services/seo/`)
│   ├── Subtask 4.3.1: Build high-intent competitor check CTA block [src:seo-audit]
│   └── Subtask 4.3.2: Build 3-tier pricing breakdown, AI visibility explainer & proof
└── Task 4.4: Meta Ads Page (`/services/meta-ads/`)
    ├── Subtask 4.4.1: Build fee vs. ad spend explainer and creative deliverables list
    └── Subtask 4.4.2: Embed verified real estate & local business CPL metrics

MODULE 5: REMAINING SERVICES, ABOUT, WORK & BLOG (Days 15–18)
├── Task 5.1: Social Media & WhatsApp Automation
│   ├── Subtask 5.1.1: Build Social Media Marketing page (`/services/social-media-marketing/`)
│   └── Subtask 5.1.2: Build WhatsApp Automation page (`/services/whatsapp-automation/`)
├── Task 5.2: Industry & Work Portfolios
│   ├── Subtask 5.2.1: Build Real Estate industry landing page (`/industries/real-estate/`)
│   └── Subtask 5.2.2: Build Work hub (`/work/`) with verified case study templates
├── Task 5.3: Company Story & Legal Architecture
│   ├── Subtask 5.3.1: Build About page (`/about/`) with team cards & MCA registration
│   ├── Subtask 5.3.2: Build Privacy, Terms, Refund policy pages & custom real 404
│   └── Subtask 5.3.3: Build Blog index & Markdown article template with Article schema

MODULE 6: TESTING & QUALITY ASSURANCE (Days 19–21)
├── Task 6.1: Technical SEO, Schema & Redirect Verification
│   ├── Subtask 6.1.1: Verify single-hop 301 redirects for all legacy URLs via curl
│   └── Subtask 6.1.2: Validate all JSON-LD schema files with Google Rich Results Test
├── Task 6.2: Device, Mobile 4G & Performance Budget Testing
│   ├── Subtask 6.2.1: Benchmark LCP < 2.0s on real mid-range Android phone over 4G
│   └── Subtask 6.2.2: Verify WCAG contrast (4.5:1 body, 3:1 display) & reduced motion
└── Task 6.3: Automation, Webhooks & Conversion Testing
    ├── Subtask 6.3.1: Tap every WhatsApp CTA on real mobile; verify [src:...] tags
    └── Subtask 6.3.2: Test contact form POST to n8n webhook; verify leads sheet entry

MODULE 7: BUG FIXING, POLISH & LAUNCH GATE (Days 22–25)
├── Task 7.1: Bug Remediation & Layout Adjustments
│   ├── Subtask 7.1.1: Fix all P0 and P1 defects logged during testing days
│   └── Subtask 7.1.2: Check mobile viewport overflow and sticky bottom bar clearance
├── Task 7.2: Final Launch Checklist Sign-Off
│   ├── Subtask 7.2.1: Remove noindex meta tags from production build
│   └── Subtask 7.2.2: Confirm crawler access on robots.txt and verify sitemap.xml
└── Task 7.3: Deployment & Go-Live Execution
    ├── Subtask 7.3.1: Deploy production build to primary server / CDN
    ├── Subtask 7.3.2: Submit new sitemap.xml to Google Search Console & Bing Webmaster
    └── Subtask 7.3.3: Execute 5-minute post-deploy verification protocol
```

---

## 8. 25-DAY DAY-BY-DAY PROJECT SCHEDULE

| Day | Phase | Focus Area | Deliverables & Milestones |
|---|---|---|---|
| **Day 1** | Dev (Sprint 1) | Setup & Tokens | Project structure, `data/theme.json` custom property generation, typography setup. |
| **Day 2** | Dev (Sprint 1) | Data Ingestion | Type-safe loaders for `site.json`, `pricing.json`, `proof.json`. Validation script. |
| **Day 3** | Dev (Sprint 1) | Layout & Shell | Responsive sticky header, desktop/mobile navigation, `<TrustFooter>` with CIN/NAP. |
| **Day 4** | Dev (Sprint 1) | Core Components | `<WhatsAppCTA>` with `[src:...]` query engine, `<PriceCard>`, `<StickyMobileCTA>`. |
| **Day 5** | Dev (Sprint 1) | Proof Engine | `<ProofBlock>` with 8 block variants, staging vs. prod empty slot filtering. |
| **Day 6** | Dev (Sprint 1) | Structure Blocks | `<FAQ>` accordion + JSON-LD schema injector, `<NotForBlock>`, `<ResultStrip>`. |
| **Day 7** | Dev (Sprint 2) | Homepage | Block 1 Hero, Block 2 Offer Strip, Block 3 Answer-First Paragraph. |
| **Day 8** | Dev (Sprint 2) | Homepage | Blocks 4–12 (Proof bar, Services, Why Us, Case Study, FAQ, Close). |
| **Day 9** | Dev (Sprint 2) | Pricing Page | Master `/pricing/` table: one-time builds, monthly plans, terms, pricing FAQ. |
| **Day 10** | Dev (Sprint 2) | Contact & Services | `/contact/` with n8n webhook form; `/services/` hub and comparison matrix. |
| **Day 11** | Dev (Sprint 3) | Website Dev Page | `/services/website-development/` with ₹2,999/₹4,999 cards, 48h clock, code vs WP. |
| **Day 12** | Dev (Sprint 3) | Ecommerce Page | `/services/ecommerce-website/` with ₹9,999 store offer, no-renewal guarantee. |
| **Day 13** | Dev (Sprint 3) | SEO Services | `/services/seo/` with competitor audit block (`seo-audit`), 3 tiers, AI visibility. |
| **Day 14** | Dev (Sprint 3) | Meta Ads Page | `/services/meta-ads/` with ₹4,999 fee model, real estate & local CPL metrics. |
| **Day 15** | Dev (Sprint 4) | SMM & WhatsApp | `/services/social-media-marketing/` & `/services/whatsapp-automation/`. |
| **Day 16** | Dev (Sprint 4) | Real Estate & Work | `/industries/real-estate/` multi-district page & `/work/` case study hub. |
| **Day 17** | Dev (Sprint 4) | About & Legal | `/about/` (team & MCA registration), `/privacy-policy/`, `/terms/`, `/404.html`. |
| **Day 18** | Dev (Sprint 4) | Blog & SEO Engine | `/blog/` hub, Markdown article template, `Article` schema, sitemap builder. |
| **Day 19** | **Testing** | Technical & SEO QA | Run 301 single-hop redirect curl checks; Google Rich Results Test on all schemas. |
| **Day 20** | **Testing** | Device & Perf QA | LCP < 2.0s testing on real 4G Android; CLS validation; contrast & a11y audit. |
| **Day 21** | **Testing** | Autopilot & Leads | Tap every WhatsApp CTA on real phone; verify tags; test n8n form webhook. |
| **Day 22** | **Bug Fixing** | Priority P0/P1 Fixes | Address any form submission failures, broken links, or schema errors. |
| **Day 23** | **Bug Fixing** | Polish & Overflow | Mobile responsiveness check, sticky bar padding, typography contrast tweaks. |
| **Day 24** | **Bug Fixing** | Launch Gate Review | Run 12 launch-blocker acceptance tests; verify staging vs production build. |
| **Day 25** | **Launch Day** | Deployment & Go-Live | Remove `noindex`, deploy live build, switch DNS/CDN, submit sitemap to GSC/Bing. |

---

## 9. 5-MINUTE POST-DEPLOYMENT VERIFICATION PROTOCOL

Immediately after production release on Day 25, execute this 5-minute sanity test:

1. **Mobile Network Test:** Open `https://bmtechx.in/` and `https://bmtechx.in/pricing/` on an Android phone over 4G. Verify paint happens in under 2 seconds.
2. **Form Lead Dispatch:** Submit a test lead on `/contact/`. Verify the record appears in the Google Sheet / CRM via n8n within 30 seconds.
3. **WhatsApp Tag Attribution:** Tap the CTA on the ₹2,999 card and the SEO competitor block. Confirm WhatsApp opens with `[src:offer-2999]` and `[src:seo-audit]` intact.
4. **Indexation & Canonical Check:** View source on homepage. Verify `noindex` is absent and `<link rel="canonical" href="https://bmtechx.in/">` is present.
5. **Google Search Console Ping:** Inspect URL on Search Console; request indexing for the top 5 money pages.
