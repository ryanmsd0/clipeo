import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CampaignType from "@/components/CampaignType";
import { CAMPAIGN_TYPES, getCampaignType } from "@/lib/campaigns";

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
  return <CampaignType data={data} />;
}
