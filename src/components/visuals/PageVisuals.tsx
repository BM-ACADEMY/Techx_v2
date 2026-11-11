import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Bot,
  Building2,
  Camera,
  Check,
  Gift,
  Heart,
  Layers,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Play,
  Search,
  Share2,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { BrowserBuild } from './Visuals';
import { MiniRing } from './HeroBento';
import { prefersReducedMotion, useCountUp, useInView } from './hooks';

export { WhatsAppPhone } from './Visuals';

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

function Tile({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`hero-in bento-tile ${className}`} style={d(delay)}>
      {children}
    </div>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[560px] mx-auto lg:ml-auto">{children}</div>;
}

/** Cycles 0..n-1 on an interval (stays at last step when reduced motion). */
function useStep(n: number, ms: number, hold = 1) {
  const [s, setS] = useState(prefersReducedMotion() ? n - 1 : 0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => setS((p) => (p + 1) % (n + hold)), ms);
    return () => window.clearInterval(id);
  }, [n, ms, hold]);
  return Math.min(s, n - 1);
}

/* ------------------------------------------------------------------ */
/* Services hub: six services orbiting the brand                       */
/* ------------------------------------------------------------------ */
const HUB = [
  { Icon: Layers, label: 'Websites', to: '/services/website-development' },
  { Icon: ShoppingBag, label: 'Online store', to: '/services/ecommerce-website' },
  { Icon: Search, label: 'SEO', to: '/services/seo' },
  { Icon: Target, label: 'Meta Ads', to: '/services/meta-ads' },
  { Icon: Share2, label: 'Social', to: '/services/social-media-marketing' },
  { Icon: Bot, label: 'WhatsApp', to: '/services/whatsapp-automation' },
];

export function HubVisual() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto aspect-square">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {HUB.map((_, i) => {
          const a = (i / HUB.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <line
              key={i}
              className="hub-line"
              x1="50" y1="50" x2={50 + Math.cos(a) * 36} y2={50 + Math.sin(a) * 36}
              stroke="rgba(255,230,0,.55)" strokeWidth=".4" strokeDasharray="1.5 1.5"
              style={d(i * 120)}
            />
          );
        })}
        <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth=".3" />
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="ripple !w-24 !h-24 !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2" />
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FFE600] flex flex-col items-center justify-center shadow-[0_0_60px_rgba(255,230,0,.45)]">
          <span className="font-display font-extrabold text-2xl text-black leading-none">BM</span>
          <span className="font-display font-bold text-[11px] text-black/70 tracking-wider">TECHX</span>
        </div>
      </div>

      {HUB.map(({ Icon, label, to }, i) => {
        const a = (i / HUB.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <Link
            key={label}
            to={to}
            className="hero-in absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${50 + Math.cos(a) * 36}%`, top: `${50 + Math.sin(a) * 36}%`, ...d(300 + i * 120) }}
          >
            <div className={i % 2 ? 'float-slow' : 'float-slower'}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:bg-[#FFE600] group-hover:border-[#FFE600] transition-colors">
                <Icon className="w-6 h-6 text-[#FFE600] group-hover:text-black transition-colors" />
              </div>
              <div className="mt-1.5 text-center text-[11px] font-semibold text-slate-300 whitespace-nowrap">{label}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Website: build + responsive reflow + speed                          */
/* ------------------------------------------------------------------ */
export function WebVisual() {
  return (
    <Grid>
      <Tile className="col-span-2" delay={150}>
        <div className="flex items-center justify-between mb-3">
          <span className="tile-label">Custom-coded site</span>
          <span className="live-pill"><i /> Live in 48 hrs</span>
        </div>
        <BrowserBuild className="!shadow-none" />
      </Tile>
      <Tile delay={350}>
        <span className="tile-label">Mobile-first</span>
        <div className="mt-3 h-[96px] flex items-center justify-center">
          <div className="resp-box rounded-lg border border-white/20 bg-white/5 p-2 overflow-hidden">
            <div className="h-2 w-1/2 rounded bg-[#FFE600] mb-1.5" />
            <div className="grid gap-1.5 resp-grid">
              <i className="h-5 rounded bg-white/25" /><i className="h-5 rounded bg-white/15" /><i className="h-5 rounded bg-white/25" />
            </div>
          </div>
        </div>
        <div className="font-display font-bold text-white text-sm">Fits every screen</div>
      </Tile>
      <Tile delay={500} className="flex flex-col justify-between">
        <span className="tile-label flex items-center gap-1"><Zap className="w-3 h-3 fill-[#FFE600] text-[#FFE600]" /> Speed</span>
        <div className="my-2 flex justify-center"><MiniRing /></div>
        <div className="font-display font-bold text-white text-sm">Lighthouse mobile</div>
      </Tile>
    </Grid>
  );
}

/* ------------------------------------------------------------------ */
/* Online store: add-to-cart → order toast                             */
/* ------------------------------------------------------------------ */
const PRODUCTS = [
  { Icon: ShoppingBag, p: '₹499', c: 'from-amber-300 to-orange-400' },
  { Icon: Package, p: '₹1,299', c: 'from-sky-300 to-indigo-400' },
  { Icon: Gift, p: '₹799', c: 'from-pink-300 to-rose-400' },
  { Icon: Star, p: '₹599', c: 'from-emerald-300 to-teal-400' },
];

export function StoreVisual() {
  const step = useStep(5, 1300);
  const cart = Math.min(step, 3);
  return (
    <Grid>
      <Tile className="col-span-2" delay={150}>
        <div className="flex items-center justify-between mb-3">
          <span className="tile-label">Your online store</span>
          <span className="relative inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/10 rounded-full px-2.5 py-1">
            <ShoppingBag className="w-3.5 h-3.5 text-[#FFE600]" /> Cart
            <b key={cart} className="cart-pop min-w-4 h-4 px-1 rounded-full bg-[#FFE600] text-black text-[10px] flex items-center justify-center">{cart}</b>
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {PRODUCTS.map(({ Icon, p, c }, i) => {
            const added = i < cart;
            return (
              <div key={p} className={`rounded-xl p-1.5 bg-white/[.06] border transition-colors duration-500 ${i === cart && step < 4 ? 'border-[#FFE600]' : 'border-white/10'}`}>
                <div className={`aspect-square rounded-lg bg-gradient-to-br ${c} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white/90" />
                </div>
                <div className="mt-1.5 text-[11px] font-bold text-white">{p}</div>
                <div className={`mt-1 rounded-md text-[9px] font-bold text-center py-0.5 transition-colors duration-500 ${added ? 'bg-emerald-400 text-black' : 'bg-white/10 text-slate-300'}`}>
                  {added ? 'Added ✓' : 'Add'}
                </div>
              </div>
            );
          })}
        </div>
      </Tile>
      <Tile className="col-span-2" delay={350}>
        <div className={`flex items-center gap-3 transition-all duration-500 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-1'}`}>
          <span className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0"><MessageSquare className="w-5 h-5" /></span>
          <div className="leading-tight">
            <div className="text-sm font-bold text-white font-display">{step >= 4 ? 'New order · ₹2,597 · UPI paid' : 'Waiting for the next order…'}</div>
            <div className="text-[11px] text-slate-400">WhatsApp alert sent to you instantly</div>
          </div>
          {step >= 4 && <Check className="w-5 h-5 text-emerald-400 ml-auto" />}
        </div>
      </Tile>
    </Grid>
  );
}

/* ------------------------------------------------------------------ */
/* SEO: your business climbs the results                               */
/* ------------------------------------------------------------------ */
const SEQ = [
  ['A', 'B', 'YOU', 'C'],
  ['A', 'YOU', 'B', 'C'],
  ['YOU', 'A', 'B', 'C'],
];
const NAMES: Record<string, string> = { A: 'Competitor One', B: 'Competitor Two', C: 'Competitor Three', YOU: 'Your business' };

export function SeoVisual() {
  const step = useStep(3, 1700, 2);
  const order = SEQ[step];
  return (
    <Grid>
      <Tile className="col-span-2" delay={150}>
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-slate-300 mb-3">
          <Search className="w-3.5 h-3.5" /> best shop near me, Puducherry
        </div>
        <div className="relative h-[200px]">
          {['A', 'B', 'C', 'YOU'].map((k) => {
            const pos = order.indexOf(k);
            const you = k === 'YOU';
            return (
              <div
                key={k}
                className={`absolute left-0 right-0 flex items-center gap-3 rounded-xl px-3 py-2.5 border transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${you ? 'bg-[#FFE600] border-[#FFE600] text-black z-10' : 'bg-white/[.06] border-white/10 text-white'}`}
                style={{ transform: `translateY(${pos * 50}px)`, height: 44 }}
              >
                <span className={`w-6 h-6 rounded-full text-[11px] font-extrabold flex items-center justify-center ${you ? 'bg-black text-[#FFE600]' : 'bg-white/10'}`}>{pos + 1}</span>
                <span className="text-sm font-semibold">{NAMES[k]}</span>
                <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold opacity-80"><MapPin className="w-3 h-3" /> Maps</span>
              </div>
            );
          })}
        </div>
        <div className="mt-2 text-[10px] text-slate-500 font-mono">illustrative example</div>
      </Tile>
      <Tile delay={350}>
        <span className="tile-label">Google Business</span>
        <div className="relative my-3 h-14 flex items-center justify-center">
          <span className="ripple" /><span className="ripple" style={d(900)} />
          <span className="relative w-10 h-10 rounded-full bg-[#FFE600] flex items-center justify-center"><MapPin className="w-5 h-5 text-black" /></span>
        </div>
        <div className="font-display font-bold text-white text-sm">Profile optimised</div>
      </Tile>
      <Tile delay={500}>
        <span className="tile-label">Reviews</span>
        <div className="my-3 flex justify-center gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="star-pop w-5 h-5 fill-[#FFE600] text-[#FFE600]" style={d(i * 160)} />)}
        </div>
        <div className="font-display font-bold text-white text-sm">Review growth</div>
      </Tile>
    </Grid>
  );
}

/* ------------------------------------------------------------------ */
/* Meta Ads: ad creative + funnel counters                             */
/* ------------------------------------------------------------------ */
function Metric({ label, n, on, w, delay }: { label: string; n: number; on: boolean; w: string; delay: number }) {
  const v = useCountUp(n, on, 1800);
  return (
    <div>
      <div className="flex justify-between text-[11px] text-slate-300 mb-1"><span>{label}</span><b className="text-white tabular-nums">{v.toLocaleString('en-IN')}</b></div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full bg-[#FFE600] transition-[width] duration-[1600ms] ease-out" style={{ width: on ? w : '0%', transitionDelay: `${delay}ms` }} />
      </div>
    </div>
  );
}

export function AdsVisual() {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref}>
      <Grid>
        <Tile delay={150} className="!p-3">
          <div className="rounded-xl bg-white overflow-hidden text-slate-900">
            <div className="flex items-center gap-2 p-2">
              <span className="w-6 h-6 rounded-full bg-[#FFE600] text-[9px] font-extrabold flex items-center justify-center">BM</span>
              <div className="leading-tight"><div className="text-[11px] font-bold">Your Business</div><div className="text-[9px] text-slate-500">Sponsored</div></div>
            </div>
            <div className="aspect-[4/3] bg-gradient-to-br from-[#FFE600] via-amber-300 to-orange-400 flex items-center justify-center p-2 text-center">
              <span className="font-display font-extrabold text-lg leading-tight text-black">New website<br />from ₹2,999</span>
            </div>
            <div className="p-2"><div className="rounded-lg bg-emerald-500 text-white text-[11px] font-bold text-center py-1.5 flex items-center justify-center gap-1"><MessageSquare className="w-3 h-3" /> Send WhatsApp message</div></div>
          </div>
        </Tile>
        <Tile delay={300} className="flex flex-col justify-between gap-3">
          <span className="tile-label">Campaign results</span>
          <div className="space-y-3">
            <Metric label="Reach" n={12480} on={seen} w="100%" delay={0} />
            <Metric label="Clicks" n={642} on={seen} w="62%" delay={300} />
            <Metric label="Leads" n={58} on={seen} w="30%" delay={600} />
          </div>
          <div className="text-[10px] text-slate-500 font-mono">illustrative example</div>
        </Tile>
        <Tile delay={500} className="col-span-2">
          <div className="flex items-center gap-3">
            <span className="relative w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0"><MessageSquare className="w-5 h-5" /><i className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#FFE600] animate-ping" /></span>
            <div className="leading-tight"><div className="text-sm font-bold text-white font-display">New lead on WhatsApp</div><div className="text-[11px] text-slate-400">Arrives as it happens, not at month end</div></div>
            <TrendingUp className="w-5 h-5 text-emerald-400 ml-auto" />
          </div>
        </Tile>
      </Grid>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Social media: grid of posts popping in                              */
/* ------------------------------------------------------------------ */
const POSTS = [
  { Icon: Camera, c: 'from-fuchsia-400 to-pink-500' },
  { Icon: Play, c: 'from-amber-300 to-orange-500' },
  { Icon: Sparkles, c: 'from-sky-300 to-indigo-500' },
  { Icon: Heart, c: 'from-rose-400 to-red-500' },
  { Icon: Camera, c: 'from-emerald-300 to-teal-500' },
  { Icon: Play, c: 'from-violet-400 to-purple-600' },
  { Icon: Sparkles, c: 'from-yellow-200 to-[#FFE600]' },
  { Icon: Camera, c: 'from-cyan-300 to-blue-500' },
  { Icon: Heart, c: 'from-orange-300 to-pink-500' },
];

export function SocialVisual() {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  const followers = useCountUp(2480, seen, 2200);
  return (
    <div ref={ref} className="w-full max-w-[420px] mx-auto lg:ml-auto">
      <Tile className="!p-4" delay={150}>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#FFE600] to-pink-500"><span className="w-full h-full rounded-full bg-[#0A0B0E] text-white text-xs font-extrabold flex items-center justify-center">BM</span></span>
          <div className="leading-tight">
            <div className="text-sm font-bold text-white font-display">your.business</div>
            <div className="text-[11px] text-slate-400"><b className="text-white tabular-nums">{followers.toLocaleString('en-IN')}</b> followers · illustrative</div>
          </div>
          <span className="ml-auto text-[11px] font-bold rounded-full bg-[#FFE600] text-black px-3 py-1">Follow</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 relative">
          {POSTS.map(({ Icon, c }, i) => (
            <div key={i} className={`post-pop aspect-square rounded-lg bg-gradient-to-br ${c} flex items-center justify-center ${seen ? 'post-on' : ''}`} style={d(i * 130)}>
              <Icon className="w-6 h-6 text-white/90" />
            </div>
          ))}
          {[0, 1, 2].map((i) => <Heart key={i} className="heart-float absolute bottom-2 w-4 h-4 fill-rose-400 text-rose-400" style={{ left: `${20 + i * 28}%`, ...d(i * 900) }} />)}
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-rose-400" /> Reach that converts</span>
          <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4 text-emerald-400" /> DMs answered</span>
        </div>
      </Tile>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing: three published prices                                     */
/* ------------------------------------------------------------------ */
function PriceRow({ label, n, note, on, i }: { label: string; n: number; note: string; on: boolean; i: number }) {
  const v = useCountUp(n, on, 1400 + i * 200);
  return (
    <Tile delay={150 + i * 180} className="flex items-center justify-between gap-3">
      <div>
        <div className="tile-label">{label}</div>
        <div className="mt-1 font-display font-extrabold text-3xl sm:text-4xl text-white tabular-nums">₹{v.toLocaleString('en-IN')}</div>
      </div>
      <span className="text-[11px] font-bold rounded-full bg-[#FFE600] text-black px-3 py-1 whitespace-nowrap">{note}</span>
    </Tile>
  );
}

export function PriceVisual() {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className="w-full max-w-[460px] mx-auto lg:ml-auto space-y-3">
      <PriceRow i={0} on={seen} label="One-page website" n={2999} note="Live in 48 hrs" />
      <PriceRow i={1} on={seen} label="Multi-page website" n={4999} note="Custom-coded" />
      <PriceRow i={2} on={seen} label="Online store" n={9999} note="No yearly renewal" />
      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1"><Check className="w-3.5 h-3.5 text-[#FFE600]" /> Fixed prices · excl. 18% GST · domain + server in year 1</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Our work: scrolling project thumbnails                              */
/* ------------------------------------------------------------------ */
const THUMBS = ['#FFE600', '#34D399', '#38BDF8', '#F472B6', '#FB923C', '#A78BFA'];
function Thumb({ c, i }: { c: string; i: number }) {
  return (
    <div className="w-40 shrink-0 rounded-xl bg-white p-2 shadow-lg">
      <div className="flex gap-1 mb-1.5"><i className="w-1.5 h-1.5 rounded-full bg-slate-300" /><i className="w-1.5 h-1.5 rounded-full bg-slate-300" /><i className="w-1.5 h-1.5 rounded-full bg-slate-300" /></div>
      <div className="h-16 rounded-md flex items-end p-1.5" style={{ background: `linear-gradient(135deg, ${c}, ${c}99)` }}>
        <div className="h-2 rounded bg-black/70" style={{ width: `${50 + (i % 3) * 15}%` }} />
      </div>
      <div className="mt-1.5 space-y-1"><div className="h-1.5 rounded bg-slate-200 w-5/6" /><div className="h-1.5 rounded bg-slate-100 w-3/5" /></div>
    </div>
  );
}

export function WorkVisual() {
  const row = [...THUMBS, ...THUMBS];
  return (
    <Grid>
      <Tile className="col-span-2 !p-0 overflow-hidden" delay={150}>
        <div className="marquee-mask py-4 space-y-3 overflow-hidden" data-no-reveal>
          <div className="animate-marquee flex gap-3 w-max">{row.map((c, i) => <Thumb key={i} c={c} i={i} />)}</div>
          <div className="animate-marquee-rev flex gap-3 w-max">{[...row].reverse().map((c, i) => <Thumb key={i} c={c} i={i + 1} />)}</div>
        </div>
      </Tile>
      <Tile delay={350} className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-xl bg-[#FFE600] text-black flex items-center justify-center shrink-0"><Check className="w-5 h-5" strokeWidth={3} /></span>
        <div className="leading-tight"><div className="text-sm font-bold text-white font-display">Verified</div><div className="text-[11px] text-slate-400">Real numbers only</div></div>
      </Tile>
      <Tile delay={500} className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0"><TrendingUp className="w-5 h-5" /></span>
        <div className="leading-tight"><div className="text-sm font-bold text-white font-display">Results</div><div className="text-[11px] text-slate-400">Leads, calls, orders</div></div>
      </Tile>
    </Grid>
  );
}

/* ------------------------------------------------------------------ */
/* About: numbers                                                      */
/* ------------------------------------------------------------------ */
function Num({ n, suffix = '', prefix = '', label, on, delay }: { n: number; suffix?: string; prefix?: string; label: string; on: boolean; delay: number }) {
  const v = useCountUp(n, on);
  return (
    <Tile delay={delay}>
      <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#FFE600] tabular-nums">{prefix}{v.toLocaleString('en-IN')}{suffix}</div>
      <div className="mt-1 text-xs text-slate-300">{label}</div>
    </Tile>
  );
}

export function AboutVisual() {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref}>
      <Grid>
        <Num on={seen} n={1400} suffix="+" label="Learners trained via BM Academy" delay={150} />
        <Num on={seen} n={150} suffix="+" label="Placed through BM Academy" delay={300} />
        <Num on={seen} n={48} suffix=" hrs" label="One-page site goes live" delay={450} />
        <Num on={seen} n={2999} prefix="₹" label="Published fixed price" delay={600} />
        <Tile className="col-span-2 flex items-center gap-3" delay={750}>
          <span className="w-11 h-11 rounded-xl bg-white/10 text-[#FFE600] flex items-center justify-center shrink-0"><Building2 className="w-5 h-5" /></span>
          <div className="leading-tight"><div className="text-sm font-bold text-white font-display">Afra Ventures Private Limited</div><div className="text-[11px] text-slate-400">Registered company · Puducherry</div></div>
          <Award className="w-5 h-5 text-[#FFE600] ml-auto" />
        </Tile>
      </Grid>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Contact: every channel                                              */
/* ------------------------------------------------------------------ */
export function ContactVisual() {
  const link = 'bento-tile hero-in flex items-center gap-3 hover:!border-[#FFE600]';
  return (
    <div className="w-full max-w-[460px] mx-auto lg:ml-auto space-y-3">
      <div className="bento-tile hero-in flex items-center gap-4" style={d(150)}>
        <span className="relative w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
          <MessageSquare className="w-6 h-6" />
          <span className="ripple !w-12 !h-12 !border-emerald-400" />
        </span>
        <div className="leading-tight">
          <div className="font-display font-bold text-white text-lg">WhatsApp us</div>
          <div className="text-xs text-slate-400">First reply within minutes</div>
        </div>
        <span className="ml-auto live-pill"><i /> Online</span>
      </div>
      <a href="tel:+919944940051" className={link} style={d(300)}>
        <span className="w-11 h-11 rounded-xl bg-white/10 text-[#FFE600] flex items-center justify-center shrink-0"><Phone className="w-5 h-5" /></span>
        <div className="leading-tight"><div className="font-display font-bold text-white">+91 99449 40051</div><div className="text-[11px] text-slate-400">Mon–Fri 10–7 · Sat 10–5</div></div>
      </a>
      <a href="mailto:admin@bmtechx.in" className={link} style={d(450)}>
        <span className="w-11 h-11 rounded-xl bg-white/10 text-[#FFE600] flex items-center justify-center shrink-0"><Mail className="w-5 h-5" /></span>
        <div className="leading-tight"><div className="font-display font-bold text-white">admin@bmtechx.in</div><div className="text-[11px] text-slate-400">Written scope within one working day</div></div>
      </a>
      <div className="bento-tile hero-in flex items-center gap-3" style={d(600)}>
        <span className="relative w-11 h-11 rounded-xl bg-white/10 text-[#FFE600] flex items-center justify-center shrink-0"><MapPin className="w-5 h-5" /><span className="ripple !w-11 !h-11" /></span>
        <div className="leading-tight"><div className="font-display font-bold text-white">Puducherry HQ</div><div className="text-[11px] text-slate-400">78 Lenin Street, Kosapalayam · 605013</div></div>
        <Users className="w-4 h-4 text-slate-500 ml-auto" />
      </div>
    </div>
  );
}
