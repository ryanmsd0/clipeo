"use client";

import { PROCESS_STEPS } from "@/components/ProcessFlow";

/* Variante 3 — typographique : gros numéros fantômes, lignes pleine largeur
   alternées, zéro fioriture. Minimaliste, éditorial, haut de gamme.
   Reveal géré globalement par <ScrollFX/> (.reveal). */

const CSS = `
  .pbo-head{max-width:680px;margin:0 auto 12px;text-align:center}
  .pbo-head h2{font-family:var(--font-d);font-weight:800;font-size:clamp(2rem,4.4vw,3.2rem);line-height:1.05;letter-spacing:-.025em;color:var(--ink);margin-bottom:14px}
  .pbo-head p{font-size:1.05rem;color:var(--w55);line-height:1.6}
  .pbo-head b{color:var(--ink)}

  .pbo-rows{margin-top:40px}
  .pbo-row{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:40px;align-items:center;
    padding:48px 0;border-top:1px solid var(--w08)}
  .pbo-row:last-child{border-bottom:1px solid var(--w08)}
  .pbo-num{font-family:var(--font-d);font-weight:800;line-height:.8;letter-spacing:-.04em;
    font-size:clamp(5rem,13vw,11rem);background:linear-gradient(160deg,var(--sky) 10%,rgba(10,99,255,.18));
    -webkit-background-clip:text;background-clip:text;color:transparent}
  .pbo-tag{font-family:var(--font-m);font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--royal);display:block;margin-bottom:10px}
  .pbo-row h3{font-family:var(--font-d);font-weight:800;font-size:clamp(1.6rem,2.8vw,2.3rem);letter-spacing:-.025em;color:var(--ink);margin-bottom:16px;line-height:1.04}
  .pbo-list{list-style:none;display:flex;flex-direction:column;gap:11px}
  .pbo-list li{position:relative;padding-left:22px;color:var(--w55);font-size:.95rem;line-height:1.5}
  .pbo-list li::before{content:"";position:absolute;left:0;top:.5em;width:8px;height:8px;border-radius:2px;background:var(--sky);transform:rotate(45deg)}

  /* alternance : sur les lignes paires (2e), le numéro passe à droite */
  .pbo-row.alt{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)}
  .pbo-row.alt .pbo-num{order:2;text-align:right}
  .pbo-row.alt .pbo-body{order:1}

  @media(max-width:760px){
    .pbo-row,.pbo-row.alt{grid-template-columns:1fr;gap:14px;padding:36px 0}
    .pbo-row.alt .pbo-num{order:0;text-align:left}
    .pbo-row.alt .pbo-body{order:0}
    .pbo-num{font-size:clamp(4rem,22vw,6rem)}
  }
`;

export default function ProcessBold() {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="pbo-head reveal">
        <h2>Comment votre marque<br />devient <span className="grad">incontournable.</span></h2>
        <p>Votre contenu long travaille pour vous en <b>3 étapes</b>. Campagne lancée en 1 à 2 jours.</p>
      </div>

      <div className="pbo-rows">
        {PROCESS_STEPS.map((s, i) => (
          <div className={`pbo-row reveal${i % 2 === 1 ? " alt" : ""}`} key={i}>
            <div className="pbo-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
            <div className="pbo-body">
              <span className="pbo-tag">{s.tag}</span>
              <h3>{s.title}</h3>
              <ul className="pbo-list">
                {s.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
