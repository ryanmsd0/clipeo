import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "@/i18n/navigation";
import CtaPanel from "@/components/CtaPanel";
import ReadingProgress from "@/components/ReadingProgress";
import ArticleToc, { type TocItem } from "@/components/ArticleToc";
import { getAllPosts, getPost } from "@/lib/posts";
import { SITE } from "@/lib/site";

const UI = {
  fr: { home: "Accueil", toc: "Sommaire", takeaways: "À retenir", readNext: "À lire ensuite", locale: "fr-FR" },
  en: { home: "Home", toc: "Contents", takeaways: "Key takeaways", readNext: "Read next", locale: "en-US" },
} as const;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    keywords: post.meta.keywords,
    alternates: { canonical: `/blog/${post.meta.slug}` },
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.excerpt,
      publishedTime: post.meta.date,
    },
  };
}

/* slug d'ancrage stable, identique côté sommaire (regex) et côté rendu (MDX) */
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[*_`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function flatten(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(flatten).join("");
  if (children && typeof children === "object" && "props" in children) {
    return flatten((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function extractHeadings(content: string): TocItem[] {
  const items: TocItem[] = [];
  const re = /^(#{2,3})\s+(.+)$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    const text = m[2].replace(/[*_`]/g, "").trim();
    items.push({ id: slugify(text), text, level: m[1].length });
  }
  return items;
}

export default async function BlogPost({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) notFound();
  const { meta, content } = post;
  const t = locale === "en" ? UI.en : UI.fr;
  const headings = extractHeadings(content);
  const related = getAllPosts(locale).filter((p) => p.slug !== slug).slice(0, 2);

  const dateFmt = new Date(meta.date).toLocaleDateString(t.locale, { day: "numeric", month: "long", year: "numeric" });

  const mdxComponents = {
    h2: (props: { children?: ReactNode }) => <h2 id={slugify(flatten(props.children))}>{props.children}</h2>,
    h3: (props: { children?: ReactNode }) => <h3 id={slugify(flatten(props.children))}>{props.children}</h3>,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/blog/${meta.slug}`,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.home, item: SITE.url },
      { "@type": "ListItem", position: 2, name: meta.title, item: `${SITE.url}/blog/${meta.slug}` },
    ],
  };

  return (
    <main className="article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <ReadingProgress />

      {/* HERO ÉDITORIAL */}
      <header className="art-hero">
        <div className="container">
          <span className="art-cat">{meta.category}</span>
          <h1>{meta.title}</h1>
          <p className="art-deck">{meta.excerpt}</p>
          <div className="art-meta">
            <span className="art-av" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element -- petit logo-mark (œil Clipeo) décoratif */}
              <img src="/img/logo-mark-white.png" alt="" />
            </span>
            <span>
              <b>{meta.author}</b>
              <i>{dateFmt} · {meta.readingTime}</i>
            </span>
          </div>
        </div>
      </header>

      {/* CORPS : sommaire collant + article */}
      <div className="container">
        <div className="art-grid">
          {headings.length > 1 && (
            <aside className="art-side">
              <ArticleToc items={headings} label={t.toc} />
            </aside>
          )}

          <article className="prose">
            {meta.takeaways && meta.takeaways.length > 0 && (
              <div className="art-key reveal">
                <p className="art-key-t">{t.takeaways}</p>
                <ul>
                  {meta.takeaways.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </div>
            )}
            <MDXRemote source={content} components={mdxComponents} />
          </article>
        </div>
      </div>

      {/* À LIRE ENSUITE */}
      {related.length > 0 && (
        <section className="sec art-next">
          <div className="container">
            <p className="mono-label" style={{ textAlign: "center", marginBottom: 30 }}>{t.readNext}</p>
            <div className="art-next-grid">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="art-next-card">
                  <span className="anc-cat">{p.category}</span>
                  <h3>{p.title}</h3>
                  <span className="anc-min">{p.readingTime}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaPanel />
    </main>
  );
}
