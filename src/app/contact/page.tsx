import type { Metadata } from "next";
import { PageScaffold } from "@/components/layout/PageScaffold";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <PageScaffold
      index="05"
      eyebrow="CONTACT // START A CONVERSATION"
      title="Let's build something meaningful."
      description="Direct contact channels and inquiry details will be configured here as part of the next portfolio implementation phase."
      nextRoute={{ label: "Explore Work", href: "/work" }}
    />
  );
}
