"use client";

import Link from "next/link";
import BackgroundRipple from "@/components/BackgroundRipple";

/* ------------------------------------------------------------------ *
 *  ClaimHero — affirmation de positionnement « n°1 en France ».
 *  Apparaît juste après l'animation cinématique (fond blanc) : ici, la
 *  page bascule dans le bleu de marque pour un « moment » premium, puis
 *  redevient claire avec la trust bar.
 *  Self-contained : styles injectés + classes `clh-*`. Reveal/stagger et
 *  compteurs (data-count) sont gérés globalement par <ScrollFX/>.
 *  Chiffres = données du deck (à faire valider par Clipeo).
 * ------------------------------------------------------------------ */

const STYLES = `
  .clh-sec{
    position:relative;overflow:hidden;isolation:isolate;
    /* hauteur = écran moins la trust bar -> elle vient se coller tout en bas */
    min-height:calc(100dvh - 130px);
    display:flex;flex-direction:column;justify-content:center;
    padding:92px 0 40px;color:var(--ink);
    /* dégradé : couleur de la hero (haut) -> blanc, le fond de la section suivante */
    background:
      radial-gradient(1000px 600px at 80% -12%, rgba(10,99,255,.12), transparent 60%),
      linear-gradient(180deg,#e7f0fd 0%,#eef4fe 38%,#ffffff 100%);
  }
  .clh-inner{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center;pointer-events:none}
  .clh-inner a{pointer-events:auto}

  .clh-title{
    font-family:var(--font-d);font-weight:800;letter-spacing:-.035em;line-height:1.02;
    font-size:clamp(2.5rem,6.6vw,5.4rem);margin-bottom:14px;color:var(--ink);
  }
  .clh-hl{
    background:linear-gradient(98deg,var(--sky-bright),var(--sky));
    -webkit-background-clip:text;background-clip:text;color:transparent;
    filter:drop-shadow(0 8px 22px rgba(10,99,255,.28));
  }
  .clh-sub{
    max-width:620px;margin-bottom:28px;
    font-size:clamp(1rem,1.4vw,1.18rem);line-height:1.62;color:var(--w55);
  }

  .clh-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;width:100%;max-width:880px;margin-bottom:28px}
  .clh-stat{
    border-radius:20px;padding:6px;
    background:rgba(255,255,255,.55);border:1px solid var(--w14);
    box-shadow:0 22px 50px -30px rgba(10,40,120,.35);
  }
  .clh-stat-in{
    border-radius:15px;padding:24px 14px 20px;
    background:#fff;
    box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 1px 2px rgba(10,22,40,.04);
    display:flex;flex-direction:column;gap:7px;align-items:center;
  }
  .clh-num{font-family:var(--font-d);font-weight:800;font-size:clamp(1.6rem,3vw,2.3rem);line-height:1;letter-spacing:-.02em;
    background:linear-gradient(180deg,var(--royal),var(--sky));-webkit-background-clip:text;background-clip:text;color:transparent}
  .clh-k{font-family:var(--font-m);font-size:.58rem;letter-spacing:1.6px;text-transform:uppercase;color:var(--w40)}

  .clh-cta{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
  .clh-btn{
    display:inline-flex;align-items:center;gap:10px;padding:14px 12px 14px 26px;border-radius:50px;
    font-family:var(--font-d);font-weight:700;font-size:.95rem;
    transition:transform .4s cubic-bezier(.32,.72,0,1),box-shadow .4s,background .4s;
  }
  .clh-btn-primary{color:#fff;background:linear-gradient(180deg,var(--sky) 0%,var(--sky-bright) 100%);
    box-shadow:0 14px 32px -10px rgba(0,85,254,.55),inset 0 1px 1px rgba(255,255,255,.35)}
  .clh-btn-primary:hover{transform:translateY(-2px);box-shadow:0 20px 42px -10px rgba(0,85,254,.65),inset 0 1px 1px rgba(255,255,255,.35)}
  .clh-btn-arrow{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.2)}
  .clh-btn-arrow svg{width:15px;height:15px;stroke:#fff;fill:none;stroke-width:2.4;transition:transform .4s cubic-bezier(.32,.72,0,1)}
  .clh-btn-primary:hover .clh-btn-arrow svg{transform:translate(2px,-2px)}
  .clh-btn-ghost{
    padding:14px 26px;color:var(--ink);background:rgba(255,255,255,.6);border:1px solid var(--w14);
  }
  .clh-btn-ghost:hover{transform:translateY(-2px);background:#fff;border-color:var(--w22)}

  @media(max-width:680px){
    .clh-stats{grid-template-columns:repeat(2,1fr)}
    .clh-cta{width:100%}
    .clh-btn{justify-content:center;flex:1 1 100%}
  }
`;

export default function ClaimHero() {
  return (
    <section className="clh-sec" aria-labelledby="clh-title">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <BackgroundRipple />

      <div className="container clh-inner">
        <h2 id="clh-title" className="clh-title reveal">
          L&apos;agence de clipping<br />
          <span className="clh-hl">n°1 en France.</span>
        </h2>
        <p className="clh-sub reveal">
          On transforme le contenu long des plus gros créateurs et marques en omniprésence sur le format
          court. Volume de vues garanti au contrat, ou remboursé.
        </p>

        <div className="clh-stats stagger">
          <div className="clh-stat"><div className="clh-stat-in"><span className="clh-num" data-count="500" data-prefix="+" data-suffix=" M">+0 M</span><span className="clh-k">vues générées</span></div></div>
          <div className="clh-stat"><div className="clh-stat-in"><span className="clh-num" data-count="5.1" data-dec="1" data-prefix="+" data-suffix=" K">+0 K</span><span className="clh-k">clips produits</span></div></div>
          <div className="clh-stat"><div className="clh-stat-in"><span className="clh-num" data-count="20" data-prefix="+">+0</span><span className="clh-k">clients accompagnés</span></div></div>
          <div className="clh-stat"><div className="clh-stat-in"><span className="clh-num" data-count="50" data-prefix="+">+0</span><span className="clh-k">campagnes réalisées</span></div></div>
        </div>

        <div className="clh-cta reveal">
          <Link href="/contact" className="clh-btn clh-btn-primary">
            Réserver un audit
            <span className="clh-btn-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </Link>
          <Link href="/etudes-de-cas" className="clh-btn clh-btn-ghost">Voir les études de cas</Link>
        </div>
      </div>
    </section>
  );
}
