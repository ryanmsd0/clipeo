import type { Metadata } from "next";
import PaletteClone from "@/components/PaletteClone";

export const metadata: Metadata = {
  title: "Clone landing — #080151 × #55A4D1 (sky pastel)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PaletteClone accent="#55a4d1" name="sky pastel" />;
}
