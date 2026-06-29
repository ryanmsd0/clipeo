"use client";

import { useState, type ReactNode } from "react";
import { useLocale } from "next-intl";

/* Section « 6 expertises, un seul service » — variante onglets (process v5)
   adaptée : 3 onglets à gauche · carte dynamique au centre · 3 onglets à droite. */

const ICONS: Record<string, ReactNode> = {
  algo: <><circle cx="12" cy="12" r="2.4" /><path d="M5 8a8 8 0 0 0 0 8M19 8a8 8 0 0 1 0 8M8.5 10.5a4 4 0 0 0 0 3M15.5 10.5a4 4 0 0 1 0 3" /></>,
  audit: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-3.6-3.6M11 8v6M8 11h6" /></>,
  strategy: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.6" /><circle cx="12" cy="12" r="1" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3" /></>,
  prod: <><circle cx="6" cy="6" r="2.6" /><circle cx="6" cy="18" r="2.6" /><path d="M20 4 8.4 15.6M14.4 14.4 20 20M8.4 8.4 12 12" /></>,
  distrib: <><circle cx="6" cy="12" r="2.6" /><circle cx="18" cy="6" r="2.6" /><circle cx="18" cy="18" r="2.6" /><path d="M8.3 10.8 15.7 7.2M8.3 13.2l7.4 3.6" /></>,
  track: <><path d="M4 19V5M4 19h16" /><path d="m7 15 3.5-4 3 2.5L20 7" /><path d="M20 11V7h-4" /></>,
};

const PILLARS_FR = [
  {
    ic: "algo", tag: "Algorithme", t: "Compréhension de l'algorithme",
    d: "On connaît les codes de chaque plateforme — fenêtres de publication, rétention, hooks, watch-time — et on publie quand l'algorithme récompense.",
    bullets: ["Fenêtres de publication calées par réseau", "Hook < 3 s, rétention au cœur du montage", "Watch-time et engagement optimisés"],
  },
  {
    ic: "audit", tag: "Audit", t: "Audit",
    d: "On cartographie votre contenu, on isole les angles à plus fort potentiel viral et on fixe un objectif de vues chiffré — avant même de produire le premier clip.",
    bullets: ["Cartographie complète de votre contenu existant", "Identification des angles à plus fort potentiel", "Objectif de vues chiffré, inscrit au contrat"],
  },
  {
    ic: "strategy", tag: "Stratégie", t: "Stratégie",
    d: "Un plan de diffusion sur-mesure : formats, cadence, plateformes prioritaires, narratifs. Chaque clip a un rôle précis dans la mécanique de croissance.",
    bullets: ["Plan de diffusion : formats × cadence × plateformes", "Narratifs pensés pour votre audience", "Chaque clip a un rôle dans la croissance"],
  },
  {
    ic: "prod", tag: "Production", t: "Production",
    d: "Un réseau de clippers et un vrai savoir-faire de montage : découpage, rythme et sous-titres pensés pour la rétention, aux codes natifs de TikTok, Reels et Shorts.",
    bullets: ["Réseau de clippers mobilisable à la demande", "Montage, rythme et sous-titres orientés rétention", "Aux codes natifs de chaque plateforme"],
  },
  {
    ic: "distrib", tag: "Distribution", t: "Distribution",
    d: "Diffusion sur des dizaines de comptes, multi-plateformes, calée sur les fenêtres algo de chaque réseau. La portée n'est jamais laissée au hasard.",
    bullets: ["Diffusion sur des dizaines de comptes", "Multi-plateformes, calée sur les fenêtres algo", "Une portée maîtrisée, jamais au hasard"],
  },
  {
    ic: "track", tag: "Tracking", t: "Tracking",
    d: "On mesure par contenu, plateforme et thème. On coupe ce qui ne marche pas, on amplifie ce qui performe. Chaque vague de clips nourrit la suivante.",
    bullets: ["Mesure par contenu, plateforme et thème", "On coupe ce qui ne marche pas, on amplifie le reste", "Chaque vague de clips nourrit la suivante"],
  },
];

const PILLARS_EN: typeof PILLARS_FR = [
  {
    ic: "algo", tag: "Algorithm", t: "Reading the algorithm",
    d: "We know the codes of each platform — posting windows, retention signals, hooks, watch-time — and we post when the algorithm rewards.",
    bullets: ["Posting windows tuned to each platform", "A 3-second hook, retention at the core", "Watch-time and engagement signals optimized"],
  },
  {
    ic: "audit", tag: "Audit", t: "Audit",
    d: "We map your content, isolate the highest-potential viral angles and set a concrete view target — before we produce the first clip.",
    bullets: ["A full map of your existing content", "The highest-potential angles, identified", "A concrete view target, written into the contract"],
  },
  {
    ic: "strategy", tag: "Strategy", t: "Strategy",
    d: "A tailored distribution plan: formats, cadence, priority platforms, narratives. Every clip plays a precise role in the growth engine.",
    bullets: ["Distribution plan: formats × cadence × platforms", "Narratives built for your audience", "Every clip has a role in the growth"],
  },
  {
    ic: "prod", tag: "Production", t: "Production",
    d: "A network of clippers and real editing craft: cutting, pacing and captions built for retention, in the native codes of TikTok, Reels and Shorts.",
    bullets: ["A network of clippers, on demand", "Editing, pacing and captions built for retention", "In the native codes of each platform"],
  },
  {
    ic: "distrib", tag: "Distribution", t: "Distribution",
    d: "Multi-account distribution across dozens of accounts, multi-platform, timed to each platform's algorithm windows. Reach is never left to chance.",
    bullets: ["Distribution across dozens of accounts", "Multi-platform, timed to the algorithm windows", "Reach you control, never at random"],
  },
  {
    ic: "track", tag: "Tracking", t: "Tracking",
    d: "We measure by content, platform and theme. We cut what doesn't work, we amplify what performs. Every wave of clips feeds the next.",
    bullets: ["Measured by content, platform and theme", "We cut what doesn't work, we amplify the rest", "Every wave of clips feeds the next"],
  },
];

const PILLARS_COPY = { fr: PILLARS_FR, en: PILLARS_EN } as const;

const CSS = `
  .sxt-wrap{display:grid;grid-template-columns:1fr 1.46fr 1fr;gap:18px;align-items:stretch}
  .sxt-col{display:flex;flex-direction:column;gap:14px;justify-content:center}
  .sxt-tab{flex:1;display:flex;align-items:center;gap:14px;text-align:left;width:100%;padding:17px 18px;border-radius:16px;cursor:pointer;
    background:var(--glass);border:1px solid var(--w08);transition:background .35s,border-color .35s,transform .35s cubic-bezier(.32,.72,0,1),box-shadow .35s}
  .sxt-tab:hover{transform:translateY(-2px)}
  .sxt-tab.on{background:linear-gradient(180deg,rgba(10,99,255,.1),rgba(10,99,255,.03));border-color:rgba(10,99,255,.3);box-shadow:0 14px 30px -18px rgba(10,99,255,.5)}
  .sxt-tab .ic{flex:none;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;
    background:#fff;border:1px solid var(--w14);color:var(--w40);transition:.35s}
  .sxt-tab .ic svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
  .sxt-tab.on .ic{background:linear-gradient(180deg,var(--sky),var(--sky-bright));color:#fff;border-color:transparent}
  /* Couleur1 : éviter le bandeau sky clair trop tranché en haut → dégradé navy doux */
  .pal-live .sxt-tab.on .ic{background:linear-gradient(155deg,#3a63b5,#080151)}
  .sxt-tab .tt{font-family:var(--font-d);font-weight:700;font-size:.98rem;color:var(--ink);line-height:1.18;letter-spacing:-.01em}

  .sxt-card{position:relative;overflow:hidden;border-radius:22px;border:1px solid var(--w14);
    background:radial-gradient(700px 360px at 82% -20%,rgba(10,99,255,.1),transparent 60%),linear-gradient(180deg,#f7faff,#eef4fe);
    padding:40px 42px;display:flex;flex-direction:column;justify-content:center;height:460px;overflow:hidden}
  .sxt-card .ic-big{position:absolute;top:26px;right:30px;width:122px;height:122px;stroke:rgba(10,99,255,.1);fill:none;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}
  .sxt-in{animation:sxtIn .5s cubic-bezier(.32,.72,0,1)}
  @keyframes sxtIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
  .sxt-card .tag{font-family:var(--font-m);font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--royal);display:block;margin-bottom:11px}
  .sxt-card h3{font-family:var(--font-d);font-weight:800;font-size:clamp(1.6rem,2.6vw,2.1rem);letter-spacing:-.02em;color:var(--ink);margin-bottom:14px;line-height:1.04}
  .sxt-card .lead{color:var(--w70);font-size:1.02rem;line-height:1.6;margin-bottom:20px;max-width:520px}
  .sxt-list{list-style:none;display:flex;flex-direction:column;gap:12px;max-width:520px}
  .sxt-list li{position:relative;padding-left:26px;color:var(--w55);font-size:.96rem;line-height:1.5}
  .sxt-list li::before{content:"";position:absolute;left:0;top:.45em;width:14px;height:14px;border-radius:50%;background:rgba(10,99,255,.14);box-shadow:inset 0 0 0 3px #fff,0 0 0 1px rgba(10,99,255,.5)}

  @media(max-width:900px){
    .sxt-wrap{grid-template-columns:1fr;gap:14px}
    .sxt-col{justify-content:flex-start}
    .sxt-tab{flex:initial}
    .sxt-card{order:3;height:auto;overflow:visible}
  }
`;

export default function ServicesPillars() {
  const locale = useLocale() as keyof typeof PILLARS_COPY;
  const PILLARS = PILLARS_COPY[locale] ?? PILLARS_COPY.fr;
  const [active, setActive] = useState(0);
  const p = PILLARS[active];

  const renderTab = (i: number) => {
    const t = PILLARS[i];
    return (
      <button
        key={t.t}
        className={`sxt-tab${i === active ? " on" : ""}`}
        onMouseEnter={() => setActive(i)}
        onClick={() => setActive(i)}
        aria-pressed={i === active}
      >
        <span className="ic"><svg viewBox="0 0 24 24">{ICONS[t.ic]}</svg></span>
        <span className="tt">{t.t}</span>
      </button>
    );
  };

  return (
    <div className="sxt-wrap reveal">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="sxt-col">{[0, 1, 2].map(renderTab)}</div>

      <div className="sxt-card">
        <svg className="ic-big" viewBox="0 0 24 24" aria-hidden="true">{ICONS[p.ic]}</svg>
        <div className="sxt-in" key={active}>
          <span className="tag">{p.tag}</span>
          <h3>{p.t}</h3>
          <p className="lead">{p.d}</p>
          <ul className="sxt-list">
            {p.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
          </ul>
        </div>
      </div>

      <div className="sxt-col">{[3, 4, 5].map(renderTab)}</div>
    </div>
  );
}
