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

export type Locale = "fr" | "en";

/* Champs indépendants de la langue : partagés entre fr/en. */
type CaseShared = {
  slug: string;
  img: string;
  client: string;
  platformKeys?: { name: string; abbr: string; color: string }[];
};

/* Champs traduisibles d'une étude de cas (tout le texte visible + les nombres formatés). */
type CaseLocalized = {
  category: string;
  bigNum: string;
  cap: string;
  meta: string;
  excerpt: string;
  objective?: { line: string; up: string };
  platformValues?: string[]; // aligné sur l'ordre de platformKeys
  metrics: Metric[];
  challenge: string;
  approach: string[];
  results: string;
};

type CaseEntry = {
  shared: CaseShared;
  fr: CaseLocalized;
  en: CaseLocalized;
};

const ENTRIES: CaseEntry[] = [
  {
    shared: {
      slug: "charles-et-melanie",
      img: "/img/Charles_et_Melanie.png",
      client: "Charles & Mélanie",
      platformKeys: [
        { name: "TikTok", abbr: "TT", color: "#111" },
        { name: "YouTube Shorts", abbr: "YT", color: "#FF0000" },
        { name: "Instagram Reels", abbr: "IG", color: "linear-gradient(135deg,#feda75,#d62976,#962fbf)" },
      ],
    },
    fr: {
      category: "Créateurs YouTube",
      bigNum: "+160,9 M",
      cap: "de vues générées",
      meta: "1 355 clips · 7 campagnes · redirection YouTube",
      excerpt:
        "Le plus gros volume de notre portfolio : 1 355 clips pour faire exploser la notoriété et rediriger vers la chaîne.",
      platformValues: ["94,9 M", "62,8 M", "3,2 M"],
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
    en: {
      category: "YouTube creators",
      bigNum: "+160.9M",
      cap: "views generated",
      meta: "1,355 clips · 7 campaigns · drives viewers back to YouTube",
      excerpt:
        "The biggest volume in our portfolio: 1,355 clips that turned reach into subscribers and drove viewers straight back to the channel.",
      platformValues: ["94.9M", "62.8M", "3.2M"],
      metrics: [
        { v: "1,355", k: "clips produced" },
        { v: "7", k: "campaigns" },
        { v: "YouTube", k: "primary redirect" },
      ],
      challenge: "Turn a massive short-form audience into subscribers and watch time on the long-form channel.",
      approach: [
        "Production at scale: 1,355 clips across 7 campaigns.",
        "Multiple angles tested in parallel, then scaling the winners.",
        "Calls-to-action that drive viewers back to the YouTube channel.",
      ],
      results: "+160.9M views generated and a steady stream of viewers pulled back to the long-form channel.",
    },
  },
  {
    shared: {
      slug: "la-marine-nationale",
      img: "/img/La_Marine_Nationale.png",
      client: "La Marine Nationale",
      platformKeys: [
        { name: "TikTok", abbr: "TT", color: "#111" },
        { name: "YouTube Shorts", abbr: "YT", color: "#FF0000" },
      ],
    },
    fr: {
      category: "Marque · Grand compte",
      bigNum: "+7,4 M",
      cap: "de vues générées",
      meta: "190 clips · multi-plateforme · cible 18-25",
      excerpt:
        "Rendre une institution désirable auprès des 18-25 ans en transformant ses contenus en format court à forte rétention.",
      platformValues: ["6,4 M", "1 M"],
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
    en: {
      category: "Brand · Enterprise account",
      bigNum: "+7.4M",
      cap: "views generated",
      meta: "190 clips · multi-platform · 18-25 target",
      excerpt:
        "Make an institution desirable to 18-25s by turning its content into high-retention short-form built for the For You feed.",
      platformValues: ["6.4M", "1M"],
      metrics: [
        { v: "190", k: "clips produced" },
        { v: "+7.4M", k: "views generated" },
        { v: "18-25", k: "core target" },
      ],
      challenge: "Reach a young audience on platforms where an institutional tone falls flat, without betraying the Navy's image.",
      approach: [
        "Audit of the content with the highest potential to connect.",
        "Edits built to the native codes of TikTok, Reels and Shorts, far from the corporate register.",
        "Multi-account distribution to plant a presence in the feeds of young viewers.",
      ],
      results: "+7.4M views generated and a sharply younger image with the core target.",
    },
  },
  {
    shared: {
      slug: "kyan-khojandi",
      img: "/img/Kyan_Khojandi.png",
      client: "Kyan Khojandi",
      platformKeys: [
        { name: "TikTok", abbr: "TT", color: "#111" },
        { name: "YouTube Shorts", abbr: "YT", color: "#FF0000" },
      ],
    },
    fr: {
      category: "Podcast",
      bigNum: "+23,1 M",
      cap: "de vues générées",
      meta: "144 clips · 1 campagne · redirection podcast",
      excerpt: "Transformer un podcast en moments forts viraux pour faire grandir l'écoute.",
      platformValues: ["17 M", "6 M"],
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
    en: {
      category: "Podcast",
      bigNum: "+23.1M",
      cap: "views generated",
      meta: "144 clips · 1 campaign · drives viewers back to the podcast",
      excerpt: "Turn a podcast into viral standout moments and grow the listenership.",
      platformValues: ["17M", "6M"],
      metrics: [
        { v: "144", k: "clips produced" },
        { v: "1", k: "campaign" },
        { v: "Podcast", k: "redirect" },
      ],
      challenge: "Get a podcast in front of a short-form audience that doesn't listen to it yet.",
      approach: [
        "Spotting the segments with the highest share potential.",
        "Vertical editing and optimized captions.",
        "Targeted distribution to a high-intent audience.",
      ],
      results: "+23.1M views and a measurable lift in viewers driven back to the podcast.",
    },
  },
  {
    shared: {
      slug: "plus-fort-que-moi",
      img: "/img/Film_Plus_Fort_que_Moi.png",
      client: "Plus Fort que Moi, Tandem",
      platformKeys: [
        { name: "YouTube Shorts", abbr: "YT", color: "#FF0000" },
        { name: "TikTok", abbr: "TT", color: "#111" },
        { name: "Instagram Reels", abbr: "IG", color: "linear-gradient(135deg,#feda75,#d62976,#962fbf)" },
      ],
    },
    fr: {
      category: "Cinéma · Sortie",
      bigNum: "+44 M",
      cap: "de vues générées",
      meta: "358 clips · 3 plateformes · 2 campagnes",
      excerpt:
        "Pour la sortie du film « Plus Fort que Moi », on a transformé 15 M de vues visées en +44 M, soit +193 % de surperformance, en deux campagnes calées sur la sortie.",
      objective: { line: "Objectif initial : 15 M de vues.", up: "+193 % de surperformance." },
      platformValues: ["19,1 M", "16,8 M", "6,8 M"],
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
    en: {
      category: "Film · Release",
      bigNum: "+44M",
      cap: "views generated",
      meta: "358 clips · 3 platforms · 2 campaigns",
      excerpt:
        "For the release of « Plus Fort que Moi », we turned a 15M view target into +44M — +193% over target — across two campaigns timed to the release.",
      objective: { line: "Initial target: 15M views.", up: "+193% over target." },
      platformValues: ["19.1M", "16.8M", "6.8M"],
      metrics: [
        { v: "+193%", k: "over target" },
        { v: "358", k: "clips produced" },
        { v: "3", k: "platforms saturated" },
      ],
      challenge:
        "Build intent to see the film in theaters, before and during the release, inside a short, high-stakes distribution window.",
      approach: [
        "Audit of viral potential and a map of the angles around the film.",
        "358 clips edited to each platform's codes, distributed across dozens of accounts.",
        "Two distribution waves synced to the release calendar.",
        "Tracking view spikes against search spikes (24/48h).",
      ],
      results:
        "+44M views, 2.9x the initial 15M target, across three platforms and two distribution waves synced to the film's release.",
    },
  },
  {
    shared: {
      slug: "zebro-et-leow",
      img: "/img/Zebro_et_Leow.png",
      client: "Zebro & Leow",
      platformKeys: [
        { name: "TikTok", abbr: "TT", color: "#111" },
        { name: "YouTube Shorts", abbr: "YT", color: "#FF0000" },
      ],
    },
    fr: {
      category: "Émission · Twitch",
      bigNum: "+19,9 M",
      cap: "de vues générées",
      meta: "194 clips · lives découpés · diffusion continue",
      excerpt:
        "Transformer des heures de live Twitch en dizaines de clips courts pour toucher une audience hors de la communauté.",
      platformValues: ["17,5 M", "2,4 M"],
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
    en: {
      category: "Show · Twitch",
      bigNum: "+19.9M",
      cap: "views generated",
      meta: "194 clips · livestreams cut down · always-on distribution",
      excerpt:
        "Turn hours of Twitch live into dozens of short clips to reach an audience well beyond the community.",
      platformValues: ["17.5M", "2.4M"],
      metrics: [
        { v: "194", k: "clips produced" },
        { v: "+19.9M", k: "views generated" },
        { v: "24/7", k: "always-on distribution" },
      ],
      challenge: "Pull the live content out of the Twitch bubble and capture new viewers on short-form.",
      approach: [
        "Spotting the best moments from live and replay.",
        "Fast-paced cuts and edits built to the vertical short-form codes.",
        "Always-on distribution across TikTok, Reels and Shorts to feed viewers back to the lives.",
      ],
      results: "+19.9M views across 194 clips, and a steady stream of new viewers driven to the lives.",
    },
  },
  {
    shared: {
      slug: "crunch-creator",
      img: "/img/Crunch_Creator.png",
      client: "Crunch Creator",
      platformKeys: [
        { name: "TikTok", abbr: "TT", color: "#111" },
        { name: "YouTube Shorts", abbr: "YT", color: "#FF0000" },
      ],
    },
    fr: {
      category: "Événement",
      bigNum: "+39 M",
      cap: "de vues générées",
      meta: "292 clips · couverture temps réel",
      excerpt: "Couvrir un événement en temps réel et le faire vivre partout, le jour J et après, en format court.",
      platformValues: ["32,1 M", "6,8 M"],
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
    en: {
      category: "Event",
      bigNum: "+39M",
      cap: "views generated",
      meta: "292 clips · real-time coverage",
      excerpt: "Cover an event in real time and make it live everywhere, on the day and after, in short-form.",
      platformValues: ["32.1M", "6.8M"],
      metrics: [
        { v: "292", k: "clips produced" },
        { v: "+39M", k: "views generated" },
        { v: "Day 0", k: "real-time distribution" },
      ],
      challenge: "Maximize an event's reach inside a very short window, with production reacting on the day itself.",
      approach: [
        "Capturing and spotting the highlights live.",
        "Express edits and non-stop publishing throughout the event.",
        "Post-event distribution waves to extend the reach.",
      ],
      results: "+39M views generated across 292 clips, with real-time distribution on the day of the event.",
    },
  },
];

function buildCase(entry: CaseEntry, locale: Locale): CaseStudy {
  const loc = entry[locale] ?? entry.fr;
  const { shared } = entry;
  const platforms =
    shared.platformKeys && loc.platformValues
      ? shared.platformKeys.map((p, i) => ({ ...p, value: loc.platformValues![i] }))
      : undefined;
  return {
    slug: shared.slug,
    img: shared.img,
    client: shared.client,
    category: loc.category,
    bigNum: loc.bigNum,
    cap: loc.cap,
    meta: loc.meta,
    excerpt: loc.excerpt,
    objective: loc.objective,
    platforms,
    metrics: loc.metrics,
    challenge: loc.challenge,
    approach: loc.approach,
    results: loc.results,
  };
}

/* Locale-aware API. */
export function getCases(locale: Locale): CaseStudy[] {
  return ENTRIES.map((e) => buildCase(e, locale));
}

export function getCase(slug: string, locale?: Locale): CaseStudy | undefined {
  const entry = ENTRIES.find((e) => e.shared.slug === slug);
  if (!entry) return undefined;
  return buildCase(entry, locale ?? "fr");
}

/* API française historique — conservée pour Nav.tsx, sitemap.ts, CampaignType.tsx. */
export const CASES: CaseStudy[] = getCases("fr");
