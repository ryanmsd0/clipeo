import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cta">
          <Link href="/" className="brand">
            <img src="/img/logo.png" alt="Clipeo" width={30} height={30} />
            <span>clipeo</span>
          </Link>
          <div>
            <Link href="/contact" className="btn btn-primary">
              <span>Réserver un audit</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="footer-cols">
          <div className="fcol">
            <h5>Services</h5>
            <Link href="/pour-qui">Agence de clipping</Link>
            <Link href="/pour-qui">Campagnes de clipping</Link>
            <Link href="/pour-qui">Montage format court</Link>
            <Link href="/contact">Tarification CPM</Link>
            <Link href="/etudes-de-cas">Études de cas</Link>
          </div>
          <div className="fcol">
            <h5>Pour qui</h5>
            <Link href="/pour-qui">Créateurs YouTube</Link>
            <Link href="/pour-qui">Marques & grands comptes</Link>
            <Link href="/pour-qui">Podcasts</Link>
            <Link href="/pour-qui">Cinéma & sorties</Link>
          </div>
          <div className="fcol">
            <h5>Société</h5>
            <Link href="/">Accueil</Link>
            <Link href="/a-propos">À propos</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/blog">Blog</Link>
          </div>
          <div className="fcol">
            <h5>Support</h5>
            <Link href="/confidentialite">Confidentialité</Link>
            <Link href="/cgv">CGV</Link>
            <Link href="/#faq">FAQ</Link>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div className="fcol">
            <h5>Suivre</h5>
            <div className="socials">
              <a href="#" style={{ background: "#FF0000" }} aria-label="YouTube">
                <svg viewBox="0 0 24 24"><path d="M23 7s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C17.3 3.5 12 3.5 12 3.5h0s-5.3 0-8.1.2c-.4.1-1.3.1-2.1 1C1.2 5.4 1 7 1 7S.8 8.9.8 10.8v1.8C.8 14.5 1 16.4 1 16.4s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.8.2 7.8.2s5.3 0 8.1-.2c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.2-1.9.2-3.8v-1.8C23.2 8.9 23 7 23 7zM9.7 14.6V8.8l5.4 2.9-5.4 2.9z" /></svg>
              </a>
              <a href="#" style={{ background: "linear-gradient(135deg,#feda75,#d62976,#962fbf)" }} aria-label="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.4 1.1.4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.1.4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.5-.4-1.1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1018.6 12 6.6 6.6 0 0012 5.4zm0 10.9A4.3 4.3 0 1116.3 12 4.3 4.3 0 0112 16.3zm6.8-11.1a1.5 1.5 0 11-1.5-1.5 1.5 1.5 0 011.5 1.5z" /></svg>
              </a>
              <a href="#" style={{ background: "#0A66C2" }} aria-label="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.3a1.8 1.8 0 111.8-1.8 1.8 1.8 0 01-1.8 1.8zM19 19h-3v-4.7c0-1.1 0-2.5-1.6-2.5s-1.8 1.2-1.8 2.4V19h-3v-9h2.9v1.2h.1a3.2 3.2 0 012.9-1.6c3 0 3.6 2 3.6 4.6z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-wm">CLIPEO</div>
        <div className="footer-bot">
          <span>&copy; 2026 Clipeo, Tous droits réservés.</span>
          <span style={{ fontFamily: "var(--font-m)", letterSpacing: "2px" }}>{SITE.email}</span>
        </div>
      </div>
    </footer>
  );
}
