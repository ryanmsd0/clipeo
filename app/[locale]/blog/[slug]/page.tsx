import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import CtaPanel from "@/components/CtaPanel";
import { getAllPosts, getPost } from "@/lib/posts";
import { SITE } from "@/lib/site";

const HOME_NAME = { fr: "Accueil", en: "Home" } as const;

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

export default async function BlogPost({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) notFound();
  const { meta, content } = post;
  const homeName = locale === "en" ? HOME_NAME.en : HOME_NAME.fr;

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
      { "@type": "ListItem", position: 1, name: homeName, item: SITE.url },
      { "@type": "ListItem", position: 2, name: meta.title, item: `${SITE.url}/blog/${meta.slug}` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="page-hero" style={{ paddingBottom: 30 }}>
        <div className="container">
          <span className="mono-label" style={{ display: "block", marginBottom: 18 }}>{meta.category}</span>
          <h1 style={{ maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>{meta.title}</h1>
          <p style={{ fontFamily: "var(--font-m)", fontSize: ".74rem", letterSpacing: "1px", color: "var(--w40)", textTransform: "uppercase" }}>
            {meta.author} · {meta.readingTime}
          </p>
        </div>
      </section>

      <article className="sec" style={{ paddingTop: 10 }}>
        <div className="container">
          <div className="prose reveal">
            <MDXRemote source={content} />
          </div>
        </div>
      </article>

      <CtaPanel />
    </main>
  );
}
