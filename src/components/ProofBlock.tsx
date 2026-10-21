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
          'bg-[#12141D] rounded-3xl border border-[#232636] p-6 sm:p-8 shadow-xl space-y-4',
          className
        )}
      >
        <div className="flex items-center justify-between text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
          <span>{item.label || 'Performance Growth Comparison'}</span>
          {item.period && <span className="text-[#FFE600]">{item.period}</span>}
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#08090D] border border-[#232636]">
            <p className="text-[11px] font-bold text-[#94A3B8] uppercase">Before</p>
            <p className="text-2xl sm:text-3xl font-black text-white/60 mt-1 font-display">
              {item.before || 'Baseline'}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FFE600]/10 border border-[#FFE600]/40 shadow-[0_0_20px_rgba(255,230,0,0.1)]">
            <p className="text-[11px] font-bold text-[#FFE600] uppercase">After BM TechX</p>
            <p className="text-2xl sm:text-3xl font-black text-[#FFE600] mt-1 font-display">
              {item.after || item.value || '+240%'}
            </p>
          </div>
        </div>
        {item.detail && <p className="text-xs text-[#CBD5E1]">{item.detail}</p>}
      </div>
    );
  }

  // 4. Testimonial (Strictly named persons only)
  if (item.type === 'testimonial') {
    return (
      <div
        className={cn(
          'bg-[#12141D] rounded-3xl border border-[#232636] p-6 sm:p-8 shadow-xl space-y-4 relative overflow-hidden',
          className
        )}
      >
        <Quote className="w-12 h-12 text-[#FFE600]/10 absolute -top-2 -right-2 rotate-180" />
        <p className="text-sm sm:text-base text-white italic leading-relaxed relative z-10">
          "{item.quote || item.detail}"
        </p>
        <div className="pt-3 border-t border-[#232636] flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-white font-display">{item.person || 'Verified Client'}</p>
            <p className="text-xs text-[#94A3B8]">{item.role ? `${item.role}, ` : ''}{item.business}</p>
          </div>
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
      </div>
    );
  }

  // 5. Credential (MCA, PageSpeed, Registration)
  if (item.type === 'credential') {
    return (
      <div
        className={cn(
          'bg-[#12141D] p-6 rounded-3xl border border-[#232636] shadow-xl flex items-start gap-4',
          className
        )}
      >
        <div className="w-10 h-10 rounded-xl bg-[#08090D] text-emerald-400 flex items-center justify-center shrink-0 border border-[#232636]">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">{item.label}</p>
          <p className="text-lg font-bold text-white font-display">{item.value}</p>
          {item.detail && <p className="text-xs text-[#CBD5E1]">{item.detail}</p>}
          {item.note && <p className="text-[11px] text-[#94A3B8] italic">{item.note}</p>}
        </div>
      </div>
    );
  }

  // 6. Live Metric (Google Rating / Reviews)
  if (item.type === 'live_metric') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-3 bg-[#12141D] px-4 py-2.5 rounded-2xl border border-[#232636] shadow-md',
          className
        )}
      >
        <div className="flex items-center text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <div className="text-xs font-bold text-white">
          <span>{item.value || '5.0 ★'}</span>
          <span className="text-[#94A3B8] font-normal ml-1">({item.label || 'Google Reviews'})</span>
        </div>
      </div>
    );
  }

  // 7. Work Sample
  if (item.type === 'work_sample') {
    return (
      <div
        className={cn(
          'bg-[#12141D] rounded-3xl border border-[#232636] overflow-hidden shadow-xl group hover:border-[#FFE600]/40 transition-all',
          className
        )}
      >
        <div className="h-44 bg-[#08090D] border-b border-[#232636] flex items-center justify-center text-[#94A3B8] text-xs">
          <ExternalLink className="w-6 h-6 text-[#94A3B8] group-hover:text-[#FFE600] transition-colors" />
        </div>
        <div className="p-4 space-y-1">
          <p className="text-sm font-bold text-white font-display">{item.label || 'Client Work Sample'}</p>
          {item.detail && <p className="text-xs text-[#CBD5E1]">{item.detail}</p>}
        </div>
      </div>
    );
  }

  // Fallback generic proof card
  return (
    <div className={cn('bg-[#12141D] p-6 rounded-3xl border border-[#232636] shadow-xl', className)}>
      <p className="text-xs font-bold text-[#94A3B8] uppercase">{item.label}</p>
      <p className="text-xl font-bold text-white mt-1 font-display">{item.value}</p>
      {item.detail && <p className="text-xs text-[#CBD5E1] mt-1">{item.detail}</p>}
    </div>
  );
}

export default ProofBlock;
