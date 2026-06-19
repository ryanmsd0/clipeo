import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/CtaPanel";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog, guides et playbooks du clipping",
  description:
    "Guides, décryptages et playbooks sur le clipping, le format court et l'omniprésence, par l'équipe Clipeo derrière +620M de vues.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link> <span>/</span> <span>Blog</span>
          </div>
          <h1>Guides &amp; playbooks<br />du format court.</h1>
          <p>
            Tout ce qu&apos;on a appris en générant +620M de vues : stratégie, distribution, et ce qui fait
            vraiment décoller un contenu.
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cases-grid stagger">
            {posts.map((p) => (
              <Link href={`/blog/${p.slug}`} className="case-card" key={p.slug}>
                <span className="cat">{p.category}</span>
                <h3 style={{ fontSize: "1.5rem", marginTop: 0 }}>{p.title}</h3>
                <div className="meta">{p.excerpt}</div>
                <span className="more">
                  Lire l&apos;article
                  <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel />
    </main>
  );
}
