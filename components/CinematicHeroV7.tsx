"use client";

import React, { useMemo, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DottedMap from "dotted-map";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 *  Cinematic Hero V7 — « le dézoom d'omniprésence ».
 *  Plan serré sur UN clip (professionnalisé) → la caméra recule et
 *  révèle un mur d'écrans qui publient en continu (omniprésence,
 *  tout le temps) → la scène s'incline et une carte du monde diffuse
 *  des arcs depuis Paris (partout).
 *  Patterns : useGSAP + matchMedia + snap labels + invalidateOnRefresh.
 *  Self-contained, namespacé `ch-`/`cv-`. Déps : gsap, dotted-map.
 * ------------------------------------------------------------------ */

const C = {
  blue: "#0a63ff",
  blueBright: "#0055fe",
  orange: "#ff6a3d",
  green: "#22e0a3",
  ink: "#0a1628",
};

function PlatformLogo({ name, className }: { name: "tiktok" | "youtube" | "instagram" | "twitch"; className?: string }) {
  const common = { className, fill: "currentColor", "aria-hidden": true } as const;
  switch (name) {
    case "tiktok":
      return <svg {...common} viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" /></svg>;
    case "youtube":
      return <svg {...common} viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" /></svg>;
    case "instagram":
      return <svg {...common} viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>;
    case "twitch":
      return <svg {...common} viewBox="0 0 512 512"><path d="M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.06,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.06Z" /></svg>;
  }
}

function IconHeart({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>;
}
function IconComment({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" /></svg>;
}
function IconShare({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>;
}
function IconTrendUp({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>;
}

/* Le mur : formation symétrique en losange — 3 colonnes de chaque côté.
   Chaque écran = une publication à une heure différente (tout le temps). */
type Plat = "tiktok" | "youtube" | "instagram" | "twitch";
const WALL_TILES: Array<{ plat: Plat; time: string; views: number; x: number; y: number; z: number; s: number; far?: boolean }> = [
  { plat: "tiktok", time: "02:14", views: 412_000, x: -210, y: -30, z: -40, s: 0.96 },
  { plat: "instagram", time: "06:38", views: 1_200_000, x: -355, y: -165, z: -90, s: 0.9 },
  { plat: "youtube", time: "09:12", views: 88_000, x: -355, y: 115, z: -90, s: 0.9 },
  { plat: "twitch", time: "11:47", views: 47_000, x: -500, y: -30, z: -140, s: 0.84, far: true },
  { plat: "instagram", time: "14:05", views: 2_100_000, x: 210, y: -30, z: -40, s: 0.96 },
  { plat: "youtube", time: "16:33", views: 760_000, x: 355, y: -165, z: -90, s: 0.9 },
  { plat: "tiktok", time: "19:21", views: 318_000, x: 355, y: 115, z: -90, s: 0.9 },
  { plat: "instagram", time: "23:58", views: 530_000, x: 500, y: -30, z: -140, s: 0.84, far: true },
];

/* Arcs de diffusion : Paris → monde (projection équirectangulaire 800×400) */
const PARIS = { lat: 48.8566, lng: 2.3522 };
const ARC_DESTS = [
  { lat: 40.71, lng: -74.0 },   // New York
  { lat: -23.55, lng: -46.63 }, // São Paulo
  { lat: 25.2, lng: 55.27 },    // Dubaï
  { lat: 35.68, lng: 139.69 },  // Tokyo
  { lat: 1.35, lng: 103.82 },   // Singapour
];
function proj(lat: number, lng: number) {
  return { x: (lng + 180) * (800 / 360), y: (90 - lat) * (400 / 180) };
}
function arcPath(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const s = proj(a.lat, a.lng);
  const e = proj(b.lat, b.lng);
  return `M ${s.x} ${s.y} Q ${(s.x + e.x) / 2} ${Math.min(s.y, e.y) - 55} ${e.x} ${e.y}`;
}

const INJECTED_STYLES = `
  .ch-root{position:relative;width:100vw;height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;
    background:#ffffff;color:${C.ink};font-family:var(--font-montserrat),'Montserrat',sans-serif;-webkit-font-smoothing:antialiased;perspective:1500px;}
  .ch-reveal{visibility:hidden;}
  .ch-static .ch-reveal{visibility:visible !important;opacity:1 !important;}
  .ch-num{font-variant-numeric:tabular-nums;}

  .ch-grain{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:50;opacity:.04;mix-blend-mode:multiply;
    background:url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%25" height="100%25" filter="url(%23n)"/></svg>');}
  .ch-grid{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.5;background-size:60px 60px;
    background-image:linear-gradient(to right, rgba(10,22,40,.05) 1px, transparent 1px),linear-gradient(to bottom, rgba(10,22,40,.05) 1px, transparent 1px);
    -webkit-mask-image:radial-gradient(ellipse at center, black 0%, transparent 70%);mask-image:radial-gradient(ellipse at center, black 0%, transparent 70%);}

  .ch-fixed-cta{position:absolute;top:24px;right:24px;z-index:80;display:inline-flex;align-items:center;gap:10px;padding:9px 9px 9px 20px;border-radius:50px;
    font-family:var(--font-montserrat),sans-serif;font-weight:700;font-size:.82rem;color:#fff;background:linear-gradient(180deg,${C.blue} 0%,${C.blueBright} 100%);
    box-shadow:0 6px 18px -4px rgba(0,85,254,.45);transition:transform .6s cubic-bezier(.32,.72,0,1),box-shadow .6s cubic-bezier(.32,.72,0,1);}
  .ch-fixed-cta .arr{width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.16);display:flex;align-items:center;justify-content:center;flex:none;
    transition:transform .6s cubic-bezier(.32,.72,0,1);}
  .ch-fixed-cta .arr svg{width:12px;height:12px;}
  .ch-fixed-cta:hover{transform:translateY(-2px);box-shadow:0 10px 24px -6px rgba(0,85,254,.55);}
  .ch-fixed-cta:hover .arr{transform:translate(1px,-1px) scale(1.05);}
  .ch-fixed-cta:active{transform:scale(.98);}

  .ch-hero-wrap{position:absolute;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
    width:100vw;padding:0 16px;will-change:transform;transform-style:preserve-3d;}
  .ch-tag1{font-size:clamp(2.6rem,8vw,6rem);font-weight:800;letter-spacing:-.02em;margin-bottom:.25rem;color:${C.ink};}
  .ch-tag2{font-size:clamp(2.6rem,8vw,6rem);font-weight:900;letter-spacing:-.03em;background:linear-gradient(96deg,${C.blueBright},${C.blue});
    -webkit-background-clip:text;background-clip:text;color:transparent;}

  .ch-card-layer{position:absolute;inset:0;z-index:20;display:flex;align-items:center;justify-content:center;pointer-events:none;perspective:1500px;}
  .ch-card{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;pointer-events:auto;width:92vw;height:92vh;border-radius:32px;
    background:linear-gradient(145deg,#0a2a8c 0%,#04081c 100%);
    box-shadow:0 40px 100px -20px rgba(0,0,0,.7),inset 0 1px 2px rgba(255,255,255,.14);
    border:1px solid rgba(255,255,255,.05);}
  @media(min-width:768px){.ch-card{width:85vw;height:85vh;border-radius:40px;}}
  .ch-sheen{position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:50;
    background:radial-gradient(800px circle at var(--mx,50%) var(--my,50%),rgba(120,170,255,.09) 0%,transparent 40%);mix-blend-mode:screen;}

  /* ----- La scène 3D (caméra) : téléphone + mur d'iPhones ----- */
  /* La perspective DOIT vivre sur un parent direct de l'élément incliné,
     sinon rotationX rend à plat (c'était le bug du tilt). */
  .cv-stage{position:absolute;inset:0;z-index:5;perspective:1100px;transform-style:preserve-3d;}
  .cv-scene{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
    transform-style:preserve-3d;will-change:transform;}
  /* Le rig porte l'échelle responsive : les offsets px des tuiles (±210/±355/±500)
     se réduisent proportionnellement, le mur tient sur petit écran. */
  .cv-rig{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;
    transform:scale(.6);transform-style:preserve-3d;}
  @media(min-width:480px){.cv-rig{transform:scale(.68);}}
  @media(min-width:768px){.cv-rig{transform:scale(.8);}}
  @media(min-width:1024px){.cv-rig{transform:scale(.94);}}
  .cv-phone-slot{position:relative;}

  /* Mur d'iPhones — même langage matériel que le téléphone central */
  .cv-tile{position:absolute;top:50%;left:50%;width:124px;height:256px;margin:-128px 0 0 -62px;border-radius:1.5rem;z-index:1;
    background:#111;
    box-shadow:inset 0 0 0 1.5px #3a4d6b,inset 0 0 0 4.5px #000,0 24px 48px -18px rgba(0,0,0,.75);}
  .cv-tile .t-screen{position:absolute;inset:4.5px;border-radius:1.2rem;overflow:hidden;background:#05060f;}
  .cv-tile .t-bg{position:absolute;inset:0;}
  .cv-tile .t-bg:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(4,6,14,.4),transparent 35%,rgba(4,6,14,.8));}
  .cv-tile .t-notch{position:absolute;top:4px;left:50%;transform:translateX(-50%);width:42px;height:11px;background:#000;border-radius:50px;z-index:3;}
  .cv-tile .t-plat{position:absolute;top:22px;left:9px;z-index:2;width:22px;height:22px;border-radius:6px;display:flex;align-items:center;justify-content:center;
    background:rgba(0,0,0,.45);color:#fff;border:1px solid rgba(255,255,255,.1);}
  .cv-tile .t-plat svg{width:11px;height:11px;}
  .cv-tile .t-live{position:absolute;top:28px;right:10px;z-index:2;width:5px;height:5px;border-radius:50%;background:${C.green};animation:chPulse 2.4s ease-in-out infinite;}
  .cv-tile .t-views{position:absolute;left:10px;bottom:34px;z-index:2;font-size:.72rem;font-weight:800;color:#fff;font-variant-numeric:tabular-nums;}
  .cv-tile .t-time{position:absolute;left:10px;bottom:19px;z-index:2;font-size:.46rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
    color:rgba(155,188,255,.65);font-family:var(--font-space-mono),monospace;}
  .cv-tile .t-bar{position:absolute;bottom:6px;left:50%;transform:translateX(-50%);width:46px;height:2.5px;background:rgba(255,255,255,.22);border-radius:50px;z-index:2;}
  @media(max-width:1023px){.cv-tile.far{display:none;}}

  .ch-phone{position:relative;width:280px;height:580px;border-radius:3rem;display:flex;flex-direction:column;z-index:8;
    will-change:transform;transform-style:preserve-3d;background:#111;
    box-shadow:inset 0 0 0 2px #3a4d6b,inset 0 0 0 7px #000,0 32px 64px -16px rgba(0,0,0,.75);}
  .ch-hw{position:absolute;background:linear-gradient(90deg,#404040,#171717);z-index:0;}
  .ch-screen{position:absolute;inset:7px;border-radius:2.5rem;overflow:hidden;color:#fff;z-index:10;background:#05060f;}
  .ch-glare{position:absolute;inset:0;z-index:40;pointer-events:none;background:linear-gradient(110deg,rgba(255,255,255,.06) 0%,rgba(255,255,255,0) 45%);}
  .ch-island{position:absolute;top:6px;left:50%;transform:translateX(-50%);width:96px;height:26px;background:#000;border-radius:50px;z-index:55;
    display:flex;align-items:center;justify-content:center;gap:6px;}
  .ch-island i{width:5px;height:5px;border-radius:50%;background:#ef4444;display:block;animation:chPulse 2s ease-in-out infinite;}
  @keyframes chPulse{0%,100%{opacity:1}50%{opacity:.35}}
  .ch-island span{font-size:.44rem;font-weight:700;color:rgba(252,165,165,.9);letter-spacing:.1em;text-transform:uppercase;font-family:var(--font-space-mono),monospace;}

  .ch-clipbg{position:absolute;inset:0;}
  .ch-clipbg:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,6,15,.45) 0%,transparent 28%,transparent 58%,rgba(5,6,15,.72) 100%);}
  .ch-platform{position:absolute;top:44px;left:16px;z-index:20;display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:50px;
    background:rgba(0,0,0,.38);border:1px solid rgba(255,255,255,.1);font-size:.52rem;font-weight:700;letter-spacing:.06em;color:rgba(255,255,255,.92);
    text-transform:uppercase;font-family:var(--font-space-mono),monospace;}
  .ch-platform svg{width:11px;height:11px;}
  .ch-viral{position:absolute;top:96px;left:50%;transform:translateX(-50%);z-index:20;display:flex;flex-direction:column;align-items:center;width:200px;}
  .ch-counter{font-size:2rem;font-weight:800;letter-spacing:-.02em;color:#fff;line-height:1;}
  .ch-views-lab{font-size:.46rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(155,188,255,.65);font-weight:700;margin-top:6px;font-family:var(--font-space-mono),monospace;white-space:nowrap;}
  .ch-spark-wrap{width:118px;height:30px;margin-top:10px;position:relative;}
  .ch-spark{fill:none;stroke:${C.green};stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:240;}
  .ch-spark-area{fill:url(#chSparkGrad);opacity:.18;}
  .ch-spark-dot{fill:${C.green};}
  .ch-trend{display:inline-flex;align-items:center;gap:5px;margin-top:8px;font-size:.5rem;font-weight:700;color:${C.green};font-family:var(--font-space-mono),monospace;}
  .ch-trend svg{width:10px;height:10px;}
  .ch-rail{position:absolute;right:14px;bottom:58px;display:flex;flex-direction:column;gap:16px;align-items:center;z-index:20;}
  .ch-rail .ic{display:flex;flex-direction:column;align-items:center;gap:3px;color:rgba(255,255,255,.92);}
  .ch-rail .ic svg{width:20px;height:20px;}
  .ch-rail .ic span{font-size:.5rem;color:rgba(255,255,255,.6);font-weight:700;font-family:var(--font-space-mono),monospace;}
  .ch-clipbar{position:absolute;left:16px;right:16px;bottom:42px;height:2px;border-radius:2px;background:rgba(255,255,255,.16);z-index:20;overflow:hidden;}
  .ch-clipbar i{position:absolute;left:0;top:0;bottom:0;width:38%;background:rgba(255,255,255,.75);border-radius:2px;}
  .ch-homebar{position:absolute;bottom:9px;left:50%;transform:translateX(-50%);width:110px;height:4px;background:rgba(255,255,255,.22);border-radius:50px;z-index:45;}

  /* ----- Carte du monde (partout) ----- */
  .cv-map{position:absolute;left:50%;bottom:-4%;transform:translateX(-50%);width:min(980px,92%);z-index:3;opacity:0;will-change:transform,opacity;}
  /* Mobile : la carte équirectangulaire serait illisible à 92% de 390px —
     on la laisse déborder (le ch-card est en overflow:hidden). */
  @media(max-width:767px){.cv-map{width:185%;bottom:0;}}
  .cv-map img{width:100%;height:auto;pointer-events:none;user-select:none;
    -webkit-mask-image:radial-gradient(ellipse at 50% 42%, #000 55%, transparent 78%);mask-image:radial-gradient(ellipse at 50% 42%, #000 55%, transparent 78%);}
  .cv-map svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
  .cv-arc{fill:none;stroke:#5e94ff;stroke-width:1.1;opacity:.9;}
  .cv-origin{fill:${C.orange};}
  .cv-dest{fill:#7aa8ff;}

  /* Texte overlay (accroche + marque) — mobile : en bas, au-dessus du scrubber */
  .cv-copy{position:absolute;left:18px;right:18px;bottom:88px;z-index:20;}
  .cv-copy h3{margin-bottom:.5rem;}
  .cv-copy p{font-size:.86rem;}
  @media(min-width:1024px){
    .cv-copy{left:clamp(20px,4.5vw,60px);right:auto;bottom:auto;top:50%;transform:translateY(-50%);max-width:300px;}
    .cv-copy h3{margin-bottom:1rem;}
    .cv-copy p{font-size:.98rem;}
  }
  .ch-eyebrow{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:50px;margin-bottom:14px;
    font-family:var(--font-space-mono),monospace;font-size:.56rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
    color:rgba(155,188,255,.85);background:rgba(120,170,255,.08);box-shadow:0 0 0 1px rgba(120,170,255,.18);}
  .cv-copy h3{color:#fff;font-size:clamp(1.4rem,2.4vw,2rem);font-weight:700;letter-spacing:-.02em;margin:0 0 1rem;}
  .cv-copy p{color:rgba(190,210,255,.65);font-size:.98rem;line-height:1.65;margin:0;}
  .cv-brand{position:absolute;right:clamp(20px,4.5vw,60px);top:50%;transform:translateY(-50%);z-index:20;display:none;}
  @media(min-width:1024px){.cv-brand{display:block;}}
  .cv-brand h2{font-size:clamp(3rem,7vw,5.5rem);font-weight:900;text-transform:uppercase;letter-spacing:-.04em;line-height:.9;margin:0;
    background:linear-gradient(180deg,#fff 0%,#9bbcff 100%);-webkit-background-clip:text;background-clip:text;color:transparent;
    writing-mode:vertical-rl;text-orientation:mixed;}

  /* CTA au climax — apparaît avec la carte du monde */
  .cv-cta{position:absolute;left:50%;transform:translateX(-50%);bottom:104px;z-index:35;
    display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;width:max-content;}
  /* Desktop : sous l'accroche, en conclusion de la colonne éditoriale gauche */
  @media(min-width:1024px){.cv-cta{left:clamp(20px,4.5vw,60px);transform:none;bottom:auto;top:calc(50% + 140px);
    align-items:flex-start;text-align:left;}}
  .cv-cta p{margin:0;font-size:.95rem;font-weight:600;color:rgba(190,210,255,.85);}
  .cv-cta-btn{display:inline-flex;align-items:center;gap:10px;padding:12px 12px 12px 26px;border-radius:50px;
    font-weight:700;font-size:.95rem;color:#fff;background:linear-gradient(180deg,${C.blue} 0%,${C.blueBright} 100%);
    box-shadow:0 8px 24px -6px rgba(0,85,254,.55),inset 0 1px 1px rgba(255,255,255,.3);
    transition:transform .6s cubic-bezier(.32,.72,0,1),box-shadow .6s cubic-bezier(.32,.72,0,1);}
  .cv-cta-btn .arr{width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.16);display:flex;align-items:center;justify-content:center;flex:none;
    transition:transform .6s cubic-bezier(.32,.72,0,1);}
  .cv-cta-btn .arr svg{width:13px;height:13px;}
  .cv-cta-btn:hover{transform:translateY(-2px);box-shadow:0 14px 30px -8px rgba(0,85,254,.65),inset 0 1px 1px rgba(255,255,255,.3);}
  .cv-cta-btn:hover .arr{transform:translate(1px,-1px) scale(1.05);}
  .cv-cta-btn:active{transform:scale(.98);}

  /* Scrubber (le « professionnalisé ») */
  .ch-montage{position:absolute;left:0;right:0;bottom:0;z-index:46;display:flex;align-items:center;gap:16px;
    padding:14px clamp(20px,4vw,52px) 18px;background:linear-gradient(180deg,rgba(4,8,28,0),rgba(4,8,28,.55));}
  .ch-mont-head{display:flex;align-items:center;gap:8px;white-space:nowrap;}
  .ch-mont-rec{width:7px;height:7px;border-radius:50%;background:#ff3b30;animation:chPulse 2s ease-in-out infinite;}
  .ch-mont-head span{font-family:var(--font-space-mono),monospace;font-size:.56rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(190,210,255,.7);}
  .ch-mont-shell{flex:1;padding:4px;border-radius:10px;background:rgba(255,255,255,.03);box-shadow:0 0 0 1px rgba(255,255,255,.06);}
  .ch-mont-track{position:relative;height:30px;border-radius:6px;overflow:hidden;background:rgba(255,255,255,.04);box-shadow:inset 0 1px 1px rgba(255,255,255,.05);}
  .ch-wave{position:absolute;inset:0;display:flex;align-items:center;gap:3px;padding:0 8px;opacity:.38;}
  .ch-wave i{flex:1;background:#7aa8ff;border-radius:1px;}
  .ch-cut{position:absolute;top:0;bottom:0;width:1px;background:rgba(255,255,255,.28);z-index:2;}
  .ch-playhead{position:absolute;top:0;bottom:0;left:0;width:1.5px;background:#fff;z-index:4;}
  .ch-playhead:before{content:"";position:absolute;top:0;left:-3.25px;border-style:solid;border-width:5px 4px 0 4px;border-color:#fff transparent transparent transparent;}
  .ch-mont-count{display:flex;flex-direction:column;align-items:flex-end;white-space:nowrap;min-width:96px;}
  .ch-mont-count b{font-size:.95rem;font-weight:800;color:#fff;line-height:1;font-variant-numeric:tabular-nums;}
  .ch-mont-count small{font-family:var(--font-space-mono),monospace;font-size:.5rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(155,188,255,.6);margin-top:4px;}
  @media(max-width:640px){.ch-mont-head span{display:none;}.ch-mont-count{min-width:72px;}}
`;

const CUT_POSITIONS = [16, 31, 48, 63, 79, 92];
/* Hauteurs arrondies à l'entier : des floats à pleine précision divergent
   entre SSR et CSSOM client (arrondi navigateur) → hydration mismatch. */
const WAVE_HEIGHTS = Array.from({ length: 72 }, (_, i) =>
  Math.round(Math.min(16 + Math.abs(Math.sin(i * 1.7) * 58) + (i % 5) * 4, 84))
);

export interface CinematicHeroV7Props {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  eyebrow?: string;
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

export default function CinematicHeroV7({
  brandName = "Clipeo",
  tagline1 = "Le clipping,",
  tagline2 = "professionnalisé.",
  eyebrow = "Agence de clipping",
  cardHeading = "Partout, tout le temps.",
  cardDescription = (
    <>
      L&apos;omniprésence sur le format court, pour faire travailler votre{" "}
      <span style={{ color: "#fff", fontWeight: 600 }}>contenu long</span>, pendant
      que vous créez le prochain.
    </>
  ),
  metricValue = 138_700_000,
  metricLabel = "vues · Charles & Mélanie",
  bookingHref = "/contact",
  showFixedCta = true,
}: CinematicHeroV7Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const clipCountRef = useRef<HTMLSpanElement>(null);
  const requestRef = useRef<number>(0);

  /* Carte pointillée — teinte claire pour fond bleu nuit */
  const mapSvg = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({ radius: 0.22, color: "#9bbcff2b", shape: "circle", backgroundColor: "transparent" });
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* ---- Mouvement réduit : état final figé ---- */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        containerRef.current?.classList.add("ch-static");
        if (counterRef.current) counterRef.current.textContent = formatViews(metricValue);
        if (clipCountRef.current) clipCountRef.current.textContent = "42";
        gsap.set(".ch-spark", { strokeDashoffset: 0 });
        gsap.set(".cv-tile", { autoAlpha: 1 });
        gsap.set(".cv-map", { autoAlpha: 0.85 });
        if (playheadRef.current) playheadRef.current.style.left = "100%";
        return () => containerRef.current?.classList.remove("ch-static");
      });

      /* ---- Expérience complète — paramètres adaptés mobile/desktop ---- */
      mm.add(
        {
          mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        },
        (mmCtx) => {
        const isMobile = !!(mmCtx.conditions as { mobile?: boolean }).mobile;
        const counterProxy = { v: 0 };
        const SCALE_FOCUS = isMobile ? 1.3 : 1.32; /* plan serré */
        const SCALE_WALL = 0.82;                   /* mur révélé */

        gsap.set(".ch-main-card", { y: () => window.innerHeight + 200, autoAlpha: 1 });
        gsap.set([".cv-copy", ".cv-brand", ".cv-cta", ".ch-montage"], { autoAlpha: 0 });
        /* transformOrigin posé UNE FOIS ici : le changer en cours de tween
           provoque un saut d'une frame (GSAP l'applique d'un coup, sans tween). */
        gsap.set(".cv-scene", { autoAlpha: 0, scale: SCALE_FOCUS, transformOrigin: "50% 65%" });
        gsap.set(".cv-tile", { autoAlpha: 0, scale: 0.85 });
        gsap.set(".cv-map", { autoAlpha: 0, y: 70 });
        gsap.set(".ch-spark", { strokeDashoffset: 240 });
        gsap.set(".cv-arc", { strokeDasharray: 1, strokeDashoffset: 1 });

        const introTl = gsap.timeline({ delay: 0.3 });
        introTl
          .from(".ch-text-track", { duration: 1.6, autoAlpha: 0, y: 48, ease: "expo.out" })
          .from(".ch-text-days", { duration: 1.3, clipPath: "inset(0 100% 0 0)", ease: "power4.inOut" }, "-=0.9");

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: isMobile ? "+=2400" : "+=3600",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: "labels",
              duration: { min: 0.2, max: 0.7 },
              ease: "power2.inOut",
              delay: 0.12,
            },
            onUpdate: (self) => {
              const p = self.progress;
              if (playheadRef.current) playheadRef.current.style.left = `${p * 100}%`;
              if (clipCountRef.current) clipCountRef.current.textContent = Math.round(p * 42).toString();
            },
          },
        });

        scrollTl
          .addLabel("ouverture")
          .to(".ch-grid", { scale: 1.12, opacity: 0.15, ease: "power2.inOut", duration: 2 }, 0)
          .to(".ch-hero-wrap", { scale: 1.1, opacity: 0.15, ease: "power2.inOut", duration: 2 }, 0)
          .to(".ch-main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
          .to(".ch-main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
          /* 1. Plan serré : le clip, le geste précis */
          .fromTo(".cv-scene",
            { autoAlpha: 0, y: 180, scale: SCALE_FOCUS + 0.1 },
            { autoAlpha: 1, y: 0, scale: SCALE_FOCUS, ease: "expo.out", duration: 2.2 }, "-=0.8")
          .fromTo(".ch-montage", { y: 44, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power3.out", duration: 1.4 }, "-=1.6")
          .to(".ch-spark", { strokeDashoffset: 0, duration: 2, ease: "power2.out" }, "-=1.0")
          .to(counterProxy, {
            v: metricValue, duration: 2, ease: "expo.out",
            onUpdate: () => { if (counterRef.current) counterRef.current.textContent = formatViews(counterProxy.v); },
          }, "<")
          .addLabel("focus")
          .to({}, { duration: 1.2 })
          /* 2. Le dézoom : la caméra recule, le mur s'allume */
          .to(".cv-scene", { scale: SCALE_WALL, ease: "power3.inOut", duration: 2.6 }, "dezoom")
          .fromTo(".cv-tile",
            { autoAlpha: 0, scale: (_i: number, el: Element) => Number((el as HTMLElement).dataset.s || 1) * 0.85 },
            {
              autoAlpha: 1,
              scale: (_i: number, el: Element) => Number((el as HTMLElement).dataset.s || 1),
              /* Mobile : écartement supplémentaire depuis le téléphone central (relatif) */
              x: (_i: number, el: Element) => (isMobile ? ((el as HTMLElement).dataset.side === "l" ? "-=40" : "+=40") : "+=0"),
              ease: "power3.out", duration: 1.1, stagger: { each: 0.14, from: "center" },
            },
            "dezoom+=0.7")
          .fromTo(".cv-copy", { x: -36, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power3.out", duration: 1.4 }, "dezoom+=1.2")
          .fromTo(".cv-brand", { x: 36, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power3.out", duration: 1.4 }, "<")
          .addLabel("omnipresence")
          .to({}, { duration: 1.4 })
          /* 3. Partout : la scène bascule en 3D (perspective sur .cv-stage) et le monde se révèle dessous */
          .to(".cv-scene", { rotationX: 16, y: () => -window.innerHeight * (isMobile ? 0.18 : 0.35), z: -160, scale: isMobile ? 0.8 : 0.52, ease: "power3.inOut", duration: 2.4 }, "monde")
          .to(".cv-map", { autoAlpha: 1, y: 0, ease: "power3.out", duration: 2 }, "monde+=0.4")
          .to(".cv-arc", { strokeDashoffset: 0, ease: "power2.inOut", duration: 1.6, stagger: 0.18 }, "monde+=1.0")
          .fromTo(".cv-cta", { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power3.out", duration: 1.4 }, "monde+=1.3")
          .addLabel("portee")
          .to({}, { duration: 1.8 })
          .addLabel("sortie")
          /* NE PAS fader .cv-scene : opacity<1 sur un parent preserve-3d aplatit
             la 3D d'un coup (spec CSS) → les translateZ des tuiles sautent en une
             frame. On déplace la scène, on fade ses ENFANTS (sans descendants 3D). */
          .to(".cv-scene", { y: "-=32", ease: "power3.in", duration: 1.2 }, "sortie")
          .to([".cv-tile", ".cv-phone-slot", ".cv-copy", ".cv-brand", ".cv-cta", ".cv-map", ".ch-montage"], {
            autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.02,
          }, "sortie")
          .to(".ch-main-card", { y: () => -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

        /* Mobile : l'accroche vit en bas, là où la carte se révèle — elle cède la place */
        if (isMobile) {
          scrollTl.to(".cv-copy", { autoAlpha: 0, ease: "power2.inOut", duration: 1.0 }, "monde+=0.2");
        }

        /* « Tout le temps » : les compteurs du mur vivent en continu */
        const tileViews = gsap.utils.toArray<HTMLElement>(".cv-tile .t-views");
        const life = window.setInterval(() => {
          const el = tileViews[Math.floor(Math.random() * tileViews.length)];
          if (el) {
            const cur = Number(el.dataset.v || 0) + (200 + Math.floor(Math.random() * 1800));
            el.dataset.v = String(cur);
            el.textContent = formatViews(cur);
          }
        }, 1500);

        /* Parallax souris sur la scène */
        const handleMouseMove = (e: MouseEvent) => {
          if (window.scrollY > window.innerHeight * 2.5) return;
          cancelAnimationFrame(requestRef.current);
          requestRef.current = requestAnimationFrame(() => {
            if (mainCardRef.current && sceneRef.current) {
              const rect = mainCardRef.current.getBoundingClientRect();
              mainCardRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
              mainCardRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
              const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
              gsap.to(".cv-phone-slot", { rotationY: xVal * 5, ease: "power3.out", duration: 1.2 });
            }
          });
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          cancelAnimationFrame(requestRef.current);
          window.clearInterval(life);
        };
        }
      );
    },
    { scope: containerRef, dependencies: [metricValue] }
  );

  return (
    <div ref={containerRef} className="ch-root">
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="ch-grain" aria-hidden="true" />
      <div className="ch-grid" aria-hidden="true" />

      {showFixedCta && (
        <Link href={bookingHref} className="ch-fixed-cta">
          Réserver un audit
          <span className="arr" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      )}

      <div className="ch-hero-wrap">
        <h1 className="ch-text-track ch-tag1">{tagline1}</h1>
        <p className="ch-text-days ch-tag2">{tagline2}</p>
      </div>

      <div className="ch-card-layer">
        <div ref={mainCardRef} className="ch-main-card ch-card ch-reveal">
          <div className="ch-sheen" aria-hidden="true" />

          {/* Carte du monde (révélée au chapitre « monde ») */}
          <div className="cv-map" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(mapSvg)}`} alt="" draggable={false} />
            <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
              {ARC_DESTS.map((d, i) => (
                <path key={i} className="cv-arc" pathLength={1} d={arcPath(PARIS, d)} />
              ))}
              <circle className="cv-origin" cx={proj(PARIS.lat, PARIS.lng).x} cy={proj(PARIS.lat, PARIS.lng).y} r="4" />
              {ARC_DESTS.map((d, i) => {
                const p = proj(d.lat, d.lng);
                return <circle key={`d-${i}`} className="cv-dest" cx={p.x} cy={p.y} r="2.6" />;
              })}
            </svg>
          </div>

          {/* LA SCÈNE : téléphone + mur d'iPhones (perspective portée par .cv-stage) */}
          <div className="cv-stage">
          <div ref={sceneRef} className="cv-scene">
          <div className="cv-rig">
            {WALL_TILES.map((t, i) => (
              <div
                key={i}
                className={`cv-tile${t.far ? " far" : ""}`}
                aria-hidden="true"
                data-s={t.s}
                data-side={t.x < 0 ? "l" : "r"}
                style={{
                  transform: `translate3d(${t.x}px, ${t.y}px, ${t.z}px) scale(${t.s})`,
                  filter: `brightness(${0.62 + t.s * 0.25})`,
                }}
              >
                <div className="t-screen">
                  <div className="t-bg" style={{ background: `radial-gradient(120% 80% at 50% 0%, rgba(10,99,255,${0.12 + (i % 3) * 0.07}), transparent 60%), linear-gradient(180deg,#0a1430,#060a18)` }} />
                  <div className="t-notch" />
                  <div className="t-plat"><PlatformLogo name={t.plat} /></div>
                  <i className="t-live" />
                  <div className="t-views ch-num" data-v={t.views}>{formatViews(t.views)}</div>
                  <div className="t-time">Publié · {t.time}</div>
                  <div className="t-bar" />
                </div>
              </div>
            ))}

            <div className="cv-phone-slot">
              <div className="ch-phone">
                <div className="ch-hw" style={{ top: 120, left: -3, width: 3, height: 25, borderRadius: "3px 0 0 3px" }} aria-hidden="true" />
                <div className="ch-hw" style={{ top: 160, left: -3, width: 3, height: 45, borderRadius: "3px 0 0 3px" }} aria-hidden="true" />
                <div className="ch-hw" style={{ top: 220, left: -3, width: 3, height: 45, borderRadius: "3px 0 0 3px" }} aria-hidden="true" />
                <div className="ch-hw" style={{ top: 170, right: -3, width: 3, height: 70, borderRadius: "0 3px 3px 0" }} aria-hidden="true" />

                <div className="ch-screen">
                  <div className="ch-glare" aria-hidden="true" />
                  <div className="ch-island"><i /><span>Live</span></div>
                  <div className="ch-clipbg" style={{ background: "radial-gradient(120% 80% at 50% 0%, rgba(10,99,255,.3), transparent 60%), linear-gradient(180deg,#0b1d4d,#070a1f)" }} aria-hidden="true" />
                  <div className="ch-platform"><PlatformLogo name="tiktok" /> TikTok</div>
                  <div className="ch-viral">
                    <div className="ch-counter ch-num"><span ref={counterRef}>0</span></div>
                    <div className="ch-views-lab">{metricLabel}</div>
                    <div className="ch-spark-wrap">
                      <svg width="118" height="30" viewBox="0 0 128 34" fill="none" aria-hidden="true">
                        <defs>
                          <linearGradient id="chSparkGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={C.green} />
                            <stop offset="100%" stopColor={C.green} stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path className="ch-spark-area" d="M2,30 L20,27 L40,29 L58,19 L78,22 L98,10 L126,3 L126,34 L2,34 Z" />
                        <path className="ch-spark" d="M2,30 L20,27 L40,29 L58,19 L78,22 L98,10 L126,3" />
                        <circle className="ch-spark-dot" cx="126" cy="3" r="2.5" />
                      </svg>
                    </div>
                    <div className="ch-trend"><IconTrendUp /> +1,2 M aujourd&apos;hui</div>
                  </div>
                  <div className="ch-rail" aria-hidden="true">
                    <div className="ic"><IconHeart /><span>184K</span></div>
                    <div className="ic"><IconComment /><span>2 312</span></div>
                    <div className="ic"><IconShare /></div>
                  </div>
                  <div className="ch-clipbar" aria-hidden="true"><i /></div>
                  <div className="ch-homebar" />
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>

          {/* ACCROCHE (gauche) + MARQUE (droite, verticale) */}
          <div className="cv-copy">
            <span className="ch-eyebrow">{eyebrow}</span>
            <h3>{cardHeading}</h3>
            <p>{cardDescription}</p>
          </div>
          <div className="cv-brand" aria-hidden="true">
            <h2>{brandName}</h2>
          </div>

          {/* CTA AU CLIMAX — révélé avec la carte du monde */}
          <div className="cv-cta">
            <p>C&apos;est ce qu&apos;on fait.</p>
            <Link href={bookingHref} className="cv-cta-btn">
              Réserver un audit
              <span className="arr" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>

          {/* SCRUBBER DE MONTAGE */}
          <div className="ch-montage" aria-hidden="true">
            <div className="ch-mont-head"><span className="ch-mont-rec" /><span>Montage · 48:12</span></div>
            <div className="ch-mont-shell">
              <div className="ch-mont-track">
                <div className="ch-wave">
                  {WAVE_HEIGHTS.map((h, i) => (
                    <i key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
                {CUT_POSITIONS.map((p) => (
                  <div key={p} className="ch-cut" style={{ left: `${p}%` }} />
                ))}
                <div ref={playheadRef} className="ch-playhead" style={{ left: "0%" }} />
              </div>
            </div>
            <div className="ch-mont-count">
              <b className="ch-num"><span ref={clipCountRef}>0</span> clips</b>
              <small>extraits</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
