import React from 'react';
import { MessageSquare } from 'lucide-react';
import { getSiteConfig } from '@/data/dataLayer';
import { cn } from '@/lib/utils';

export interface WhatsAppCTAProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  src: string;
  intent?: string;
  label?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'sticky';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  className?: string;
}

export function WhatsAppCTA({
  src,
  intent = "I'd like to know more about your services",
  label = 'Message on WhatsApp',
  variant = 'primary',
  size = 'md',
  icon = true,
  className,
  onClick,
  ...rest
}: WhatsAppCTAProps) {
  const site = getSiteConfig();
  const whatsappNumber = site.contact.whatsapp.number_e164 || '919944940051';

  // Rule 2: [src:...] is always the LAST token in the message
  const prefilledText = `Hi BM TechX — ${intent} [src:${src}]`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilledText)}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Fire GA4 & Meta event tracking if gtag exists on window
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
      try {
        (window as unknown as { gtag: Function }).gtag('event', 'whatsapp_click', {
          src_tag: src,
          intent,
          page_location: window.location.pathname,
        });
      } catch (err) {
        console.warn('Analytics event dispatch notice:', err);
      }
    }

    if (onClick) {
      onClick(e);
    }
  };

  const variantStyles = {
    primary: 'bg-[#1E7A4D] hover:bg-[#17603C] text-white shadow-md hover:shadow-lg border border-transparent',
    secondary: 'bg-bm-navy hover:bg-bm-navy-deep text-white shadow-sm border border-transparent',
    accent: 'bg-bm-terracotta hover:bg-bm-terracotta/90 text-white shadow-md border border-transparent',
    outline: 'bg-white hover:bg-emerald-50 text-emerald-800 border-2 border-emerald-600',
    ghost: 'bg-transparent hover:bg-emerald-50 text-emerald-800 border-transparent',
    sticky: 'bg-[#1E7A4D] hover:bg-[#17603C] text-white shadow-xl border border-emerald-400/30',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-3 text-sm font-bold rounded-xl gap-2',
    lg: 'px-7 py-4 text-base font-bold rounded-2xl gap-2.5',
  };

  return (
    <a
      href={whatsappUrl}
      data-src={src}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 select-none text-center',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...rest}
    >
      {icon && <MessageSquare className={cn(size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4', 'shrink-0')} />}
      <span>{label}</span>
    </a>
  );
}

export default WhatsAppCTA;
