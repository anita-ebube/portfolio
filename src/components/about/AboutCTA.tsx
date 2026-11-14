"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function AboutCTA() {
  return (
    <section
      aria-label="Next steps and portfolio navigation"
      className="hairline-t relative bg-surface py-20 sm:py-28"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-[rgba(243,242,238,0.12)] bg-[radial-gradient(circle_at_20%_30%,rgba(200,255,0,0.08)_0%,rgba(13,15,18,0.92)_50%,rgba(7,8,9,1)_100%)] p-8 sm:p-14 backdrop-blur-2xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-lime">
                NEXT STEPS // EXPLORE &amp; CONNECT
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-4xl">
                Ready to see product thinking translated into tangible interfaces?
              </h2>
              <p className="mt-3 text-base text-ink-secondary">
                Explore selected case studies, interactive prototypes, and
                systems architecture, or start a direct conversation.
              </p>
            </div>

            <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:shrink-0">
              <Button
                href="/work"
                variant="primary"
                size="lg"
                icon={<ArrowUpRight className="h-4 w-4" />}
              >
                Explore My Work
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                icon={<ArrowUpRight className="h-4 w-4" />}
              >
                Let&apos;s Connect
              </Button>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(243,242,238,0.1)] pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-ink-secondary transition-colors hover:text-lime"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Return to Hero Stage</span>
            </Link>
            <span>EDITION 2026 // PRODUCT MANAGEMENT × FRONTEND</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
