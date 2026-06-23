import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Link from "next/link";

const COPY = {
  fr: {
    metaTitle: "Page introuvable",
    error: "Erreur 404",
    h1: (
      <>Cette page<br /><span className="grad">n&apos;existe pas.</span></>
    ),
    body: "Le lien est peut-être cassé, ou la page a été déplacée. Repartons du bon contenu.",
    home: "Retour à l'accueil",
    cases: "Voir les études de cas",
  },
  en: {
    metaTitle: "Page not found",
    error: "Error 404",
    h1: (
      <>This page<br /><span className="grad">doesn&apos;t exist.</span></>
    ),
    body: "The link may be broken, or the page may have been moved. Let's get back to the good stuff.",
    home: "Back to home",
    cases: "See the case studies",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as keyof typeof COPY;
  const t = COPY[locale] ?? COPY.fr;
  return {
    title: t.metaTitle,
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const locale = (await getLocale()) as keyof typeof COPY;
  const t = COPY[locale] ?? COPY.fr;

  return (
    <main>
      <section className="page-hero" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div className="container">
          <span className="mono-label" style={{ display: "block", marginBottom: 18 }}>{t.error}</span>
          <h1>{t.h1}</h1>
          <p>{t.body}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 30 }}>
            <Link href="/" className="btn btn-primary"><span>{t.home}</span></Link>
            <Link href="/etudes-de-cas" className="btn"><span>{t.cases}</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
