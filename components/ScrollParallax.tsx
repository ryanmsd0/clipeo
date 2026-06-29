"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ScrollParallax — déplace au scroll tout élément `[data-parallax]` à l'intérieur
   (valeur = vitesse, ex. data-parallax="0.3"). Respecte prefers-reduced-motion.
   Sert d'animation signature (profondeur) sur les pages Services / Tarifs.
   Cleanup automatique via useGSAP. */
export default function ScrollParallax({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Parallax = effet de profondeur desktop uniquement. Sous 901px les heros
      // passent en 1 colonne : le décalage ferait chevaucher le téléphone/badges
      // sur le texte → on le désactive, les éléments restent fixes.
      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || "0.25");
          gsap.to(el, {
            yPercent: -speed * 100,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
