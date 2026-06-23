import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CampaignType from "@/components/CampaignType";
import { CAMPAIGN_TYPES, getCampaignType, type Locale } from "@/lib/campaigns";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return CAMPAIGN_TYPES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = getCampaignType(slug, locale);
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDesc,
    alternates: { canonical: `/campagnes/${data.slug}` },
  };
}

export default async function CampagnePage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const data = getCampaignType(slug, locale);
  if (!data) notFound();
  const serviceName = locale === "en" ? `Clipping campaign — ${data.label}` : `Campagne de clipping — ${data.label}`;
  const homeName = locale === "en" ? "Home" : "Accueil";
  const ld = [
    {
      "@context": "https://schema.org", "@type": "Service",
      name: serviceName, serviceType: "Clipping & distribution short-form",
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
      areaServed: "FR", description: data.metaDesc, url: `${SITE.url}/campagnes/${data.slug}`,
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: homeName, item: SITE.url },
        { "@type": "ListItem", position: 2, name: data.label, item: `${SITE.url}/campagnes/${data.slug}` },
      ],
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <CampaignType data={data} />
    </>
  );
}
