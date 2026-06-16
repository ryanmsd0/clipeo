import Link from "next/link";

/* CTA partagé (pages intérieures) — même design que la CTA finale de la home
   (panneau bleu, layout asymétrique + carte « ce que vous recevez »).
   La copy reste personnalisable par page via les props. */

const DEFAULT_ITEMS = [
  "Vos meilleurs angles à fort potentiel viral",
  "Une projection de vues chiffrée pour votre campagne",
  "Un plan clair, et zéro engagement",
];

export default function CtaPanel({
  eyebrow = "Audit gratuit · avant tout engagement",
  title = "On audite votre contenu. Gratuitement.",
  text = "On identifie vos meilleurs angles, on vous projette un volume de vues chiffré, et vous décidez ensuite. Le risque est de notre côté, pas du vôtre.",
  cta = "Réserver mon audit gratuit",
  items = DEFAULT_ITEMS,
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  cta?: string;
  items?: string[];
}) {
  return (
    <section className="cta-sec">
      <div className="container">
        <div className="cta2 reveal">
          <div className="cta2-copy">
            <span className="cta2-eye">{eyebrow}</span>
            <h2>{title}</h2>
            <p className="cta2-sub">{text}</p>
            <Link href="/contact" className="cta2-btn">
              {cta}
              <span className="a" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </Link>
          </div>
          <div className="cta2-card">
            <span className="t">Ce que vous recevez</span>
            <ul>
              {items.map((item) => (
                <li key={item}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="rgba(134,210,255,.18)" /><path d="m7.4 12.4 3 3 6.2-6.6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
