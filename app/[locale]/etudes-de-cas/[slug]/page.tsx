import type { Metadata } from "next";
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
  .cd-back{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-m);font-size:.66rem;letter-spacing:1.5px;text-transform:uppercase;
    color:var(--w40);margin-bottom:30px;transition:color .25s}
  .cd-back:hover{color:var(--sky-bright)} .cd-back svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2}
  .cd-head{max-width:780px;margin-bottom:46px}
  .cd-eyebrow{display:inline-flex;align-items:center;gap:9px;padding:8px 16px;border-radius:50px;background:var(--glass);border:1px solid var(--w14);
    font-family:var(--font-m);font-size:.6rem;letter-spacing:1.8px;text-transform:uppercase;color:var(--sky);margin-bottom:24px}
  .cd-eyebrow .dot{width:6px;height:6px;border-radius:50%;background:var(--sky)}
  .cd-head h1{font-family:var(--font-d);font-weight:800;font-size:clamp(2.7rem,6vw,4.6rem);line-height:1;letter-spacing:-.035em;color:var(--ink);margin-bottom:22px}
  .cd-head .pitch{font-size:clamp(1.06rem,1.7vw,1.24rem);color:var(--w55);line-height:1.58;max-width:660px;margin-bottom:30px}
  .cd-cta{display:flex;gap:12px;flex-wrap:wrap}

  /* Bandeau cover + barre de résultats flottante */
  .cd-banner-wrap{position:relative;margin-bottom:78px}
  .cd-banner{position:relative;border-radius:30px;overflow:hidden;aspect-ratio:16/9;
    border:1px solid var(--w14);box-shadow:0 56px 120px -54px rgba(10,40,120,.6)}
  .cd-banner img{width:100%;height:100%;object-fit:cover;object-position:center;display:block}
  .cd-banner::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(8,1,81,.28));pointer-events:none}
  .cd-statbar{position:absolute;left:50%;bottom:-52px;transform:translateX(-50%);width:min(94%,860px);z-index:2;
    display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;background:#fff;border:1px solid var(--w08);border-radius:22px;
    box-shadow:0 40px 90px -40px rgba(10,40,120,.5);overflow:hidden}
  .cd-statbar > div{padding:24px 22px;text-align:center;border-left:1px solid var(--w08)}
  .cd-statbar > div:first-child{border-left:none}
  .cd-statbar b{display:block;font-family:var(--font-d);font-weight:800;font-size:clamp(1.6rem,2.4vw,2.2rem);letter-spacing:-.02em;line-height:1;
    background:linear-gradient(96deg,var(--sky-bright),var(--sky));-webkit-background-clip:text;background-clip:text;color:transparent}
  .cd-statbar i{display:block;font-family:var(--font-m);font-size:.56rem;letter-spacing:1.3px;text-transform:uppercase;color:var(--w40);margin-top:9px;font-style:normal;line-height:1.35}

  /* ── HISTOIRE (éditorial 2 colonnes) ── */
  .cd-story{max-width:980px;margin:0 auto}
  .cd-row{display:grid;grid-template-columns:.34fr .66fr;gap:48px;padding:42px 0;border-top:1px solid var(--w08)}
  .cd-row:first-child{border-top:none}
  .cd-row-l{display:flex;flex-direction:column;gap:14px}
  .cd-row-l .step{font-family:var(--font-m);font-size:.72rem;letter-spacing:2px;color:var(--sky)}
  .cd-row-l h2{font-family:var(--font-d);font-weight:800;font-size:clamp(1.5rem,2.4vw,1.9rem);letter-spacing:-.02em;color:var(--ink);line-height:1.1}
  .cd-row-r p{color:var(--w70);font-size:1.1rem;line-height:1.72}
  .cd-row-r ul{list-style:none;display:flex;flex-direction:column;gap:15px}
  .cd-row-r li{position:relative;padding-left:30px;color:var(--w70);font-size:1.06rem;line-height:1.55}
  .cd-row-r li svg{position:absolute;left:0;top:3px;width:18px;height:18px;stroke:var(--sky);fill:none;stroke-width:2.6}

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
    .cd-banner{aspect-ratio:16/11}
    .cd-banner-wrap{margin-bottom:30px}
    .cd-statbar{position:static;transform:none;width:100%;grid-template-columns:1fr 1fr;margin-top:16px}
    .cd-statbar > div{border-left:none;border-top:1px solid var(--w08)} .cd-statbar > div:first-child,.cd-statbar > div:nth-child(2){border-top:none}
    .cd-statbar > div:nth-child(odd){border-right:1px solid var(--w08)}
    .cd-row{grid-template-columns:1fr;gap:16px;padding:32px 0}
  }
`;

function pct(value: string, max: number) {
  const n = parseFloat(value.replace(/[^\d,.]/g, "").replace(",", ".")) || 0;
  return Math.max(8, Math.round((n / max) * 100));
}

const campaignCover = (img: string) => `/img/Clipeo%20covers%20campagnes/${img.split("/").pop()}`;

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

      {/* HERO — titre + bandeau cover + barre de résultats */}
      <section className="page-hero" style={{ paddingBottom: 20 }}>
        <div className="container">
          <Link href="/etudes-de-cas" className="cd-back"><svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>{t.backCases}</Link>
          <div className="cd-head reveal">
            <span className="cd-eyebrow"><span className="dot" />{c.category} · {t.eyebrow}</span>
            <h1>{c.client}</h1>
            <p className="pitch">{c.excerpt}</p>
            <div className="cd-cta">
              <Link href="/contact" className="btn btn-primary"><span>{t.bookAudit}</span><ArrowR /></Link>
              <Link href="/etudes-de-cas" className="btn"><span>{t.allCases}</span></Link>
            </div>
          </div>
          <div className="cd-banner-wrap reveal">
            <div className="cd-banner">
              {/* eslint-disable-next-line @next/next/no-img-element -- cover de campagne (chemin avec espaces) */}
              <img src={campaignCover(c.img)} alt={t.coverAlt(c.client)} width={1600} height={900} />
            </div>
            <div className="cd-statbar">
              <div><b>{c.bigNum}</b><i>{c.cap}</i></div>
              {c.metrics.map((m) => (
                <div key={m.k}><b>{m.v}</b><i>{m.k}</i></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HISTOIRE — défi / approche / résultats (éditorial) */}
      <section className="sec" style={{ paddingTop: 8 }}>
        <div className="container">
          <div className="cd-story">
            <div className="cd-row reveal">
              <div className="cd-row-l"><span className="step">01</span><h2>{t.challengeTitle}</h2></div>
              <div className="cd-row-r"><p>{c.challenge}</p></div>
            </div>
            <div className="cd-row reveal">
              <div className="cd-row-l"><span className="step">02</span><h2>{t.approachTitle}</h2></div>
              <div className="cd-row-r"><ul>{c.approach.map((a, i) => <li key={i}><Check />{a}</li>)}</ul></div>
            </div>
            <div className="cd-row reveal">
              <div className="cd-row-l"><span className="step">03</span><h2>{t.resultsTitle}</h2></div>
              <div className="cd-row-r"><p>{c.results}</p></div>
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
