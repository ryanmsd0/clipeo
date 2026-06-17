import type { Metadata } from "next";
import PaletteClone from "@/components/PaletteClone";

export const metadata: Metadata = {
  title: "Clone landing — #080151 × #0a63ff (électrique)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PaletteClone accent="#0a63ff" name="électrique" />;
}
