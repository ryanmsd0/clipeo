import type { Metadata } from "next";
import PaletteClone from "@/components/PaletteClone";

export const metadata: Metadata = {
  title: "Clone landing — #080151 × #7C6CFF (violet)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PaletteClone accent="#7c6cff" name="violet" />;
}
