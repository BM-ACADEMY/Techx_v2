import { useState, useEffect, useId } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function FAQ({
  items,
  title = 'Frequently Answered Questions',
  subtitle = 'Clear, transparent answers without sales jargon or hidden terms.',
  className,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  // Automatic FAQPage Schema Injection (COMPONENT-CONTRACT.md)
  useEffect(() => {
    if (!items || items.length === 0) return;

    const schemaId = `faqpage-schema-${baseId.replace(/[^a-zA-Z0-9]/g, '')}`;
    let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    };

    scriptTag.textContent = JSON.stringify(faqSchema);

    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [items, baseId]);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={cn('max-w-4xl mx-auto py-12 px-4', className)} aria-label="Frequently Asked Questions">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFE600] bg-[#FFE600]/10 border border-[#FFE600]/30 px-3.5 py-1 rounded-full">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Transparent FAQ</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
          {title}
        </h2>
        {subtitle && <p className="text-sm sm:text-base text-[#94A3B8]">{subtitle}</p>}
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const questionId = `${baseId}-q-${index}`;
          const answerId = `${baseId}-a-${index}`;

          return (
            <div
              key={index}
              className={cn(
                'rounded-2xl border transition-all duration-300 overflow-hidden',
                isOpen
                  ? 'border-[#FFE600]/60 bg-[#12141D] shadow-[0_0_25px_rgba(255,230,0,0.1)]'
                  : 'border-[#232636] bg-[#0E1017] hover:border-[#FFE600]/30 hover:bg-[#12141D]'
              )}
            >
              <button
                id={questionId}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleItem(index)}
                className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#FFE600]/40 select-none"
              >
                <span className="text-base sm:text-lg font-bold text-white leading-snug">
                  {item.q}
                </span>
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200',
                    isOpen ? 'bg-[#FFE600] text-black rotate-180 shadow-md' : 'bg-[#181B27] text-[#94A3B8]'
                  )}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className="px-6 pb-6 text-sm text-[#CBD5E1] leading-relaxed border-t border-[#232636] pt-4 animate-in fade-in duration-200"
                >
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQ;
