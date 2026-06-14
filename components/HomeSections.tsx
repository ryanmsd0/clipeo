"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowR, Check, CheckCircle } from "@/components/Icons";
import CinematicHeroV6 from "@/components/CinematicHeroV6";
import ProcessSticky from "@/components/ProcessSticky";
import BorderGlow from "@/components/BorderGlow";
import ClaimHero from "@/components/ClaimHero";
import { TRUST_BAR } from "@/lib/site";

export default function HomeSections() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanups: Array<() => void> = [];
    // reveal + stagger + compteurs sont gérés globalement par <ScrollFX/>

    // narrative tabs
    root.querySelectorAll<HTMLElement>(".narr-tab").forEach((tab) => {
      const handler = () => {
        const id = tab.dataset.nt;
        root.querySelectorAll(".narr-tab").forEach((t) => t.classList.toggle("active", t === tab));
        root.querySelectorAll<HTMLElement>(".narr-body").forEach((b) => b.classList.toggle("active", b.dataset.nb === id));
      };
      tab.addEventListener("click", handler);
      cleanups.push(() => tab.removeEventListener("click", handler));
    });

    // Spline différé
    const f = root.querySelector<HTMLIFrameElement>("#aura-spline");
    if (f && f.dataset.spline) {
      const load = () => {
        f.src = f.dataset.spline as string;
      };
      const idle = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 250));
      if (document.readyState === "complete") idle(load);
      else window.addEventListener("load", () => idle(load));
    }

    // (globe MapLibre remplacé par <WorldMap/>)

    // Carte qui suit le curseur sur « Pour qui on travaille »
    const whoList = root.querySelector<HTMLElement>("[data-who-list]");
    const follow = root.querySelector<HTMLElement>("[data-who-follow]");
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (whoList && follow && canHover) {
      const followImg = follow.querySelector("img") as HTMLImageElement | null;
      const followViews = follow.querySelector(".who-follow-views") as HTMLElement | null;
      const followClips = follow.querySelector(".who-follow-clips") as HTMLElement | null;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, active = false;

      const render = () => {
        const ease = reduce ? 1 : 0.16;
        cx += (tx - cx) * ease;
        cy += (ty - cy) * ease;
        follow.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
        if (active || Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) {
          raf = requestAnimationFrame(render);
        } else {
          raf = 0;
        }
      };
      const onMove = (e: MouseEvent) => {
        tx = e.clientX; ty = e.clientY;
        if (!active) {
          active = true;
          // place instantanément sous le curseur la première fois (pas de vol depuis le coin)
          if (cx === 0 && cy === 0) { cx = tx; cy = ty; }
          follow.classList.add("on");
        }
        if (!raf) raf = requestAnimationFrame(render);
      };
      const onLeave = () => {
        active = false;
        follow.classList.remove("on");
      };
      const rows = Array.from(whoList.querySelectorAll<HTMLElement>(".who-row"));
      const rowHandlers = rows.map((rowEl) => {
        const h = () => {
          const cover = rowEl.dataset.cover;
          if (cover && followImg && followImg.getAttribute("src") !== cover) followImg.src = cover;
          if (followViews) followViews.textContent = rowEl.dataset.views || "";
          if (followClips) followClips.textContent = rowEl.dataset.clips || "";
        };
        rowEl.addEventListener("mouseenter", h);
        return () => rowEl.removeEventListener("mouseenter", h);
      });

      whoList.addEventListener("mousemove", onMove);
      whoList.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        whoList.removeEventListener("mousemove", onMove);
        whoList.removeEventListener("mouseleave", onLeave);
        rowHandlers.forEach((c) => c());
        if (raf) cancelAnimationFrame(raf);
      });
    }

    return () => {
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <div ref={rootRef}>
      {/* HERO — expérience cinématique V6 (le Nav global porte déjà le CTA permanent) */}
      <div id="top">
        <CinematicHeroV6 showFixedCta={false} tagline1="Votre contenu long," tagline2="partout, tout le temps." />
      </div>

      {/* AFFIRMATION DE POSITIONNEMENT — « n°1 en France » */}
      <ClaimHero />

      {/* TRUST BAR — marques clientes, cliquables vers les études de cas */}
      <div className="logos">
        <span className="mono-label">+500 M de vues générées pour eux</span>
        <div className="mq"><div className="mq-track">
          {[...Array(2)].map((_, k) => (
            <span key={k} style={{ display: "contents" }}>
              {TRUST_BAR.map((c) => (
                <Link href="/etudes-de-cas" key={`${k}-${c.name}`} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt="" aria-hidden="true" width={28} height={28} loading="lazy" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", flex: "none", border: "1.5px solid #fff", boxShadow: "0 2px 8px rgba(10,22,40,.18)" }} />
                  <span>{c.name}</span>
                </Link>
              ))}
            </span>
          ))}
        </div></div>
      </div>

      {/* PROCESS */}
      <section className="sec" id="process">
        <div className="container">
          <div className="sec-head reveal">
            <h2>Le clipping, <span className="grad">à grande échelle.</span></h2>
            <p>Notre méthode en <b>3 grandes étapes</b>.</p>
          </div>
          <ProcessSticky />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="sec" id="comment">
        <div className="container">
          <div className="sec-head reveal">
            <h2>Le processus<br /><span className="grad">d&apos;omniprésence.</span></h2>
            <p>Vous occupez la For You Page de votre audience par la répétition. Plus votre marque y apparaît, plus elle s&apos;ancre, jusqu&apos;à la redirection naturelle vers votre contenu long.</p>
          </div>
          <div className="omni-steps stagger">
            <div className="omni-step">
              <div className="omni-node"><svg viewBox="0 0 24 24"><path d="M17 2l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg></div>
              <span className="omni-ix">Étape 01</span>
              <h3>Répétition</h3>
              <p>Vos clips reviennent plusieurs fois par jour dans la For You Page de votre cible, sur des dizaines de comptes, jour après jour.</p>
            </div>
            <div className="omni-step">
              <div className="omni-node"><svg viewBox="0 0 24 24"><path d="M9.5 2a4.5 4.5 0 0 0-4.5 4.5c0 .5-.3 1-.7 1.4A4 4 0 0 0 6 15a3.5 3.5 0 0 0 7 0V6.5A4.5 4.5 0 0 0 9.5 2z" /><path d="M14.5 2A4.5 4.5 0 0 1 19 6.5c0 .5.3 1 .7 1.4A4 4 0 0 1 18 15a3.5 3.5 0 0 1-7 0" /></svg></div>
              <span className="omni-ix">Étape 02</span>
              <h3>Mémorisation</h3>
              <p>À force de revoir le même visage, votre marque s&apos;ancre durablement dans l&apos;esprit de l&apos;audience.</p>
            </div>
            <div className="omni-step">
              <div className="omni-node"><svg viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg></div>
              <span className="omni-ix">Étape 03</span>
              <h3>Confiance</h3>
              <p>La familiarité crée la confiance&nbsp;: un lien s&apos;installe, et le spectateur passif devient abonné ou client.</p>
            </div>
            <div className="omni-step">
              <div className="omni-node"><svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="3" /><path d="m10 9 5 3-5 3z" /></svg></div>
              <span className="omni-ix">Étape 04</span>
              <h3>Redirection</h3>
              <p>L&apos;audience se redirige naturellement vers votre contenu long&nbsp;: chaîne, podcast, film, live.</p>
            </div>
          </div>

          <div className="omni-rule reveal">
            <span className="mono-label">La règle d&apos;or</span>
            <p>Mieux vaut être vu <b className="grad">10 fois par 1 million</b> de personnes qu&apos;<span className="omni-dim">une fois par 10 millions</span>.</p>
          </div>

          <div className="how-btns reveal" style={{ justifyContent: "center", marginTop: 32 }}>
            <Link href="/etudes-de-cas" className="btn btn-sky"><span>Voir les études de cas</span></Link>
            <Link href="/blog" className="btn"><span>C&apos;est quoi le clipping ?</span></Link>
          </div>
        </div>
      </section>

      {/* PRICING — LE MODÈLE CPM GARANTI */}
      <section className="sec" id="tarification">
        <div className="container">
          <div className="sec-head reveal">
            <h2>Vous payez les vues.<br />Pas l&apos;effort.</h2>
            <p>Grâce à notre modèle CPM, <b>vous ne prenez aucun risque</b> : soit on atteint l&apos;objectif, soit on vous rembourse la différence.</p>
          </div>
          <div className="research-grid pricing-grid stagger">
            {[
              { v: "01", cls: "grad", t: "Objectif et Engagement", p: "Un volume de vues est garanti à l'avance grâce à notre modèle CPM (coût pour 1000 vues). Aucun hasard." },
              { v: "02", cls: "grad", t: "Distribution et Tracking", p: "On construit votre omniprésence sur le format court. Vous recevez vos millions de vues, plus la surperformance." },
              { v: "03", cls: "grad", t: "Performance et Reporting", p: "Vous recevez un rapport détaillé en fin de campagne. Vous savez ce qui a fonctionné, et pourquoi." },
            ].map((c) => (
              <BorderGlow key={c.v}>
                <div className="rc" style={{ background: "transparent", border: "none", boxShadow: "none", transform: "none" }}>
                  <div className={`v ${c.cls}`}>{c.v}</div>
                  <div className="t">{c.t}</div>
                  <p>{c.p}</p>
                </div>
              </BorderGlow>
            ))}
          </div>
          <div className="cta-sec" style={{ padding: "34px 0 0" }}>
            <div style={{ textAlign: "center" }}>
              <Link href="/contact" className="btn btn-primary"><span>Réserver mon audit gratuit</span><ArrowR /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHO — Pour qui on travaille */}
      <section className="global" id="pour-qui">
        <div className="container">
          <div className="sec-head left reveal pull-left" style={{ marginTop: 0, marginBottom: 30 }}>
            <h2>Pour qui on <span className="blue">travaille</span></h2>
            <p>Créateurs, marques, podcasts, cinéma, Twitch : si votre croissance passe par le format court, c&apos;est pour vous.</p>
          </div>
          <div className="who-list stagger pull-left" data-who-list>
            {[
              // cover = visuel de campagne ; stats = brouillons à faire valider par Clipeo
              { ix: "01", name: "Créateurs YouTube", cover: "Charles_et_Melanie", client: "Charles et Mélanie", views: "+138,7 M", clips: "1 294" },
              { ix: "02", name: "Marques & grands comptes", cover: "La_Marine_Nationale", client: "La Marine Nationale", views: "+12,4 M", clips: "164" },
              { ix: "03", name: "Podcasts", cover: "Kyan_Khojandi", client: "Kyan Khojandi", views: "+23,2 M", clips: "244" },
              { ix: "04", name: "Cinéma & sorties", cover: "Film_Plus_Fort_que_Moi", client: "Plus Fort que Moi", views: "+43,7 M", clips: "457" },
              { ix: "05", name: "Émissions & Twitch", cover: "Zebro_et_Leow", client: "Zebro & Leow", views: "+18,4 M", clips: "194" },
              { ix: "06", name: "Événements", cover: "Crunch_Creator", client: "Crunch Creator", views: "+36,2 M", clips: "367" },
            ].map((w) => (
              <Link
                href="/pour-qui"
                className="who-row"
                key={w.ix}
                data-cover={`/img/Clipeo%20covers%20campagnes/${w.cover}.png`}
                data-client={w.client}
                data-views={w.views}
                data-clips={w.clips}
              >
                <span className="ix">{w.ix}</span>
                <span className="name">{w.name}</span>
                <span className="view">Voir les campagnes <ArrowR /></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Carte qui suit le curseur — cover de campagne + stats du créateur survolé */}
        <div className="who-follow" data-who-follow aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" width={320} height={180} />
          <span className="who-follow-cap">
            <span className="wf-stat"><b className="who-follow-views"></b><i>vues générées</i></span>
            <span className="wf-stat"><b className="who-follow-clips"></b><i>clips produits</i></span>
          </span>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec" id="faq">
        <div className="container">
          <div className="sec-head reveal">
            <h2>Questions fréquentes</h2>
            <p>Tout ce qu&apos;il faut savoir avant de se lancer.</p>
          </div>
          <div className="faq-pills reveal">
            <div className="faq-pill"><span className="v grad">+500M</span><span className="k">vues générées</span></div>
            <div className="faq-pill"><span className="v grad">+5,1K</span><span className="k">clips produits</span></div>
            <div className="faq-pill"><span className="v grad">1–2 j</span><span className="k">avant le lancement</span></div>
          </div>
          <div className="faq-layout">
            <div className="faq-list reveal">
              <div className="qitem"><span className="qn">01</span><div><h3>Qu&apos;est-ce que Clipeo ?</h3><p>Une agence de clipping managée pour marques, créateurs et sorties. On active un réseau de clippers pour créer et publier des montages orientés performance sur TikTok, Reels, Shorts et Twitch.</p></div></div>
              <div className="qitem"><span className="qn">02</span><div><h3>Comment fonctionne le process ?</h3><p>On démarre par un court appel. Vous venez avec votre vision, et on gère la stratégie, le setup du lancement et l&apos;exécution hebdomadaire de la campagne.</p></div></div>
              <div className="qitem"><span className="qn">03</span><div><h3>En combien de temps peut-on lancer ?</h3><p>La plupart des campagnes se lancent en 1 à 2 jours après l&apos;appel. Notre onboarding est conçu pour la vitesse.</p></div></div>
              <div className="qitem"><span className="qn">04</span><div><h3>Avec qui travaillez-vous ?</h3><p>Des créateurs, des marques, des podcasts, des sorties cinéma et des émissions. Si votre croissance dépend du format court, on construit un modèle de campagne autour de votre contenu.</p></div></div>
              <div className="qitem"><span className="qn">05</span><div><h3>Comment fonctionne le modèle CPM ?</h3><p>Vous payez un coût pour 1000 vues, avec un volume garanti au contrat. Si l&apos;objectif n&apos;est pas atteint, on rembourse la différence. Vous payez les vues, pas l&apos;effort.</p></div></div>
              <div className="qitem"><span className="qn">06</span><div><h3>Combien ça coûte de démarrer ?</h3><p>Le prix dépend du périmètre et de l&apos;objectif de vues. On commence par un audit gratuit et une projection chiffrée, avant tout engagement.</p></div></div>
            </div>
            <aside className="faq-side reveal">
              <span className="mono-label">Avant de lancer</span>
              <h3>Des réponses claires, des décisions plus rapides.</h3>
              <p className="sub">Process, fit, timing et prix au même endroit pour lancer en confiance.</p>
              <ul>
                <li><CheckCircle />Onboarding rapide, campagne lancée en 1–2 jours</li>
                <li><CheckCircle />Clipping multi-plateforme : TikTok, Reels, Shorts, Twitch</li>
                <li><CheckCircle />Reporting transparent et suivi des performances</li>
              </ul>
              <div className="btns">
                <Link href="/contact" className="btn btn-primary"><span>Réserver un audit</span></Link>
                <a href="mailto:contact@agenceclipeo.com" className="btn"><span>Écrire à l&apos;équipe</span></a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-sec">
        <div className="container">
          <div className="cta2 reveal">
            <div className="cta2-copy">
              <span className="cta2-eye">Audit gratuit · avant tout engagement</span>
              <h2>On audite votre contenu.<br /><span className="hl">Gratuitement.</span></h2>
              <p className="cta2-sub">On identifie vos meilleurs angles, on vous projette un volume de vues chiffré, et vous décidez ensuite. Le risque est de notre côté, pas du vôtre.</p>
              <Link href="/contact" className="cta2-btn">
                Réserver mon audit gratuit
                <span className="a" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              </Link>
            </div>
            <div className="cta2-card">
              <span className="t">Ce que vous recevez</span>
              <ul>
                {[
                  "Vos meilleurs angles à fort potentiel viral",
                  "Une projection de vues chiffrée pour votre campagne",
                  "Un plan clair, et zéro engagement",
                ].map((item) => (
                  <li key={item}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="rgba(134,210,255,.18)" /><path d="m7.4 12.4 3 3 6.2-6.6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="sec blog" id="blog">
        <div className="blog-wm">BLOG</div>
        <div className="container">
          <div className="sec-head left reveal" style={{ marginBottom: 44 }}>
            <h2>Les dernières du <span className="blue">Blog</span></h2>
            <p>Guides, décryptages et playbooks de l&apos;équipe derrière +500M de vues.</p>
          </div>
          <div className="bento-blog stagger">
            {/* Article vedette — large */}
            <Link href="/blog/generateurs-ia-vs-agence-clipping" className="bb-card bb-feat">
              <div className="bb-bg" aria-hidden="true">
                <svg viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g stroke="var(--sky)" strokeOpacity="0.22">
                    <path d="M0 40H800M0 80H800M0 120H800M0 160H800M0 200H800M0 240H800M0 280H800" />
                    <path d="M80 0V320M160 0V320M240 0V320M320 0V320M400 0V320M480 0V320M560 0V320M640 0V320M720 0V320" />
                  </g>
                  <path d="M20 170C60 100 140 100 200 160C235 195 270 195 315 160C370 117 430 130 480 175C520 210 560 210 610 175C660 140 700 150 780 120" stroke="var(--royal)" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="200" cy="160" r="3.5" fill="var(--royal)" />
                  <circle cx="480" cy="175" r="3.5" fill="var(--royal)" />
                  <circle cx="780" cy="120" r="3.5" fill="var(--royal)" />
                </svg>
              </div>
              <div className="bb-in">
                <span className="bb-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8" /><path d="M21 7v5h-5" /></svg>
                </span>
                <span className="bb-cat">Stratégie</span>
                <h3>Générateurs de clips IA <span className="bb-ac">vs agence de clipping.</span></h3>
                <p>Les outils de clip automatique promettent dix vidéos en un clic. Une agence promet des vues. On compare honnêtement les deux approches, coûts et résultats.</p>
                <span className="bb-foot"><span className="bb-go">Lire l&apos;article <ArrowR /></span><span className="bb-min">12 min</span></span>
              </div>
            </Link>

            {/* Petit */}
            <Link href="/blog/se-lancer-clipping-2026" className="bb-card">
              <div className="bb-bg" aria-hidden="true">
                <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="bbGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M24 0H0V24" stroke="var(--sky)" strokeOpacity="0.25" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="400" height="300" fill="url(#bbGrid)" />
                  <path d="M40 230C110 180 180 80 350 120" stroke="var(--royal)" strokeOpacity="0.6" strokeWidth="1.4" fill="none" />
                  <circle cx="140" cy="150" r="3" fill="var(--royal)" />
                  <circle cx="260" cy="120" r="3" fill="var(--royal)" />
                  <circle cx="330" cy="140" r="3" fill="var(--royal)" />
                </svg>
              </div>
              <div className="bb-in">
                <span className="bb-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M2 6.5A2.5 2.5 0 0 1 4.5 4H11v15.5H4.5A2.5 2.5 0 0 0 2 22z" /><path d="M22 6.5A2.5 2.5 0 0 0 19.5 4H13v15.5h6.5a2.5 2.5 0 0 1 2.5 2.5z" /></svg>
                </span>
                <span className="bb-cat">Guide</span>
                <h3>Se lancer dans le <span className="bb-ac">clipping en 2026.</span></h3>
                <span className="bb-foot"><span className="bb-go">Lire l&apos;article <ArrowR /></span><span className="bb-min">11 min</span></span>
              </div>
            </Link>

            {/* Pleine largeur */}
            <Link href="/blog/marketing-podcast-faire-grandir-emission" className="bb-card bb-wide">
              <div className="bb-bg" aria-hidden="true">
                <svg viewBox="0 0 800 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="bbDots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="1" fill="var(--sky)" fillOpacity="0.3" />
                    </pattern>
                  </defs>
                  <rect width="800" height="220" fill="url(#bbDots)" />
                  <path d="M20 130C90 70 150 150 220 120C290 90 330 110 400 80C470 50 520 110 590 95C660 80 710 110 780 70" stroke="var(--royal)" strokeOpacity="0.6" strokeWidth="1.6" fill="none" />
                  <circle cx="400" cy="110" r="58" stroke="var(--royal)" strokeOpacity="0.25" strokeWidth="1.2" fill="none" />
                  <circle cx="400" cy="110" r="30" stroke="var(--royal)" strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
                </svg>
              </div>
              <div className="bb-in">
                <span className="bb-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M10 9l5 3-5 3z" fill="var(--sky)" stroke="none" /></svg>
                </span>
                <span className="bb-cat">Playbook</span>
                <h3>Marketing de podcast : <span className="bb-ac">faire grandir une émission.</span></h3>
                <p>La plupart des podcasts stagnent non pas par manque de qualité, mais par manque de découverte. Le format court est le levier le plus rapide pour y remédier.</p>
                <span className="bb-foot"><span className="bb-go">Lire l&apos;article <ArrowR /></span><span className="bb-min">8 min</span></span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
