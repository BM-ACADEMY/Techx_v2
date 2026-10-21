# Snega: new pages patch (BM TechX)

Apply ONE file: `techx-all-new-pages.patch` (it contains everything below; do not apply the other three patches as well).
It applies on top of current main (64a218e).

    git checkout -b new-pages main
    git apply --check techx-all-new-pages.patch
    git apply techx-all-new-pages.patch
    npm ci
    node scripts/validate-data.js
    node scripts/test-seo-schema.js
    npm run build
    npm run lint

## What it adds
- 7 city pages: /locations/puducherry, cuddalore, villupuram, chennai, madurai, tiruchirappalli, namakkal
- 5 blog article pages: /blog/<slug> (old modal summaries removed)
- 3 industry pages: /industries/clinics, schools, restaurants
- 3 case studies on /work (Namma Pondy Properties, Velai Vaaippu, Raahath Dental)
- Per-route titles in src/data/seo-routes.json, sitemap (now 29 URLs), nav and footer links

## Check before deploy
1. If `npm run build` or lint reports a type error, fix it in place and tell Kamar what you changed. I could not run the full build (no npm access here), only the repo test scripts and a syntax check.
2. After build, open dist/locations/madurai/index.html and dist/blog/website-cost-puducherry/index.html. Each must have its own <title>, canonical and description (prerender-meta.js writes these).
3. Open on a phone: one city page, one blog post, one industry page, /work. Tap the WhatsApp button on each; it must open WhatsApp with a message.
4. Submit a test from the contact page; confirm a row lands in the Leads sheet with source tag.
5. Do NOT change prices, and do NOT add numbers, ratings or client names to these pages. Prices are read from src/data/pricing.json.

## After deploy
Tell Kamar the deploy is live so he can submit URLs in Search Console.
