/* Données des pages « offre de service ».
   Une entrée = une page /services/[slug]. Contenus & chiffres = brouillons
   à valider avec Clipeo (preuves reliées aux études de cas du deck). */

export type ServiceType = {
  slug: string;
  label: string;
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  h1: string;
  h1grad: string;
  sub: string;
  heroStat: { count?: number; dec?: number; prefix?: string; suffix?: string; v?: string; k: string };
  floats: { label: string; color: string }[];
  included: { t: string; d: string }[];
  process: { t: string; d: string }[];
  proof: { name: string; cat: string; metric: string; metricK: string; quote: string; ini: string };
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
};

const TT = "#000";
const YT = "#FF0000";
const IG = "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)";

export const SERVICE_TYPES: ServiceType[] = [
  {
    slug: "campagne-managee",
    label: "Campagne managée",
    metaTitle: "Campagne de clipping managée · de l'audit à la croissance",
    metaDesc:
      "L'offre clé en main : on gère l'audit, la production, la distribution et l'optimisation. Vous validez la ligne édito, on garantit le volume de vues au contrat.",
    eyebrow: "Service · Campagne managée",
    h1: "On gère tout.",
    h1grad: "Vous validez, c'est tout.",
    sub: "L'offre clé en main : audit, production, distribution et optimisation. Vous gardez la main sur la ligne édito, on s'occupe du reste, avec un volume de vues garanti au contrat.",
    heroStat: { count: 160.9, dec: 1, prefix: "+", suffix: "M", k: "vues sur une campagne managée" },
    floats: [{ label: "TikTok", color: TT }, { label: "YouTube Shorts", color: YT }],
    included: [
      { t: "Audit & stratégie", d: "Analyse du potentiel viral et objectif de vues chiffré dès le départ." },
      { t: "Production de clips", d: "Des centaines de clips montés par notre réseau de clippers." },
      { t: "Distribution multi-comptes", d: "Diffusion sur des dizaines de comptes, au bon moment." },
      { t: "Tracking & optimisation", d: "Reporting continu : on coupe ce qui ne marche pas, on amplifie le reste." },
    ],
    process: [
      { t: "Audit", d: "On cartographie votre contenu et on fixe l'objectif de vues." },
      { t: "Production", d: "Le réseau de clippers produit un flux régulier de clips." },
      { t: "Distribution", d: "On sature la recommandation de votre audience." },
      { t: "Optimisation", d: "On mesure, on coupe, on amplifie. Chaque vague nourrit la suivante." },
    ],
    proof: { name: "Charles & Mélanie", cat: "Créateurs YouTube", metric: "+160,9 M", metricK: "vues générées · 7 campagnes", ini: "CM", quote: "On publie notre vidéo, et pendant des semaines elle vit partout en format court. On n'aurait jamais sorti ce volume en interne." },
    faq: [
      { q: "Qu'est-ce qui est inclus exactement ?", a: "Tout : l'audit, la stratégie, la production des clips, la distribution multi-comptes, le tracking et l'optimisation. Vous validez la ligne édito, on exécute." },
      { q: "Je garde la main sur mon image ?", a: "Oui. Vous validez la direction édito et les garde-fous ; on gère l'exécution sans jamais sortir du cadre." },
      { q: "Le volume de vues est vraiment garanti ?", a: "Oui, il est chiffré et inscrit au contrat. Si l'objectif n'est pas atteint, on rembourse la différence." },
    ],
    ctaTitle: "Lancez votre campagne managée.",
    ctaText: "20 minutes pour auditer votre contenu et vous projeter un objectif de vues chiffré. Sans engagement.",
  },
  {
    slug: "production-de-clips",
    label: "Production de clips",
    metaTitle: "Production de clips à la demande · montage format court",
    metaDesc:
      "Vous avez le contenu long, vous voulez les clips. On découpe, on monte et on sous-titre aux codes de chaque plateforme. Livraison prête à poster, à votre rythme.",
    eyebrow: "Service · Production de clips",
    h1: "Vous tournez.",
    h1grad: "On découpe, on monte.",
    sub: "Vous avez le contenu long, vous voulez les clips, sans gérer la diffusion. On découpe, on monte et on sous-titre aux codes de chaque plateforme. Vous recevez des clips prêts à poster.",
    heroStat: { v: "+6,6K", k: "clips déjà produits" },
    floats: [{ label: "TikTok", color: TT }, { label: "Reels", color: IG }],
    included: [
      { t: "Découpage & montage", d: "Aux codes de chaque plateforme : TikTok, Reels, Shorts." },
      { t: "Sous-titres optimisés", d: "Pensés pour accrocher dès la première seconde et tenir la rétention." },
      { t: "Livraison prête à poster", d: "Vous recevez les clips finis, prêts à publier où vous voulez." },
      { t: "Volume à votre rythme", d: "On s'adapte à votre cadence, du one-shot au flux régulier." },
    ],
    process: [
      { t: "Brief", d: "Vous nous envoyez votre contenu long et vos préférences." },
      { t: "Montage", d: "Nos clippers découpent et habillent les meilleurs moments." },
      { t: "Livraison", d: "Vous récupérez les clips, prêts à diffuser." },
    ],
    proof: { name: "FastGoodCuisine", cat: "Créateur YouTube", metric: "+27,4 M", metricK: "vues à partir de clips produits", ini: "FG", quote: "Chaque recette devient des dizaines de clips, et le reporting montre exactement ce qui ramène des vues." },
    faq: [
      { q: "Vous diffusez aussi les clips ?", a: "Dans cette offre, non : on vous livre les clips prêts à poster, vous gérez la diffusion. Pour la diffusion, voyez l'offre Distribution & tracking." },
      { q: "Quel format de livraison ?", a: "Des fichiers verticaux prêts à publier, déclinés aux codes de chaque plateforme, avec sous-titres intégrés." },
      { q: "Quel volume minimum ?", a: "On s'adapte à votre besoin, du test ponctuel à un flux hebdomadaire régulier." },
    ],
    ctaTitle: "Besoin de clips, vite et bien ?",
    ctaText: "Dites-nous ce que vous voulez découper. On vous fait une proposition de production sur mesure.",
  },
  {
    slug: "distribution-tracking",
    label: "Distribution & tracking",
    metaTitle: "Distribution multi-comptes & tracking · diffusion de clips",
    metaDesc:
      "Vous avez les clips, il leur manque la portée. On les fait tourner sur notre réseau de comptes, au bon moment, avec un tracking par contenu et par plateforme.",
    eyebrow: "Service · Distribution & tracking",
    h1: "Vos clips, partout.",
    h1grad: "On les fait tourner.",
    sub: "Vous avez les clips, il leur manque la portée. On les diffuse sur notre réseau de comptes, calés aux fenêtres algo de chaque plateforme, avec un tracking précis du retour.",
    heroStat: { v: "60+", k: "comptes de diffusion par campagne" },
    floats: [{ label: "TikTok", color: TT }, { label: "YouTube Shorts", color: YT }],
    included: [
      { t: "Diffusion multi-comptes", d: "Vos clips publiés sur des dizaines de comptes, multi-plateformes." },
      { t: "Calage algo", d: "Publication aux fenêtres optimales de chaque réseau." },
      { t: "Tracking par contenu", d: "Vous voyez ce qui rapporte des vues, et sur quelle plateforme." },
      { t: "Rapport de performance", d: "Un bilan détaillé en fin de campagne, prêt à présenter." },
    ],
    process: [
      { t: "Setup", d: "On connecte le réseau de comptes adapté à votre cible." },
      { t: "Diffusion", d: "On fait tourner vos clips, au bon moment, partout." },
      { t: "Tracking", d: "On mesure et on vous livre un reporting clair." },
    ],
    proof: { name: "La Compagnie", cat: "Créateurs YouTube", metric: "+48,2 M", metricK: "vues · diffusion multi-comptes", ini: "LC", quote: "On tourne, ils découpent, ça tourne partout. Le rythme de publication est devenu une vraie force pour la chaîne." },
    faq: [
      { q: "Vous produisez aussi les clips ?", a: "Dans cette offre, non : vous fournissez les clips, on s'occupe de la portée. Pour la production, voyez l'offre Production de clips." },
      { q: "Sur combien de comptes diffusez-vous ?", a: "Ça dépend de l'objectif : on cale un réseau de comptes adapté à votre cible, souvent plusieurs dizaines." },
      { q: "Comment je suis les résultats ?", a: "Tracking par contenu et par plateforme, avec un rapport de performance détaillé en fin de campagne." },
    ],
    ctaTitle: "Donnez de la portée à vos clips.",
    ctaText: "Vous avez les clips ? On les fait tourner. 20 minutes pour caler un objectif de diffusion chiffré.",
  },
];

export function getService(slug: string) {
  return SERVICE_TYPES.find((s) => s.slug === slug);
}
