import type { Metadata } from "next";
import { PageScaffold } from "@/components/layout/PageScaffold";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <PageScaffold
      index="03"
      eyebrow="WORK // SELECTED CASE STUDIES"
      title="Selected products and digital experiences."
      description="Case studies and shipped frontend systems will live here — presented through product context, technical decisions, and interactive execution."
      nextRoute={{ label: "View Expertise", href: "/expertise" }}
    />
  );
}
