import Link from "next/link";
import { ArrowR } from "@/components/Icons";

export default function CtaPanel({
  title = "Prêt à lancer votre campagne ?",
  text = "On audite votre contenu long, on identifie ce qui peut cartonner, et on vous projette sur les performances de votre future campagne, avant tout engagement.",
  cta = "Réserver mon audit gratuit",
}: {
  title?: string;
  text?: string;
  cta?: string;
}) {
  return (
    <section className="cta-sec">
      <div className="container">
        <div className="cta-panel reveal">
          <h2>{title}</h2>
          <p>{text}</p>
          <Link href="/contact" className="btn btn-primary">
            <span>{cta}</span>
            <ArrowR />
          </Link>
        </div>
      </div>
    </section>
  );
}
