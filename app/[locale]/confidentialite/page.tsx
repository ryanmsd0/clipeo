import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { SITE } from "@/lib/site";

const COPY = {
  fr: {
    metaTitle: "Politique de confidentialité",
    metaDescription: "Comment Clipeo collecte, utilise et protège vos données personnelles, conformément au RGPD.",
    h1: "Politique de confidentialité",
    lastUpdate: "Dernière mise à jour : juin 2026.",
    intro: (
      <>
        La présente politique décrit comment {SITE.name} traite les données personnelles collectées via
        ce site. Elle s&apos;applique dans le cadre du Règlement Général sur la Protection des Données (RGPD).
      </>
    ),
    collectedTitle: "Données collectées",
    collectedIntro: "Nous collectons uniquement les données que vous nous transmettez volontairement :",
    collectedItem1: "Les informations du formulaire de contact (nom, email, entreprise, message).",
    collectedItem2: "Les données de navigation anonymisées à des fins de mesure d'audience.",
    useTitle: "Utilisation des données",
    useItem1: "Répondre à vos demandes et préparer votre audit.",
    useItem2: "Améliorer le site et nos services.",
    useNote: "Nous ne vendons ni ne louons vos données à des tiers.",
    retentionTitle: "Conservation",
    retentionBody: "Vos données de contact sont conservées le temps nécessaire au traitement de votre demande, puis archivées ou supprimées.",
    rightsTitle: "Vos droits",
    rightsPrefix: (
      <>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition. Pour
        l&apos;exercer, écrivez-nous à{" "}
      </>
    ),
    cookiesTitle: "Cookies",
    cookiesBody: "Le site peut utiliser des cookies de mesure d'audience. Vous pouvez les désactiver via les réglages de votre navigateur.",
    contactTitle: "Contact",
    contactPrefix: "Pour toute question relative à vos données : ",
  },
  en: {
    metaTitle: "Privacy Policy",
    metaDescription: "How Clipeo collects, uses and protects your personal data, in accordance with the GDPR.",
    h1: "Privacy Policy",
    lastUpdate: "Last updated: June 2026.",
    intro: (
      <>
        This policy describes how {SITE.name} processes the personal data collected through this site.
        It applies within the framework of the General Data Protection Regulation (GDPR).
      </>
    ),
    collectedTitle: "Data we collect",
    collectedIntro: "We only collect the data you provide to us voluntarily:",
    collectedItem1: "The information from the contact form (name, email, company, message).",
    collectedItem2: "Anonymized browsing data for audience measurement purposes.",
    useTitle: "How we use the data",
    useItem1: "Respond to your requests and prepare your audit.",
    useItem2: "Improve the site and our services.",
    useNote: "We do not sell or rent your data to third parties.",
    retentionTitle: "Retention",
    retentionBody: "Your contact data is kept for as long as necessary to handle your request, then archived or deleted.",
    rightsTitle: "Your rights",
    rightsPrefix: (
      <>
        You have the right to access, rectify, erase and object to the processing of your data. To
        exercise these rights, write to us at{" "}
      </>
    ),
    cookiesTitle: "Cookies",
    cookiesBody: "The site may use audience-measurement cookies. You can disable them through your browser settings.",
    contactTitle: "Contact",
    contactPrefix: "For any question regarding your data: ",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as keyof typeof COPY;
  const t = COPY[locale] ?? COPY.fr;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: "/confidentialite" },
    robots: { index: true, follow: true },
  };
}

export default async function ConfidentialitePage() {
  const locale = (await getLocale()) as keyof typeof COPY;
  const t = COPY[locale] ?? COPY.fr;

  return (
    <main>
      <section className="page-hero" style={{ paddingBottom: 30 }}>
        <div className="container">
          <h1>{t.h1}</h1>
          <p>{t.lastUpdate}</p>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 10 }}>
        <div className="container">
          <div className="prose reveal">
            <p>{t.intro}</p>
            <h2>{t.collectedTitle}</h2>
            <p>{t.collectedIntro}</p>
            <ul>
              <li>{t.collectedItem1}</li>
              <li>{t.collectedItem2}</li>
            </ul>
            <h2>{t.useTitle}</h2>
            <ul>
              <li>{t.useItem1}</li>
              <li>{t.useItem2}</li>
            </ul>
            <p>{t.useNote}</p>
            <h2>{t.retentionTitle}</h2>
            <p>{t.retentionBody}</p>
            <h2>{t.rightsTitle}</h2>
            <p>
              {t.rightsPrefix}<a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
            <h2>{t.cookiesTitle}</h2>
            <p>{t.cookiesBody}</p>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactPrefix}<a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
