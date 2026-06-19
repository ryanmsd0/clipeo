import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaPanel from "@/components/CtaPanel";
import { Check, ArrowR } from "@/components/Icons";
import { PlatformTile } from "@/components/BrandLogo";
import { CASES, getCase } from "@/lib/cases";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return {
    title: `${c.client}, ${c.bigNum} de vues`,
    description: c.excerpt,
    alternates: { canonical: `/etudes-de-cas/${c.slug}` },
    openGraph: { title: `${c.client}, étude de cas Clipeo`, description: c.excerpt },
  };
}

const STYLES = `
  .cd-hero{display:grid;grid-template-columns:.82fr 1.18fr;gap:46px;align-items:center;margin-top:6px}
  .cd-cover{position:relative;border-radius:24px;overflow:hidden;border:1px solid var(--w14);aspect-ratio:1/1;
    background:linear-gradient(180deg,#0b2a8c,var(--ink));box-shadow:0 44px 90px -44px rgba(10,40,120,.6)}
  .cd-cover img{width:100%;height:100%;object-fit:cover;object-position:center;display:block}
  .cd-cat{display:block;margin-bottom:14px}
  .cd-info h1{font-family:var(--font-d);font-weight:800;font-size:clamp(2.2rem,4.6vw,3.4rem);line-height:1.02;letter-spacing:-.03em;color:var(--ink);margin-bottom:16px}
  .cd-pitch{font-size:1.05rem;color:var(--w55);line-height:1.62;max-width:520px;margin-bottom:26px}
  .cd-result{display:flex;align-items:baseline;gap:15px;margin-bottom:20px}
  .cd-num{font-family:var(--font-d);font-weight:800;font-size:clamp(3rem,6vw,4.4rem);line-height:.9;letter-spacing:-.03em;
    background:linear-gradient(100deg,var(--sky-bright),var(--sky));-webkit-background-clip:text;background-clip:text;color:transparent}
  .cd-cap{font-family:var(--font-m);font-size:.7rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--w40);max-width:150px;line-height:1.5}
  .cd-obj{padding:14px 18px;border-left:3px solid var(--sky);background:var(--glass);border-radius:0 12px 12px 0;margin-bottom:26px;font-size:.95rem;color:var(--w70);line-height:1.5}
  .cd-obj b{color:var(--ink)} .cd-obj .up{color:var(--sky-bright);font-weight:700}
  .cd-cta{display:flex;gap:12px;flex-wrap:wrap}

  .cd-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .cd-metric{background:linear-gradient(180deg,var(--glass-2),var(--glass));border:1px solid var(--w14);border-radius:18px;padding:28px 24px;text-align:center}
  .cd-metric .v{font-family:var(--font-d);font-weight:800;font-size:clamp(1.8rem,3vw,2.4rem);letter-spacing:-.02em;line-height:1;
    background:linear-gradient(180deg,var(--sky-bright),var(--sky));-webkit-background-clip:text;background-clip:text;color:transparent}
  .cd-metric .k{font-family:var(--font-m);font-size:.6rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--w40);margin-top:10px;line-height:1.4}

  .cd-plats{max-width:680px;margin:0 auto}
  .cd-plat{margin-bottom:18px}
  .cd-plat-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px}
  .cd-plat-l{display:flex;align-items:center;gap:11px}
  .cd-plat-ic{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--font-d);font-weight:800;font-size:.66rem}
  .cd-plat-name{font-family:var(--font-d);font-weight:600;font-size:.96rem;color:var(--ink)}
  .cd-plat-v{font-family:var(--font-d);font-weight:800;color:var(--ink)}
  .cd-bar{height:9px;border-radius:5px;background:var(--w08);overflow:hidden}
  .cd-bar span{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,var(--sky-bright),var(--sky))}

  .cd-narr{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:38px}
  .cd-block{position:relative;padding-left:66px}
  .cd-block .num{position:absolute;left:0;top:0;width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;
    background:rgba(10,99,255,.1);color:var(--sky);font-family:var(--font-d);font-weight:800}
  .cd-block h2{font-family:var(--font-d);font-weight:800;font-size:1.5rem;letter-spacing:-.02em;color:var(--ink);margin-bottom:12px}
  .cd-block p{color:var(--w70);font-size:1.02rem;line-height:1.7}
  .cd-block ul{list-style:none;display:flex;flex-direction:column;gap:13px}
  .cd-block li{position:relative;padding-left:28px;color:var(--w70);font-size:1rem;line-height:1.55}
  .cd-block li svg{position:absolute;left:0;top:3px;width:17px;height:17px;stroke:var(--sky);fill:none;stroke-width:2.6}

  @media(max-width:860px){
    .cd-hero{grid-template-columns:1fr;gap:28px}
    .cd-cover{max-width:340px;aspect-ratio:1/1}
    .cd-metrics{grid-template-columns:1fr}
    .cd-block{padding-left:0}.cd-block .num{position:static;margin-bottom:14px}
  }
`;

function pct(value: string, max: number) {
  const n = parseFloat(value.replace(/[^\d,.]/g, "").replace(",", ".")) || 0;
  return Math.max(8, Math.round((n / max) * 100));
}

export default async function CaseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.client}, étude de cas`,
    description: c.excerpt,
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/etudes-de-cas/${c.slug}`,
  };

  const platMax = c.platforms
    ? Math.max(...c.platforms.map((p) => parseFloat(p.value.replace(/[^\d,.]/g, "").replace(",", ".")) || 0))
    : 1;

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* HERO — cover à gauche, résultat + CTA à droite */}
      <section className="page-hero" style={{ paddingBottom: 30 }}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link> <span>/</span>{" "}
            <Link href="/etudes-de-cas">Études de cas</Link> <span>/</span> <span>{c.client}</span>
          </div>
          <div className="cd-hero">
            <div className="cd-cover reveal"><img src={c.img} alt={c.client} /></div>
            <div className="cd-info reveal">
              <span className="cd-cat mono-label">{c.category}</span>
              <h1>{c.client}</h1>
              <p className="cd-pitch">{c.excerpt}</p>
              <div className="cd-result">
                <span className="cd-num">{c.bigNum}</span>
                <span className="cd-cap">{c.cap}<br />{c.meta}</span>
              </div>
              {c.objective && (
                <div className="cd-obj"><b>{c.objective.line}</b> <span className="up">{c.objective.up}</span></div>
              )}
              <div className="cd-cta">
                <Link href="/contact" className="btn btn-primary"><span>Réserver un audit gratuit</span><ArrowR /></Link>
                <Link href="/etudes-de-cas" className="btn"><span>Toutes les études de cas</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MÉTRIQUES */}
      <section className="sec" style={{ paddingTop: 10 }}>
        <div className="container">
          <div className="cd-metrics stagger">
            {c.metrics.map((m) => (
              <div className="cd-metric" key={m.k}><div className="v">{m.v}</div><div className="k">{m.k}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* RÉPARTITION DES VUES */}
      {c.platforms && (
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head reveal"><h2>Où les vues<br />ont été générées.</h2></div>
            <div className="cd-plats reveal">
              {c.platforms.map((p) => (
                <div className="cd-plat" key={p.abbr}>
                  <div className="cd-plat-head">
                    <div className="cd-plat-l">
                      <PlatformTile p={p.name} size={30} />
                      <span className="cd-plat-name">{p.name}</span>
                    </div>
                    <span className="cd-plat-v">{p.value}</span>
                  </div>
                  <div className="cd-bar"><span style={{ width: `${pct(p.value, platMax)}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RÉCIT — défi / approche / résultats */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cd-narr">
            <div className="cd-block reveal">
              <span className="num">01</span>
              <h2>Le défi</h2>
              <p>{c.challenge}</p>
            </div>
            <div className="cd-block reveal">
              <span className="num">02</span>
              <h2>Notre approche</h2>
              <ul>{c.approach.map((a, i) => <li key={i}><Check />{a}</li>)}</ul>
            </div>
            <div className="cd-block reveal">
              <span className="num">03</span>
              <h2>Les résultats</h2>
              <p>{c.results}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaPanel
        title="Votre campagne peut faire la même chose."
        text="On part de votre contenu, on fixe un objectif de vues chiffré, et on le garantit au contrat."
      />
    </main>
  );
}
