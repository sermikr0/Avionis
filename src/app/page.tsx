import type { Metadata } from "next";
import { FlightPlan } from "@/components/home/flight-plan";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { LaneBoard } from "@/components/home/lane-board";
import { ServicesGrid } from "@/components/home/services-grid";
import { Standards } from "@/components/home/standards";
import { Cta } from "@/components/sections/cta";
import { PhotoBand } from "@/components/sections/photo-band";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.brand} — ${site.tagline}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LaneBoard />
      <Intro />
      <ServicesGrid />
      <PhotoBand />
      <FlightPlan />
      <Standards />
      <Cta />
    </>
  );
}
