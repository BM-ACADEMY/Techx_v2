import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Search, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  X,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';

interface BlogPost {
  slug: string;
  title: string;
  readTime: string;
  author: string;
  authorAnchor: string;
  authorRole: string;
  date: string;
  excerpt: string;
  tag: string;
  takeaways: string[];
  fullSummary: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'website-cost-tamil-nadu',
    title: 'How Much Does a Website Really Cost in Tamil Nadu in 2026–27?',
    readTime: '6 min read',
    author: 'Kamar',
    authorAnchor: 'kamar',
    authorRole: 'Founder & Strategy',
    date: 'October 2026',
    excerpt: 'The honest breakdown between ₹2,999 custom-coded launchpads, freelance quotes, and ₹50,000 agency retainers. Know what you are paying for.',
    tag: 'Pricing Benchmark',
    takeaways: [
      'Single-page launchpads should never exceed ₹3,000–₹5,000 for standard business leads.',
      'Always verify if domain & hosting are registered under YOUR email, not an agency account.',
      'Check renewal costs before signing — many ₹3,000 sites charge ₹8,000 surprise hosting fees in Year 2.'
    ],
    fullSummary: [
      'The web development market in South India is polarized between cheap template sellers and enterprise agencies charging 10x markups.',
      'A ₹2,999 custom-coded static site built on modern web stacks (like React/Vite) offers 95+ Core Web Vitals and zero plugin bloat, making it the most cost-effective choice for 90% of local service businesses.',
      'If you need database auth, dynamic cart checkouts, or custom multi-vendor logic, real costs start from ₹9,999 to ₹25,000 with transparent zero-commission payment gateways like Razorpay or PhonePe.'
    ]
  },
  {
    slug: 'seo-cost-india',
    title: 'SEO Packages in India: What Works, What is Scam, and Realistic Timelines',
    readTime: '8 min read',
    author: 'Karthika',
    authorAnchor: 'karthika',
    authorRole: 'SEO & Operations',
    date: 'October 2026',
    excerpt: 'Why ₹1,500 "guaranteed ranking" packages get your domain penalized, and how local map pack audits actually drive phone calls.',
    tag: 'SEO Guide',
    takeaways: [
      'Anyone promising "Page 1 ranking in 7 days" is using spam backlink networks that trigger Google penalties.',
      'Local 3-Pack rankings depend heavily on exact NAP consistency and verified geo-tagged Google Business Profile posts.',
      'Realistic timeline for organic ranking shifts in Tier-2/Tier-3 cities is 60 to 90 days of methodical technical work.'
    ],
    fullSummary: [
      'Search engine optimization in 2026 is no longer about keyword stuffing. Google and AI search engines (like ChatGPT Search and Perplexity) prioritize Answer-First architecture and fast mobile loading speeds.',
      'Our Local SEO Sprint focuses on fixing the 24 technical errors most agency sites ignore: missing canonical tags, uncompressed images, missing LocalBusiness schema, and orphaned pages.',
      'A genuine monthly SEO engagement in Tamil Nadu costs between ₹4,999 and ₹8,999 and should provide transparent ranking reports with zero fake traffic bots.'
    ]
  },
  {
    slug: 'why-custom-code-beats-wordpress',
    title: 'Why We Stopped Building on WordPress: The 2-Second Mobile Benchmark',
    readTime: '5 min read',
    author: 'Imran',
    authorAnchor: 'imran',
    authorRole: 'Content & Design',
    date: 'September 2026',
    excerpt: 'When your buyer is on a ₹12,000 Android smartphone using 4G data in Cuddalore or Villupuram, every 100KB plugin matters.',
    tag: 'Engineering',
    takeaways: [
      'The average WordPress site loads 1.8MB to 4MB of bloated CSS, JS, and tracker scripts.',
      'Custom-coded React + Vite sites compile down to under 150KB, loading in under 0.8 seconds even on patchy mobile connections.',
      'Zero plugins means zero plugin vulnerability hacks and zero unexpected site crashes after automated updates.'
    ],
    fullSummary: [
      'WordPress was built in 2003 for personal blogging. In 2026, building commercial business sites with 25 separate plugins creates a slow, fragile dependency house of cards.',
      'When an Indian customer searches on mobile, 53% abandon sites that take more than 3 seconds to load. Each extra second of delay cuts conversions by 20%.',
      'By hand-coding responsive HTML, CSS, and clean React components, our clients achieve 98+ Google PageSpeed mobile scores out of the box.'
    ]
  },
  {
    slug: 'meta-ads-budget-allocation',
    title: 'Meta Ads vs WhatsApp Ads: Where Should a Tamil Nadu Retailer Put ₹15,000?',
    readTime: '7 min read',
    author: 'Babila',
    authorAnchor: 'babila',
    authorRole: 'Social Media & Meta Ads',
    date: 'September 2026',
    excerpt: 'Lead forms vs direct WhatsApp click-to-chat: conversion rate benchmarks, cost per lead, and why regional Tamil copy converts 40% higher.',
    tag: 'Paid Ads',
    takeaways: [
      'Click-to-WhatsApp ads achieve 30% higher response rates in South India compared to traditional website landing page forms.',
      'Creative creative fatigue happens within 14–21 days in local geographic radiuses; rotating 3–5 ad variants is critical.',
      'Direct bilingual Tamil/English messaging beats generic corporate English by 40% in click-through rates.'
    ],
    fullSummary: [
      'If your marketing budget is ₹15,000 per month, spending ₹5,000 on management fees and ₹10,000 on direct ad spend is the optimal starter split.',
      'For local real estate, interior design, and clinics, direct WhatsApp ads allow your sales team to engage high-intent prospects within 2 minutes while their intent is at peak.',
      'We separate ad spend management transparently: clients pay Meta directly with their own card, ensuring 100% visibility over every rupee spent.'
    ]
  },
  {
    slug: 'whatsapp-lead-automation-guide',
    title: 'How We Automated Our Own Lead Routing for ₹0/month Using Meta Cloud API',
    readTime: '6 min read',
    author: 'Kamar',
    authorAnchor: 'kamar',
    authorRole: 'Founder & Strategy',
    date: 'August 2026',
    excerpt: 'Why monthly ₹5,000 third-party chatbot subscriptions are unnecessary for most local businesses. How official Cloud API webhooks work.',
    tag: 'WhatsApp Automation',
    takeaways: [
      'Meta provides the first 1,000 service conversations every month completely free on official WhatsApp Cloud API.',
      'Immediate qualification within 10 seconds increases qualified appointment bookings by 2.4x.',
      'Avoid unauthorized unofficial WhatsApp web scrapers that get your primary business number banned permanently.'
    ],
    fullSummary: [
      'Many agencies push clients toward expensive third-party tools that charge ₹3,000 to ₹10,000 per month just for basic automated replies.',
      'By connecting directly to Meta’s official Cloud API, you get verified green-badge eligibility, zero risk of account ban, and lightning-fast webhook responses.',
      'We program custom multi-intent routing so customers asking about pricing get an instant price PDF, while those requesting custom calls are directly routed to the founder.'
    ]
  },
  {
    slug: 'google-maps-ranking-dos-and-donts',
    title: 'Why Your Google Maps Rank Dropped and Why Buying 5-Star Reviews Will Kill Your Profile',
    readTime: '5 min read',
    author: 'Karthika',
    authorAnchor: 'karthika',
    authorRole: 'SEO & Operations',
    date: 'August 2026',
    excerpt: 'Google’s recent algorithmic sweeps on fake local reviews, and the safe, legitimate way to build 100+ verified customer reviews.',
    tag: 'SEO Guide',
    takeaways: [
      'Google’s AI detection algorithms now actively purge bulk reviews originating from non-local IP addresses.',
      'Direct QR codes placed at your billing counter or delivery receipt generate 8x more organic, verified reviews.',
      'Replying to every review with localized keywords within 24 hours directly influences Map Pack proximity ranking.'
    ],
    fullSummary: [
      'Google Maps 3-Pack is the highest converting real estate on the mobile screen for any local business in Puducherry or Chennai.',
      'Instead of risking a profile suspension with cheap purchased reviews, establish a simple WhatsApp review request flow triggered right after customer delivery.',
      'We configure automated review funnels that route happy customers straight to Google Maps and direct unhappy feedback to private management resolution.'
    ]
  }
];

const CATEGORIES = ['All', 'Pricing Benchmark', 'SEO Guide', 'Engineering', 'Paid Ads', 'WhatsApp Automation'];

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalPost, setActiveModalPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    document.title = "Insights & Industry Benchmarks | BM TechX";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Straight answers about web design, SEO pricing, Meta ad costs and digital marketing in Tamil Nadu. Written by engineers in Puducherry.'
      );
    }

    // Blog Schema
    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": "https://bmtechx.in/blog/#blog",
      "name": "BM TechX Engineering & Marketing Insights",
      "url": "https://bmtechx.in/blog",
      "description": "Straight answers about digital marketing, web engineering benchmarks and real costs in India.",
      "publisher": {
        "@type": "Organization",
        "name": "BM TechX",
        "legalName": "Afra Ventures Private Limited",
        "url": "https://bmtechx.in"
      },
      "blogPost": BLOG_POSTS.map((post) => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": "2026-09-01",
        "author": {
          "@type": "Person",
          "name": post.author,
          "url": `https://bmtechx.in/about#${post.authorAnchor}`
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'blog-schema';
    script.text = JSON.stringify(blogSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('blog-schema');
      if (existing) existing.remove();
    };
  }, []);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.tag === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-bm-ink-faint flex items-center gap-2">
        <Link to="/" className="hover:text-bm-navy">Home</Link>
        <span>/</span>
        <span className="text-bm-ink font-semibold">Blog & Insights</span>
      </nav>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-bm-orange bg-bm-orange/10 px-3.5 py-1 rounded-full">
          <BookOpen className="w-3.5 h-3.5" /> Transparent Engineering & Pricing
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-bm-navy-deep tracking-tight">
          Straight answers about digital marketing in India
        </h1>
        <p className="text-lg text-bm-ink-muted leading-relaxed">
          What things actually cost, how long they actually take, and when not to hire an agency. Written by the practitioners writing the code in Puducherry.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-bm-ink-faint absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides by keyword, topic, or author (e.g. 'WordPress', 'SEO cost', 'Kamar')..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-bm-line rounded-xl text-sm text-bm-ink placeholder:text-bm-ink-faint focus:outline-none focus:ring-2 focus:ring-bm-navy/30 focus:border-bm-navy shadow-sm transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
                selectedCategory === cat
                  ? 'bg-bm-navy text-white shadow-sm'
                  : 'bg-white text-bm-ink-muted border border-bm-line hover:border-bm-navy/40 hover:text-bm-navy'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-bm-line p-12 text-center max-w-md mx-auto space-y-3">
          <HelpCircle className="w-8 h-8 text-bm-ink-faint mx-auto" />
          <h2 className="text-lg font-bold text-bm-navy-deep">No matching articles found</h2>
          <p className="text-xs text-bm-ink-muted">
            Try searching for another topic or clear the filter to see all our engineering guides.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-2 text-xs"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article 
              key={post.slug} 
              className="bg-white rounded-2xl border border-bm-line p-6 shadow-sm hover:border-bm-navy/40 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-bm-orange bg-bm-orange/10 px-2.5 py-0.5 rounded-full">
                    {post.tag}
                  </span>
                  <span className="text-bm-ink-faint flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-bm-navy-deep group-hover:text-bm-navy leading-snug transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-bm-ink-muted leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Key Takeaways Snapshot */}
                <div className="bg-bm-wash-cool/60 rounded-xl p-3 border border-bm-line/60 space-y-1.5 text-xs text-bm-ink">
                  <p className="font-bold text-[11px] text-bm-navy uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-bm-orange" /> Key Findings:
                  </p>
                  <ul className="space-y-1 text-bm-ink-muted list-disc list-inside text-[11px] leading-tight">
                    {post.takeaways.slice(0, 2).map((takeaway, idx) => (
                      <li key={idx} className="line-clamp-2">{takeaway}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Author & Read Summary Action */}
              <div className="pt-5 border-t border-bm-line/60 mt-6 flex items-center justify-between">
                <div>
                  <Link 
                    to={`/about#${post.authorAnchor}`}
                    className="text-xs font-bold text-bm-navy hover:text-bm-orange hover:underline block transition-colors"
                    title={`View ${post.author}'s bio on About page`}
                  >
                    By {post.author}
                  </Link>
                  <p className="text-[11px] text-bm-ink-faint">{post.authorRole} · {post.date}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveModalPost(post)}
                  className="text-xs font-bold text-bm-terracotta hover:text-bm-terracotta/90 flex items-center gap-1 p-0 hover:bg-transparent"
                >
                  Read Summary <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ARTICLE PREVIEW MODAL */}
      {activeModalPost && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModalPost(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-bm-line relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalPost(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-bm-wash-cool text-bm-ink hover:bg-bm-wash-warm flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-bm-orange bg-bm-orange/10 px-2.5 py-0.5 rounded-full">
                  {activeModalPost.tag}
                </span>
                <span className="text-bm-ink-faint flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {activeModalPost.readTime}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-bm-navy-deep leading-snug">
                {activeModalPost.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-bm-ink-faint pt-1">
                <span>Written by</span>
                <Link 
                  to={`/about#${activeModalPost.authorAnchor}`}
                  onClick={() => setActiveModalPost(null)}
                  className="font-bold text-bm-navy underline hover:text-bm-orange"
                >
                  {activeModalPost.author} ({activeModalPost.authorRole})
                </Link>
                <span>·</span>
                <span>{activeModalPost.date}</span>
              </div>
            </div>

            <div className="bg-bm-wash-cool p-4 rounded-xl border border-bm-line space-y-2">
              <h3 className="text-xs font-bold text-bm-navy uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-bm-orange" /> Core Executive Takeaways
              </h3>
              <ul className="space-y-1.5 text-xs text-bm-ink list-disc list-inside">
                {activeModalPost.takeaways.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-bm-navy-deep flex items-center gap-2">
                <FileText className="w-4 h-4 text-bm-terracotta" /> Detailed Editorial Summary
              </h3>
              {activeModalPost.fullSummary.map((para, idx) => (
                <p key={idx} className="text-sm text-bm-ink leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            <div className="pt-4 border-t border-bm-line flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-bm-ink-muted">
                Need specific guidance on your business tech stack?
              </p>
              <WhatsAppCTA 
                src="blog-modal"
                label="Discuss with Author on WhatsApp"
                intent={`I read "${activeModalPost.title}" and have questions`}
                size="sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* FOOTER CTA SECTION */}
      <section className="bg-white rounded-2xl border-2 border-bm-line p-8 text-center max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-bm-navy-deep">
          Got an agency quote and want an honest second opinion?
        </h2>
        <p className="text-sm text-bm-ink-muted max-w-xl mx-auto">
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
