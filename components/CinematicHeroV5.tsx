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
 *  Cinematic Hero — adapté à la niche Clipeo (agence de clipping).
 *  Self-contained : aucune dépendance Tailwind. Tous les styles sont
 *  injectés et namespacés `ch-*` pour ne pas entrer en collision avec
 *  le design system global (.btn, .hero, .container, .grad…).
 *  Seule dépendance externe : gsap + ScrollTrigger.
 * ------------------------------------------------------------------ */

const C = {
  blue: "#55a4d1",
  blueBright: "#3d86bd",
  orange: "#ff6a3d",
  ink: "#0a1240",
};

const INJECTED_STYLES = `
  .ch-root{
    position:relative;width:100vw;height:100vh;overflow:hidden;
    display:flex;align-items:center;justify-content:center;
    background:#ffffff;color:${C.ink};
    font-family:var(--font-montserrat),'Montserrat',sans-serif;
    -webkit-font-smoothing:antialiased;perspective:1500px;
  }
  .ch-reveal{visibility:hidden;}
  /* Fallback mouvement réduit : tout devient visible, état final figé */
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

  /* Persistent CTA — toujours visible pour ne pas casser la conversion */
  .ch-fixed-cta{
    position:absolute;top:24px;right:24px;z-index:80;
    display:inline-flex;align-items:center;gap:8px;
    padding:11px 20px;border-radius:50px;
    font-family:var(--font-montserrat),sans-serif;font-weight:700;font-size:.82rem;
    color:#fff;background:linear-gradient(180deg,${C.blue} 0%,${C.blueBright} 100%);
    box-shadow:0 6px 18px -4px rgba(61,134,189,.55),inset 0 1px 1px rgba(255,255,255,.4);
    transition:transform .35s cubic-bezier(.25,1,.5,1),box-shadow .35s;
  }
  .ch-fixed-cta:hover{transform:translateY(-2px);box-shadow:0 12px 26px -6px rgba(61,134,189,.7),inset 0 1px 1px rgba(255,255,255,.4);}

  /* HERO TEXT (sur fond blanc) */
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
    filter:drop-shadow(0 10px 20px rgba(61,134,189,.18));
  }

  /* CARTE PREMIUM (bleu profond) */
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
    background:radial-gradient(800px circle at var(--mx,50%) var(--my,50%),rgba(120,170,255,.12) 0%,transparent 40%);
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
    background:linear-gradient(180deg,#fff 0%,#9bbcff 100%);
    -webkit-background-clip:text;background-clip:text;color:transparent;
    filter:drop-shadow(0 12px 24px rgba(0,0,0,.6));
  }

  .ch-mockup-cell{order:2;position:relative;width:100%;height:380px;display:flex;align-items:center;justify-content:center;z-index:10;perspective:1000px;}
  @media(min-width:1024px){.ch-mockup-cell{order:2;height:600px;}}
  .ch-mockup-scale{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;transform:scale(.65);}
  @media(min-width:768px){.ch-mockup-scale{transform:scale(.85);}}
  @media(min-width:1024px){.ch-mockup-scale{transform:scale(1);}}

  .ch-phone{
    position:relative;width:280px;height:580px;border-radius:3rem;display:flex;flex-direction:column;
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
    position:absolute;top:5px;left:50%;transform:translateX(-50%);width:100px;height:28px;background:#000;border-radius:50px;z-index:50;
    display:flex;align-items:center;justify-content:flex-end;padding:0 12px;
  }
  .ch-island i{width:6px;height:6px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px rgba(34,197,94,.8);display:block;}

  /* Faux clip vertical (le produit Clipeo) */
  .ch-clip{position:absolute;inset:0;background:
      radial-gradient(120% 80% at 50% 0%,rgba(85,164,209,.35),transparent 60%),
      linear-gradient(180deg,#080151 0%,#070a1f 100%);}
  .ch-clip-play{
    position:absolute;top:42%;left:50%;transform:translate(-50%,-50%);width:54px;height:54px;border-radius:50%;
    background:rgba(255,255,255,.14);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;
    border:1px solid rgba(255,255,255,.25);box-shadow:0 8px 24px rgba(0,0,0,.5);
  }
  .ch-clip-play:after{content:"";border-style:solid;border-width:9px 0 9px 15px;border-color:transparent transparent transparent #fff;margin-left:3px;}
  .ch-views{position:absolute;top:46px;left:50%;transform:translateX(-50%);text-align:center;z-index:20;}
  .ch-counter{font-size:2rem;font-weight:800;letter-spacing:-.03em;color:#fff;text-shadow:0 4px 18px rgba(0,0,0,.6);line-height:1;}
  .ch-views-lab{font-size:.5rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(155,188,255,.7);font-weight:700;margin-top:4px;font-family:var(--font-space-mono),monospace;}
  .ch-clip-meta{position:absolute;left:14px;right:60px;bottom:54px;z-index:20;}
  .ch-handle{display:flex;align-items:center;gap:8px;margin-bottom:8px;}
  .ch-handle .av{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,${C.orange},#ff8a63);border:1.5px solid #fff;}
  .ch-handle b{font-size:.72rem;font-weight:700;}
  .ch-caption{font-size:.66rem;line-height:1.35;color:rgba(255,255,255,.82);}
  .ch-rail{position:absolute;right:12px;bottom:54px;display:flex;flex-direction:column;gap:14px;align-items:center;z-index:20;}
  .ch-rail .ic{width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:13px;}
  .ch-rail .ic span{font-size:8px;position:absolute;margin-top:34px;color:rgba(255,255,255,.7);font-weight:700;}
  .ch-platform{position:absolute;top:42px;left:14px;z-index:20;display:inline-flex;align-items:center;gap:5px;
    padding:5px 10px;border-radius:50px;background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.12);
    font-size:.55rem;font-weight:700;letter-spacing:.04em;}
  .ch-homebar{position:absolute;bottom:8px;left:50%;transform:translateX(-50%);width:120px;height:4px;background:rgba(255,255,255,.25);border-radius:50px;z-index:30;}

  /* Badges flottants en verre */
  .ch-badge{
    position:absolute;display:flex;align-items:center;gap:.75rem;z-index:30;padding:.85rem 1rem;border-radius:1rem;
    background:linear-gradient(135deg,rgba(255,255,255,.1) 0%,rgba(255,255,255,.02) 100%);
    backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
    box-shadow:0 0 0 1px rgba(255,255,255,.1),0 25px 50px -12px rgba(0,0,0,.7),inset 0 1px 1px rgba(255,255,255,.2);
  }
  .ch-badge .ico{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem;
    background:linear-gradient(to bottom,rgba(85,164,209,.25),rgba(4,10,40,.1));border:1px solid rgba(120,170,255,.3);}
  .ch-badge p{margin:0;}
  .ch-badge .t{color:#fff;font-size:.8rem;font-weight:700;}
  .ch-badge .s{color:rgba(155,188,255,.6);font-size:.68rem;font-weight:500;}
  .ch-badge-tl{top:1rem;left:-15px;}
  .ch-badge-br{bottom:2.5rem;right:-15px;}
  @media(min-width:1024px){.ch-badge-tl{top:2.5rem;left:-80px;}.ch-badge-br{bottom:4rem;right:-80px;}}

  /* Texte gauche (accroche carte) */
  .ch-left-cell{order:3;display:flex;flex-direction:column;justify-content:center;text-align:center;z-index:20;width:100%;padding:0 1rem;}
  @media(min-width:1024px){.ch-left-cell{order:1;text-align:left;padding:0;}}
  .ch-left-cell h3{color:#fff;font-size:clamp(1.5rem,4vw,2.25rem);font-weight:700;letter-spacing:-.02em;margin:0;}
  @media(min-width:1024px){.ch-left-cell h3{margin-bottom:1.25rem;}}
  .ch-left-cell p{display:none;color:rgba(190,210,255,.7);font-size:clamp(.9rem,1.6vw,1.1rem);line-height:1.6;max-width:24rem;margin:0 auto;}
  @media(min-width:768px){.ch-left-cell p{display:block;}}
  @media(min-width:1024px){.ch-left-cell p{margin:0;max-width:none;}}

  .ch-progress-ring{transform:rotate(-90deg);transform-origin:center;stroke-dasharray:402;stroke-dashoffset:402;stroke-linecap:round;}
`;

export interface CinematicHeroV5Props {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  bookingHref?: string;
  /** CTA fixe en haut à droite. À désactiver si un Nav global porte déjà un CTA permanent. */
  showFixedCta?: boolean;
}

function formatViews(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".", ",") + " M";
  if (n >= 1_000) return Math.round(n / 1_000) + " K";
  return Math.round(n).toString();
}

export default function CinematicHeroV5({
  brandName = "Clipeo",
  tagline1 = "Votre contenu long,",
  tagline2 = "partout, tout le temps.",
  cardHeading = "Le clipping, industrialisé.",
  cardDescription = (
    <>
      <span style={{ color: "#fff", fontWeight: 600 }}>Clipeo</span> transforme votre
      contenu long en clips courts pensés pour la viralité, publiés en continu par un
      réseau de clippers sur TikTok, Shorts, Reels et Twitch.
    </>
  ),
  metricValue = 2_400_000,
  metricLabel = "vues générées",
  bookingHref = "/contact",
  showFixedCta = true,
}: CinematicHeroV5Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const requestRef = useRef<number>(0);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Parallax souris (désactivé en mouvement réduit)
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
          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [prefersReduced]);

  // Timeline cinématique au scroll — useGSAP (useLayoutEffect) : le ScrollTrigger
  // de la hero doit être créé AVANT ceux des sections en dessous (ordre du DOM),
  // sinon leurs coordonnées ignorent le spacer du pin de la hero.
  useGSAP(() => {
    if (prefersReduced) {
      // État final figé, lisible, sans scroll-jacking
      containerRef.current?.classList.add("ch-static");
      if (counterRef.current) counterRef.current.textContent = formatViews(metricValue);
      gsap.set(".ch-progress-ring", { strokeDashoffset: 60 });
      return;
    }

    const counterProxy = { v: 0 };

    const ctx = gsap.context(() => {
      gsap.set(".ch-main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".ch-left", ".ch-right", ".ch-mockup-wrap", ".ch-badge", ".ch-widget"], { autoAlpha: 0 });

      // Intro en `from()` : les taglines sont visibles par défaut et animées depuis
      // un état masqué (fail-open — si le JS ne tourne pas, la phrase reste affichée).
      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .from(".ch-text-track", { duration: 1.8, autoAlpha: 0, y: 60, scale: 0.85, rotationX: -20, ease: "expo.out" })
        .from(".ch-text-days", { duration: 1.4, clipPath: "inset(0 100% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1850",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
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
        .fromTo(".ch-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".ch-progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(counterProxy, {
          v: metricValue,
          duration: 2,
          ease: "expo.out",
          onUpdate: () => {
            if (counterRef.current) counterRef.current.textContent = formatViews(counterProxy.v);
          },
        }, "-=2.0")
        .fromTo(".ch-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".ch-left", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".ch-right", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        // L'animation se termine sur son CLIMAX (téléphones + chiffres affichés). Aucune
        // sortie, aucun écran de texte après : on enchaîne directement sur la section
        // « L'agence de clipping n°1 en France » qui prend la place de l'ancien écran de fin.
        .to({}, { duration: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, { dependencies: [metricValue, prefersReduced] });

  return (
    <div ref={containerRef} className="ch-root">
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="ch-grain" aria-hidden="true" />
      <div className="ch-grid" aria-hidden="true" />

      {/* CTA persistant — la conversion reste toujours accessible */}
      {showFixedCta && (
        <Link href={bookingHref} className="ch-fixed-cta">
          Réserver un audit
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}

      {/* HERO TEXT */}
      <div className="ch-hero-wrap">
        <h1 className="ch-text-track ch-tag1">{tagline1}</h1>
        <p className="ch-text-days ch-tag2">{tagline2}</p>
      </div>


      {/* CARTE PREMIUM */}
      <div className="ch-card-layer">
        <div ref={mainCardRef} className="ch-main-card ch-card ch-reveal">
          <div className="ch-sheen" aria-hidden="true" />
          <div className="ch-grid-inner">

            {/* BRAND */}
            <div className="ch-right ch-reveal ch-brand-cell">
              <h2 className="ch-brand">{brandName}</h2>
            </div>

            {/* MOCKUP IPHONE + CLIP VERTICAL */}
            <div className="ch-mockup-wrap ch-mockup-cell">
              <div className="ch-mockup-scale">
                <div ref={mockupRef} className="ch-phone">
                  <div className="ch-hw" style={{ top: 120, left: -3, width: 3, height: 25, borderRadius: "3px 0 0 3px" }} aria-hidden="true" />
                  <div className="ch-hw" style={{ top: 160, left: -3, width: 3, height: 45, borderRadius: "3px 0 0 3px" }} aria-hidden="true" />
                  <div className="ch-hw" style={{ top: 220, left: -3, width: 3, height: 45, borderRadius: "3px 0 0 3px" }} aria-hidden="true" />
                  <div className="ch-hw" style={{ top: 170, right: -3, width: 3, height: 70, borderRadius: "0 3px 3px 0" }} aria-hidden="true" />

                  <div className="ch-screen">
                    <div className="ch-glare" aria-hidden="true" />
                    <div className="ch-island"><i className="ch-widget" /></div>

                    {/* Le clip */}
                    <div className="ch-clip" aria-hidden="true" />
                    <div className="ch-platform ch-widget">▶ TikTok</div>
                    <div className="ch-views ch-widget">
                      <div className="ch-counter"><span ref={counterRef}>0</span></div>
                      <div className="ch-views-lab">{metricLabel}</div>
                    </div>
                    <div className="ch-clip-play ch-widget" aria-hidden="true" />

                    <div className="ch-clip-meta ch-widget">
                      <div className="ch-handle"><span className="av" /><b>@votremarque</b></div>
                      <p className="ch-caption">Le moment qui a fait 2 M de vues 🔥 #clip</p>
                    </div>
                    <div className="ch-rail ch-widget" aria-hidden="true">
                      <div className="ch-rail-i ic">❤️<span>184K</span></div>
                      <div className="ch-rail-i ic">💬<span>2 312</span></div>
                      <div className="ch-rail-i ic">↗</div>
                    </div>
                    <div className="ch-homebar" />
                  </div>
                </div>

                {/* Badges */}
                <div className="ch-badge ch-badge-tl">
                  <div className="ico">📈</div>
                  <div>
                    <p className="t">+500 M vues</p>
                    <p className="s">Portée délivrée</p>
                  </div>
                </div>
                <div className="ch-badge ch-badge-br">
                  <div className="ico">🎬</div>
                  <div>
                    <p className="t">+5,1 K clips</p>
                    <p className="s">Réseau de clippers</p>
                  </div>
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
