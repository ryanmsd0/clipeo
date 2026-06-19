export type Platform = { name: string; abbr: string; color: string; value: string };
export type Metric = { v: string; k: string };

export type CaseStudy = {
  slug: string;
  img: string;
  client: string;
  category: string;
  bigNum: string;
  cap: string;
  meta: string;
  excerpt: string;
  objective?: { line: string; up: string };
  platforms?: Platform[];
  metrics: Metric[];
  challenge: string;
  approach: string[];
  results: string;
};

export const CASES: CaseStudy[] = [
  {
    slug: "plus-fort-que-moi",
    img: "/img/Film_Plus_Fort_que_Moi.png",
    client: "Plus Fort que Moi, Tandem",
    category: "Cinéma · Sortie",
    bigNum: "+44 M",
    cap: "de vues générées",
    meta: "358 clips · 3 plateformes · 2 campagnes",
    excerpt:
      "Pour la sortie du film « Plus Fort que Moi », on a transformé 15 M de vues visées en +44 M, soit +193 % de surperformance, en deux campagnes calées sur la sortie.",
    objective: { line: "Objectif initial : 15 M de vues.", up: "+193 % de surperformance." },
    platforms: [
      { name: "YouTube Shorts", abbr: "YT", color: "#FF0000", value: "19,1 M" },
      { name: "TikTok", abbr: "TT", color: "#111", value: "16,8 M" },
      { name: "Instagram Reels", abbr: "IG", color: "linear-gradient(135deg,#feda75,#d62976,#962fbf)", value: "6,8 M" },
    ],
    metrics: [
      { v: "+193 %", k: "de surperformance" },
      { v: "358", k: "clips produits" },
      { v: "3", k: "plateformes saturées" },
    ],
    challenge:
      "Créer une intention d'aller voir le film en salle, avant et pendant la sortie, sur une fenêtre de diffusion courte et à fort enjeu.",
    approach: [
      "Audit du potentiel viral et cartographie des angles autour du film.",
      "358 clips montés aux codes de chaque plateforme, distribués sur des dizaines de comptes.",
      "Deux vagues de diffusion synchronisées sur le calendrier de sortie.",
      "Tracking des pics de vues corrélés aux pics de recherche (24/48h).",
    ],
    results:
      "+44 M de vues, soit ×2,9 l'objectif initial de 15 M, sur trois plateformes et deux vagues de diffusion synchronisées sur la sortie du film.",
  },
  {
    slug: "la-compagnie",
    img: "/img/La_Compagnie.png",
    client: "La Compagnie",
    category: "YouTube",
    bigNum: "+48,2 M",
    cap: "de vues générées",
    meta: "879 clips · 3 plateformes · 6 campagnes",
    excerpt:
      "Une présence quotidienne construite sur le format court pour transformer les vidéos longues en flux continu d'audience.",
    metrics: [
      { v: "879", k: "clips produits" },
      { v: "6", k: "campagnes" },
      { v: "×3", k: "rythme de publication" },
    ],
    challenge: "Maintenir une présence permanente dans la For You Page entre deux sorties de contenu long.",
    approach: [
      "Découpage systématique de chaque vidéo longue en dizaines de clips.",
      "Distribution multi-comptes pour saturer la recommandation.",
      "Optimisation hebdomadaire sur les formats au meilleur taux de rétention.",
    ],
    results: "+48,2 M de vues cumulées sur 6 campagnes, avec une présence quasi quotidienne sur trois plateformes.",
  },
  {
    slug: "charles-et-melanie",
    img: "/img/Charles_et_Melanie.png",
    client: "Charles & Mélanie",
    category: "YouTube",
    bigNum: "+160,9 M",
    cap: "de vues générées",
    meta: "1 355 clips · 7 campagnes · redirection YouTube",
    excerpt:
      "Le plus gros volume de notre portfolio : 1 355 clips pour faire exploser la notoriété et rediriger vers la chaîne.",
    metrics: [
      { v: "1 355", k: "clips produits" },
      { v: "7", k: "campagnes" },
      { v: "YouTube", k: "redirection principale" },
    ],
    challenge: "Convertir une audience format court massive en abonnés et vues sur le contenu long.",
    approach: [
      "Industrialisation de la production : 1 355 clips sur 7 campagnes.",
      "Angles variés testés en parallèle, scale des plus performants.",
      "Call-to-action de redirection vers la chaîne YouTube.",
    ],
    results: "+160,9 M de vues générées et une redirection régulière vers le contenu long.",
  },
  {
    slug: "joyca",
    img: "/img/Joyca.png",
    client: "Joyca",
    category: "YouTube",
    bigNum: "+35,7 M",
    cap: "de vues générées",
    meta: "668 clips · 5 campagnes · redirection YouTube",
    excerpt: "Une mécanique d'omniprésence pour ancrer la marque créateur et alimenter la chaîne en continu.",
    metrics: [
      { v: "668", k: "clips produits" },
      { v: "5", k: "campagnes" },
      { v: "YouTube", k: "redirection" },
    ],
    challenge: "Garder le créateur top-of-mind entre deux gros formats.",
    approach: [
      "Sélection des meilleurs moments des vidéos longues.",
      "Diffusion multi-comptes aux codes de chaque plateforme.",
      "Suivi des performances et itération hebdomadaire.",
    ],
    results: "+35,7 M de vues sur 5 campagnes, présence renforcée sur le format court.",
  },
  {
    slug: "kyan-khojandi",
    img: "/img/Kyan_Khojandi.png",
    client: "Kyan Khojandi",
    category: "Podcast",
    bigNum: "+23,1 M",
    cap: "de vues générées",
    meta: "144 clips · 1 campagne · redirection podcast",
    excerpt: "Transformer un podcast en moments forts viraux pour faire grandir l'écoute.",
    metrics: [
      { v: "144", k: "clips produits" },
      { v: "1", k: "campagne" },
      { v: "Podcast", k: "redirection" },
    ],
    challenge: "Faire découvrir un podcast à une audience format court qui ne l'écoute pas encore.",
    approach: [
      "Repérage des séquences à plus fort potentiel de partage.",
      "Montage vertical et sous-titrage optimisé.",
      "Distribution ciblée vers une audience à forte intention.",
    ],
    results: "+23,1 M de vues et une redirection mesurable vers le podcast.",
  },
  {
    slug: "fastgoodcuisine",
    img: "/img/FastGoodCuisine.png",
    client: "FastGoodCuisine",
    category: "YouTube",
    bigNum: "+27,4 M",
    cap: "de vues générées",
    meta: "311 clips · 2 campagnes · redirection YouTube",
    excerpt: "Du contenu culinaire long décliné en clips courts gourmands et hautement partageables.",
    metrics: [
      { v: "311", k: "clips produits" },
      { v: "2", k: "campagnes" },
      { v: "YouTube", k: "redirection" },
    ],
    challenge: "Capter une nouvelle audience sur le format court et la ramener vers les recettes longues.",
    approach: [
      "Découpage des moments les plus appétissants.",
      "Hooks pensés pour stopper le scroll.",
      "Distribution multi-comptes et tracking par thème.",
    ],
    results: "+27,4 M de vues sur 2 campagnes, avec une audience format court élargie.",
  },
];

export function getCase(slug: string) {
  return CASES.find((c) => c.slug === slug);
}
