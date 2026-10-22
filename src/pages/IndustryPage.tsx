import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check, ChevronRight, X } from 'lucide-react'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'
import { FAQ } from '@/components/FAQ'
import { ComboCard } from '@/components/ComboCard'
import { SlotsBanner } from '@/components/SlotsBanner'
import { getIndustry, INDUSTRIES } from '@/data/industries'
import { formatPrice, getPlanById } from '@/data/dataLayer'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function IndustryPage() {
  const { slug = '' } = useParams()
  const ind = getIndustry(slug)
  if (!ind) return <NotFoundPage />
  const others = INDUSTRIES.filter((i) => i.slug !== ind.slug)

  return (
    <div className="space-y-16 sm:space-y-24 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <nav aria-label="Breadcrumb" className="text-xs text-bm-ink-muted">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-bm-navy">Home</Link></li>
          <li className="flex items-center space-x-2"><ChevronRight className="w-3.5 h-3.5 opacity-50" /><Link to="/services" className="hover:text-bm-navy">Services</Link></li>
          <li className="flex items-center space-x-2"><ChevronRight className="w-3.5 h-3.5 opacity-50" /><span className="font-semibold text-bm-navy-deep">{ind.name}</span></li>
        </ol>
      </nav>

      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="flex justify-center"><SlotsBanner /></div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-bm-navy-deep font-display tracking-tight">{ind.headline}</h1>
        <p className="text-base sm:text-xl text-bm-ink font-medium leading-relaxed max-w-3xl mx-auto bg-white border border-bm-line p-6 sm:p-8 rounded-3xl shadow-sm">{ind.answer}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <WhatsAppCTA src={`industry-${ind.slug}-hero`} intent={`I run a business in this category: ${ind.name}. Please send me a quote.`} label="Get a quote on WhatsApp" variant="primary" className="text-sm sm:text-base py-3.5 px-6 shadow-md" />
          <Link to="/pricing" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-white border border-bm-line hover:border-bm-brand px-5 py-3.5 rounded-xl text-bm-navy shadow-sm">
            <span>See all pricing</span><ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">What your customers look for</h2>
        <p className="text-sm sm:text-base text-bm-ink-muted leading-relaxed">{ind.intro}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border border-bm-line p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-extrabold text-bm-navy-deep font-display">What the website should include</h2>
          <ul className="space-y-2.5 text-sm text-bm-ink">
            {ind.needs.map((n) => (<li key={n} className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /><span>{n}</span></li>))}
          </ul>
        </div>
        <div className="bg-white rounded-3xl border border-bm-line p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-extrabold text-bm-navy-deep font-display">What we advise against</h2>
          <ul className="space-y-2.5 text-sm text-bm-ink">
            {ind.avoid.map((n) => (<li key={n} className="flex items-start gap-2"><X className="w-4 h-4 text-red-600 mt-0.5 shrink-0" /><span>{n}</span></li>))}
          </ul>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">What it costs</h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">Published prices. All prices exclude 18% GST.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {ind.plans.map((id) => {
            const plan = getPlanById(id)
            if (!plan) return null
            return (
              <Link key={id} to="/pricing" className="bg-white rounded-3xl border border-bm-line hover:border-bm-brand p-6 flex flex-col gap-2 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-bm-ink-faint font-mono">{plan.name}</span>
                <span className="text-3xl font-black text-bm-navy-deep">
                  {formatPrice(plan.price)}
                  {'period' in plan && plan.period ? <span className="text-xs font-normal text-bm-ink-muted"> /{plan.period}</span> : null}
                </span>
                {'delivery' in plan && plan.delivery ? <span className="text-xs text-bm-ink-muted">{String(plan.delivery)}</span> : null}
              </Link>
            )
          })}
        </div>
      </section>

      {ind.combo && <ComboCard id={ind.combo} />}

      <section><FAQ items={ind.faqs} title={`Questions from ${ind.name.toLowerCase()}`} subtitle="Straight answers on price, timing and what we can and cannot promise." /></section>

      <section className="bg-bm-navy-deep text-white p-8 sm:p-12 rounded-3xl space-y-6 text-center max-w-4xl mx-auto shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">Tell us about your business.</h2>
        <p className="text-sm text-bm-brand-soft max-w-2xl mx-auto">Send your business name and what you want on WhatsApp. We reply with a written scope, a price and a delivery time.</p>
        <div className="flex justify-center">
          <WhatsAppCTA src={`industry-${ind.slug}-footer`} intent={`I run a business in this category: ${ind.name}. Please send me a quote.`} label="Message us on WhatsApp" variant="primary" className="w-full sm:w-auto text-base py-4 px-8 justify-center shadow-lg" />
        </div>
      </section>

      <nav aria-label="Other industries" className="max-w-4xl mx-auto text-center text-xs text-bm-ink-muted space-x-4">
        <span>Also see:</span>
        <Link to="/industries/real-estate" className="font-bold text-bm-navy hover:underline">Real Estate</Link>
        {others.map((o) => (<Link key={o.slug} to={`/industries/${o.slug}`} className="font-bold text-bm-navy hover:underline">{o.name}</Link>))}
      </nav>
    </div>
  )
}

export default IndustryPage
