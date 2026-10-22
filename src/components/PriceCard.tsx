import { Check, X, Zap, Clock, Target, RefreshCw } from 'lucide-react';
import { getPlanById, formatPrice } from '@/data/dataLayer';
import type { OneTimePlan, MonthlyPlan, ExtraPlan } from '@/data/dataLayer';
import { WhatsAppCTA } from './WhatsAppCTA';
import { cn } from '@/lib/utils';

export interface PriceCardProps {
  id: string;
  className?: string;
  highlight?: boolean;
  ctaTag?: string;
  ctaLabel?: string;
  onSelect?: (plan: OneTimePlan | MonthlyPlan | ExtraPlan) => void;
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
      <div className="p-6 border border-dashed border-red-500/50 rounded-2xl bg-red-950/20 text-red-400 text-xs font-mono">
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
        'bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative shadow-sm',
        isRecommended
          ? 'border-2 border-[#FFE600] shadow-xl scale-[1.02] z-10 ring-4 ring-[#FFE600]/20'
          : 'border border-[#E2E8F0] hover:border-black/30 hover:shadow-md',
        className
      )}
    >
      {isRecommended && (
        <div className="absolute -top-3.5 left-6 bg-[#FFE600] text-black text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5 border border-black/10">
          <Zap className="w-3 h-3 fill-black text-black" />
          <span>Recommended Choice</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Plan Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {plan.name}
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-4xl sm:text-5xl font-black text-[#0A0B0E] tracking-tight font-display">
              {formatPrice(plan.price)}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {'period' in plan && plan.period ? `/${plan.period}` : ''} (+ 18% GST)
            </span>
          </div>
        </div>

        {/* SLA or Keyword Badge */}
        <div>
          {isOneTime && (plan as OneTimePlan).delivery && (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
              {(plan as OneTimePlan).delivery.includes('48') ? (
                <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              ) : (
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
              )}
              <span>Live in {(plan as OneTimePlan).delivery}</span>
            </div>
          )}

          {!isOneTime && (plan as MonthlyPlan).keywords && (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-black bg-[#FFE600]/25 border border-[#FFE600]/60 px-3 py-1 rounded-xl">
              <Target className="w-3.5 h-3.5 text-black" />
              <span>{(plan as MonthlyPlan).keywords} Target Keywords</span>
            </div>
          )}
        </div>

        {/* Pay 3 months upfront */}
        {!isOneTime && (plan as MonthlyPlan).upfront_3_months && (
          <div className="p-3 rounded-2xl bg-[#FFE600]/10 border border-dashed border-[#FFE600]/60 space-y-1">
            <p className="text-xs font-bold text-slate-900">Pay 3 months upfront</p>
            <p className="text-lg font-black text-[#0A0B0E]">
              {formatPrice((plan as MonthlyPlan).upfront_3_months!.price)}{' '}
              <span className="text-[11px] font-normal text-slate-500">+ 18% GST</span>
            </p>
            <p className="text-xs font-bold text-emerald-600">
              Save {formatPrice((plan as MonthlyPlan).upfront_3_months!.save)}
              {(plan as MonthlyPlan).upfront_3_months!.setup_free ? ' and setup is free' : ''}
            </p>
          </div>
        )}

        {/* Inclusions */}
        {plan.includes && plan.includes.length > 0 && (
          <div className="pt-4 border-t border-[#F1F5F9]">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              What's Included:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {plan.includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-800 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exclusions */}
        {plan.excludes && plan.excludes.length > 0 && (
          <div className="pt-3 border-t border-[#F1F5F9]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Excludes:
            </p>
            <ul className="space-y-1 text-xs text-slate-400">
              {plan.excludes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Renewal Notes */}
        {isOneTime && (plan as OneTimePlan).renewal && (
          <div className="p-3 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] text-xs text-slate-600 flex items-start gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Renewal Policy: </span>
              {(plan as OneTimePlan).renewal.amount === 0 ? (
                <span className="text-emerald-700 font-bold">No yearly renewal fee.</span>
              ) : (
                <span className="text-slate-700">
                  {formatPrice((plan as OneTimePlan).renewal.amount)} / {(plan as OneTimePlan).renewal.period}{' '}
                  ({(plan as OneTimePlan).renewal.covers || 'Domain + Cloud Server'})
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action CTA */}
      <div className="pt-6 mt-6 border-t border-[#F1F5F9]">
        <WhatsAppCTA
          src={sourceTag}
          intent={intent}
          label={ctaLabel || `Order ${plan.name}`}
          variant={isRecommended ? 'primary' : 'secondary'}
          className={cn(
            'w-full py-3.5 text-sm rounded-xl font-extrabold transition-all',
            isRecommended
              ? 'bg-[#FFE600] text-black hover:bg-[#FFD000] shadow-md border border-black/10'
              : 'bg-[#0A0B0E] text-white hover:bg-neutral-800 border border-black'
          )}
          onClick={() => onSelect && onSelect(plan)}
        />
      </div>
    </div>
  );
}

export default PriceCard;
