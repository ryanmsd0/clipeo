import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import CtaPanel from "@/components/CtaPanel";
import ScrollParallax from "@/components/ScrollParallax";
import ServicesPillars from "@/components/ServicesPillars";
import { Check, ArrowR } from "@/components/Icons";
import { PlatformTile } from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Le service Clipeo · audit, algorithme, production, distribution, tracking",
  description:
    "Un seul service qui réunit tout notre savoir-faire : compréhension fine de l'algorithme, audit, stratégie, production de clips, distribution multi-comptes et tracking. De votre contenu long à des vues qui comptent.",
  alternates: { canonical: "/services" },
};

const SIGNALS = [
  { k: "Hook < 3 s", v: "Capter avant le scroll" },
  { k: "Rétention & watch-time", v: "Le signal n°1 des plateformes" },
  { k: "Fenêtres de publication", v: "Le bon moment, réseau par réseau" },
  { k: "Format & ratio natifs", v: "Aux codes de chaque plateforme" },
  { k: "Sous-titres & rythme", v: "Pensés pour aller au bout" },
  { k: "Signaux d'engagement", v: "Commentaires, partages, replays" },
];

const METHOD = [
  { n: "1", t: "Audit", d: "On analyse votre contenu et on fixe un objectif de vues chiffré." },
  { n: "2", t: "Stratégie", d: "Plan de diffusion : formats, cadence, plateformes, narratifs." },
  { n: "3", t: "Production", d: "Le réseau de clippers produit des centaines de clips orientés rétention." },
  { n: "4", t: "Distribution", d: "Diffusion multi-comptes, calée sur les fenêtres algo de chaque réseau." },
  { n: "5", t: "Tracking", d: "Mesure par contenu, plateforme et thème, en continu." },
  { n: "6", t: "Optimisation", d: "On coupe, on amplifie. Chaque vague nourrit la suivante." },
];

const INCLUDED = [
  { t: "Objectif garanti", d: "Un volume de vues chiffré, inscrit au contrat, ou remboursé." },
  { t: "Multi-plateforme", d: "TikTok, Reels et Shorts, aux codes de chacun." },
  { t: "Sous-titres pro", d: "Montage et sous-titrage pensés pour la rétention." },
  { t: "Reporting clair", d: "Tracking par contenu, plateforme et thème, en continu." },
];

const STYLES = `
  .sv-hero{position:relative;overflow:hidden;padding:160px 0 60px;text-align:center;isolation:isolate}
  .sv-orb{position:absolute;border-radius:50%;filter:blur(60px);opacity:.5;z-index:-1;pointer-events:none}
  .sv-orb.a{width:520px;height:520px;top:-160px;left:-120px;background:radial-gradient(circle,rgba(10,99,255,.28),transparent 70%)}
  .sv-orb.b{width:460px;height:460px;top:-80px;right:-120px;background:radial-gradient(circle,rgba(10,99,255,.18),transparent 70%)}
  .sv-chips{position:absolute;inset:0;z-index:-1;pointer-events:none}
  .sv-chip{position:absolute;display:flex;align-items:center;gap:8px;padding:11px 16px;border-radius:14px;background:#fff;
    border:1px solid var(--w08);box-shadow:0 22px 50px -26px rgba(10,40,120,.4);font-family:var(--font-d);font-weight:700;font-size:.82rem;color:var(--ink)}
  .sv-chip.c1{top:120px;left:7%}
  .sv-chip.c2{top:170px;right:8%}
  .sv-chip.c3{top:320px;left:12%}
  .sv-eyebrow{display:inline-flex;align-items:center;gap:9px;padding:8px 16px;border-radius:50px;background:var(--glass);border:1px solid var(--w14);
    font-family:var(--font-m);font-size:.64rem;letter-spacing:2px;text-transform:uppercase;color:var(--w55);margin-bottom:24px}
  .sv-eyebrow b{color:var(--sky-bright);font-weight:700}
  .sv-hero h1{font-family:var(--font-d);font-weight:800;font-size:clamp(2.4rem,6vw,4.4rem);line-height:1.04;letter-spacing:-.03em;margin-bottom:20px}
  .sv-hero .sub{font-size:clamp(1.05rem,1.7vw,1.25rem);color:var(--w70);max-width:640px;margin:0 auto 30px;line-height:1.6}
  .sv-cta{display:flex;gap:13px;justify-content:center;flex-wrap:wrap}

  /* Algorithme — split */
  .sx-algo{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center}
  .sx-algo h2{margin-bottom:18px}
  .sx-algo .lede{color:var(--w70);font-size:1.05rem;line-height:1.7;margin-bottom:22px;max-width:480px}
  .sx-algo .pts{list-style:none;display:flex;flex-direction:column;gap:13px}
  .sx-algo .pts li{position:relative;padding-left:28px;color:var(--w70);font-size:.98rem;line-height:1.5}
  .sx-algo .pts li svg{position:absolute;left:0;top:2px;width:18px;height:18px;stroke:var(--sky);fill:none;stroke-width:2.6}
  .sx-panel{background:linear-gradient(180deg,#0b2a8c,var(--ink));border-radius:24px;padding:34px 30px;box-shadow:0 44px 90px -44px rgba(10,40,120,.7)}
  .sx-panel .ph{font-family:var(--font-m);font-size:.6rem;letter-spacing:2px;text-transform:uppercase;color:#9bd0ff;margin-bottom:20px;display:block}
  .sx-sig{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:14px 0;border-top:1px solid rgba(255,255,255,.1)}
  .sx-sig:first-of-type{border-top:none}
  .sx-sig .sk{font-family:var(--font-d);font-weight:700;font-size:.98rem;color:#fff}
  .sx-sig .sv{font-size:.82rem;color:rgba(255,255,255,.6);text-align:right;line-height:1.35}

  /* Méthode */
  .sx-method{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .sx-mc{position:relative;background:#fff;border:1px solid var(--w08);border-radius:20px;padding:26px;box-shadow:0 18px 40px -30px rgba(10,40,120,.35);overflow:hidden}
  .sx-mc .n{font-family:var(--font-d);font-weight:800;font-size:3rem;line-height:1;letter-spacing:-.04em;
    background:linear-gradient(180deg,var(--sky-bright),var(--sky));-webkit-background-clip:text;background-clip:text;color:transparent;opacity:.22;position:absolute;top:14px;right:20px}
  .sx-mc h4{font-family:var(--font-d);font-weight:800;font-size:1.12rem;color:var(--ink);margin-bottom:9px;letter-spacing:-.01em}
  .sx-mc p{color:var(--w70);font-size:.92rem;line-height:1.55}

  /* Inclus */
  .sv-incl{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  .sv-inc{background:#fff;border:1px solid var(--w08);border-radius:18px;padding:24px;box-shadow:0 18px 40px -30px rgba(10,40,120,.35)}
  .sv-inc .ic{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;background:rgba(10,99,255,.1)}
  .sv-inc .ic svg{width:20px;height:20px;stroke:var(--sky);fill:none;stroke-width:2.4}
  .sv-inc h4{font-family:var(--font-d);font-weight:800;font-size:1.02rem;color:var(--ink);margin-bottom:6px;letter-spacing:-.01em}
  .sv-inc p{color:var(--w70);font-size:.88rem;line-height:1.5}

  @media(max-width:960px){
    .sx-pillars{grid-template-columns:1fr 1fr}
    .sx-algo{grid-template-columns:1fr;gap:30px}
    .sx-method{grid-template-columns:1fr 1fr}
    .sv-incl{grid-template-columns:1fr 1fr}
    .sv-chip{display:none}
  }
  @media(max-width:560px){
    .sx-pillars{grid-template-columns:1fr}
    .sx-method{grid-template-columns:1fr}
    .sv-incl{grid-template-columns:1fr}
  }
`;

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
          </div>
          <div className="container">
            <span className="sv-eyebrow">Le service Clipeo · <b>+620 M de vues générées</b></span>
            <h1>Un seul service.<br />Toute la chaîne, <span className="grad">maîtrisée.</span></h1>
            <p className="sub">
              Audit, stratégie, compréhension fine de l&apos;algorithme, production, distribution
              et tracking. Tout est réuni dans un service unique, pensé pour transformer votre
              contenu long en vues qui comptent — avec un objectif chiffré, garanti au contrat.
            </p>
            <div className="sv-cta">
              <Link href="/contact" className="btn btn-primary"><span>Réserver un audit gratuit</span><ArrowR /></Link>
              <Link href="/etudes-de-cas" className="btn"><span>Voir les études de cas</span></Link>
            </div>
          </div>
        </section>

        {/* PILIERS — SAVOIR-FAIRE */}
        <section className="sec" style={{ paddingTop: 20 }}>
          <div className="container">
            <div className="sec-head reveal">
              <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>Notre savoir-faire</span>
              <h2>Six expertises,<br />un seul service.</h2>
            </div>
            <ServicesPillars />
          </div>
        </section>

        {/* ALGORITHME — LE CŒUR DU MÉTIER */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sx-algo">
              <div className="reveal">
                <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>Le cœur du métier</span>
                <h2>On ne devine pas<br />l&apos;algorithme. <span className="grad">On le comprend.</span></h2>
                <p className="lede">
                  La différence entre un clip à 2 000 vues et un clip à 2 millions ne tient pas à la
                  chance. Elle tient à une lecture précise des signaux que chaque plateforme valorise —
                  et à la discipline de s&apos;y plier, contenu après contenu.
                </p>
                <ul className="pts">
                  <li><Check />Chaque format est calé sur les codes natifs du réseau.</li>
                  <li><Check />Chaque publication vise une fenêtre algo précise.</li>
                  <li><Check />Chaque clip est jugé sur la rétention, pas sur l&apos;esthétique.</li>
                </ul>
              </div>
              <div className="sx-panel reveal">
                <span className="ph">Ce qu&apos;on optimise</span>
                {SIGNALS.map((s) => (
                  <div className="sx-sig" key={s.k}>
                    <span className="sk">{s.k}</span>
                    <span className="sv">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MÉTHODE */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head reveal">
              <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>La méthode</span>
              <h2>De l&apos;audit à la <span className="grad">croissance.</span></h2>
            </div>
            <div className="sx-method stagger">
              {METHOD.map((m) => (
                <div className="sx-mc" key={m.n}>
                  <span className="n">{m.n}</span>
                  <h4>{m.t}</h4>
                  <p>{m.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOUJOURS INCLUS */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head reveal">
              <h2>Toujours inclus,<br />sans option cachée.</h2>
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
