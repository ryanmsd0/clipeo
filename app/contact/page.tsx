import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact, réservez votre audit gratuit",
  description:
    "Parlons de votre prochaine campagne de clipping. Audit gratuit, projection de vues chiffrée et sans engagement. Réponse sous 24h.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero" style={{ paddingBottom: 30 }}>
        <div className="container">
          <h1>Audit gratuit.<br /><span className="grad">Projection chiffrée.</span></h1>
          <p>
            On audite votre contenu long, on identifie ce qui peut cartonner, et on vous projette un objectif
            de vues, avant tout engagement.
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 10 }}>
        <div className="container">
          <div className="contact-grid">
            <div className="reveal">
              <ContactForm />
            </div>
            <aside className="contact-aside reveal">
              <h3>Parlez-nous de votre projet</h3>
              <div className="line">
                <div>
                  <b>Email</b>
                  <a href={`mailto:${SITE.email}`} style={{ color: "var(--sky-bright)" }}>{SITE.email}</a>
                </div>
              </div>
              <div className="line">
                <div>
                  <b>Appel découverte</b>
                  20 minutes, sans préparation.
                </div>
              </div>
              <div className="line">
                <div>
                  <b>Notre engagement</b>
                  Volume de vues garanti au contrat, remboursé si non atteint.
                </div>
              </div>
              <div className="line">
                <div>
                  <b>Réponse</b>
                  Sous 24h ouvrées.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
