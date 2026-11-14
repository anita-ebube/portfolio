import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStoryTimeline } from "@/components/about/AboutStoryTimeline";
import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { AboutCTA } from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About — Perspective, Journey & Philosophy",
  description:
    "More than a job title. A mind that connects ideas, people and technology. Explore Anita's journey from Computer Science at UNN to HNG finalist, NACOS Southeast leadership, and the dual-track craft of Product Management and Frontend Development.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutHero />
      <AboutStoryTimeline />
      <AboutPhilosophy />
      <AboutCTA />
    </main>
  );
}
