import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";

const COPY = {
  fr: {
    metaTitle: "Contact, réservez votre audit gratuit",
    metaDesc:
      "Parlons de votre prochaine campagne de clipping. Audit gratuit, projection de vues chiffrée et sans engagement. Réponse sous 24h.",
    h1a: "Audit gratuit.",
    h1b: "Projection chiffrée.",
    lead:
      "On audite votre contenu long, on identifie ce qui peut cartonner, et on vous projette un objectif de vues, avant tout engagement.",
    asideTitle: "Parlez-nous de votre projet",
    emailLabel: "Email",
    callLabel: "Appel découverte",
    callValue: "20 minutes, sans préparation.",
    commitLabel: "Notre engagement",
    commitValue: "Volume de vues garanti au contrat, remboursé si non atteint.",
    replyLabel: "Réponse",
    replyValue: "Sous 24h ouvrées.",
  },
  en: {
    metaTitle: "Contact, book your free audit",
    metaDesc:
      "Let's talk about your next clipping campaign. Free audit, a hard view projection, no commitment. Reply within 24h.",
    h1a: "Free audit.",
    h1b: "A view projection.",
    lead:
      "We audit your long-form content, pinpoint what can break out, and project a view target for you, before any commitment.",
    asideTitle: "Tell us about your project",
    emailLabel: "Email",
    callLabel: "Discovery call",
    callValue: "20 minutes, no prep needed.",
    commitLabel: "Our commitment",
    commitValue: "View volume guaranteed in the contract, refunded if we fall short.",
    replyLabel: "Reply",
    replyValue: "Within 24 business hours.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as keyof typeof COPY;
  const t = COPY[locale] ?? COPY.fr;
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage() {
  const locale = (await getLocale()) as keyof typeof COPY;
  const t = COPY[locale] ?? COPY.fr;

  return (
    <main>
      <section className="page-hero" style={{ paddingBottom: 30 }}>
        <div className="container">
          <h1>{t.h1a}<br /><span className="grad">{t.h1b}</span></h1>
          <p>{t.lead}</p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 10 }}>
        <div className="container">
          <div className="contact-grid">
            <div className="reveal">
              <ContactForm />
            </div>
            <aside className="contact-aside reveal">
              <h3>{t.asideTitle}</h3>
              <div className="line">
                <div>
                  <b>{t.emailLabel}</b>
                  <a href={`mailto:${SITE.email}`} style={{ color: "var(--sky-bright)" }}>{SITE.email}</a>
                </div>
              </div>
              <div className="line">
                <div>
                  <b>{t.callLabel}</b>
                  {t.callValue}
                </div>
              </div>
              <div className="line">
                <div>
                  <b>{t.commitLabel}</b>
                  {t.commitValue}
                </div>
              </div>
              <div className="line">
                <div>
                  <b>{t.replyLabel}</b>
                  {t.replyValue}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
