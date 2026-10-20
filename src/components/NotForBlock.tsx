import { XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NotForBlockProps {
  items: string[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function NotForBlock({
  items,
  title = 'Who this service is NOT for',
  subtitle = 'We are honest about who we can help. This package will not work for you if:',
  className,
}: NotForBlockProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'bg-bm-wash-warm border-2 border-bm-wash-warm-line rounded-3xl p-6 sm:p-10 my-8 shadow-sm',
        className
      )}
      role="region"
      aria-label="Service Disqualifiers"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-bm-terracotta bg-white px-3 py-1 rounded-full border border-bm-wash-warm-line shadow-xs">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Honest Disqualification</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-bm-navy-deep font-display tracking-tight">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-bm-ink-muted leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Bulleted Disqualifiers */}
        <ul className="space-y-3.5 pt-2 border-t border-bm-wash-warm-line/80">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-bm-ink">
              <XCircle className="w-5 h-5 text-bm-terracotta shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{item}</span>
            </li>
          ))}
        </ul>

        {/* Honest Closing Note */}
        <div className="pt-4 border-t border-bm-wash-warm-line/60">
          <p className="text-xs text-bm-ink-faint italic leading-relaxed">
            *If any of these describe your situation, we would rather be transparent today than deliver an outcome that leaves you dissatisfied later.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotForBlock;
