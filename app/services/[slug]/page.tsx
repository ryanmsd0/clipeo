import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceType from "@/components/ServiceType";
import { SERVICE_TYPES, getService } from "@/lib/services";
import { SITE } from "@/lib/site";

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
  const ld = [
    {
      "@context": "https://schema.org", "@type": "Service",
      name: data.label, serviceType: "Clipping & distribution short-form",
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
      areaServed: "FR", description: data.metaDesc, url: `${SITE.url}/services/${data.slug}`,
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
        { "@type": "ListItem", position: 3, name: data.label, item: `${SITE.url}/services/${data.slug}` },
      ],
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ServiceType data={data} />
    </>
  );
}
