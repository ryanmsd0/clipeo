"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ *
 *  BackgroundRipple — adaptation vanilla (sans Tailwind) du
 *  « Background Ripple Effect » d'Aceternity, pour fond de hero / CTA.
 *  Grille interactive : survol = case qui s'allume, clic = onde qui se
 *  propage depuis la case cliquée. Thème clair, accent bleu de marque.
 *  Self-contained : styles injectés, classes `brx-*`.
 * ------------------------------------------------------------------ */

const STYLES = `
  .brx{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;
    -webkit-mask-image:radial-gradient(ellipse 78% 72% at 50% 40%,#000 0%,transparent 80%);
    mask-image:radial-gradient(ellipse 78% 72% at 50% 40%,#000 0%,transparent 80%);}
  .brx-grid{display:grid;width:100%;height:100%}
  .brx-cell{
    border-right:1px solid rgba(85,164,209,.07);
    border-bottom:1px solid rgba(85,164,209,.07);
    background:transparent;pointer-events:auto;
    transition:background .18s ease;
  }
  .brx-cell:hover{background:rgba(85,164,209,.16)}
  .brx-cell.brx-on{animation:brxRipple .62s ease-out}
  @keyframes brxRipple{
    0%{background:transparent}
    26%{background:rgba(85,164,209,.24)}
    100%{background:transparent}
  }
`;

type Cell = { r: number; c: number };

export default function BackgroundRipple({ rows = 9, cols = 28 }: { rows?: number; cols?: number }) {
  const [clicked, setClicked] = useState<Cell | null>(null);
  const [burst, setBurst] = useState(0);
  const total = rows * cols;

  return (
    <div className="brx" aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        className="brx-grid"
        style={{ gridTemplateColumns: `repeat(${cols},1fr)`, gridTemplateRows: `repeat(${rows},1fr)` }}
      >
        {Array.from({ length: total }, (_, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;
          const dist = clicked ? Math.hypot(clicked.r - r, clicked.c - c) : 0;
          return (
            <div
              // la clé inclut le n° de burst : changer la clé relance l'animation depuis 0
              key={`${burst}-${i}`}
              className={`brx-cell${clicked ? " brx-on" : ""}`}
              style={clicked ? { animationDelay: `${dist * 0.045}s` } : undefined}
              onClick={() => {
                setClicked({ r, c });
                setBurst((b) => b + 1);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
