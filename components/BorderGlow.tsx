"use client";

import React, { useRef, useCallback } from "react";

/* ------------------------------------------------------------------ *
 *  BorderGlow — adapté de React Bits pour Clipeo.
 *  Glow directionnel au survol : un cône de lumière suit le curseur le
 *  long des bords de la carte (bordure mesh-gradient + halo externe).
 *  Adaptations : thème clair (le composant d'origine est calibré dark),
 *  palette Clipeo par défaut, CSS injecté (Next App Router n'accepte
 *  pas l'import de CSS global depuis un composant), TypeScript.
 *  Pointeur uniquement : au tactile la carte reste sobre (glow masqué).
 * ------------------------------------------------------------------ */

const GRADIENT_POSITIONS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const GRADIENT_KEYS = ["--gradient-one", "--gradient-two", "--gradient-three", "--gradient-four", "--gradient-five", "--gradient-six", "--gradient-seven"];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function parseHSL(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 221, s: 100, l: 60 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor: string, intensity: number) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const vars: Record<string, string> = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

function buildGradientVars(colors: string[]) {
  const vars: Record<string, string> = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

const CSS = `
.border-glow-card {
  --edge-proximity: 0;
  --cursor-angle: 45deg;
  --color-sensitivity: calc(var(--edge-sensitivity) + 20);

  position: relative;
  border-radius: var(--border-radius);
  isolation: isolate;
  transform: translate3d(0, 0, 0.01px);
  display: grid;
  border: 1px solid var(--w14);
  background: var(--card-bg);
  overflow: visible;
  box-shadow: 0 10px 30px -18px rgba(10,22,40,.18);
}

.border-glow-card::before,
.border-glow-card::after,
.border-glow-card > .edge-light {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  transition: opacity 0.25s ease-out;
  z-index: -1;
}

.border-glow-card:not(:hover):not(.sweep-active)::before,
.border-glow-card:not(:hover):not(.sweep-active)::after,
.border-glow-card:not(:hover):not(.sweep-active) > .edge-light {
  opacity: 0;
  transition: opacity 0.75s ease-in-out;
}

/* bordure mesh-gradient colorée */
.border-glow-card::before {
  border: 1px solid transparent;
  background:
    linear-gradient(var(--card-bg) 0 100%) padding-box,
    linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box,
    var(--gradient-one) border-box,
    var(--gradient-two) border-box,
    var(--gradient-three) border-box,
    var(--gradient-four) border-box,
    var(--gradient-five) border-box,
    var(--gradient-six) border-box,
    var(--gradient-seven) border-box,
    var(--gradient-base) border-box;
  opacity: calc((var(--edge-proximity) - var(--color-sensitivity)) / (100 - var(--color-sensitivity)));
  mask-image: conic-gradient(
    from var(--cursor-angle) at center,
    black calc(var(--cone-spread) * 1%),
    transparent calc((var(--cone-spread) + 15) * 1%),
    transparent calc((100 - var(--cone-spread) - 15) * 1%),
    black calc((100 - var(--cone-spread)) * 1%)
  );
}

/* remplissage mesh près des bords */
.border-glow-card::after {
  border: 1px solid transparent;
  background:
    var(--gradient-one) padding-box,
    var(--gradient-two) padding-box,
    var(--gradient-three) padding-box,
    var(--gradient-four) padding-box,
    var(--gradient-five) padding-box,
    var(--gradient-six) padding-box,
    var(--gradient-seven) padding-box,
    var(--gradient-base) padding-box;
  mask-image:
    linear-gradient(to bottom, black, black),
    radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%),
    radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%),
    radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%),
    radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%),
    radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%),
    conic-gradient(from var(--cursor-angle) at center, transparent 5%, black 15%, black 85%, transparent 95%);
  mask-composite: subtract, add, add, add, add, add;
  opacity: calc(var(--fill-opacity) * (var(--edge-proximity) - var(--color-sensitivity)) / (100 - var(--color-sensitivity)));
  mix-blend-mode: multiply; /* soft-light est invisible sur fond clair */
}

/* halo externe */
.border-glow-card > .edge-light {
  inset: calc(var(--glow-padding) * -1);
  pointer-events: none;
  z-index: 1;
  mask-image: conic-gradient(
    from var(--cursor-angle) at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%
  );
  opacity: calc((var(--edge-proximity) - var(--edge-sensitivity)) / (100 - var(--edge-sensitivity)));
}

.border-glow-card > .edge-light::before {
  content: "";
  position: absolute;
  inset: var(--glow-padding);
  border-radius: inherit;
  box-shadow:
    inset 0 0 0 1px var(--glow-color),
    inset 0 0 1px 0 var(--glow-color-60),
    inset 0 0 3px 0 var(--glow-color-50),
    inset 0 0 6px 0 var(--glow-color-40),
    inset 0 0 15px 0 var(--glow-color-30),
    inset 0 0 25px 2px var(--glow-color-20),
    inset 0 0 50px 2px var(--glow-color-10),
    0 0 1px 0 var(--glow-color-60),
    0 0 3px 0 var(--glow-color-50),
    0 0 6px 0 var(--glow-color-40),
    0 0 15px 0 var(--glow-color-30),
    0 0 25px 2px var(--glow-color-20),
    0 0 50px 2px var(--glow-color-10);
}

/* tactile : pas de curseur → le halo externe ne s'active jamais.
   On le retire pour éviter un débordement horizontal invisible (~18px/côté). */
@media (hover: none) {
  .border-glow-card > .edge-light { display: none; }
}

.border-glow-inner {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}
`;

export interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  colors?: string[];
  fillOpacity?: number;
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  /* palette couleur1 : sky pastel #55a4d1 ≈ hsl(202 57% 58%) pour le halo */
  glowColor = "202 58 59",
  backgroundColor = "#ffffff",
  borderRadius = 18,
  glowRadius = 36,
  glowIntensity = 0.9,
  coneSpread = 25,
  colors = ["#55a4d1", "#8fc9ea", "#080151"],
  fillOpacity = 0.25,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const kx = dx !== 0 ? cx / Math.abs(dx) : Infinity;
    const ky = dy !== 0 ? cy / Math.abs(dy) : Infinity;
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(3)}`);
    card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card ${className}`}
      style={{
        "--card-bg": backgroundColor,
        "--edge-sensitivity": String(edgeSensitivity),
        "--border-radius": `${borderRadius}px`,
        "--glow-padding": `${glowRadius}px`,
        "--cone-spread": String(coneSpread),
        "--fill-opacity": String(fillOpacity),
        ...buildGlowVars(glowColor, glowIntensity),
        ...buildGradientVars(colors),
      } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <span className="edge-light" aria-hidden="true" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}
