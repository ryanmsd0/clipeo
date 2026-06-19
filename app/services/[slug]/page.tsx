import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceType from "@/components/ServiceType";
import { SERVICE_TYPES, getService } from "@/lib/services";

export function generateStaticParams() {
  return SERVICE_TYPES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getService(slug);
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDesc,
    alternates: { canonical: `/services/${data.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getService(slug);
  if (!data) notFound();
  return <ServiceType data={data} />;
}
