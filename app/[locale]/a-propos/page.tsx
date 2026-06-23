import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import CtaPanel from "@/components/CtaPanel";
import { PlatformTile } from "@/components/BrandLogo";
import { TRUST_BAR } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos · l'équipe qui rend votre contenu impossible à manquer",
  description:
    "L'équipe derrière des centaines de millions de vues sur le format court. Notre méthode, notre modèle garanti, et pourquoi les marques et créateurs restent campagne après campagne.",
  alternates: { canonical: "/a-propos" },
};

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

const STATS = [
  { v: "+0M", count: "620", prefix: "+", suffix: "M", k: "Vues générées · 6 mois" },
  { v: "+6,6K", k: "Clips produits" },
  { v: "+0", count: "57", prefix: "+", k: "Campagnes réalisées" },
  { v: "+0", count: "24", prefix: "+", k: "Créateurs accompagnés" },
];

const TEAM: { ini: string; ic: IconName; t: string; bio: string }[] = [
  { ini: "01", ic: "compass", t: "Stratégie & Audit", bio: "On cartographie votre contenu et on fixe l'objectif de vues, dès le départ." },
  { ini: "02", ic: "scissors", t: "Production de clips", bio: "On pilote le réseau de clippers et la qualité des montages." },
  { ini: "03", ic: "broadcast", t: "Distribution", bio: "On orchestre la diffusion multi-comptes et l'algo de chaque plateforme." },
  { ini: "04", ic: "trending", t: "Performance", bio: "On suit le tracking, les vues et l'optimisation des vagues suivantes." },
];

const STAGES: { s: string; ic: IconName; t: string; p: string }[] = [
  { s: "Étape 01", ic: "search", t: "Audit & stratégie", p: "On cartographie votre contenu long, on fixe un objectif de vues chiffré et les angles à fort potentiel. Tout part d'un audit gratuit." },
  { s: "Étape 02", ic: "broadcast", t: "Production & distribution", p: "Le réseau de clippers produit des centaines de clips aux codes de chaque plateforme, diffusés sur des dizaines de comptes." },
  { s: "Étape 03", ic: "trending", t: "Optimisation & scale", p: "On mesure, on coupe, on amplifie. Chaque vague nourrit la suivante jusqu'à saturer la recommandation de votre audience." },
];

const CONVICTIONS = [
  { n: "01", t: "La performance d'abord", p: "On ne vend pas des « posts » ni des « impressions ». On vend des vues réelles, garanties au contrat, et une redirection mesurable." },
  { n: "02", t: "Pensé pour l'échelle", p: "On ne mise pas sur LE clip qui explose. On sature la recommandation de dizaines de clips, sur dizaines de comptes." },
  { n: "03", t: "Un modèle aligné", p: "Vous payez les vues, pas l'effort. Le volume est garanti au contrat. Objectif non atteint ? On rembourse la différence." },
];

const REASONS: { ic: IconName; t: string; p: string }[] = [
  { ic: "target", t: "Une direction experte", p: "Vous parlez à des gens qui pensent stratégie, pas à un sous-traitant. La ligne édito et l'objectif de vues sont posés dès l'audit." },
  { ic: "network", t: "Le réseau géré pour vous", p: "Des dizaines de clippers et de comptes, mais un seul interlocuteur. On absorbe la complexité, vous gardez la main sur votre image." },
  { ic: "repeat", t: "On teste, on itère", p: "Chaque vague de clips est analysée. Ce qui marche est amplifié, ce qui ne marche pas est coupé. La campagne s'améliore en continu." },
  { ic: "bars", t: "Un reporting actionnable", p: "Tracking par contenu, plateforme et thème. Vous savez exactement ce qui ramène des vues, et pourquoi." },
];

const PLATFORMS = [
  { p: "tiktok", label: "TikTok" },
  { p: "youtube", label: "YouTube Shorts" },
  { p: "instagram", label: "Instagram Reels" },
];

export default function AProposPage() {
  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="mono-label" style={{ display: "block", marginBottom: 20 }}>À propos · Clipeo</span>
          <h1>
            L&apos;équipe derrière<br />
            <span className="grad">+620M de vues</span> sur le format court.
          </h1>
          <p>
            Clipeo transforme le contenu long des plus gros créateurs et marques en omniprésence sur le
            format court. Une méthode, un réseau de clippers, et un volume de vues garanti au contrat.
          </p>
          <div className="ap-hero-cta">
            <Link href="/contact" className="btn btn-primary"><span>Réserver un audit gratuit</span></Link>
            <Link href="/etudes-de-cas" className="btn"><span>Voir les études de cas</span></Link>
          </div>
        </div>
      </section>

      {/* PREUVE VISUELLE — marquee des créateurs */}
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

      {/* BANDE DE STATS */}
      <section className="sec">
        <div className="container">
          <div className="ap-statband reveal">
            {STATS.map((s) => (
              <div className="ap-gs" key={s.k}>
                <div className="v" {...(s.count ? { "data-count": s.count, "data-prefix": s.prefix ?? "", "data-suffix": s.suffix ?? "" } : {})}>{s.v}</div>
                <div className="k">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉQUIPE */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head reveal">
            <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>L&apos;équipe</span>
            <h2>Une équipe resserrée,<br />quatre <span className="grad">expertises.</span></h2>
            <p>Spécialisée sur une seule chose : rendre votre contenu impossible à manquer.</p>
          </div>
          <div className="ap-team stagger">
            {TEAM.map((m) => (
              <div className="ap-member" key={m.ini}>
                <div className="ap-avatar" aria-hidden="true"><Glyph name={m.ic} /></div>
                <span className="ap-mnum">{m.ini}</span>
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
            <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>La méthode</span>
            <h2>De l&apos;audit à la croissance,<br />en <span className="grad">trois temps.</span></h2>
          </div>
          <div className="ap-timeline stagger">
            {STAGES.map((s) => (
              <div className="ap-tl" key={s.s}>
                <div className="node" aria-hidden="true"><Glyph name={s.ic} /></div>
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
            <span className="ap-mf-eye">Notre conviction</span>
            <h2>L&apos;omniprésence,<br />pas la <span className="hl">viralité.</span></h2>
            <p className="ap-mf-lead">
              La viralité est un coup de chance. L&apos;omniprésence est une stratégie. Voilà comment on pense
              la distribution à la performance, sur chaque campagne.
            </p>
            <div className="ap-mf-list">
              {CONVICTIONS.map((c) => (
                <div className="ap-mf-item" key={c.n}>
                  <span className="n">{c.n}</span>
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
            <h2>Pourquoi nos clients restent<br />après la première campagne.</h2>
            <p>Pas de promesses floues. Une méthode mesurable, un engagement contractuel, une obsession du résultat.</p>
          </div>
          <div className="ap-reasons reveal">
            {REASONS.map((r) => (
              <div className="ap-reason" key={r.t}>
                <div className="ap-ic" aria-hidden="true"><Glyph name={r.ic} /></div>
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
              <span className="mono-label">La distribution</span>
              <h3>Présents là où votre audience scrolle.</h3>
            </div>
            <div className="ap-plat-logos">
              {PLATFORMS.map((pf) => (
                <span className="ap-plat-item" key={pf.p}>
                  <PlatformTile p={pf.p} size={34} />
                  {pf.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaPanel
        title="Discutons de votre prochaine campagne."
        text="20 minutes, sans préparation. On audite votre contenu et on vous projette un objectif de vues chiffré."
      />
    </main>
  );
}
