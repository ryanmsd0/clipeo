import type { Metadata } from "next";
import CinematicHeroV7 from "@/components/CinematicHeroV7";

export const metadata: Metadata = {
  title: "Clipeo · V7 (test omniprésence)",
  robots: { index: false, follow: false },
};

export default function V7TestPage() {
  return <CinematicHeroV7 showFixedCta={false} />;
}
