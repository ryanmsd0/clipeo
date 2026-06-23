import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Tout sauf l'API, les internes Next, les images OG (sinon /fr/opengraph-image
  // est redirigé en 307 et les scrapers ne suivent pas), et les fichiers (avec extension)
  matcher: ["/((?!api|_next|_vercel|.*opengraph-image|.*\\..*).*)"],
};
