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
  /* ── HERO BENTO ── */
  .cd-hero-sec{position:relative;overflow:hidden}
  .cd-orb{position:absolute;width:680px;height:680px;border-radius:50%;filter:blur(100px);opacity:.5;pointer-events:none;z-index:0;
    top:-300px;right:-180px;background:radial-gradient(circle,rgba(85,164,209,.28),transparent 70%)}
  .cd-back{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-m);font-size:.66rem;letter-spacing:1.5px;text-transform:uppercase;
    color:var(--w40);margin-bottom:24px;transition:color .25s;position:relative;z-index:1}
  .cd-back:hover{color:var(--sky-bright)} .cd-back svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2}
  .cd-bento{position:relative;z-index:1;display:grid;grid-template-columns:1.1fr .9fr;grid-template-rows:auto auto;gap:16px}
  .cd-tile{border:1px solid var(--w14);border-radius:26px;background:linear-gradient(180deg,var(--glass-2),var(--glass));box-shadow:0 30px 64px -46px rgba(10,40,120,.4)}
  .cd-cover-tile{grid-column:1;grid-row:1 / 3;position:relative;overflow:hidden;min-height:520px;
    border:1px solid rgba(255,255,255,.5);background:linear-gradient(180deg,#0b2a8c,var(--ink));box-shadow:0 50px 100px -48px rgba(10,40,120,.55)}
  .cd-cover-tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top}
  .cd-intro-tile{grid-column:2;grid-row:1;padding:clamp(30px,3vw,44px);display:flex;flex-direction:column;justify-content:center}
  .cd-eyebrow{display:inline-flex;align-items:center;gap:9px;padding:8px 15px;border-radius:50px;background:var(--glass);border:1px solid var(--w14);
    font-family:var(--font-m);font-size:.58rem;letter-spacing:1.7px;text-transform:uppercase;color:var(--sky);margin-bottom:20px;align-self:flex-start}
  .cd-eyebrow .dot{width:6px;height:6px;border-radius:50%;background:var(--sky)}
  .cd-intro-tile h1{font-family:var(--font-d);font-weight:800;font-size:clamp(2.1rem,3.4vw,3rem);line-height:1.02;letter-spacing:-.03em;color:var(--ink);margin-bottom:16px}
  .cd-intro-tile .pitch{font-size:1.02rem;color:var(--w55);line-height:1.6;margin-bottom:24px}
  .cd-cta{display:flex;gap:11px;flex-wrap:wrap}
  .cd-result-tile{grid-column:2;grid-row:2;padding:clamp(30px,3vw,44px);display:flex;flex-direction:column;justify-content:center;
    background:linear-gradient(180deg,#fff,#eef4fe)}
  .cd-result-tile .num{font-family:var(--font-d);font-weight:800;font-size:clamp(3.6rem,6.4vw,5.4rem);line-height:.86;letter-spacing:-.035em;
    background:linear-gradient(96deg,var(--sky-bright),var(--sky));-webkit-background-clip:text;background-clip:text;color:transparent}
  .cd-result-tile .cap{font-family:var(--font-m);font-size:.64rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--w40);margin-top:12px}
  .cd-result-tile .obj{margin-top:18px;padding-top:18px;border-top:1px solid var(--w08);font-size:.92rem;color:var(--w70);line-height:1.5}
  .cd-result-tile .obj b{color:var(--ink)} .cd-result-tile .obj .up{color:var(--sky-bright);font-weight:700}
  .cd-mini{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px;padding-top:20px;border-top:1px solid var(--w08)}
  .cd-mini > div{text-align:left}
  .cd-mini .v{font-family:var(--font-d);font-weight:800;font-size:1.4rem;letter-spacing:-.02em;line-height:1;color:var(--ink)}
  .cd-mini .k{font-family:var(--font-m);font-size:.52rem;letter-spacing:1px;text-transform:uppercase;color:var(--w40);margin-top:7px;line-height:1.35}

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

  @media(max-width:900px){
    .cd-bento{grid-template-columns:1fr;grid-template-rows:none}
    /* reset des placements desktop → les tuiles suivent l'ordre du DOM (cover, intro, résultat) */
    .cd-cover-tile,.cd-intro-tile,.cd-result-tile{grid-column:1;grid-row:auto}
    .cd-cover-tile{min-height:0;aspect-ratio:16/11}
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

      {/* HERO BENTO */}
      <section className="page-hero cd-hero-sec" style={{ paddingBottom: 44 }}>
        <span className="cd-orb" aria-hidden="true" />
        <div className="container">
          <Link href="/etudes-de-cas" className="cd-back"><svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>{t.backCases}</Link>
          <div className="cd-bento">
            <div className="cd-cover-tile cd-tile reveal"><Image src={c.img} alt={t.coverAlt(c.client)} fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "center top" }} priority /></div>

            <div className="cd-intro-tile cd-tile reveal">
              <span className="cd-eyebrow"><span className="dot" />{c.category} · {t.eyebrow}</span>
              <h1>{c.client}</h1>
              <p className="pitch">{c.excerpt}</p>
              <div className="cd-cta">
                <Link href="/contact" className="btn btn-primary"><span>{t.bookAudit}</span><ArrowR /></Link>
                <Link href="/etudes-de-cas" className="btn"><span>{t.allCases}</span></Link>
              </div>
            </div>

            <div className="cd-result-tile cd-tile reveal">
              <div className="num">{c.bigNum}</div>
              <div className="cap">{c.cap}</div>
              <div className="cd-mini">
                {c.metrics.map((m) => (
                  <div key={m.k}><div className="v">{m.v}</div><div className="k">{m.k}</div></div>
                ))}
              </div>
              {c.objective && (
                <div className="obj"><b>{c.objective.line}</b> <span className="up">{c.objective.up}</span></div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* HISTOIRE — défi / approche / résultats */}
      <section className="sec" style={{ paddingTop: 18 }}>
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
