// Covers réelles par univers — source UNIQUE partagée par l'accueil (« Pour qui »)
// et les pages /campagnes/[slug]. Budgets € internes, jamais ici. `views`/`clips`
// = totaux RÉELS par catégorie (cf. mémoire stats-reelles-clipeo). Marine ×2.

export type UniversExample = { covers: string[]; views: string; clips: string };

export const UNIVERS_EXAMPLES: Record<string, UniversExample> = {
  // 17 créateurs YouTube — covers triées par vues décroissantes
  createurs: { covers: ["Charles_et_Melanie", "Antoine", "La_Compagnie", "Joyca", "Mister_V", "Michou", "FastGoodCuisine", "Inoxtag", "Daetienne", "ImSolal", "Flamby", "Max_Laulom", "Ben_Nevert", "Misha_et_Alex", "Cossi", "Simon_Puech", "Le_Corbz"], views: "+491,6 M", clips: "5 404" },
  marques: { covers: ["La_Marine_Nationale", "RAAPACE_x_Le_Portrait_LEGO"], views: "+7,5 M", clips: "245" },
  podcasts: { covers: ["Kyan_Khojandi"], views: "+23,1 M", clips: "144" },
  cinema: { covers: ["Film_Plus_Fort_que_Moi"], views: "+44 M", clips: "358" },
  twitch: { covers: ["Zebro_et_Leow"], views: "+20,2 M", clips: "210" },
  evenements: { covers: ["Crunch_Creator"], views: "+39 M", clips: "292" },
};

export const coverPath = (c: string) => `/img/Clipeo%20covers%20campagnes/${c}.png`;

// Nom lisible depuis le nom de fichier d'une cover (pour l'alt).
export const coverLabel = (c: string) =>
  c.replace(/_/g, " ").replace(/^Film /, "").replace(/ x /, " × ");
