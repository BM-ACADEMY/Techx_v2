# Autopilot specification

Nine stages from first message to a live client. The machine owns stages 1–4 outright.
The value is not that it is clever — it is that it never forgets to follow up.

---

## STOP — preconditions

Stages 1–4 stay **off** until all six are true. Autopilot does not fix a broken conversation;
it repeats it faster and at volume. These are the failures your own test logs record.

| ID | Must be true | Status |
|---|---|---|
| P1 | Fallback no longer re-greets on an unmatched message (today, "contact number" resets the flow and wipes an in-progress booking) | **OPEN** |
| P2 | Booking fields persist across turns — no re-asking answered questions | **OPEN** |
| P3 | Identity questions without a keyword don't make the router guess or flip brand | **OPEN** |
| P4 | Double-texting eliminated | **OPEN** |
| P5 | Two consecutive clean 10-message tests passed | **OPEN** |
| P6 | Adversarial test passed — bot refuses to quote a custom build, refuses a discount, refuses a date on custom work | **OPEN** |

Tracked in `guardrails.json` → `preconditions`.

---

## The nine stages

### 1 · Capture — machine
Lead arrives from WhatsApp, a site form, a Meta lead ad or a missed call. Normalise the phone
number to `91XXXXXXXXXX` **first** — it is the dedup key across every brand. Parse the
`[src:...]` tag. Write the full `lead-payload` before anything else runs.

**Dedup across all brands, not just this one.** A repeat client greeted as a stranger is a live
failure today and it costs more than any missed lead.

### 2 · Identify — machine
Brand detection runs **once**, then sticks. If a `src` tag is present, skip detection entirely —
the page already told you. Mirror the customer's greeting; never recite the brand list.

### 3 · Qualify — machine
Four things, asked conversationally, stored as they arrive: what they sell, which city, which
service, rough budget band. **Never re-ask a field that has a value.** Score and assign a rep.

### 4 · Quote — machine, inside guardrails
Published prices only, from `data/pricing.json`. State GST treatment and renewal terms.
Anything not on the price list → human. No discounts, ever.

### 5 · Demo — machine schedules, human runs
Book a slot. All four must fire: Google Calendar, leads sheet, in-conversation confirmation, and
a **separate scheduled WhatsApp reminder to the lead**. Calendar invites notify the organiser,
not the customer — this is why the 15/07 demo booking produced no reminder.

### 6 · Close — human (Kamar)
Roughly four in five closes are direct. The machine's job is that Kamar is never closing a lead
he hasn't been briefed on: the summary arrives **before** the call.

### 7 · Provision — machine
On payment: create the project record, send the intake form, register the domain, spin up the
tenant for store clients, open the delivery checklist with the 48-hour clock started and visible
to the client.

### 8 · Onboard — machine drafts, human sends
Welcome sequence, what's needed from them, who their contact is, what happens in week one.

### 9 · Nurture — machine
Non-closers enter the capped follow-up sequence. Delivered clients enter a renewal and upsell
track — the ₹2,999 buyer is the ₹4,999/month SEO client twelve months from now, and converting
past clients to retainers is the revenue lever already chosen.

---

## The eight n8n workflows

Mapped to the existing LeadOS build. The architecture is sound on paper; live tests contradict it,
so the **Fix** column is what actually needs doing.

| # | Workflow | Trigger | Fix required |
|---|---|---|---|
| 1 | Lead Integrator | Webhook, all sources | Normalise phone at intake. Enforce one payload shape. **Dedup is failing — this is the root cause.** |
| 2 | Sales Engine | New lead | Read `src` tag before anything else. Load `guardrails.json` first. Persist qualification fields. |
| 3 | Follow-up Engine | Hourly cron | Add the 3-attempt cap, quiet hours, and stop-word handling. Currently unbounded. |
| 4 | Reminder Engine | Daily 08:00 | Extend to post the morning brief to the team group (see Execution Pattern §8). |
| 5 | Customer Journey | Payment confirmed | Wire to the provisioning checklist and the client-visible 48-hour clock. |
| 6 | Marketing Automation | Daily 09:00 | Respect opt-outs and quiet hours. |
| 7 | Founder Dashboard | Daily 09:30 | **Validity is failing in tests** — fix the underlying data before trusting the summary. |
| 8 | Admin Maintenance | Nightly 02:00 | Add a nightly guardrail audit: any message that quoted an unlisted price gets flagged. |

---

## What the website must provide

| Requirement | Where | Ticket |
|---|---|---|
| Source-tagged CTAs on every button | `autopilot/cta-links.md` | D8 |
| One webhook endpoint, one payload shape | `autopilot/lead-payload.schema.json` | D9 |
| Machine-readable price list | `data/pricing.json` | D6 |
| Public booking page with real availability | Contact page | D5 |
| Server-side GA4 + Meta CAPI events | `tracking/events-spec.md` | D9 |
| Project status pages (post-launch) | — | Backlog |

---

## Test script — run before enabling

Ten messages, twice, with clean results both times.

1. `Hi` → mirrors greeting, no brand recital
2. `how much for a website` → quotes ₹2,999 and ₹4,999, states GST
3. `contact number` → answers **without** re-greeting or resetting *(P1)*
4. `I'm in Cuddalore` → stores city, doesn't re-ask it later *(P2)*
5. `who are you` → identifies as an assistant, doesn't flip brand *(P3)*
6. `can you do 2000` → **handover to Kamar**, no counter-offer
7. `I need a hotel booking system` → **handover**, no price, no date
8. `book a call` → offers real slots
9. `tomorrow 11` → confirms, writes calendar, logs sheet, **schedules lead reminder** *(stage 5)*
10. `what time was my call` → recalls it correctly *(P2)*

Then the adversarial pass: try to make it quote a custom build, offer a discount, and promise a
delivery date on custom work. **It must refuse all three.**

---

## Rollout

| Phase | Scope | Gate |
|---|---|---|
| 0 | Fix P1–P6 | Two clean test runs |
| 1 | Stages 1–2 only (capture + identify), humans do the rest | One week, zero mis-routes |
| 2 | Add stage 3 (qualify) | One week, no re-asked fields |
| 3 | Add stage 4 (quote) — **published prices only** | Two weeks, zero unlisted quotes |
| 4 | Add stage 5 (booking) | Every booking produces a lead reminder |
| 5 | Add stages 7–9 | Handoff rate under 30% |

**Do not skip phases.** Each one adds a way for the system to be wrong in front of a customer,
and you want to find that out on ten leads rather than a hundred.

---

## What to watch

| Metric | Healthy | Warning sign |
|---|---|---|
| Handoff rate | Under 30% by month 3 | **Low handoff + low close rate is worse than high handoff** — it means the bot is losing people quietly. Always read them together. |
| First response time | Under 2 min, any hour | Anything over 15 min |
| Unlisted-price quotes | Zero | Any — investigate the same day |
| Re-asked fields | Zero | Any — P2 has regressed |
| Follow-ups per lead | Max 3 | Any 4th — the cap has failed and the WABA is at risk |
