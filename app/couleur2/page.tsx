import type { Metadata } from "next";
import PaletteClone from "@/components/PaletteClone";

export const metadata: Metadata = {
  title: "Clone landing — #080151 × #22D3EE (cyan)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PaletteClone accent="#22d3ee" name="cyan" />;
}
