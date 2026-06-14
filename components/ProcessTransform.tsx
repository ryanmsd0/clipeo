"use client";

import { PROCESS_STEPS } from "@/components/ProcessFlow";

/* Variante 9 — narratif « Avant → Après » : un bandeau de transformation
   (1 vidéo oubliée → omniprésence), puis les 3 étapes qui font le pont. */

const CSS = `
  .pxf-head{max-width:680px;margin:0 auto 40px;text-align:center}
  .pxf-head h2{font-family:var(--font-d);font-weight:800;font-size:clamp(2rem,4.4vw,3.2rem);line-height:1.05;letter-spacing:-.025em;color:var(--ink);margin-bottom:14px}
  .pxf-head p{font-size:1.05rem;color:var(--w55);line-height:1.6}
  .pxf-head b{color:var(--ink)}

  /* bandeau transformation */
  .pxf-band{display:grid;grid-template-columns:1fr 58px 1fr;gap:0;align-items:center;margin-bottom:18px}
  .pxf-side{border-radius:20px;padding:30px;min-height:172px;display:flex;flex-direction:column;justify-content:center;gap:14px}
  .pxf-before{background:linear-gradient(180deg,#eef1f6,#e3e8f1);border:1px solid var(--w08)}
  .pxf-after{color:#fff;background:radial-gradient(500px 240px at 80% -20%,rgba(96,158,255,.5),transparent 60%),linear-gradient(150deg,#0c3fd0,#08184c)}
  .pxf-lab{font-family:var(--font-m);font-size:.6rem;letter-spacing:2px;text-transform:uppercase;font-weight:700}
  .pxf-before .pxf-lab{color:var(--w40)} .pxf-after .pxf-lab{color:rgba(255,255,255,.6)}
  .pxf-side b{font-family:var(--font-d);font-weight:800;font-size:clamp(1.2rem,2.1vw,1.55rem);letter-spacing:-.02em;line-height:1.15}
  .pxf-before b{color:var(--ink)} .pxf-after b{color:#fff}
  .pxf-mini{display:flex;gap:6px}
  .pxf-mini .lone{width:26px;height:42px;border-radius:6px;background:linear-gradient(180deg,#c2ccdb,#aab6c9)}
  .pxf-mini .lone+span{align-self:center;font-size:.78rem;color:var(--w40)}
  .pxf-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:4px}
  .pxf-grid span{aspect-ratio:9/13;border-radius:3px;background:rgba(255,255,255,.14)}
  .pxf-grid span.on{background:#fff;box-shadow:0 0 8px rgba(255,255,255,.6)}
  .pxf-mid{display:flex;align-items:center;justify-content:center;color:var(--sky)}
  .pxf-mid svg{width:26px;height:26px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}

  /* les 3 étapes (le pont) */
  .pxf-bridge{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:34px}
  .pxf-step{border-top:2px solid rgba(10,99,255,.2);padding-top:18px}
  .pxf-step .n{font-family:var(--font-m);font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--royal);font-weight:700}
  .pxf-step h3{font-family:var(--font-d);font-weight:800;font-size:1.18rem;letter-spacing:-.02em;color:var(--ink);margin:8px 0 12px;line-height:1.1}
  .pxf-step ul{list-style:none;display:flex;flex-direction:column;gap:9px}
  .pxf-step li{position:relative;padding-left:18px;color:var(--w55);font-size:.88rem;line-height:1.5}
  .pxf-step li::before{content:"";position:absolute;left:0;top:.5em;width:6px;height:6px;border-radius:50%;background:var(--sky)}

  @media(max-width:820px){
    .pxf-band{grid-template-columns:1fr;gap:12px}
    .pxf-mid svg{transform:rotate(90deg)}
    .pxf-bridge{grid-template-columns:1fr;gap:0}
    .pxf-step{padding:22px 0;border-top:1px solid var(--w08)}
  }
`;

export default function ProcessTransform() {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="pxf-head reveal">
        <h2>D&apos;une vidéo oubliée<br />à l&apos;<span className="grad">omniprésence.</span></h2>
        <p>Le clipping transforme votre contenu long en présence permanente. Voici le pont, en <b>3 étapes</b>.</p>
      </div>

      <div className="pxf-band reveal">
        <div className="pxf-side pxf-before">
          <span className="pxf-lab">Avant</span>
          <div className="pxf-mini"><span className="lone" /><span>1 vidéo, vue une fois.</span></div>
          <b>Votre contenu travaille un jour, puis disparaît du fil.</b>
        </div>
        <div className="pxf-mid" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </div>
        <div className="pxf-side pxf-after">
          <span className="pxf-lab">Après</span>
          <div className="pxf-grid" aria-hidden="true">{Array.from({ length: 24 }, (_, k) => <span key={k} className={[1, 3, 4, 7, 9, 12, 14, 17, 19, 22].includes(k) ? "on" : ""} />)}</div>
          <b>Vous êtes partout, tout le temps, sur toutes les plateformes.</b>
        </div>
      </div>

      <div className="pxf-bridge reveal">
        {PROCESS_STEPS.map((s, i) => (
          <div className="pxf-step" key={i}>
            <span className="n">{s.tag}</span>
            <h3>{s.title}</h3>
            <ul>{s.bullets.map((b, bi) => <li key={bi}>{b}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}
