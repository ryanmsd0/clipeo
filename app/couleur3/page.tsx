import type { Metadata } from "next";
import PaletteClone from "@/components/PaletteClone";

export const metadata: Metadata = {
  title: "Clone landing — #080151 × #3B82F6 (azur)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PaletteClone accent="#3b82f6" name="azur" />;
}
