import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  MapPin,
  MessageSquare,
  Rocket,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useCountUp, useInView } from './hooks';

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

/* ------------------------------------------------------------------ */
/* Section heading with ruled eyebrow                                  */
/* ------------------------------------------------------------------ */
export function SectionHead({
  eyebrow,
  title,
  sub,
  align = 'center',
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div className={align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold leading-[1.08]">{title}</h2>
      {sub && <p className="mt-4 text-base sm:text-lg text-slate-600">{sub}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Browser window that "builds" a website on loop                      */
/* ------------------------------------------------------------------ */
export function BrowserBuild({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-[0_30px_60px_-20px_rgba(10,11,14,.35)] overflow-hidden ${className}`} aria-hidden="true">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border-b border-slate-200">
        <i className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <i className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <i className="w-2 h-2 rounded-full bg-[#28C840]" />
        <div className="ml-2 flex-1 h-4 rounded-full bg-white border border-slate-200 text-[9px] text-slate-400 px-2 flex items-center gap-1 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> yourbusiness.in
        </div>
      </div>
      <div className="p-3 sm:p-4 space-y-3">
        <div className="build flex items-center justify-between" style={d(0)}>
          <div className="w-12 h-3 rounded bg-[#0A0B0E]" />
          <div className="flex gap-1.5">
            <div className="w-6 h-2 rounded bg-slate-200" />
            <div className="w-6 h-2 rounded bg-slate-200" />
            <div className="w-6 h-2 rounded bg-slate-200" />
          </div>
        </div>
        <div className="build space-y-1.5" style={d(350)}>
          <div className="h-3.5 w-4/5 rounded bg-[#0A0B0E]" />
          <div className="h-3.5 w-3/5 rounded bg-[#0A0B0E]" />
        </div>
        <div className="build space-y-1" style={d(700)}>
          <div className="h-1.5 w-11/12 rounded bg-slate-200" />
          <div className="h-1.5 w-9/12 rounded bg-slate-200" />
        </div>
        <div className="build flex gap-2" style={d(1000)}>
          <div className="h-5 w-16 rounded-md bg-[#FFE600] pulse-soft" />
          <div className="h-5 w-12 rounded-md border border-slate-300" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1400, 1650, 1900].map((t, i) => (
            <div key={t} className="build rounded-lg border border-slate-200 p-1.5 space-y-1" style={d(t)}>
              <div className={`w-4 h-4 rounded ${['bg-[#FFE600]', 'bg-emerald-300', 'bg-sky-300'][i]}`} />
              <div className="h-1.5 w-full rounded bg-slate-200" />
              <div className="h-1.5 w-2/3 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Lighthouse score rings (real scores from lighthouse-prod-mobile)    */
/* ------------------------------------------------------------------ */
const SCORES = [
  { label: 'Performance', v: 98, c: '#F59E0B' },
  { label: 'Accessibility', v: 100, c: '#10B981' },
  { label: 'Best practices', v: 100, c: '#0EA5E9' },
  { label: 'SEO', v: 100, c: '#8B5CF6' },
];

function Ring({ label, v, c, on, i }: { label: string; v: number; c: string; on: boolean; i: number }) {
  const R = 34;
  const C = 2 * Math.PI * R;
  const n = useCountUp(v, on, 1500 + i * 150);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-[88px] h-[88px] sm:w-24 sm:h-24">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r={R} fill="none" stroke="#E2E8F0" strokeWidth="6" />
          <circle
            cx="40" cy="40" r={R} fill="none" stroke={c} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={on ? C * (1 - v / 100) : C}
            style={{ transition: `stroke-dashoffset 1.6s cubic-bezier(.16,1,.3,1) ${i * 150}ms` }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-xl sm:text-2xl">{n}</span>
      </div>
      <span className="text-[11px] sm:text-xs font-semibold text-slate-600 text-center">{label}</span>
    </div>
  );
}

export function LighthousePanel() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className="glass-card p-5 sm:p-7">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-sm font-bold font-display"><Zap className="w-4 h-4 fill-[#FFE600]" /> Lighthouse · mobile</div>
        <span className="text-[10px] font-mono text-slate-500">bmtechx.in · Oct 2026</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {SCORES.map((s, i) => (
          <Ring key={s.label} {...s} on={seen} i={i} />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        {[['< 2s', 'load on 4G'], ['0', 'slow plugins'], ['100%', 'custom code']].map(([a, b]) => (
          <div key={b} className="rounded-xl bg-slate-50 border border-slate-100 py-2.5">
            <div className="font-display font-extrabold text-lg">{a}</div>
            <div className="text-[10px] text-slate-500">{b}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* WhatsApp automation phone                                           */
/* ------------------------------------------------------------------ */
const CHAT: { me: boolean; t: string }[] = [
  { me: true, t: 'Hi! I want a website for my textile shop' },
  { me: false, t: 'Vanakkam 👋 Websites start at ₹2,999, live in 48 hours. Which city are you in?' },
  { me: true, t: 'Cuddalore. Do you have a store option?' },
  { me: false, t: 'Yes — online store ₹9,999, zero commission. Sending the written scope now ✅' },
];

export function WhatsAppPhone() {
  const [ref, seen] = useInView<HTMLDivElement>(0.35);
  return (
    <div ref={ref} className="relative mx-auto w-[290px] sm:w-[320px]" aria-hidden="true">
      <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-emerald-200/60 via-[#FFE600]/40 to-transparent blur-2xl" />
      <div className="relative rounded-[2.4rem] bg-[#0A0B0E] p-2.5 shadow-[0_40px_80px_-30px_rgba(10,11,14,.6)]">
        <div className="rounded-[1.9rem] overflow-hidden bg-[#ECE5DD]">
          <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FFE600] text-black flex items-center justify-center text-[11px] font-extrabold">BM</div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">BM TechX</div>
              <div className="text-[10px] text-emerald-200">online · replies in 2 min</div>
            </div>
          </div>
          <div className={`chat p-3 space-y-2 min-h-[330px] ${seen ? 'chat-on' : ''}`}>
            {CHAT.map((m, i) => (
              <div key={i}>
                {!m.me && (
                  <div className="typing" style={d(i * 1700 + 300)}>
                    <span /><span /><span />
                  </div>
                )}
                <div className={`flex ${m.me ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`msg max-w-[82%] rounded-2xl px-3 py-2 text-[12px] leading-snug shadow-sm ${m.me ? 'bg-[#DCF8C6] rounded-br-sm' : 'bg-white rounded-bl-sm'}`}
                    style={d(i * 1700 + (m.me ? 0 : 1500))}
                  >
                    {m.t}
                  </div>
                </div>
              </div>
            ))}
            <div className="msg flex justify-center pt-1" style={d(7400)}>
              <span className="text-[10px] bg-white/80 rounded-full px-3 py-1 flex items-center gap-1 text-slate-600">
                <Check className="w-3 h-3 text-emerald-600" /> Lead saved to Google Sheet
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -right-4 top-10 chip float-slow">
        <span className="chip-ico bg-emerald-50 text-emerald-600"><MessageSquare className="w-4 h-4" /></span>
        <span className="text-[11px] font-bold font-display">24 / 7</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Growth chart                                                        */
/* ------------------------------------------------------------------ */
export function GrowthChart() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const line = 'M8 128 C 40 124, 58 112, 86 104 S 132 88, 158 70 S 206 52, 234 34 S 268 16, 292 10';
  return (
    <div ref={ref} className={`glass-card p-5 sm:p-7 ${seen ? 'chart-on' : ''}`} aria-hidden="true">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-bold font-display flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Monthly enquiries</div>
        <span className="text-[10px] font-mono text-slate-500">illustrative example</span>
      </div>
      <svg viewBox="0 0 300 140" className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="gc-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FFE600" stopOpacity=".55" />
            <stop offset="1" stopColor="#FFE600" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[28, 62, 96, 130].map((y) => (
          <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
        ))}
        <path className="chart-area" d={`${line} L292 140 L8 140 Z`} fill="url(#gc-fill)" />
        <path className="chart-line" d={line} pathLength={1} fill="none" stroke="#0A0B0E" strokeWidth="3" strokeLinecap="round" />
        <g className="chart-dot">
          <circle cx="292" cy="10" r="9" fill="#FFE600" opacity=".5" className="pulse-ring" />
          <circle cx="292" cy="10" r="4.5" fill="#0A0B0E" />
        </g>
      </svg>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {[
          [MapPin, 'Maps views', 'text-rose-500 bg-rose-50'],
          [MessageSquare, 'WhatsApp', 'text-emerald-600 bg-emerald-50'],
          [Rocket, 'Walk-ins', 'text-amber-600 bg-amber-50'],
        ].map(([I, l, c], i) => {
          const Ico = I as typeof MapPin;
          return (
            <div key={l as string} className="chart-badge rounded-xl border border-slate-100 bg-white px-2.5 py-2 flex items-center gap-2" style={d(1200 + i * 250)}>
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${c as string}`}><Ico className="w-3.5 h-3.5" /></span>
              <span className="text-[11px] font-semibold leading-tight">{l as string}<b className="block text-emerald-600 text-[10px]">↑ growing</b></span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Showcase row                                                        */
/* ------------------------------------------------------------------ */
export function Showcase({
  eyebrow, title, body, points, cta, to, visual, reverse = false,
}: {
  eyebrow: string; title: ReactNode; body: string; points: string[]; cta: string; to: string; visual: ReactNode; reverse?: boolean;
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className={reverse ? 'lg:order-2' : ''}>
        <span className="eyebrow">{eyebrow}</span>
        <h3 className="mt-3 text-3xl sm:text-4xl font-extrabold leading-[1.1]">{title}</h3>
        <p className="mt-4 text-slate-600 text-base sm:text-lg">{body}</p>
        <ul className="mt-5 space-y-2.5">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
              <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-[#FFE600] flex items-center justify-center"><Check className="w-3 h-3 text-black" strokeWidth={3} /></span>
              {p}
            </li>
          ))}
        </ul>
        <Link to={to} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0A0B0E] text-white px-6 py-3 text-sm font-bold hover:bg-[#FFE600] hover:text-black transition-colors group">
          {cta} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className={reverse ? 'lg:order-1' : ''}>{visual}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Count-up stat band                                                  */
/* ------------------------------------------------------------------ */
function Stat({ n, prefix = '', suffix = '', label, on }: { n: number; prefix?: string; suffix?: string; label: string; on: boolean }) {
  const v = useCountUp(n, on);
  return (
    <div className="text-center px-2">
      <div className="font-display font-extrabold text-4xl sm:text-6xl text-[#FFE600] tabular-nums">
        {prefix}{v.toLocaleString('en-IN')}{suffix}
      </div>
      <div className="mt-2 text-xs sm:text-sm text-slate-300">{label}</div>
    </div>
  );
}

export function StatBand() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className="relative overflow-hidden rounded-[2rem] bg-[#0A0B0E] px-6 py-12 sm:py-16">
      <div className="aurora aurora-a w-72 h-72 -top-24 -left-16 opacity-25" aria-hidden="true" />
      <div className="aurora aurora-c w-72 h-72 -bottom-24 -right-16 opacity-20" aria-hidden="true" />
      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4">
        <Stat on={seen} n={2999} prefix="₹" label="Website, fixed price + GST" />
        <Stat on={seen} n={48} suffix=" hrs" label="Single-page site goes live" />
        <Stat on={seen} n={1400} suffix="+" label="Learners trained via BM Academy" />
        <Stat on={seen} n={150} suffix="+" label="Placed through BM Academy" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tech marquee                                                        */
/* ------------------------------------------------------------------ */
const STACK = ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Razorpay', 'UPI', 'WhatsApp Cloud API', 'Google Maps', 'Meta Ads', 'Google Sheets', 'SSL + CDN'];

export function TechMarquee() {
  const row = [...STACK, ...STACK];
  return (
    <div className="marquee-mask overflow-hidden py-2" data-no-reveal aria-label="Technology we build with">
      <div className="animate-marquee-rev flex gap-3 w-max">
        {row.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] ring-2 ring-[#0A0B0E]" /> {s}
          </span>
        ))}
      </div>
    </div>
  );
}
