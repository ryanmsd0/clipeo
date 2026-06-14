import type { Metadata } from "next";
import CinematicHeroV5 from "@/components/CinematicHeroV5";

export const metadata: Metadata = {
  title: "Clipeo · V5 (test)",
  robots: { index: false, follow: false },
};

export default function V5TestPage() {
  return <CinematicHeroV5 />;
}
