import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment Clipeo collecte, utilise et protège vos données personnelles, conformément au RGPD.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: true, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <main>
      <section className="page-hero" style={{ paddingBottom: 30 }}>
        <div className="container">
          <h1>Politique de confidentialité</h1>
          <p>Dernière mise à jour : juin 2026.</p>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 10 }}>
        <div className="container">
          <div className="prose reveal">
            <p>
              La présente politique décrit comment {SITE.name} traite les données personnelles collectées via
              ce site. Elle s&apos;applique dans le cadre du Règlement Général sur la Protection des Données (RGPD).
            </p>
            <h2>Données collectées</h2>
            <p>Nous collectons uniquement les données que vous nous transmettez volontairement :</p>
            <ul>
              <li>Les informations du formulaire de contact (nom, email, entreprise, message).</li>
              <li>Les données de navigation anonymisées à des fins de mesure d&apos;audience.</li>
            </ul>
            <h2>Utilisation des données</h2>
            <ul>
              <li>Répondre à vos demandes et préparer votre audit.</li>
              <li>Améliorer le site et nos services.</li>
            </ul>
            <p>Nous ne vendons ni ne louons vos données à des tiers.</p>
            <h2>Conservation</h2>
            <p>Vos données de contact sont conservées le temps nécessaire au traitement de votre demande, puis archivées ou supprimées.</p>
            <h2>Vos droits</h2>
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition. Pour
              l&apos;exercer, écrivez-nous à <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
            <h2>Cookies</h2>
            <p>Le site peut utiliser des cookies de mesure d&apos;audience. Vous pouvez les désactiver via les réglages de votre navigateur.</p>
            <h2>Contact</h2>
            <p>Pour toute question relative à vos données : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
