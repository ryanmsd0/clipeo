"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 *  ProcessFlow — refonte de la section « méthode » : stepper horizontal
 *  premium. Rail de progression qui se remplit au scroll, nœuds qui
 *  s'allument, et un visuel sur-mesure (CSS/SVG, zéro photo) par étape
 *  qui illustre concrètement ce qui se passe :
 *    1. Repère   → timeline vidéo, le moment clé isolé
 *    2. Démultiplie → une vidéo qui éclate en dizaines de clips (1→N)
 *    3. Omniprésent → une grille de feeds saturée
 *  Copy orientée résultat (skill b2b-conversion-site).
 * ------------------------------------------------------------------ */

export const PROCESS_STEPS = [
  {
    tag: "Étape 01",
    title: "On repère vos pépites.",
    bullets: [
      "Dans vos vidéos longues, on isole les 30 secondes capables de faire des millions de vues.",
      "Un objectif de vues chiffré, fixé avec vous avant de lancer.",
      "Les angles qui parlent à votre audience, jamais du clip au hasard.",
    ],
  },
  {
    tag: "Étape 02",
    title: "On les démultiplie.",
    bullets: [
      "Un réseau de clippers transforme chaque vidéo en dizaines de clips taillés pour percer.",
      "Hook, rythme, sous-titres : calibrés aux codes de chaque plateforme.",
      "Vous validez la ligne, on gère le volume. Votre image reste sous contrôle.",
    ],
  },
  {
    tag: "Étape 03",
    title: "On vous rend omniprésent.",
    bullets: [
      "Vos clips tournent en continu sur des dizaines de comptes : TikTok, Reels, Shorts, Twitch.",
      "Chaque vue est suivie, par clip et par plateforme. Aucune dépense à l'aveugle.",
      "En fin de campagne, un rapport clair : ce qui a cartonné, et où on scale ensuite.",
    ],
  },
];

const FEED_LIT = new Set([1, 3, 4, 7, 9, 10, 13, 16]); // cellules « allumées » de la grille omniprésence

const CSS = `
  .pf{position:relative}
  .pf-head{max-width:680px;margin:0 auto 8px;text-align:center}
  .pf-head h2{font-family:var(--font-d);font-weight:800;font-size:clamp(2.1rem,4.6vw,3.4rem);line-height:1.05;letter-spacing:-.025em;color:var(--ink);margin-bottom:16px}
  .pf-head p{font-size:1.05rem;color:var(--w55);line-height:1.6}
  .pf-head b{color:var(--ink)}

  /* Rail de progression */
  .pf-rail{position:relative;height:56px;margin:60px 0 4px}
  .pf-rail-track,.pf-fill{position:absolute;top:27px;left:16.66%;right:16.66%;height:3px;border-radius:3px}
  .pf-rail-track{background:var(--w08)}
  .pf-fill{right:auto;width:66.68%;background:linear-gradient(90deg,var(--sky-bright),var(--sky));transform:scaleX(0);transform-origin:left center;box-shadow:0 0 18px rgba(10,99,255,.4)}
  .pf-node{position:absolute;top:14px;width:30px;height:30px;border-radius:50%;transform:translateX(-50%);
    display:flex;align-items:center;justify-content:center;background:#fff;border:2px solid var(--w14);
    font-family:var(--font-m);font-size:.66rem;font-weight:700;color:var(--w40);z-index:2;transition:none}
  .pf-node-0{left:16.66%} .pf-node-1{left:50%} .pf-node-2{left:83.33%}
  .pf-node.on{border-color:var(--sky);color:var(--sky);box-shadow:0 0 0 5px rgba(10,99,255,.1),0 8px 20px -6px rgba(10,99,255,.5)}

  .pf-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;align-items:start}
  .pf-step{display:flex;flex-direction:column}

  /* Carte visuelle (motif) */
  .pf-motif{position:relative;height:150px;border-radius:18px;overflow:hidden;margin-bottom:24px;
    background:linear-gradient(180deg,#f4f8ff,#eaf1fd);border:1px solid var(--w08);
    box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 18px 40px -28px rgba(10,40,120,.3)}
  .pf-motif::after{content:"";position:absolute;inset:0;pointer-events:none;
    background-image:radial-gradient(rgba(10,99,255,.08) 1px,transparent 1px);background-size:16px 16px;opacity:.6}

  /* Motif 1 — timeline vidéo, segment clé isolé */
  .pf-m1{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:0 26px}
  .pf-tl{position:relative;width:100%;height:14px;border-radius:8px;z-index:1;
    background:repeating-linear-gradient(90deg,var(--w14) 0 1px,transparent 1px 13px),var(--w05)}
  .pf-tl-seg{position:absolute;top:-3px;bottom:-3px;left:54%;width:20%;border-radius:7px;
    background:linear-gradient(180deg,var(--sky),var(--sky-bright));box-shadow:0 0 18px rgba(10,99,255,.55),0 6px 14px -4px rgba(10,99,255,.6)}
  .pf-tl-lab{position:relative;z-index:1;font-family:var(--font-m);font-size:.6rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--royal);font-weight:700}

  /* Motif 2 — 1 vidéo -> grille de clips */
  .pf-m2{display:flex;align-items:center;gap:18px;padding:0 26px}
  .pf-src{flex:none;width:42px;height:74px;border-radius:9px;background:linear-gradient(180deg,#0b2a8c,#0a1640);
    box-shadow:0 8px 20px -8px rgba(10,40,120,.6),inset 0 0 0 1px rgba(255,255,255,.12);position:relative;z-index:2}
  .pf-src::after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
    border-style:solid;border-width:5px 0 5px 8px;border-color:transparent transparent transparent #fff}
  .pf-fan{flex:none;width:34px;height:74px}
  .pf-clips{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;flex:1;z-index:1}
  .pf-clips span{height:32px;border-radius:5px;background:linear-gradient(180deg,#dbe6f8,#c4d6f3);box-shadow:inset 0 0 0 1px rgba(10,99,255,.12)}
  .pf-clips span:nth-child(3n){background:linear-gradient(180deg,rgba(10,99,255,.5),rgba(10,99,255,.28))}

  /* Motif 3 — grille de feeds, omniprésence */
  .pf-m3{display:flex;align-items:center;justify-content:center;padding:0 22px}
  .pf-feeds{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;width:100%}
  .pf-feeds span{aspect-ratio:9/14;border-radius:4px;background:var(--w08)}
  .pf-feeds span.on{background:linear-gradient(180deg,var(--sky),var(--sky-bright));box-shadow:0 4px 10px -3px rgba(10,99,255,.6)}

  .pf-tag{font-family:var(--font-m);font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--royal);margin-bottom:10px}
  .pf-step h3{font-family:var(--font-d);font-weight:800;font-size:clamp(1.3rem,2vw,1.6rem);letter-spacing:-.02em;color:var(--ink);margin-bottom:16px;line-height:1.1}
  .pf-list{list-style:none;display:flex;flex-direction:column;gap:11px}
  .pf-list li{position:relative;padding-left:24px;color:var(--w55);font-size:.92rem;line-height:1.5}
  .pf-list li::before{content:"";position:absolute;left:0;top:.45em;width:13px;height:13px;border-radius:50%;
    background:rgba(10,99,255,.12);box-shadow:inset 0 0 0 3px #fff,0 0 0 1px rgba(10,99,255,.4)}

  @media(max-width:760px){
    .pf-rail{display:none}
    .pf-steps{grid-template-columns:1fr;gap:0}
    .pf-step{padding:26px 0;border-top:1px solid var(--w08)}
    .pf-step:first-child{border-top:none}
    .pf-motif{height:130px}
  }
`;

export default function ProcessFlow() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 761px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(".pf-step", { autoAlpha: 0, y: 28 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".pf-steps", start: "top 72%", end: "bottom 78%", scrub: 0.6 },
        });
        tl.to(".pf-fill", { scaleX: 1, ease: "none", duration: 1 }, 0);
        [0.05, 0.42, 0.78].forEach((at, i) => {
          tl.to(`.pf-node-${i}`, { duration: 0.01, onComplete: () => document.querySelector(`.pf-node-${i}`)?.classList.add("on"), onReverseComplete: () => document.querySelector(`.pf-node-${i}`)?.classList.remove("on") }, at);
          tl.to(`.pf-step-${i}`, { autoAlpha: 1, y: 0, duration: 0.1, ease: "power2.out" }, at);
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="pf">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="pf-head reveal">
        <h2>Comment votre marque<br />devient <span className="grad">incontournable.</span></h2>
        <p>Votre contenu long travaille pour vous en <b>3 étapes</b>. Campagne lancée en 1 à 2 jours, vous ne levez pas le petit doigt.</p>
      </div>

      <div className="pf-rail" aria-hidden="true">
        <div className="pf-rail-track" />
        <div className="pf-fill" />
        <span className="pf-node pf-node-0">01</span>
        <span className="pf-node pf-node-1">02</span>
        <span className="pf-node pf-node-2">03</span>
      </div>

      <div className="pf-steps">
        {PROCESS_STEPS.map((s, i) => (
          <div className={`pf-step pf-step-${i}`} key={i}>
            {/* Visuel sur-mesure par étape */}
            {i === 0 && (
              <div className="pf-motif pf-m1" aria-hidden="true">
                <div className="pf-tl"><span className="pf-tl-seg" /></div>
                <span className="pf-tl-lab">0:30 · le moment clé</span>
              </div>
            )}
            {i === 1 && (
              <div className="pf-motif pf-m2" aria-hidden="true">
                <span className="pf-src" />
                <svg className="pf-fan" viewBox="0 0 34 74" fill="none" preserveAspectRatio="none">
                  <path d="M0 37 H34" stroke="rgba(10,99,255,.4)" strokeWidth="1.4" />
                  <path d="M0 37 C16 37 18 8 34 8" stroke="rgba(10,99,255,.3)" strokeWidth="1.4" />
                  <path d="M0 37 C16 37 18 66 34 66" stroke="rgba(10,99,255,.3)" strokeWidth="1.4" />
                </svg>
                <div className="pf-clips">{Array.from({ length: 8 }, (_, k) => <span key={k} />)}</div>
              </div>
            )}
            {i === 2 && (
              <div className="pf-motif pf-m3" aria-hidden="true">
                <div className="pf-feeds">{Array.from({ length: 18 }, (_, k) => <span key={k} className={FEED_LIT.has(k) ? "on" : ""} />)}</div>
              </div>
            )}

            <span className="pf-tag">{s.tag}</span>
            <h3>{s.title}</h3>
            <ul className="pf-list">
              {s.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
