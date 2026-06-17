"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ------------------------------------------------------------------ *
 *  Cinematic Hero V6 — version "clipping-native" (première V6).
 *  Ajouts vs V5 : logos plateformes réels, sous-titres karaoké animés,
 *  compteur viral + sparkline, et mini-clips multi-plateformes (1 → N).
 *  Self-contained, namespacé `ch-*`. Dépendance : gsap + ScrollTrigger.
 * ------------------------------------------------------------------ */

const C = {
  blue: "#55a4d1",
  blueBright: "#55a4d1",
  orange: "#ff6a3d",
  green: "#22e0a3",
  ink: "#0a1240",
};

/* Logos plateformes (SVG officiels simplifiés) */
function PlatformLogo({ name, className }: { name: "tiktok" | "youtube" | "instagram" | "twitch"; className?: string }) {
  const common = { className, fill: "currentColor", "aria-hidden": true } as const;
  switch (name) {
    case "tiktok":
      return (
        <svg {...common} viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" /></svg>
      );
    case "youtube":
      return (
        <svg {...common} viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" /></svg>
      );
    case "instagram":
      return (
        <svg {...common} viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
      );
    case "twitch":
      return (
        <svg {...common} viewBox="0 0 512 512"><path d="M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.06,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.06Z" /></svg>
      );
  }
}

const INJECTED_STYLES = `
  .ch-root{
    position:relative;width:100vw;height:100vh;overflow:hidden;
    display:flex;align-items:center;justify-content:center;
    background:#ffffff;color:${C.ink};
    font-family:var(--font-montserrat),'Montserrat',sans-serif;
    -webkit-font-smoothing:antialiased;perspective:1500px;
  }
  .ch-reveal{visibility:hidden;}
  .ch-static .ch-reveal{visibility:visible !important;opacity:1 !important;}

  .ch-grain{
    position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:50;
    opacity:.05;mix-blend-mode:multiply;
    background:url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%25" height="100%25" filter="url(%23n)"/></svg>');
  }
  .ch-grid{
    position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.5;
    background-size:60px 60px;
    background-image:
      linear-gradient(to right, rgba(10,22,40,.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(10,22,40,.05) 1px, transparent 1px);
    -webkit-mask-image:radial-gradient(ellipse at center, black 0%, transparent 70%);
    mask-image:radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .ch-fixed-cta{
    position:absolute;top:24px;right:24px;z-index:80;
    display:inline-flex;align-items:center;gap:8px;
    padding:11px 20px;border-radius:50px;
    font-family:var(--font-montserrat),sans-serif;font-weight:700;font-size:.82rem;
    color:#fff;background:linear-gradient(180deg,${C.blue} 0%,${C.blueBright} 100%);
    box-shadow:0 6px 18px -4px rgba(85,164,209,.55),inset 0 1px 1px rgba(255,255,255,.4);
    transition:transform .35s cubic-bezier(.25,1,.5,1),box-shadow .35s;
  }
  .ch-fixed-cta:hover{transform:translateY(-2px);box-shadow:0 12px 26px -6px rgba(85,164,209,.7),inset 0 1px 1px rgba(255,255,255,.4);}

  .ch-hero-wrap{
    position:absolute;z-index:10;display:flex;flex-direction:column;
    align-items:center;justify-content:center;text-align:center;
    width:100vw;padding:0 16px;will-change:transform;transform-style:preserve-3d;
  }
  .ch-tag1{
    font-size:clamp(2.6rem,8vw,6rem);font-weight:800;letter-spacing:-.02em;margin-bottom:.25rem;
    color:${C.ink};text-shadow:0 10px 30px rgba(10,22,40,.12),0 2px 4px rgba(10,22,40,.08);
  }
  .ch-tag2{
    font-size:clamp(2.6rem,8vw,6rem);font-weight:900;letter-spacing:-.03em;
    background:linear-gradient(96deg,${C.blueBright},${C.blue});
    -webkit-background-clip:text;background-clip:text;color:transparent;
    filter:drop-shadow(0 10px 20px rgba(85,164,209,.18));
  }

  .ch-card-layer{position:absolute;inset:0;z-index:20;display:flex;align-items:center;justify-content:center;pointer-events:none;perspective:1500px;}
  .ch-card{
    position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;pointer-events:auto;
    width:92vw;height:92vh;border-radius:32px;
    background:linear-gradient(145deg,#080151 0%,#04081c 100%);
    box-shadow:0 40px 100px -20px rgba(0,0,0,.85),0 20px 40px -20px rgba(0,0,0,.7),
      inset 0 1px 2px rgba(255,255,255,.18),inset 0 -2px 4px rgba(0,0,0,.7);
    border:1px solid rgba(255,255,255,.05);
  }
  @media(min-width:768px){.ch-card{width:85vw;height:85vh;border-radius:40px;}}
  .ch-sheen{
    position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:50;
    background:radial-gradient(800px circle at var(--mx,50%) var(--my,50%),rgba(85,164,209,.12) 0%,transparent 40%);
    mix-blend-mode:screen;
  }
  .ch-grid-inner{
    position:relative;width:100%;height:100%;max-width:80rem;margin:0 auto;padding:1.5rem 1rem;
    display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;z-index:10;
  }
  @media(min-width:1024px){
    .ch-grid-inner{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;padding:0 3rem;}
  }

  .ch-brand-cell{order:1;display:flex;justify-content:center;z-index:20;width:100%;}
  @media(min-width:1024px){.ch-brand-cell{order:3;justify-content:flex-end;}}
  .ch-brand{
    font-size:clamp(3.5rem,13vw,8rem);font-weight:900;text-transform:uppercase;letter-spacing:-.04em;line-height:.9;
    background:linear-gradient(180deg,#fff 0%,#9fd2ec 100%);
    -webkit-background-clip:text;background-clip:text;color:transparent;
    filter:drop-shadow(0 12px 24px rgba(0,0,0,.6));
  }

  .ch-mockup-cell{order:2;position:relative;width:100%;height:380px;display:flex;align-items:center;justify-content:center;z-index:10;perspective:1000px;}
  @media(min-width:1024px){.ch-mockup-cell{order:2;height:600px;}}
  .ch-mockup-scale{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;transform:scale(.6);}
  @media(min-width:768px){.ch-mockup-scale{transform:scale(.8);}}
  @media(min-width:1024px){.ch-mockup-scale{transform:scale(1);}}

  /* Mini-clips multi-plateformes (la démultiplication 1 → N) :
     même châssis de téléphone que le central, en plus petit. */
  .ch-miniclip{
    position:absolute;width:126px;height:224px;border-radius:26px;z-index:5;background:#111;
    box-shadow:inset 0 0 0 1.5px #3a4d6b,inset 0 0 0 5px #000,0 30px 60px -22px rgba(0,0,0,.85),0 12px 22px -6px rgba(0,0,0,.6),
      0 0 46px -4px var(--mc-glow,transparent),0 0 90px 4px var(--mc-glow-soft,transparent);
  }
  .ch-miniclip .mc-screen{position:absolute;inset:5px;border-radius:21px;overflow:hidden;background:#05060f;
    box-shadow:inset 0 0 14px rgba(0,0,0,1);}
  .ch-miniclip .mc-island{position:absolute;top:6px;left:50%;transform:translateX(-50%);width:42px;height:12px;border-radius:50px;background:#000;z-index:4;}
  .ch-miniclip .mc-glare{position:absolute;inset:0;z-index:3;pointer-events:none;background:linear-gradient(115deg,rgba(255,255,255,.07),rgba(255,255,255,0) 45%);}
  .ch-miniclip .mc-bg{position:absolute;inset:0;}
  .ch-miniclip .mc-plat{
    position:absolute;top:8px;left:8px;z-index:2;width:24px;height:24px;border-radius:7px;
    display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.45);color:#fff;
    border:1px solid rgba(255,255,255,.12);
  }
  .ch-miniclip .mc-plat svg{width:13px;height:13px;}
  .ch-miniclip .mc-play{
    position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:30px;height:30px;border-radius:50%;
    background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);
  }
  .ch-miniclip .mc-play:after{content:"";position:absolute;top:50%;left:54%;transform:translate(-50%,-50%);
    border-style:solid;border-width:5px 0 5px 8px;border-color:transparent transparent transparent #fff;}
  .ch-miniclip .mc-views{position:absolute;bottom:8px;left:8px;z-index:2;font-size:.6rem;font-weight:800;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.7);}
  /* Instagram -> lueur violette, YouTube -> lueur rouge */
  .ch-mini-l{left:calc(50% - 232px);top:calc(50% - 116px);--mc-glow:rgba(168,85,247,.6);--mc-glow-soft:rgba(168,85,247,.28);}
  .ch-mini-r{left:calc(50% + 112px);top:calc(50% - 150px);--mc-glow:rgba(239,68,68,.6);--mc-glow-soft:rgba(239,68,68,.28);}

  .ch-phone{
    position:relative;width:280px;height:580px;border-radius:3rem;display:flex;flex-direction:column;z-index:8;
    will-change:transform;transform-style:preserve-3d;background:#111;
    box-shadow:inset 0 0 0 2px #3a4d6b,inset 0 0 0 7px #000,0 40px 80px -15px rgba(0,0,0,.9),0 15px 25px -5px rgba(0,0,0,.7);
  }
  .ch-hw{position:absolute;background:linear-gradient(90deg,#404040,#171717);box-shadow:-2px 0 5px rgba(0,0,0,.8),inset -1px 0 1px rgba(255,255,255,.15);z-index:0;}
  .ch-screen{
    position:absolute;inset:7px;border-radius:2.5rem;overflow:hidden;color:#fff;z-index:10;
    background:#05060f;box-shadow:inset 0 0 15px rgba(0,0,0,1);
  }
  .ch-glare{position:absolute;inset:0;z-index:40;pointer-events:none;background:linear-gradient(110deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,0) 45%);}
  .ch-island{
    position:absolute;top:5px;left:50%;transform:translateX(-50%);width:118px;height:28px;background:#000;border-radius:50px;z-index:50;
    display:flex;align-items:center;justify-content:center;gap:6px;padding:0 10px;
  }
  .ch-island i{width:6px;height:6px;border-radius:50%;background:#ef4444;box-shadow:0 0 8px rgba(239,68,68,.9);display:block;}
  .ch-island span{font-size:.5rem;font-weight:700;color:#fca5a5;letter-spacing:.08em;text-transform:uppercase;}

  .ch-clip{position:absolute;inset:0;background:
      radial-gradient(120% 80% at 50% 0%,rgba(85,164,209,.35),transparent 60%),
      linear-gradient(180deg,#080151 0%,#070a1f 100%);}
  .ch-clip-play{
    position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:54px;height:54px;border-radius:50%;
    background:rgba(255,255,255,.14);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;
    border:1px solid rgba(255,255,255,.25);box-shadow:0 8px 24px rgba(0,0,0,.5);
  }
  .ch-clip-play:after{content:"";border-style:solid;border-width:9px 0 9px 15px;border-color:transparent transparent transparent #fff;margin-left:3px;}

  /* Compteur viral + sparkline */
  .ch-viral{position:absolute;top:42px;left:50%;transform:translateX(-50%);z-index:25;display:flex;flex-direction:column;align-items:center;}
  .ch-counter{font-size:2rem;font-weight:800;letter-spacing:-.03em;color:#fff;text-shadow:0 4px 18px rgba(0,0,0,.6);line-height:1;}
  .ch-views-lab{font-size:.5rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(159,210,236,.7);font-weight:700;margin-top:4px;font-family:var(--font-space-mono),monospace;}
  .ch-spark-wrap{width:128px;height:34px;margin-top:8px;position:relative;}
  .ch-spark{fill:none;stroke:${C.green};stroke-width:3;stroke-linecap:round;stroke-linejoin:round;
    stroke-dasharray:240;filter:drop-shadow(0 0 5px rgba(34,224,163,.6));}
  .ch-spark-area{fill:url(#chSparkGrad);opacity:.22;}
  .ch-spark-dot{fill:${C.green};filter:drop-shadow(0 0 6px ${C.green});}
  .ch-trend{display:inline-flex;align-items:center;gap:4px;margin-top:6px;font-size:.56rem;font-weight:800;color:${C.green};font-family:var(--font-space-mono),monospace;}

  /* Sous-titres karaoké */
  .ch-caps{position:absolute;left:14px;right:14px;bottom:128px;z-index:25;display:flex;flex-wrap:wrap;justify-content:center;gap:5px 6px;}
  .ch-caps .w{font-size:.84rem;font-weight:800;letter-spacing:-.01em;color:#fff;text-shadow:0 2px 6px rgba(0,0,0,.75);
    padding:1px 5px;border-radius:6px;transition:transform .12s ease,background .12s ease,color .12s ease;}
  .ch-caps .w.on{background:${C.blue};color:#fff;transform:scale(1.1);box-shadow:0 5px 14px rgba(85,164,209,.6);}

  .ch-meta{position:absolute;left:14px;right:60px;bottom:54px;z-index:20;}
  .ch-handle{display:flex;align-items:center;gap:8px;}
  .ch-handle .av{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,${C.orange},#ff8a63);border:1.5px solid #fff;}
  .ch-handle b{font-size:.72rem;font-weight:700;}
  .ch-rail{position:absolute;right:12px;bottom:54px;display:flex;flex-direction:column;gap:14px;align-items:center;z-index:20;}
  .ch-rail .ic{position:relative;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:13px;}
  .ch-rail .ic span{font-size:8px;position:absolute;top:32px;color:rgba(255,255,255,.7);font-weight:700;white-space:nowrap;}
  .ch-platform{position:absolute;top:42px;left:14px;z-index:20;display:inline-flex;align-items:center;gap:6px;
    padding:5px 10px;border-radius:50px;background:rgba(0,0,0,.4);border:1px solid rgba(255,255,255,.12);
    font-size:.55rem;font-weight:700;letter-spacing:.04em;color:#fff;}
  .ch-platform svg{width:12px;height:12px;}
  .ch-homebar{position:absolute;bottom:8px;left:50%;transform:translateX(-50%);width:120px;height:4px;background:rgba(255,255,255,.25);border-radius:50px;z-index:30;}

  .ch-badge{
    position:absolute;display:flex;align-items:center;gap:.75rem;z-index:30;padding:.85rem 1rem;border-radius:1rem;
    background:linear-gradient(135deg,rgba(255,255,255,.1) 0%,rgba(255,255,255,.02) 100%);
    backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
    box-shadow:0 0 0 1px rgba(255,255,255,.1),0 25px 50px -12px rgba(0,0,0,.7),inset 0 1px 1px rgba(255,255,255,.2);
  }
  .ch-badge .ico{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:#fff;
    background:linear-gradient(to bottom,rgba(85,164,209,.25),rgba(4,10,40,.1));border:1px solid rgba(85,164,209,.3);}
  .ch-badge .ico svg{width:18px;height:18px;}
  .ch-badge p{margin:0;}
  .ch-badge .t{color:#fff;font-size:.8rem;font-weight:700;}
  .ch-badge .s{color:rgba(159,210,236,.6);font-size:.68rem;font-weight:500;}
  .ch-badge-tl{top:1rem;left:-15px;}
  .ch-badge-br{bottom:2.5rem;right:-15px;}
  @media(min-width:1024px){.ch-badge-tl{top:2.5rem;left:-70px;}.ch-badge-br{bottom:4rem;right:-70px;}}
  .ch-plats{display:flex;align-items:center;gap:7px;color:#dbe7ff;}
  .ch-plats svg{width:18px;height:18px;opacity:.92;}

  .ch-left-cell{order:3;display:flex;flex-direction:column;justify-content:center;text-align:center;z-index:20;width:100%;padding:0 1rem;}
  @media(min-width:1024px){.ch-left-cell{order:1;text-align:left;padding:0;}}
  .ch-left-cell h3{color:#fff;font-size:clamp(1.5rem,4vw,2.25rem);font-weight:700;letter-spacing:-.02em;margin:0;}
  @media(min-width:1024px){.ch-left-cell h3{margin-bottom:1.25rem;}}
  .ch-left-cell p{display:none;color:rgba(190,226,240,.7);font-size:clamp(.9rem,1.6vw,1.1rem);line-height:1.6;max-width:24rem;margin:0 auto;}
  @media(min-width:768px){.ch-left-cell p{display:block;}}
  @media(min-width:1024px){.ch-left-cell p{margin:0;max-width:none;}}
`;

export interface CinematicHeroV6Props {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  bookingHref?: string;
  showFixedCta?: boolean;
}

function formatViews(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".", ",") + " M";
  if (n >= 1_000) return Math.round(n / 1_000) + " K";
  return Math.round(n).toString();
}

export default function CinematicHeroV6({
  brandName = "Clipeo",
  tagline1 = "Un contenu long,",
  tagline2 = "100 clips viraux.",
  cardHeading = "Le clipping, industrialisé.",
  cardDescription = (
    <>
      <span style={{ color: "#fff", fontWeight: 600 }}>Clipeo</span> découpe votre
      contenu long en dizaines de clips courts, publiés en continu sur TikTok, Shorts,
      Reels et Twitch par un réseau de clippers.
    </>
  ),
  metricValue = 2_400_000,
  metricLabel = "vues générées",
  bookingHref = "/contact",
  showFixedCta = true,
}: CinematicHeroV6Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const requestRef = useRef<number>(0);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Parallax souris
  useEffect(() => {
    if (prefersReduced) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, { rotationY: xVal * 12, rotationX: -yVal * 12, ease: "power3.out", duration: 1.2 });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [prefersReduced]);

  // Timeline cinématique au scroll
  // useGSAP (= useLayoutEffect) : l'ordre de création des ScrollTrigger doit suivre
  // le DOM (hero AVANT ProcessSticky) pour que l'épinglage calcule les bons repères.
  useGSAP(() => {
    if (prefersReduced) {
      containerRef.current?.classList.add("ch-static");
      if (counterRef.current) counterRef.current.textContent = formatViews(metricValue);
      gsap.set(".ch-spark", { strokeDashoffset: 0 });
      return;
    }

    const counterProxy = { v: 0 };

    {
      gsap.set(".ch-main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".ch-left", ".ch-right", ".ch-mockup-wrap", ".ch-badge", ".ch-widget", ".ch-mini"], { autoAlpha: 0 });
      gsap.set(".ch-spark", { strokeDashoffset: 240 });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .from(".ch-text-track", { duration: 1.8, autoAlpha: 0, y: 60, scale: 0.85, rotationX: -20, ease: "expo.out" })
        .from(".ch-text-days", { duration: 1.4, clipPath: "inset(0 100% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=1950", pin: true, scrub: 1, anticipatePin: 1 },
      });

      scrollTl
        .to(".ch-grid", { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".ch-hero-wrap", { scale: 1.15, opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".ch-main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".ch-main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".ch-mockup-wrap",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".ch-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.12, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        // La démultiplication 1 → N : les mini-clips jaillissent de derrière le téléphone
        .fromTo(".ch-mini",
          { autoAlpha: 0, scale: 0.5, x: 0, y: 0, rotation: 0 },
          { autoAlpha: 1, scale: 1, x: (_i: number, t: Element) => (t.classList.contains("ch-mini-l") ? -30 : 30), rotation: (_i: number, t: Element) => (t.classList.contains("ch-mini-l") ? -9 : 9), ease: "back.out(1.6)", duration: 1.5, stagger: 0.18 },
          "-=1.6"
        )
        .to(".ch-spark", { strokeDashoffset: 0, duration: 2, ease: "power2.out" }, "-=1.4")
        .to(counterProxy, {
          v: metricValue, duration: 2, ease: "expo.out",
          onUpdate: () => { if (counterRef.current) counterRef.current.textContent = formatViews(counterProxy.v); },
        }, "<")
        .fromTo(".ch-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".ch-left", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".ch-right", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        // L'animation se termine sur son CLIMAX (téléphones + mini-clips + chiffres).
        // Pas de sortie : on enchaîne directement sur la section « n°1 en France ».
        .to({}, { duration: 1 });
    }
  }, { dependencies: [metricValue, prefersReduced], scope: containerRef });

  return (
    <div ref={containerRef} className="ch-root">
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="ch-grain" aria-hidden="true" />
      <div className="ch-grid" aria-hidden="true" />

      {showFixedCta && (
        <Link href={bookingHref} className="ch-fixed-cta">
          Réserver un audit
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}

      <div className="ch-hero-wrap">
        <h1 className="ch-text-track ch-tag1">{tagline1}</h1>
        <p className="ch-text-days ch-tag2">{tagline2}</p>
      </div>

      <div className="ch-card-layer">
        <div ref={mainCardRef} className="ch-main-card ch-card ch-reveal">
          <div className="ch-sheen" aria-hidden="true" />
          <div className="ch-grid-inner">

            {/* BRAND */}
            <div className="ch-right ch-reveal ch-brand-cell">
              <h2 className="ch-brand">{brandName}</h2>
            </div>

            {/* MOCKUP + CLIP + MINI-CLIPS MULTI-PLATEFORMES */}
            <div className="ch-mockup-wrap ch-mockup-cell">
              <div className="ch-mockup-scale">

                {/* Mini-clips : le même contenu démultiplié sur d'autres plateformes */}
                <div className="ch-mini ch-miniclip ch-mini-l">
                  <div className="mc-screen">
                    <div className="mc-bg" style={{ background: "radial-gradient(120% 80% at 50% 0%, rgba(168,85,247,.34), transparent 60%), linear-gradient(180deg,#160e2e,#0a0714)" }} />
                    <div className="mc-glare" aria-hidden="true" />
                    <div className="mc-plat"><PlatformLogo name="instagram" /></div>
                    <div className="mc-play" />
                    <div className="mc-views">312 K vues</div>
                  </div>
                  <div className="mc-island" aria-hidden="true" />
                </div>
                <div className="ch-mini ch-miniclip ch-mini-r">
                  <div className="mc-screen">
                    <div className="mc-bg" style={{ background: "radial-gradient(120% 80% at 50% 0%, rgba(239,68,68,.32), transparent 60%), linear-gradient(180deg,#2a0f12,#0a0714)" }} />
                    <div className="mc-glare" aria-hidden="true" />
                    <div className="mc-plat"><PlatformLogo name="youtube" /></div>
                    <div className="mc-play" />
                    <div className="mc-views">88 K vues</div>
                  </div>
                  <div className="mc-island" aria-hidden="true" />
                </div>

                {/* Téléphone principal */}
                <div ref={mockupRef} className="ch-phone">
                  <div className="ch-hw" style={{ top: 120, left: -3, width: 3, height: 25, borderRadius: "3px 0 0 3px" }} aria-hidden="true" />
                  <div className="ch-hw" style={{ top: 160, left: -3, width: 3, height: 45, borderRadius: "3px 0 0 3px" }} aria-hidden="true" />
                  <div className="ch-hw" style={{ top: 220, left: -3, width: 3, height: 45, borderRadius: "3px 0 0 3px" }} aria-hidden="true" />
                  <div className="ch-hw" style={{ top: 170, right: -3, width: 3, height: 70, borderRadius: "0 3px 3px 0" }} aria-hidden="true" />

                  <div className="ch-screen">
                    <div className="ch-glare" aria-hidden="true" />
                    <div className="ch-island ch-widget"><i /><span>En direct</span></div>

                    <div className="ch-clip" aria-hidden="true" />
                    <div className="ch-platform ch-widget"><PlatformLogo name="tiktok" /> TikTok</div>

                    {/* Compteur viral + sparkline */}
                    <div className="ch-viral ch-widget">
                      <div className="ch-counter"><span ref={counterRef}>0</span></div>
                      <div className="ch-views-lab">{metricLabel}</div>
                      <div className="ch-spark-wrap">
                        <svg width="128" height="34" viewBox="0 0 128 34" fill="none" aria-hidden="true">
                          <defs>
                            <linearGradient id="chSparkGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={C.green} />
                              <stop offset="100%" stopColor={C.green} stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path className="ch-spark-area" d="M2,30 L20,27 L40,29 L58,19 L78,22 L98,10 L126,3 L126,34 L2,34 Z" />
                          <path className="ch-spark" d="M2,30 L20,27 L40,29 L58,19 L78,22 L98,10 L126,3" />
                          <circle className="ch-spark-dot" cx="126" cy="3" r="3" />
                        </svg>
                      </div>
                      <div className="ch-trend">▲ +1,2 M aujourd&apos;hui</div>
                    </div>

                    <div className="ch-clip-play ch-widget" aria-hidden="true" />

                    <div className="ch-meta ch-widget">
                      <div className="ch-handle"><span className="av" /><b>@votremarque</b></div>
                    </div>
                    <div className="ch-rail ch-widget" aria-hidden="true">
                      <div className="ic">❤️<span>184K</span></div>
                      <div className="ic">💬<span>2 312</span></div>
                      <div className="ic">↗</div>
                    </div>
                    <div className="ch-homebar" />
                  </div>
                </div>
              </div>

              {/* Badges : viralité + omniprésence multi-plateformes */}
              <div className="ch-badge ch-badge-tl">
                <div className="ico">🔥</div>
                <div>
                  <p className="t">+500 M vues</p>
                  <p className="s">Portée délivrée</p>
                </div>
              </div>
              <div className="ch-badge ch-badge-br">
                <div className="ch-plats">
                  <PlatformLogo name="tiktok" />
                  <PlatformLogo name="youtube" />
                  <PlatformLogo name="instagram" />
                  <PlatformLogo name="twitch" />
                </div>
                <div>
                  <p className="t">4 plateformes</p>
                  <p className="s">Une seule prod</p>
                </div>
              </div>
            </div>

            {/* ACCROCHE */}
            <div className="ch-left ch-reveal ch-left-cell">
              <h3>{cardHeading}</h3>
              <p>{cardDescription}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
