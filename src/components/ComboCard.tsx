import { Check } from 'lucide-react'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'
import { formatPrice, getComboById, getPlanById } from '@/data/dataLayer'

export function ComboCard({ id }: { id: string }) {
  const combo = getComboById(id)
  if (!combo) return null
  let once = 0
  let monthly = 0
  const lines: { label: string; text: string }[] = []
  for (const item of combo.items) {
    const plan = getPlanById(item.id)
    if (!plan || !('price' in plan)) continue
    const isMonthly = ('period' in plan && plan.period === 'month') || ('unit' in plan && plan.unit === 'month')
    const disc = item.discount ?? 0
    const price = plan.price - disc
    if (isMonthly) {
      monthly += price
      lines.push({ label: plan.name, text: `${formatPrice(price)} per month` })
    } else {
      once += price
      lines.push({
        label: plan.name,
        text: disc ? `${formatPrice(price)} once (was ${formatPrice(plan.price)})` : `${formatPrice(price)} once`,
      })
    }
  }
  const total = [once ? `${formatPrice(once)} once` : '', monthly ? `${formatPrice(monthly)} per month` : '']
    .filter(Boolean)
    .join(' + ')
  return (
    <section className="max-w-4xl mx-auto bg-white border-2 border-bm-navy rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
      <h2 className="text-xl sm:text-2xl font-extrabold text-bm-navy-deep font-display">{combo.title}</h2>
      <p className="text-sm text-bm-ink-muted">{combo.note}</p>
      <ul className="space-y-2 text-sm text-bm-ink">
        {lines.map((l) => (
          <li key={l.label} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <span><strong>{l.label}</strong>: {l.text}</span>
          </li>
        ))}
      </ul>
      <p className="text-lg font-black text-bm-navy-deep">{total} <span className="text-xs font-normal text-bm-ink-muted">(+ 18% GST)</span></p>
      <WhatsAppCTA
        src={`combo-${combo.id}`}
        intent={`I am interested in the ${combo.title} (${total}).`}
        label="Ask about this pack"
        variant="primary"
        className="text-sm py-3 px-6"
      />
    </section>
  )
}
