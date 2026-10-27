import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Clock } from 'lucide-react'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'
import { getPost, POSTS, type Post, type PostImage } from '@/data/posts'
import { formatPrice, getPlanById } from '@/data/dataLayer'
import { NotFoundPage } from '@/pages/NotFoundPage'

/** Replace {{plan-id}} tokens with the live price from pricing.json. */
function fill(text: string): string {
  return text.replace(/\{\{([a-z0-9-]+)\}\}/g, (_, id: string) => {
    const plan = getPlanById(id)
    return plan ? formatPrice(plan.price) : ''
  })
}

/** Unsplash-style image URL at a given width (keeps any existing query out). */
function imgUrl(src: string, w: number): string {
  return `${src.split('?')[0]}?auto=format&fit=crop&w=${w}&q=75`
}

function PostFigure({ image, priority = false }: { image: PostImage; priority?: boolean }) {
  return (
    <figure className="space-y-1.5">
      <img
        src={imgUrl(image.src, 1200)}
        srcSet={`${imgUrl(image.src, 600)} 600w, ${imgUrl(image.src, 900)} 900w, ${imgUrl(image.src, 1200)} 1200w`}
        sizes="(max-width: 768px) 100vw, 768px"
        width={1200}
        height={800}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="w-full aspect-[3/2] object-cover rounded-2xl bg-bm-ink-faint/10"
      />
      {image.credit && (
        <figcaption className="text-[11px] text-bm-ink-faint">
          Photo:{' '}
          <a href={`${image.credit.url}?utm_source=bmtechx&utm_medium=referral`} target="_blank" rel="nofollow noopener noreferrer" className="underline">
            {image.credit.name}
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/?utm_source=bmtechx&utm_medium=referral" target="_blank" rel="nofollow noopener noreferrer" className="underline">
            Unsplash
          </a>
        </figcaption>
      )}
    </figure>
  )
}

function useArticleSchema(post: Post | undefined) {
  useEffect(() => {
    if (!post) return
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'article-schema'
    el.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          ...(post.hero ? { image: [imgUrl(post.hero.src, 1200)] } : {}),
          inLanguage: 'en-IN',
          mainEntityOfPage: `https://bmtechx.in/blog/${post.slug}/`,
          author: { '@type': 'Organization', name: 'BM TechX' },
          publisher: { '@type': 'Organization', name: 'BM TechX', url: 'https://bmtechx.in' },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bmtechx.in/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://bmtechx.in/blog/' },
            { '@type': 'ListItem', position: 3, name: post.title, item: `https://bmtechx.in/blog/${post.slug}/` },
          ],
        },
        ...(post.faqs?.length
          ? [{
              '@type': 'FAQPage',
              mainEntity: post.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }]
          : []),
      ],
    })
    document.head.appendChild(el)
    return () => el.remove()
  }, [post])
}

export function BlogPostPage() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  useArticleSchema(post)
  if (!post) return <NotFoundPage />

  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <div className="py-12 px-4 sm:px-6 max-w-3xl mx-auto space-y-10">
      <nav aria-label="Breadcrumb" className="text-xs text-bm-ink-faint">
        <ol className="flex items-center flex-wrap gap-2">
          <li><Link to="/" className="hover:text-bm-navy">Home</Link></li>
          <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 opacity-50" /><Link to="/blog" className="hover:text-bm-navy">Blog</Link></li>
          <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 opacity-50" /><span className="font-semibold text-bm-ink">{post.tag}</span></li>
        </ol>
      </nav>

      <header className="space-y-4">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-bold text-bm-orange bg-bm-orange/10 px-2.5 py-0.5 rounded-full">{post.tag}</span>
          <span className="text-bm-ink-faint flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
          <time dateTime={post.date} className="text-bm-ink-faint">
            {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-bm-navy-deep tracking-tight leading-tight">{post.title}</h1>
        <p className="text-base sm:text-lg text-bm-ink-muted leading-relaxed">{post.excerpt}</p>
        <p className="text-xs text-bm-ink-faint">
          By the BM TechX team, Puducherry
          {post.updated && post.updated !== post.date && (
            <>
              {' · Updated '}
              <time dateTime={post.updated}>
                {new Date(post.updated).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
            </>
          )}
        </p>
        {post.hero && <PostFigure image={post.hero} priority />}
      </header>

      <article className="space-y-4 text-bm-ink">
        {post.blocks.map((b, i) => {
          if ('h' in b) return <h2 key={i} className="text-xl sm:text-2xl font-extrabold text-bm-navy-deep pt-4">{b.h}</h2>
          if ('h3' in b) return <h3 key={i} className="text-lg sm:text-xl font-bold text-bm-navy-deep pt-2">{b.h3}</h3>
          if ('p' in b) return <p key={i} className="text-sm sm:text-base leading-relaxed">{fill(b.p)}</p>
          if ('img' in b) return <PostFigure key={i} image={b.img} />
          if ('cta' in b)
            return (
              <div key={i} className="flex justify-center py-2">
                <WhatsAppCTA src={`blog-${post.slug}`} intent={b.cta.intent} label={b.cta.label} variant="primary" className="py-3 px-6" />
              </div>
            )
          if ('table' in b)
            return (
              <div key={i} className="overflow-x-auto rounded-2xl border border-bm-ink-faint/20">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-bm-ink-faint/10">
                    <tr>{b.table.head.map((c) => <th key={c} scope="col" className="px-3 py-2.5 font-bold text-bm-navy-deep">{c}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.table.rows.map((r) => (
                      <tr key={r[0]} className="border-t border-bm-ink-faint/20">
                        {r.map((c, j) => j === 0
                          ? <th key={j} scope="row" className="px-3 py-2.5 font-semibold align-top">{c}</th>
                          : <td key={j} className="px-3 py-2.5 align-top">{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          return (
            <ul key={i} className="list-disc pl-5 space-y-2 text-sm sm:text-base leading-relaxed">
              {b.ul.map((li) => <li key={li}>{fill(li)}</li>)}
            </ul>
          )
        })}
      </article>

      {post.faqs && post.faqs.length > 0 && (
        <section aria-labelledby="post-faqs" className="space-y-4">
          <h2 id="post-faqs" className="text-xl sm:text-2xl font-extrabold text-bm-navy-deep">Frequently asked questions</h2>
          {post.faqs.map((f) => (
            <div key={f.q} className="space-y-1.5">
              <h3 className="text-base font-bold text-bm-navy-deep">{f.q}</h3>
              <p className="text-sm sm:text-base leading-relaxed text-bm-ink">{f.a}</p>
            </div>
          ))}
        </section>
      )}

      <section className="bg-bm-navy-deep text-white p-6 sm:p-8 rounded-3xl space-y-4 text-center">
        <p className="text-lg font-bold">Have a question about your own business?</p>
        <div className="flex flex-wrap justify-center gap-3">
          <WhatsAppCTA
            src={`blog-${post.slug}`}
            intent={`I read "${post.title}" and have a question.`}
            label="Ask on WhatsApp"
            variant="primary"
            className="py-3 px-6"
          />
          <Link to={post.related.to} className="inline-flex items-center text-sm font-bold bg-white text-bm-navy-deep px-5 py-3 rounded-xl">
            {post.related.label}
          </Link>
        </div>
      </section>

      <nav aria-label="More guides" className="space-y-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-bm-ink-faint">More guides</h2>
        <ul className="space-y-1.5 text-sm">
          {more.map((m) => (
            <li key={m.slug}><Link to={`/blog/${m.slug}`} className="font-semibold text-bm-navy hover:underline">{m.title}</Link></li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default BlogPostPage
