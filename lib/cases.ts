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

/* Les 6 études de cas = les 6 covers de la section « Pour qui », dans le même ordre.
   Stats issues de la section « Pour qui ». Récits = brouillons à valider par Clipeo. */
export const CASES: CaseStudy[] = [
  {
    slug: "charles-et-melanie",
    img: "/img/Charles_et_Melanie.png",
    client: "Charles & Mélanie",
    category: "Créateurs YouTube",
    bigNum: "+160,9 M",
    cap: "de vues générées",
    meta: "1 355 clips · 7 campagnes · redirection YouTube",
    excerpt:
      "Le plus gros volume de notre portfolio : 1 355 clips pour faire exploser la notoriété et rediriger vers la chaîne.",
    platforms: [
      { name: "TikTok", abbr: "TT", color: "#111", value: "94,9 M" },
      { name: "YouTube Shorts", abbr: "YT", color: "#FF0000", value: "62,8 M" },
      { name: "Instagram Reels", abbr: "IG", color: "linear-gradient(135deg,#feda75,#d62976,#962fbf)", value: "3,2 M" },
    ],
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
    slug: "la-marine-nationale",
    img: "/img/La_Marine_Nationale.png",
    client: "La Marine Nationale",
    category: "Marque · Grand compte",
    bigNum: "+7,4 M",
    cap: "de vues générées",
    meta: "190 clips · multi-plateforme · cible 18-25",
    excerpt:
      "Rendre une institution désirable auprès des 18-25 ans en transformant ses contenus en format court à forte rétention.",
    platforms: [
      { name: "TikTok", abbr: "TT", color: "#111", value: "6,4 M" },
      { name: "YouTube Shorts", abbr: "YT", color: "#FF0000", value: "1 M" },
    ],
    metrics: [
      { v: "190", k: "clips produits" },
      { v: "+7,4 M", k: "vues générées" },
      { v: "18-25", k: "cœur de cible" },
    ],
    challenge: "Toucher une audience jeune sur des plateformes où le ton institutionnel passe mal, sans trahir l'image de la Marine.",
    approach: [
      "Audit des contenus à plus fort potentiel d'identification.",
      "Montages aux codes natifs de TikTok, Reels et Shorts, loin du registre corporate.",
      "Diffusion multi-comptes pour installer la présence dans le feed des jeunes.",
    ],
    results: "+7,4 M de vues générées et une image rajeunie auprès du cœur de cible.",
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
    platforms: [
      { name: "TikTok", abbr: "TT", color: "#111", value: "17 M" },
      { name: "YouTube Shorts", abbr: "YT", color: "#FF0000", value: "6 M" },
    ],
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
    slug: "zebro-et-leow",
    img: "/img/Zebro_et_Leow.png",
    client: "Zebro & Leow",
    category: "Émission · Twitch",
    bigNum: "+19,9 M",
    cap: "de vues générées",
    meta: "194 clips · lives découpés · diffusion continue",
    excerpt:
      "Transformer des heures de live Twitch en dizaines de clips courts pour toucher une audience hors de la communauté.",
    platforms: [
      { name: "TikTok", abbr: "TT", color: "#111", value: "17,5 M" },
      { name: "YouTube Shorts", abbr: "YT", color: "#FF0000", value: "2,4 M" },
    ],
    metrics: [
      { v: "194", k: "clips produits" },
      { v: "+19,9 M", k: "vues générées" },
      { v: "24/7", k: "diffusion continue" },
    ],
    challenge: "Faire sortir le contenu des lives de la bulle Twitch et capter de nouveaux spectateurs sur le format court.",
    approach: [
      "Repérage des meilleurs moments de live et de replay.",
      "Découpage et montage rythmés aux codes du short vertical.",
      "Diffusion permanente sur TikTok, Reels et Shorts pour ramener vers les lives.",
    ],
    results: "+19,9 M de vues sur 194 clips, et un flux régulier de nouveaux spectateurs vers les lives.",
  },
  {
    slug: "crunch-creator",
    img: "/img/Crunch_Creator.png",
    client: "Crunch Creator",
    category: "Événement",
    bigNum: "+39 M",
    cap: "de vues générées",
    meta: "292 clips · couverture temps réel",
    excerpt: "Couvrir un événement en temps réel et le faire vivre partout, le jour J et après, en format court.",
    platforms: [
      { name: "TikTok", abbr: "TT", color: "#111", value: "32,1 M" },
      { name: "YouTube Shorts", abbr: "YT", color: "#FF0000", value: "6,8 M" },
    ],
    metrics: [
      { v: "292", k: "clips produits" },
      { v: "+39 M", k: "vues générées" },
      { v: "J+0", k: "diffusion temps réel" },
    ],
    challenge: "Maximiser la portée d'un événement sur une fenêtre très courte, avec une production réactive le jour même.",
    approach: [
      "Captation et repérage des temps forts en direct.",
      "Montage express et publication en continu pendant l'événement.",
      "Vagues de diffusion post-événement pour prolonger la portée.",
    ],
    results: "+39 M de vues générées sur 292 clips, avec une diffusion en temps réel le jour de l'événement.",
  },
];

export function getCase(slug: string) {
  return CASES.find((c) => c.slug === slug);
}
