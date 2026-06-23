import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main>
      <section className="page-hero" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div className="container">
          <span className="mono-label" style={{ display: "block", marginBottom: 18 }}>Erreur 404</span>
          <h1>Cette page<br /><span className="grad">n&apos;existe pas.</span></h1>
          <p>Le lien est peut-être cassé, ou la page a été déplacée. Repartons du bon contenu.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 30 }}>
            <Link href="/" className="btn btn-primary"><span>Retour à l&apos;accueil</span></Link>
            <Link href="/etudes-de-cas" className="btn"><span>Voir les études de cas</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
