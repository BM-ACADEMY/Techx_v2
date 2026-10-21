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

  const isDarkFeature = variant === 'feature';

  const variantStyles = {
    inline: 'bg-white border border-[#E2E8F0] py-6 px-6 sm:px-8 rounded-3xl shadow-sm',
    feature: 'bg-[#0A0B0E] border border-black text-white py-8 px-6 sm:px-12 rounded-3xl shadow-xl',
    compact: 'bg-[#F8F9FA] border border-[#E2E8F0] py-4 px-4 rounded-2xl',
  };

  const divideStyle = isDarkFeature ? 'divide-white/15' : 'divide-[#E2E8F0]';

  return (
    <div className={cn(variantStyles[variant], className)}>
      <div
        className={cn(
          'grid gap-6 sm:gap-8 items-center text-center',
          displayItems.length === 2
            ? `grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x ${divideStyle}`
            : displayItems.length === 3
            ? `grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x ${divideStyle}`
            : `grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x ${divideStyle}`
        )}
      >
        {displayItems.map((item, index) => (
          <div key={index} className={cn('space-y-1', index > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : '')}>
            <div className={cn(
              'text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display',
              isDarkFeature ? 'text-[#FFE600]' : 'text-[#0A0B0E]'
            )}>
              {item.value}
            </div>
            <p className={cn(
              'text-xs sm:text-sm font-bold uppercase tracking-wider',
              isDarkFeature ? 'text-white' : 'text-[#0A0B0E]'
            )}>
              {item.label}
            </p>
            {item.context && (
              <p className={cn(
                'text-[11px] leading-tight',
                isDarkFeature ? 'text-[#94A3B8]' : 'text-slate-500'
              )}>
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
