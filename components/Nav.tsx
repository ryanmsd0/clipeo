"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <div className="nav-pill">
          <Link href="/" className="brand" onClick={() => setOpen(false)}>
            <img src="/img/logo.png" alt="Clipeo" width={30} height={30} />
            <span>clipeo</span>
          </Link>
          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
          <Link href="/contact" className="nav-cta">
            Réserver un audit
            <svg viewBox="0 0 24 24">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </Link>
          <button
            className="nav-toggle"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        <Link href="/" onClick={() => setOpen(false)}>
          Accueil
        </Link>
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href="/contact" className="btn btn-primary" onClick={() => setOpen(false)}>
          <span>Réserver un audit</span>
        </Link>
      </div>
    </>
  );
}
