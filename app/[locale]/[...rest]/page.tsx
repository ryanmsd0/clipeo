import { notFound } from "next/navigation";

/* Catch-all : toute route inconnue SOUS une locale (ex. /fr/page-inexistante)
   déclenche le 404 LOCALISÉ (app/[locale]/not-found.tsx, avec nav + footer),
   au lieu de tomber sur le not-found global (qui n'a pas de layout racine → 500). */
export default function CatchAllNotFound() {
  notFound();
}
