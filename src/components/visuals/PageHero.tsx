import type { ReactNode, Ref } from 'react';

/**
 * Shared dark hero used on inner pages. The page's existing badge / H1 /
 * answer paragraph / CTAs are passed as children (restyled via .page-hero CSS),
 * and an animated, page-specific visual sits beside them.
 */
export function PageHero({
  visual,
  children,
  innerRef,
}: {
  visual: ReactNode;
  children: ReactNode;
  innerRef?: Ref<HTMLElement>;
}) {
  return (
    <section
      ref={innerRef}
      className="page-hero hero-bleed relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem] bg-[#0A0B0E] px-5 sm:px-12 lg:px-16 py-10 sm:py-14 lg:py-16"
    >
      <div className="hero-dots" aria-hidden="true" />
      <div className="glow glow-y" aria-hidden="true" />
      <div className="glow glow-g" aria-hidden="true" />
      <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-center">
        <div className="page-hero-text space-y-6 text-center lg:text-left min-w-0">{children}</div>
        <div className="min-w-0">{visual}</div>
      </div>
    </section>
  );
}
