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
        'bg-[#14120A] border-2 border-[#3D3512] rounded-3xl p-6 sm:p-10 my-8 shadow-xl',
        className
      )}
      role="region"
      aria-label="Service Disqualifiers"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFE600] bg-[#FFE600]/10 px-3.5 py-1 rounded-full border border-[#FFE600]/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Honest Disqualification</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Bulleted Disqualifiers */}
        <ul className="space-y-3.5 pt-2 border-t border-[#3D3512]">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-[#CBD5E1]">
              <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{item}</span>
            </li>
          ))}
        </ul>

        {/* Honest Closing Note */}
        <div className="pt-4 border-t border-[#3D3512]/60">
          <p className="text-xs text-[#94A3B8] italic leading-relaxed">
            *If any of these describe your situation, we would rather be transparent today than deliver an outcome that leaves you dissatisfied later.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotForBlock;
