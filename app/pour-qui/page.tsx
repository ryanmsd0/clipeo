import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/CtaPanel";
import { Check, XMark } from "@/components/Icons";
import { SEGMENTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pour qui, créateurs, marques, podcasts, cinéma",
  description:
    "Clipeo travaille avec les créateurs YouTube, les marques et grands comptes, les podcasts, le cinéma, les émissions Twitch et les événements. Une campagne de clipping sur mesure pour chaque univers.",
  alternates: { canonical: "/pour-qui" },
};

const DELIVERABLES = [
  { n: "01", t: "Audit", d: "Analyse du potentiel viral de votre contenu, objectifs de vues chiffrés et stratégie éditoriale sur mesure." },
  { n: "02", t: "Découpage", d: "Découpage, montage et sous-titrage par nos clippers, aux codes de chaque plateforme, dans le respect de votre image." },
  { n: "03", t: "Distribution", d: "Diffusion sur des dizaines de comptes, tracking par contenu et plateforme, rapport détaillé en fin de campagne." },
];

const CPM = [
  { n: "01", t: "Objectif & engagement", d: "Un volume de vues garanti à l'avance grâce au modèle CPM (coût pour 1000 vues). Aucun hasard." },
  { n: "02", t: "Distribution & tracking", d: "On construit votre omniprésence sur le format court. Vous recevez vos millions de vues, surperformance incluse." },
  { n: "03", t: "Performance & reporting", d: "Un rapport détaillé en fin de campagne. Vous savez ce qui a fonctionné, et pourquoi." },
];

export default function PourQuiPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link> <span>/</span> <span>Pour qui</span>
          </div>
          <h1>Vous avez du contenu long.<br />On le fait travailler partout.</h1>
          <p>
            Créateurs, marques, podcasts, sorties cinéma, émissions : si votre croissance dépend du format
            court, on construit une campagne d&apos;omniprésence autour de votre contenu.
          </p>
        </div>
      </section>

      {/* SEGMENTS */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="guides-grid stagger">
            {SEGMENTS.map((s) => (
              <div className="guide" key={s.ix}>
                <div className="ix">{s.ix}</div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
                <Link href="/etudes-de-cas">Voir les campagnes →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CE QU'ON LIVRE */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head reveal">
            <h2>Ce qu&apos;on livre à<br />chaque campagne.</h2>
            <p>Une mécanique en trois temps, de l&apos;analyse à la distribution massive.</p>
          </div>
          <div className="guides-grid stagger">
            {DELIVERABLES.map((d) => (
              <div className="guide" key={d.n}>
                <div className="ix">{d.n}</div>
                <h3>{d.t}</h3>
                <p>{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODÈLE CPM */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head reveal">
            <h2>Vous payez les vues,<br /><span className="grad">pas l&apos;effort.</span></h2>
            <p>Grâce à notre modèle CPM, vous ne prenez aucun risque.</p>
          </div>
          <div className="guides-grid stagger" style={{ marginBottom: 24 }}>
            {CPM.map((c) => (
              <div className="guide" key={c.n}>
                <div className="ix">{c.n}</div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
          <div className="disc reveal" style={{ textAlign: "center", fontSize: "1.05rem", color: "var(--w70)", padding: "26px 28px" }}>
            <strong style={{ color: "var(--ink)" }}>Soit on atteint l&apos;objectif,</strong>{" "}
            <span className="accent" style={{ fontWeight: 700 }}>soit on vous rembourse la différence.</span>{" "}
            Le volume de vues est inscrit au contrat, c&apos;est notre engagement, pas une promesse.
          </div>
        </div>
      </section>

      {/* HONNÊTETÉ */}
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

      <CtaPanel
        title="Votre univers mérite l'omniprésence."
        text="Dites-nous ce que vous voulez faire décoller. On vous projette un objectif de vues chiffré en 20 minutes."
      />
    </main>
  );
}
