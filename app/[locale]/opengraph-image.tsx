import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";
import { LOGO_WHITE_B64, FONT_400_B64, FONT_700_B64, FONT_800_B64 } from "@/lib/og-assets";

export const alt = `${SITE.name} · clipping agency · book a free audit`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Assets inlinés en base64 (lib/og-assets) : aucune lecture fs, donc fiable sur
   Vercel serverless (process.cwd non tracé, new URL(import.meta.url) non lisible). */
const b64 = (s: string) => Buffer.from(s, "base64");

const COPY = {
  fr: {
    badge: "Agence de clipping",
    line1: "Votre contenu long,",
    line2: "des millions de vues.",
    proof: "+620 M de vues générées · CPM garanti au contrat · audit gratuit",
    cta: "Réserver un audit gratuit",
  },
  en: {
    badge: "Clipping agency",
    line1: "Your long-form content,",
    line2: "millions of views.",
    proof: "620M+ views generated · guaranteed CPM · free audit",
    cta: "Book a free audit",
  },
} as const;

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = COPY[(locale === "en" ? "en" : "fr") as keyof typeof COPY];

  const logoSrc = `data:image/png;base64,${LOGO_WHITE_B64}`;
  const domain = SITE.url.replace(/^https?:\/\/(www\.)?/, "");

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "66px 72px",
          background:
            "radial-gradient(900px 520px at 82% -12%, rgba(96,158,255,0.4), transparent 60%), linear-gradient(140deg, #0c2b86 0%, #0a1b5c 46%, #060f33 100%)",
          color: "#fff",
          fontFamily: "Montserrat",
        }}
      >
        {/* Filigrane logo (le C-œil) en bas à droite, comme le CTA */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={440} height={452} alt="" style={{ position: "absolute", right: -96, bottom: -132, opacity: 0.12 }} />

        {/* En-tête : logo (icône + wordmark) + badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={46} height={47} alt="" />
            <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: -1.5 }}>clipeo</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "11px 22px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              fontSize: 23,
              fontWeight: 600,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            {t.badge}
          </div>
        </div>

        {/* Accroche + preuve */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 78, fontWeight: 800, lineHeight: 1.03, letterSpacing: -2.5 }}>
            <div style={{ display: "flex" }}>{t.line1}</div>
            <div style={{ display: "flex", color: "#9bd0ff" }}>{t.line2}</div>
          </div>
          <div style={{ display: "flex", fontSize: 29, fontWeight: 400, color: "rgba(255,255,255,0.74)" }}>
            {t.proof}
          </div>
        </div>

        {/* CTA + domaine */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 18px 16px 30px",
              borderRadius: 100,
              background: "#fff",
              color: "#0a1b5c",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {t.cta}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 100,
                background: "rgba(10,99,255,0.14)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0055fe" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 25, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>{domain}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: b64(FONT_400_B64), weight: 400, style: "normal" },
        { name: "Montserrat", data: b64(FONT_700_B64), weight: 700, style: "normal" },
        { name: "Montserrat", data: b64(FONT_800_B64), weight: 800, style: "normal" },
      ],
    },
  );
}
