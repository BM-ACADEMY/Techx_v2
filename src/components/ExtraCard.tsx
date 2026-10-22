import { Check, X } from 'lucide-react'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'
import { formatPrice, getPlanById, type ExtraPlan } from '@/data/dataLayer'

const UNIT: Record<ExtraPlan['unit'], string> = {
  'one-time': 'one-time',
  month: 'per month',
  package: 'per package',
}

export function ExtraCard({ id, highlight }: { id: string; highlight?: boolean }) {
  const plan = getPlanById(id)
  if (!plan || !('unit' in plan)) return null
  const rec = highlight ?? plan.recommended
  return (
    <div
      className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-sm ${
        rec ? 'border-2 border-bm-navy shadow-xl' : 'border border-bm-line'
      }`}
    >
      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-bm-ink-faint font-mono">{plan.name}</span>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-bm-navy-deep">{formatPrice(plan.price)}</span>
          <span className="text-xs text-bm-ink-muted">{UNIT[plan.unit]} (+ 18% GST)</span>
        </div>
        <ul className="space-y-2.5 text-xs sm:text-sm text-bm-ink pt-3 border-t border-bm-line-soft">
          {plan.includes.map((i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{i}</span>
            </li>
          ))}
        </ul>
        {plan.excludes && plan.excludes.length > 0 && (
          <ul className="space-y-1.5 text-xs text-bm-ink-muted pt-3 border-t border-bm-line-soft">
            {plan.excludes.map((i) => (
              <li key={i} className="flex items-start gap-2">
                <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <WhatsAppCTA
        src={`plan-${plan.id}`}
        intent={`I am interested in ${plan.name} (${formatPrice(plan.price)} ${UNIT[plan.unit]})`}
        label="Ask on WhatsApp"
        variant={rec ? 'primary' : 'secondary'}
        className="w-full text-xs py-3 justify-center"
      />
    </div>
  )
}
