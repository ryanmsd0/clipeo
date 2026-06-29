"use client";

import "./globals.css";

/* GLOBAL ERROR — dernier filet : catch les erreurs du layout racine lui-même.
   Doit fournir son propre <html>/<body>. Rare ; bilingue, auto-suffisant. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: "linear-gradient(180deg,#eef3fc,#fff)", color: "#0a1240", fontFamily: "system-ui,-apple-system,Segoe UI,Roboto,sans-serif" }}>
        <main style={{ minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px" }}>
          <div style={{ maxWidth: 460 }}>
            {/* Logo complet (œil + clipeo), centré */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- œil Clipeo, page autonome */}
              <img src="/img/logo-mark-navy.png" alt="Clipeo" width={33} height={34} />
              <span style={{ fontFamily: "system-ui,-apple-system,Segoe UI,Roboto,sans-serif", fontWeight: 800, fontSize: "1.7rem", letterSpacing: "-.5px", color: "#0a1240" }}>clipeo</span>
            </div>
            <div style={{ fontSize: "3.4rem", fontWeight: 800, lineHeight: 1, letterSpacing: "-.03em", background: "linear-gradient(96deg,#080151,#55a4d1)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", marginBottom: 16 }}>
              Oups.
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "0 0 10px", letterSpacing: "-.02em" }}>
              Une erreur est survenue · Something went wrong
            </h1>
            <p style={{ margin: "0 0 28px", color: "rgba(10,18,64,.62)", lineHeight: 1.6 }}>
              Réessayez dans un instant.<br />Please try again in a moment.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{ cursor: "pointer", border: 0, padding: "14px 28px", borderRadius: 50, fontWeight: 700, color: "#fff", background: "linear-gradient(180deg,#55a4d1,#080151)", boxShadow: "0 14px 30px -10px rgba(8,1,81,.5)", fontSize: "1rem" }}
            >
              Réessayer · Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
