import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Langues supportées
  locales: ["fr", "en"],
  // Français = langue par défaut, servie à la racine (URLs FR inchangées)
  defaultLocale: "fr",
  // FR sans préfixe (/services), EN préfixé (/en/services)
  localePrefix: "as-needed",
  // Détection auto via l'en-tête Accept-Language du navigateur
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];
