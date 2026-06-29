import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import CtaPanel from "@/components/CtaPanel";
import { Check, ArrowR } from "@/components/Icons";
import { PlatformTile } from "@/components/BrandLogo";
import { CASES, getCase, type Locale } from "@/lib/cases";
import { SITE } from "@/lib/site";

const COPY = {
  fr: {
    metaTitle: (client: string, bigNum: string) => `${client}, ${bigNum} de vues`,
    ogTitle: (client: string) => `${client}, étude de cas Clipeo`,
    articleHeadline: (client: string) => `${client}, étude de cas`,
    breadcrumbHome: "Accueil",
    breadcrumbCases: "Études de cas",
    eyebrow: "Étude de cas",
    backCases: "Études de cas",
    coverAlt: (client: string) => `Campagne de clipping ${client}`,
    bookAudit: "Réserver un audit gratuit",
    allCases: "Toutes les études de cas",
    statsLabel: "Le résultat en bref",
    viewsTitleA: "Où les vues",
    viewsTitleB: "ont été générées.",
    viewsLead: "Diffusion multi-comptes, calée sur les fenêtres algo de chaque réseau.",
    storyLabel: "L'histoire",
    challengeTitle: "Le défi",
    approachTitle: "Notre approche",
    resultsTitle: "Les résultats",
    ctaTitle: "Votre campagne peut faire la même chose.",
    ctaText: "On part de votre contenu, on fixe un objectif de vues chiffré, et on le garantit au contrat.",
  },
  en: {
    metaTitle: (client: string, bigNum: string) => `${client}, ${bigNum} views`,
    ogTitle: (client: string) => `${client}, a Clipeo case study`,
    articleHeadline: (client: string) => `${client}, case study`,
    breadcrumbHome: "Home",
    breadcrumbCases: "Case studies",
    eyebrow: "Case study",
    backCases: "Case studies",
    coverAlt: (client: string) => `${client} clipping campaign`,
    bookAudit: "Book a free audit",
    allCases: "See all case studies",
    statsLabel: "The result at a glance",
    viewsTitleA: "Where the views",
    viewsTitleB: "came from.",
    viewsLead: "Multi-account distribution, timed to each platform's algorithm windows.",
    storyLabel: "The story",
    challengeTitle: "The challenge",
    approachTitle: "Our approach",
    resultsTitle: "The results",
    ctaTitle: "Your campaign can do the same.",
    ctaText: "We start from your content, set a concrete view target, and write it into your contract.",
  },
} as const;

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const t = COPY[locale] ?? COPY.fr;
  const c = getCase(slug, locale);
  if (!c) return {};
  return {
    title: t.metaTitle(c.client, c.bigNum),
    description: c.excerpt,
    alternates: { canonical: `/etudes-de-cas/${c.slug}` },
    openGraph: { title: t.ogTitle(c.client), description: c.excerpt },
  };
}

const STYLES = `
  /* ── HERO ── */
  .cd-hero-sec{position:relative;overflow:hidden}
  .cd-orb{position:absolute;width:660px;height:660px;border-radius:50%;filter:blur(98px);opacity:.5;pointer-events:none;z-index:0;
    top:-280px;right:-160px;background:radial-gradient(circle,rgba(85,164,209,.3),transparent 70%)}
  .cd-orb.b{top:auto;bottom:-360px;left:-240px;right:auto;width:560px;height:560px;opacity:.38;background:radial-gradient(circle,rgba(8,1,81,.13),transparent 68%)}
  .cd-back{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-m);font-size:.66rem;letter-spacing:1.5px;text-transform:uppercase;
    color:var(--w40);margin-bottom:26px;transition:color .25s}
  .cd-back:hover{color:var(--sky-bright)} .cd-back svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2}
  .cd-hero{position:relative;z-index:1;display:grid;grid-template-columns:.86fr 1.14fr;gap:64px;align-items:center}
  .cd-cover-wrap{position:relative}
  .cd-cover{position:relative;border-radius:26px;overflow:hidden;aspect-ratio:1/1;
    background:linear-gradient(180deg,#0b2a8c,var(--ink));box-shadow:0 54px 110px -48px rgba(10,40,120,.62);border:1px solid rgba(255,255,255,.55)}
  .cd-cover img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
  .cd-float{position:absolute;right:-24px;bottom:-24px;background:#fff;border:1px solid var(--w08);border-radius:20px;padding:20px 26px;
    box-shadow:0 34px 70px -26px rgba(10,40,120,.55)}
  .cd-float .v{font-family:var(--font-d);font-weight:800;font-size:clamp(2rem,3vw,2.6rem);line-height:1;letter-spacing:-.02em;
    background:linear-gradient(96deg,var(--sky-bright),var(--sky));-webkit-background-clip:text;background-clip:text;color:transparent}
  .cd-float .k{font-family:var(--font-m);font-size:.58rem;letter-spacing:1.4px;text-transform:uppercase;color:var(--w40);margin-top:8px}
  .cd-eyebrow{display:inline-flex;align-items:center;gap:9px;padding:8px 16px;border-radius:50px;background:var(--glass);border:1px solid var(--w14);
    font-family:var(--font-m);font-size:.6rem;letter-spacing:1.8px;text-transform:uppercase;color:var(--sky);margin-bottom:22px}
  .cd-eyebrow .dot{width:6px;height:6px;border-radius:50%;background:var(--sky)}
  .cd-info h1{font-family:var(--font-d);font-weight:800;font-size:clamp(2.6rem,5vw,3.8rem);line-height:1;letter-spacing:-.03em;color:var(--ink);margin-bottom:20px}
  .cd-pitch{font-size:1.1rem;color:var(--w55);line-height:1.62;max-width:520px;margin-bottom:28px}
  .cd-obj{padding:15px 20px;border-left:3px solid var(--sky);background:var(--glass);border-radius:0 14px 14px 0;margin-bottom:30px;font-size:.95rem;color:var(--w70);line-height:1.5;max-width:480px}
  .cd-obj b{color:var(--ink)} .cd-obj .up{color:var(--sky-bright);font-weight:700}
  .cd-cta{display:flex;gap:12px;flex-wrap:wrap}

  /* ── BANDE KPI ── */
  .cd-kpi-head{text-align:center;margin-bottom:26px}
  .cd-kpi{display:grid;grid-template-columns:repeat(3,1fr);background:linear-gradient(180deg,var(--glass-2),var(--glass));
    border:1px solid var(--w14);border-radius:22px;overflow:hidden;box-shadow:0 30px 64px -46px rgba(10,40,120,.42)}
  .cd-kpi > div{padding:38px 26px;text-align:center;border-left:1px solid var(--w08)}
  .cd-kpi > div:first-child{border-left:none}
  .cd-kpi .v{font-family:var(--font-d);font-weight:800;font-size:clamp(2rem,3vw,2.7rem);letter-spacing:-.02em;line-height:1;
    background:linear-gradient(96deg,var(--sky-bright),var(--sky));-webkit-background-clip:text;background-clip:text;color:transparent}
  .cd-kpi .k{font-family:var(--font-m);font-size:.6rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--w40);margin-top:13px;line-height:1.4}

  /* ── HISTOIRE (étapes) ── */
  .cd-narr{max-width:820px;margin:0 auto;display:grid;gap:18px}
  .cd-block{position:relative;background:linear-gradient(180deg,var(--glass-2),var(--glass));border:1px solid var(--w14);border-radius:20px;padding:34px 38px 34px 98px}
  .cd-block .num{position:absolute;left:30px;top:34px;width:50px;height:50px;border-radius:15px;display:flex;align-items:center;justify-content:center;
    background:linear-gradient(155deg,#3a63b5,#080151);color:#fff;font-family:var(--font-d);font-weight:800;font-size:1.05rem;box-shadow:0 14px 28px -12px rgba(8,1,81,.6)}
  .cd-block h2{font-family:var(--font-d);font-weight:800;font-size:1.5rem;letter-spacing:-.02em;color:var(--ink);margin-bottom:13px}
  .cd-block p{color:var(--w70);font-size:1.05rem;line-height:1.7}
  .cd-block ul{list-style:none;display:flex;flex-direction:column;gap:14px}
  .cd-block li{position:relative;padding-left:28px;color:var(--w70);font-size:1.03rem;line-height:1.55}
  .cd-block li svg{position:absolute;left:0;top:3px;width:17px;height:17px;stroke:var(--sky);fill:none;stroke-width:2.6}

  /* ── RÉPARTITION DES VUES ── */
  .cd-plats{max-width:720px;margin:0 auto}
  .cd-plat{margin-bottom:22px}
  .cd-plat-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
  .cd-plat-l{display:flex;align-items:center;gap:12px}
  .cd-plat-name{font-family:var(--font-d);font-weight:600;font-size:1rem;color:var(--ink)}
  .cd-plat-v{font-family:var(--font-d);font-weight:800;font-size:1.05rem;color:var(--ink)}
  .cd-bar{height:11px;border-radius:7px;background:var(--w08);overflow:hidden}
  .cd-bar span{display:block;height:100%;border-radius:7px;box-shadow:0 4px 12px -4px rgba(10,40,120,.4)}

  @media(max-width:860px){
    .cd-hero{grid-template-columns:1fr;gap:46px}
    .cd-cover{max-width:340px}
    .cd-float{right:14px;bottom:-20px;padding:16px 20px}
    .cd-kpi{grid-template-columns:1fr}
    .cd-kpi > div{border-left:none;border-top:1px solid var(--w08)} .cd-kpi > div:first-child{border-top:none}
    .cd-block{padding:28px 26px}.cd-block .num{position:static;margin-bottom:16px}
  }
`;

function pct(value: string, max: number) {
  const n = parseFloat(value.replace(/[^\d,.]/g, "").replace(",", ".")) || 0;
  return Math.max(8, Math.round((n / max) * 100));
}

export default async function CaseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const t = COPY[locale] ?? COPY.fr;
  const c = getCase(slug, locale);
  if (!c) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: t.articleHeadline(c.client),
      description: c.excerpt,
      image: `${SITE.url}${c.img}`,
      author: { "@type": "Organization", name: SITE.name },
      publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/img/logo.png` } },
      mainEntityOfPage: `${SITE.url}/etudes-de-cas/${c.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: SITE.url },
        { "@type": "ListItem", position: 2, name: t.breadcrumbCases, item: `${SITE.url}/etudes-de-cas` },
        { "@type": "ListItem", position: 3, name: c.client, item: `${SITE.url}/etudes-de-cas/${c.slug}` },
      ],
    },
  ];

  const platMax = c.platforms
    ? Math.max(...c.platforms.map((p) => parseFloat(p.value.replace(/[^\d,.]/g, "").replace(",", ".")) || 0))
    : 1;

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* HERO — cover + badge résultat flottant */}
      <section className="page-hero cd-hero-sec" style={{ paddingBottom: 40 }}>
        <span className="cd-orb" aria-hidden="true" />
        <span className="cd-orb b" aria-hidden="true" />
        <div className="container">
          <Link href="/etudes-de-cas" className="cd-back"><svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>{t.backCases}</Link>
          <div className="cd-hero">
            <div className="cd-cover-wrap reveal">
              <div className="cd-cover"><Image src={c.img} alt={t.coverAlt(c.client)} fill sizes="(max-width:860px) 340px, 32vw" style={{ objectFit: "cover", objectPosition: "center top" }} priority /></div>
              <div className="cd-float"><div className="v">{c.bigNum}</div><div className="k">{c.cap}</div></div>
            </div>
            <div className="cd-info reveal">
              <span className="cd-eyebrow"><span className="dot" />{c.category} · {t.eyebrow}</span>
              <h1>{c.client}</h1>
              <p className="cd-pitch">{c.excerpt}</p>
              {c.objective && (
                <div className="cd-obj"><b>{c.objective.line}</b> <span className="up">{c.objective.up}</span></div>
              )}
              <div className="cd-cta">
                <Link href="/contact" className="btn btn-primary"><span>{t.bookAudit}</span><ArrowR /></Link>
                <Link href="/etudes-de-cas" className="btn"><span>{t.allCases}</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SNAPSHOT KPI */}
      <section className="sec" style={{ paddingTop: 14 }}>
        <div className="container">
          <span className="mono-label cd-kpi-head reveal" style={{ display: "block" }}>{t.statsLabel}</span>
          <div className="cd-kpi reveal">
            {c.metrics.map((m) => (
              <div key={m.k}><div className="v">{m.v}</div><div className="k">{m.k}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* HISTOIRE — défi / approche / résultats */}
      <section className="sec" style={{ paddingTop: 8 }}>
        <div className="container">
          <div className="sec-head reveal"><span className="mono-label" style={{ display: "block", marginBottom: 16 }}>{t.storyLabel}</span></div>
          <div className="cd-narr">
            <div className="cd-block reveal">
              <span className="num">01</span>
              <h2>{t.challengeTitle}</h2>
              <p>{c.challenge}</p>
            </div>
            <div className="cd-block reveal">
              <span className="num">02</span>
              <h2>{t.approachTitle}</h2>
              <ul>{c.approach.map((a, i) => <li key={i}><Check />{a}</li>)}</ul>
            </div>
            <div className="cd-block reveal">
              <span className="num">03</span>
              <h2>{t.resultsTitle}</h2>
              <p>{c.results}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PREUVE — répartition des vues */}
      {c.platforms && (
        <section className="sec" style={{ paddingTop: 8 }}>
          <div className="container">
            <div className="sec-head reveal"><h2>{t.viewsTitleA}<br />{t.viewsTitleB}</h2><p>{t.viewsLead}</p></div>
            <div className="cd-plats reveal">
              {c.platforms.map((p) => (
                <div className="cd-plat" key={p.abbr}>
                  <div className="cd-plat-head">
                    <div className="cd-plat-l">
                      <PlatformTile p={p.name} size={32} />
                      <span className="cd-plat-name">{p.name}</span>
                    </div>
                    <span className="cd-plat-v">{p.value}</span>
                  </div>
                  <div className="cd-bar"><span style={{ width: `${pct(p.value, platMax)}%`, background: p.color }} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaPanel title={t.ctaTitle} text={t.ctaText} />
    </main>
  );
}
