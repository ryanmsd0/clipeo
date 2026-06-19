import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CampaignType from "@/components/CampaignType";
import { CAMPAIGN_TYPES, getCampaignType } from "@/lib/campaigns";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return CAMPAIGN_TYPES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getCampaignType(slug);
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDesc,
    alternates: { canonical: `/campagnes/${data.slug}` },
  };
}

export default async function CampagnePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getCampaignType(slug);
  if (!data) notFound();
  const ld = [
    {
      "@context": "https://schema.org", "@type": "Service",
      name: `Campagne de clipping — ${data.label}`, serviceType: "Clipping & distribution short-form",
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
      areaServed: "FR", description: data.metaDesc, url: `${SITE.url}/campagnes/${data.slug}`,
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Pour qui", item: `${SITE.url}/pour-qui` },
        { "@type": "ListItem", position: 3, name: data.label, item: `${SITE.url}/campagnes/${data.slug}` },
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
