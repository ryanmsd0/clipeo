"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

/* Page d'erreur runtime (500) — catch les erreurs des pages sous [locale].
   Rendue dans le layout [locale] → garde nav + footer. Bilingue. */

const COPY = {
  fr: {
    label: "Erreur",
    h1a: "Une erreur",
    h1grad: "est survenue.",
    body: "Quelque chose s'est mal passé de notre côté. Réessayez, ou revenez à l'accueil.",
    retry: "Réessayer",
    home: "Retour à l'accueil",
  },
  en: {
    label: "Error",
    h1a: "Something",
    h1grad: "went wrong.",
    body: "Something broke on our end. Try again, or head back home.",
    retry: "Try again",
    home: "Back to home",
  },
} as const;

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const locale = useLocale() as keyof typeof COPY;
  const t = COPY[locale] ?? COPY.fr;

  useEffect(() => {
    // Visible en console pour le debug (et capté par un éventuel reporter d'erreurs)
    console.error(error);
  }, [error]);

  return (
    <main>
      <section className="page-hero" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div className="container">
          <span className="mono-label" style={{ display: "block", marginBottom: 18 }}>{t.label}</span>
          <h1>{t.h1a}<br /><span className="grad">{t.h1grad}</span></h1>
          <p>{t.body}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 30 }}>
            <button type="button" onClick={reset} className="btn btn-primary"><span>{t.retry}</span></button>
            <Link href="/" className="btn"><span>{t.home}</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
