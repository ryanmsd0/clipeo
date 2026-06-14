"use client";

import { PROCESS_STEPS } from "@/components/ProcessFlow";

/* Variante 7 — split éditorial : colonne gauche fixe (sticky) avec une
   méthode nommée + mini-sommaire, colonne droite qui déroule les étapes.
   Registre « agence haut de gamme ». Reveal via <ScrollFX/> (.reveal).
   NB : « Méthode R.D.O » est un nom proposé (brouillon à valider). */

const METHOD = ["Repérer", "Démultiplier", "Diffuser"];

const CSS = `
  .psp{display:grid;grid-template-columns:.8fr 1.2fr;gap:60px;align-items:start}

  .psp-left{position:sticky;top:120px}
  .psp-kicker{font-family:var(--font-m);font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--royal);display:block;margin-bottom:16px}
  .psp-left h2{font-family:var(--font-d);font-weight:800;font-size:clamp(1.9rem,3.4vw,2.7rem);line-height:1.05;letter-spacing:-.025em;color:var(--ink);margin-bottom:16px}
  .psp-left p{font-size:1.02rem;color:var(--w55);line-height:1.6;margin-bottom:28px;max-width:380px}
  .psp-method{display:flex;flex-direction:column;gap:2px;border-left:2px solid var(--w08);padding-left:18px}
  .psp-method span{font-family:var(--font-m);font-size:.72rem;letter-spacing:2px;text-transform:uppercase;color:var(--w40);padding:6px 0}
  .psp-method span b{color:var(--sky);font-weight:700}

  .psp-right{display:flex;flex-direction:column}
  .psp-step{padding:34px 0;border-top:1px solid var(--w08);display:grid;grid-template-columns:78px 1fr;gap:24px}
  .psp-step:first-child{border-top:none;padding-top:0}
  .psp-num{font-family:var(--font-d);font-weight:800;font-size:clamp(2.6rem,4vw,3.4rem);line-height:.9;letter-spacing:-.04em;
    background:linear-gradient(160deg,var(--sky) 20%,rgba(10,99,255,.2));-webkit-background-clip:text;background-clip:text;color:transparent}
  .psp-tag{font-family:var(--font-m);font-size:.6rem;letter-spacing:2px;text-transform:uppercase;color:var(--royal);display:block;margin-bottom:8px}
  .psp-step h3{font-family:var(--font-d);font-weight:800;font-size:clamp(1.4rem,2.2vw,1.8rem);letter-spacing:-.02em;color:var(--ink);margin-bottom:14px;line-height:1.05}
  .psp-list{list-style:none;display:flex;flex-direction:column;gap:10px}
  .psp-list li{position:relative;padding-left:22px;color:var(--w55);font-size:.95rem;line-height:1.5}
  .psp-list li::before{content:"";position:absolute;left:0;top:.5em;width:8px;height:8px;border-radius:50%;background:var(--sky)}

  @media(max-width:880px){
    .psp{grid-template-columns:1fr;gap:36px}
    .psp-left{position:static}
    .psp-step{grid-template-columns:56px 1fr;gap:16px}
  }
`;

export default function ProcessSplit() {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="psp">
        <div className="psp-left reveal">
          <span className="psp-kicker">La méthode R.D.O</span>
          <h2>Comment votre marque devient <span className="grad">incontournable.</span></h2>
          <p>Votre contenu long travaille pour vous en 3 étapes. Campagne lancée en 1 à 2 jours, sans rien gérer.</p>
          <div className="psp-method">
            {METHOD.map((m, i) => (
              <span key={i}><b>{i + 1}.</b> {m}</span>
            ))}
          </div>
        </div>

        <div className="psp-right">
          {PROCESS_STEPS.map((s, i) => (
            <div className="psp-step reveal" key={i}>
              <span className="psp-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <span className="psp-tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <ul className="psp-list">
                  {s.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
