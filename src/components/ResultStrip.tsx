import { getProofItemById } from '@/data/dataLayer';
import { cn } from '@/lib/utils';

export interface ResultItem {
  value: string;
  label: string;
  context?: string;
}

export interface ResultStripProps {
  id?: string;
  items?: ResultItem[];
  variant?: 'inline' | 'feature' | 'compact';
  className?: string;
}

export function ResultStrip({ id, items: directItems, variant = 'inline', className }: ResultStripProps) {
  let displayItems = directItems || [];

  if (id && (!displayItems || displayItems.length === 0)) {
    const proofItem = getProofItemById(id);
    if (proofItem && proofItem.items) {
      displayItems = proofItem.items;
    }
  }

  if (!displayItems || displayItems.length === 0) {
    if (import.meta.env.PROD) return null;
    return (
      <div className="p-4 border border-dashed border-[#232636] rounded-xl bg-[#0E1017] text-xs text-[#94A3B8] text-center font-mono">
        [ ResultStrip: {id || 'unnamed'} — No items to display ]
      </div>
    );
  }

  const variantStyles = {
    inline: 'bg-[#12141D] border border-[#232636] py-6 px-6 sm:px-8 rounded-3xl shadow-xl',
    feature: 'bg-[#161926] border border-[#FFE600]/30 text-white py-8 px-6 sm:px-12 rounded-3xl shadow-[0_0_35px_rgba(255,230,0,0.12)]',
    compact: 'bg-[#0E1017] border border-[#232636] py-4 px-4 rounded-2xl',
  };

  return (
    <div className={cn(variantStyles[variant], className)}>
      <div
        className={cn(
          'grid gap-6 sm:gap-8 items-center text-center',
          displayItems.length === 2
            ? 'grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#232636]'
            : displayItems.length === 3
            ? 'grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#232636]'
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#232636]'
        )}
      >
        {displayItems.map((item, index) => (
          <div key={index} className={cn('space-y-1', index > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : '')}>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display text-[#FFE600]">
              {item.value}
            </div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              {item.label}
            </p>
            {item.context && (
              <p className="text-[11px] leading-tight text-[#94A3B8]">
                {item.context}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultStrip;
