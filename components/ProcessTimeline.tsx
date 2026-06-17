"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROCESS_STEPS } from "@/components/ProcessFlow";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Variante 2 — timeline verticale : une colonne qui se remplit en bleu au
   scroll, des nœuds numérotés qui s'allument, contenu à droite. Éditorial. */

const CSS = `
  .pt-head{max-width:680px;margin:0 0 12px;text-align:left}
  .pt-head h2{font-family:var(--font-d);font-weight:800;font-size:clamp(2rem,4.4vw,3.2rem);line-height:1.05;letter-spacing:-.025em;color:var(--ink);margin-bottom:14px}
  .pt-head p{font-size:1.05rem;color:var(--w55);line-height:1.6;max-width:560px}
  .pt-head b{color:var(--ink)}

  .pt-body{position:relative;margin-top:48px;padding-left:0}
  .pt-spine,.pt-fill{position:absolute;left:25px;top:24px;bottom:24px;width:3px;border-radius:3px}
  .pt-spine{background:var(--w08)}
  .pt-fill{background:linear-gradient(180deg,var(--sky-bright),var(--sky));transform:scaleY(0);transform-origin:top center;box-shadow:0 0 16px rgba(85,164,209,.4)}

  .pt-row{position:relative;padding:0 0 52px 84px}
  .pt-row:last-child{padding-bottom:0}
  .pt-node{position:absolute;left:25px;top:-2px;transform:translateX(-50%);width:50px;height:50px;border-radius:50%;z-index:2;
    display:flex;align-items:center;justify-content:center;background:#fff;border:2px solid var(--w14);
    font-family:var(--font-d);font-weight:800;font-size:1.05rem;color:var(--w40)}
  .pt-node.on{border-color:var(--sky);color:var(--sky);box-shadow:0 0 0 6px rgba(85,164,209,.1),0 10px 24px -8px rgba(85,164,209,.55)}

  .pt-tag{font-family:var(--font-m);font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--royal);margin-bottom:8px;display:block}
  .pt-row h3{font-family:var(--font-d);font-weight:800;font-size:clamp(1.5rem,2.6vw,2rem);letter-spacing:-.02em;color:var(--ink);margin-bottom:16px;line-height:1.05}
  .pt-list{list-style:none;display:flex;flex-direction:column;gap:11px;max-width:560px}
  .pt-list li{position:relative;padding-left:24px;color:var(--w55);font-size:.95rem;line-height:1.5}
  .pt-list li::before{content:"";position:absolute;left:0;top:.5em;width:8px;height:8px;border-radius:50%;background:var(--sky)}

  @media(max-width:680px){
    .pt-spine,.pt-fill{left:20px}
    .pt-row{padding-left:64px;padding-bottom:40px}
    .pt-node{left:20px;width:42px;height:42px;font-size:.92rem}
  }
`;

export default function ProcessTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".pt-content", { autoAlpha: 0, x: 20 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".pt-body", start: "top 72%", end: "bottom 75%", scrub: 0.6 },
        });
        tl.to(".pt-fill", { scaleY: 1, ease: "none", duration: 1 }, 0);
        [0.04, 0.4, 0.76].forEach((at, i) => {
          tl.to(`.pt-node-${i}`, { duration: 0.01, onComplete: () => document.querySelector(`.pt-node-${i}`)?.classList.add("on"), onReverseComplete: () => document.querySelector(`.pt-node-${i}`)?.classList.remove("on") }, at);
          tl.to(`.pt-content-${i}`, { autoAlpha: 1, x: 0, duration: 0.1, ease: "power2.out" }, at);
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="pt-head reveal">
        <h2>Comment votre marque<br />devient <span className="grad">incontournable.</span></h2>
        <p>Votre contenu long travaille pour vous en <b>3 étapes</b>. Campagne lancée en 1 à 2 jours.</p>
      </div>

      <div className="pt-body">
        <div className="pt-spine" aria-hidden="true" />
        <div className="pt-fill" aria-hidden="true" />
        {PROCESS_STEPS.map((s, i) => (
          <div className="pt-row" key={i}>
            <span className={`pt-node pt-node-${i}`}>{i + 1}</span>
            <div className={`pt-content pt-content-${i}`}>
              <span className="pt-tag">{s.tag}</span>
              <h3>{s.title}</h3>
              <ul className="pt-list">
                {s.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
