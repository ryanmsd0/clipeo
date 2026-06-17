"use client";

import { useState } from "react";
import { PROCESS_STEPS } from "@/components/ProcessFlow";

/* Variante 5 — onglets interactifs : liste d'étapes à gauche (survol/clic),
   détail animé à droite. App-like, le seul format interactif du lot. */

const CSS = `
  .ptb-head{max-width:680px;margin:0 auto 44px;text-align:center}
  .ptb-head h2{font-family:var(--font-d);font-weight:800;font-size:clamp(2rem,4.4vw,3.2rem);line-height:1.05;letter-spacing:-.025em;color:var(--ink);margin-bottom:14px}
  .ptb-head p{font-size:1.05rem;color:var(--w55);line-height:1.6}
  .ptb-head b{color:var(--ink)}

  .ptb-wrap{display:grid;grid-template-columns:.82fr 1.18fr;gap:24px;align-items:stretch}
  .ptb-tabs{display:flex;flex-direction:column;gap:12px}
  .ptb-tab{display:flex;align-items:center;gap:16px;text-align:left;width:100%;padding:20px 22px;border-radius:16px;cursor:pointer;
    background:var(--glass);border:1px solid var(--w08);transition:background .35s,border-color .35s,transform .35s cubic-bezier(.32,.72,0,1)}
  .ptb-tab:hover{transform:translateY(-2px)}
  .ptb-tab.on{background:linear-gradient(180deg,rgba(85,164,209,.1),rgba(85,164,209,.03));border-color:rgba(85,164,209,.3);box-shadow:0 14px 30px -18px rgba(85,164,209,.5)}
  .ptb-tab .n{flex:none;width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;
    font-family:var(--font-d);font-weight:800;font-size:1.05rem;background:#fff;border:1px solid var(--w14);color:var(--w40);transition:.35s}
  .ptb-tab.on .n{background:linear-gradient(180deg,var(--sky),var(--sky-bright));color:#fff;border-color:transparent}
  .ptb-tab .tt{font-family:var(--font-d);font-weight:700;font-size:1.02rem;color:var(--ink);line-height:1.15}
  .ptb-tab .tg{font-family:var(--font-m);font-size:.56rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--w40);display:block;margin-bottom:3px}

  .ptb-panel{position:relative;overflow:hidden;border-radius:22px;border:1px solid var(--w14);
    background:radial-gradient(700px 360px at 80% -20%,rgba(85,164,209,.1),transparent 60%),linear-gradient(180deg,#f7faff,#eef4fe);
    padding:40px 42px;display:flex;flex-direction:column;justify-content:center;min-height:320px}
  .ptb-panel-in{animation:ptbIn .5s cubic-bezier(.32,.72,0,1)}
  @keyframes ptbIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
  .ptb-big{position:absolute;top:18px;right:30px;font-family:var(--font-d);font-weight:800;font-size:7rem;line-height:1;letter-spacing:-.04em;color:rgba(85,164,209,.08);pointer-events:none}
  .ptb-panel .tg{font-family:var(--font-m);font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--royal);display:block;margin-bottom:10px}
  .ptb-panel h3{font-family:var(--font-d);font-weight:800;font-size:clamp(1.6rem,2.6vw,2.1rem);letter-spacing:-.02em;color:var(--ink);margin-bottom:20px;line-height:1.05}
  .ptb-list{list-style:none;display:flex;flex-direction:column;gap:13px;max-width:560px}
  .ptb-list li{position:relative;padding-left:26px;color:var(--w55);font-size:.97rem;line-height:1.5}
  .ptb-list li::before{content:"";position:absolute;left:0;top:.45em;width:14px;height:14px;border-radius:50%;background:rgba(85,164,209,.14);box-shadow:inset 0 0 0 3px #fff,0 0 0 1px rgba(85,164,209,.5)}

  @media(max-width:820px){.ptb-wrap{grid-template-columns:1fr}.ptb-tab .tt{font-size:.95rem}}
`;

export default function ProcessTabs() {
  const [active, setActive] = useState(0);
  const s = PROCESS_STEPS[active];
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="ptb-head reveal">
        <h2>Comment votre marque<br />devient <span className="grad">incontournable.</span></h2>
        <p>Votre contenu long travaille pour vous en <b>3 étapes</b>. Survolez chaque étape.</p>
      </div>

      <div className="ptb-wrap reveal">
        <div className="ptb-tabs">
          {PROCESS_STEPS.map((step, i) => (
            <button
              key={i}
              className={`ptb-tab${i === active ? " on" : ""}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
            >
              <span className="n">{i + 1}</span>
              <span>
                <span className="tg">{step.tag}</span>
                <span className="tt">{step.title}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="ptb-panel">
          <span className="ptb-big" aria-hidden="true">{String(active + 1).padStart(2, "0")}</span>
          <div className="ptb-panel-in" key={active}>
            <span className="tg">{s.tag}</span>
            <h3>{s.title}</h3>
            <ul className="ptb-list">
              {s.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
