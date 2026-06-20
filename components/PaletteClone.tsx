import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HomeSections from "@/components/HomeSections";

/* ------------------------------------------------------------------ *
 *  PaletteClone — clone COMPLET et ISOLÉ de la landing pour tester une
 *  palette (routes /couleur, /couleur1…/couleur5).
 *
 *  Règle commune : le bleu principal Clipeo #080151 reste DOMINANT
 *  (accents solides + extrémité sombre des dégradés). Seule la couleur
 *  d'accentuation `accent` change d'une route à l'autre → highlights,
 *  fin claire des dégradés, puces, lueurs.
 *
 *  100 % local : on rend notre propre Nav + sections + Footer DANS le
 *  wrapper `.pal-mix` (qui surcharge les tokens), et on masque la nav /
 *  le footer GLOBAUX du layout racine pour cette page uniquement.
 *  Aucun composant ni la charte du site live ne sont modifiés.
 * ------------------------------------------------------------------ */

export default function PaletteClone({
  accent,
  accentSoft,
  name,
}: {
  accent: string;       // couleur d'accent (mélangée à #080151)
  accentSoft?: string;  // mi-teinte optionnelle
  name: string;         // libellé affiché dans le badge
}) {
  const soft = accentSoft ?? accent;
  const css = `
    /* Masque la nav + le footer GLOBAUX (layout racine) sur cette page */
    body > nav.nav{display:none!important}
    body > footer.footer{display:none!important}

    /* Palette de test (locale au clone) — #080151 dominant × ${accent} */
    .pal-mix{
      --royal:#080151;        /* accents solides -> indigo Clipeo (dominant) */
      --royal-soft:${soft};
      --sky:${accent};        /* highlight / fin claire des dégradés -> accent */
      --sky-bright:#080151;   /* fin sombre des dégradés -> indigo */
      --ink:#0a1240;
    }
    /* Tous les boutons CTA -> rendu STRICTEMENT identique au bouton de la nav.
       Même dégradé, même bordure, même ombre/lueur (calée sur l'accent). */
    .pal-mix .nav-cta,
    .pal-mix .btn-primary,
    .pal-mix .clh-btn-primary{
      /* dégradé doux auto-contenu -> rendu identique quelle que soit la
         taille du bouton ou le composant (azur -> azur assombri) */
      background:linear-gradient(180deg,var(--sky) 0%,color-mix(in srgb, var(--sky) 74%, #080151) 100%);
      color:#fff;
      border:1px solid color-mix(in srgb, var(--sky) 40%, transparent);
      box-shadow:inset 0 1px 0 rgba(255,255,255,.4),
                 0 12px 30px -10px color-mix(in srgb, var(--sky) 52%, transparent);
    }
    .pal-mix .nav-cta:hover,
    .pal-mix .btn-primary:hover,
    .pal-mix .clh-btn-primary:hover{
      box-shadow:inset 0 1px 0 rgba(255,255,255,.46),
                 0 18px 42px -10px color-mix(in srgb, var(--sky) 64%, transparent);
    }
    /* Le bouton du panneau final (cta2-btn) reste BLANC -> non touché. */
    /* Cercle de flèche du bouton ClaimHero (sur fond coloré) */
    .pal-mix .clh-btn-arrow{background:rgba(255,255,255,.2)}
    .pal-mix .clh-btn-arrow svg{stroke:#fff}
    /* Hero V6 : titre d'intro (couleurs en dur) */
    .pal-mix .ch-tag2{
      background:linear-gradient(96deg,#080151,${accent});
      -webkit-background-clip:text;background-clip:text;color:transparent;
    }

    /* Badge d'aperçu */
    .pal-badge{
      position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:400;
      display:flex;align-items:center;gap:10px;padding:10px 18px;border-radius:50px;
      background:rgba(255,255,255,.9);backdrop-filter:blur(14px) saturate(150%);
      -webkit-backdrop-filter:blur(14px) saturate(150%);
      border:1px solid rgba(10,22,40,.1);box-shadow:0 12px 34px rgba(10,22,40,.16);
      font-family:var(--font-m);font-size:.72rem;letter-spacing:.04em;color:#0a1240;
    }
    .pal-badge i{width:14px;height:14px;border-radius:50%;display:inline-block;box-shadow:inset 0 0 0 1px rgba(10,22,40,.12)}
    .pal-badge b{font-weight:500}
    .pal-badge .x{opacity:.4}
    .pal-badge .nm{opacity:.55;text-transform:uppercase;letter-spacing:.1em;font-size:.62rem}
  `;
  return (
    <div className="pal-mix">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Nav />
      <HomeSections />
      <Footer />
      <div className="pal-badge" aria-hidden="true">
        <i style={{ background: "#080151" }} />
        <b>#080151</b>
        <span className="x">×</span>
        <i style={{ background: accent }} />
        <b>{accent}</b>
        <span className="nm">{name}</span>
      </div>
    </div>
  );
}
