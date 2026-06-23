import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import CtaPanel from "@/components/CtaPanel";
import ScrollParallax from "@/components/ScrollParallax";
import { Check, ArrowR } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Tarifs · le modèle CPM, un prix qui suit vos vues",
  description:
    "Chez Clipeo, vous payez les vues, pas l'effort. Modèle CPM (coût pour 1000 vues), volume garanti au contrat, ou remboursé. Voici ce qui fait varier le prix et comment on chiffre votre campagne.",
  alternates: { canonical: "/tarifs" },
};

const STYLES = `
  .tr-hero{position:relative;overflow:hidden;padding:160px 0 60px;text-align:center;isolation:isolate}
  .tr-orb{position:absolute;border-radius:50%;filter:blur(64px);opacity:.5;z-index:-1;pointer-events:none}
  .tr-orb.a{width:540px;height:540px;top:-180px;left:-140px;background:radial-gradient(circle,rgba(10,99,255,.26),transparent 70%)}
  .tr-orb.b{width:440px;height:440px;top:-60px;right:-120px;background:radial-gradient(circle,rgba(10,99,255,.16),transparent 70%)}
  .tr-eyebrow{display:inline-flex;align-items:center;gap:9px;padding:8px 16px;border-radius:50px;background:var(--glass);border:1px solid var(--w14);
    font-family:var(--font-m);font-size:.64rem;letter-spacing:2px;text-transform:uppercase;color:var(--w55);margin-bottom:24px}
  .tr-eyebrow b{color:var(--sky-bright);font-weight:700}
  .tr-hero h1{font-family:var(--font-d);font-weight:800;font-size:clamp(2.4rem,6vw,4.4rem);line-height:1.04;letter-spacing:-.03em;margin-bottom:20px}
  .tr-hero .sub{font-size:clamp(1.05rem,1.7vw,1.25rem);color:var(--w70);max-width:600px;margin:0 auto 30px;line-height:1.6}

  /* Formule CPM */
  .tr-formula{display:flex;align-items:stretch;justify-content:center;gap:14px;flex-wrap:wrap;max-width:920px;margin:44px auto 0}
  .tr-fcard{flex:1 1 220px;background:linear-gradient(180deg,var(--glass-2),var(--glass));border:1px solid var(--w14);border-radius:20px;padding:26px 24px;text-align:center}
  .tr-fcard .lab{font-family:var(--font-m);font-size:.58rem;letter-spacing:2px;text-transform:uppercase;color:var(--sky);display:block;margin-bottom:12px}
  .tr-fcard .big{font-family:var(--font-d);font-weight:800;font-size:clamp(1.4rem,2.6vw,1.9rem);letter-spacing:-.02em;color:var(--ink);line-height:1.1}
  .tr-fcard .sm{color:var(--w55);font-size:.85rem;margin-top:6px;line-height:1.45}
  .tr-op{display:flex;align-items:center;justify-content:center;font-family:var(--font-d);font-weight:800;font-size:1.6rem;color:var(--w22)}

  /* Facteurs */
  .tr-factors{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
  .tr-factor{display:flex;gap:18px;background:linear-gradient(180deg,var(--glass-2),var(--glass));border:1px solid var(--w14);border-radius:20px;padding:28px}
  .tr-factor .n{font-family:var(--font-d);font-weight:800;font-size:1.8rem;line-height:1;letter-spacing:-.03em;
    background:linear-gradient(160deg,var(--sky) 20%,rgba(10,99,255,.25));-webkit-background-clip:text;background-clip:text;color:transparent;flex:none}
  .tr-factor h3{font-family:var(--font-d);font-weight:800;font-size:1.15rem;color:var(--ink);margin-bottom:8px;letter-spacing:-.01em}
  .tr-factor p{color:var(--w55);font-size:.94rem;line-height:1.6}

  /* Scoping 3 étapes */
  .tr-scope{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .tr-sc{background:#fff;border:1px solid var(--w08);border-radius:20px;padding:30px;box-shadow:0 18px 40px -30px rgba(10,40,120,.35)}
  .tr-sc .s{font-family:var(--font-m);font-size:.6rem;letter-spacing:2px;text-transform:uppercase;color:var(--sky);display:block;margin-bottom:14px}
  .tr-sc h3{font-family:var(--font-d);font-weight:800;font-size:1.2rem;color:var(--ink);margin-bottom:10px;letter-spacing:-.015em}
  .tr-sc p{color:var(--w55);font-size:.94rem;line-height:1.6}

  /* Garantie */
  .tr-guarantee{max-width:900px;margin:0 auto;text-align:center;border-radius:26px;padding:clamp(34px,5vw,56px);color:#fff;
    background:radial-gradient(640px 380px at 50% -25%,rgba(96,158,255,.4),transparent 60%),linear-gradient(165deg,#0b2a8c,var(--ink))}
  .tr-guarantee .mono-label{display:block;margin-bottom:18px;color:#9bd0ff}
  .tr-guarantee h2{font-family:var(--font-d);font-weight:800;font-size:clamp(1.9rem,4vw,2.9rem);line-height:1.05;letter-spacing:-.03em;margin-bottom:14px;color:#fff}
  .tr-guarantee p{max-width:560px;margin:0 auto;color:rgba(255,255,255,.82);font-size:1.05rem;line-height:1.6}

  /* FAQ */
  .tr-faq{max-width:820px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
  .tr-q{background:linear-gradient(180deg,var(--glass-2),var(--glass));border:1px solid var(--w14);border-radius:16px;padding:24px 26px}
  .tr-q h3{font-family:var(--font-d);font-weight:800;font-size:1.08rem;color:var(--ink);margin-bottom:8px;letter-spacing:-.01em}
  .tr-q p{color:var(--w55);font-size:.95rem;line-height:1.6}

  @media(max-width:820px){.tr-factors,.tr-scope{grid-template-columns:1fr}.tr-op{transform:rotate(90deg)}}
`;

const FACTORS = [
  { n: "01", t: "L'objectif de vues", d: "Le levier principal. Plus le volume garanti est élevé, plus la campagne mobilise de clippers et de comptes." },
  { n: "02", t: "Les plateformes visées", d: "TikTok, Reels, Shorts : chaque réseau a ses codes et son coût de distribution propre." },
  { n: "03", t: "La cadence & la durée", d: "Lancement ponctuel autour d'une sortie, ou présence continue dans la durée : le rythme change le périmètre." },
  { n: "04", t: "Le volume de contenu source", d: "Plus vous avez de contenu long à exploiter, plus on en tire de clips, et meilleur est le coût par vue." },
];

const SCOPE = [
  { s: "Étape 1", t: "On audite votre contenu", d: "On analyse votre contenu long, vos plateformes et votre audience pour estimer le potentiel viral réel." },
  { s: "Étape 2", t: "On fixe l'objectif", d: "On définit ensemble un volume de vues cible et les angles à fort taux de conversion." },
  { s: "Étape 3", t: "On chiffre la campagne", d: "Vous recevez un budget clair, basé sur le CPM et l'objectif. Volume garanti, inscrit au contrat." },
];

const FAQ = [
  { q: "Pourquoi pas de forfaits affichés ?", a: "Parce qu'un prix au clip ne veut rien dire : 10 clips qui ne sont pas vus n'ont aucune valeur. On facture des vues réelles, pas des livrables. Le prix se cale sur votre objectif." },
  { q: "C'est quoi le modèle CPM ?", a: "Un coût pour 1 000 vues. Vous achetez un volume de vues garanti au contrat. Si l'objectif n'est pas atteint, on rembourse la différence." },
  { q: "Quel budget pour démarrer ?", a: "Ça dépend de l'objectif et du périmètre. Le plus simple : un audit gratuit, et on vous projette un volume de vues chiffré avant tout engagement." },
  { q: "Les vues sont-elles vérifiées ?", a: "Oui. On track par contenu et par plateforme, et vous recevez un reporting détaillé en fin de campagne." },
];

export default function TarifsPage() {
  return (
    <ScrollParallax>
      <main>
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />

        {/* HERO */}
        <section className="tr-hero">
          <div className="tr-orb a" data-parallax="0.3" />
          <div className="tr-orb b" data-parallax="0.18" />
          <div className="container">
            <span className="tr-eyebrow">Modèle CPM · <b>volume garanti ou remboursé</b></span>
            <h1>Un prix qui suit vos vues.<br /><span className="grad">Pas vos efforts.</span></h1>
            <p className="sub">
              Pas de forfait au clip, pas de facture pour du vent. Vous achetez un volume de vues réel,
              garanti au contrat. Voici comment on le chiffre.
            </p>
            <div className="tr-formula" data-parallax="0.08">
              <div className="tr-fcard"><span className="lab">Vous achetez</span><div className="big">Des vues</div><div className="sm">Coût pour 1 000 vues (CPM)</div></div>
              <div className="tr-op">×</div>
              <div className="tr-fcard"><span className="lab">À hauteur de</span><div className="big">Votre objectif</div><div className="sm">Volume garanti au contrat</div></div>
              <div className="tr-op">=</div>
              <div className="tr-fcard"><span className="lab">Vous obtenez</span><div className="big grad">L&apos;omniprésence</div><div className="sm">Ou remboursé, sinon</div></div>
            </div>
          </div>
        </section>

        {/* FACTEURS */}
        <section className="sec" style={{ paddingTop: 20 }}>
          <div className="container">
            <div className="sec-head reveal">
              <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>Ce qui fait le prix</span>
              <h2>Quatre leviers,<br />zéro surprise.</h2>
            </div>
            <div className="tr-factors stagger">
              {FACTORS.map((f) => (
                <div className="tr-factor" key={f.n}>
                  <span className="n">{f.n}</span>
                  <div><h3>{f.t}</h3><p>{f.d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SCOPING */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head reveal">
              <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>Comment on chiffre</span>
              <h2>Votre devis en<br /><span className="grad">trois étapes.</span></h2>
            </div>
            <div className="tr-scope stagger">
              {SCOPE.map((s) => (
                <div className="tr-sc" key={s.s}>
                  <span className="s">{s.s}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GARANTIE */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="tr-guarantee reveal">
              <span className="mono-label">Notre engagement</span>
              <h2>L&apos;objectif est atteint,<br />ou on rembourse.</h2>
              <p>
                Le volume de vues est inscrit au contrat. Ce n&apos;est pas une estimation marketing, c&apos;est
                un engagement chiffré. Le risque est de notre côté, pas du vôtre.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head reveal">
              <h2>Questions de prix,<br />réponses claires.</h2>
            </div>
            <div className="tr-faq stagger">
              {FAQ.map((f) => (
                <div className="tr-q" key={f.q}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", marginTop: 22, fontSize: ".82rem", color: "var(--w40)", fontFamily: "var(--font-m)" }}>
              Modèle &amp; chiffres — brouillons à valider avec Clipeo.
            </p>
          </div>
        </section>

        <CtaPanel
          eyebrow="Audit gratuit · projection chiffrée"
          title="Recevez votre projection de vues."
          text="20 minutes pour estimer le potentiel de votre contenu et vous projeter un objectif de vues chiffré, avant tout engagement."
        />
      </main>
    </ScrollParallax>
  );
}
