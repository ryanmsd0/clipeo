import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/CtaPanel";
import { Check } from "@/components/Icons";

export const metadata: Metadata = {
  title: "À propos · l'équipe qui rend votre contenu impossible à manquer",
  description:
    "L'équipe derrière des centaines de millions de vues sur le format court. Notre méthode, notre modèle garanti, et pourquoi les marques et créateurs restent campagne après campagne.",
  alternates: { canonical: "/a-propos" },
};

/* Structure inspirée des meilleures pages « about » du secteur (hero autorité,
   équipe, « pourquoi les clients restent », process, preuve, philosophie),
   adaptée à la DA Clipeo. Contenus inventés = brouillons à valider avec Clipeo.
   Réutilise les classes globales + blocs `ap-*` ci-dessous. */
const STYLES = `
  .ap-num{font-family:var(--font-d);font-weight:800}

  /* Mini-CTA juste après le hero */
  .ap-strip{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;
    max-width:940px;margin:0 auto;padding:24px 30px;border-radius:20px;
    background:linear-gradient(180deg,var(--glass-2),var(--glass));border:1px solid var(--w14)}
  .ap-strip p{font-family:var(--font-d);font-weight:700;font-size:clamp(1.05rem,2vw,1.35rem);color:var(--ink);letter-spacing:-.01em;line-height:1.2}
  .ap-strip .btn{flex-shrink:0}

  /* Équipe (placeholder) */
  .ap-team{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
  .ap-member{background:linear-gradient(180deg,var(--glass-2),var(--glass));border:1px solid var(--w14);border-radius:20px;padding:24px;text-align:center}
  .ap-avatar{width:84px;height:84px;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;
    font-family:var(--font-d);font-weight:800;font-size:1.5rem;color:#fff;
    background:linear-gradient(150deg,var(--sky),var(--sky-bright));box-shadow:0 12px 26px -10px rgba(10,99,255,.5)}
  .ap-member h3{font-family:var(--font-d);font-weight:800;font-size:1.1rem;color:var(--ink);letter-spacing:-.01em}
  .ap-member .role{font-family:var(--font-m);font-size:.62rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--sky);margin-top:6px}
  .ap-member p{color:var(--w55);font-size:.9rem;line-height:1.55;margin-top:12px}
  .ap-draft{display:inline-flex;align-items:center;gap:7px;margin-top:14px;padding:6px 14px;border-radius:50px;
    font-family:var(--font-m);font-size:.6rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--w40);
    background:var(--glass);border:1px dashed var(--w22)}

  /* Pourquoi les clients restent — 4 raisons (2x2) */
  .ap-reasons{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
  .ap-reason{background:linear-gradient(180deg,var(--glass-2),var(--glass));border:1px solid var(--w14);border-radius:20px;padding:28px 30px}
  .ap-reason .n{font-family:var(--font-m);font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--sky);display:block;margin-bottom:14px}
  .ap-reason h3{font-family:var(--font-d);font-weight:800;font-size:1.25rem;letter-spacing:-.015em;color:var(--ink);margin-bottom:10px}
  .ap-reason p{color:var(--w55);font-size:.96rem;line-height:1.6}

  /* Process 3 étapes */
  .ap-stages{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .ap-stage{position:relative;background:linear-gradient(180deg,var(--glass-2),var(--glass));border:1px solid var(--w14);border-radius:20px;padding:30px}
  .ap-stage .s{font-family:var(--font-d);font-weight:800;font-size:2.4rem;line-height:1;letter-spacing:-.04em;
    background:linear-gradient(160deg,var(--sky) 20%,rgba(10,99,255,.25));-webkit-background-clip:text;background-clip:text;color:transparent;display:block;margin-bottom:16px}
  .ap-stage h3{font-family:var(--font-d);font-weight:800;font-size:1.2rem;letter-spacing:-.015em;color:var(--ink);margin-bottom:10px}
  .ap-stage p{color:var(--w55);font-size:.95rem;line-height:1.6}

  /* Preuve sociale — avis */
  .ap-reviews{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .ap-review{background:#fff;border:1px solid var(--w08);border-radius:20px;padding:26px;box-shadow:0 18px 40px -28px rgba(10,40,120,.35)}
  .ap-stars{color:var(--sky);letter-spacing:2px;font-size:.85rem;margin-bottom:14px}
  .ap-review p{color:var(--w70);font-size:.96rem;line-height:1.6;margin-bottom:18px}
  .ap-review .who{display:flex;align-items:center;gap:11px}
  .ap-review .who i{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-d);font-weight:800;font-size:.85rem;color:#fff;background:linear-gradient(150deg,var(--sky),var(--sky-bright));font-style:normal}
  .ap-review .who b{font-family:var(--font-d);font-size:.92rem;color:var(--ink);display:block}
  .ap-review .who span{font-family:var(--font-m);font-size:.58rem;letter-spacing:1px;text-transform:uppercase;color:var(--w40)}

  @media(max-width:900px){.ap-team{grid-template-columns:repeat(2,1fr)}.ap-stages,.ap-reviews{grid-template-columns:1fr}}
  @media(max-width:640px){.ap-reasons{grid-template-columns:1fr}.ap-strip{flex-direction:column;align-items:flex-start}}
`;

const TEAM = [
  { ini: "01", t: "Stratégie & Audit", bio: "On cartographie votre contenu et on fixe l'objectif de vues, dès le départ." },
  { ini: "02", t: "Production de clips", bio: "On pilote le réseau de clippers et la qualité des montages." },
  { ini: "03", t: "Distribution", bio: "On orchestre la diffusion multi-comptes et l'algo de chaque plateforme." },
  { ini: "04", t: "Performance", bio: "On suit le tracking, les vues et l'optimisation des vagues suivantes." },
];

const REASONS = [
  { n: "01", t: "Une direction experte", p: "Vous parlez à des gens qui pensent stratégie, pas à un sous-traitant. La ligne édito et l'objectif de vues sont posés dès l'audit." },
  { n: "02", t: "Le réseau géré pour vous", p: "Des dizaines de clippers et de comptes, mais un seul interlocuteur. On absorbe la complexité, vous gardez la main sur votre image." },
  { n: "03", t: "On teste, on itère", p: "Chaque vague de clips est analysée. Ce qui marche est amplifié, ce qui ne marche pas est coupé. La campagne s'améliore en continu." },
  { n: "04", t: "Un reporting actionnable", p: "Tracking par contenu, plateforme et thème. Vous savez exactement ce qui ramène des vues, et pourquoi." },
];

const STAGES = [
  { s: "01", t: "Audit & stratégie", p: "On cartographie votre contenu long, on fixe un objectif de vues chiffré et les angles à fort potentiel. Tout part d'un audit gratuit." },
  { s: "02", t: "Production & distribution", p: "Le réseau de clippers produit des centaines de clips aux codes de chaque plateforme, diffusés sur des dizaines de comptes." },
  { s: "03", t: "Optimisation & scale", p: "On mesure, on coupe, on amplifie. Chaque vague nourrit la suivante jusqu'à saturer la recommandation de votre audience." },
];

const REVIEWS = [
  { ini: "M", who: "Marque · grand compte", role: "Campagne en cours", stars: "★★★★★", q: "Objectif de vues annoncé au contrat, et tenu. Pour une fois, on payait un résultat, pas une promesse." },
  { ini: "C", who: "Créateur YouTube", role: "5 campagnes", stars: "★★★★★", q: "Zéro gestion de notre côté. On valide la ligne édito, ils gèrent les clippers et la diffusion. Et les abonnés suivent." },
  { ini: "P", who: "Podcast", role: "Redirection", stars: "★★★★★", q: "Chaque épisode devient des dizaines de clips. Les clips ramènent des auditeurs qui restent sur les épisodes complets." },
];

export default function AProposPage() {
  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* HERO — autorité + chiffre */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link> <span>/</span> <span>À propos</span>
          </div>
          <span className="mono-label" style={{ display: "block", marginBottom: 20 }}>À propos · Clipeo</span>
          <h1>
            L&apos;équipe derrière<br />
            <span className="grad">+620M de vues</span> sur le format court.
          </h1>
          <p>
            Clipeo transforme le contenu long des plus gros créateurs et marques en omniprésence sur le
            format court. Une méthode, un réseau de clippers, et un volume de vues garanti au contrat.
          </p>
        </div>
      </section>

      {/* MINI-CTA */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="ap-strip reveal">
            <p>Envie de cette équipe sur votre prochaine campagne ?</p>
            <Link href="/contact" className="btn btn-primary"><span>Réserver un audit gratuit</span></Link>
          </div>
        </div>
      </section>

      {/* ÉQUIPE (placeholder) */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head reveal">
            <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>L&apos;équipe</span>
            <h2>Une équipe resserrée,<br />quatre <span className="grad">expertises.</span></h2>
            <p>Spécialisée sur une seule chose : rendre votre contenu impossible à manquer.</p>
          </div>
          <div className="ap-team stagger">
            {TEAM.map((m, i) => (
              <div className="ap-member" key={i}>
                <div className="ap-avatar" aria-hidden="true">{m.ini}</div>
                <h3>{m.t}</h3>
                <p>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI LES CLIENTS RESTENT */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head reveal">
            <h2>Pourquoi nos clients restent<br />après la première campagne.</h2>
            <p>Pas de promesses floues. Une méthode mesurable, un engagement contractuel, une obsession du résultat.</p>
          </div>
          <div className="ap-reasons stagger">
            {REASONS.map((r) => (
              <div className="ap-reason" key={r.n}>
                <span className="n">{r.n}</span>
                <h3>{r.t}</h3>
                <p>{r.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head reveal">
            <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>La méthode</span>
            <h2>De l&apos;audit à la croissance,<br />en <span className="grad">trois temps.</span></h2>
          </div>
          <div className="ap-stages stagger">
            {STAGES.map((s) => (
              <div className="ap-stage" key={s.s}>
                <span className="s">{s.s}</span>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREUVE SOCIALE */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head reveal">
            <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>Ils nous font confiance</span>
            <h2>Notés sur le seul<br />critère qui compte : le résultat.</h2>
          </div>
          <div className="ap-reviews stagger">
            {REVIEWS.map((r, i) => (
              <div className="ap-review" key={i}>
                <div className="ap-stars" aria-hidden="true">{r.stars}</div>
                <p>« {r.q} »</p>
                <div className="who">
                  <i aria-hidden="true">{r.ini}</i>
                  <span><b>{r.who}</b><span>{r.role}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHIE / MODÈLE */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head reveal">
            <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>Notre conviction</span>
            <h2>L&apos;omniprésence,<br />pas la <span className="grad">viralité.</span></h2>
            <p>La viralité est un coup de chance. L&apos;omniprésence est une stratégie. Voilà comment on pense la distribution à la performance.</p>
          </div>
          <div className="guides-grid stagger">
            <div className="guide">
              <div className="ix">01</div>
              <h3>La performance d&apos;abord</h3>
              <p>On ne vend pas des « posts » ni des « impressions ». On vend des vues réelles, garanties au contrat, et une redirection mesurable.</p>
            </div>
            <div className="guide">
              <div className="ix">02</div>
              <h3>Pensé pour l&apos;échelle</h3>
              <p>On ne mise pas sur LE clip qui explose. On sature la recommandation de dizaines de clips, sur dizaines de comptes, jusqu&apos;à l&apos;omniprésence.</p>
            </div>
            <div className="guide">
              <div className="ix">03</div>
              <h3>Un modèle aligné</h3>
              <p>Vous payez les vues, pas l&apos;effort. Le volume est garanti au contrat grâce au modèle CPM. Objectif non atteint ? On rembourse la différence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CHIFFRES CLÉS — (brouillons à valider) */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="global-stats reveal" style={{ marginTop: 0 }}>
            <div className="gstat"><div className="v grad" data-count="620" data-prefix="+" data-suffix="M">+0M</div><div className="k">Vues générées · 6 mois</div></div>
            <div className="gstat"><div className="v grad">+6,6K</div><div className="k">Clips produits</div></div>
            <div className="gstat"><div className="v grad" data-count="57" data-prefix="+">+0</div><div className="k">Campagnes réalisées</div></div>
            <div className="gstat"><div className="v grad" data-count="24" data-prefix="+">+0</div><div className="k">Créateurs accompagnés</div></div>
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
