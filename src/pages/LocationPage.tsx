import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check, ChevronRight, MapPin } from 'lucide-react'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'
import { FAQ } from '@/components/FAQ'
import { getLocation, LOCATIONS } from '@/data/locations'
import { formatPrice, getPlanById } from '@/data/dataLayer'
import { NotFoundPage } from '@/pages/NotFoundPage'

const SERVICES = [
  { id: 'web-single', label: 'Single-page website', to: '/services/website-development', note: 'Delivered in 48 working hours' },
  { id: 'web-multi', label: 'Multi-page website', to: '/services/website-development', note: '5 to 7 working days' },
  { id: 'store', label: 'Online store', to: '/services/ecommerce-website', note: 'No software renewal fee' },
  { id: 'seo-starter', label: 'Local SEO', to: '/services/seo', note: 'Per month' },
] as const

export function LocationPage() {
  const { slug = '' } = useParams()
  const loc = getLocation(slug)
  if (!loc) return <NotFoundPage />

  const others = LOCATIONS.filter((l) => l.slug !== loc.slug)

  return (
    <div className="space-y-16 sm:space-y-24 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <nav aria-label="Breadcrumb" className="text-xs text-bm-ink-muted">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="hover:text-bm-navy transition-colors">Home</Link>
          </li>
          <li className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <Link to="/services" className="hover:text-bm-navy transition-colors">Services</Link>
          </li>
          <li className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="font-semibold text-bm-navy-deep">{loc.city}</span>
          </li>
        </ol>
      </nav>

      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-bm-wash-cool border border-bm-brand-soft px-3.5 py-1.5 rounded-full text-xs font-bold text-bm-navy">
          <MapPin className="w-3.5 h-3.5 text-bm-orange" />
          <span>{loc.city} · Published prices · Written scope</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-bm-navy-deep font-display tracking-tight">
          {loc.headline}
        </h1>
        <p className="text-base sm:text-xl text-bm-ink font-medium leading-relaxed max-w-3xl mx-auto bg-white border border-bm-line p-6 sm:p-8 rounded-3xl shadow-sm">
          {loc.answer}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <WhatsAppCTA
            src={`location-${loc.slug}-hero`}
            intent={`I run a business in ${loc.city} and would like a quote.`}
            label="Get a quote on WhatsApp"
            variant="primary"
            className="text-sm sm:text-base py-3.5 px-6 shadow-md"
          />
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-white border border-bm-line hover:border-bm-brand px-5 py-3.5 rounded-xl text-bm-navy transition-colors shadow-sm"
          >
            <span>See all pricing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
          What a {loc.city} business needs online
        </h2>
        <p className="text-sm sm:text-base text-bm-ink-muted leading-relaxed">{loc.intro}</p>
      </section>

      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            What it costs
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">
            Same published prices everywhere. All prices exclude 18% GST.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => {
            const plan = getPlanById(s.id)
            if (!plan) return null
            return (
              <Link
                key={s.id}
                to={s.to}
                className="bg-white rounded-3xl border border-bm-line hover:border-bm-brand p-6 flex flex-col gap-2 shadow-sm transition-colors"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-bm-ink-faint font-mono">{s.label}</span>
                <span className="text-3xl font-black text-bm-navy-deep">
                  {formatPrice(plan.price)}
                  {'period' in plan && plan.period ? (
                    <span className="text-xs font-normal text-bm-ink-muted"> /{plan.period}</span>
                  ) : null}
                </span>
                <span className="text-xs text-bm-ink-muted">{s.note}</span>
              </Link>
            )
          })}
        </div>
        <p className="text-center text-xs text-bm-ink-muted">
          Meta Ads, social media and WhatsApp automation are on the{' '}
          <Link to="/pricing" className="font-bold text-bm-navy hover:underline">pricing page</Link>.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border border-bm-line p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-extrabold text-bm-navy-deep font-display">
            Businesses we work with in {loc.city}
          </h2>
          <ul className="space-y-2.5 text-sm text-bm-ink">
            {loc.businessTypes.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-bm-ink-muted pt-2 border-t border-bm-line-soft">
            Areas we serve include {loc.areas.join(', ')} and nearby.
          </p>
        </div>
        <div className="bg-white rounded-3xl border border-bm-line p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-extrabold text-bm-navy-deep font-display">How it works</h2>
          <ol className="space-y-3 text-sm text-bm-ink list-decimal list-inside">
            {loc.howWeWork.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <FAQ
          items={loc.faqs}
          title={`Questions from ${loc.city} businesses`}
          subtitle="Straight answers on price, timing and what we can and cannot promise."
        />
      </section>

      <section className="bg-bm-navy-deep text-white p-8 sm:p-12 rounded-3xl space-y-6 border border-bm-brand-soft/20 text-center max-w-4xl mx-auto shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
          Tell us about your {loc.city} business.
        </h2>
        <p className="text-sm text-bm-brand-soft leading-relaxed max-w-2xl mx-auto">
          Send your business name and what you want to achieve on WhatsApp. We reply with a written scope, a price and a delivery time.
        </p>
        <div className="pt-2 flex justify-center">
          <WhatsAppCTA
            src={`location-${loc.slug}-footer`}
            intent={`I run a business in ${loc.city}. My business is: . Please send me a quote.`}
            label="Message us on WhatsApp"
            variant="primary"
            className="w-full sm:w-auto text-base py-4 px-8 justify-center shadow-lg"
          />
        </div>
      </section>

      <nav aria-label="Other locations" className="max-w-4xl mx-auto text-center text-xs text-bm-ink-muted space-x-4">
        <span>We also serve:</span>
        {others.map((o) => (
          <Link key={o.slug} to={`/locations/${o.slug}`} className="font-bold text-bm-navy hover:underline">
            {o.city}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default LocationPage
