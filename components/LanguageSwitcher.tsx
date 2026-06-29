"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

const LOCALES = ["fr", "en"] as const;

/* Toggle segmenté FR / EN. usePathname (i18n/navigation) renvoie le chemin SANS
   préfixe de locale ; router.replace avec { locale } gère le préfixe. */
export default function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (loc: string) => {
    if (loc === locale) return;
    startTransition(() => router.replace(pathname, { locale: loc }));
  };

  return (
    <div
      className={`lang-switch${className ? ` ${className}` : ""}`}
      role="group"
      aria-label={locale === "fr" ? "Choix de la langue" : "Language"}
    >
      {LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          className={loc === locale ? "on" : ""}
          aria-pressed={loc === locale}
          onClick={() => switchTo(loc)}
          disabled={isPending}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
