# COMPONENT CONTRACT

What the developer may change freely, what must not move, and where the line is.

The point of this file: **you should be able to completely restyle and re-animate this site without
touching a single word of content or breaking its search performance.** If that is not true of the
build, the build is wrong.

---

## The three layers

```
   CONTENT          content/*.md  ·  data/proof.json  ·  data/pricing.json  ·  data/site.json
      ↓             Kamar and Karthika own this. No developer needed to change a price,
                    add a case study, or fill a proof slot.

   STRUCTURE        page templates  ·  block order  ·  heading levels  ·  schema
      ↓             Shared ownership. Changes here need Karthika's sign-off — this layer
                    is what search engines and AI crawlers read.

   PRESENTATION     data/theme.json  ·  CSS  ·  animation  ·  component internals
                    Developer owns this completely. Change anything. No sign-off needed.
```

**A change that stays inside one layer is safe. A change that crosses layers is where sites break.**

---

## Presentation — change anything you like

You do not need to ask about any of this:

- Every colour, via `data/theme.json`
- Both typefaces, the whole type scale, the mobile scale factor
- Spacing, corner radii, shadows, border weights
- All animation — timings, easings, presets, and the global `motion.level` switch
- Card layouts, grid arrangements, how a block looks at each breakpoint
- Icons, illustration style, image treatment
- Whether the design leans on borders or shadows for separation
- Hover, focus and loading states
- The entire CSS architecture and how components are built internally

Three constraints, and they are non-negotiable because they are the product's own sales pitch:

| Constraint | Why |
|---|---|
| **LCP under 2.0s on a mid-range Android over 4G** | You sell speed. A client will run PageSpeed on this site during a call. |
| **Contrast 4.5:1 body, 3:1 at 24px+** | Some of your buyers are over 50 and reading on a phone in daylight. |
| **`prefers-reduced-motion` honoured** | Drop to `motion.level: none`. Not optional. |

---

## Structure — ask Karthika first

These look cosmetic and are not. Each one has a search or conversion consequence.

| Element | Rule | What breaks if you change it |
|---|---|---|
| **The answer-first paragraph** | Stays in the first screen on mobile. Never pushed below the hero image. | It is the passage extracted into AI answers and featured snippets. Bury it and you lose both. |
| **One `<h1>` per page, containing the primary keyword** | Keep the heading level. Restyle it however you want. | Duplicate or missing H1s cost rankings. Styling a `<div>` to look like a heading gives crawlers nothing. |
| **Heading hierarchy** | Never skip levels. Never pick a heading tag for its size. | Screen readers and crawlers both read structure, not font size. |
| **Block order on a page** | The order in `content/*.md` is deliberate. | The offer strip is directly below the fold on purpose. Moving it down measurably costs enquiries. |
| **Schema output** | `seo/schema/*` must keep validating. | Rich results and entity recognition. |
| **URLs** | Never change one after launch without a 301. | Every changed URL without a redirect is a 404 and lost ranking. |
| **`<a>` and `<button>` semantics** | A link that navigates is `<a href>`. A control that acts is `<button>`. | `role="button"` on a div is invisible to Tab. Some of your buyers do not use a mouse. |
| **Alt text and labels** | Every content image has real alt text; every input has a real `<label>`. | Accessibility, and image search. |

---

## Content — never edit from a template

If you find yourself typing a price, a phone number, a client name or a statistic into a `.html`,
`.jsx` or `.css` file, **stop**. It belongs in `data/`.

| What | Lives in | Who changes it |
|---|---|---|
| Prices | `data/pricing.json` | Kamar |
| Entity, NAP, phones, team | `data/site.json` | Kamar |
| Case studies, stats, testimonials, work samples | `data/proof.json` | Kamar / Karthika |
| Page copy | `content/*.md` | Imran |
| Design and motion tokens | `data/theme.json` | Developer |

**The test:** Kamar changes the ₹9,999 store price at 11pm on a Sunday. He edits one file. The
pricing page, all six service pages, the homepage offer strip and the WhatsApp assistant's quote
all change together. Nobody calls the developer.

If that story is not true of your build, the build is not finished.

---

## Required components

Build these as components, not as repeated markup. Each has one definition and one place to restyle it.

| Component | Props / data | Notes |
|---|---|---|
| `<PriceCard>` | id from `pricing.json` | Renders price, GST note, delivery, renewal, inclusions. Never receives a literal price. |
| `<WhatsAppCTA>` | `src`, `intent`, `variant` | Generates the `wa.me` link with the `[src:...]` tag. **The only way a WhatsApp link is ever created.** |
| `<ProofBlock>` | id from `proof.json` | Handles all 8 block types plus the empty state. See `PROOF-SYSTEM.md`. |
| `<CaseStudyCard>` | id from `proof.json` | Falls back to sector + city when the client name has no permission. |
| `<ResultStrip>` | array of stats | Optional counter animation, controlled by `motion.level`. |
| `<FAQ>` | array of Q&A | Emits `FAQPage` schema from the same data it renders. They can never disagree. |
| `<NotForBlock>` | array of strings | The disqualifier block. Present on every service page. |
| `<TrustFooter>` | `site.json` | Legal name, CIN, GSTIN, NAP. Sitewide. |
| `<StickyMobileCTA>` | page `src` | Mobile only, appears past the hero. |

---

## Variants instead of forks

When a block needs to look different somewhere, add a variant — do not copy the component.

```
<ProofBlock id="ads-strip" variant="inline" />     <!-- compact row -->
<ProofBlock id="ads-strip" variant="feature" />    <!-- full-width band -->
<ProofBlock id="ads-strip" variant="sidebar" />    <!-- narrow column -->
```

Two components that render the same data will drift within a month. One component with three
variants will not.

---

## Changing the whole look

A full restyle should be roughly this:

1. Edit `data/theme.json` — colours, both typefaces, radii, shadows, motion level.
2. Rebuild.
3. Run **T3, T4, T9, T10, T11** from `TESTING.md` — on-page SEO, schema, performance, devices, accessibility.
4. Check the answer-first paragraph is still above the fold on a 390px screen.

That is the whole procedure. If a restyle needs more than this, presentation has leaked into
structure somewhere — find it and pull it back.

---

## Animation, specifically

All of it is configured in `data/theme.json` → `motion`. No keyframes inline in templates.

**Ship at `motion.level: "subtle"`.** Hover transitions, one fade-and-rise as a section enters,
counters that animate once. That is enough.

`"expressive"` exists for when someone asks for more. Before switching to it, measure LCP and INP
on a real mid-range Android over 4G — not on the office laptop. If either regresses, switch back.
The person deciding whether to hire you is watching this site load on a phone, and a site that
feels slow contradicts everything the copy claims.

Five rules that do not bend:

1. `prefers-reduced-motion: reduce` → level `none`.
2. Nothing above the fold animates on first paint.
3. `transform` and `opacity` only — never width, height, top or left.
4. Entry animations run **once**. Re-animating on every scroll is nausea, not polish.
5. No animation delays a CTA becoming tappable.

---

## Definition of done

The build is finished when **all seven** are true:

- [ ] Changing one value in `theme.json` restyles every page
- [ ] Changing one price in `pricing.json` updates the site **and** the WhatsApp assistant
- [ ] Setting a proof item to `FILLED` in `proof.json` makes it appear, with no code change
- [ ] An `EMPTY` proof slot shows a labelled placeholder on staging and **nothing at all** in production
- [ ] Karthika can publish a blog post with schema and internal links, without a developer
- [ ] `motion.level: "none"` removes all animation cleanly
- [ ] Nothing in `content/` or `data/` requires a developer to edit
