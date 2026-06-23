import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

/* CTA partagé (pages intérieures) — même design que la CTA finale de la home
   (panneau bleu, layout asymétrique + carte « ce que vous recevez »).
   La copy reste personnalisable par page via les props. */

const COPY = {
  fr: {
    eyebrow: "Audit gratuit · avant tout engagement",
    title: "On audite votre contenu. Gratuitement.",
    text: "On identifie vos meilleurs angles, on vous projette un volume de vues chiffré, et vous décidez ensuite. Le risque est de notre côté, pas du vôtre.",
    cta: "Réserver mon audit gratuit",
    received: "Ce que vous recevez",
    items: [
      "Vos meilleurs angles à fort potentiel viral",
      "Une projection de vues chiffrée pour votre campagne",
      "Un plan clair, et zéro engagement",
    ],
  },
  en: {
    eyebrow: "Free audit · before you commit",
    title: "We audit your content. For free.",
    text: "We spot your best angles, project a hard view count for your campaign, and you decide from there. The risk sits on our side, not yours.",
    cta: "Book my free audit",
    received: "What you get",
    items: [
      "Your highest-potential angles for going viral",
      "A projected view count for your campaign",
      "A clear plan, and zero commitment",
    ],
  },
} as const;

export default async function CtaPanel({
  eyebrow,
  title,
  text,
  cta,
  items,
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  cta?: string;
  items?: string[];
}) {
  const locale = (await getLocale()) as keyof typeof COPY;
  const t = COPY[locale] ?? COPY.fr;
  const e = eyebrow ?? t.eyebrow;
  const ti = title ?? t.title;
  const tx = text ?? t.text;
  const c = cta ?? t.cta;
  const list = items ?? t.items;

  return (
    <section className="cta-sec">
      <div className="container">
        <div className="cta2 reveal">
          {/* eslint-disable-next-line @next/next/no-img-element -- filigrane décoratif */}
          <img className="cta2-wm" src="/img/logo-mark-white.png" alt="" aria-hidden="true" />
          <div className="cta2-copy">
            <span className="cta2-eye">{e}</span>
            <h2>{ti}</h2>
            <p className="cta2-sub">{tx}</p>
            <Link href="/contact" className="cta2-btn">
              {c}
              <span className="a" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </Link>
          </div>
          <div className="cta2-card">
            <span className="t">{t.received}</span>
            <ul>
              {list.map((item) => (
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
