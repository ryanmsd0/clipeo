import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import CtaPanel from "@/components/CtaPanel";
import ScrollParallax from "@/components/ScrollParallax";
import { Check, ArrowR } from "@/components/Icons";
import { PlatformTile } from "@/components/BrandLogo";
import { getCampaignTypes, type CampaignType as CT, type Locale } from "@/lib/campaigns";
import { getCase } from "@/lib/cases";
import { UNIVERS_EXAMPLES, coverPath, coverLabel } from "@/lib/univers";

const COPY = {
  fr: {
    bookAudit: "Réserver un audit gratuit",
    seeCases: "Voir les études de cas",
    mechLabel: "Le mécanisme",
    clientsLabel: "Ils nous font confiance",
    statTotalLabel: "Vues générées, tous clients réunis",
    flowLabel: "Le déroulé",
    flowTitle: <>De l&apos;audit à la <span className="grad">croissance.</span></>,
    faqTitle: "Questions fréquentes.",
    othersLabel: "Autres univers",
    othersTitle: "On adresse aussi…",
    seeCase: <>Voir l&apos;étude de cas complète<ArrowR /></>,
    ctaTitle: (label: string) => `Une campagne ${label.toLowerCase()} ?`,
    ctaText: "20 minutes pour auditer votre contenu et vous projeter un objectif de vues chiffré. Sans engagement.",
  },
  en: {
    bookAudit: "Book a free audit",
    seeCases: "See the case studies",
    mechLabel: "The mechanism",
    clientsLabel: "They trust us",
    statTotalLabel: "Views generated, all clients combined",
    flowLabel: "The process",
    flowTitle: <>From audit to <span className="grad">growth.</span></>,
    faqTitle: "Frequent questions.",
    othersLabel: "Other use cases",
    othersTitle: "We also handle…",
    seeCase: <>See the full case study<ArrowR /></>,
    ctaTitle: (label: string) => `A ${label.toLowerCase()} campaign?`,
    ctaText: "20 minutes to audit your content and project a forecasted view target. No commitment.",
  },
} as const;

const STYLES = `
  .ct-hero{position:relative;overflow:hidden;padding:160px 0 56px;isolation:isolate}
  .ct-orb{position:absolute;border-radius:50%;filter:blur(64px);opacity:.5;z-index:-1;pointer-events:none}
  .ct-orb.a{width:540px;height:540px;top:-180px;left:-160px;background:radial-gradient(circle,rgba(10,99,255,.26),transparent 70%)}
  .ct-orb.b{width:440px;height:440px;top:-40px;right:-140px;background:radial-gradient(circle,rgba(10,99,255,.16),transparent 70%)}
  .ct-hgrid{display:grid;grid-template-columns:1.15fr .85fr;gap:50px;align-items:center}
  .ct-eyebrow{display:inline-flex;align-items:center;gap:9px;padding:8px 16px;border-radius:50px;background:var(--glass);border:1px solid var(--w14);
    font-family:var(--font-m);font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--w55);margin-bottom:22px}
  .ct-hero h1{font-family:var(--font-d);font-weight:800;font-size:clamp(2.3rem,5vw,3.9rem);line-height:1.04;letter-spacing:-.03em;margin-bottom:18px}
  .ct-hero .sub{font-size:clamp(1.02rem,1.6vw,1.18rem);color:var(--w70);max-width:520px;margin-bottom:28px;line-height:1.6}
  .ct-cta{display:flex;gap:12px;flex-wrap:wrap}

  /* Visuel hero : carte téléphone + stat flottante + chips */
  .ct-visual{position:relative;height:460px}
  .ct-phone{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:206px;aspect-ratio:365/750;
    filter:drop-shadow(0 48px 90px rgba(10,40,120,.45))}
  .ct-phone-img{position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none;user-select:none}
  .ct-phone-screen{position:absolute;top:1.7%;bottom:1.7%;left:3.6%;right:3.6%;z-index:1;border-radius:26px;overflow:hidden;
    background:radial-gradient(150px 200px at 50% 14%,rgba(96,158,255,.55),transparent 62%),linear-gradient(168deg,#0b2a8c,var(--ink));
    display:flex;align-items:center;justify-content:center}
  .ct-phone .play{width:58px;height:58px;border-radius:50%;background:rgba(255,255,255,.2);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center}
  .ct-phone .play::after{content:"";border-left:17px solid #fff;border-top:10px solid transparent;border-bottom:10px solid transparent;margin-left:4px}
  .ct-stat{position:absolute;top:30px;right:0;background:#fff;border:1px solid var(--w08);border-radius:18px;padding:16px 20px;
    box-shadow:0 28px 60px -30px rgba(10,40,120,.5);min-width:140px}
  .ct-stat .v{font-family:var(--font-d);font-weight:800;font-size:1.7rem;letter-spacing:-.02em;
    background:linear-gradient(100deg,var(--sky-bright),var(--sky));-webkit-background-clip:text;background-clip:text;color:transparent;line-height:1}
  .ct-stat .k{font-family:var(--font-m);font-size:.56rem;letter-spacing:1px;text-transform:uppercase;color:var(--w40);margin-top:7px;max-width:130px;line-height:1.3}
  .ct-chip{position:absolute;display:flex;align-items:center;gap:8px;padding:10px 15px;border-radius:13px;background:#fff;
    border:1px solid var(--w08);box-shadow:0 22px 50px -28px rgba(10,40,120,.5);font-family:var(--font-d);font-weight:700;font-size:.78rem;color:var(--ink)}
  .ct-chip i{width:22px;height:22px;border-radius:6px;display:inline-block}
  .ct-chip.f1{bottom:60px;left:-10px}
  .ct-chip.f2{bottom:6px;right:24px}

  /* Mécanisme */
  .ct-mech{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .ct-mcard{background:linear-gradient(180deg,var(--glass-2),var(--glass));border:1px solid var(--w14);border-radius:20px;padding:30px}
  .ct-mcard .n{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:18px;
    background:rgba(10,99,255,.1);font-family:var(--font-d);font-weight:800;color:var(--sky)}
  .ct-mcard h3{font-family:var(--font-d);font-weight:800;font-size:1.18rem;letter-spacing:-.015em;color:var(--ink);margin-bottom:10px}
  .ct-mcard p{color:var(--w55);font-size:.94rem;line-height:1.6}

  /* Workflow */
  .ct-flow{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .ct-flow::before{content:"";position:absolute;top:30px;left:9%;right:9%;height:2px;background:linear-gradient(90deg,var(--w14),var(--sky),var(--w14));z-index:0}
  .ct-fstep{position:relative;z-index:1;text-align:center;padding:0 6px}
  .ct-fstep .dot{width:60px;height:60px;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;
    background:#fff;border:2px solid var(--w14);font-family:var(--font-d);font-weight:800;font-size:1.15rem;color:var(--sky);box-shadow:0 14px 30px -14px rgba(10,99,255,.5)}
  .ct-fstep h4{font-family:var(--font-d);font-weight:800;font-size:1.05rem;color:var(--ink);margin-bottom:8px;letter-spacing:-.01em}
  .ct-fstep p{color:var(--w55);font-size:.88rem;line-height:1.5}

  /* Reasons */
  .ct-reasons{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .ct-reason{padding:28px;border:1px solid var(--w14);border-radius:20px;background:#fff;box-shadow:0 18px 40px -32px rgba(10,40,120,.35)}
  .ct-reason .ic{width:30px;height:30px;border-radius:9px;background:rgba(10,99,255,.1);display:flex;align-items:center;justify-content:center;margin-bottom:14px}
  .ct-reason .ic svg{width:16px;height:16px;stroke:var(--sky);fill:none;stroke-width:2.6}
  .ct-reason h3{font-family:var(--font-d);font-weight:800;font-size:1.1rem;color:var(--ink);margin-bottom:8px;letter-spacing:-.01em}
  .ct-reason p{color:var(--w55);font-size:.93rem;line-height:1.6}

  /* Preuve */
  .ct-proof{display:grid;grid-template-columns:.8fr 1.2fr;gap:30px;align-items:center;
    border-radius:28px;padding:clamp(34px,4.5vw,52px);color:#fff;
    background:radial-gradient(620px 360px at 12% -20%,rgba(96,158,255,.4),transparent 60%),linear-gradient(160deg,#0b2a8c,var(--ink))}
  .ct-proof .met{font-family:var(--font-d);font-weight:800;font-size:clamp(2.6rem,6vw,4rem);letter-spacing:-.03em;line-height:1;
    background:linear-gradient(100deg,#fff,#9bd0ff);-webkit-background-clip:text;background-clip:text;color:transparent}
  .ct-proof .metk{font-family:var(--font-m);font-size:.62rem;letter-spacing:1.5px;text-transform:uppercase;color:#9bd0ff;margin-top:12px;max-width:200px;line-height:1.4}
  .ct-proof .q{font-size:clamp(1.15rem,2vw,1.5rem);line-height:1.4;font-weight:600;letter-spacing:-.01em;margin-bottom:22px}
  .ct-proof .who{display:flex;align-items:center;gap:12px}
  .ct-proof .who i{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-d);font-weight:800;color:#0b2a8c;background:#fff;font-style:normal}
  .ct-proof .who .pp{width:44px;height:44px;border-radius:50%;object-fit:cover;object-position:center top;flex:none;background:#fff;border:1.5px solid rgba(255,255,255,.45)}
  .ct-proof .who b{display:block;font-family:var(--font-d);font-size:1rem}
  .ct-proof .who span{font-family:var(--font-m);font-size:.6rem;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.6)}
  .ct-proof-cta{display:inline-flex;align-items:center;gap:9px;margin-top:24px;padding:13px 22px;border-radius:50px;
    background:#fff;color:#0b2a8c;font-family:var(--font-d);font-weight:700;font-size:.92rem;transition:transform .3s,box-shadow .3s}
  .ct-proof-cta:hover{transform:translateY(-2px);box-shadow:0 18px 36px -16px rgba(0,0,0,.5)}
  .ct-proof-cta svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2.4}

  /* FAQ + autres univers */
  .ct-faq{max-width:820px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
  .ct-q{background:linear-gradient(180deg,var(--glass-2),var(--glass));border:1px solid var(--w14);border-radius:16px;padding:24px 26px}
  .ct-q h3{font-family:var(--font-d);font-weight:800;font-size:1.06rem;color:var(--ink);margin-bottom:8px;letter-spacing:-.01em}
  .ct-q p{color:var(--w55);font-size:.95rem;line-height:1.6}
  .ct-others{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;max-width:760px;margin:0 auto}
  .ct-other{display:flex;align-items:center;gap:16px;padding:22px 24px;border-radius:18px;background:#fff;border:1px solid var(--w08);color:var(--ink);
    box-shadow:0 18px 40px -30px rgba(10,40,120,.35);transition:transform .35s cubic-bezier(.32,.72,0,1),border-color .35s,box-shadow .35s}
  .ct-other:hover{transform:translateY(-4px);border-color:var(--sky);box-shadow:0 28px 54px -30px rgba(10,40,120,.5)}
  .ct-other .ic{flex:none;width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;
    background:linear-gradient(160deg,rgba(10,99,255,.13),rgba(10,99,255,.04));border:1px solid var(--w08);color:var(--sky)}
  .ct-other .ic svg{width:23px;height:23px}
  .ct-other .tx{display:flex;flex-direction:column;gap:3px;flex:1;min-width:0}
  .ct-other .tx b{font-family:var(--font-d);font-weight:800;font-size:1.06rem;letter-spacing:-.015em;color:var(--ink)}
  .ct-other .tx span{font-size:.84rem;color:var(--w55);line-height:1.35}
  .ct-other .arr{flex:none;width:20px;height:20px;color:var(--sky);opacity:.55;transform:translateX(-5px);transition:transform .3s cubic-bezier(.32,.72,0,1),opacity .3s}
  .ct-other:hover .arr{opacity:1;transform:translateX(0)}
  @media(max-width:600px){.ct-others{grid-template-columns:1fr}}

  @media(max-width:900px){
    .ct-hgrid{grid-template-columns:1fr;gap:30px}.ct-visual{height:440px;order:-1}
    .ct-mech,.ct-reasons{grid-template-columns:1fr}
    .ct-flow{grid-template-columns:1fr 1fr;gap:28px 16px}.ct-flow::before{display:none}
    .ct-proof{grid-template-columns:1fr;gap:24px;text-align:left}
  }
  @media(max-width:520px){.ct-flow{grid-template-columns:1fr}.ct-chip{display:none}}

  /* Clients de l'univers (covers de campagne) — bandeau défilant (≥4) ou rangée centrée */
  .uc-label{display:block;text-align:center;margin-bottom:26px}
  .uc-marquee{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}
  .uc-track{display:inline-flex;animation:ucScroll 64s linear infinite}
  .uc-marquee:hover .uc-track{animation-play-state:paused}
  @keyframes ucScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  .uc-row{display:flex;gap:18px;justify-content:center;flex-wrap:wrap}
  .uc-card{flex:none;display:block;width:300px;aspect-ratio:16/9;object-fit:cover;border-radius:16px;border:1px solid var(--w14);background:var(--navy-850);box-shadow:0 22px 46px -28px rgba(10,40,120,.42)}
  .uc-track .uc-card{margin:0 9px}
  @media(prefers-reduced-motion:reduce){.uc-track{animation:none}}
  @media(max-width:680px){.uc-card{width:230px;border-radius:13px}}
`;

/* icône + accroche courte par univers (section « On adresse aussi… ») */
const UNIV_ICON: Record<string, ReactNode> = {
  createurs: <><circle cx="12" cy="12" r="9" /><path d="m10 9 5 3-5 3V9Z" /></>,
  marques: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  podcasts: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>,
  cinema: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4" /></>,
  twitch: <><circle cx="12" cy="12" r="3" /><path d="M6 6a8 8 0 0 0 0 12M18 6a8 8 0 0 1 0 12" /></>,
  evenements: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /><circle cx="12" cy="15" r="1.6" /></>,
};
const UNIV_DESC: Record<Locale, Record<string, string>> = {
  fr: {
    createurs: "Vos vidéos longues en flux de clips.",
    marques: "Une présence permanente, sans équipe.",
    podcasts: "Chaque épisode, une machine à croissance.",
    cinema: "Créez l'intention avant la sortie.",
    twitch: "Vos lives, découpés et partout.",
    evenements: "Le jour J, partout en temps réel.",
  },
  en: {
    createurs: "Your long videos into a stream of clips.",
    marques: "A permanent presence, with no team.",
    podcasts: "Every episode, a growth engine.",
    cinema: "Build the intent before the release.",
    twitch: "Your livestreams, cut down and everywhere.",
    evenements: "On the day, everywhere in real time.",
  },
};

export default async function CampaignType({ data }: { data: CT }) {
  const locale = (await getLocale()) as Locale;
  const t = COPY[locale] ?? COPY.fr;
  const desc = UNIV_DESC[locale] ?? UNIV_DESC.fr;
  const others = getCampaignTypes(locale).filter((c) => c.slug !== data.slug).slice(0, 4);
  const hs = data.heroStat;
  const pp = getCase(data.caseSlug)?.img; // photo de profil = créateur de l'étude de cas liée
  // Clients réels de cet univers (covers de campagne). Défilant si ≥ 4, sinon rangée centrée.
  const covers = UNIVERS_EXAMPLES[data.slug]?.covers ?? [];
  const scrollCovers = covers.length >= 4;
  // Badge du hero = TOTAL des vues de l'univers (tous clients/campagnes réunis),
  // pas le chiffre de l'étude de cas. Parse "+491,6 M" → count-up animé.
  const totalViews = UNIVERS_EXAMPLES[data.slug]?.views ?? hs.v ?? "";
  const tvNum = totalViews.replace("+", "").replace("M", "").replace(/\s/g, "").replace(",", ".");
  const tvCount = parseFloat(tvNum) || 0;
  const tvDec = tvNum.includes(".") ? (tvNum.split(".")[1]?.length ?? 0) : 0;
  const tvPrefix = totalViews.trim().startsWith("+") ? "+" : "";
  const tvSuffix = totalViews.includes("M") ? " M" : "";

  return (
    <ScrollParallax>
      <main>
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />

        {/* HERO */}
        <section className="ct-hero">
          <div className="ct-orb a" data-parallax="0.3" />
          <div className="ct-orb b" data-parallax="0.18" />
          <div className="container">
            <div className="ct-hgrid">
              <div>
                <span className="ct-eyebrow">{data.eyebrow}</span>
                <h1>{data.h1}<br /><span className="grad">{data.h1grad}</span></h1>
                <p className="sub">{data.sub}</p>
                <div className="ct-cta">
                  <Link href="/contact" className="btn btn-primary"><span>{t.bookAudit}</span><ArrowR /></Link>
                  <Link href="/etudes-de-cas" className="btn"><span>{t.seeCases}</span></Link>
                </div>
              </div>
              <div className="ct-visual" aria-hidden="true">
                {/* Téléphone + badges STATIQUES (pas de parallax) → ne bougent pas au scroll */}
                <div className="ct-phone">
                  <div className="ct-phone-screen"><div className="play" /></div>
                  <img className="ct-phone-img" src="/img/apple-iphone-15-pro-max-2023-medium_copy.png" alt="" />
                </div>
                <div className="ct-stat">
                  <div className="v" data-count={String(tvCount)} data-dec={String(tvDec)} data-prefix={tvPrefix} data-suffix={tvSuffix}>
                    {tvPrefix}0{tvSuffix}
                  </div>
                  <div className="k">{t.statTotalLabel}</div>
                </div>
                {data.floats.slice(0, 2).map((f, i) => (
                  <div className={`ct-chip f${i + 1}`} key={f.label}>
                    <PlatformTile p={f.label} size={22} />{f.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CLIENTS DE L'UNIVERS — covers réelles. Défilant si ≥4, sinon rangée centrée. */}
        {covers.length > 0 && (
          <section className="sec uc-sec" style={{ paddingTop: 8 }}>
            <div className="container">
              <span className="mono-label uc-label">{t.clientsLabel}</span>
            </div>
            {scrollCovers ? (
              <div className="uc-marquee" aria-hidden="true">
                <div className="uc-track">
                  {[...covers, ...covers].map((c, i) => (
                    // eslint-disable-next-line @next/next/no-img-element -- cover décorative, chemin avec espaces
                    <img className="uc-card" key={i} src={coverPath(c)} alt="" loading="lazy" width={320} height={180} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="container">
                <div className="uc-row">
                  {covers.map((c) => (
                    // eslint-disable-next-line @next/next/no-img-element -- cover, chemin avec espaces
                    <img className="uc-card" key={c} src={coverPath(c)} alt={coverLabel(c)} loading="lazy" width={320} height={180} />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* MÉCANISME */}
        <section className="sec" style={{ paddingTop: 20 }}>
          <div className="container">
            <div className="sec-head reveal">
              <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>{t.mechLabel}</span>
              <h2>{data.mechTitle}</h2>
              <p>{data.mechSub}</p>
            </div>
            <div className="ct-mech stagger">
              {data.mech.map((m, i) => (
                <div className="ct-mcard" key={m.t}>
                  <div className="n">{i + 1}</div>
                  <h3>{m.t}</h3>
                  <p>{m.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORKFLOW */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head reveal">
              <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>{t.flowLabel}</span>
              <h2>{t.flowTitle}</h2>
            </div>
            <div className="ct-flow reveal">
              {data.workflow.map((w, i) => (
                <div className="ct-fstep" key={w.t}>
                  <div className="dot">{i + 1}</div>
                  <h4>{w.t}</h4>
                  <p>{w.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REASONS */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head reveal">
              <h2>{data.reasonsTitle}</h2>
            </div>
            <div className="ct-reasons stagger">
              {data.reasons.map((r) => (
                <div className="ct-reason" key={r.t}>
                  <div className="ic"><Check /></div>
                  <h3>{r.t}</h3>
                  <p>{r.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PREUVE */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="ct-proof reveal">
              <div>
                <div className="met">{data.proof.metric}</div>
                <div className="metk">{data.proof.metricK}</div>
              </div>
              <div>
                <p className="q">« {data.proof.quote} »</p>
                <div className="who">
                  {pp ? (
                    // eslint-disable-next-line @next/next/no-img-element -- avatar photo créateur
                    <img className="pp" src={pp} alt={data.proof.name} width={44} height={44} />
                  ) : (
                    <i>{data.proof.ini}</i>
                  )}
                  <span><b>{data.proof.name}</b><span>{data.proof.cat}</span></span>
                </div>
                <Link href={`/etudes-de-cas/${data.caseSlug}`} className="ct-proof-cta">
                  {t.seeCase}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head reveal">
              <h2>{t.faqTitle}</h2>
            </div>
            <div className="ct-faq stagger">
              {data.faq.map((f) => (
                <div className="ct-q" key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* AUTRES UNIVERS */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head reveal" style={{ marginBottom: 32 }}>
              <span className="mono-label" style={{ marginBottom: 18, display: "block" }}>{t.othersLabel}</span>
              <h2>{t.othersTitle}</h2>
            </div>
            <div className="ct-others stagger">
              {others.map((o) => (
                <Link href={`/campagnes/${o.slug}`} className="ct-other" key={o.slug}>
                  <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">{UNIV_ICON[o.slug]}</svg></span>
                  <span className="tx"><b>{o.label}</b><span>{desc[o.slug]}</span></span>
                  <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaPanel
          title={t.ctaTitle(data.label)}
          text={t.ctaText}
        />
      </main>
    </ScrollParallax>
  );
}
