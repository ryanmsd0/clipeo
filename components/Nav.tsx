"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import * as NM from "@radix-ui/react-navigation-menu";
import { CASES } from "@/lib/cases";

/* Nav avec mega-menus animés (Radix NavigationMenu) : viewport partagé qui se
   redimensionne en douceur d'un menu à l'autre, slide + fade + indicateur.
   On garde la pill flottante et la DA. Mobile : menu plein écran (hors Radix).
   Articles passés en props depuis le layout (lib/posts lit le filesystem). */

type Card = { label: string; desc: string; href: string; icon?: keyof typeof ICONS; ini?: string; img?: string };
type Item = { label: string; href: string; cols?: number; menu?: Card[]; all?: { label: string; href: string } };
type PostLite = { slug: string; title: string; category: string };

const POURQUI: Card[] = [
  { label: "Créateurs YouTube", desc: "Vos vidéos longues en flux de clips.", href: "/campagnes/createurs", icon: "play" },
  { label: "Marques & grands comptes", desc: "Une présence permanente, sans équipe.", href: "/campagnes/marques", icon: "brand" },
  { label: "Podcasts", desc: "Chaque épisode, une machine à croissance.", href: "/campagnes/podcasts", icon: "mic" },
  { label: "Cinéma & sorties", desc: "Créez l'intention avant la sortie.", href: "/campagnes/cinema", icon: "film" },
  { label: "Émissions & Twitch", desc: "Vos lives, découpés et partout.", href: "/campagnes/twitch", icon: "live" },
  { label: "Événements", desc: "Le jour J, partout en temps réel.", href: "/campagnes/evenements", icon: "calendar" },
];

const CASE_CARDS: Card[] = CASES.slice(0, 6).map((c) => {
  const name = c.client.split(",")[0].trim();
  const ini = name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const cat = c.category.split("·")[0].trim();
  return { label: name, desc: `${c.bigNum} de vues · ${cat}`, href: `/etudes-de-cas/${c.slug}`, ini, img: c.img };
});

const ICONS = {
  layers: <><path d="M12 3 3 8l9 5 9-5-9-5Z" /><path d="m3 14 9 5 9-5" /></>,
  scissors: <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4 8.5 15.5M14.5 14.5 20 20M8.5 8.5 12 12" /></>,
  broadcast: <><circle cx="12" cy="12" r="2" /><path d="M5 8a8 8 0 0 0 0 8M19 8a8 8 0 0 1 0 8M8 11a4 4 0 0 0 0 2M16 11a4 4 0 0 1 0 2" /></>,
  tag: <><path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9Z" /><circle cx="8" cy="8" r="1.4" /></>,
  play: <><circle cx="12" cy="12" r="9" /><path d="m10 9 5 3-5 3V9Z" /></>,
  brand: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>,
  film: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4" /></>,
  live: <><circle cx="12" cy="12" r="3" /><path d="M6 6a8 8 0 0 0 0 12M18 6a8 8 0 0 1 0 12" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /><circle cx="12" cy="15" r="1.6" /></>,
  doc: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>,
  phone: <><path d="M15.5 3h-7A1.5 1.5 0 0 0 7 4.5v15A1.5 1.5 0 0 0 8.5 21h7a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 15.5 3Z" /><path d="M11 18h2" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
};

function Glyph({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">{ICONS[name]}</svg>
  );
}

function Arrow() {
  return <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

function MegaCard({ c }: { c: Card }) {
  const inner = (
    <>
      <span className={`ic${c.img ? " img" : c.ini ? " ini" : ""}`}>{c.img ? <img src={c.img} alt="" /> : c.ini ? c.ini : c.icon ? <Glyph name={c.icon} /> : null}</span>
      <span className="tx"><b>{c.label}</b><span>{c.desc}</span></span>
      <Arrow />
    </>
  );
  return (
    <NM.Link asChild>
      {c.href.startsWith("mailto:") ? <a href={c.href} className="nav-card">{inner}</a> : <Link href={c.href} className="nav-card">{inner}</Link>}
    </NM.Link>
  );
}

export default function Nav({ posts = [] }: { posts?: PostLite[] }) {
  const [open, setOpen] = useState(false);
  // alignement du dropdown : coin gauche sous l'item survolé
  const [vpLeft, setVpLeft] = useState(0);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  const BLOG: Card[] = posts.slice(0, 4).map((p) => ({ label: p.title, desc: p.category, href: `/blog/${p.slug}`, icon: "doc" }));

  const ITEMS: Item[] = [
    { label: "Services", href: "/services" },
    { label: "Pour qui", href: "/pour-qui", cols: 3, menu: POURQUI, all: { label: "Tous les univers", href: "/pour-qui" } },
    { label: "Études de cas", href: "/etudes-de-cas", cols: 3, menu: CASE_CARDS, all: { label: "Toutes les études de cas", href: "/etudes-de-cas" } },
    ...(BLOG.length ? [{ label: "Blog", href: "/blog", cols: 2, menu: BLOG, all: { label: "Tout le blog", href: "/blog" } } as Item] : [{ label: "Blog", href: "/blog" } as Item]),
    { label: "À propos", href: "/a-propos" },
  ];

  return (
    <>
      <nav className="nav">
        <div className="nav-pill">
          <Link href="/" className="brand" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element -- logo détouré noir */}
            <img src="/img/logo-mark-black.png" alt="Clipeo" width={30} height={31} />
            <span>clipeo</span>
          </Link>

          <NM.Root
            className="nav-links nm-root"
            delayDuration={120}
            skipDelayDuration={300}
            onValueChange={(v) => {
              const el = triggers.current[v];
              if (el) setVpLeft(el.offsetLeft);
            }}
          >
            <NM.List className="nm-list">
              {ITEMS.map((it) =>
                it.menu ? (
                  <NM.Item key={it.href} value={it.href}>
                    <NM.Trigger className="nm-trigger" ref={(el) => { triggers.current[it.href] = el; }}>
                      {it.label}
                      <svg className="nm-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </NM.Trigger>
                    <NM.Content className="nm-content">
                      <div className="nm-grid" style={{ gridTemplateColumns: `repeat(${it.cols}, 236px)` }}>
                        {it.menu.map((c) => <MegaCard c={c} key={c.label + c.href} />)}
                        {it.all && (
                          <NM.Link asChild>
                            <Link href={it.all.href} className="nav-mega-all" style={{ gridColumn: "1 / -1" }}>
                              {it.all.label}
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                            </Link>
                          </NM.Link>
                        )}
                      </div>
                    </NM.Content>
                  </NM.Item>
                ) : (
                  <NM.Item key={it.href}>
                    <NM.Link asChild>
                      <Link href={it.href} className="nm-link">{it.label}</Link>
                    </NM.Link>
                  </NM.Item>
                ),
              )}
              <NM.Indicator className="nm-indicator"><div className="nm-arrow" /></NM.Indicator>
            </NM.List>

            <div className="nm-viewport-pos" style={{ transform: `translateX(${vpLeft}px)` }}>
              <NM.Viewport className="nm-viewport" />
            </div>
          </NM.Root>

          <Link href="/contact" className="nav-cta">
            Réserver un audit
            <svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H8M17 7v9" /></svg>
          </Link>
          <button className="nav-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        <Link href="/" onClick={() => setOpen(false)}>Accueil</Link>
        {ITEMS.map((it) => (
          <div key={it.href} className="mm-group">
            <Link href={it.href} onClick={() => setOpen(false)}>{it.label}</Link>
            {it.menu && (
              <div className="mm-sub">
                {it.menu.map((c) =>
                  c.href.startsWith("mailto:") ? (
                    <a key={c.label + c.href} href={c.href} onClick={() => setOpen(false)}>{c.label}</a>
                  ) : (
                    <Link key={c.label + c.href} href={c.href} onClick={() => setOpen(false)}>{c.label}</Link>
                  ),
                )}
              </div>
            )}
          </div>
        ))}
        <Link href="/contact" className="btn btn-primary" onClick={() => setOpen(false)}>
          <span>Réserver un audit</span>
        </Link>
      </div>
    </>
  );
}
