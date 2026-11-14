import type { Metadata } from "next";
import { PageScaffold } from "@/components/layout/PageScaffold";

export const metadata: Metadata = {
  title: "Expertise",
};

export default function ExpertisePage() {
  return (
    <PageScaffold
      index="04"
      eyebrow="EXPERTISE // PRODUCT × ENGINEERING"
      title="Product direction meets interface engineering."
      description="Connecting user insight, product architecture, design systems, and modern web performance into cohesive software."
      nextRoute={{ label: "Let's Connect", href: "/contact" }}
    />
  );
}
