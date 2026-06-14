"use client";

import { PROCESS_STEPS } from "@/components/ProcessFlow";

/* Variante 4 — bento asymétrique : cartes de tailles variées, l'étape
   centrale (démultiplication) mise en avant, + une tuile résultat bleue.
   Reveal géré globalement par <ScrollFX/> (.stagger). */

const CSS = `
  .pbn-head{max-width:680px;margin:0 auto 44px;text-align:center}
  .pbn-head h2{font-family:var(--font-d);font-weight:800;font-size:clamp(2rem,4.4vw,3.2rem);line-height:1.05;letter-spacing:-.025em;color:var(--ink);margin-bottom:14px}
  .pbn-head p{font-size:1.05rem;color:var(--w55);line-height:1.6}
  .pbn-head b{color:var(--ink)}

  .pbn-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:16px}
  .pbn-card{position:relative;overflow:hidden;border-radius:22px;border:1px solid var(--w14);background:#fff;
    padding:30px 30px 28px;box-shadow:0 18px 44px -30px rgba(10,40,120,.3);transition:transform .5s cubic-bezier(.32,.72,0,1),border-color .4s,box-shadow .4s}
  .pbn-card:hover{transform:translateY(-5px);border-color:rgba(10,99,255,.28);box-shadow:0 26px 54px -28px rgba(10,99,255,.4)}
  .pbn-c0{grid-column:span 2} .pbn-c1{grid-column:span 4} .pbn-c2{grid-column:span 4}
  .pbn-num{position:absolute;top:14px;right:22px;font-family:var(--font-d);font-weight:800;font-size:4.2rem;line-height:1;
    letter-spacing:-.04em;color:rgba(10,99,255,.08);pointer-events:none}
  .pbn-tag{font-family:var(--font-m);font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--royal);display:block;margin-bottom:10px}
  .pbn-card h3{font-family:var(--font-d);font-weight:800;font-size:clamp(1.3rem,1.9vw,1.55rem);letter-spacing:-.02em;color:var(--ink);margin-bottom:14px;line-height:1.08;max-width:90%}
  .pbn-list{list-style:none;display:flex;flex-direction:column;gap:10px}
  .pbn-list li{position:relative;padding-left:22px;color:var(--w55);font-size:.92rem;line-height:1.5}
  .pbn-list li::before{content:"";position:absolute;left:0;top:.45em;width:13px;height:13px;border-radius:50%;
    background:rgba(10,99,255,.12);box-shadow:inset 0 0 0 3px #fff,0 0 0 1px rgba(10,99,255,.4)}

  /* carte centrale : motif démultiplication 1 -> N en bandeau */
  .pbn-feat{display:flex;flex-direction:column}
  .pbn-mini{display:flex;align-items:center;gap:14px;margin:2px 0 18px}
  .pbn-mini-src{flex:none;width:30px;height:50px;border-radius:7px;background:linear-gradient(180deg,#0b2a8c,#0a1640);position:relative;box-shadow:0 6px 14px -6px rgba(10,40,120,.6)}
  .pbn-mini-src::after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border-style:solid;border-width:4px 0 4px 6px;border-color:transparent transparent transparent #fff}
  .pbn-mini-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:5px;flex:1}
  .pbn-mini-grid span{height:23px;border-radius:4px;background:linear-gradient(180deg,#dbe6f8,#c4d6f3)}
  .pbn-mini-grid span:nth-child(2n){background:linear-gradient(180deg,rgba(10,99,255,.5),rgba(10,99,255,.26))}

  /* carte étape 3 : mini grille d'omniprésence en bandeau */
  .pbn-feeds{display:grid;grid-template-columns:repeat(10,1fr);gap:4px;margin:2px 0 18px}
  .pbn-feeds span{aspect-ratio:9/13;border-radius:3px;background:var(--w08)}
  .pbn-feeds span.on{background:linear-gradient(180deg,var(--sky),var(--sky-bright))}

  /* tuile résultat bleue */
  .pbn-tile{grid-column:span 2;border-radius:22px;padding:30px;display:flex;flex-direction:column;justify-content:center;color:#fff;
    background:radial-gradient(600px 300px at 80% -20%,rgba(96,158,255,.5),transparent 60%),linear-gradient(160deg,#0c3fd0,#08184c);
    box-shadow:0 26px 60px -34px rgba(8,24,76,.6)}
  .pbn-tile .v{font-family:var(--font-d);font-weight:800;font-size:clamp(2.4rem,4vw,3.2rem);line-height:1;letter-spacing:-.03em}
  .pbn-tile .k{font-family:var(--font-m);font-size:.66rem;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.7);margin-top:10px;line-height:1.5}

  @media(max-width:860px){
    .pbn-grid{grid-template-columns:1fr}
    .pbn-c0,.pbn-c1,.pbn-c2,.pbn-tile{grid-column:auto}
  }
`;

export default function ProcessBento() {
  const s0 = PROCESS_STEPS[0], s1 = PROCESS_STEPS[1], s2 = PROCESS_STEPS[2];
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="pbn-head reveal">
        <h2>Comment votre marque<br />devient <span className="grad">incontournable.</span></h2>
        <p>Votre contenu long travaille pour vous en <b>3 étapes</b>. Campagne lancée en 1 à 2 jours.</p>
      </div>

      <div className="pbn-grid stagger">
        {/* Étape 1 — carte compacte */}
        <div className="pbn-card pbn-c0">
          <span className="pbn-num" aria-hidden="true">01</span>
          <span className="pbn-tag">{s0.tag}</span>
          <h3>{s0.title}</h3>
          <ul className="pbn-list">{s0.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
        </div>

        {/* Étape 2 — carte mise en avant + motif 1->N */}
        <div className="pbn-card pbn-c1 pbn-feat">
          <span className="pbn-num" aria-hidden="true">02</span>
          <span className="pbn-tag">{s1.tag}</span>
          <h3>{s1.title}</h3>
          <div className="pbn-mini" aria-hidden="true">
            <span className="pbn-mini-src" />
            <div className="pbn-mini-grid">{Array.from({ length: 12 }, (_, k) => <span key={k} />)}</div>
          </div>
          <ul className="pbn-list">{s1.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
        </div>

        {/* Étape 3 — large + mini grille omniprésence */}
        <div className="pbn-card pbn-c2">
          <span className="pbn-num" aria-hidden="true">03</span>
          <span className="pbn-tag">{s2.tag}</span>
          <h3>{s2.title}</h3>
          <div className="pbn-feeds" aria-hidden="true">
            {Array.from({ length: 30 }, (_, k) => <span key={k} className={[2, 5, 6, 9, 12, 14, 17, 21, 23, 26, 28].includes(k) ? "on" : ""} />)}
          </div>
          <ul className="pbn-list">{s2.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
        </div>

        {/* Tuile résultat */}
        <div className="pbn-tile">
          <div className="v">1–2 j</div>
          <div className="k">avant le lancement<br />de votre campagne</div>
        </div>
      </div>
    </div>
  );
}
