import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { StatusBeacon } from "@/components/ui/StatusBeacon";
import { SITE_IDENTITY } from "@/lib/navigation";

interface PageScaffoldProps {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  nextRoute: {
    label: string;
    href: string;
  };
}

/**
 * Clean architectural foundation page used by secondary routes so navigation
 * remains 100% functional while keeping full section implementation scoped cleanly.
 */
export function PageScaffold({
  index,
  eyebrow,
  title,
  description,
  nextRoute,
}: PageScaffoldProps) {
  return (
    <main className="relative flex flex-1 flex-col justify-between bg-canvas bg-architectural-grid pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-hero-vignette"
      />
      <Container className="relative z-10 flex flex-1 flex-col justify-between gap-16">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-ink-muted">
              SECTION {index} {"//"} {SITE_IDENTITY.monogram}
            </span>
            <StatusBeacon label={SITE_IDENTITY.statusLabel} />
          </div>

          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </div>

        <div className="rounded-2xl border border-[rgba(243,242,238,0.1)] bg-[rgba(13,15,18,0.78)] p-6 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">
                FOUNDATION ARCHITECTURE ACTIVE
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-ink-secondary sm:text-base">
                This route is wired into {SITE_IDENTITY.name}&apos;s design
                system, smooth scroll context, and primary navigation. Detailed
                content for this section will be layered onto this foundation in
                the next phase.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:shrink-0">
              <Button
                href="/"
                variant="secondary"
                size="md"
                icon={<ArrowLeft className="h-4 w-4" />}
              >
                Back to Hero
              </Button>
              <Button
                href={nextRoute.href}
                variant="primary"
                size="md"
                icon={<ArrowUpRight className="h-4 w-4" />}
              >
                {nextRoute.label}
              </Button>
            </div>
          </div>
        </div>

        <div className="hairline-t flex flex-wrap items-center justify-between gap-4 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          <Link href="/" className="hover:text-ink transition-colors">
            ← Return to 3D Stage
          </Link>
          <span>{SITE_IDENTITY.discipline}</span>
        </div>
      </Container>
    </main>
  );
}
