import "./globals.css";

/* 404 global (hors locale reconnue) — fournit son propre <html> car il est rendu
   en dehors du layout [locale]. Les 404 « in-app » utilisent app/[locale]/not-found.tsx. */
export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body>
        <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px" }}>
          <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>Page introuvable / Page not found</h1>
            <p style={{ marginBottom: "24px", opacity: 0.7 }}>
              Cette page n&apos;existe pas. / This page doesn&apos;t exist.
            </p>
            <a href="/" style={{ color: "#0a63ff", fontWeight: 700 }}>← Accueil / Home</a>
          </div>
        </main>
      </body>
    </html>
  );
}
