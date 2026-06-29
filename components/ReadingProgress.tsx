"use client";

import { useEffect, useRef } from "react";

/* Barre de progression de lecture (haut de page). Mutation directe du transform
   (scaleX, GPU) pour éviter un re-render React à chaque scroll. */
export default function ReadingProgress() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const height = h.scrollHeight - h.clientHeight;
      const p = height > 0 ? Math.min(1, Math.max(0, h.scrollTop / height)) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="read-progress" aria-hidden="true">
      <span ref={ref} />
    </div>
  );
}
