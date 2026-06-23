import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { CASES } from "@/lib/cases";
import { CAMPAIGN_TYPES } from "@/lib/campaigns";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const lastModified = "2026-06-23";
  const monthly = "monthly" as const;

  // Émet une entrée FR (racine) + une entrée EN (/en), chacune avec les
  // alternates hreflang (fr / en / x-default) pour le SEO bilingue.
  const bilingual = (
    path: string,
    priority: number,
    last: string = lastModified,
  ): MetadataRoute.Sitemap => {
    const fr = `${base}${path}`;
    const en = `${base}/en${path}`;
    const languages = { fr, en, "x-default": fr };
    return [
      { url: fr, lastModified: last, priority, changeFrequency: monthly, alternates: { languages } },
      { url: en, lastModified: last, priority, changeFrequency: monthly, alternates: { languages } },
    ];
  };

  const staticRoutes = [
    { path: "", priority: 1.0 },
    { path: "/services", priority: 0.9 },
    { path: "/tarifs", priority: 0.8 },
    { path: "/etudes-de-cas", priority: 0.8 },
    { path: "/a-propos", priority: 0.7 },
    { path: "/contact", priority: 0.9 },
    { path: "/confidentialite", priority: 0.3 },
    { path: "/cgv", priority: 0.3 },
  ].flatMap((r) => bilingual(r.path, r.priority));

  const campaignRoutes = CAMPAIGN_TYPES.flatMap((c) => bilingual(`/campagnes/${c.slug}`, 0.7));
  const caseRoutes = CASES.flatMap((c) => bilingual(`/etudes-de-cas/${c.slug}`, 0.6));
  const postRoutes = getAllPosts().flatMap((p) => bilingual(`/blog/${p.slug}`, 0.6, p.date));

  return [...staticRoutes, ...campaignRoutes, ...caseRoutes, ...postRoutes];
}
