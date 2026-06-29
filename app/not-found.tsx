import "./globals.css";

/* 404 GLOBAL — rendu hors de tout layout [locale] (chemins sans locale valide,
   ex. fichiers inconnus). Doit fournir son propre <html>. Les 404 de navigation
   passent par app/[locale]/[...rest] → app/[locale]/not-found.tsx (avec nav/footer).
   Bilingue (pas de contexte de locale ici). */
export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: "linear-gradient(180deg,#eef3fc,#fff)", color: "#0a1240", fontFamily: "system-ui,-apple-system,Segoe UI,Roboto,sans-serif" }}>
        <main style={{ minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px" }}>
          <div style={{ maxWidth: 460 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- œil Clipeo, page autonome */}
            <img src="/img/logo-mark-navy.png" alt="Clipeo" width={48} height={48} style={{ marginBottom: 26 }} />
            <div style={{ fontSize: "5rem", fontWeight: 800, lineHeight: 1, letterSpacing: "-.04em", background: "linear-gradient(96deg,#080151,#55a4d1)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", marginBottom: 14 }}>
              404
            </div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0 0 10px", letterSpacing: "-.02em" }}>
              Page introuvable · Page not found
            </h1>
            <p style={{ margin: "0 0 28px", color: "rgba(10,18,64,.62)", lineHeight: 1.6 }}>
              Cette page n&apos;existe pas ou a été déplacée.<br />This page doesn&apos;t exist or has moved.
            </p>
            <a href="/" style={{ display: "inline-block", padding: "14px 28px", borderRadius: 50, fontWeight: 700, color: "#fff", textDecoration: "none", background: "linear-gradient(180deg,#55a4d1,#080151)", boxShadow: "0 14px 30px -10px rgba(8,1,81,.5)" }}>
              Retour à l&apos;accueil · Back home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
