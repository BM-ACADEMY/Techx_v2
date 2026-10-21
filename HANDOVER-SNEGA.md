# Handover: final site (15 pages + all review fixes)

Branch built from the Black & Mustard redesign (`0270a24`) and merged with every earlier fix.

## What this branch contains
- 14 indexable pages (home, services x6, pricing, about, work, real estate, blog, contact) + 404.
- WhatsApp opens inside the click handler (no popup blocking), `noopener`, via `src/lib/whatsapp.ts`.
- Quote form and Contact form: validate an Indian mobile number, send the lead to the Google Sheet
  (`VITE_LEAD_ENDPOINT`, Apps Script in `apps-script/Code.gs`), then open WhatsApp. The old `/api/leads`
  call that silently showed "Thank you" on failure is gone. The `server/` folder is not used by the site.
- Privacy Policy modal linked from the footer. OG image `public/og-image.png`.
- Fake "Client Login" portal (invented clients and engineers) removed. Old one-page components deleted.
- All unproven numbers removed (PageSpeed scores, 4.9 rating, uptime SLA, "Top 3", uncited percentages).
- Prices are exactly as approved by Kamar (do not change any price). Contact email is admin@bmtechx.in and the GSTIN 34ABGCA7083D1ZS is shown in the footer and in the business data.
- Per-page title, description, canonical and social tags: edit `src/data/seo-routes.json`.
  `npm run build` also runs `scripts/prerender-meta.js`, which writes `dist/<route>/index.html` with those tags
  and regenerates `dist/sitemap.xml`. Link previews and crawlers see the right tags without JavaScript.
- `public/_redirects` (Netlify / Cloudflare Pages) and `vercel.json` send unknown paths to the app. Keep the one your host uses.

## Do this
1. `npm install` then `npm run build` and fix any TypeScript error (this was written without a build environment).
2. Create `.env` with `VITE_LEAD_ENDPOINT=<Apps Script web app URL>` before building. Redeploy after changing it.
3. `npm test` (data, SEO and performance checks) and `npm run lint`.
4. Open every page on a phone. Submit the quote form and the contact form with a test number; a row must appear in the "BM TechX - Leads" sheet and WhatsApp must open with the message filled in.
5. Check `https://bmtechx.in/robots.txt`, `/sitemap.xml`, `/og-image.png`, and view-source on `/services/seo/` (title and canonical must be that page's own).
6. Search Console + Bing Webmaster: verify the domain, submit `sitemap.xml`.

## Do not
- Do not add a number, rating, ranking or client name to any page without proof. Use `src/data/proof.json`
  (an item renders on the live site only when its status is FILLED).
- Do not change any price or contact detail without Kamar's written OK. If you change a price on a page, update the quote-form list in `src/data/siteData.ts` too.
