import type { Metadata } from "next";
import ProcessFlow from "@/components/ProcessFlow";
import ProcessTimeline from "@/components/ProcessTimeline";
import ProcessBold from "@/components/ProcessBold";
import ProcessBento from "@/components/ProcessBento";
import ProcessTabs from "@/components/ProcessTabs";
import ProcessDark from "@/components/ProcessDark";
import ProcessSplit from "@/components/ProcessSplit";
import ProcessArrows from "@/components/ProcessArrows";
import ProcessTransform from "@/components/ProcessTransform";
import ProcessStats from "@/components/ProcessStats";

const RULE = <div style={{ height: 1, background: "var(--w08)", maxWidth: 1180, margin: "0 auto" }} />;

export const metadata: Metadata = {
  title: "Clipeo · Process (test)",
  robots: { index: false, follow: false },
};

function VariantLabel({ n, name }: { n: number; name: string }) {
  return (
    <div className="container" style={{ padding: "0 24px", marginBottom: 8 }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-m)", fontSize: ".64rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--w40)" }}>
        <span style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--sky)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{n}</span>
        Variante {n} · {name}
      </span>
    </div>
  );
}

/* Route de test isolée — plusieurs designs de la section « méthode »
   à comparer. Rien de tout ça n'est encore sur la home. */
export default function ProcessTestPage() {
  return (
    <main>
      <section style={{ minHeight: "55vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-m)", fontSize: ".72rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--w40)" }}>
          3 designs de la section process — scrollez ↓
        </p>
      </section>

      <section className="sec">
        <VariantLabel n={1} name="Stepper horizontal + visuels" />
        <div className="container"><ProcessFlow /></div>
      </section>

      <div style={{ height: 1, background: "var(--w08)", maxWidth: 1180, margin: "0 auto" }} />

      <section className="sec">
        <VariantLabel n={2} name="Timeline verticale" />
        <div className="container"><ProcessTimeline /></div>
      </section>

      <div style={{ height: 1, background: "var(--w08)", maxWidth: 1180, margin: "0 auto" }} />

      <section className="sec">
        <VariantLabel n={3} name="Typographique" />
        <div className="container"><ProcessBold /></div>
      </section>

      <div style={{ height: 1, background: "var(--w08)", maxWidth: 1180, margin: "0 auto" }} />

      <section className="sec">
        <VariantLabel n={4} name="Bento asymétrique" />
        <div className="container"><ProcessBento /></div>
      </section>

      {RULE}

      <section className="sec">
        <VariantLabel n={5} name="Onglets interactifs" />
        <div className="container"><ProcessTabs /></div>
      </section>

      {RULE}

      <section className="sec">
        <VariantLabel n={6} name="Panneau sombre (glass)" />
        <div className="container"><ProcessDark /></div>
      </section>

      {RULE}

      <section className="sec">
        <VariantLabel n={7} name="Split sticky + méthode" />
        <div className="container"><ProcessSplit /></div>
      </section>

      {RULE}

      <section className="sec">
        <VariantLabel n={8} name="Flux à connecteurs" />
        <div className="container"><ProcessArrows /></div>
      </section>

      {RULE}

      <section className="sec">
        <VariantLabel n={9} name="Transformation Avant → Après" />
        <div className="container"><ProcessTransform /></div>
      </section>

      {RULE}

      <section className="sec">
        <VariantLabel n={10} name="Cartes orientées data" />
        <div className="container"><ProcessStats /></div>
      </section>

      <section style={{ minHeight: "40vh" }} />
    </main>
  );
}
