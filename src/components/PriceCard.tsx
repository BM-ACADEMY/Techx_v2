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
        'bg-[#12141D] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative',
        isRecommended
          ? 'border-2 border-[#FFE600] shadow-[0_0_35px_rgba(255,230,0,0.18)] scale-[1.02] z-10'
          : 'border border-[#232636] hover:border-[#FFE600]/50 hover:shadow-[0_0_30px_rgba(255,230,0,0.1)]',
        className
      )}
    >
      {isRecommended && (
        <div className="absolute -top-3.5 left-6 bg-[#FFE600] text-black text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
          <Zap className="w-3 h-3 fill-black text-black" />
          <span>Recommended Choice</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Plan Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
            {plan.name}
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-4xl sm:text-5xl font-black text-[#FFE600] tracking-tight font-display">
              {formatPrice(plan.price)}
            </span>
            <span className="text-xs font-bold text-[#94A3B8]">
              {'period' in plan && plan.period ? `/${plan.period}` : ''} (+ 18% GST)
            </span>
          </div>
        </div>

        {/* SLA or Keyword Badge */}
        <div>
          {isOneTime && (plan as OneTimePlan).delivery && (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-xl">
              {(plan as OneTimePlan).delivery.includes('48') ? (
                <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              ) : (
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>Live in {(plan as OneTimePlan).delivery}</span>
            </div>
          )}

          {!isOneTime && (plan as MonthlyPlan).keywords && (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFE600] bg-[#FFE600]/10 border border-[#FFE600]/30 px-3 py-1 rounded-xl">
              <Target className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>{(plan as MonthlyPlan).keywords} Target Keywords</span>
            </div>
          )}
        </div>

        {/* Inclusions */}
        {plan.includes && plan.includes.length > 0 && (
          <div className="pt-4 border-t border-[#232636]">
            <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2.5">
              What's Included:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#CBD5E1]">
              {plan.includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exclusions */}
        {plan.excludes && plan.excludes.length > 0 && (
          <div className="pt-3 border-t border-[#232636]/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
              Excludes:
            </p>
            <ul className="space-y-1 text-xs text-[#94A3B8]">
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
          <div className="p-3 rounded-2xl bg-[#08090D] border border-[#232636] text-xs text-[#94A3B8] flex items-start gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-[#FFE600] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Renewal Policy: </span>
              {(plan as OneTimePlan).renewal.amount === 0 ? (
                <span className="text-emerald-400 font-bold">No yearly renewal fee.</span>
              ) : (
                <span className="text-[#CBD5E1]">
                  {formatPrice((plan as OneTimePlan).renewal.amount)} / {(plan as OneTimePlan).renewal.period}{' '}
                  ({(plan as OneTimePlan).renewal.covers || 'Domain + Cloud Server'})
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action CTA */}
      <div className="pt-6 mt-6 border-t border-[#232636]">
        <WhatsAppCTA
          src={sourceTag}
          intent={intent}
          label={ctaLabel || `Order ${plan.name}`}
          variant={isRecommended ? 'primary' : 'secondary'}
          className={cn(
            'w-full py-3.5 text-sm rounded-xl font-extrabold',
            isRecommended
              ? 'bg-[#FFE600] text-black hover:bg-[#FFD000] shadow-[0_0_20px_rgba(255,230,0,0.25)]'
              : 'bg-[#181B27] text-white hover:bg-[#232636] border border-[#232636]'
          )}
          onClick={() => onSelect && onSelect(plan)}
        />
      </div>
    </div>
  );
}

export default PriceCard;
