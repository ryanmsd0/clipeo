import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { SITE } from "@/lib/site";

const COPY = {
  fr: {
    metaTitle: "Conditions générales de vente",
    metaDescription: "Les conditions générales de vente des prestations de clipping et de distribution de Clipeo.",
    h1: "Conditions générales de vente",
    lastUpdate: "Dernière mise à jour : juin 2026.",
    intro: (
      <>
        Les présentes conditions régissent les prestations de clipping et de distribution fournies par
        {" "}{SITE.name}. Toute commande implique l&apos;acceptation pleine et entière de ces conditions.
      </>
    ),
    servicesTitle: "Prestations",
    servicesBody: (
      <>
        {SITE.name} propose l&apos;audit, le découpage, le montage et la distribution de contenu au format
        court, ainsi que le suivi des performances de campagne.
      </>
    ),
    cpmTitle: <>Modèle CPM &amp; objectif de vues</>,
    cpmBody: (
      <>
        Les campagnes sont facturées selon un modèle CPM (coût pour 1000 vues). Le volume de vues
        objectif est défini et inscrit au contrat avant le lancement. Si l&apos;objectif contractuel n&apos;est
        pas atteint, la différence est remboursée selon les modalités prévues au contrat.
      </>
    ),
    orderTitle: <>Commande &amp; paiement</>,
    orderItem1: <>Chaque campagne fait l&apos;objet d&apos;un devis et d&apos;un bon de commande.</>,
    orderItem2: "Les modalités de paiement sont précisées sur le devis.",
    propertyTitle: <>Propriété &amp; image</>,
    propertyBody: (
      <>
        Le client garde la pleine propriété de son contenu. {SITE.name} s&apos;engage à respecter l&apos;image et
        les exigences éditoriales définies ensemble.
      </>
    ),
    liabilityTitle: "Responsabilité",
    liabilityBody: (
      <>
        {SITE.name} met en œuvre tous les moyens pour atteindre les objectifs fixés. Les performances
        peuvent varier selon la qualité du contenu source et les conditions des plateformes.
      </>
    ),
    contactTitle: "Contact",
    contactPrefix: "Pour toute question : ",
  },
  en: {
    metaTitle: "Terms of Service",
    metaDescription: "The terms of service for Clipeo's short-form clipping and distribution services.",
    h1: "Terms of Service",
    lastUpdate: "Last updated: June 2026.",
    intro: (
      <>
        These terms govern the clipping and distribution services provided by
        {" "}{SITE.name}. Any order implies full and unconditional acceptance of these terms.
      </>
    ),
    servicesTitle: "Services",
    servicesBody: (
      <>
        {SITE.name} provides the audit, clipping, editing and distribution of short-form content, as
        well as campaign performance tracking.
      </>
    ),
    cpmTitle: <>CPM model &amp; view target</>,
    cpmBody: (
      <>
        Campaigns are billed on a CPM model (cost per 1,000 views). The target view volume is defined
        and set out in the contract before launch. If the contractual target is not reached, the
        difference is refunded in accordance with the terms set out in the contract.
      </>
    ),
    orderTitle: <>Orders &amp; payment</>,
    orderItem1: "Each campaign is covered by a quote and a purchase order.",
    orderItem2: "Payment terms are specified on the quote.",
    propertyTitle: <>Ownership &amp; image</>,
    propertyBody: (
      <>
        The client retains full ownership of their content. {SITE.name} undertakes to respect the
        brand image and the editorial requirements defined together.
      </>
    ),
    liabilityTitle: "Liability",
    liabilityBody: (
      <>
        {SITE.name} uses every means available to reach the agreed objectives. Performance may vary
        depending on the quality of the source content and platform conditions.
      </>
    ),
    contactTitle: "Contact",
    contactPrefix: "For any questions: ",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as keyof typeof COPY;
  const t = COPY[locale] ?? COPY.fr;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: "/cgv" },
  };
}

export default async function CgvPage() {
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
            <h2>{t.servicesTitle}</h2>
            <p>{t.servicesBody}</p>
            <h2>{t.cpmTitle}</h2>
            <p>{t.cpmBody}</p>
            <h2>{t.orderTitle}</h2>
            <ul>
              <li>{t.orderItem1}</li>
              <li>{t.orderItem2}</li>
            </ul>
            <h2>{t.propertyTitle}</h2>
            <p>{t.propertyBody}</p>
            <h2>{t.liabilityTitle}</h2>
            <p>{t.liabilityBody}</p>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactPrefix}<a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
