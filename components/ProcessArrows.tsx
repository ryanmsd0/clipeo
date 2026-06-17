"use client";

import { PROCESS_STEPS } from "@/components/ProcessFlow";

/* Variante 8 — flux à connecteurs : 3 cartes reliées par des flèches,
   l'accent est mis sur l'enchaînement 1 → 2 → 3. */

const CSS = `
  .par-head{max-width:680px;margin:0 auto 44px;text-align:center}
  .par-head h2{font-family:var(--font-d);font-weight:800;font-size:clamp(2rem,4.4vw,3.2rem);line-height:1.05;letter-spacing:-.025em;color:var(--ink);margin-bottom:14px}
  .par-head p{font-size:1.05rem;color:var(--w55);line-height:1.6}
  .par-head b{color:var(--ink)}

  .par-flow{display:flex;align-items:stretch;gap:0}
  .par-card{flex:1;position:relative;border-radius:20px;border:1px solid var(--w14);background:#fff;padding:28px 26px;
    box-shadow:0 18px 44px -30px rgba(8,1,81,.3);transition:transform .5s cubic-bezier(.32,.72,0,1),border-color .4s,box-shadow .4s}
  .par-card::before{content:"";position:absolute;top:0;left:26px;right:26px;height:3px;border-radius:3px;background:linear-gradient(90deg,var(--sky-bright),var(--sky))}
  .par-card:hover{transform:translateY(-6px);border-color:rgba(85,164,209,.28);box-shadow:0 28px 56px -28px rgba(85,164,209,.45)}
  .par-n{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:13px;margin:6px 0 16px;
    font-family:var(--font-d);font-weight:800;font-size:1.05rem;color:#fff;background:linear-gradient(180deg,var(--sky),var(--sky-bright));box-shadow:0 10px 22px -8px rgba(85,164,209,.6)}
  .par-tag{font-family:var(--font-m);font-size:.6rem;letter-spacing:2px;text-transform:uppercase;color:var(--royal);display:block;margin-bottom:8px}
  .par-card h3{font-family:var(--font-d);font-weight:800;font-size:1.25rem;letter-spacing:-.02em;color:var(--ink);margin-bottom:14px;line-height:1.1}
  .par-list{list-style:none;display:flex;flex-direction:column;gap:10px}
  .par-list li{position:relative;padding-left:20px;color:var(--w55);font-size:.9rem;line-height:1.5}
  .par-list li::before{content:"";position:absolute;left:0;top:.5em;width:7px;height:7px;border-radius:50%;background:var(--sky)}

  .par-arrow{flex:none;width:58px;display:flex;align-items:center;justify-content:center;color:var(--sky)}
  .par-arrow svg{width:26px;height:26px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;animation:parNudge 1.8s ease-in-out infinite}
  @keyframes parNudge{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}

  @media(max-width:820px){
    .par-flow{flex-direction:column}
    .par-arrow{width:100%;height:48px}
    .par-arrow svg{transform:rotate(90deg);animation:parNudgeV 1.8s ease-in-out infinite}
    @keyframes parNudgeV{0%,100%{transform:rotate(90deg) translateX(0)}50%{transform:rotate(90deg) translateX(5px)}}
  }
  @media(prefers-reduced-motion:reduce){.par-arrow svg{animation:none}}
`;

export default function ProcessArrows() {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="par-head reveal">
        <h2>Comment votre marque<br />devient <span className="grad">incontournable.</span></h2>
        <p>Votre contenu long travaille pour vous en <b>3 étapes</b> qui s'enchaînent.</p>
      </div>

      <div className="par-flow reveal">
        {PROCESS_STEPS.map((s, i) => (
          <span key={i} style={{ display: "contents" }}>
            <div className="par-card">
              <span className="par-n">{i + 1}</span>
              <span className="par-tag">{s.tag}</span>
              <h3>{s.title}</h3>
              <ul className="par-list">{s.bullets.map((b, bi) => <li key={bi}>{b}</li>)}</ul>
            </div>
            {i < PROCESS_STEPS.length - 1 && (
              <div className="par-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </div>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
