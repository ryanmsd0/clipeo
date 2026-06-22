/* Données des pages « campagne par type ».
   Une entrée = une page /campagnes/[slug]. Contenus & chiffres = brouillons
   à valider avec Clipeo (preuves reliées aux études de cas du deck). */

export type CampaignType = {
  slug: string;
  caseSlug: string;
  label: string;
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  h1: string;
  h1grad: string;
  sub: string;
  heroStat: { count?: number; dec?: number; prefix?: string; suffix?: string; v?: string; k: string };
  floats: { label: string; color: string }[];
  mechTitle: string;
  mechSub: string;
  mech: { t: string; d: string }[];
  workflow: { t: string; d: string }[];
  reasonsTitle: string;
  reasons: { t: string; d: string }[];
  proof: { name: string; cat: string; metric: string; metricK: string; quote: string; ini: string };
  faq: { q: string; a: string }[];
};

export const CAMPAIGN_TYPES: CampaignType[] = [
  {
    slug: "createurs",
    caseSlug: "charles-et-melanie",
    label: "Créateurs YouTube",
    metaTitle: "Campagnes de clipping pour créateurs YouTube",
    metaDesc:
      "Transformez vos longues vidéos en flux de clips quotidiens qui ramènent des abonnés. Campagne de clipping managée pour créateurs YouTube, avec volume de vues garanti.",
    eyebrow: "Campagnes · Créateurs YouTube",
    h1: "Vos longues vidéos,",
    h1grad: "un flux de clips quotidien.",
    sub: "Vous tournez, on découpe. Chaque vidéo longue devient des dizaines de clips qui tournent en boucle et ramènent des abonnés vers vos formats complets.",
    heroStat: { count: 160.9, dec: 1, prefix: "+", suffix: "M", k: "vues sur une chaîne accompagnée" },
    floats: [
      { label: "YouTube Shorts", color: "#FF0000" },
      { label: "TikTok", color: "#000" },
      { label: "Reels", color: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)" },
    ],
    mechTitle: "Comment ça marche pour une chaîne.",
    mechSub: "On exploite votre catalogue existant : pas besoin de tourner plus, juste de diffuser mieux.",
    mech: [
      { t: "On mine vos vidéos", d: "On repère les meilleurs moments de vos vlogs, podcasts et documentaires à fort potentiel viral." },
      { t: "On démultiplie", d: "Chaque vidéo devient des dizaines de clips montés aux codes de chaque plateforme." },
      { t: "On redirige", d: "Les clips ramènent une nouvelle audience vers vos formats longs et vos abonnements." },
    ],
    workflow: [
      { t: "Audit de la chaîne", d: "On analyse votre catalogue et on fixe un objectif de vues chiffré." },
      { t: "Production en continu", d: "Le réseau de clippers produit un flux régulier de clips." },
      { t: "Diffusion multi-comptes", d: "On poste sur des dizaines de comptes pour saturer la recommandation." },
      { t: "Reporting", d: "Vous voyez ce qui ramène des vues et des abonnés, vague après vague." },
    ],
    reasonsTitle: "Pourquoi déléguer plutôt que poster en interne.",
    reasons: [
      { t: "Le volume, sans l'équipe", d: "Sortir des dizaines de clips par semaine en interne est intenable. Notre réseau le fait pour vous." },
      { t: "Les codes de chaque plateforme", d: "Un clip qui marche sur TikTok n'est pas le même que sur Shorts. On adapte, vous ne gérez rien." },
      { t: "Un objectif, pas un espoir", d: "Le volume de vues est garanti au contrat. Vous payez les vues, pas l'effort." },
    ],
    proof: { name: "Charles & Mélanie", cat: "Créateurs YouTube", metric: "+160,9 M", metricK: "vues générées · 7 campagnes", ini: "CM", quote: "On publie notre vidéo, et pendant des semaines elle vit partout en format court. On n'aurait jamais sorti ce volume en interne." },
    faq: [
      { q: "Faut-il tourner du contenu en plus ?", a: "Non. On exploite votre catalogue existant : vlogs, podcasts, lives, documentaires. Vous ne changez rien à votre production." },
      { q: "Est-ce que ça cannibalise mes vues longues ?", a: "Au contraire : les clips créent une porte d'entrée vers vos formats complets et ramènent de nouveaux abonnés." },
      { q: "En combien de temps on lance ?", a: "La plupart des campagnes démarrent en 1 à 2 jours après l'audit." },
    ],
  },
  {
    slug: "marques",
    caseSlug: "la-marine-nationale",
    label: "Marques & grands comptes",
    metaTitle: "Campagnes de clipping pour marques & grands comptes",
    metaDesc:
      "Une présence permanente sur le format court, sans monter d'équipe interne. Campagne de clipping managée pour marques et grands comptes, avec volume de vues garanti au contrat.",
    eyebrow: "Campagnes · Marques & grands comptes",
    h1: "Une présence permanente,",
    h1grad: "sans équipe interne.",
    sub: "Occuper le format court demande un rythme qu'aucune équipe marketing ne tient seule. On devient votre studio de distribution, avec un volume de vues garanti au contrat.",
    heroStat: { v: "100%", k: "du volume garanti au contrat" },
    floats: [
      { label: "TikTok", color: "#000" },
      { label: "Reels", color: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)" },
      { label: "YouTube Shorts", color: "#FF0000" },
    ],
    mechTitle: "Comment ça marche pour une marque.",
    mechSub: "On transforme vos contenus de marque en présence continue, mesurable et pilotée.",
    mech: [
      { t: "On part de votre image", d: "On cadre la ligne édito et les angles dans le strict respect de votre charte de marque." },
      { t: "On produit à l'échelle", d: "Des centaines de clips orientés performance, aux codes de chaque plateforme." },
      { t: "On garantit le résultat", d: "Un volume de vues chiffré, inscrit au contrat. Soit on l'atteint, soit on rembourse." },
    ],
    workflow: [
      { t: "Cadrage de marque", d: "On aligne objectifs, audience, ton et garde-fous de votre image." },
      { t: "Production managée", d: "Notre réseau exécute, vous validez la ligne édito." },
      { t: "Distribution pilotée", d: "Diffusion multi-comptes calée sur les fenêtres algo." },
      { t: "Reporting exécutif", d: "Un rapport clair de la performance, prêt à présenter en interne." },
    ],
    reasonsTitle: "Pourquoi une agence plutôt qu'en interne.",
    reasons: [
      { t: "Zéro recrutement", d: "Pas de monteurs, pas de community managers à embaucher. On absorbe toute la chaîne." },
      { t: "Un seul interlocuteur", d: "Des dizaines de comptes et de clippers, mais un seul point de contact côté marque." },
      { t: "Un engagement contractuel", d: "Vous achetez un résultat chiffré, pas une prestation au forfait. Le risque est de notre côté." },
    ],
    proof: { name: "La Marine Nationale", cat: "Marque · campagne en cours", metric: "Objectif", metricK: "atteint et tenu au contrat", ini: "MN", quote: "Objectif de vues annoncé au contrat, et tenu. Pour une fois, on payait un résultat, pas une promesse." },
    faq: [
      { q: "Vous respectez notre charte de marque ?", a: "Oui. La ligne édito et les garde-fous sont posés dès le cadrage, et vous validez la direction avant production." },
      { q: "On garde la main sur l'image ?", a: "Toujours. Vous validez la ligne édito ; on gère l'exécution et la distribution sans jamais sortir du cadre." },
      { q: "Comment on mesure le ROI ?", a: "Un volume de vues garanti, un tracking par contenu et plateforme, et un rapport prêt à présenter en interne." },
    ],
  },
  {
    slug: "podcasts",
    caseSlug: "kyan-khojandi",
    label: "Podcasts",
    metaTitle: "Campagnes de clipping pour podcasts",
    metaDesc:
      "Chaque épisode devient des dizaines de moments forts qui font grandir l'audience. Campagne de clipping managée pour podcasts, avec volume de vues garanti.",
    eyebrow: "Campagnes · Podcasts",
    h1: "Chaque épisode,",
    h1grad: "une machine à croissance.",
    sub: "Un épisode, c'est des heures de pépites qui dorment. On les extrait, on les monte et on les diffuse pour ramener de nouveaux auditeurs sur vos épisodes complets.",
    heroStat: { count: 23.1, dec: 1, prefix: "+", suffix: "M", k: "vues sur un podcast accompagné" },
    floats: [
      { label: "TikTok", color: "#000" },
      { label: "YouTube Shorts", color: "#FF0000" },
      { label: "Reels", color: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)" },
    ],
    mechTitle: "Comment ça marche pour un podcast.",
    mechSub: "On transforme votre inventaire d'épisodes en flux de clips qui travaille en continu.",
    mech: [
      { t: "Mining d'épisodes", d: "On écoute, on repère les moments forts : punchlines, débats, émotions, révélations." },
      { t: "Montage vertical", d: "Chaque moment devient un clip sous-titré, optimisé pour la rétention sur mobile." },
      { t: "Distribution & redirection", d: "On diffuse sur des dizaines de comptes et on ramène les auditeurs vers l'épisode complet." },
    ],
    workflow: [
      { t: "Audit du catalogue", d: "On évalue le potentiel viral de vos épisodes et on fixe l'objectif." },
      { t: "Mining hebdomadaire", d: "Chaque nouvel épisode est miné dès sa sortie." },
      { t: "Diffusion multi-comptes", d: "Les clips tournent là où votre future audience scrolle." },
      { t: "Reporting & itération", d: "On amplifie les formats qui ramènent le plus d'écoutes." },
    ],
    reasonsTitle: "Pourquoi confier ses clips plutôt que poster soi-même.",
    reasons: [
      { t: "Un inventaire récurrent", d: "Chaque épisode crée du stock. On le transforme en flux régulier, sans surcharge de travail pour vous." },
      { t: "La rétention avant tout", d: "Un clip de podcast vit ou meurt sur ses 3 premières secondes. C'est notre métier." },
      { t: "Des écoutes, pas des likes", d: "L'objectif n'est pas le buzz, c'est ramener des auditeurs qui restent sur vos épisodes." },
    ],
    proof: { name: "Kyan Khojandi", cat: "Podcast", metric: "+23,1 M", metricK: "vues · redirection vers le podcast", ini: "KK", quote: "Le podcast a trouvé une nouvelle audience. Les clips amènent des auditeurs qui restent ensuite sur les épisodes complets." },
    faq: [
      { q: "Audio ou vidéo, ça marche ?", a: "Les deux. Idéalement en vidéo, mais on sait aussi habiller un podcast 100% audio pour le format court." },
      { q: "Vous traitez chaque épisode ?", a: "Oui, on mine chaque nouvel épisode dès sa sortie pour entretenir un flux régulier de clips." },
      { q: "Ça ramène vraiment des écoutes ?", a: "C'est l'objectif : chaque clip est une porte d'entrée vers l'épisode complet, avec une redirection trackée." },
    ],
  },
  {
    slug: "cinema",
    caseSlug: "plus-fort-que-moi",
    label: "Cinéma & sorties",
    metaTitle: "Campagnes de clipping pour le cinéma & les sorties",
    metaDesc:
      "On crée l'intention avant et pendant la sortie, en saturant le format court de vos meilleurs moments. Campagne de clipping pour films et sorties, avec volume de vues garanti.",
    eyebrow: "Campagnes · Cinéma & sorties",
    h1: "Créez l'intention",
    h1grad: "avant la sortie.",
    sub: "Une sortie se gagne dans les semaines qui précèdent. On sature le format court de vos meilleurs moments pour transformer la curiosité en intention, puis en entrées.",
    heroStat: { count: 44, dec: 0, prefix: "+", suffix: "M", k: "vues sur une sortie accompagnée" },
    floats: [
      { label: "TikTok", color: "#000" },
      { label: "Reels", color: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)" },
      { label: "YouTube Shorts", color: "#FF0000" },
    ],
    mechTitle: "Comment ça marche pour une sortie.",
    mechSub: "On orchestre une montée en puissance, du teasing à la sortie, calée sur votre calendrier.",
    mech: [
      { t: "On teasing avant", d: "Bandes-annonces, coulisses, moments forts : on installe la curiosité en amont." },
      { t: "On sature pendant", d: "Le jour J et la semaine de sortie, on inonde la recommandation de clips." },
      { t: "On convertit", d: "Chaque clip pousse vers l'action : séance, plateforme, billetterie." },
    ],
    workflow: [
      { t: "Plan de sortie", d: "On cale les vagues de clips sur votre calendrier de sortie." },
      { t: "Production anticipée", d: "On prépare le stock de clips avant le jour J." },
      { t: "Pic de diffusion", d: "On concentre la puissance de feu sur la fenêtre clé." },
      { t: "Bilan d'impact", d: "On mesure les pics de recherche et de conversion." },
    ],
    reasonsTitle: "Pourquoi une campagne dédiée à la sortie.",
    reasons: [
      { t: "Le timing est tout", d: "Une sortie ne se rattrape pas. On garantit la présence au moment exact où ça compte." },
      { t: "L'intention, pas le buzz", d: "L'objectif n'est pas de faire le buzz, c'est de créer l'envie d'aller voir." },
      { t: "Une montée orchestrée", d: "Teasing, sortie, prolongation : chaque phase a sa stratégie de clips." },
    ],
    proof: { name: "Plus Fort que Moi", cat: "Cinéma · avant et pendant la sortie", metric: "+44 M", metricK: "vues · objectif initial 15 M", ini: "PF", quote: "Objectif initial : 15 M de vues. Résultat : 44 M livrées, et les pics de recherche suivaient chaque vague de clips." },
    faq: [
      { q: "Quand faut-il démarrer ?", a: "Idéalement 3 à 6 semaines avant la sortie pour installer l'intention, mais on s'adapte à votre calendrier." },
      { q: "Vous gérez le jour J ?", a: "Oui, on concentre une vague de diffusion sur la fenêtre de sortie pour maximiser la portée au bon moment." },
      { q: "Ça marche pour autre chose qu'un film ?", a: "Oui : sortie d'album, lancement produit, spectacle, événement. Toute sortie avec une date clé." },
    ],
  },
  {
    slug: "twitch",
    caseSlug: "zebro-et-leow",
    label: "Émissions & Twitch",
    metaTitle: "Campagnes de clipping pour émissions & Twitch",
    metaDesc:
      "On capte les meilleurs instants de vos lives et replays, et on les fait tourner partout, en continu. Campagne de clipping pour émissions et streamers, avec volume de vues garanti.",
    eyebrow: "Campagnes · Émissions & Twitch",
    h1: "Vos lives,",
    h1grad: "découpés et partout.",
    sub: "Des heures de live, c'est des dizaines de moments cultes qui disparaissent à la fin du stream. On les capture et on les fait vivre en format court, en continu.",
    heroStat: { v: "24/7", k: "vos meilleurs moments, en boucle" },
    floats: [
      { label: "Reels", color: "#E1306C" },
      { label: "TikTok", color: "#000" },
      { label: "YouTube Shorts", color: "#FF0000" },
    ],
    mechTitle: "Comment ça marche pour un stream.",
    mechSub: "On transforme vos lives et replays en un flux de clips qui prolonge chaque émission.",
    mech: [
      { t: "On capte le live", d: "On repère les moments forts en direct ou sur le replay : réactions, clutchs, punchlines." },
      { t: "On monte vite", d: "Des clips taillés pour le format court, livrés tant que le moment est chaud." },
      { t: "On fait tourner", d: "Diffusion multi-comptes pour ramener de nouveaux viewers sur votre chaîne." },
    ],
    workflow: [
      { t: "Audit de la chaîne", d: "On évalue le rythme de stream et le potentiel de clips." },
      { t: "Captation live & replay", d: "On mine en direct et après chaque émission." },
      { t: "Diffusion continue", d: "Les clips tournent entre deux streams pour garder la présence." },
      { t: "Reporting", d: "On voit ce qui ramène des viewers et on l'amplifie." },
    ],
    reasonsTitle: "Pourquoi déléguer ses clips de stream.",
    reasons: [
      { t: "Le temps réel", d: "Un clip de live perd sa valeur en quelques heures. On va vite, vous restez en jeu." },
      { t: "Le volume du live", d: "Des heures de contenu par semaine : impossible à exploiter seul. On s'en charge." },
      { t: "De nouveaux viewers", d: "Les clips sont la meilleure porte d'entrée vers votre chaîne et vos lives." },
    ],
    proof: { name: "Zebro & Leow", cat: "Twitch · live & replay", metric: "Temps réel", metricK: "clips livrés pendant le stream", ini: "ZL", quote: "Les meilleurs moments du live tournaient sur TikTok avant même la fin du stream. La chaîne a gagné des viewers réguliers." },
    faq: [
      { q: "Vous clippez en direct ?", a: "Oui, on peut capter les moments forts pendant le live et livrer des clips à chaud, en plus du travail sur les replays." },
      { q: "Ça marche pour une émission, pas qu'un streamer ?", a: "Oui : talk-show, émission, plateau, podcast filmé en live. Tout format avec un flux régulier d'épisodes." },
      { q: "Quel rythme de clips ?", a: "On cale le volume sur votre cadence de stream pour garder une présence continue entre deux lives." },
    ],
  },
  {
    slug: "evenements",
    caseSlug: "crunch-creator",
    label: "Événements",
    metaTitle: "Campagnes de clipping pour événements",
    metaDesc:
      "Couverture en temps réel le jour J pour maximiser la portée. Campagne de clipping événementielle : les clips tombent pendant l'événement, partout, avant même qu'il soit fini.",
    eyebrow: "Campagnes · Événements",
    h1: "Le jour J,",
    h1grad: "partout en temps réel.",
    sub: "Un événement vit une fois. On capte les temps forts au moment où ils se produisent et on les diffuse en direct, pour que l'événement soit partout avant même d'être terminé.",
    heroStat: { count: 39, dec: 0, prefix: "+", suffix: "M", k: "vues sur un événement couvert" },
    floats: [
      { label: "TikTok", color: "#000" },
      { label: "Reels", color: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)" },
      { label: "YouTube Shorts", color: "#FF0000" },
    ],
    mechTitle: "Comment ça marche pour un événement.",
    mechSub: "Une cellule dédiée capte, monte et diffuse en direct, sans temps mort.",
    mech: [
      { t: "On capte en direct", d: "Une équipe repère et récupère les temps forts au moment où ils arrivent." },
      { t: "On monte sur place", d: "Montage et sous-titrage en temps réel, prêts à publier en minutes." },
      { t: "On diffuse en live", d: "Les clips tombent pendant l'événement, sur des dizaines de comptes." },
    ],
    workflow: [
      { t: "Préparation", d: "On cale le dispositif, les angles et l'objectif avant le jour J." },
      { t: "Captation temps réel", d: "On récupère les moments forts au fil de l'événement." },
      { t: "Diffusion immédiate", d: "Les clips sortent pendant que ça se passe, pas le lendemain." },
      { t: "Bilan", d: "On mesure la portée générée sur la fenêtre de l'événement." },
    ],
    reasonsTitle: "Pourquoi une cellule dédiée le jour J.",
    reasons: [
      { t: "L'instant ne se rejoue pas", d: "Un temps fort publié le lendemain est mort. On diffuse à chaud, quand l'attention est maximale." },
      { t: "La vitesse d'exécution", d: "Capter, monter, publier en minutes : ça demande une organisation qu'on a déjà rodée." },
      { t: "L'omniprésence le jour J", d: "Objectif : que votre événement soit partout sur le format court avant même sa fin." },
    ],
    proof: { name: "Crunch Creator", cat: "Événement · campagne en live", metric: "+39 M", metricK: "vues · diffusion le jour J", ini: "CC", quote: "Le jour J, les clips tombaient en temps réel. L'événement était partout sur TikTok avant même la fin du live." },
    faq: [
      { q: "Vous vous déplacez sur l'événement ?", a: "Selon le format, on met en place une cellule dédiée pour capter et diffuser en temps réel le jour J." },
      { q: "À quelle vitesse les clips sortent ?", a: "L'objectif est la publication en quelques minutes, pendant l'événement, pour profiter du pic d'attention." },
      { q: "Et après l'événement ?", a: "On peut prolonger avec une vague de clips best-of dans les jours qui suivent pour entretenir la portée." },
    ],
  },
];

export function getCampaignType(slug: string) {
  return CAMPAIGN_TYPES.find((c) => c.slug === slug);
}
