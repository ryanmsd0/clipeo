import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/CtaPanel";
import { Check } from "@/components/Icons";

export const metadata: Metadata = {
  title: "À propos, l'agence qui industrialise le clipping",
  description:
    "Clipeo est l'agence de clipping pour grands comptes : on transforme votre contenu long en omniprésence sur le format court, avec un volume de vues garanti au contrat.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link> <span>/</span> <span>À propos</span>
          </div>
          <h1>On a industrialisé<br />le clipping.</h1>
          <p>
            Clipeo est née d&apos;un constat simple : le meilleur contenu du monde ne sert à rien s&apos;il
            n&apos;est pas vu. On transforme votre contenu long en omniprésence sur le format court, avec
            une méthode, un réseau et un objectif de vues garanti.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head left reveal" style={{ marginBottom: 28 }}>
            <span className="mono-label" style={{ marginBottom: 16, display: "block" }}>Notre mission</span>
            <h2>Faire travailler votre contenu,<br />partout, tout le temps.</h2>
          </div>
          <div className="prose reveal" style={{ marginLeft: 0 }}>
            <p>
              En 2026, l&apos;attention est la ressource la plus rare. Votre audience consomme
              <strong> plus de 1000 contenus par jour</strong> et vous oublie en 24h sans présence régulière.
              Poster une fois et espérer ne suffit plus.
            </p>
            <p>
              Notre réponse : <strong>l&apos;omniprésence</strong>. On découpe vos podcasts, interviews, lives et
              vidéos longues en dizaines de clips, qu&apos;on diffuse sur des dizaines de comptes, TikTok,
              YouTube Shorts, Instagram Reels et Twitch, jusqu&apos;à occuper durablement la For You Page de
              votre audience. La répétition crée la mémorisation, la mémorisation crée la confiance, la
              confiance crée la conversion.
            </p>
            <p>
              Et surtout : <strong>vous payez les vues, pas l&apos;effort.</strong> Grâce à notre modèle CPM, le
              volume est garanti à l&apos;avance et inscrit au contrat, sinon, on rembourse la différence.
            </p>
          </div>

          <div className="global-stats reveal" style={{ marginTop: 50 }}>
            <div className="gstat"><div className="v grad" data-count="500" data-prefix="+" data-suffix="M">+0M</div><div className="k">Vues générées · 6 mois</div></div>
            <div className="gstat"><div className="v grad">+5,1K</div><div className="k">Clips produits</div></div>
            <div className="gstat"><div className="v grad" data-count="50" data-prefix="+">+0</div><div className="k">Campagnes réalisées</div></div>
            <div className="gstat"><div className="v accent">+110%</div><div className="k">Surperformance moyenne</div></div>
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head reveal">
            <h2>Ce que ça change<br />pour vous.</h2>
            <p>Pas de promesses floues. Une méthode mesurable, un engagement contractuel, une obsession du résultat.</p>
          </div>
          <div className="guides-grid stagger">
            <div className="guide">
              <div className="ix">01</div>
              <h3>Le résultat, pas l&apos;agitation</h3>
              <p>On ne vend pas des « posts » ou des « impressions ». On vend des vues réelles, garanties au contrat, et une redirection mesurable vers votre contenu.</p>
            </div>
            <div className="guide">
              <div className="ix">02</div>
              <h3>L&apos;échelle, sans le chaos</h3>
              <p>Des dizaines de comptes, des milliers de clips, mais un seul interlocuteur. On gère le réseau de clippers, vous gardez la main sur votre image.</p>
            </div>
            <div className="guide">
              <div className="ix">03</div>
              <h3>La transparence totale</h3>
              <p>Tracking par contenu, plateforme et thème. Vous savez ce qui fonctionne, pourquoi, et ce qu&apos;on optimise pour la prochaine vague.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MÉTHODE / ÉQUIPE */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head reveal">
            <span className="mono-label" style={{ marginBottom: 16, display: "block" }}>L&apos;équipe</span>
            <h2>Trois expertises,<br />une seule machine.</h2>
          </div>
          <div className="toolkit-grid reveal" style={{ marginBottom: 0 }}>
            <div className="tk-card">
              <span className="mono-label">Stratégie &amp; Audit</span>
              <h3 style={{ fontFamily: "var(--font-d)", fontWeight: 800, fontSize: "1.4rem", margin: "12px 0 10px" }}>On cartographie le potentiel viral.</h3>
              <p style={{ color: "var(--w55)", lineHeight: 1.6 }}>
                Analyse de votre contenu long, objectifs de vues chiffrés, angles à fort taux de conversion.
                Tout part d&apos;un audit gratuit.
              </p>
              <ul className="check-group" style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                <li><Check />Objectifs de vues &amp; de redirection</li>
                <li><Check />Stratégie éditoriale sur mesure</li>
              </ul>
            </div>
            <div className="tk-card">
              <span className="mono-label">Production &amp; Distribution</span>
              <h3 style={{ fontFamily: "var(--font-d)", fontWeight: 800, fontSize: "1.4rem", margin: "12px 0 10px" }}>On découpe, on monte, on diffuse.</h3>
              <p style={{ color: "var(--w55)", lineHeight: 1.6 }}>
                Un réseau de clippers qui produit des centaines de clips aux codes de chaque plateforme, et les
                distribue sur des dizaines de comptes pour saturer la recommandation.
              </p>
              <ul className="check-group" style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                <li><Check />Montage &amp; sous-titres optimisés</li>
                <li><Check />Tracking &amp; reporting en fin de campagne</li>
              </ul>
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
