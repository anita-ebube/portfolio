import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS, SITE_IDENTITY } from "@/lib/navigation";

/**
 * Compact architectural directory below the hero stage.
 * Gives the landing page natural scroll runway for Lenis & scroll-reactive 3D
 * while routing cleanly into dedicated sections without inventing placeholder copy.
 */
export function FoundationIndex() {
  const sectionLinks = NAV_ITEMS.filter((item) => item.href !== "/");

  return (
    <section
      id="foundation-index"
      aria-label="Portfolio Architecture Index"
      className="hairline-t relative z-20 bg-surface py-16 sm:py-24"
    >
      <Container>
        <div className="flex flex-col justify-between gap-6 pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-lime">
              ARCHITECTURE // {SITE_IDENTITY.monogram}
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.025em] text-ink sm:text-3xl">
              Navigate the portfolio system
            </h2>
          </div>
          <p className="max-w-[38ch] text-sm leading-relaxed text-ink-secondary">
            {SITE_IDENTITY.supportingCopy}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectionLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col justify-between rounded-2xl border border-[rgba(243,242,238,0.1)] bg-[rgba(7,8,9,0.65)] p-6 transition-all duration-300 hover:border-[rgba(200,255,0,0.45)] hover:bg-elevated"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-lime">
                  {item.index}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-ink-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-10">
                <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-ink transition-colors group-hover:text-lime">
                  {item.label}
                </h3>
                <p className="mt-1.5 text-sm text-ink-secondary">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <footer className="hairline-t mt-14 flex flex-wrap items-center justify-between gap-4 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          <span>{SITE_IDENTITY.name} — Portfolio Foundation</span>
          <span>{SITE_IDENTITY.discipline}</span>
        </footer>
      </Container>
    </section>
  );
}
