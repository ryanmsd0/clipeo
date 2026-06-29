"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; text: string; level: number };

/* Sommaire collant : liens d'ancrage vers les sections + surlignage de la section
   active via IntersectionObserver. Scroll fluide géré en CSS (scroll-behavior). */
export default function ArticleToc({ items, label }: { items: TocItem[]; label: string }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!headings.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 },
    );
    headings.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav className="toc" aria-label={label}>
      <p className="toc-t">{label}</p>
      <ul>
        {items.map((i) => (
          <li key={i.id} className={`toc-l${i.level === 3 ? " sub" : ""}${active === i.id ? " on" : ""}`}>
            <a href={`#${i.id}`}>{i.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
