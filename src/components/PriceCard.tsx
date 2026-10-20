import { Check, X, Zap, Clock, Target, RefreshCw } from 'lucide-react';
import { getPlanById, formatPrice } from '@/data/dataLayer';
import type { OneTimePlan, MonthlyPlan } from '@/data/dataLayer';
import { WhatsAppCTA } from './WhatsAppCTA';
import { cn } from '@/lib/utils';

export interface PriceCardProps {
  id: string;
  className?: string;
  highlight?: boolean;
  ctaTag?: string;
  ctaLabel?: string;
  onSelect?: (plan: OneTimePlan | MonthlyPlan) => void;
}

export function PriceCard({
  id,
  className,
  highlight,
  ctaTag,
  ctaLabel,
  onSelect,
}: PriceCardProps) {
  const plan = getPlanById(id);

  if (!plan) {
    return (
      <div className="p-6 border border-dashed border-red-300 rounded-2xl bg-red-50 text-red-700 text-xs font-mono">
        Error: Plan ID "{id}" not found in pricing.json
      </div>
    );
  }

  const isOneTime = 'delivery' in plan;
  const isRecommended = highlight ?? ('recommended' in plan ? plan.recommended : false);

  // Default intent for WhatsApp
  const intent = isOneTime
    ? `I want the ${formatPrice(plan.price)} ${plan.name}`
    : `I am interested in ${plan.name} (${formatPrice(plan.price)}/mo)`;

  // Default CTA source tag from autopilot spec
  const sourceTag = ctaTag || (isOneTime ? `offer-${plan.price}` : `plan-${plan.id}`);

  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative',
        isRecommended
          ? 'border-2 border-bm-navy shadow-xl scale-[1.02] z-10'
          : 'border border-bm-line shadow-sm hover:border-bm-navy/40 hover:shadow-md',
        className
      )}
    >
      {isRecommended && (
        <div className="absolute -top-3.5 left-6 bg-bm-navy text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          Recommended Choice
        </div>
      )}

      <div className="space-y-4">
        {/* Plan Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-bm-ink-faint">
            {plan.name}
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-4xl sm:text-5xl font-black text-bm-navy-deep tracking-tight">
              {formatPrice(plan.price)}
            </span>
            <span className="text-xs font-bold text-bm-ink-faint">
              {'period' in plan && plan.period ? `/${plan.period}` : ''} (+ 18% GST)
            </span>
          </div>
        </div>

        {/* SLA or Keyword Badge */}
        <div>
          {isOneTime && (plan as OneTimePlan).delivery && (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
              {(plan as OneTimePlan).delivery.includes('48') ? (
                <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              ) : (
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
              )}
              <span>Live in {(plan as OneTimePlan).delivery}</span>
            </div>
          )}

          {!isOneTime && (plan as MonthlyPlan).keywords && (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-bm-navy bg-bm-wash-cool border border-bm-brand-soft px-3 py-1 rounded-lg">
              <Target className="w-3.5 h-3.5 text-bm-orange" />
              <span>{(plan as MonthlyPlan).keywords} Target Keywords</span>
            </div>
          )}
        </div>

        {/* Inclusions */}
        {plan.includes && plan.includes.length > 0 && (
          <div className="pt-4 border-t border-bm-line/60">
            <p className="text-xs font-bold uppercase tracking-wider text-bm-ink-faint mb-2.5">
              What's Included:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-bm-ink">
              {plan.includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exclusions */}
        {plan.excludes && plan.excludes.length > 0 && (
          <div className="pt-3 border-t border-bm-line/40">
            <p className="text-[11px] font-bold uppercase tracking-wider text-bm-ink-faint mb-1.5">
              Excludes:
            </p>
            <ul className="space-y-1 text-xs text-bm-ink-faint">
              {plan.excludes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <X className="w-3.5 h-3.5 text-bm-terracotta shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Renewal Notes */}
        {isOneTime && (plan as OneTimePlan).renewal && (
          <div className="p-3 rounded-xl bg-bm-ground-alt/70 border border-bm-line text-xs text-bm-ink-muted flex items-start gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-bm-navy shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-bm-navy">Renewal Policy: </span>
              {(plan as OneTimePlan).renewal.amount === 0 ? (
                <span className="text-emerald-700 font-bold">No yearly renewal fee.</span>
              ) : (
                <span>
                  {formatPrice((plan as OneTimePlan).renewal.amount)} / {(plan as OneTimePlan).renewal.period}{' '}
                  ({(plan as OneTimePlan).renewal.covers || 'Domain + Cloud Server'})
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action CTA */}
      <div className="pt-6 mt-6 border-t border-bm-line/60">
        <WhatsAppCTA
          src={sourceTag}
          intent={intent}
          label={ctaLabel || `Order ${plan.name}`}
          variant={isRecommended ? 'primary' : 'secondary'}
          className="w-full py-4 text-sm"
          onClick={() => onSelect && onSelect(plan)}
        />
      </div>
    </div>
  );
}

export default PriceCard;
