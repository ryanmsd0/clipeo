import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Les conditions générales de vente des prestations de clipping et de distribution de Clipeo.",
  alternates: { canonical: "/cgv" },
};

export default function CgvPage() {
  return (
    <main>
      <section className="page-hero" style={{ paddingBottom: 30 }}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link> <span>/</span> <span>CGV</span>
          </div>
          <h1>Conditions générales de vente</h1>
          <p>Dernière mise à jour : juin 2026.</p>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 10 }}>
        <div className="container">
          <div className="prose reveal">
            <p>
              Les présentes conditions régissent les prestations de clipping et de distribution fournies par
              {" "}{SITE.name}. Toute commande implique l&apos;acceptation pleine et entière de ces conditions.
            </p>
            <h2>Prestations</h2>
            <p>
              {SITE.name} propose l&apos;audit, le découpage, le montage et la distribution de contenu au format
              court, ainsi que le suivi des performances de campagne.
            </p>
            <h2>Modèle CPM &amp; objectif de vues</h2>
            <p>
              Les campagnes sont facturées selon un modèle CPM (coût pour 1000 vues). Le volume de vues
              objectif est défini et inscrit au contrat avant le lancement. Si l&apos;objectif contractuel n&apos;est
              pas atteint, la différence est remboursée selon les modalités prévues au contrat.
            </p>
            <h2>Commande &amp; paiement</h2>
            <ul>
              <li>Chaque campagne fait l&apos;objet d&apos;un devis et d&apos;un bon de commande.</li>
              <li>Les modalités de paiement sont précisées sur le devis.</li>
            </ul>
            <h2>Propriété &amp; image</h2>
            <p>
              Le client garde la pleine propriété de son contenu. {SITE.name} s&apos;engage à respecter l&apos;image et
              les exigences éditoriales définies ensemble.
            </p>
            <h2>Responsabilité</h2>
            <p>
              {SITE.name} met en œuvre tous les moyens pour atteindre les objectifs fixés. Les performances
              peuvent varier selon la qualité du contenu source et les conditions des plateformes.
            </p>
            <h2>Contact</h2>
            <p>Pour toute question : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
