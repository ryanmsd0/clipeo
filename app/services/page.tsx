import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/CtaPanel";
import ScrollParallax from "@/components/ScrollParallax";
import { Check, ArrowR } from "@/components/Icons";
import { PlatformTile } from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Services · campagne managée, production de clips, distribution",
  description:
    "Travaillez avec Clipeo : campagne de clipping managée de bout en bout, production de clips à la demande, ou distribution multi-comptes. Choisissez ce qui colle à votre besoin.",
  alternates: { canonical: "/services" },
};

const STYLES = `
  .sv-hero{position:relative;overflow:hidden;padding:160px 0 60px;text-align:center;isolation:isolate}
  .sv-orb{position:absolute;border-radius:50%;filter:blur(60px);opacity:.5;z-index:-1;pointer-events:none}
  .sv-orb.a{width:520px;height:520px;top:-160px;left:-120px;background:radial-gradient(circle,rgba(10,99,255,.28),transparent 70%)}
  .sv-orb.b{width:460px;height:460px;top:-80px;right:-120px;background:radial-gradient(circle,rgba(10,99,255,.18),transparent 70%)}
  .sv-chips{position:absolute;inset:0;z-index:-1;pointer-events:none}
  .sv-chip{position:absolute;display:flex;align-items:center;gap:8px;padding:11px 16px;border-radius:14px;background:#fff;
    border:1px solid var(--w08);box-shadow:0 22px 50px -26px rgba(10,40,120,.4);font-family:var(--font-d);font-weight:700;font-size:.82rem;color:var(--ink)}
  .sv-chip i{width:24px;height:24px;border-radius:7px;display:inline-block}
  .sv-chip.c1{top:120px;left:7%}
  .sv-chip.c2{top:210px;right:8%}
  .sv-chip.c3{top:330px;left:12%}
  .sv-chip.c4{top:300px;right:13%}

  .sv-eyebrow{display:inline-flex;align-items:center;gap:9px;padding:8px 16px;border-radius:50px;background:var(--glass);border:1px solid var(--w14);
    font-family:var(--font-m);font-size:.64rem;letter-spacing:2px;text-transform:uppercase;color:var(--w55);margin-bottom:24px}
  .sv-eyebrow b{color:var(--sky-bright);font-weight:700}
  .sv-hero h1{font-family:var(--font-d);font-weight:800;font-size:clamp(2.4rem,6vw,4.4rem);line-height:1.04;letter-spacing:-.03em;margin-bottom:20px}
  .sv-hero .sub{font-size:clamp(1.05rem,1.7vw,1.25rem);color:var(--w70);max-width:600px;margin:0 auto 30px;line-height:1.6}
  .sv-cta{display:flex;gap:13px;justify-content:center;flex-wrap:wrap}

  /* Offres */
  .sv-tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;align-items:start}
  .sv-tier{position:relative;display:flex;flex-direction:column;background:linear-gradient(180deg,var(--glass-2),var(--glass));
    border:1px solid var(--w14);border-radius:24px;padding:32px 28px;transition:transform .4s,border-color .4s}
  .sv-tier:hover{transform:translateY(-5px);border-color:var(--w22)}
  .sv-tier.feat{background:linear-gradient(180deg,#0b2a8c,var(--ink));border-color:transparent;box-shadow:0 40px 90px -44px rgba(10,40,120,.7)}
  .sv-tier.feat *{color:#fff}
  .sv-badge{position:absolute;top:-12px;left:28px;padding:6px 14px;border-radius:50px;background:var(--sky);color:#fff !important;
    font-family:var(--font-m);font-size:.58rem;letter-spacing:1.5px;text-transform:uppercase;font-weight:700}
  .sv-tier .kick{font-family:var(--font-m);font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--sky);margin-bottom:14px;display:block}
  .sv-tier.feat .kick{color:#9bd0ff}
  .sv-tier h3{font-family:var(--font-d);font-weight:800;font-size:1.5rem;letter-spacing:-.02em;color:var(--ink);margin-bottom:8px}
  .sv-tier .tg{color:var(--w55);font-size:.95rem;line-height:1.55;margin-bottom:22px}
  .sv-tier.feat .tg{color:rgba(255,255,255,.7)}
  .sv-tier ul{list-style:none;display:flex;flex-direction:column;gap:11px;margin-bottom:26px}
  .sv-tier li{display:flex;align-items:flex-start;gap:10px;font-size:.93rem;color:var(--w70);line-height:1.45}
  .sv-tier.feat li{color:rgba(255,255,255,.88)}
  .sv-tier li svg{flex:none;width:18px;height:18px;stroke:var(--sky);fill:none;stroke-width:2.6;margin-top:1px}
  .sv-tier.feat li svg{stroke:#9bd0ff}
  .sv-tbtn{margin-top:auto;display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:13px 20px;border-radius:50px;
    font-family:var(--font-d);font-weight:700;font-size:.92rem;transition:transform .3s}
  .sv-tbtn:hover{transform:translateY(-2px)}
  .sv-tbtn.ghost{background:var(--glass);border:1px solid var(--w14);color:var(--ink)}
  .sv-tbtn.solid{background:#fff;color:var(--ink)}

  /* Inclus partout */
  .sv-incl{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  .sv-inc{background:#fff;border:1px solid var(--w08);border-radius:18px;padding:24px;box-shadow:0 18px 40px -30px rgba(10,40,120,.35)}
  .sv-inc .ic{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;
    background:rgba(10,99,255,.1)}
  .sv-inc .ic svg{width:20px;height:20px;stroke:var(--sky);fill:none;stroke-width:2.4}
  .sv-inc h4{font-family:var(--font-d);font-weight:800;font-size:1.02rem;color:var(--ink);margin-bottom:6px;letter-spacing:-.01em}
  .sv-inc p{color:var(--w55);font-size:.88rem;line-height:1.5}

  /* Process */
  .sv-proc{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .sv-proc::before{content:"";position:absolute;top:30px;left:8%;right:8%;height:2px;background:linear-gradient(90deg,var(--w14),var(--sky),var(--w14));z-index:0}
  .sv-step{position:relative;z-index:1;text-align:center;padding:0 8px}
  .sv-step .dot{width:60px;height:60px;border-radius:50%;margin:0 auto 18px;display:flex;align-items:center;justify-content:center;
    background:#fff;border:2px solid var(--w14);font-family:var(--font-d);font-weight:800;font-size:1.2rem;color:var(--sky);box-shadow:0 14px 30px -14px rgba(10,99,255,.5)}
  .sv-step h4{font-family:var(--font-d);font-weight:800;font-size:1.1rem;color:var(--ink);margin-bottom:8px;letter-spacing:-.01em}
  .sv-step p{color:var(--w55);font-size:.9rem;line-height:1.55}

  @media(max-width:900px){
    .sv-tiers{grid-template-columns:1fr;max-width:460px;margin:0 auto}
    .sv-incl{grid-template-columns:1fr 1fr}
    .sv-proc{grid-template-columns:1fr 1fr;gap:30px 16px}.sv-proc::before{display:none}
    .sv-chip{display:none}
  }
  @media(max-width:520px){.sv-incl{grid-template-columns:1fr}.sv-proc{grid-template-columns:1fr}}
`;

const TIERS = [
  {
    slug: "campagne-managee", kick: "Le plus choisi", feat: true, name: "Campagne managée", tg: "On gère tout, de l'audit à la croissance. Vous validez la ligne édito, on s'occupe du reste.",
    items: ["Audit & stratégie + objectif de vues chiffré", "Production de clips par notre réseau de clippers", "Distribution sur des dizaines de comptes", "Tracking, reporting & optimisation continue"],
    cta: "Découvrir l'offre", btn: "solid",
  },
  {
    slug: "production-de-clips", kick: "À la demande", feat: false, name: "Production de clips", tg: "Vous avez le contenu long, vous voulez les clips. On découpe, on monte, vous diffusez.",
    items: ["Découpage & montage aux codes de chaque plateforme", "Sous-titres optimisés pour la rétention", "Livraison prête à poster", "Volume adapté à votre rythme"],
    cta: "Découvrir l'offre", btn: "ghost",
  },
  {
    slug: "distribution-tracking", kick: "Diffusion", feat: false, name: "Distribution & tracking", tg: "Vous avez les clips, il leur manque la portée. On les fait tourner sur notre réseau.",
    items: ["Diffusion multi-comptes & multi-plateformes", "Calage aux fenêtres algo de chaque réseau", "Tracking par contenu & plateforme", "Rapport de performance détaillé"],
    cta: "Découvrir l'offre", btn: "ghost",
  },
];

const INCLUDED = [
  { t: "Objectif garanti", d: "Un volume de vues chiffré et inscrit au contrat, ou remboursé." },
  { t: "Multi-plateforme", d: "TikTok, Reels, Shorts et Twitch, aux codes de chacun." },
  { t: "Sous-titres pro", d: "Montage et sous-titrage pensés pour la rétention." },
  { t: "Reporting clair", d: "Tracking par contenu, plateforme et thème, en continu." },
];

const STEPS = [
  { n: "1", t: "Audit", d: "On cartographie votre contenu et on fixe l'objectif de vues." },
  { n: "2", t: "Production", d: "Le réseau de clippers produit des centaines de clips." },
  { n: "3", t: "Distribution", d: "Diffusion sur des dizaines de comptes, au bon moment." },
  { n: "4", t: "Optimisation", d: "On mesure, on coupe, on amplifie. Chaque vague nourrit la suivante." },
];

export default function ServicesPage() {
  return (
    <ScrollParallax>
      <main>
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />

        {/* HERO */}
        <section className="sv-hero">
          <div className="sv-orb a" data-parallax="0.3" />
          <div className="sv-orb b" data-parallax="0.18" />
          <div className="sv-chips" aria-hidden="true">
            <div className="sv-chip c1" data-parallax="0.5"><PlatformTile p="tiktok" size={24} />TikTok</div>
            <div className="sv-chip c2" data-parallax="0.32"><PlatformTile p="youtube" size={24} />YouTube Shorts</div>
            <div className="sv-chip c3" data-parallax="0.42"><PlatformTile p="instagram" size={24} />Reels</div>
            <div className="sv-chip c4" data-parallax="0.24"><PlatformTile p="twitch" size={24} />Twitch</div>
          </div>
          <div className="container">
            <span className="sv-eyebrow">Travailler avec Clipeo · <b>+620M de vues générées</b></span>
            <h1>Une agence.<br />Trois façons de <span className="grad">passer à l&apos;échelle.</span></h1>
            <p className="sub">
              Campagne managée de bout en bout, production de clips à la demande, ou distribution
              multi-comptes. Vous choisissez ce qui colle à votre besoin, on garantit le résultat.
            </p>
            <div className="sv-cta">
              <Link href="/contact" className="btn btn-primary"><span>Réserver un audit gratuit</span><ArrowR /></Link>
              <Link href="/etudes-de-cas" className="btn"><span>Voir les études de cas</span></Link>
            </div>
          </div>
        </section>

        {/* OFFRES */}
        <section className="sec" style={{ paddingTop: 20 }}>
          <div className="container">
            <div className="sec-head reveal">
              <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>Nos offres</span>
              <h2>Choisissez ce qui<br />colle à votre besoin.</h2>
            </div>
            <div className="sv-tiers stagger">
              {TIERS.map((t) => (
                <div className={`sv-tier${t.feat ? " feat" : ""}`} key={t.name}>
                  {t.feat ? <span className="sv-badge">{t.kick}</span> : <span className="kick">{t.kick}</span>}
                  <h3>{t.name}</h3>
                  <p className="tg">{t.tg}</p>
                  <ul>{t.items.map((it) => <li key={it}><Check />{it}</li>)}</ul>
                  <Link href={`/services/${t.slug}`} className={`sv-tbtn ${t.btn}`}>{t.cta}<ArrowR /></Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INCLUS PARTOUT */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head reveal">
              <h2>Toujours inclus,<br />quelle que soit l&apos;offre.</h2>
            </div>
            <div className="sv-incl stagger">
              {INCLUDED.map((i) => (
                <div className="sv-inc" key={i.t}>
                  <div className="ic"><Check /></div>
                  <h4>{i.t}</h4>
                  <p>{i.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head reveal">
              <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>Le déroulé</span>
              <h2>De l&apos;audit à la<br /><span className="grad">croissance.</span></h2>
            </div>
            <div className="sv-proc reveal">
              {STEPS.map((s) => (
                <div className="sv-step" key={s.n}>
                  <div className="dot">{s.n}</div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="global-stats reveal" style={{ marginTop: 0 }}>
              <div className="gstat"><div className="v grad" data-count="620" data-prefix="+" data-suffix="M">+0M</div><div className="k">Vues générées · 6 mois</div></div>
              <div className="gstat"><div className="v grad">+6,6K</div><div className="k">Clips produits</div></div>
              <div className="gstat"><div className="v grad" data-count="57" data-prefix="+">+0</div><div className="k">Campagnes réalisées</div></div>
              <div className="gstat"><div className="v accent" data-count="48" data-suffix="h">0h</div><div className="k">Pour lancer une campagne</div></div>
            </div>
          </div>
        </section>

        <CtaPanel
          title="On audite votre contenu. Gratuitement."
          text="20 minutes pour identifier vos meilleurs angles et vous projeter un objectif de vues chiffré. Sans engagement."
        />
      </main>
    </ScrollParallax>
  );
}
