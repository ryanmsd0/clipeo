import type { ReactNode } from "react";
import Link from "next/link";
import CtaPanel from "@/components/CtaPanel";
import ScrollParallax from "@/components/ScrollParallax";
import { Check, ArrowR } from "@/components/Icons";
import { PlatformTile, BrandLogo, BRAND_GLYPH } from "@/components/BrandLogo";
import { SERVICE_TYPES, type ServiceType as ST } from "@/lib/services";

const STYLES = `
  .st-hero{position:relative;overflow:hidden;padding:160px 0 56px;isolation:isolate}
  .st-orb{position:absolute;border-radius:50%;filter:blur(64px);opacity:.5;z-index:-1;pointer-events:none}
  .st-orb.a{width:540px;height:540px;top:-180px;left:-160px;background:radial-gradient(circle,rgba(10,99,255,.26),transparent 70%)}
  .st-orb.b{width:440px;height:440px;top:-40px;right:-140px;background:radial-gradient(circle,rgba(10,99,255,.16),transparent 70%)}
  .st-hgrid{display:grid;grid-template-columns:1.15fr .85fr;gap:50px;align-items:center}
  .st-eyebrow{display:inline-flex;align-items:center;gap:9px;padding:8px 16px;border-radius:50px;background:var(--glass);border:1px solid var(--w14);
    font-family:var(--font-m);font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--w55);margin-bottom:22px}
  .st-hero h1{font-family:var(--font-d);font-weight:800;font-size:clamp(2.3rem,5vw,3.9rem);line-height:1.04;letter-spacing:-.03em;margin-bottom:18px}
  .st-hero .sub{font-size:clamp(1.02rem,1.6vw,1.18rem);color:var(--w70);max-width:520px;margin-bottom:28px;line-height:1.6}
  .st-cta{display:flex;gap:12px;flex-wrap:wrap}

  /* visuel : iPhone (image) + écran clip + stat + chips */
  .st-visual{position:relative;height:460px}
  .st-phone{position:absolute;top:42%;left:50%;transform:translate(-50%,-50%);width:206px;aspect-ratio:365/750;filter:drop-shadow(0 48px 90px rgba(10,40,120,.45))}
  .st-phone-img{position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none;user-select:none}
  .st-phone-screen{position:absolute;top:1.7%;bottom:1.7%;left:3.6%;right:3.6%;z-index:1;border-radius:26px;overflow:hidden;
    background:radial-gradient(150px 200px at 50% 14%,rgba(96,158,255,.55),transparent 62%),linear-gradient(168deg,#0b2a8c,var(--ink));
    display:flex;align-items:center;justify-content:center}
  .st-phone .play{width:58px;height:58px;border-radius:50%;background:rgba(255,255,255,.2);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center}
  .st-phone .play::after{content:"";border-left:17px solid #fff;border-top:10px solid transparent;border-bottom:10px solid transparent;margin-left:4px}
  .st-stat{position:absolute;top:30px;right:0;background:#fff;border:1px solid var(--w08);border-radius:18px;padding:16px 20px;box-shadow:0 28px 60px -30px rgba(10,40,120,.5);min-width:140px;z-index:3}
  .st-stat .v{font-family:var(--font-d);font-weight:800;font-size:1.7rem;letter-spacing:-.02em;background:linear-gradient(100deg,var(--sky-bright),var(--sky));-webkit-background-clip:text;background-clip:text;color:transparent;line-height:1}
  .st-stat .k{font-family:var(--font-m);font-size:.56rem;letter-spacing:1px;text-transform:uppercase;color:var(--w40);margin-top:7px;max-width:130px;line-height:1.3}
  .st-chip{position:absolute;display:flex;align-items:center;gap:8px;padding:10px 15px;border-radius:13px;background:#fff;border:1px solid var(--w08);box-shadow:0 22px 50px -28px rgba(10,40,120,.5);font-family:var(--font-d);font-weight:700;font-size:.78rem;color:var(--ink);z-index:3}
  .st-chip i{width:22px;height:22px;border-radius:6px;display:inline-block}
  .st-chip.f1{bottom:60px;left:-10px}
  .st-chip.f2{bottom:6px;right:24px}

  /* inclus */
  .st-incl{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .st-inc{display:flex;gap:16px;background:linear-gradient(180deg,var(--glass-2),var(--glass));border:1px solid var(--w14);border-radius:20px;padding:26px 28px}
  .st-inc .ic{flex:none;width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:rgba(10,99,255,.1)}
  .st-inc .ic svg{width:20px;height:20px;stroke:var(--sky);fill:none;stroke-width:2.4}
  .st-inc h3{font-family:var(--font-d);font-weight:800;font-size:1.12rem;color:var(--ink);margin-bottom:7px;letter-spacing:-.01em}
  .st-inc p{color:var(--w55);font-size:.93rem;line-height:1.55}

  /* déroulé */
  .st-flow{position:relative;display:grid;gap:16px}
  .st-flow::before{content:"";position:absolute;top:30px;left:9%;right:9%;height:2px;background:linear-gradient(90deg,var(--w14),var(--sky),var(--w14));z-index:0}
  .st-fstep{position:relative;z-index:1;text-align:center;padding:0 6px}
  .st-fstep .dot{width:60px;height:60px;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;background:#fff;border:2px solid var(--w14);font-family:var(--font-d);font-weight:800;font-size:1.15rem;color:var(--sky);box-shadow:0 14px 30px -14px rgba(10,99,255,.5)}
  .st-fstep h4{font-family:var(--font-d);font-weight:800;font-size:1.05rem;color:var(--ink);margin-bottom:8px;letter-spacing:-.01em}
  .st-fstep p{color:var(--w55);font-size:.88rem;line-height:1.5}

  /* preuve */
  .st-proof{display:grid;grid-template-columns:.8fr 1.2fr;gap:30px;align-items:center;border-radius:28px;padding:clamp(34px,4.5vw,52px);color:#fff;background:radial-gradient(620px 360px at 12% -20%,rgba(96,158,255,.4),transparent 60%),linear-gradient(160deg,#0b2a8c,var(--ink))}
  .st-proof .met{font-family:var(--font-d);font-weight:800;font-size:clamp(2.6rem,6vw,4rem);letter-spacing:-.03em;line-height:1;background:linear-gradient(100deg,#fff,#9bd0ff);-webkit-background-clip:text;background-clip:text;color:transparent}
  .st-proof .metk{font-family:var(--font-m);font-size:.62rem;letter-spacing:1.5px;text-transform:uppercase;color:#9bd0ff;margin-top:12px;max-width:200px;line-height:1.4}
  .st-proof .q{font-size:clamp(1.15rem,2vw,1.5rem);line-height:1.4;font-weight:600;letter-spacing:-.01em;margin-bottom:22px}
  .st-proof .who{display:flex;align-items:center;gap:12px}
  .st-proof .who i{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-d);font-weight:800;color:#0b2a8c;background:#fff;font-style:normal}
  .st-proof .who b{display:block;font-family:var(--font-d);font-size:1rem}
  .st-proof .who span{font-family:var(--font-m);font-size:.6rem;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.6)}

  /* faq + autres */
  .st-faq{max-width:820px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
  .st-q{background:linear-gradient(180deg,var(--glass-2),var(--glass));border:1px solid var(--w14);border-radius:16px;padding:24px 26px}
  .st-q h3{font-family:var(--font-d);font-weight:800;font-size:1.06rem;color:var(--ink);margin-bottom:8px;letter-spacing:-.01em}
  .st-q p{color:var(--w55);font-size:.95rem;line-height:1.6}
  .st-others{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;max-width:760px;margin:0 auto}
  .st-other{display:flex;align-items:center;gap:16px;padding:22px 24px;border-radius:18px;background:#fff;border:1px solid var(--w08);color:var(--ink);
    box-shadow:0 18px 40px -30px rgba(10,40,120,.35);transition:transform .35s cubic-bezier(.32,.72,0,1),border-color .35s,box-shadow .35s}
  .st-other:hover{transform:translateY(-4px);border-color:var(--sky);box-shadow:0 28px 54px -30px rgba(10,40,120,.5)}
  .st-other .ic{flex:none;width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;
    background:linear-gradient(160deg,rgba(10,99,255,.13),rgba(10,99,255,.04));border:1px solid var(--w08);color:var(--sky)}
  .st-other .ic svg{width:23px;height:23px}
  .st-other .tx{display:flex;flex-direction:column;gap:3px;flex:1;min-width:0}
  .st-other .tx b{font-family:var(--font-d);font-weight:800;font-size:1.06rem;letter-spacing:-.015em;color:var(--ink)}
  .st-other .tx span{font-size:.84rem;color:var(--w55);line-height:1.35}
  .st-other .arr{flex:none;width:20px;height:20px;color:var(--sky);opacity:.55;transform:translateX(-5px);transition:transform .3s cubic-bezier(.32,.72,0,1),opacity .3s}
  .st-other:hover .arr{opacity:1;transform:translateX(0)}
  @media(max-width:600px){.st-others{grid-template-columns:1fr}}

  /* ── concept viz (animé) ── */
  .viz{position:relative;border:1px solid var(--w14);border-radius:28px;padding:clamp(36px,5vw,60px);overflow:hidden;
    background:radial-gradient(700px 380px at 50% -20%,rgba(10,99,255,.07),transparent 60%),linear-gradient(180deg,var(--glass-2),var(--glass))}
  .viz-cap{text-align:center;margin-top:30px;font-family:var(--font-m);font-size:.72rem;letter-spacing:2px;text-transform:uppercase;color:var(--w55)}
  .viz-cap b{color:var(--sky-bright)}

  /* fan-out : 1 vidéo -> clips */
  .viz-fanout{display:flex;align-items:center;justify-content:center;gap:clamp(18px,4vw,46px);flex-wrap:wrap}
  .viz-source{flex:none;width:230px;border-radius:16px;overflow:hidden;border:1px solid var(--w14);background:#fff;box-shadow:0 24px 50px -30px rgba(10,40,120,.4)}
  .viz-thumb{aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;
    background:radial-gradient(120px 90px at 50% 22%,rgba(96,158,255,.5),transparent 60%),linear-gradient(150deg,#0b2a8c,var(--ink))}
  .viz-pl{width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center}
  .viz-pl::after{content:"";border-left:13px solid #fff;border-top:8px solid transparent;border-bottom:8px solid transparent;margin-left:3px}
  .viz-srclab{padding:11px 14px;font-family:var(--font-m);font-size:.58rem;letter-spacing:1px;text-transform:uppercase;color:var(--w55);display:flex;justify-content:space-between}
  .viz-arrow{color:var(--sky);flex:none;display:flex}
  .viz-arrow svg{width:30px;height:30px}
  .viz-clips{display:flex;gap:10px}
  .viz-clip{width:60px;height:106px;border-radius:11px;border:2px solid #fff;position:relative;animation:viz-bob 3s ease-in-out infinite;
    background:radial-gradient(50px 60px at 50% 22%,rgba(96,158,255,.5),transparent 60%),linear-gradient(165deg,#0b2a8c,var(--ink));box-shadow:0 16px 32px -18px rgba(10,40,120,.6)}
  .viz-clip::after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border-left:10px solid rgba(255,255,255,.85);border-top:6px solid transparent;border-bottom:6px solid transparent}
  @keyframes viz-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}

  /* spread : 1 clip -> grille de comptes */
  .viz-spread{display:flex;flex-direction:column;align-items:center;gap:26px}
  .viz-clipbig{width:74px;height:130px;border-radius:14px;border:2px solid #fff;position:relative;
    background:radial-gradient(60px 70px at 50% 22%,rgba(96,158,255,.55),transparent 60%),linear-gradient(165deg,#0b2a8c,var(--ink));box-shadow:0 22px 44px -18px rgba(10,40,120,.6)}
  .viz-clipbig::after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border-left:13px solid rgba(255,255,255,.85);border-top:8px solid transparent;border-bottom:8px solid transparent}
  .viz-net{display:grid;grid-template-columns:repeat(8,1fr);gap:11px;max-width:560px;width:100%}
  .viz-node{aspect-ratio:1;border-radius:11px;background:#fff;border:1px solid var(--w08);display:flex;align-items:center;justify-content:center;
    box-shadow:0 10px 24px -16px rgba(10,40,120,.4);animation:viz-pulse 2.6s ease-in-out infinite}
  .viz-node i{width:16px;height:16px;border-radius:5px;display:block}
  @keyframes viz-pulse{0%,100%{opacity:.4;transform:scale(.92)}50%{opacity:1;transform:scale(1)}}

  /* flow : chaîne managée */
  .viz-flow{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}
  .viz-stage{flex:1 1 150px;max-width:190px;text-align:center;background:#fff;border:1px solid var(--w08);border-radius:18px;padding:24px 18px;box-shadow:0 18px 40px -28px rgba(10,40,120,.4)}
  .viz-stage .b{width:46px;height:46px;border-radius:13px;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;background:rgba(10,99,255,.1);color:var(--sky);font-family:var(--font-d);font-weight:800}
  .viz-stage h4{font-family:var(--font-d);font-weight:800;font-size:1rem;color:var(--ink);letter-spacing:-.01em}
  .viz-conn{display:flex;align-items:center;color:var(--sky);flex:none}
  .viz-conn svg{width:22px;height:22px}

  /* éléments flottants du hero, propres à chaque offre */
  .st-clipmini{position:absolute;width:54px;height:96px;border-radius:11px;border:2px solid #fff;z-index:3;
    background:radial-gradient(40px 50px at 50% 24%,rgba(96,158,255,.5),transparent 60%),linear-gradient(165deg,#0b2a8c,var(--ink));
    box-shadow:0 18px 36px -20px rgba(10,40,120,.6);animation:viz-bob 3.2s ease-in-out infinite}
  .st-clipmini::after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border-left:9px solid rgba(255,255,255,.85);border-top:6px solid transparent;border-bottom:6px solid transparent}
  .st-acct{position:absolute;width:46px;height:46px;border-radius:13px;background:#fff;border:1px solid var(--w08);z-index:3;
    display:flex;align-items:center;justify-content:center;box-shadow:0 16px 34px -18px rgba(10,40,120,.5);animation:viz-pulse 2.6s ease-in-out infinite}
  .st-acct i{width:20px;height:20px;border-radius:6px;display:block}
  .st-result{position:absolute;z-index:3;background:#fff;border:1px solid var(--w08);border-radius:16px;padding:13px 18px;box-shadow:0 24px 52px -28px rgba(10,40,120,.5)}
  .st-result .rv{font-family:var(--font-d);font-weight:800;font-size:1.1rem;color:var(--ink);letter-spacing:-.01em;display:flex;align-items:center;gap:7px}
  .st-result .rv svg{width:18px;height:18px;stroke:#22c55e;fill:none;stroke-width:2.6}
  .st-result .rk{font-family:var(--font-m);font-size:.54rem;letter-spacing:1px;text-transform:uppercase;color:var(--w40);margin-top:5px}

  /* ── hero : cartes flottantes (à la Clipping Culture) ── */
  .hv-card{position:absolute;background:#fff;border:1px solid var(--w08);border-radius:18px;
    box-shadow:0 30px 60px -30px rgba(10,40,120,.45),0 8px 20px -10px rgba(10,22,40,.08);animation:hv-float 5s ease-in-out infinite}
  @keyframes hv-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-11px)}}
  .hv-stat{padding:16px 20px}
  .hv-stat .v{font-family:var(--font-d);font-weight:800;font-size:1.6rem;letter-spacing:-.02em;line-height:1;
    background:linear-gradient(100deg,var(--sky-bright),var(--sky));-webkit-background-clip:text;background-clip:text;color:transparent}
  .hv-stat .k{font-family:var(--font-m);font-size:.55rem;letter-spacing:1px;text-transform:uppercase;color:var(--w40);margin-top:6px;max-width:120px;line-height:1.3}
  .hv-video{padding:10px;width:236px}
  .hv-vthumb{aspect-ratio:16/9;border-radius:12px;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;
    background:radial-gradient(120px 90px at 50% 22%,rgba(96,158,255,.5),transparent 60%),linear-gradient(150deg,#0b2a8c,var(--ink))}
  .hv-vthumb .pl{width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center}
  .hv-vthumb .pl::after{content:"";border-left:12px solid #fff;border-top:8px solid transparent;border-bottom:8px solid transparent;margin-left:3px}
  .hv-vmeta{font-family:var(--font-m);font-size:.58rem;letter-spacing:1px;text-transform:uppercase;color:var(--w55);padding:10px 8px 4px}
  .hv-clip{width:78px;height:134px;border-radius:14px;border:2px solid #fff;
    background:radial-gradient(50px 60px at 50% 22%,rgba(96,158,255,.5),transparent 60%),linear-gradient(165deg,#0b2a8c,var(--ink));box-shadow:0 24px 46px -22px rgba(10,40,120,.6)}
  .hv-clip::after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border-left:11px solid rgba(255,255,255,.85);border-top:7px solid transparent;border-bottom:7px solid transparent}
  .hv-platform{display:flex;align-items:center;gap:10px;padding:12px 16px}
  .hv-platform i{width:26px;height:26px;border-radius:8px;display:block;flex:none}
  .hv-platform b{font-family:var(--font-d);font-weight:700;font-size:.84rem;color:var(--ink)}
  .hv-chart{padding:16px 18px;width:172px}
  .hv-chart .bars{display:flex;align-items:flex-end;gap:5px;height:44px;margin-bottom:12px}
  .hv-chart .bars span{flex:1;background:linear-gradient(180deg,var(--sky),var(--sky-bright));border-radius:3px 3px 0 0}
  .hv-chart .v{font-family:var(--font-d);font-weight:800;font-size:1.15rem;color:var(--ink);letter-spacing:-.01em}
  .hv-chart .k{font-family:var(--font-m);font-size:.54rem;letter-spacing:1px;text-transform:uppercase;color:var(--w40);margin-top:3px}
  .hv-result{padding:18px 20px;max-width:216px}
  .hv-result .v{font-family:var(--font-d);font-weight:800;font-size:1.7rem;letter-spacing:-.02em;
    background:linear-gradient(100deg,var(--sky-bright),var(--sky));-webkit-background-clip:text;background-clip:text;color:transparent}
  .hv-result .row{display:flex;align-items:center;gap:7px;margin-top:9px;font-size:.8rem;color:var(--w55);line-height:1.3}
  .hv-result .row svg{flex:none;width:16px;height:16px;stroke:#22c55e;fill:none;stroke-width:2.6}
  .hv-step{display:flex;align-items:center;gap:11px;padding:13px 17px}
  .hv-step .n{width:28px;height:28px;border-radius:8px;background:rgba(10,99,255,.1);color:var(--sky);display:flex;align-items:center;justify-content:center;font-family:var(--font-d);font-weight:800;font-size:.82rem;flex:none}
  .hv-step b{font-family:var(--font-d);font-weight:700;font-size:.88rem;color:var(--ink)}

  @media(max-width:900px){
    .st-hgrid{grid-template-columns:1fr;gap:30px}.st-visual{height:440px;order:-1}
    .st-incl{grid-template-columns:1fr}
    .st-proof{grid-template-columns:1fr;gap:24px;text-align:left}
  }
  @media(max-width:760px){.viz-net{grid-template-columns:repeat(6,1fr)}.viz-conn{transform:rotate(90deg)}}
  @media(max-width:520px){.st-chip{display:none}}
  @media(prefers-reduced-motion:reduce){.viz-clip,.viz-node{animation:none}}
`;

/* couleurs plateformes pour la grille de diffusion */
const NAMES = ["tiktok", "youtube", "instagram", "twitch"] as const;

/* icône + accroche courte par offre (section « Autres offres ») */
const OFFER_ICON: Record<string, ReactNode> = {
  "campagne-managee": <><path d="M12 3 3 8l9 5 9-5-9-5Z" /><path d="m3 14 9 5 9-5" /></>,
  "production-de-clips": <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4 8.5 15.5M14.5 14.5 20 20M8.5 8.5 12 12" /></>,
  "distribution-tracking": <><circle cx="12" cy="12" r="2" /><path d="M5 8a8 8 0 0 0 0 8M19 8a8 8 0 0 1 0 8M8 11a4 4 0 0 0 0 2M16 11a4 4 0 0 1 0 2" /></>,
};
const OFFER_DESC: Record<string, string> = {
  "campagne-managee": "On gère tout, de l'audit à la distribution.",
  "production-de-clips": "Montage à la demande, vous diffusez.",
  "distribution-tracking": "Vos clips, partout sur des dizaines de comptes.",
};

const Check2 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m5 12.5 4 4 10-10.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* Hero visuel : collage de cartes flottantes, une composition par offre
   (inspiré des heros type agence — pas de mockup téléphone). */
function HeroViz({ data }: { data: ST }) {
  if (data.slug === "production-de-clips") {
    return (
      <>
        <div className="hv-card hv-video" style={{ top: 54, left: -12 }}>
          <div className="hv-vthumb"><span className="pl" /></div>
          <div className="hv-vmeta">Vidéo longue · 42:18</div>
        </div>
        <div className="hv-card hv-stat" style={{ top: 0, right: 0 }}><div className="v">+6,6K</div><div className="k">clips déjà produits</div></div>
        <div className="hv-card hv-clip" style={{ top: 188, right: 22, animationDelay: ".6s" }} />
        <div className="hv-card hv-clip" style={{ bottom: 30, left: 46, animationDelay: "1.1s" }} />
      </>
    );
  }
  if (data.slug === "distribution-tracking") {
    return (
      <>
        <div className="hv-card hv-chart" style={{ top: 44, left: -10 }}>
          <div className="bars">{[42, 64, 50, 82, 60, 96, 72].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div>
          <div className="v">+48,2 M</div><div className="k">vues trackées</div>
        </div>
        <div className="hv-card hv-platform" style={{ top: 4, right: 28, animationDelay: ".3s" }}><PlatformTile p="tiktok" /><b>TikTok</b></div>
        <div className="hv-card hv-platform" style={{ top: 152, right: -12, animationDelay: ".7s" }}><PlatformTile p="youtube" /><b>Shorts</b></div>
        <div className="hv-card hv-platform" style={{ bottom: 96, left: -8, animationDelay: "1s" }}><PlatformTile p="instagram" /><b>Reels</b></div>
        <div className="hv-card hv-stat" style={{ bottom: 22, right: 16, animationDelay: "1.3s" }}><div className="v">60+</div><div className="k">comptes de diffusion</div></div>
      </>
    );
  }
  return (
    <>
      <div className="hv-card hv-result" style={{ top: 34, right: -8 }}>
        <div className="v">+160,9 M</div>
        <div className="row"><Check2 />objectif tenu au contrat</div>
      </div>
      <div className="hv-card hv-step" style={{ top: 6, left: -6 }}><span className="n">1</span><b>Audit</b></div>
      <div className="hv-card hv-step" style={{ top: 150, left: 22, animationDelay: ".5s" }}><span className="n">2</span><b>Production</b></div>
      <div className="hv-card hv-step" style={{ bottom: 50, left: -10, animationDelay: "1s" }}><span className="n">3</span><b>Distribution</b></div>
    </>
  );
}

/* Visuel animé propre à chaque offre — « imager les propos ».
   Motion GPU-safe (transform/opacity), stagger via animationDelay. */
function Viz({ data }: { data: ST }) {
  if (data.slug === "production-de-clips") {
    return (
      <div className="viz">
        <div className="viz-fanout">
          <div className="viz-source">
            <div className="viz-thumb"><span className="viz-pl" /></div>
            <div className="viz-srclab"><span>Vidéo longue</span><span>42:18</span></div>
          </div>
          <span className="viz-arrow"><ArrowR /></span>
          <div className="viz-clips">
            {Array.from({ length: 6 }).map((_, i) => (
              <span className="viz-clip" key={i} style={{ animationDelay: `${i * 0.28}s` }} />
            ))}
          </div>
        </div>
        <p className="viz-cap">1 vidéo longue <b>→</b> des dizaines de clips verticaux</p>
      </div>
    );
  }
  if (data.slug === "distribution-tracking") {
    return (
      <div className="viz">
        <div className="viz-spread">
          <span className="viz-clipbig" />
          <div className="viz-net">
            {Array.from({ length: 16 }).map((_, i) => (
              <span className="viz-node" key={i} style={{ animationDelay: `${(i % 8) * 0.16}s` }}>
                <BrandLogo name={NAMES[i % NAMES.length]} style={{ width: 20, height: 20, color: BRAND_GLYPH[NAMES[i % NAMES.length]] }} />
              </span>
            ))}
          </div>
        </div>
        <p className="viz-cap">1 clip <b>→</b> des dizaines de comptes, multi-plateformes</p>
      </div>
    );
  }
  return (
    <div className="viz">
      <div className="viz-flow">
        {data.process.flatMap((p, i) => [
          i > 0 ? <span className="viz-conn" key={`c${i}`}><ArrowR /></span> : null,
          <div className="viz-stage" key={`s${i}`}><span className="b">{i + 1}</span><h4>{p.t}</h4></div>,
        ]).filter(Boolean)}
      </div>
      <p className="viz-cap">Une chaîne managée, de l&apos;audit à la croissance</p>
    </div>
  );
}

export default function ServiceType({ data }: { data: ST }) {
  const others = SERVICE_TYPES.filter((s) => s.slug !== data.slug);

  return (
    <ScrollParallax>
      <main>
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />

        {/* HERO */}
        <section className="st-hero">
          <div className="st-orb a" data-parallax="0.3" />
          <div className="st-orb b" data-parallax="0.18" />
          <div className="container">
            <div className="st-hgrid">
              <div>
                <span className="st-eyebrow">{data.eyebrow}</span>
                <h1>{data.h1}<br /><span className="grad">{data.h1grad}</span></h1>
                <p className="sub">{data.sub}</p>
                <div className="st-cta">
                  <Link href="/contact" className="btn btn-primary"><span>Réserver un audit gratuit</span><ArrowR /></Link>
                  <Link href="/services" className="btn"><span>Voir toutes les offres</span></Link>
                </div>
              </div>
              <div className="st-visual" aria-hidden="true">
                <HeroViz data={data} />
              </div>
            </div>
          </div>
        </section>

        {/* CE QUI EST INCLUS */}
        <section className="sec" style={{ paddingTop: 20 }}>
          <div className="container">
            <div className="sec-head reveal">
              <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>Ce qui est inclus</span>
              <h2>Tout ce que cette offre<br />met sur la table.</h2>
            </div>
            <div className="st-incl stagger">
              {data.included.map((it) => (
                <div className="st-inc" key={it.t}>
                  <div className="ic"><Check /></div>
                  <div><h3>{it.t}</h3><p>{it.d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EN IMAGES — visuel animé propre à l'offre */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head reveal">
              <span className="mono-label" style={{ marginBottom: 22, display: "block" }}>En images</span>
              <h2>
                {data.slug === "production-de-clips" ? (<>Une vidéo, <span className="grad">des dizaines de clips.</span></>)
                  : data.slug === "distribution-tracking" ? (<>Un clip, <span className="grad">partout à la fois.</span></>)
                  : (<>De bout en bout, <span className="grad">sans couture.</span></>)}
              </h2>
            </div>
            <div className="reveal"><Viz data={data} /></div>
          </div>
        </section>

        {/* PREUVE */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="st-proof reveal">
              <div>
                <div className="met">{data.proof.metric}</div>
                <div className="metk">{data.proof.metricK}</div>
              </div>
              <div>
                <p className="q">« {data.proof.quote} »</p>
                <div className="who">
                  <i>{data.proof.ini}</i>
                  <span><b>{data.proof.name}</b><span>{data.proof.cat}</span></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head reveal"><h2>Questions fréquentes.</h2></div>
            <div className="st-faq stagger">
              {data.faq.map((f) => <div className="st-q" key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>)}
            </div>
          </div>
        </section>

        {/* AUTRES OFFRES */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head reveal" style={{ marginBottom: 32 }}>
              <span className="mono-label" style={{ marginBottom: 18, display: "block" }}>Autres offres</span>
              <h2>On propose aussi…</h2>
            </div>
            <div className="st-others stagger">
              {others.map((o) => (
                <Link href={`/services/${o.slug}`} className="st-other" key={o.slug}>
                  <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">{OFFER_ICON[o.slug]}</svg></span>
                  <span className="tx"><b>{o.label}</b><span>{OFFER_DESC[o.slug]}</span></span>
                  <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaPanel title={data.ctaTitle} text={data.ctaText} />
      </main>
    </ScrollParallax>
  );
}
