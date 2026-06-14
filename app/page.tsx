import HomeSections from "@/components/HomeSections";
import { SITE } from "@/lib/site";

/* Doit rester synchronisé avec la FAQ visible dans HomeSections */
const FAQ_ITEMS = [
  { q: "Qu'est-ce que Clipeo ?", a: "Une agence de clipping managée pour marques, créateurs et sorties. On active un réseau de clippers pour créer et publier des montages orientés performance sur TikTok, Reels, Shorts et Twitch." },
  { q: "Comment fonctionne le process ?", a: "On démarre par un court appel. Vous venez avec votre vision, et on gère la stratégie, le setup du lancement et l'exécution hebdomadaire de la campagne." },
  { q: "En combien de temps peut-on lancer ?", a: "La plupart des campagnes se lancent en 1 à 2 jours après l'appel. Notre onboarding est conçu pour la vitesse." },
  { q: "Avec qui travaillez-vous ?", a: "Des créateurs, des marques, des podcasts, des sorties cinéma et des émissions. Si votre croissance dépend du format court, on construit un modèle de campagne autour de votre contenu." },
  { q: "Comment fonctionne le modèle CPM ?", a: "Vous payez un coût pour 1000 vues, avec un volume garanti au contrat. Si l'objectif n'est pas atteint, on rembourse la différence. Vous payez les vues, pas l'effort." },
  { q: "Combien ça coûte de démarrer ?", a: "Le prix dépend du périmètre et de l'objectif de vues. On commence par un audit gratuit et une projection chiffrée, avant tout engagement." },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    slogan: SITE.tagline,
    sameAs: [] as string[],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <HomeSections />
    </>
  );
}
