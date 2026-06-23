import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import CtaPanel from "@/components/CtaPanel";
import { PlatformTile } from "@/components/BrandLogo";
import { TRUST_BAR } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as keyof typeof COPY;
  const t = (COPY[locale] ?? COPY.fr).meta;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: "/a-propos" },
  };
}

/* Refonte premium : rythme visuel par alternance de traitements (hero éditorial,
   marquee, bande de stats, cartes équipe, timeline process, panneau sombre
   manifeste, raisons éditoriales, plateformes). Contenus = brouillons à valider
   avec Clipeo. Pas de budgets €. */
const ICONS = {
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 4.8L8.5 15.5l2.2-4.8 4.8-2.2Z" /></>,
  scissors: <><circle cx="6" cy="6" r="2.6" /><circle cx="6" cy="18" r="2.6" /><path d="M20 4 8.5 15.5M14.5 14.5 20 20M8.4 8.4 12 12" /></>,
  broadcast: <><circle cx="12" cy="12" r="2.1" /><path d="M5.5 8a8 8 0 0 0 0 8M18.5 8a8 8 0 0 1 0 8M8.5 11a3.5 3.5 0 0 0 0 2M15.5 11a3.5 3.5 0 0 1 0 2" /></>,
  trending: <><path d="M22 7l-8.5 8.5-4-4L2 19" /><path d="M16 7h6v6" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.6" /><circle cx="12" cy="12" r="1" /></>,
  network: <><circle cx="9" cy="8" r="3.1" /><path d="M3.6 19a5.4 5.4 0 0 1 10.8 0" /><path d="M16 5.4a3 3 0 0 1 0 5.4M17.2 13.4a5 5 0 0 1 3.2 5" /></>,
  repeat: <><path d="M3 12a9 9 0 0 1 15-6.6L21 8" /><path d="M21 3.5V8h-4.5" /><path d="M21 12a9 9 0 0 1-15 6.6L3 16" /><path d="M3 20.5V16h4.5" /></>,
  bars: <><path d="M3 21h18" /><rect x="5" y="11" width="3.4" height="7" rx="1" /><rect x="10.3" y="6.5" width="3.4" height="11.5" rx="1" /><rect x="15.6" y="9" width="3.4" height="9" rx="1" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
};
type IconName = keyof typeof ICONS;
function Glyph({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">{ICONS[name]}</svg>
  );
}

const STYLES = `
  /* HERO — CTA sous le lead */
  .ap-hero-cta{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-top:34px}

  /* BANDE DE STATS — chiffres animés, filets internes */
  .ap-statband{display:grid;grid-template-columns:repeat(4,1fr);max-width:1000px;margin:0 auto;
    border:1px solid var(--w08);border-radius:24px;overflow:hidden;
    background:linear-gradient(180deg,var(--glass-2),transparent);box-shadow:0 30px 70px -50px rgba(10,40,120,.45)}
  .ap-gs{padding:36px 24px;text-align:center;border-right:1px solid var(--w08)}
  .ap-gs:last-child{border-right:0}
  .ap-gs .v{font-family:var(--font-d);font-weight:800;font-size:clamp(1.9rem,3.6vw,2.9rem);letter-spacing:-.03em;line-height:1;
    background:linear-gradient(155deg,var(--ink) 30%,var(--sky));-webkit-background-clip:text;background-clip:text;color:transparent}
  .ap-gs .k{margin-top:11px;font-size:.82rem;color:var(--w55);line-height:1.4}

  /* ÉQUIPE — cartes premium (lift au hover) */
  .ap-team{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
  .ap-member{position:relative;background:linear-gradient(180deg,#fff,var(--navy-900));border:1px solid var(--w08);border-radius:24px;
    padding:30px 24px;text-align:center;box-shadow:0 22px 50px -34px rgba(10,40,120,.4);
    transition:transform .45s cubic-bezier(.32,.72,0,1),box-shadow .45s,border-color .45s}
  .ap-member:hover{transform:translateY(-6px);box-shadow:0 36px 64px -34px rgba(10,40,120,.5);border-color:var(--w14)}
  .ap-avatar{width:72px;height:72px;border-radius:20px;margin:0 auto 18px;display:flex;align-items:center;justify-content:center;
    background:linear-gradient(150deg,var(--sky),var(--sky-bright));box-shadow:0 14px 28px -10px rgba(10,99,255,.55);
    transition:transform .45s cubic-bezier(.34,1.56,.64,1)}
  .ap-member:hover .ap-avatar{transform:translateY(-3px) scale(1.06)}
  .ap-avatar svg{width:34px;height:34px;stroke:#fff}
  .ap-mnum{font-family:var(--font-m);font-size:.6rem;letter-spacing:2px;color:var(--sky);display:block;margin-bottom:8px}
  .ap-member h3{font-family:var(--font-d);font-weight:800;font-size:1.08rem;color:var(--ink);letter-spacing:-.01em}
  .ap-member p{color:var(--w55);font-size:.89rem;line-height:1.55;margin-top:12px}

  /* PROCESS — timeline connectée */
  .ap-timeline{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:28px;max-width:1000px;margin:0 auto}
  .ap-timeline::before{content:"";position:absolute;top:32px;left:16%;right:16%;height:2px;z-index:0;
    background:linear-gradient(90deg,var(--w14),var(--sky) 30% 70%,var(--w14))}
  .ap-tl{position:relative;z-index:1;text-align:center;padding:0 8px}
  .ap-tl .node{width:64px;height:64px;border-radius:20px;margin:0 auto 22px;display:flex;align-items:center;justify-content:center;
    background:#fff;border:1px solid var(--w14);box-shadow:0 16px 32px -16px rgba(10,40,120,.45)}
  .ap-tl .node svg{width:27px;height:27px;stroke:var(--sky);fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
  .ap-tl .step{font-family:var(--font-m);font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--sky);display:block;margin-bottom:9px}
  .ap-tl h3{font-family:var(--font-d);font-weight:800;font-size:1.18rem;color:var(--ink);letter-spacing:-.015em;margin-bottom:11px}
  .ap-tl p{color:var(--w55);font-size:.92rem;line-height:1.55;max-width:300px;margin:0 auto}

  /* MANIFESTE — panneau sombre signature */
  .ap-manifesto{position:relative;overflow:hidden;isolation:isolate;border-radius:32px;color:#fff;
    padding:clamp(44px,6vw,82px);
    background:
      radial-gradient(900px 520px at 86% -15%, rgba(96,158,255,.45), transparent 60%),
      radial-gradient(720px 600px at 0% 122%, rgba(8,30,120,.5), transparent 55%),
      linear-gradient(158deg,#0c3fd0 0%,#0a2a9e 46%,#08184c 100%);
    box-shadow:0 46px 110px -52px rgba(8,24,76,.62)}
  .ap-manifesto::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.5;
    background-image:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px);
    background-size:54px 54px;
    -webkit-mask-image:radial-gradient(ellipse 95% 95% at 28% 14%,#000,transparent 80%);mask-image:radial-gradient(ellipse 95% 95% at 28% 14%,#000,transparent 80%)}
  .ap-manifesto>*{position:relative;z-index:1}
  .ap-mf-wm{position:absolute;z-index:0;right:-46px;bottom:-66px;width:min(320px,36%);height:auto;opacity:.1;pointer-events:none;user-select:none}
  .ap-mf-eye{display:block;font-family:var(--font-m);font-size:.64rem;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.72);margin-bottom:18px}
  .ap-manifesto h2{font-family:var(--font-d);font-weight:800;font-size:clamp(2rem,4.4vw,3.4rem);letter-spacing:-.03em;line-height:1.04;color:#fff;max-width:15ch}
  .ap-manifesto h2 .hl{background:linear-gradient(98deg,#c7e4ff,#fff 55%,#a9caff);-webkit-background-clip:text;background-clip:text;color:transparent}
  .ap-mf-lead{color:rgba(255,255,255,.78);font-size:1.06rem;line-height:1.6;max-width:580px;margin-top:18px}
  .ap-mf-list{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;margin-top:50px}
  .ap-mf-item{border-top:1px solid rgba(255,255,255,.18);padding-top:20px}
  .ap-mf-item .n{font-family:var(--font-m);font-size:.64rem;letter-spacing:2px;color:#86d2ff;display:block;margin-bottom:12px}
  .ap-mf-item h3{font-family:var(--font-d);font-weight:800;font-size:1.12rem;color:#fff;margin-bottom:9px;letter-spacing:-.01em}
  .ap-mf-item p{color:rgba(255,255,255,.66);font-size:.92rem;line-height:1.55}

  /* POURQUOI RESTER — grille éditoriale à filets */
  .ap-reasons{display:grid;grid-template-columns:repeat(2,1fr);max-width:980px;margin:0 auto;
    border:1px solid var(--w08);border-radius:24px;overflow:hidden;background:linear-gradient(180deg,var(--glass),transparent)}
  .ap-reason{padding:38px 40px;border-right:1px solid var(--w08);border-bottom:1px solid var(--w08);transition:background .3s}
  .ap-reason:nth-child(2n){border-right:0}
  .ap-reason:nth-last-child(-n+2){border-bottom:0}
  .ap-reason:hover{background:var(--glass-2)}
  .ap-ic{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:18px;
    background:rgba(10,99,255,.1);border:1px solid var(--w14)}
  .ap-ic svg{width:23px;height:23px;stroke:var(--sky)}
  .ap-reason h3{font-family:var(--font-d);font-weight:800;font-size:1.22rem;letter-spacing:-.015em;color:var(--ink);margin-bottom:10px}
  .ap-reason p{color:var(--w55);font-size:.95rem;line-height:1.6}

  /* PLATEFORMES */
  .ap-plat{display:flex;align-items:center;justify-content:space-between;gap:28px;flex-wrap:wrap;
    max-width:980px;margin:0 auto;padding:30px 38px;border-radius:24px;
    background:linear-gradient(180deg,var(--glass-2),var(--glass));border:1px solid var(--w14)}
  .ap-plat-head h3{font-family:var(--font-d);font-weight:800;font-size:clamp(1.1rem,2.2vw,1.45rem);color:var(--ink);letter-spacing:-.02em;line-height:1.15;margin-top:8px}
  .ap-plat-logos{display:flex;align-items:center;gap:26px;flex-wrap:wrap}
  .ap-plat-item{display:flex;align-items:center;gap:11px;font-family:var(--font-d);font-weight:700;font-size:.98rem;color:var(--ink)}

  @media(max-width:900px){
    .ap-team{grid-template-columns:repeat(2,1fr)}
    .ap-statband{grid-template-columns:repeat(2,1fr)} .ap-gs:nth-child(2n){border-right:0} .ap-gs:nth-child(-n+2){border-bottom:1px solid var(--w08)}
    .ap-timeline{grid-template-columns:1fr;gap:34px;max-width:420px} .ap-timeline::before{display:none}
    .ap-mf-list{grid-template-columns:1fr;gap:0} .ap-mf-item{border-top:1px solid rgba(255,255,255,.18);padding:18px 0}
  }
  @media(max-width:640px){
    .ap-reasons{grid-template-columns:1fr} .ap-reason{border-right:0!important}
    .ap-reason:nth-last-child(-n+2):not(:last-child){border-bottom:1px solid var(--w08)}
    .ap-plat{flex-direction:column;align-items:flex-start}
  }
`;

/* Données structurelles, indépendantes de la langue (icônes, slugs, compteurs). */
const STAT_DATA = [
  { count: "620", prefix: "+", suffix: "M" },
  {},
  { count: "57", prefix: "+" },
  { count: "24", prefix: "+" },
] as const;
const TEAM_IC: IconName[] = ["compass", "scissors", "broadcast", "trending"];
const TEAM_INI = ["01", "02", "03", "04"];
const STAGE_IC: IconName[] = ["search", "broadcast", "trending"];
const CONVICTION_N = ["01", "02", "03"];
const REASON_IC: IconName[] = ["target", "network", "repeat", "bars"];
const PLATFORM_SLUG = ["tiktok", "youtube", "instagram"];

const COPY = {
  fr: {
    meta: {
      title: "À propos · l'équipe qui rend votre contenu impossible à manquer",
      description:
        "L'équipe derrière des centaines de millions de vues sur le format court. Notre méthode, notre modèle garanti, et pourquoi les marques et créateurs restent campagne après campagne.",
    },
    heroEyebrow: "À propos · Clipeo",
    heroH1a: "L'équipe derrière",
    heroH1grad: "+620M de vues",
    heroH1b: "sur le format court.",
    heroLead:
      "Clipeo transforme le contenu long des plus gros créateurs et marques en omniprésence sur le format court. Une méthode, un réseau de clippers, et un volume de vues garanti au contrat.",
    heroCtaPrimary: "Réserver un audit gratuit",
    heroCtaSecondary: "Voir les études de cas",
    marquee: "+620 M de vues générées pour eux",
    statsK: ["Vues générées · 6 mois", "Clips produits", "Campagnes réalisées", "Créateurs accompagnés"],
    statsV: ["+0M", "+6,6K", "+0", "+0"],
    teamEyebrow: "L'équipe",
    teamH2a: "Une équipe resserrée,",
    teamH2b: "quatre",
    teamH2grad: "expertises.",
    teamLead: "Spécialisée sur une seule chose : rendre votre contenu impossible à manquer.",
    team: [
      { t: "Stratégie & Audit", bio: "On cartographie votre contenu et on fixe l'objectif de vues, dès le départ." },
      { t: "Production de clips", bio: "On pilote le réseau de clippers et la qualité des montages." },
      { t: "Distribution", bio: "On orchestre la diffusion multi-comptes et l'algo de chaque plateforme." },
      { t: "Performance", bio: "On suit le tracking, les vues et l'optimisation des vagues suivantes." },
    ],
    methodEyebrow: "La méthode",
    methodH2a: "De l'audit à la croissance,",
    methodH2b: "en",
    methodH2grad: "trois temps.",
    stages: [
      { s: "Étape 01", t: "Audit & stratégie", p: "On cartographie votre contenu long, on fixe un objectif de vues chiffré et les angles à fort potentiel. Tout part d'un audit gratuit." },
      { s: "Étape 02", t: "Production & distribution", p: "Le réseau de clippers produit des centaines de clips aux codes de chaque plateforme, diffusés sur des dizaines de comptes." },
      { s: "Étape 03", t: "Optimisation & scale", p: "On mesure, on coupe, on amplifie. Chaque vague nourrit la suivante jusqu'à saturer la recommandation de votre audience." },
    ],
    manifestoEyebrow: "Notre conviction",
    manifestoH2a: "L'omniprésence,",
    manifestoH2b: "pas la",
    manifestoH2grad: "viralité.",
    manifestoLead:
      "La viralité est un coup de chance. L'omniprésence est une stratégie. Voilà comment on pense la distribution à la performance, sur chaque campagne.",
    convictions: [
      { t: "La performance d'abord", p: "On ne vend pas des « posts » ni des « impressions ». On vend des vues réelles, garanties au contrat, et une redirection mesurable." },
      { t: "Pensé pour l'échelle", p: "On ne mise pas sur LE clip qui explose. On sature la recommandation de dizaines de clips, sur dizaines de comptes." },
      { t: "Un modèle aligné", p: "Vous payez les vues, pas l'effort. Le volume est garanti au contrat. Objectif non atteint ? On rembourse la différence." },
    ],
    reasonsH2a: "Pourquoi nos clients restent",
    reasonsH2b: "après la première campagne.",
    reasonsLead: "Pas de promesses floues. Une méthode mesurable, un engagement contractuel, une obsession du résultat.",
    reasons: [
      { t: "Une direction experte", p: "Vous parlez à des gens qui pensent stratégie, pas à un sous-traitant. La ligne édito et l'objectif de vues sont posés dès l'audit." },
      { t: "Le réseau géré pour vous", p: "Des dizaines de clippers et de comptes, mais un seul interlocuteur. On absorbe la complexité, vous gardez la main sur votre image." },
      { t: "On teste, on itère", p: "Chaque vague de clips est analysée. Ce qui marche est amplifié, ce qui ne marche pas est coupé. La campagne s'améliore en continu." },
      { t: "Un reporting actionnable", p: "Tracking par contenu, plateforme et thème. Vous savez exactement ce qui ramène des vues, et pourquoi." },
    ],
    platformsEyebrow: "La distribution",
    platformsH3: "Présents là où votre audience scrolle.",
    platformLabels: ["TikTok", "YouTube Shorts", "Instagram Reels"],
    ctaTitle: "Discutons de votre prochaine campagne.",
    ctaText: "20 minutes, sans préparation. On audite votre contenu et on vous projette un objectif de vues chiffré.",
  },
  en: {
    meta: {
      title: "About · the team that makes your content impossible to miss",
      description:
        "The team behind hundreds of millions of short-form views. Our method, our guaranteed model, and why brands and creators stay campaign after campaign.",
    },
    heroEyebrow: "About · Clipeo",
    heroH1a: "The team behind",
    heroH1grad: "+620M views",
    heroH1b: "in short form.",
    heroLead:
      "Clipeo turns the long-form content of the biggest creators and brands into omnipresence in short form. One method, a network of clippers, and a view volume guaranteed in the contract.",
    heroCtaPrimary: "Book a free audit",
    heroCtaSecondary: "See the case studies",
    marquee: "+620M views generated for them",
    statsK: ["Views generated · 6 months", "Clips produced", "Campaigns delivered", "Creators served"],
    statsV: ["+0M", "+6.6K", "+0", "+0"],
    teamEyebrow: "The team",
    teamH2a: "A tight team,",
    teamH2b: "four",
    teamH2grad: "specialties.",
    teamLead: "Focused on one thing only: making your content impossible to miss.",
    team: [
      { t: "Strategy & Audit", bio: "We map your content and set the view target from day one." },
      { t: "Clip production", bio: "We run the network of clippers and the quality of every edit." },
      { t: "Distribution", bio: "We orchestrate multi-account distribution and each platform's algorithm." },
      { t: "Performance", bio: "We track views, measure results, and optimize the next waves." },
    ],
    methodEyebrow: "The method",
    methodH2a: "From audit to growth,",
    methodH2b: "in",
    methodH2grad: "three moves.",
    stages: [
      { s: "Step 01", t: "Audit & strategy", p: "We map your long-form content, set a hard view target, and find the highest-potential angles. It all starts with a free audit." },
      { s: "Step 02", t: "Production & distribution", p: "The network of clippers produces hundreds of clips built for each platform's codes, distributed across dozens of accounts." },
      { s: "Step 03", t: "Optimization & scale", p: "We measure, we cut, we amplify. Each wave feeds the next until we saturate your audience's recommendations." },
    ],
    manifestoEyebrow: "What we believe",
    manifestoH2a: "Omnipresence,",
    manifestoH2b: "not",
    manifestoH2grad: "virality.",
    manifestoLead:
      "Virality is luck. Omnipresence is a strategy. Here is how we approach performance distribution on every campaign.",
    convictions: [
      { t: "Performance first", p: "We don't sell “posts” or “impressions.” We sell real views, guaranteed in the contract, and measurable redirection." },
      { t: "Built for scale", p: "We don't bet on the one clip that blows up. We saturate recommendations with dozens of clips, across dozens of accounts." },
      { t: "An aligned model", p: "You pay for views, not effort. The volume is guaranteed in the contract. Target missed? We refund the difference." },
    ],
    reasonsH2a: "Why our clients stay",
    reasonsH2b: "after the first campaign.",
    reasonsLead: "No vague promises. A measurable method, a contractual commitment, an obsession with results.",
    reasons: [
      { t: "Expert direction", p: "You talk to people who think strategy, not a subcontractor. The editorial line and the view target are set at the audit." },
      { t: "The network managed for you", p: "Dozens of clippers and accounts, but a single point of contact. We absorb the complexity, you keep control of your image." },
      { t: "We test, we iterate", p: "Every wave of clips is analyzed. What works gets amplified, what doesn't gets cut. The campaign improves continuously." },
      { t: "Reporting you can act on", p: "Tracking by content, platform, and theme. You know exactly what brings views, and why." },
    ],
    platformsEyebrow: "Distribution",
    platformsH3: "Present wherever your audience scrolls.",
    platformLabels: ["TikTok", "YouTube Shorts", "Instagram Reels"],
    ctaTitle: "Let's talk about your next campaign.",
    ctaText: "20 minutes, no prep. We audit your content and project a hard view target for you.",
  },
} as const;

export default async function AProposPage() {
  const locale = (await getLocale()) as keyof typeof COPY;
  const t = COPY[locale] ?? COPY.fr;

  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="mono-label" style={{ display: "block", marginBottom: 20 }}>{t.heroEyebrow}</span>
          <h1>
            {t.heroH1a}<br />
            <span className="grad">{t.heroH1grad}</span> {t.heroH1b}
          </h1>
          <p>{t.heroLead}</p>
          <div className="ap-hero-cta">
            <Link href="/contact" className="btn btn-primary"><span>{t.heroCtaPrimary}</span></Link>
            <Link href="/etudes-de-cas" className="btn"><span>{t.heroCtaSecondary}</span></Link>
          </div>
        </div>
      </section>

      {/* PREUVE VISUELLE — marquee des créateurs */}
      <div className="logos">
        <span className="mono-label">{t.marquee}</span>
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

      {/* BANDE DE STATS */}
      <section className="sec">
        <div className="container">
          <div className="ap-statband reveal">
            {STAT_DATA.map((s, i) => (
              <div className="ap-gs" key={t.statsK[i]}>
                <div className="v" {...("count" in s && s.count ? { "data-count": s.count, "data-prefix": s.prefix ?? "", "data-suffix": ("suffix" in s ? s.suffix : "") ?? "" } : {})}>{t.statsV[i]}</div>
                <div className="k">{t.statsK[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉQUIPE */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head reveal">
            <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>{t.teamEyebrow}</span>
            <h2>{t.teamH2a}<br />{t.teamH2b} <span className="grad">{t.teamH2grad}</span></h2>
            <p>{t.teamLead}</p>
          </div>
          <div className="ap-team stagger">
            {t.team.map((m, i) => (
              <div className="ap-member" key={TEAM_INI[i]}>
                <div className="ap-avatar" aria-hidden="true"><Glyph name={TEAM_IC[i]} /></div>
                <span className="ap-mnum">{TEAM_INI[i]}</span>
                <h3>{m.t}</h3>
                <p>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — timeline */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head reveal">
            <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>{t.methodEyebrow}</span>
            <h2>{t.methodH2a}<br />{t.methodH2b} <span className="grad">{t.methodH2grad}</span></h2>
          </div>
          <div className="ap-timeline stagger">
            {t.stages.map((s, i) => (
              <div className="ap-tl" key={s.s}>
                <div className="node" aria-hidden="true"><Glyph name={STAGE_IC[i]} /></div>
                <span className="step">{s.s}</span>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTE — panneau sombre */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="ap-manifesto reveal">
            {/* eslint-disable-next-line @next/next/no-img-element -- filigrane décoratif */}
            <img className="ap-mf-wm" src="/img/logo-mark-white.png" alt="" aria-hidden="true" />
            <span className="ap-mf-eye">{t.manifestoEyebrow}</span>
            <h2>{t.manifestoH2a}<br />{t.manifestoH2b} <span className="hl">{t.manifestoH2grad}</span></h2>
            <p className="ap-mf-lead">{t.manifestoLead}</p>
            <div className="ap-mf-list">
              {t.convictions.map((c, i) => (
                <div className="ap-mf-item" key={CONVICTION_N[i]}>
                  <span className="n">{CONVICTION_N[i]}</span>
                  <h3>{c.t}</h3>
                  <p>{c.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI RESTER */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head reveal">
            <h2>{t.reasonsH2a}<br />{t.reasonsH2b}</h2>
            <p>{t.reasonsLead}</p>
          </div>
          <div className="ap-reasons reveal">
            {t.reasons.map((r, i) => (
              <div className="ap-reason" key={r.t}>
                <div className="ap-ic" aria-hidden="true"><Glyph name={REASON_IC[i]} /></div>
                <h3>{r.t}</h3>
                <p>{r.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATEFORMES */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="ap-plat reveal">
            <div className="ap-plat-head">
              <span className="mono-label">{t.platformsEyebrow}</span>
              <h3>{t.platformsH3}</h3>
            </div>
            <div className="ap-plat-logos">
              {PLATFORM_SLUG.map((slug, i) => (
                <span className="ap-plat-item" key={slug}>
                  <PlatformTile p={slug} size={34} />
                  {t.platformLabels[i]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaPanel
        title={t.ctaTitle}
        text={t.ctaText}
      />
    </main>
  );
}
