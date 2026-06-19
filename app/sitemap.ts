import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { CASES } from "@/lib/cases";
import { SERVICE_TYPES } from "@/lib/services";
import { CAMPAIGN_TYPES } from "@/lib/campaigns";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const lastModified = "2026-06-19";
  const monthly = "monthly" as const;

  const staticRoutes = [
    { path: "", priority: 1.0 },
    { path: "/services", priority: 0.9 },
    { path: "/pour-qui", priority: 0.8 },
    { path: "/tarifs", priority: 0.8 },
    { path: "/etudes-de-cas", priority: 0.8 },
    { path: "/a-propos", priority: 0.7 },
    { path: "/blog", priority: 0.7 },
    { path: "/contact", priority: 0.9 },
    { path: "/confidentialite", priority: 0.3 },
    { path: "/cgv", priority: 0.3 },
  ].map((r) => ({ url: `${base}${r.path}`, lastModified, priority: r.priority, changeFrequency: monthly }));

  const serviceRoutes = SERVICE_TYPES.map((s) => ({
    url: `${base}/services/${s.slug}`, lastModified, priority: 0.7, changeFrequency: monthly,
  }));

  const campaignRoutes = CAMPAIGN_TYPES.map((c) => ({
    url: `${base}/campagnes/${c.slug}`, lastModified, priority: 0.7, changeFrequency: monthly,
  }));

  const caseRoutes = CASES.map((c) => ({
    url: `${base}/etudes-de-cas/${c.slug}`, lastModified, priority: 0.6, changeFrequency: monthly,
  }));

  const postRoutes = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`, lastModified: p.date, priority: 0.6, changeFrequency: monthly,
  }));

  return [...staticRoutes, ...serviceRoutes, ...campaignRoutes, ...caseRoutes, ...postRoutes];
}
