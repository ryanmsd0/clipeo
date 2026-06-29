import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import Grain from "@/components/Grain";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFX from "@/components/ScrollFX";
import { SITE, getSiteMeta } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { routing } from "@/i18n/routing";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = (locale === "en" ? "en" : "fr") as "fr" | "en";
  const { tagline, description } = getSiteMeta(loc);
  const homeUrl = loc === "en" ? `${SITE.url}/en` : SITE.url;
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${SITE.name} · ${tagline}`,
      template: `%s · ${SITE.name}`,
    },
    description,
    applicationName: SITE.name,
    openGraph: {
      type: "website",
      locale: loc === "en" ? "en_US" : "fr_FR",
      alternateLocale: loc === "en" ? "fr_FR" : "en_US",
      siteName: SITE.name,
      title: `${SITE.name} · ${tagline}`,
      description,
      url: homeUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE.name} · ${tagline}`,
      description,
    },
    alternates: {
      canonical: homeUrl,
      languages: {
        fr: SITE.url,
        en: `${SITE.url}/en`,
        "x-default": SITE.url,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#060f33",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const navPosts = getAllPosts(locale).slice(0, 4).map((p) => ({ slug: p.slug, title: p.title, category: p.category }));

  return (
    <html lang={locale} className={montserrat.variable}>
      <body className="pal-live">
        <NextIntlClientProvider>
          <Grain />
          <ScrollFX />
          <Nav posts={navPosts} />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
