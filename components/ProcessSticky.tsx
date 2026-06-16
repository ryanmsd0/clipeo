"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 *  Process « serpentin » — la ligne court horizontalement, demi-tour
 *  à droite, revient, demi-tour à gauche, repart (3 rangées en S).
 *  Composant statique (pas de pin) : la piste grise est visible, et au
 *  scroll le bleu remplit le trait (scrub) et révèle chaque phase à
 *  son passage. Étape 1 en haut à gauche, 2 au milieu à droite,
 *  3 en bas à gauche — comme le croquis, en symétrique.
 *  Mobile + reduced-motion : empilé statique, ligne masquée.
 * ------------------------------------------------------------------ */

export type Step = {
  num: string;
  title: string;
  lead: string;
  bullets: string[];
  img: string;
  alt: string;
  ph: string;
  phLabel: string;
};

export const STEPS: Step[] = [
  {
    num: "01",
    title: "On repère vos pépites.",
    lead: "Tout démarre par un audit gratuit de votre contenu long. On cherche, dans vos vidéos, podcasts et lives, les moments capables de devenir viraux, et on cadre l'objectif avant même de lancer.",
    bullets: [
      "On isole les 30 secondes qui peuvent faire des millions de vues, là où d'autres voient une vidéo banale.",
      "On fixe avec vous un objectif de vues chiffré, inscrit au contrat. Pas une promesse en l'air.",
      "On définit les angles qui parlent vraiment à votre audience, jamais du clip publié au hasard.",
    ],
    img: "/img/process/etape-1.png",
    alt: "Audit du contenu : analyse du potentiel viral de la bibliothèque vidéo",
    ph: "linear-gradient(135deg,#eef3fc,#dbe6f8)",
    phLabel: "Audit du contenu",
  },
  {
    num: "02",
    title: "On les démultiplie.",
    lead: "Une fois les angles validés, notre réseau de clippers passe à la production. Une seule vidéo longue devient des dizaines de clips courts, chacun monté pour percer sur sa plateforme.",
    bullets: [
      "Découpage, montage et sous-titres aux codes de TikTok, Reels, Shorts et Twitch, plateforme par plateforme.",
      "Hook dans les 3 premières secondes, rythme nerveux, format vertical : tout est pensé pour la rétention.",
      "Vous validez la ligne éditoriale, on gère le volume. Votre image reste sous contrôle, à chaque clip.",
    ],
    img: "/img/process/etape-2.png",
    alt: "Découpage du contenu long en clips par les clippers",
    ph: "linear-gradient(135deg,#e7eefb,#cfdcf6)",
    phLabel: "Découpage & montage",
  },
  {
    num: "03",
    title: "On vous rend omniprésent.",
    lead: "Les clips sont déployés en continu, sur des dizaines de comptes, jusqu'à occuper la For You Page de votre audience. C'est la répétition qui installe la marque, puis ramène vers votre contenu long.",
    bullets: [
      "Diffusion permanente sur TikTok, Reels, Shorts et Twitch, jour après jour, sans interruption.",
      "Chaque vue est suivie, par clip, par plateforme et par angle : aucune dépense à l'aveugle.",
      "En fin de campagne, un rapport clair : ce qui a cartonné, ce qu'on coupe, et où l'on scale pour la suite.",
    ],
    img: "/img/process/etape-3.png",
    alt: "Distribution des clips sur des dizaines de comptes multi-plateformes",
    ph: "linear-gradient(135deg,#dbe6f8,#bcd2f1)",
    phLabel: "Distribution multi-comptes",
  },
];

/* Serpentin symétrique : 3 lignes horizontales reliées par des
   demi-cercles parfaits (rayon = moitié de l'écart entre lignes).
   viewBox 1200 × 1080 = hauteur réelle du wrap (échelle 1:1 en y,
   sinon les lignes glissent et traversent les contenus).
   Lignes à y = 80 / 430 / 780, arcs r = 175. */
const SNAKE_PATH =
  "M90,90 H980 " +
  "A220,220 0 0 1 980,530 " +
  "H220 " +
  "A220,220 0 0 0 220,970 " +
  "H1110";
/* fractions de longueur où chaque phase est atteinte (le long du S) */
const STEP_AT = [0.08, 0.42, 0.78];

const CSS = `
  .psl-wrap{position:relative;margin-top:8px}
  .psl-snake{display:none}
  .psl-row{padding:30px 0;border-top:1px solid var(--w08)}
  .psl-row:first-child{border-top:none}
  .psl-item{display:flex;flex-direction:column;gap:18px}
  .psl-num{font-family:var(--font-m);font-size:.7rem;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--sky);margin-bottom:10px;display:block}
  /* label-mode : « Étape X » en gros, sans image ni numéro filigrane */
  .psl-step{display:block;font-family:var(--font-d);font-weight:800;letter-spacing:-.02em;line-height:1;
    font-size:clamp(2.4rem,4.4vw,3.4rem);color:var(--sky);margin-bottom:16px}
  .psl-item h3{font-family:var(--font-d);font-weight:800;font-size:clamp(1.5rem,2.8vw,2.1rem);letter-spacing:-.02em;color:var(--ink);margin-bottom:12px}
  .psl-lead{font-size:.98rem;line-height:1.6;color:var(--w70);margin-bottom:16px;max-width:560px}
  .psl-list{list-style:none;display:flex;flex-direction:column;gap:9px}
  .psl-list li{position:relative;padding-left:20px;color:var(--w55);font-size:.95rem;line-height:1.55}
  .psl-list li:before{content:"";position:absolute;left:0;top:.55em;width:7px;height:7px;border-radius:50%;background:var(--sky)}
  .psl-shot{position:relative;border-radius:18px;overflow:hidden;border:1px solid var(--w14);
    background:var(--glass-2);box-shadow:0 22px 54px -26px rgba(10,22,40,.25);aspect-ratio:16/10}
  .psl-ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
  .psl-ph span{font-family:var(--font-m);font-size:.64rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--w40)}
  .psl-shot img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}

  @media(min-width:900px){
    .psl-wrap{height:1320px}
    .psl-snake{display:block;position:absolute;inset:0;z-index:0;pointer-events:none}
    .psl-snake svg{width:100%;height:100%}
    /* 3 couloirs horizontaux, contenu sous sa ligne, côté alterné */
    .psl-row{position:absolute;left:0;right:0;padding:0;border:none}
    /* lignes du serpentin à y = 90 / 530 / 970 ; centres des boucles
       (= tops des rangées, le centrage vertical vit sur .psl-item) :
       310 / 750 / 1145. Espacement large pour laisser respirer le texte. */
    .psl-row-0{top:310px}
    .psl-row-1{top:750px}
    .psl-row-2{top:1145px}
    .psl-row-0,.psl-row-2{display:flex;justify-content:flex-start;padding-left:5%}
    .psl-row-1{display:flex;justify-content:flex-end;padding-right:9%}
    .psl-item{flex-direction:row;align-items:center;gap:30px;max-width:660px;transform:translateY(-50%)}
    .psl-item-text{max-width:560px}
    .psl-row-1 .psl-item{flex-direction:row-reverse}
    .psl-shot{flex:0 0 280px}
    .psl-text{min-width:0}
    /* Numéros géants, façon watermark du blog mais en bleu — centrés
       verticalement dans la BOUCLE du serpentin (lanes : 80-430 / 430-780 /
       780-1080, centres à 255 / 605 / 930 ; tops de rangées 105/455/805). */
    .psl-big{display:block;position:absolute;top:0;transform:translateY(-50%);
      font-family:var(--font-d);font-weight:800;font-size:clamp(7rem,15vw,13rem);line-height:.9;
      letter-spacing:-.04em;color:rgba(10,99,255,.14);z-index:0;pointer-events:none;user-select:none}
    .psl-row-0 .psl-big,.psl-row-2 .psl-big{right:4%}
    .psl-row-1 .psl-big{left:4%}
  }
  @media(max-width:899px){.psl-big{display:none}}
`;

function Shot({ step, eager = false }: { step: Step; eager?: boolean }) {
  /* L'image peut être en erreur AVANT l'hydratation (404 au SSR paint) :
     onError ne se déclenche alors jamais. On vérifie l'état réel au mount. */
  const [ok, setOk] = useState(false);
  const imgRef = (el: HTMLImageElement | null) => {
    if (!el) return;
    if (el.complete) {
      setOk(el.naturalWidth > 0);
    } else {
      el.onload = () => setOk(true);
      el.onerror = () => setOk(false);
    }
  };
  return (
    <div className="psl-shot">
      <div className="psl-ph" style={{ background: step.ph }} aria-hidden="true">
        <span>{step.phLabel}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={step.img}
        alt={step.alt}
        width={1280}
        height={800}
        loading={eager ? "eager" : "lazy"}
        style={{ opacity: ok ? 1 : 0, transition: "opacity .4s ease" }}
      />
    </div>
  );
}

export default function ProcessSticky({ labelMode = false, images = true, steps = STEPS }: { labelMode?: boolean; images?: boolean; steps?: Step[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const wrap = wrapRef.current;
        if (!wrap) return;

        /* Le bleu remplit la piste au scroll et révèle les phases à son passage.
           Le dashoffset est animé en ATTRIBUT SVG (valeurs en unités pathLength) :
           via CSS, GSAP l'écrit en px et le tracé devient binaire au lieu de
           progresser. */
        gsap.set(".psl-row", { autoAlpha: 0, y: 36 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top 72%",
            end: "bottom 82%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        tl.to(".psl-draw", { attr: { "stroke-dashoffset": 0 }, duration: 1, ease: "none" }, 0);
        STEP_AT.forEach((at, i) => {
          tl.to(`.psl-row-${i}`, { autoAlpha: 1, y: 0, duration: 0.07, ease: "power2.out" }, at);
        });
      });
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} className="psl-wrap">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Le serpentin : piste grise + remplissage bleu */}
      <div className="psl-snake" aria-hidden="true">
        <svg viewBox="0 0 1200 1320" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="pslGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a63ff" />
              <stop offset="100%" stopColor="#0055fe" />
            </linearGradient>
          </defs>
          {/* viewBox 1:1 avec la hauteur du wrap (1080) */}
          <path d={SNAKE_PATH} stroke="rgba(10,22,40,.1)" strokeWidth="3" pathLength={1} />
          <path className="psl-draw" d={SNAKE_PATH} stroke="url(#pslGrad)" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
        </svg>
      </div>

      {steps.map((s, i) => (
        <div key={i} className={`psl-row psl-row-${i}`}>
          {!labelMode && <span className="psl-big" aria-hidden="true">{s.num}</span>}
          <div className={`psl-item${!images || labelMode ? " psl-item-text" : ""}`}>
            {images && !labelMode && <Shot step={s} eager={i === 0} />}
            <div className="psl-text">
              {labelMode && <span className="psl-step">Étape {i + 1}</span>}
              <h3>{s.title}</h3>
              <p className="psl-lead">{s.lead}</p>
              <ul className="psl-list">
                {s.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
