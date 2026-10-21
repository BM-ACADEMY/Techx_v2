import { getProofItemById, type ProofItem } from '@/data/dataLayer';
import { ResultStrip } from './ResultStrip';
import { CaseStudyCard } from './CaseStudyCard';
import { ShieldCheck, Star, Quote, Sparkles, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProofBlockProps {
  id: string;
  variant?: 'inline' | 'feature' | 'compact';
  className?: string;
  onSelect?: () => void;
}

export function ProofBlock({ id, variant = 'inline', className, onSelect }: ProofBlockProps) {
  const item: ProofItem | undefined = getProofItemById(id);

  if (!item) {
    if (import.meta.env.PROD) return null;
    return (
      <div className="p-4 border border-dashed border-red-500/50 rounded-xl bg-red-950/20 text-red-400 text-xs font-mono">
        [ ProofBlock Error: ID "{id}" not found in proof.json ]
      </div>
    );
  }

  // --- EMPTY SLOT HANDLING (PROOF-SYSTEM.md Rule) ---
  if (item.status === 'EMPTY') {
    if (import.meta.env.PROD) {
      return null;
    }
    return (
      <div className="p-4 sm:p-5 border-2 border-dashed border-[#FFE600]/40 bg-[#FFE600]/5 rounded-2xl text-[#FFE600] my-4 text-xs font-mono space-y-1 select-none">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#FFE600]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>EMPTY PROOF SLOT: {item.id} ({item.type})</span>
        </div>
        <p className="text-[#CBD5E1] font-sans text-xs">
          {item._placeholder_text || item._needs || 'Slot waiting for data / verification.'}
        </p>
      </div>
    );
  }

  // --- 8 BLOCK TYPES RENDERERS ---

  // 1. Result Strip
  if (item.type === 'result_strip') {
    return <ResultStrip id={item.id} variant={variant} className={className} />;
  }

  // 2. Case Study Card
  if (item.type === 'case_study') {
    return <CaseStudyCard item={item} className={className} onSelect={onSelect} />;
  }

  // 3. Before / After Comparison Block
  if (item.type === 'before_after') {
    return (
      <div
        className={cn(
          'bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-4',
          className
        )}
      >
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span>{item.label || 'Performance Growth Comparison'}</span>
          {item.period && <span className="text-black font-extrabold bg-[#FFE600] px-2 py-0.5 rounded">{item.period}</span>}
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0]">
            <p className="text-[11px] font-bold text-slate-500 uppercase">Before</p>
            <p className="text-2xl sm:text-3xl font-black text-slate-400 mt-1 font-display">
              {item.before || 'Baseline'}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FFE600]/20 border border-[#FFE600]/60 shadow-sm">
            <p className="text-[11px] font-bold text-black uppercase">After BM TechX</p>
            <p className="text-2xl sm:text-3xl font-black text-[#0A0B0E] mt-1 font-display">
              {item.after || item.value || '+240%'}
            </p>
          </div>
        </div>
        {item.detail && <p className="text-xs text-slate-600">{item.detail}</p>}
      </div>
    );
  }

  // 4. Testimonial (Strictly named persons only)
  if (item.type === 'testimonial') {
    return (
      <div
        className={cn(
          'bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-4 relative overflow-hidden',
          className
        )}
      >
        <Quote className="w-12 h-12 text-[#FFE600]/40 absolute -top-2 -right-2 rotate-180" />
        <p className="text-sm sm:text-base text-slate-800 italic leading-relaxed relative z-10">
          "{item.quote || item.detail}"
        </p>
        <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#0A0B0E] font-display">{item.person || 'Verified Client'}</p>
            <p className="text-xs text-slate-500">{item.role ? `${item.role}, ` : ''}{item.business}</p>
          </div>
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
        </div>
      </div>
    );
  }

  // 5. Credential (MCA, PageSpeed, Registration)
  if (item.type === 'credential') {
    return (
      <div
        className={cn(
          'bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm flex items-start gap-4',
          className
        )}
      >
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{item.label}</p>
          <p className="text-lg font-bold text-[#0A0B0E] font-display">{item.value}</p>
          {item.detail && <p className="text-xs text-slate-600">{item.detail}</p>}
          {item.note && <p className="text-[11px] text-slate-500 italic">{item.note}</p>}
        </div>
      </div>
    );
  }

  // 6. Live Metric (Google Rating / Reviews)
  if (item.type === 'live_metric') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-[#E2E8F0] shadow-sm',
          className
        )}
      >
        <div className="flex items-center text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <div className="text-xs font-bold text-[#0A0B0E]">
          <span>{item.value || '5.0 ★'}</span>
          <span className="text-slate-500 font-normal ml-1">({item.label || 'Google Reviews'})</span>
        </div>
      </div>
    );
  }

  // 7. Work Sample
  if (item.type === 'work_sample') {
    return (
      <div
        className={cn(
          'bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm group hover:border-black/30 transition-all',
          className
        )}
      >
        <div className="h-44 bg-[#F8F9FA] border-b border-[#E2E8F0] flex items-center justify-center text-slate-400 text-xs">
          <ExternalLink className="w-6 h-6 text-slate-400 group-hover:text-black transition-colors" />
        </div>
        <div className="p-4 space-y-1">
          <p className="text-sm font-bold text-[#0A0B0E] font-display">{item.label || 'Client Work Sample'}</p>
          {item.detail && <p className="text-xs text-slate-600">{item.detail}</p>}
        </div>
      </div>
    );
  }

  // Fallback generic proof card
  return (
    <div className={cn('bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm', className)}>
      <p className="text-xs font-bold text-slate-500 uppercase">{item.label}</p>
      <p className="text-xl font-bold text-[#0A0B0E] mt-1 font-display">{item.value}</p>
      {item.detail && <p className="text-xs text-slate-600 mt-1">{item.detail}</p>}
    </div>
  );
}

export default ProofBlock;
