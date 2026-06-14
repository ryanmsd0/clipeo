"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollFX() {
  const pathname = usePathname();

  useEffect(() => {
    // reveal + stagger
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("vis");
          if (el.classList.contains("stagger")) {
            [...el.children].forEach((c, i) => {
              (c as HTMLElement).style.transitionDelay = i * 0.08 + "s";
            });
          }
          io.unobserve(el);
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal,.stagger").forEach((el) => io.observe(el));

    // count up
    const fmt = (n: number, dec: number) => {
      const s = dec > 0 ? n.toFixed(dec) : Math.round(n).toString();
      return s.replace(".", ",");
    };
    const cio = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          if (el.dataset.counted) return;
          el.dataset.counted = "1";
          const target = parseFloat(el.dataset.count || "0");
          const dec = parseInt(el.dataset.dec || "0", 10);
          const pre = el.dataset.prefix || "";
          const suf = el.dataset.suffix || "";
          const dur = 1400;
          let start: number | null = null;
          const tick = (t: number) => {
            if (!start) start = t;
            const p = Math.min((t - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = pre + fmt(target * eased, dec) + suf;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = pre + fmt(target, dec) + suf;
          };
          requestAnimationFrame(tick);
          cio.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));

    return () => {
      io.disconnect();
      cio.disconnect();
    };
  }, [pathname]);

  return null;
}
