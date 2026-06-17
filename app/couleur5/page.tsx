import type { Metadata } from "next";
import PaletteClone from "@/components/PaletteClone";

export const metadata: Metadata = {
  title: "Clone landing — #080151 × #2DD4BF (teal)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PaletteClone accent="#2dd4bf" name="teal" />;
}
