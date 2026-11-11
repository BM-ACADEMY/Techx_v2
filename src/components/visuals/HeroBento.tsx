import { useEffect, useState, type CSSProperties } from 'react';
import { MapPin, MessageSquare, Zap } from 'lucide-react';
import { BrowserBuild } from './Visuals';
import { prefersReducedMotion } from './hooks';

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

/* Rotating keyword — all words stacked in one grid cell so width never jumps */
export function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => setI((p) => (p + 1) % words.length), 2400);
    return () => window.clearInterval(id);
  }, [words.length]);
  return (
    <span className="inline-grid align-bottom text-left" aria-live="off">
      {words.map((w, n) => (
        <span key={w} className={`rot-word ${n === i ? 'rot-on' : ''}`} style={{ gridArea: '1 / 1' }} aria-hidden={n !== i}>
          {w}
        </span>
      ))}
    </span>
  );
}

function Tile({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`hero-in bento-tile ${className}`} style={d(delay)}>
      {children}
    </div>
  );
}

export function MiniRing() {
  const R = 26;
  const C = 2 * Math.PI * R;
  return (
    <div className="relative w-[78px] h-[78px] shrink-0">
      <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
        <circle cx="32" cy="32" r={R} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="6" />
        <circle
          className="ring-loop"
          cx="32" cy="32" r={R} fill="none" stroke="#FFE600" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={C}
          style={{ ['--c' as string]: C, ['--to' as string]: C * 0.02 } as CSSProperties}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-xl text-white">98</span>
    </div>
  );
}

/** Clean 4-tile "live" bento used in the hero */
export function HeroBento() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[560px] mx-auto lg:mx-0 lg:ml-auto" aria-hidden="true">
      {/* 1 — Website that builds itself */}
      <Tile className="col-span-2 sm:col-span-1 sm:row-span-2 flex flex-col" delay={300}>
        <div className="flex items-center justify-between mb-3">
          <span className="tile-label">Website</span>
          <span className="live-pill"><i /> Live in 48 hrs</span>
        </div>
        <BrowserBuild className="!shadow-none flex-1" />
        <div className="mt-4 flex items-end justify-between">
          <div className="font-display font-extrabold text-3xl text-white leading-none">₹2,999</div>
          <span className="text-[11px] text-slate-400">fixed · + GST</span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="bar-fill h-full rounded-full bg-[#FFE600]" />
        </div>
      </Tile>

      {/* 2 — WhatsApp */}
      <Tile className="col-span-2 sm:col-span-1" delay={450}>
        <div className="flex items-center justify-between mb-3">
          <span className="tile-label">WhatsApp bot</span>
          <MessageSquare className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="space-y-2 text-[12px]">
          <div className="bubble bubble-a self-end ml-auto bg-[#DCF8C6] text-slate-900 rounded-2xl rounded-br-sm px-3 py-1.5 w-fit max-w-[88%]">I want a website 🙋</div>
          <div className="bubble bubble-b bg-white text-slate-900 rounded-2xl rounded-bl-sm px-3 py-1.5 w-fit max-w-[88%]">Vanakkam! From ₹2,999 ✅</div>
          <div className="typing-dots" aria-hidden="true"><span /><span /><span /></div>
        </div>
      </Tile>

      {/* 3 — Maps + 4 — Speed */}
      <Tile className="flex flex-col justify-between" delay={600}>
        <span className="tile-label">Google Maps</span>
        <div className="relative my-3 flex items-center justify-center h-14">
          <span className="ripple" /><span className="ripple" style={d(900)} />
          <span className="relative w-10 h-10 rounded-full bg-[#FFE600] flex items-center justify-center shadow-[0_0_30px_rgba(255,230,0,.5)]">
            <MapPin className="w-5 h-5 text-black" />
          </span>
        </div>
        <div className="font-display font-bold text-white text-sm">Be found nearby</div>
      </Tile>

      <Tile className="col-span-2 flex items-center justify-between gap-4" delay={750}>
        <div>
          <span className="tile-label flex items-center gap-1"><Zap className="w-3 h-3 fill-[#FFE600] text-[#FFE600]" /> Speed</span>
          <div className="mt-2 font-display font-bold text-white text-base">Lighthouse mobile score</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Custom-coded, no slow plugins</div>
        </div>
        <MiniRing />
      </Tile>
    </div>
  );
}
