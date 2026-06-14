"use client";

import { PROCESS_STEPS } from "@/components/ProcessFlow";

/* Variante 6 — panneau sombre premium : section bleu nuit, 3 cartes en
   verre. Contraste fort vs le reste (clair), registre « tech haut de gamme ».
   Reveal via <ScrollFX/> (.stagger). */

const CSS = `
  .pdk{position:relative;overflow:hidden;border-radius:30px;color:#fff;padding:clamp(40px,5vw,64px);
    background:radial-gradient(900px 500px at 85% -15%,rgba(96,158,255,.45),transparent 60%),
      radial-gradient(700px 600px at 0% 120%,rgba(8,30,120,.55),transparent 55%),
      linear-gradient(160deg,#0c3fd0,#0a2a9e 46%,#08184c);
    box-shadow:0 44px 100px -46px rgba(8,24,76,.6)}
  .pdk::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.5;
    background-image:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px);
    background-size:54px 54px;-webkit-mask-image:radial-gradient(ellipse 95% 90% at 60% 20%,#000,transparent 82%);mask-image:radial-gradient(ellipse 95% 90% at 60% 20%,#000,transparent 82%)}
  .pdk>*{position:relative;z-index:1}

  .pdk-head{max-width:680px;margin-bottom:40px}
  .pdk-head h2{font-family:var(--font-d);font-weight:800;font-size:clamp(1.9rem,3.6vw,2.9rem);line-height:1.05;letter-spacing:-.025em;margin-bottom:14px;color:#fff}
  .pdk-head .hl{background:linear-gradient(98deg,#c7e4ff,#fff 55%,#a9caff);-webkit-background-clip:text;background-clip:text;color:transparent}
  .pdk-head p{color:rgba(255,255,255,.78);font-size:1.05rem;line-height:1.6}
  .pdk-head b{color:#fff}

  .pdk-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .pdk-card{border-radius:20px;padding:28px 26px 26px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);
    -webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:inset 0 1px 0 rgba(255,255,255,.14);
    transition:transform .5s cubic-bezier(.32,.72,0,1),background .4s,border-color .4s}
  .pdk-card:hover{transform:translateY(-5px);background:rgba(255,255,255,.1);border-color:rgba(134,210,255,.4)}
  .pdk-n{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:13px;margin-bottom:18px;
    font-family:var(--font-d);font-weight:800;font-size:1.1rem;color:#fff;
    background:rgba(134,210,255,.16);box-shadow:inset 0 0 0 1px rgba(134,210,255,.4)}
  .pdk-tag{font-family:var(--font-m);font-size:.6rem;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.55);display:block;margin-bottom:8px}
  .pdk-card h3{font-family:var(--font-d);font-weight:800;font-size:1.3rem;letter-spacing:-.02em;margin-bottom:16px;line-height:1.1;color:#fff}
  .pdk-list{list-style:none;display:flex;flex-direction:column;gap:11px}
  .pdk-list li{position:relative;padding-left:22px;color:rgba(255,255,255,.82);font-size:.92rem;line-height:1.5}
  .pdk-list li::before{content:"";position:absolute;left:0;top:.5em;width:7px;height:7px;border-radius:50%;background:#86d2ff;box-shadow:0 0 8px rgba(134,210,255,.8)}

  @media(max-width:820px){.pdk-grid{grid-template-columns:1fr}}
`;

export default function ProcessDark() {
  return (
    <div className="pdk reveal">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="pdk-head">
        <h2>Comment votre marque devient <span className="hl">incontournable.</span></h2>
        <p>Votre contenu long travaille pour vous en <b>3 étapes</b>. Campagne lancée en 1 à 2 jours.</p>
      </div>

      <div className="pdk-grid stagger">
        {PROCESS_STEPS.map((s, i) => (
          <div className="pdk-card" key={i}>
            <span className="pdk-n">{i + 1}</span>
            <span className="pdk-tag">{s.tag}</span>
            <h3>{s.title}</h3>
            <ul className="pdk-list">
              {s.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
