/* Données des pages « campagne par type ».
   Une entrée = une page /campagnes/[slug]. Contenus & chiffres = brouillons
   à valider avec Clipeo (preuves reliées aux études de cas du deck). */

export type Locale = "fr" | "en";

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

/* Champs indépendants de la langue : partagés entre fr/en. */
type CampaignShared = {
  slug: string;
  caseSlug: string;
  floatColors: string[]; // aligné sur l'ordre des floats localisés
  heroStat: { count?: number; dec?: number; prefix?: string; suffix?: string };
  proofIni: string;
};

/* Champs traduisibles d'un univers (tout le texte visible + les nombres formatés). */
type CampaignLocalized = {
  label: string;
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  h1: string;
  h1grad: string;
  sub: string;
  heroStatV?: string; // valeur statique du heroStat quand pas de compteur
  heroStatK: string;
  floatLabels: string[]; // aligné sur l'ordre de floatColors
  mechTitle: string;
  mechSub: string;
  mech: { t: string; d: string }[];
  workflow: { t: string; d: string }[];
  reasonsTitle: string;
  reasons: { t: string; d: string }[];
  proof: { name: string; cat: string; metric: string; metricK: string; quote: string };
  faq: { q: string; a: string }[];
};

type CampaignEntry = {
  shared: CampaignShared;
  fr: CampaignLocalized;
  en: CampaignLocalized;
};

const ENTRIES: CampaignEntry[] = [
  {
    shared: {
      slug: "createurs",
      caseSlug: "charles-et-melanie",
      floatColors: ["#FF0000", "#000", "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)"],
      heroStat: { count: 160.9, dec: 1, prefix: "+", suffix: "M" },
      proofIni: "CM",
    },
    fr: {
      label: "Créateurs YouTube",
      metaTitle: "Campagnes de clipping pour créateurs YouTube",
      metaDesc:
        "Transformez vos longues vidéos en flux de clips quotidiens qui ramènent des abonnés. Campagne de clipping managée pour créateurs YouTube, avec volume de vues garanti.",
      eyebrow: "Campagnes · Créateurs YouTube",
      h1: "Vos longues vidéos,",
      h1grad: "un flux de clips quotidien.",
      sub: "Vous tournez, on découpe. Chaque vidéo longue devient des dizaines de clips qui tournent en boucle et ramènent des abonnés vers vos formats complets.",
      heroStatK: "vues sur une chaîne accompagnée",
      floatLabels: ["YouTube Shorts", "TikTok", "Reels"],
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
      proof: { name: "Charles & Mélanie", cat: "Créateurs YouTube", metric: "+160,9 M", metricK: "vues générées · 7 campagnes", quote: "On publie notre vidéo, et pendant des semaines elle vit partout en format court. On n'aurait jamais sorti ce volume en interne." },
      faq: [
        { q: "Faut-il tourner du contenu en plus ?", a: "Non. On exploite votre catalogue existant : vlogs, podcasts, lives, documentaires. Vous ne changez rien à votre production." },
        { q: "Est-ce que ça cannibalise mes vues longues ?", a: "Au contraire : les clips créent une porte d'entrée vers vos formats complets et ramènent de nouveaux abonnés." },
        { q: "En combien de temps on lance ?", a: "La plupart des campagnes démarrent en 1 à 2 jours après l'audit." },
      ],
    },
    en: {
      label: "YouTube creators",
      metaTitle: "Clipping campaigns for YouTube creators",
      metaDesc:
        "Turn your long videos into a daily stream of clips that bring subscribers back. A fully managed clipping campaign for YouTube creators, with a guaranteed view volume.",
      eyebrow: "Campaigns · YouTube creators",
      h1: "Your long videos,",
      h1grad: "a daily stream of clips.",
      sub: "You film, we cut. Every long video becomes dozens of clips that run on a loop and pull new subscribers back to your full-length content.",
      heroStatK: "views on a single channel we ran",
      floatLabels: ["YouTube Shorts", "TikTok", "Reels"],
      mechTitle: "How it works for a channel.",
      mechSub: "We mine the catalog you already have. No need to film more, just to distribute better.",
      mech: [
        { t: "We mine your videos", d: "We pull the strongest moments from your vlogs, podcasts and documentaries with real viral potential." },
        { t: "We multiply them", d: "Every video becomes dozens of clips, each edited to the codes of its platform." },
        { t: "We drive them back", d: "The clips bring a new audience to your long-form content and your subscribe button." },
      ],
      workflow: [
        { t: "Channel audit", d: "We analyze your catalog and set a forecasted view target." },
        { t: "Always-on production", d: "Our network of clippers ships a steady flow of clips." },
        { t: "Multi-account distribution", d: "We post across dozens of accounts to saturate the recommendation." },
        { t: "Reporting", d: "You see exactly what brings views and subscribers, wave after wave." },
      ],
      reasonsTitle: "Why delegate instead of posting in-house.",
      reasons: [
        { t: "The volume, without the team", d: "Shipping dozens of clips a week in-house is impossible to sustain. Our network does it for you." },
        { t: "Every platform's codes", d: "A clip that works on TikTok is not the same one that works on Shorts. We adapt it, you handle nothing." },
        { t: "A target, not a hope", d: "The view volume is guaranteed, written into your contract. You pay for views, not effort." },
      ],
      proof: { name: "Charles & Mélanie", cat: "YouTube creators", metric: "+160.9M", metricK: "views generated · 7 campaigns", quote: "We publish our video, and for weeks it lives everywhere in short-form. We would never have shipped this volume in-house." },
      faq: [
        { q: "Do we have to film extra content?", a: "No. We work from the catalog you already have: vlogs, podcasts, lives, documentaries. Nothing changes about how you produce." },
        { q: "Does it cannibalize my long-form views?", a: "The opposite. The clips become a way in to your full-length content and bring new subscribers." },
        { q: "How fast can we launch?", a: "Most campaigns start within 1 to 2 days of the audit." },
      ],
    },
  },
  {
    shared: {
      slug: "marques",
      caseSlug: "la-marine-nationale",
      floatColors: ["#000", "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)", "#FF0000"],
      heroStat: {},
      proofIni: "MN",
    },
    fr: {
      label: "Marques & grands comptes",
      metaTitle: "Campagnes de clipping pour marques & grands comptes",
      metaDesc:
        "Une présence permanente sur le format court, sans monter d'équipe interne. Campagne de clipping managée pour marques et grands comptes, avec volume de vues garanti au contrat.",
      eyebrow: "Campagnes · Marques & grands comptes",
      h1: "Une présence permanente,",
      h1grad: "sans équipe interne.",
      sub: "Occuper le format court demande un rythme qu'aucune équipe marketing ne tient seule. On devient votre studio de distribution, avec un volume de vues garanti au contrat.",
      heroStatV: "100%",
      heroStatK: "du volume garanti au contrat",
      floatLabels: ["TikTok", "Reels", "YouTube Shorts"],
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
      proof: { name: "La Marine Nationale", cat: "Marque · campagne en cours", metric: "Objectif", metricK: "atteint et tenu au contrat", quote: "Objectif de vues annoncé au contrat, et tenu. Pour une fois, on payait un résultat, pas une promesse." },
      faq: [
        { q: "Vous respectez notre charte de marque ?", a: "Oui. La ligne édito et les garde-fous sont posés dès le cadrage, et vous validez la direction avant production." },
        { q: "On garde la main sur l'image ?", a: "Toujours. Vous validez la ligne édito ; on gère l'exécution et la distribution sans jamais sortir du cadre." },
        { q: "Comment on mesure le ROI ?", a: "Un volume de vues garanti, un tracking par contenu et plateforme, et un rapport prêt à présenter en interne." },
      ],
    },
    en: {
      label: "Brands & enterprises",
      metaTitle: "Clipping campaigns for brands & enterprises",
      metaDesc:
        "A permanent presence on short-form, without building an in-house team. A fully managed clipping campaign for brands and enterprises, with a view volume guaranteed in your contract.",
      eyebrow: "Campaigns · Brands & enterprises",
      h1: "A permanent presence,",
      h1grad: "with no in-house team.",
      sub: "Owning short-form takes a pace no marketing team can hold on its own. We become your distribution studio, with a view volume written into your contract.",
      heroStatV: "100%",
      heroStatK: "of the volume guaranteed in your contract",
      floatLabels: ["TikTok", "Reels", "YouTube Shorts"],
      mechTitle: "How it works for a brand.",
      mechSub: "We turn your brand content into a continuous presence that's measured and managed.",
      mech: [
        { t: "We start from your brand", d: "We set the editorial line and the angles in strict respect of your brand guidelines." },
        { t: "We produce at scale", d: "Hundreds of performance-driven clips, built to the codes of each platform." },
        { t: "We guarantee the result", d: "A forecasted view volume, written into your contract. We hit it, or we refund you." },
      ],
      workflow: [
        { t: "Brand framing", d: "We align on goals, audience, tone and the guardrails around your image." },
        { t: "Managed production", d: "Our network executes, you sign off on the editorial line." },
        { t: "Managed distribution", d: "Multi-account distribution timed to the algorithm windows." },
        { t: "Executive reporting", d: "A clear performance report, ready to present internally." },
      ],
      reasonsTitle: "Why an agency instead of in-house.",
      reasons: [
        { t: "Zero hiring", d: "No editors, no community managers to bring on. We absorb the entire chain." },
        { t: "A single point of contact", d: "Dozens of accounts and clippers, but one contact on the brand side." },
        { t: "A contractual commitment", d: "You buy a forecasted result, not a flat-rate service. The risk sits on our side." },
      ],
      proof: { name: "La Marine Nationale", cat: "Brand · live campaign", metric: "Target", metricK: "hit and held to contract", quote: "A view target stated in the contract, and delivered. For once, we were paying for a result, not a promise." },
      faq: [
        { q: "Do you respect our brand guidelines?", a: "Yes. The editorial line and the guardrails are set during framing, and you sign off on the direction before production." },
        { q: "Do we keep control of the brand?", a: "Always. You approve the editorial line; we handle execution and distribution without ever stepping outside the frame." },
        { q: "How do we measure ROI?", a: "A guaranteed view volume, tracking by content and platform, and a report ready to present internally." },
      ],
    },
  },
  {
    shared: {
      slug: "podcasts",
      caseSlug: "kyan-khojandi",
      floatColors: ["#000", "#FF0000", "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)"],
      heroStat: { count: 23.1, dec: 1, prefix: "+", suffix: "M" },
      proofIni: "KK",
    },
    fr: {
      label: "Podcasts",
      metaTitle: "Campagnes de clipping pour podcasts",
      metaDesc:
        "Chaque épisode devient des dizaines de moments forts qui font grandir l'audience. Campagne de clipping managée pour podcasts, avec volume de vues garanti.",
      eyebrow: "Campagnes · Podcasts",
      h1: "Chaque épisode,",
      h1grad: "une machine à croissance.",
      sub: "Un épisode, c'est des heures de pépites qui dorment. On les extrait, on les monte et on les diffuse pour ramener de nouveaux auditeurs sur vos épisodes complets.",
      heroStatK: "vues sur un podcast accompagné",
      floatLabels: ["TikTok", "YouTube Shorts", "Reels"],
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
      proof: { name: "Kyan Khojandi", cat: "Podcast", metric: "+23,1 M", metricK: "vues · redirection vers le podcast", quote: "Le podcast a trouvé une nouvelle audience. Les clips amènent des auditeurs qui restent ensuite sur les épisodes complets." },
      faq: [
        { q: "Audio ou vidéo, ça marche ?", a: "Les deux. Idéalement en vidéo, mais on sait aussi habiller un podcast 100% audio pour le format court." },
        { q: "Vous traitez chaque épisode ?", a: "Oui, on mine chaque nouvel épisode dès sa sortie pour entretenir un flux régulier de clips." },
        { q: "Ça ramène vraiment des écoutes ?", a: "C'est l'objectif : chaque clip est une porte d'entrée vers l'épisode complet, avec une redirection trackée." },
      ],
    },
    en: {
      label: "Podcasts",
      metaTitle: "Clipping campaigns for podcasts",
      metaDesc:
        "Every episode becomes dozens of standout moments that grow your audience. A fully managed clipping campaign for podcasts, with a guaranteed view volume.",
      eyebrow: "Campaigns · Podcasts",
      h1: "Every episode,",
      h1grad: "a growth engine.",
      sub: "An episode is hours of gold sitting idle. We pull it out, edit it and distribute it to bring new listeners back to your full episodes.",
      heroStatK: "views on a single podcast we ran",
      floatLabels: ["TikTok", "YouTube Shorts", "Reels"],
      mechTitle: "How it works for a podcast.",
      mechSub: "We turn your back catalog of episodes into a stream of clips that works around the clock.",
      mech: [
        { t: "Episode mining", d: "We listen and spot the standout moments: punchlines, debates, emotion, reveals." },
        { t: "Vertical editing", d: "Every moment becomes a captioned clip, built for retention on mobile." },
        { t: "Distribution & redirect", d: "We post across dozens of accounts and drive listeners back to the full episode." },
      ],
      workflow: [
        { t: "Catalog audit", d: "We assess the viral potential of your episodes and set the target." },
        { t: "Weekly mining", d: "Every new episode is mined the day it drops." },
        { t: "Multi-account distribution", d: "The clips run wherever your future audience is scrolling." },
        { t: "Reporting & iteration", d: "We scale the formats that bring back the most listens." },
      ],
      reasonsTitle: "Why hand off your clips instead of posting them yourself.",
      reasons: [
        { t: "A recurring inventory", d: "Every episode builds stock. We turn it into a steady flow, with no extra workload on you." },
        { t: "Retention first", d: "A podcast clip lives or dies on its first 3 seconds. That's our craft." },
        { t: "Listens, not likes", d: "The goal isn't the buzz, it's bringing back listeners who stay on your episodes." },
      ],
      proof: { name: "Kyan Khojandi", cat: "Podcast", metric: "+23.1M", metricK: "views · drives viewers back to the podcast", quote: "The podcast found a new audience. The clips bring in listeners who then stick around for the full episodes." },
      faq: [
        { q: "Does it work for audio or video?", a: "Both. Video is ideal, but we can also dress up a pure-audio podcast for short-form." },
        { q: "Do you handle every episode?", a: "Yes, we mine every new episode the day it drops to keep a steady flow of clips going." },
        { q: "Does it really bring back listens?", a: "That's the goal: each clip is a way in to the full episode, with a tracked redirect." },
      ],
    },
  },
  {
    shared: {
      slug: "cinema",
      caseSlug: "plus-fort-que-moi",
      floatColors: ["#000", "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)", "#FF0000"],
      heroStat: { count: 44, dec: 0, prefix: "+", suffix: "M" },
      proofIni: "PF",
    },
    fr: {
      label: "Cinéma & sorties",
      metaTitle: "Campagnes de clipping pour le cinéma & les sorties",
      metaDesc:
        "On crée l'intention avant et pendant la sortie, en saturant le format court de vos meilleurs moments. Campagne de clipping pour films et sorties, avec volume de vues garanti.",
      eyebrow: "Campagnes · Cinéma & sorties",
      h1: "Créez l'intention",
      h1grad: "avant la sortie.",
      sub: "Une sortie se gagne dans les semaines qui précèdent. On sature le format court de vos meilleurs moments pour transformer la curiosité en intention, puis en entrées.",
      heroStatK: "vues sur une sortie accompagnée",
      floatLabels: ["TikTok", "Reels", "YouTube Shorts"],
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
      proof: { name: "Plus Fort que Moi", cat: "Cinéma · avant et pendant la sortie", metric: "+44 M", metricK: "vues · objectif initial 15 M", quote: "Objectif initial : 15 M de vues. Résultat : 44 M livrées, et les pics de recherche suivaient chaque vague de clips." },
      faq: [
        { q: "Quand faut-il démarrer ?", a: "Idéalement 3 à 6 semaines avant la sortie pour installer l'intention, mais on s'adapte à votre calendrier." },
        { q: "Vous gérez le jour J ?", a: "Oui, on concentre une vague de diffusion sur la fenêtre de sortie pour maximiser la portée au bon moment." },
        { q: "Ça marche pour autre chose qu'un film ?", a: "Oui : sortie d'album, lancement produit, spectacle, événement. Toute sortie avec une date clé." },
      ],
    },
    en: {
      label: "Film & releases",
      metaTitle: "Clipping campaigns for film & releases",
      metaDesc:
        "We build intent before and during the release by saturating short-form with your best moments. A clipping campaign for films and releases, with a guaranteed view volume.",
      eyebrow: "Campaigns · Film & releases",
      h1: "Build the intent",
      h1grad: "before the release.",
      sub: "A release is won in the weeks before it. We saturate short-form with your best moments to turn curiosity into intent, then into ticket sales.",
      heroStatK: "views on a single release we ran",
      floatLabels: ["TikTok", "Reels", "YouTube Shorts"],
      mechTitle: "How it works for a release.",
      mechSub: "We orchestrate a build-up, from teasing to release day, timed to your calendar.",
      mech: [
        { t: "We tease beforehand", d: "Trailers, behind-the-scenes, standout moments: we plant the curiosity early." },
        { t: "We saturate during", d: "On release day and release week, we flood the recommendation with clips." },
        { t: "We convert", d: "Every clip pushes toward action: the screening, the platform, the box office." },
      ],
      workflow: [
        { t: "Release plan", d: "We time the clip waves to your release calendar." },
        { t: "Advance production", d: "We build the stock of clips before release day." },
        { t: "Distribution peak", d: "We concentrate the firepower on the key window." },
        { t: "Impact review", d: "We measure the spikes in search and conversion." },
      ],
      reasonsTitle: "Why a campaign built around the release.",
      reasons: [
        { t: "Timing is everything", d: "A release doesn't come back around. We guarantee the presence at the exact moment it counts." },
        { t: "Intent, not buzz", d: "The goal isn't to make noise, it's to create the urge to go and see it." },
        { t: "An orchestrated build-up", d: "Teasing, release, extension: each phase has its own clip strategy." },
      ],
      proof: { name: "Plus Fort que Moi", cat: "Film · before and during the release", metric: "+44M", metricK: "views · initial target 15M", quote: "Initial target: 15M views. Result: 44M delivered, with search spikes tracking every wave of clips." },
      faq: [
        { q: "When should we start?", a: "Ideally 3 to 6 weeks before the release to build intent, but we adapt to your calendar." },
        { q: "Do you handle release day?", a: "Yes, we concentrate a distribution wave on the release window to maximize reach at the right moment." },
        { q: "Does it work for things other than a film?", a: "Yes: an album drop, a product launch, a show, an event. Any release with a key date." },
      ],
    },
  },
  {
    shared: {
      slug: "twitch",
      caseSlug: "zebro-et-leow",
      floatColors: ["#E1306C", "#000", "#FF0000"],
      heroStat: {},
      proofIni: "ZL",
    },
    fr: {
      label: "Émissions & Twitch",
      metaTitle: "Campagnes de clipping pour émissions & Twitch",
      metaDesc:
        "On capte les meilleurs instants de vos lives et replays, et on les fait tourner partout, en continu. Campagne de clipping pour émissions et streamers, avec volume de vues garanti.",
      eyebrow: "Campagnes · Émissions & Twitch",
      h1: "Vos lives,",
      h1grad: "découpés et partout.",
      sub: "Des heures de live, c'est des dizaines de moments cultes qui disparaissent à la fin du stream. On les capture et on les fait vivre en format court, en continu.",
      heroStatV: "24/7",
      heroStatK: "vos meilleurs moments, en boucle",
      floatLabels: ["Reels", "TikTok", "YouTube Shorts"],
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
      proof: { name: "Zebro & Leow", cat: "Twitch · live & replay", metric: "Temps réel", metricK: "clips livrés pendant le stream", quote: "Les meilleurs moments du live tournaient sur TikTok avant même la fin du stream. La chaîne a gagné des viewers réguliers." },
      faq: [
        { q: "Vous clippez en direct ?", a: "Oui, on peut capter les moments forts pendant le live et livrer des clips à chaud, en plus du travail sur les replays." },
        { q: "Ça marche pour une émission, pas qu'un streamer ?", a: "Oui : talk-show, émission, plateau, podcast filmé en live. Tout format avec un flux régulier d'épisodes." },
        { q: "Quel rythme de clips ?", a: "On cale le volume sur votre cadence de stream pour garder une présence continue entre deux lives." },
      ],
    },
    en: {
      label: "Shows & Twitch",
      metaTitle: "Clipping campaigns for shows & Twitch",
      metaDesc:
        "We capture the best moments from your lives and replays and run them everywhere, around the clock. A clipping campaign for shows and streamers, with a guaranteed view volume.",
      eyebrow: "Campaigns · Shows & Twitch",
      h1: "Your livestreams,",
      h1grad: "cut down and everywhere.",
      sub: "Hours of live is dozens of unforgettable moments that vanish when the stream ends. We capture them and keep them alive in short-form, around the clock.",
      heroStatV: "24/7",
      heroStatK: "your best moments, on a loop",
      floatLabels: ["Reels", "TikTok", "YouTube Shorts"],
      mechTitle: "How it works for a stream.",
      mechSub: "We turn your lives and replays into a stream of clips that extends every show.",
      mech: [
        { t: "We capture the live", d: "We spot the standout moments live or on the replay: reactions, clutches, punchlines." },
        { t: "We edit fast", d: "Clips cut for short-form, delivered while the moment is still hot." },
        { t: "We keep them running", d: "Multi-account distribution to bring new viewers back to your channel." },
      ],
      workflow: [
        { t: "Channel audit", d: "We assess your stream cadence and the clip potential." },
        { t: "Live & replay capture", d: "We mine live and after every show." },
        { t: "Always-on distribution", d: "The clips run between streams to keep the presence up." },
        { t: "Reporting", d: "We see what brings viewers back and scale it." },
      ],
      reasonsTitle: "Why delegate your stream clips.",
      reasons: [
        { t: "Real time", d: "A live clip loses its value within hours. We move fast, you stay in the game." },
        { t: "The volume of live", d: "Hours of content a week: impossible to mine on your own. We take it on." },
        { t: "New viewers", d: "Clips are the best way in to your channel and your lives." },
      ],
      proof: { name: "Zebro & Leow", cat: "Twitch · live & replay", metric: "Real time", metricK: "clips delivered during the stream", quote: "The best moments from the live were running on TikTok before the stream even ended. The channel gained regular viewers." },
      faq: [
        { q: "Do you clip live?", a: "Yes, we can capture the standout moments during the live and ship clips hot, on top of the work on replays." },
        { q: "Does it work for a show, not just a streamer?", a: "Yes: talk shows, programs, panels, podcasts filmed live. Any format with a steady flow of episodes." },
        { q: "What clip cadence?", a: "We set the volume to your stream cadence to keep a continuous presence between lives." },
      ],
    },
  },
  {
    shared: {
      slug: "evenements",
      caseSlug: "crunch-creator",
      floatColors: ["#000", "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)", "#FF0000"],
      heroStat: { count: 39, dec: 0, prefix: "+", suffix: "M" },
      proofIni: "CC",
    },
    fr: {
      label: "Événements",
      metaTitle: "Campagnes de clipping pour événements",
      metaDesc:
        "Couverture en temps réel le jour J pour maximiser la portée. Campagne de clipping événementielle : les clips tombent pendant l'événement, partout, avant même qu'il soit fini.",
      eyebrow: "Campagnes · Événements",
      h1: "Le jour J,",
      h1grad: "partout en temps réel.",
      sub: "Un événement vit une fois. On capte les temps forts au moment où ils se produisent et on les diffuse en direct, pour que l'événement soit partout avant même d'être terminé.",
      heroStatK: "vues sur un événement couvert",
      floatLabels: ["TikTok", "Reels", "YouTube Shorts"],
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
      proof: { name: "Crunch Creator", cat: "Événement · campagne en live", metric: "+39 M", metricK: "vues · diffusion le jour J", quote: "Le jour J, les clips tombaient en temps réel. L'événement était partout sur TikTok avant même la fin du live." },
      faq: [
        { q: "Vous vous déplacez sur l'événement ?", a: "Selon le format, on met en place une cellule dédiée pour capter et diffuser en temps réel le jour J." },
        { q: "À quelle vitesse les clips sortent ?", a: "L'objectif est la publication en quelques minutes, pendant l'événement, pour profiter du pic d'attention." },
        { q: "Et après l'événement ?", a: "On peut prolonger avec une vague de clips best-of dans les jours qui suivent pour entretenir la portée." },
      ],
    },
    en: {
      label: "Events",
      metaTitle: "Clipping campaigns for events",
      metaDesc:
        "Real-time coverage on the day to maximize reach. An event clipping campaign: the clips land during the event, everywhere, before it's even over.",
      eyebrow: "Campaigns · Events",
      h1: "On the day,",
      h1grad: "everywhere in real time.",
      sub: "An event happens once. We capture the highlights as they happen and distribute them live, so the event is everywhere before it's even over.",
      heroStatK: "views on a single event we covered",
      floatLabels: ["TikTok", "Reels", "YouTube Shorts"],
      mechTitle: "How it works for an event.",
      mechSub: "A dedicated unit captures, edits and distributes live, with no downtime.",
      mech: [
        { t: "We capture live", d: "A team spots and grabs the highlights the moment they happen." },
        { t: "We edit on site", d: "Editing and captioning in real time, ready to publish in minutes." },
        { t: "We distribute live", d: "The clips land during the event, across dozens of accounts." },
      ],
      workflow: [
        { t: "Preparation", d: "We set the operation, the angles and the target before the day." },
        { t: "Real-time capture", d: "We grab the highlights as the event unfolds." },
        { t: "Immediate distribution", d: "The clips go out while it's happening, not the next day." },
        { t: "Review", d: "We measure the reach generated across the event window." },
      ],
      reasonsTitle: "Why a dedicated unit on the day.",
      reasons: [
        { t: "The moment doesn't replay", d: "A highlight posted the next day is dead. We distribute hot, when attention peaks." },
        { t: "Speed of execution", d: "Capture, edit, publish in minutes: it takes an operation we've already drilled." },
        { t: "Being everywhere on the day", d: "The goal: your event everywhere on short-form before it's even over." },
      ],
      proof: { name: "Crunch Creator", cat: "Event · live campaign", metric: "+39M", metricK: "views · distributed on the day", quote: "On the day, the clips landed in real time. The event was everywhere on TikTok before the live was even over." },
      faq: [
        { q: "Do you come on site for the event?", a: "Depending on the format, we set up a dedicated unit to capture and distribute in real time on the day." },
        { q: "How fast do the clips go out?", a: "The goal is publishing within minutes, during the event, to ride the peak of attention." },
        { q: "And after the event?", a: "We can extend it with a wave of best-of clips in the following days to keep the reach going." },
      ],
    },
  },
];

function buildCampaign(entry: CampaignEntry, locale: Locale): CampaignType {
  const loc = entry[locale] ?? entry.fr;
  const { shared } = entry;
  const floats = shared.floatColors.map((color, i) => ({ label: loc.floatLabels[i], color }));
  const heroStat =
    shared.heroStat.count != null
      ? { ...shared.heroStat, k: loc.heroStatK }
      : { v: loc.heroStatV, k: loc.heroStatK };
  return {
    slug: shared.slug,
    caseSlug: shared.caseSlug,
    label: loc.label,
    metaTitle: loc.metaTitle,
    metaDesc: loc.metaDesc,
    eyebrow: loc.eyebrow,
    h1: loc.h1,
    h1grad: loc.h1grad,
    sub: loc.sub,
    heroStat,
    floats,
    mechTitle: loc.mechTitle,
    mechSub: loc.mechSub,
    mech: loc.mech,
    workflow: loc.workflow,
    reasonsTitle: loc.reasonsTitle,
    reasons: loc.reasons,
    proof: { ...loc.proof, ini: shared.proofIni },
    faq: loc.faq,
  };
}

/* Locale-aware API. */
export function getCampaignTypes(locale: Locale): CampaignType[] {
  return ENTRIES.map((e) => buildCampaign(e, locale));
}

export function getCampaignType(slug: string, locale?: Locale): CampaignType | undefined {
  const entry = ENTRIES.find((e) => e.shared.slug === slug);
  if (!entry) return undefined;
  return buildCampaign(entry, locale ?? "fr");
}

/* API française historique — conservée pour sitemap.ts, CampaignType.tsx, etc. */
export const CAMPAIGN_TYPES: CampaignType[] = getCampaignTypes("fr");
