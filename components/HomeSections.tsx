"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowR, Check, CheckCircle } from "@/components/Icons";
import CinematicHeroV6 from "@/components/CinematicHeroV6";
import ProcessSticky from "@/components/ProcessSticky";
import BorderGlow from "@/components/BorderGlow";
import ClaimHero from "@/components/ClaimHero";
import { BrandLogo } from "@/components/BrandLogo";
import { TRUST_BAR } from "@/lib/site";

export default function HomeSections() {
  const rootRef = useRef<HTMLDivElement>(null);
  // « Pour qui » sur mobile : accordéon (clic = déroule la carte client)
  const [openWho, setOpenWho] = useState<string | null>(null);

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
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, active = false, onButton = false;
      let currentBtn: HTMLElement | null = null;

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
      // La cover est visible sur une ligne, SAUF quand le curseur approche du
      // bouton « Voir les campagnes » (zone élargie REACH) : on la cache pour
      // pouvoir le cliquer. Le masquage du curseur est en CSS STATIQUE (fiable),
      // pas piloté ici (sinon Chrome ne réévalue pas le curseur déjà posé).
      const REACH_X = 100, REACH_Y = 45;
      const section = whoList.closest("section");
      const sync = () => {
        follow.classList.toggle("on", active && !onButton);
      };
      const onMove = (e: MouseEvent) => {
        tx = e.clientX; ty = e.clientY;
        // la cover ne s'affiche QUE sur une ligne (sinon : titre, marges, bas de
        // section → cachée, au lieu de traîner jusqu'à la sortie de la section).
        const overRow = !!(e.target as HTMLElement | null)?.closest?.(".who-row");
        if (overRow) {
          if (!active) {
            active = true;
            // place instantanément sous le curseur la première fois (pas de vol depuis le coin)
            if (cx === 0 && cy === 0) { cx = tx; cy = ty; }
          }
          // proximité du bouton de la ligne survolée (zone élargie autour)
          if (currentBtn) {
            const r = currentBtn.getBoundingClientRect();
            onButton = tx >= r.left - REACH_X && tx <= r.right + REACH_X && ty >= r.top - REACH_Y && ty <= r.bottom + REACH_Y;
          } else {
            onButton = false;
          }
        } else {
          active = false;
          onButton = false;
        }
        sync();
        if (!raf) raf = requestAnimationFrame(render);
      };
      const onLeave = () => {
        active = false;
        onButton = false;
        currentBtn = null;
        sync();
      };
      const rows = Array.from(whoList.querySelectorAll<HTMLElement>(".who-row"));
      const rowHandlers = rows.map((rowEl) => {
        const btn = rowEl.querySelector<HTMLElement>(".view");
        const h = () => {
          currentBtn = btn;
          const cover = rowEl.dataset.cover;
          if (cover && followImg && followImg.getAttribute("src") !== cover) followImg.src = cover;
          if (followViews) followViews.textContent = rowEl.dataset.views || "";
          if (followClips) followClips.textContent = rowEl.dataset.clips || "";
        };
        rowEl.addEventListener("mouseenter", h);
        return () => rowEl.removeEventListener("mouseenter", h);
      });

      // mousemove sur TOUTE la section (pas la liste étroite) : on suit le curseur
      // partout et on détecte proprement quand il n'est plus sur une ligne — sans
      // clignotement (l'état dépend de la position réelle, pas d'événements enter/leave).
      const leaveZone = section || whoList;
      leaveZone.addEventListener("mousemove", onMove);
      leaveZone.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        leaveZone.removeEventListener("mousemove", onMove);
        leaveZone.removeEventListener("mouseleave", onLeave);
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
        <CinematicHeroV6 showFixedCta={false} tagline1="Votre contenu long" tagline2="vous rend omniprésent." />
      </div>

      {/* AFFIRMATION DE POSITIONNEMENT — « n°1 en France » */}
      <ClaimHero />

      {/* TRUST BAR — marques clientes, cliquables vers les études de cas */}
      <div className="logos">
        <span className="mono-label">+620 M de vues générées pour eux</span>
        <div className="mq"><div className="mq-track">
          {[...Array(2)].map((_, k) => (
            <span key={k} style={{ display: "contents" }}>
              {TRUST_BAR.map((c) => (
                <Link href="/etudes-de-cas" key={`${k}-${c.name}`} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <Image src={c.img} alt="" aria-hidden width={28} height={28} style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", flex: "none", border: "1.5px solid #fff", boxShadow: "0 2px 8px rgba(10,22,40,.18)" }} />
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
          <ProcessSticky images={false} />
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
              <div className="omni-txt">
                <h3>Répétition</h3>
                <p>Vos clips reviennent plusieurs fois par jour dans la For You Page de votre cible, sur des dizaines de comptes, jour après jour.</p>
              </div>
            </div>
            <div className="omni-step">
              <div className="omni-node"><svg viewBox="0 0 24 24"><path d="M9.5 2a4.5 4.5 0 0 0-4.5 4.5c0 .5-.3 1-.7 1.4A4 4 0 0 0 6 15a3.5 3.5 0 0 0 7 0V6.5A4.5 4.5 0 0 0 9.5 2z" /><path d="M14.5 2A4.5 4.5 0 0 1 19 6.5c0 .5.3 1 .7 1.4A4 4 0 0 1 18 15a3.5 3.5 0 0 1-7 0" /></svg></div>
              <div className="omni-txt">
                <h3>Mémorisation</h3>
                <p>À force de revoir le même visage, votre marque s&apos;ancre durablement dans l&apos;esprit de l&apos;audience.</p>
              </div>
            </div>
            <div className="omni-step">
              <div className="omni-node"><svg viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg></div>
              <div className="omni-txt">
                <h3>Confiance</h3>
                <p>La familiarité crée la confiance&nbsp;: un lien s&apos;installe, et le spectateur passif devient abonné ou client.</p>
              </div>
            </div>
            <div className="omni-step">
              <div className="omni-node"><svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="3" /><path d="m10 9 5 3-5 3z" /></svg></div>
              <div className="omni-txt">
                <h3>Redirection</h3>
                <p>L&apos;audience se redirige naturellement vers votre contenu long&nbsp;: chaîne, podcast, film, live.</p>
              </div>
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
              // cover = visuel de campagne ; campaign = page « pour qui » ; caseSlug = étude de cas (null = pas encore d'étude dédiée → liste)
              { ix: "01", name: "Créateurs YouTube", cover: "Charles_et_Melanie", client: "Charles et Mélanie", views: "+160,9 M", clips: "1 355", campaign: "createurs", caseSlug: "charles-et-melanie" },
              { ix: "02", name: "Marques & grands comptes", cover: "La_Marine_Nationale", client: "La Marine Nationale", views: "+7,4 M", clips: "190", campaign: "marques", caseSlug: "la-marine-nationale" },
              { ix: "03", name: "Podcasts", cover: "Kyan_Khojandi", client: "Kyan Khojandi", views: "+23,1 M", clips: "144", campaign: "podcasts", caseSlug: "kyan-khojandi" },
              { ix: "04", name: "Cinéma & sorties", cover: "Film_Plus_Fort_que_Moi", client: "Plus Fort que Moi", views: "+44 M", clips: "358", campaign: "cinema", caseSlug: "plus-fort-que-moi" },
              { ix: "05", name: "Émissions & Twitch", cover: "Zebro_et_Leow", client: "Zebro & Leow", views: "+19,9 M", clips: "194", campaign: "twitch", caseSlug: "zebro-et-leow" },
              { ix: "06", name: "Événements", cover: "Crunch_Creator", client: "Crunch Creator", views: "+39 M", clips: "292", campaign: "evenements", caseSlug: "crunch-creator" },
            ].map((w) => {
              const open = openWho === w.ix;
              const cover = `/img/Clipeo%20covers%20campagnes/${w.cover}.png`;
              const caseHref = w.caseSlug ? `/etudes-de-cas/${w.caseSlug}` : "/etudes-de-cas";
              const campaignHref = `/campagnes/${w.campaign}`;
              return (
                <div className={`who-item${open ? " open" : ""}`} key={w.ix}>
                  <div className="who-row" data-cover={cover} data-client={w.client} data-views={w.views} data-clips={w.clips}>
                    {/* Clic sur la ligne / la cover → étude de cas du créateur affiché */}
                    <Link
                      href={caseHref}
                      className="who-main"
                      aria-expanded={open}
                      onClick={(e) => {
                        // sur tactile (pas de hover) : déroule la carte au lieu de naviguer
                        if (window.matchMedia("(hover: none)").matches) {
                          e.preventDefault();
                          setOpenWho(open ? null : w.ix);
                        }
                      }}
                    >
                      <span className="ix">{w.ix}</span>
                      <span className="name">{w.name}</span>
                    </Link>
                    {/* Bouton → toutes les campagnes de cette catégorie */}
                    <Link href={campaignHref} className="view">Voir les campagnes <ArrowR /></Link>
                    <span className="who-caret" aria-hidden="true">
                      <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </div>
                  <div className="who-drop">
                    <Link href={caseHref} className="who-drop-in">
                      {/* eslint-disable-next-line @next/next/no-img-element -- chemin avec espaces, hover lazy */}
                      <img src={cover} alt={w.client} loading="lazy" width={320} height={180} />
                      <div className="who-drop-stats">
                        <span><b>{w.views}</b><i>vues générées</i></span>
                        <span><b>{w.clips}</b><i>clips produits</i></span>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
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
            <div className="faq-pill"><span className="v grad">+620M</span><span className="k">vues générées</span></div>
            <div className="faq-pill"><span className="v grad">+6,6K</span><span className="k">clips produits</span></div>
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
            {/* eslint-disable-next-line @next/next/no-img-element -- filigrane décoratif */}
            <img className="cta2-wm" src="/img/logo-mark-white.png" alt="" aria-hidden="true" />
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
            <p>Guides, décryptages et playbooks de l&apos;équipe derrière +620M de vues.</p>
          </div>
          <div className="bento-blog stagger">
            {/* Article vedette — large */}
            <Link href="/blog/generateurs-ia-vs-agence-clipping" className="bb-card bb-feat">
              {/* Fond pleine carte : Clipeo (agence réelle) VS OpusClip (IA) */}
              <div className="bb-vs-bg" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element -- logo décoratif détouré */}
                <img className="bb-vs-clipeo" src="/img/logo-mark-navy.png" alt="" width={36} height={37} />
                  <span className="bb-vs-x">VS</span>
                  <svg className="bb-vs-opus" viewBox="0 0 103 24" fill="none" role="img" aria-label="OpusClip">
                    <path fill="currentColor" d="M11.954 3.817c-4.49 0-8.132 3.644-8.152 8.146v12H0V12C0 5.373 5.352 0 11.954 0s11.953 5.373 11.953 12-5.351 12-11.953 12a12 12 0 0 1-1.718-.123v-3.876q.831.181 1.718.182c4.502 0 8.152-3.663 8.152-8.183s-3.65-8.183-8.152-8.183" />
                    <path fill="currentColor" d="M5.118 24V11.995c0-3.79 3.062-6.857 6.836-6.857 3.773 0 6.836 3.068 6.836 6.857s-3.063 6.857-6.836 6.857c-.594 0-1.17-.076-1.718-.218V14.5c.488.337 1.08.534 1.718.534a3.037 3.037 0 0 0 3.034-3.04 3.037 3.037 0 0 0-3.034-3.04 3.037 3.037 0 0 0-3.034 3.008V24z" />
                    <path fill="currentColor" d="M90.962 5.524c.857 0 1.477.607 1.477 1.433s-.622 1.434-1.477 1.434c-.854 0-1.46-.607-1.46-1.434 0-.826.637-1.433 1.46-1.433M90.805 9.4h1.417v8.493h-2.484V10.47a1.07 1.07 0 0 1 1.067-1.07" />
                    <path fill="currentColor" fillRule="evenodd" d="M37.913 5.962c-3.49 0-6.076 2.562-6.076 6.033s2.634 6.034 6.076 6.034 6.028-2.563 6.028-6.034-2.537-6.033-6.028-6.033m3.374 6.033c0 2.158-1.426 3.758-3.374 3.758-1.999 0-3.409-1.6-3.409-3.758s1.463-3.758 3.41-3.758c1.945 0 3.373 1.6 3.373 3.758M46.716 9.4h-1.417l.018 11.56h2.484V17c.453.624 1.394 1.028 2.384 1.028 2.468 0 4.13-1.684 4.13-4.382s-1.662-4.382-4.13-4.382c-.992 0-1.933.582-2.402 1.206a1.07 1.07 0 0 0-1.067-1.07m5.096 4.228c0 1.364-.824 2.276-2.015 2.276-1.19 0-1.996-.93-1.996-2.276 0-1.347.805-2.258 1.996-2.258s2.015.894 2.015 2.258" clipRule="evenodd" />
                    <path fill="currentColor" d="M55.607 14.862v-5.46h2.468v4.853c0 .994.571 1.6 1.461 1.6 1.158 0 1.83-.993 1.83-2.764V9.4h2.485v8.493h-2.484v-.944c-.403.54-1.36 1.077-2.619 1.077-1.846 0-3.139-1.213-3.139-3.168z" />
                    <path fill="currentColor" d="M67.41 15.027h-2.216v.003c.1 1.735 1.392 3 3.542 3 1.945 0 3.34-1.147 3.34-2.732 0-2.096-1.696-2.49-3.01-2.795-.829-.193-1.506-.35-1.506-.878 0-.369.368-.589.873-.589.706 0 1.208.37 1.343.994h2.216c-.22-1.703-1.494-2.765-3.56-2.765-1.912 0-3.088 1.114-3.088 2.511 0 1.902 1.593 2.302 2.876 2.624.865.217 1.59.4 1.59.983 0 .471-.404.758-1.074.758-.806 0-1.242-.405-1.326-1.114" />
                    <path fill="currentColor" d="M73.05 11.995c0-3.842 2.586-6.033 5.944-6.033 2.904 0 4.985 1.82 5.186 4.382h-2.652c-.168-1.247-1.175-2.107-2.534-2.107-1.864 0-3.274 1.332-3.274 3.758s1.428 3.758 3.274 3.758c1.326 0 2.366-.876 2.568-2.14h2.67c-.269 2.511-2.25 4.416-5.238 4.416-3.292 0-5.944-2.174-5.944-6.034" />
                    <path fill="currentColor" d="M87.972 5.962h-2.484v11.933h2.484z" />
                    <path fill="currentColor" fillRule="evenodd" d="M95.4 9.4h-1.416l.018 11.56h2.483V17c.454.624 1.395 1.028 2.384 1.028 2.469 0 4.131-1.684 4.131-4.382s-1.662-4.382-4.13-4.382c-.992 0-1.933.582-2.402 1.206A1.07 1.07 0 0 0 95.4 9.4m5.096 4.228c0 1.364-.823 2.276-2.014 2.276s-1.997-.93-1.997-2.276c0-1.347.806-2.258 1.997-2.258 1.19 0 2.014.894 2.014 2.258" clipRule="evenodd" />
                  </svg>
              </div>
              <div className="bb-in">
                <span className="bb-cat">Stratégie</span>
                <h3>Générateurs de clips IA <span className="bb-ac">vs agence de clipping.</span></h3>
                <p>Les outils de clip automatique promettent dix vidéos en un clic. Une agence promet des vues. On compare honnêtement les deux approches, coûts et résultats.</p>
                <span className="bb-foot"><span className="bb-go">Lire l&apos;article <ArrowR /></span><span className="bb-min">12 min</span></span>
              </div>
            </Link>

            {/* Petit */}
            <Link href="/blog/se-lancer-clipping-2026" className="bb-card">
              {/* Fond : vrais logos des plateformes du format court */}
              <div className="bb-bg bb-plat-bg" aria-hidden="true">
                <BrandLogo name="tiktok" className="p1" />
                <BrandLogo name="youtube" className="p2" />
                <BrandLogo name="instagram" className="p3" />
              </div>
              <div className="bb-in">
                <span className="bb-cat">Guide</span>
                <h3>Se lancer dans le <span className="bb-ac">clipping en 2026.</span></h3>
                <span className="bb-foot"><span className="bb-go">Lire l&apos;article <ArrowR /></span><span className="bb-min">11 min</span></span>
              </div>
            </Link>

            {/* Pleine largeur */}
            <Link href="/blog/marketing-podcast-faire-grandir-emission" className="bb-card bb-wide">
              {/* Fond : micro + vague audio qui monte (le son qui grandit) */}
              <div className="bb-bg bb-pod-bg" aria-hidden="true">
                <svg className="pod-mic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="2" width="6" height="11" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 17v4M8 21h8" />
                </svg>
                <svg className="pod-wave" viewBox="0 0 300 100" fill="currentColor">
                  {[20, 34, 26, 44, 36, 54, 46, 62, 52, 70, 60, 78, 68, 84, 74, 90, 82, 96].map((h, i) => (
                    <rect key={i} x={i * 16 + 5} y={(100 - h) / 2} width="7" height={h} rx="3.5" />
                  ))}
                </svg>
              </div>
              <div className="bb-in">
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
