import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/site";

const COPY = {
  fr: {
    bookAudit: "Réserver un audit",
    services: "Services",
    theService: "Le service Clipeo",
    pricing: "Tarification CPM",
    cases: "Études de cas",
    whoFor: "Pour qui",
    creators: "Créateurs YouTube",
    brands: "Marques & grands comptes",
    podcasts: "Podcasts",
    film: "Cinéma & sorties",
    company: "Société",
    home: "Accueil",
    about: "À propos",
    contact: "Contact",
    blog: "Blog",
    support: "Support",
    privacy: "Confidentialité",
    terms: "CGV",
    faq: "FAQ",
    follow: "Suivre",
    rights: "© 2026 Clipeo, Tous droits réservés.",
  },
  en: {
    bookAudit: "Book an audit",
    services: "Services",
    theService: "The Clipeo service",
    pricing: "CPM pricing",
    cases: "Case studies",
    whoFor: "Who it's for",
    creators: "YouTube creators",
    brands: "Brands & enterprises",
    podcasts: "Podcasts",
    film: "Film & releases",
    company: "Company",
    home: "Home",
    about: "About",
    contact: "Contact",
    blog: "Blog",
    support: "Support",
    privacy: "Privacy",
    terms: "Terms",
    faq: "FAQ",
    follow: "Follow",
    rights: "© 2026 Clipeo. All rights reserved.",
  },
} as const;

export default async function Footer() {
  const locale = (await getLocale()) as keyof typeof COPY;
  const t = COPY[locale] ?? COPY.fr;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cta">
          <Link href="/" className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element -- logo détouré noir (identique navbar) */}
            <img src="/img/logo-mark-black.png" alt="Clipeo" width={30} height={31} />
            <span>clipeo</span>
          </Link>
          <div>
            <Link href="/contact" className="btn btn-primary">
              <span>{t.bookAudit}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="footer-cols">
          <div className="fcol">
            <p className="fcol-t">{t.services}</p>
            <Link href="/services">{t.theService}</Link>
            <Link href="/tarifs">{t.pricing}</Link>
            <Link href="/etudes-de-cas">{t.cases}</Link>
            <Link href="/contact">{t.bookAudit}</Link>
          </div>
          <div className="fcol">
            <p className="fcol-t">{t.whoFor}</p>
            <Link href="/campagnes/createurs">{t.creators}</Link>
            <Link href="/campagnes/marques">{t.brands}</Link>
            <Link href="/campagnes/podcasts">{t.podcasts}</Link>
            <Link href="/campagnes/cinema">{t.film}</Link>
          </div>
          <div className="fcol">
            <p className="fcol-t">{t.company}</p>
            <Link href="/">{t.home}</Link>
            <Link href="/a-propos">{t.about}</Link>
            <Link href="/contact">{t.contact}</Link>
            <Link href="/#blog">{t.blog}</Link>
          </div>
          <div className="fcol">
            <p className="fcol-t">{t.support}</p>
            <Link href="/confidentialite">{t.privacy}</Link>
            <Link href="/cgv">{t.terms}</Link>
            <Link href="/#faq">{t.faq}</Link>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div className="fcol">
            <p className="fcol-t">{t.follow}</p>
            <div className="socials">
              <a href="#" style={{ background: "#25D366" }} aria-label="WhatsApp">
                <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
              <a href="#" style={{ background: "#0A66C2" }} aria-label="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.3a1.8 1.8 0 111.8-1.8 1.8 1.8 0 01-1.8 1.8zM19 19h-3v-4.7c0-1.1 0-2.5-1.6-2.5s-1.8 1.2-1.8 2.4V19h-3v-9h2.9v1.2h.1a3.2 3.2 0 012.9-1.6c3 0 3.6 2 3.6 4.6z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-wm">CLIPEO</div>
        <div className="footer-bot">
          <span>{t.rights}</span>
          <span style={{ fontFamily: "var(--font-m)", letterSpacing: "2px" }}>{SITE.email}</span>
        </div>
      </div>
    </footer>
  );
}
