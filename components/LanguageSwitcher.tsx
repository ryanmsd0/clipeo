"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

/* Bascule FR ⇄ EN en conservant la page courante. usePathname (i18n/navigation)
   renvoie le chemin SANS préfixe de locale ; router.replace avec { locale } gère le préfixe. */
export default function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const other = locale === "fr" ? "en" : "fr";

  return (
    <button
      type="button"
      className={`lang-switch${className ? ` ${className}` : ""}`}
      onClick={() => startTransition(() => router.replace(pathname, { locale: other }))}
      disabled={isPending}
      aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
      <span>{other.toUpperCase()}</span>
    </button>
  );
}
