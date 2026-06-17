"use client";

import { PROCESS_STEPS } from "@/components/ProcessFlow";

/* Variante 10 — cartes orientées data : chaque étape s'ouvre sur un gros
   marqueur chiffré/symbolique. Registre « dashboard / data-forward ».
   Marqueurs symboliques (non fabriqués). */

const METRIC = [
  { v: "0:30", k: "le moment qui peut exploser" },
  { v: "1 → N", k: "une vidéo, des dizaines de clips" },
  { v: "24/7", k: "en continu, sur 4 plateformes" },
];

const CSS = `
  .pst-head{max-width:680px;margin:0 auto 44px;text-align:center}
  .pst-head h2{font-family:var(--font-d);font-weight:800;font-size:clamp(2rem,4.4vw,3.2rem);line-height:1.05;letter-spacing:-.025em;color:var(--ink);margin-bottom:14px}
  .pst-head p{font-size:1.05rem;color:var(--w55);line-height:1.6}
  .pst-head b{color:var(--ink)}

  .pst-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .pst-card{position:relative;overflow:hidden;border-radius:22px;border:1px solid var(--w14);background:#fff;padding:30px;
    box-shadow:0 18px 44px -30px rgba(10,40,120,.3);transition:transform .5s cubic-bezier(.32,.72,0,1),border-color .4s,box-shadow .4s}
  .pst-card:hover{transform:translateY(-5px);border-color:rgba(10,99,255,.28);box-shadow:0 26px 54px -28px rgba(10,99,255,.4)}
  .pst-top{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding-bottom:18px;margin-bottom:18px;border-bottom:1px solid var(--w08)}
  .pst-v{font-family:var(--font-d);font-weight:800;font-size:clamp(2.4rem,4vw,3.2rem);line-height:.9;letter-spacing:-.03em;
    background:linear-gradient(180deg,var(--royal),var(--sky));-webkit-background-clip:text;background-clip:text;color:transparent}
  .pst-ix{font-family:var(--font-m);font-size:.66rem;font-weight:700;letter-spacing:2px;color:var(--w40)}
  .pst-k{font-family:var(--font-m);font-size:.58rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--w40);margin-top:7px;line-height:1.4}
  .pst-tag{font-family:var(--font-m);font-size:.6rem;letter-spacing:2px;text-transform:uppercase;color:var(--royal);display:block;margin-bottom:8px}
  .pst-card h3{font-family:var(--font-d);font-weight:800;font-size:1.25rem;letter-spacing:-.02em;color:var(--ink);margin-bottom:14px;line-height:1.1}
  .pst-list{list-style:none;display:flex;flex-direction:column;gap:10px}
  .pst-list li{position:relative;padding-left:20px;color:var(--w55);font-size:.9rem;line-height:1.5}
  .pst-list li::before{content:"";position:absolute;left:0;top:.5em;width:7px;height:7px;border-radius:50%;background:var(--sky)}

  @media(max-width:820px){.pst-grid{grid-template-columns:1fr}}
`;

export default function ProcessStats() {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="pst-head reveal">
        <h2>Comment votre marque<br />devient <span className="grad">incontournable.</span></h2>
        <p>Votre contenu long travaille pour vous en <b>3 étapes</b>. Campagne lancée en 1 à 2 jours.</p>
      </div>

      <div className="pst-grid stagger">
        {PROCESS_STEPS.map((s, i) => (
          <div className="pst-card" key={i}>
            <div className="pst-top">
              <span>
                <span className="pst-v">{METRIC[i].v}</span>
                <span className="pst-k">{METRIC[i].k}</span>
              </span>
              <span className="pst-ix">0{i + 1}</span>
            </div>
            <span className="pst-tag">{s.tag}</span>
            <h3>{s.title}</h3>
            <ul className="pst-list">{s.bullets.map((b, bi) => <li key={bi}>{b}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}
