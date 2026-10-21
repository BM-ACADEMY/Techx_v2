import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { getProofItemById, type ProofItem } from '@/data/dataLayer';
import { WhatsAppCTA } from './WhatsAppCTA';
import { cn } from '@/lib/utils';

export interface CaseStudyCardProps {
  id?: string;
  item?: ProofItem;
  className?: string;
  onSelect?: () => void;
}

export function CaseStudyCard({ id, item: directItem, className, onSelect }: CaseStudyCardProps) {
  const item = directItem || (id ? getProofItemById(id) : undefined);

  if (!item) {
    if (import.meta.env.PROD) return null;
    return (
      <div className="p-6 border border-dashed border-[#232636] rounded-2xl bg-[#0E1017] text-xs text-[#94A3B8] font-mono">
        [ CaseStudyCard: {id || 'unnamed'} — Missing Proof Item ]
      </div>
    );
  }

  // Client Permission Fallback Rule
  const displayClient = item.client && item.client.trim() !== ''
    ? item.client
    : (item.client_fallback || `${item.sector || 'Commercial Client'} · ${item.city || 'Tamil Nadu'}`);

  const headlineMetric = item.headline_number || item.value || 'Verified Growth';
  const headlineLabel = item.headline_label || item.label || 'Measurable Client Results';

  return (
    <div
      className={cn(
        'bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-black/30 hover:shadow-md transition-all duration-300',
        className
      )}
    >
      <div className="space-y-4">
        {/* Header Tags */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-black bg-[#FFE600]/25 border border-[#FFE600]/60 px-3 py-0.5 rounded-full uppercase tracking-wider">
            {item.sector || 'Case Study'}
          </span>
          {item.city && (
            <span className="text-xs font-semibold text-slate-500">
              {item.city}
            </span>
          )}
        </div>

        {/* Client Title */}
        <div>
          <h3 className="text-xl font-bold text-[#0A0B0E] leading-snug font-display">
            {displayClient}
          </h3>
          {item.service && (
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Service: {item.service}
            </p>
          )}
        </div>

        {/* Highlight Metric Box */}
        <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-[#E2E8F0] space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Verified Result:
          </p>
          <div className="text-3xl font-black text-[#0A0B0E] font-display">
            {headlineMetric}
          </div>
          <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{headlineLabel}</span>
          </p>
        </div>

        {/* Summary Description */}
        {item.summary && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {item.summary}
          </p>
        )}
      </div>

      {/* CTA Action */}
      <div className="pt-6 mt-6 border-t border-[#F1F5F9] flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Real Deliverable</span>
        </div>

        <WhatsAppCTA
          src={`case-${item.id}`}
          intent={`I saw your case study on ${displayClient} and would like a similar scope`}
          label="Ask About Result"
          size="sm"
          variant="secondary"
          className="bg-[#0A0B0E] hover:bg-[#FFE600] text-white hover:text-black font-extrabold border border-black hover:border-black transition-all rounded-xl"
          onClick={onSelect}
        />
      </div>
    </div>
  );
}

export default CaseStudyCard;
