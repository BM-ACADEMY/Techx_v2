import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Search, 
  ArrowRight, 
  BookOpen, 
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { POSTS } from '@/data/posts';

const CATEGORIES = ['All', ...Array.from(new Set(POSTS.map((p) => p.tag)))];

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {

    // Blog Schema
    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": "https://bmtechx.in/blog/#blog",
      "name": "BM TechX Guides",
      "url": "https://bmtechx.in/blog",
      "description": "Straight answers about digital marketing, web engineering benchmarks and real costs in India.",
      "publisher": {
        "@type": "Organization",
        "name": "BM TechX",
        "legalName": "Afra Ventures Private Limited",
        "url": "https://bmtechx.in"
      },
      "blogPost": POSTS.map((post) => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "datePublished": post.date,
        "url": `https://bmtechx.in/blog/${post.slug}/`,
        "author": { "@type": "Organization", "name": "BM TechX" }
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

  const filteredPosts = POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.tag === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchQuery.toLowerCase());
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
          What things actually cost, how long they actually take, and when not to hire an agency. Written by the team building these sites in Puducherry.
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
            placeholder="Search guides (e.g. 'WordPress', 'Google Maps', 'WhatsApp')..."
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
            Try another topic or clear the filter to see all guides.
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
              </div>

              <div className="pt-5 border-t border-bm-line/60 mt-6 flex items-center justify-between">
                <p className="text-[11px] text-bm-ink-faint">BM TechX · {new Date(post.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-xs font-bold text-bm-terracotta hover:underline flex items-center gap-1"
                >
                  Read article <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
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
