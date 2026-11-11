import { useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CalendarDays, ChevronRight, Clock, Layers, MapPin, MessageSquare, Sparkles, Star, type LucideIcon } from 'lucide-react';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { POSTS, type Post } from '@/data/posts';

/* ---------- helpers ---------- */
const imgUrl = (src: string, w: number) => `${src.split('?')[0]}?auto=format&fit=crop&w=${w}&q=70`;
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const monthKey = (iso: string) => iso.slice(0, 7);
const monthShort = (key: string) =>
  new Date(`${key}-01`).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
const monthLong = (key: string) =>
  new Date(`${key}-01`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const mins = (rt: string) => `${(rt.match(/\d+/) ?? ['5'])[0]} Mins to Read`;

const VARIANT: Record<string, { glow: string; Icon: LucideIcon }> = {
  'Festive marketing': { glow: '#FB923C', Icon: Sparkles },
  Pricing: { glow: '#FFE600', Icon: Star },
  Website: { glow: '#38BDF8', Icon: Layers },
  'Local SEO': { glow: '#34D399', Icon: MapPin },
  WhatsApp: { glow: '#22C55E', Icon: MessageSquare },
};

/* ---------- cover banner: image or generated artwork, title on top ---------- */
function Cover({ post, large = false }: { post: Post; large?: boolean }) {
  const v = VARIANT[post.tag] ?? { glow: '#FFE600', Icon: Sparkles };
  const Icon = v.Icon;
  return (
    <div
      className={`blog-cover ${large ? 'h-full min-h-[280px]' : 'fold aspect-[4/3]'}`}
      style={{ ['--glow' as string]: v.glow, ['--fold' as string]: large ? '40px' : '30px' }}
    >
      {post.hero ? (
        <img src={imgUrl(post.hero.src, large ? 1000 : 700)} alt="" loading="lazy" className="blog-cover-img" />
      ) : (
        <>
          <div className="blog-cover-art" aria-hidden="true" />
          <Icon className="blog-cover-icon" aria-hidden="true" />
        </>
      )}
      <div className="blog-cover-shade" aria-hidden="true" />
      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-[3]">
        <span className="w-5 h-5 bg-[#FFE600] text-black text-[9px] font-extrabold flex items-center justify-center fold-xs">BM</span>
        <span className="text-[11px] font-bold text-white/90 tracking-wide">BM TechX</span>
      </div>
      <div className={`absolute left-4 bottom-4 z-[3] ${large ? 'right-[22%]' : 'right-4'}`}>
        <span className="inline-block text-[10px] font-bold uppercase tracking-[.16em] text-[#FFE600] mb-1.5">{post.tag}</span>
        <div className={`font-display font-bold text-white leading-snug ${large ? 'text-2xl sm:text-3xl' : 'text-[15px] sm:text-base'} line-clamp-3`}>
          {post.title}
        </div>
      </div>
    </div>
  );
}

function MetaChips({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="meta-chip"><CalendarDays className="w-3.5 h-3.5" /> {fmtDate(post.date)}</span>
      <span className="meta-chip"><Clock className="w-3.5 h-3.5" /> {mins(post.readTime)}</span>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="blog-card group">
      <Link to={`/blog/${post.slug}/`} aria-label={post.title} className="block">
        <Cover post={post} />
        <h2 className="mt-4 text-lg font-bold leading-snug text-[#0A0B0E] group-hover:underline decoration-[#FFE600] decoration-[3px] underline-offset-4">
          {post.title}
        </h2>
      </Link>
      <div className="mt-3"><MetaChips post={post} /></div>
    </article>
  );
}

function Featured({ post }: { post: Post }) {
  return (
    <section aria-label="Featured article" className="blog-tray">
      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-0">
        <Link to={`/blog/${post.slug}/`} aria-label={post.title} className="block blog-feature-img">
          <Cover post={post} large />
        </Link>
        <div className="blog-feature-panel">
          <h2 className="text-2xl sm:text-[1.7rem] font-bold leading-snug text-[#0A0B0E]">{post.title}</h2>
          <div className="mt-4"><MetaChips post={post} /></div>
          <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-slate-600 line-clamp-4">{post.excerpt}</p>
          <Link to={`/blog/${post.slug}/`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#0A0B0E] group">
            <span className="border-b-2 border-[#FFE600] pb-0.5">Continue Reading</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- page ---------- */
export function BlogPage() {
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const blogSchema = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': 'https://bmtechx.in/blog/#blog',
      name: 'BM TechX Guides',
      url: 'https://bmtechx.in/blog',
      description: 'Straight answers about digital marketing, web engineering benchmarks and real costs in India.',
      publisher: { '@type': 'Organization', name: 'BM TechX', legalName: 'Afra Ventures Private Limited', url: 'https://bmtechx.in' },
      blogPost: POSTS.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: `https://bmtechx.in/blog/${post.slug}/`,
        author: { '@type': 'Organization', name: 'BM TechX' },
      })),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'blog-schema';
    script.text = JSON.stringify(blogSchema);
    document.head.appendChild(script);
    return () => {
      document.getElementById('blog-schema')?.remove();
    };
  }, []);

  const sorted = useMemo(() => [...POSTS].sort((a, b) => b.date.localeCompare(a.date)), []);
  const months = useMemo(() => {
    const map = new Map<string, number>();
    sorted.forEach((p) => map.set(monthKey(p.date), (map.get(monthKey(p.date)) ?? 0) + 1));
    return [...map.entries()];
  }, [sorted]);

  const monthParam = params.get('month');
  const active = monthParam && months.some(([k]) => k === monthParam) ? monthParam : 'all';
  const setTab = (k: string) => (k === 'all' ? setParams({}) : setParams({ month: k }));

  const visible = active === 'all' ? sorted : sorted.filter((p) => monthKey(p.date) === active);
  const featured = active === 'all' ? visible[0] : undefined;
  const rest = featured ? visible.slice(1) : visible;

  // group the remaining posts by month (newest first)
  const groups = useMemo(() => {
    const g = new Map<string, Post[]>();
    rest.forEach((p) => g.set(monthKey(p.date), [...(g.get(monthKey(p.date)) ?? []), p]));
    return [...g.entries()];
  }, [rest]);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-10">
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-2">
        <Link to="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">Blog</span>
      </nav>

      <header className="space-y-5">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#0A0B0E] leading-[1.05] max-w-4xl">
          Digital marketing tips for Tamil Nadu businesses: <span className="mark">straight answers</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          What things actually cost, how long they actually take, and when not to hire an agency. Written by the team building these sites in Puducherry.
        </p>

        {/* All + month-wise tabs */}
        <div role="tablist" aria-label="Filter articles by month" className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
          {[['all', 'All', POSTS.length] as const, ...months.map(([k, n]) => [k, monthShort(k), n] as const)].map(([k, label, n]) => (
            <button
              key={k}
              role="tab"
              aria-selected={active === k}
              onClick={() => setTab(k)}
              className={`tab-slant ${active === k ? 'is-active' : ''}`}
            >
              <span>
                {label}
                <i className="tab-count">{n}</i>
              </span>
            </button>
          ))}
        </div>
      </header>

      {featured && <Featured post={featured} />}

      {groups.map(([key, list]) => (
        <section key={key} aria-label={monthLong(key)} className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0A0B0E] whitespace-nowrap">{monthLong(key)}</h2>
            <span className="meta-chip">{list.length} {list.length === 1 ? 'article' : 'articles'}</span>
            <span className="flex-1 h-px bg-gradient-to-r from-[#0A0B0E]/25 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {list.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </section>
      ))}

      {visible.length === 0 && (
        <p className="text-center text-slate-500 py-16">No articles in this month yet.</p>
      )}

      <section className="bg-[#0A0B0E] rounded-3xl p-8 sm:p-12 text-center space-y-4 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold !text-white">Got an agency quote and want an honest second opinion?</h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Send us any proposal or invoice from another agency. We will tell you in plain Tamil or English what is real, what is inflated, and what you actually need.
        </p>
        <div className="flex justify-center pt-2">
          <WhatsAppCTA
            src="blog-audit"
            label="Send Proposal for Second Opinion"
            intent="I have an agency quote I want an honest second opinion on"
            size="lg"
          />
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
