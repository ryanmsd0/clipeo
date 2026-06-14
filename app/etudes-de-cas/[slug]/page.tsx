import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaPanel from "@/components/CtaPanel";
import { Check } from "@/components/Icons";
import { CASES, getCase } from "@/lib/cases";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return {
    title: `${c.client}, ${c.bigNum} de vues`,
    description: c.excerpt,
    alternates: { canonical: `/etudes-de-cas/${c.slug}` },
    openGraph: { title: `${c.client}, étude de cas Clipeo`, description: c.excerpt },
  };
}

export default async function CaseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.client}, étude de cas`,
    description: c.excerpt,
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/etudes-de-cas/${c.slug}`,
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="page-hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link> <span>/</span>{" "}
            <Link href="/etudes-de-cas">Études de cas</Link> <span>/</span> <span>{c.client}</span>
          </div>
          <h1>{c.client}</h1>
          <p>{c.excerpt}</p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 10 }}>
        <div className="container">
          <div className="case-hero-grid">
            <div className="reveal">
              <div className="case-bignum">{c.bigNum}</div>
              <div className="case-cap">{c.cap}</div>
              <div className="case-meta">{c.meta}</div>
              {c.objective && (
                <div className="case-obj">
                  <b>{c.objective.line}</b>
                  <br />
                  <span className="up">{c.objective.up}</span>
                </div>
              )}
            </div>
            {c.platforms ? (
              <div className="platforms reveal">
                <h4>Répartition des vues</h4>
                {c.platforms.map((p) => (
                  <div className="plat" key={p.abbr}>
                    <div className="plat-l">
                      <div className="plat-ic" style={{ background: p.color }}>{p.abbr}</div>
                      <div className="plat-name">{p.name}</div>
                    </div>
                    <div className="plat-v">{p.value}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="case-metrics reveal" style={{ marginTop: 0 }}>
                {c.metrics.map((m) => (
                  <div className="cmetric" key={m.k}>
                    <div className="v grad">{m.v}</div>
                    <div className="k">{m.k}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {c.platforms && (
            <div className="case-metrics stagger">
              {c.metrics.map((m) => (
                <div className="cmetric" key={m.k}>
                  <div className="v grad">{m.v}</div>
                  <div className="k">{m.k}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="prose reveal" style={{ marginLeft: 0 }}>
            <h2>Le défi</h2>
            <p>{c.challenge}</p>
            <h2>Notre approche</h2>
            <ul>
              {c.approach.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
            <h2>Les résultats</h2>
            <p>{c.results}</p>
          </div>
        </div>
      </section>

      <CtaPanel
        title="Votre campagne peut faire la même chose."
        text="On part de votre contenu, on fixe un objectif de vues chiffré, et on le garantit au contrat."
      />
    </main>
  );
}
