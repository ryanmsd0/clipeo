import type { Metadata } from "next";
import CinematicHeroV6 from "@/components/CinematicHeroV6";

export const metadata: Metadata = {
  title: "Clipeo · V6 (test clipping)",
  robots: { index: false, follow: false },
};

export default function V6TestPage() {
  return <CinematicHeroV6 showFixedCta={false} />;
}
