import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const SELECTOR = [
  'main section > div',
  'main section > h2',
  'main section > p',
  'main section .grid > *',
  'main section ul > li',
].join(',');

/**
 * Site-wide scroll animation: fades/rises content blocks into view with a
 * stagger for grid children, and drives a top scroll-progress bar.
 * Purely additive: content stays visible if JS or IntersectionObserver fail.
 */
export function ScrollReveal() {
  const { pathname } = useLocation();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    let first = true;
    const tag = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (el.closest('[data-no-reveal]')) return;
        // Already tagged (effect re-ran): make sure it is observed again, never left hidden
        if (el.dataset.reveal !== undefined) {
          if (!el.classList.contains('is-visible')) io.observe(el);
          return;
        }
        // Skip first screen of hero (it has its own entrance animation) and fixed/sticky bits
        if (el.closest('.hero-in, header, [role="dialog"]')) return;
        // Above-the-fold content on first paint uses the hero entrance instead
        if (first && el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
        const parent = el.parentElement;
        const idx = parent ? Array.prototype.indexOf.call(parent.children, el) : 0;
        el.style.setProperty('--reveal-delay', `${Math.min(idx, 6) * 90}ms`);
        el.dataset.reveal = '';
        io.observe(el);
      });
    };

    root.classList.add('js-reveal');
    tag();
    first = false;
    // Lazy-loaded routes / late content
    const mo = new MutationObserver(() => tag());
    mo.observe(document.getElementById('root') ?? document.body, { childList: true, subtree: true });

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = root.scrollHeight - window.innerHeight;
        root.style.setProperty('--sy', String(Math.round(window.scrollY)));
        if (barRef.current) barRef.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
      });
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('.spot') as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
      root.classList.remove('js-reveal');
    };
  }, [pathname]);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}
