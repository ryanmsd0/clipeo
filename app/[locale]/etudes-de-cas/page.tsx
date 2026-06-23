import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import CtaPanel from "@/components/CtaPanel";
import { getCases, type Locale } from "@/lib/cases";

const COPY = {
  fr: {
    metaTitle: "Études de cas, campagnes de clipping",
    metaDescription:
      "Découvrez les campagnes de clipping de Clipeo : +44M de vues pour « Plus Fort que Moi », +160,9M pour Charles & Mélanie… Des résultats chiffrés, des objectifs dépassés.",
    h1a: "Quand la campagne",
    h1b: "dépasse l’objectif.",
    intro:
      "24 clients accompagnés, 57 campagnes réalisées, +620M de vues en 6 mois. Voici comment on transforme du contenu long en omniprésence mesurable.",
    coverAlt: (client: string) => `Campagne de clipping ${client}`,
    readCase: "Lire l’étude de cas",
    ctaTitle: "Et si la prochaine étude de cas, c'était la vôtre ?",
    ctaText:
      "On audite votre contenu et on vous projette un objectif de vues garanti au contrat. Audit gratuit, sans engagement.",
  },
  en: {
    metaTitle: "Case studies, clipping campaigns",
    metaDescription:
      "See Clipeo's clipping campaigns: +44M views for « Plus Fort que Moi », +160.9M for Charles & Mélanie. Concrete numbers, targets beaten.",
    h1a: "When the campaign",
    h1b: "beats the target.",
    intro:
      "24 clients, 57 campaigns, +620M views in 6 months. Here is how we turn long-form content into measurable omnipresence.",
    coverAlt: (client: string) => `${client} clipping campaign`,
    readCase: "See the case study",
    ctaTitle: "What if the next case study was yours?",
    ctaText:
      "We audit your content and give you a concrete view forecast, with a guaranteed view volume written into your contract. Free audit, no commitment.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const t = COPY[locale] ?? COPY.fr;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: "/etudes-de-cas" },
  };
}

export default async function EtudesDeCasPage() {
  const locale = (await getLocale()) as Locale;
  const t = COPY[locale] ?? COPY.fr;
  const CASES = getCases(locale);
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>{t.h1a}<br />{t.h1b}</h1>
          <p>{t.intro}</p>
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
                    <img src={cover} alt={t.coverAlt(c.client)} loading="lazy" width={1600} height={900} />
                  </div>
                  <div className="case-body">
                    <span className="cat">{c.category}</span>
                    <div className="num">{c.bigNum}</div>
                    <h3>{c.client}</h3>
                    <div className="meta">{c.meta}</div>
                    <span className="more">
                      {t.readCase}
                      <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaPanel title={t.ctaTitle} text={t.ctaText} />
    </main>
  );
}
