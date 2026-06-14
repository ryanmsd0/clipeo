import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} · ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(1000px 600px at 50% -10%, #1b3aa0, transparent), linear-gradient(135deg, #0a1747, #050c2a)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(180deg,#2f6bf0,#2348c8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>clipeo</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
            <span>L&apos;agence de clipping pour&nbsp;</span>
            <span style={{ color: "#9bd0ff" }}>grands comptes</span>
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.7)", maxWidth: 820 }}>
            +500M de vues générées · modèle CPM garanti · audit gratuit
          </div>
        </div>

        <div style={{ display: "flex", gap: 36, fontSize: 24, color: "rgba(255,255,255,0.55)" }}>
          <span>TikTok</span>
          <span>YouTube Shorts</span>
          <span>Instagram Reels</span>
          <span>Twitch</span>
        </div>
      </div>
    ),
    size
  );
}
