import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import CtaPanel from "@/components/CtaPanel";
import { getAllPosts, getPost } from "@/lib/posts";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
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

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, content } = post;

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
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
      { "@type": "ListItem", position: 3, name: meta.title, item: `${SITE.url}/blog/${meta.slug}` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="page-hero" style={{ paddingBottom: 30 }}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link> <span>/</span> <Link href="/blog">Blog</Link> <span>/</span>{" "}
            <span>{meta.category}</span>
          </div>
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
