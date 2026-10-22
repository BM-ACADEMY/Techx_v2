import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check, ChevronRight, X } from 'lucide-react'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'
import { FAQ } from '@/components/FAQ'
import { ExtraCard } from '@/components/ExtraCard'
import { SlotsBanner } from '@/components/SlotsBanner'
import { getLanding, LANDINGS } from '@/data/landings'
import { getExtrasByGroup } from '@/data/dataLayer'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function ServicePage() {
  const { slug = '' } = useParams()
  const page = getLanding(slug)
  if (!page) return <NotFoundPage />
  const plans = getExtrasByGroup(page.group)
  const cols = plans.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
  const others = LANDINGS.filter((l) => l.slug !== page.slug)

  return (
    <div className="space-y-16 sm:space-y-24 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <nav aria-label="Breadcrumb" className="text-xs text-bm-ink-muted">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-bm-navy">Home</Link></li>
          <li className="flex items-center space-x-2"><ChevronRight className="w-3.5 h-3.5 opacity-50" /><Link to="/services" className="hover:text-bm-navy">Services</Link></li>
          <li className="flex items-center space-x-2"><ChevronRight className="w-3.5 h-3.5 opacity-50" /><span className="font-semibold text-bm-navy-deep">{page.navLabel}</span></li>
        </ol>
      </nav>

      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="flex justify-center"><SlotsBanner /></div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-bm-navy-deep font-display tracking-tight">{page.headline}</h1>
        <p className="text-base sm:text-xl text-bm-ink font-medium leading-relaxed max-w-3xl mx-auto bg-white border border-bm-line p-6 sm:p-8 rounded-3xl shadow-sm">{page.answer}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <WhatsAppCTA src={`service-${page.slug}-hero`} intent={`I am interested in ${page.navLabel}.`} label="Ask on WhatsApp" variant="primary" className="text-sm sm:text-base py-3.5 px-6 shadow-md" />
          <Link to="/pricing" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-white border border-bm-line hover:border-bm-brand px-5 py-3.5 rounded-xl text-bm-navy shadow-sm">
            <span>See all pricing</span><ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">Why it matters</h2>
        <p className="text-sm sm:text-base text-bm-ink-muted leading-relaxed">{page.intro}</p>
      </section>

      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">Plans and prices</h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">Published prices. All prices exclude 18% GST.</p>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-6 items-stretch max-w-6xl mx-auto`}>
          {plans.map((p) => (<ExtraCard key={p.id} id={p.id} />))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border border-bm-line p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-extrabold text-bm-navy-deep font-display">Who this is for</h2>
          <ul className="space-y-2.5 text-sm text-bm-ink">
            {page.whoFor.map((w) => (<li key={w} className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /><span>{w}</span></li>))}
          </ul>
        </div>
        <div className="bg-white rounded-3xl border border-bm-line p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-extrabold text-bm-navy-deep font-display">How it works</h2>
          <ol className="space-y-3 text-sm text-bm-ink list-decimal list-inside">
            {page.howItWorks.map((h) => (<li key={h}>{h}</li>))}
          </ol>
        </div>
      </section>

      <section className="max-w-4xl mx-auto bg-bm-wash-warm border border-bm-wash-warm-line rounded-3xl p-6 sm:p-8 space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-bm-navy-deep font-display">Who this is not for</h2>
        <ul className="space-y-2 text-sm text-bm-ink">
          {page.notFor.map((n) => (<li key={n} className="flex items-start gap-2"><X className="w-4 h-4 text-red-600 mt-0.5 shrink-0" /><span>{n}</span></li>))}
        </ul>
      </section>

      <section><FAQ items={page.faqs} title="Common questions" subtitle="Straight answers on price, timing and what we can and cannot promise." /></section>

      <section className="bg-bm-navy-deep text-white p-8 sm:p-12 rounded-3xl space-y-6 text-center max-w-4xl mx-auto shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">Tell us what you need.</h2>
        <p className="text-sm text-bm-brand-soft max-w-2xl mx-auto">Send a short message on WhatsApp. We reply with a written scope, a price and a delivery time.</p>
        <div className="flex justify-center">
          <WhatsAppCTA src={`service-${page.slug}-footer`} intent={`I am interested in ${page.navLabel}. Please send details.`} label="Message us on WhatsApp" variant="primary" className="w-full sm:w-auto text-base py-4 px-8 justify-center shadow-lg" />
        </div>
      </section>

      <nav aria-label="Related" className="max-w-4xl mx-auto text-center text-xs text-bm-ink-muted flex flex-wrap justify-center gap-x-4 gap-y-1">
        <span>Related:</span>
        {page.related.map((r) => (<Link key={r.to} to={r.to} className="font-bold text-bm-navy hover:underline">{r.label}</Link>))}
        {others.map((o) => (<Link key={o.slug} to={`/services/${o.slug}`} className="font-bold text-bm-navy hover:underline">{o.navLabel}</Link>))}
      </nav>
    </div>
  )
}

export default ServicePage
