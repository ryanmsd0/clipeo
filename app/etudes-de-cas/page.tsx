import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/CtaPanel";
import { CASES } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Études de cas, campagnes de clipping",
  description:
    "Découvrez les campagnes de clipping de Clipeo : +44M de vues pour « Plus Fort que Moi », +160,9M pour Charles & Mélanie… Des résultats chiffrés, des objectifs dépassés.",
  alternates: { canonical: "/etudes-de-cas" },
};

export default function EtudesDeCasPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link> <span>/</span> <span>Études de cas</span>
          </div>
          <h1>Quand la campagne<br />dépasse l&apos;objectif.</h1>
          <p>
            24 clients accompagnés, 57 campagnes réalisées, +620M de vues en 6 mois. Voici comment on
            transforme du contenu long en omniprésence mesurable.
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cases-grid stagger">
            {CASES.map((c) => {
              const cover = `/img/Clipeo%20covers%20campagnes/${c.img.split("/").pop()}`;
              return (
                <Link href={`/etudes-de-cas/${c.slug}`} className="case-card" key={c.slug}>
                  <div className="case-cover">
                    {/* eslint-disable-next-line @next/next/no-img-element -- cover de campagne (chemin avec espaces) */}
                    <img src={cover} alt={`Campagne de clipping ${c.client}`} loading="lazy" width={1600} height={900} />
                  </div>
                  <div className="case-body">
                    <span className="cat">{c.category}</span>
                    <div className="num">{c.bigNum}</div>
                    <h3>{c.client}</h3>
                    <div className="meta">{c.meta}</div>
                    <span className="more">
                      Lire l&apos;étude de cas
                      <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaPanel
        title="Et si la prochaine étude de cas, c'était la vôtre ?"
        text="On audite votre contenu et on vous projette un objectif de vues garanti au contrat. Audit gratuit, sans engagement."
      />
    </main>
  );
}
