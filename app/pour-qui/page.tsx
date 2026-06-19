import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/CtaPanel";
import { Check, XMark } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Pour qui · créateurs, marques, podcasts, cinéma, événements",
  description:
    "Clipeo travaille avec les créateurs YouTube, les marques et grands comptes, les podcasts, le cinéma, les émissions Twitch et les événements. Une campagne d'omniprésence sur mesure pour chaque univers.",
  alternates: { canonical: "/pour-qui" },
};

/* Page recentrée sur son rôle : QUI on adresse (segments) + EST-CE POUR VOUS
   (qualification). Le « comment / modèle CPM » détaillé vit sur /a-propos et
   la home. Exemples chiffrés = données du deck, brouillons à valider Clipeo. */
const STYLES = `
  .pq-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .pq-seg{display:flex;flex-direction:column;background:linear-gradient(180deg,var(--glass-2),var(--glass));
    border:1px solid var(--w14);border-radius:20px;padding:28px;transition:transform .4s,border-color .4s}
  .pq-seg:hover{transform:translateY(-4px);border-color:var(--w22)}
  .pq-tag{font-family:var(--font-m);font-size:.58rem;letter-spacing:2px;text-transform:uppercase;color:var(--sky);display:block;margin-bottom:14px}
  .pq-seg h3{font-family:var(--font-d);font-weight:800;font-size:1.3rem;letter-spacing:-.02em;color:var(--ink);margin-bottom:10px;line-height:1.1}
  .pq-seg p{color:var(--w55);font-size:.95rem;line-height:1.6;margin-bottom:18px}
  .pq-ex{margin-top:auto;display:flex;align-items:center;gap:8px;padding-top:16px;border-top:1px solid var(--w08);
    font-family:var(--font-m);font-size:.66rem;letter-spacing:.5px;text-transform:uppercase;color:var(--w40)}
  .pq-ex b{color:var(--sky-bright);font-family:var(--font-d);font-weight:800;font-size:.92rem;letter-spacing:-.01em;text-transform:none}

  /* Bande garantie (modèle condensé) */
  .pq-guarantee{max-width:880px;margin:0 auto;text-align:center;border:1px solid var(--w14);border-radius:24px;
    padding:clamp(32px,4.5vw,48px);background:radial-gradient(640px 360px at 50% -25%,rgba(10,99,255,.08),transparent 60%),linear-gradient(180deg,var(--glass-2),var(--glass))}
  .pq-guarantee .mono-label{display:block;margin-bottom:18px}
  .pq-guarantee h2{font-family:var(--font-d);font-weight:800;font-size:clamp(1.9rem,4vw,2.9rem);line-height:1.05;letter-spacing:-.03em;color:var(--ink);margin-bottom:14px}
  .pq-guarantee p{max-width:560px;margin:0 auto;color:var(--w55);font-size:1.05rem;line-height:1.6}
  .pq-guarantee b{color:var(--ink)}

  @media(max-width:900px){.pq-grid{grid-template-columns:1fr 1fr}}
  @media(max-width:600px){.pq-grid{grid-template-columns:1fr}}
`;

const SEGMENTS = [
  { ix: "01", slug: "createurs", tag: "YouTube · Vlog · Doc", name: "Créateurs YouTube", desc: "On transforme vos longues vidéos en flux de clips quotidiens qui ramènent des abonnés vers vos formats complets.", ex: "FastGoodCuisine · +27,4M de vues" },
  { ix: "02", slug: "marques", tag: "Brand · B2B · B2C", name: "Marques & grands comptes", desc: "Une présence permanente sur le format court, sans monter d'équipe interne, avec un volume de vues garanti au contrat.", ex: "Objectif de vues tenu au contrat" },
  { ix: "03", slug: "podcasts", tag: "Audio · Vidéo", name: "Podcasts", desc: "Chaque épisode devient des dizaines de moments forts, distribués pour faire grandir l'audience et le nombre d'écoutes.", ex: "Kyan Khojandi · +23,1M de vues" },
  { ix: "04", slug: "cinema", tag: "Film · Sortie", name: "Cinéma & sorties", desc: "On crée l'intention avant et pendant la sortie, en saturant le format court de vos meilleurs moments.", ex: "Plus Fort que Moi · +44M de vues" },
  { ix: "05", slug: "twitch", tag: "Live · Replay", name: "Émissions & Twitch", desc: "On capte les meilleurs instants de vos lives et replays, et on les fait tourner partout, en continu.", ex: "Clips live & replay en temps réel" },
  { ix: "06", slug: "evenements", tag: "Jour J · Temps réel", name: "Événements", desc: "Couverture en temps réel le jour J : les clips tombent pendant l'événement, avant même qu'il soit fini.", ex: "Crunch Creator · +39M de vues" },
];

export default function PourQuiPage() {
  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link> <span>/</span> <span>Pour qui</span>
          </div>
          <span className="mono-label" style={{ display: "block", marginBottom: 20 }}>Pour qui on travaille</span>
          <h1>Vous avez du contenu long.<br />On le fait <span className="grad">travailler partout.</span></h1>
          <p>
            Créateurs, marques, podcasts, sorties cinéma, émissions : si votre croissance dépend du format
            court, on construit une campagne d&apos;omniprésence autour de votre contenu.
          </p>
        </div>
      </section>

      {/* SEGMENTS */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head reveal">
            <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>Les univers qu&apos;on adresse</span>
            <h2>Un modèle de campagne<br />pour chaque univers.</h2>
          </div>
          <div className="pq-grid stagger">
            {SEGMENTS.map((s) => (
              <div className="pq-seg" key={s.ix}>
                <span className="pq-tag">{s.tag}</span>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
                <div className="pq-ex"><b>{s.ex}</b></div>
                <Link href={`/campagnes/${s.slug}`} style={{ marginTop: 16, fontFamily: "var(--font-m)", fontSize: ".7rem", letterSpacing: "1px", textTransform: "uppercase", color: "var(--sky-bright)" }}>
                  Découvrir →
                </Link>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 20, fontSize: ".82rem", color: "var(--w40)", fontFamily: "var(--font-m)" }}>
            Exemples de campagnes réelles menées par Clipeo.
          </p>
        </div>
      </section>

      {/* QUALIFICATION — ce n'est pas pour tout le monde */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head reveal">
            <h2>Ce n&apos;est pas<br />pour tout le monde.</h2>
            <p>On préfère le dire avant : Clipeo n&apos;est pas la bonne agence dans certains cas. Mieux vaut s&apos;en rendre compte maintenant.</p>
          </div>
          <div className="fit-grid reveal">
            <div className="fit-card no">
              <h3>Ce n&apos;est pas pour vous si…</h3>
              <ul>
                <li><XMark />Vous cherchez une seule vidéo virale plutôt qu&apos;une présence dans la durée.</li>
                <li><XMark />Vous n&apos;avez aucun contenu long ni source à découper.</li>
                <li><XMark />Vous voulez tout valider clip par clip, chaque jour.</li>
                <li><XMark />Vous jugez une campagne aux likes, pas aux vues et à la redirection.</li>
              </ul>
            </div>
            <div className="fit-card yes">
              <h3>C&apos;est fait pour vous si…</h3>
              <ul>
                <li><Check />Vous avez du contenu long (podcast, chaîne, lives, catalogue) à faire travailler.</li>
                <li><Check />Vous visez un objectif de vues chiffré, pas du « buzz » ponctuel.</li>
                <li><Check />Vous voulez déléguer la production et la distribution, sans perdre la main.</li>
                <li><Check />Vous voulez un reporting transparent et un engagement contractuel.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GARANTIE — modèle condensé (le détail vit sur /a-propos) */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="pq-guarantee reveal">
            <span className="mono-label">Quel que soit votre univers</span>
            <h2>Vous payez les vues,<br /><span className="grad">pas l&apos;effort.</span></h2>
            <p>
              <b>Soit on atteint l&apos;objectif, soit on rembourse la différence.</b> Le volume de vues est
              chiffré et inscrit au contrat grâce au modèle CPM. C&apos;est notre engagement, pas une promesse.
            </p>
          </div>
        </div>
      </section>

      <CtaPanel
        title="Votre univers mérite l'omniprésence."
        text="Dites-nous ce que vous voulez faire décoller. On vous projette un objectif de vues chiffré en 20 minutes."
      />
    </main>
  );
}
