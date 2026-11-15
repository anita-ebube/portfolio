"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Palette,
  Users2,
  Cpu,
  HeartHandshake,
  BookOpenCheck,
  Quote,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EASE_EDITORIAL, usePrefersReducedMotion } from "@/lib/motion";

interface PhilosophyPrinciple {
  index: string;
  title: string;
  subtitle: string;
  icon: typeof Compass;
  description: string;
  manifesto: string;
}

const PRINCIPLES: PhilosophyPrinciple[] = [
  {
    index: "01",
    title: "Curiosity",
    subtitle: "The Root of Insight",
    icon: Compass,
    description:
      "I interrogate default assumptions. Before writing a line of code or drafting a feature ticket, I ask why the problem exists, who feels the friction, and what hidden user need is waiting to be uncovered.",
    manifesto: "Never build a fast solution to the wrong question.",
  },
  {
    index: "02",
    title: "Creativity",
    subtitle: "Synthesis of Code & Art",
    icon: Palette,
    description:
      "Creativity in product development isn't just about color palettes; it is the ingenuity to find elegant solutions within tight technical constraints, turning mundane interactions into memorable digital craft.",
    manifesto: "Engineered with precision, designed with soul.",
  },
  {
    index: "03",
    title: "Collaboration",
    subtitle: "Bilingual Translation",
    icon: Users2,
    description:
      "Great products are born from cross-functional alignment. Because I speak fluent engineering and fluent product, I bridge the gap between design vision, stakeholder objectives, and developer realities.",
    manifesto: "Shared vocabulary unlocks velocity.",
  },
  {
    index: "04",
    title: "Problem-Solving",
    subtitle: "Decisive Simplification",
    icon: Cpu,
    description:
      "Messy ambiguity doesn't paralyze me—it energizes me. I decompose sprawling, complex product challenges into structured milestones, shippable roadmaps, and modular interface components.",
    manifesto: "Turn ambiguity into momentum.",
  },
  {
    index: "05",
    title: "People-Oriented",
    subtitle: "Human Empathy at Scale",
    icon: HeartHandshake,
    description:
      "Behind every telemetry metric, conversion funnel, and bug ticket is a real person trying to get something done. I design systems that honor human cognitive load, accessibility, and real-world habits.",
    manifesto: "Software built for people, not just metrics.",
  },
  {
    index: "06",
    title: "Continuous Learning",
    subtitle: "Relentless Evolution",
    icon: BookOpenCheck,
    description:
      "Technology and product ecosystems move quickly. I maintain an insatiable appetite for learning—dissecting product breakdowns, adopting emerging web standards, and testing new design methodologies.",
    manifesto: "Staying adaptable is a superpower.",
  },
];

export function AboutPhilosophy() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="philosophy"
      aria-label="Anita's Personality and Philosophy"
      className="hairline-t relative bg-canvas bg-architectural-grid py-20 sm:py-28 lg:py-32"
    >
      <Container>
        {/* Section Header */}
        <div className="pb-12 sm:pb-16">
          <SectionHeading
            eyebrow="Ethos &amp; Philosophy"
            title="How I think, build, and show up every day."
            description="Six core principles that govern my perspective, combined with a singular guiding philosophy."
          />
        </div>

        {/* Central Philosophy Monument (The Guiding Quote) */}
        <div className="relative mb-16 overflow-hidden rounded-3xl border border-[rgba(200,255,0,0.32)] bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,255,0,0.08)_0%,rgba(13,15,18,0.92)_55%,rgba(7,8,9,0.98)_100%)] p-8 sm:p-14 lg:p-16 backdrop-blur-2xl">
          {/* Subtle Ambient Radial Highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(200,255,0,0.12)_0%,transparent_70%)]"
          />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[rgba(200,255,0,0.4)] bg-[rgba(200,255,0,0.12)] text-lime">
              <Quote className="h-6 w-6" aria-hidden="true" />
            </div>

            <div className="flex-1 lg:max-w-4xl">
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-lime">
                MY GUIDING PHILOSOPHY
              </span>
              <blockquote className="mt-3 font-display text-2xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                &ldquo;I don&apos;t just want to build things that work. I want
                to build things that matter.&rdquo;
              </blockquote>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
                Functional code is table stakes. True craftsmanship occurs when
                product intuition, technical elegance, and human usefulness
                converge into something people genuinely love using.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-[rgba(243,242,238,0.1)] pt-6 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
                <span className="font-bold text-ink">Anita</span>
                <span className="text-lime">/</span>
                <span>Product Manager × Frontend Technologist</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Personality & Philosophy Dimension Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((principle) => {
            const Icon = principle.icon;

            return (
              <motion.div
                key={principle.index}
                whileHover={
                  prefersReducedMotion ? {} : { y: -4, scale: 1.01 }
                }
                transition={{ duration: 0.3, ease: EASE_EDITORIAL }}
                className="group relative flex flex-col justify-between rounded-2xl border border-[rgba(243,242,238,0.1)] bg-[rgba(13,15,18,0.72)] p-7 backdrop-blur-xl transition-all duration-300 hover:border-[rgba(200,255,0,0.45)] hover:bg-elevated"
              >
                <div>
                  {/* Top Card Bar */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-lime">
                      Principle {principle.index}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(243,242,238,0.12)] bg-[rgba(20,23,28,0.8)] text-ink-secondary transition-colors group-hover:border-lime group-hover:text-lime">
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-lime">
                    {principle.title}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                    {principle.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
                    {principle.description}
                  </p>
                </div>

                {/* Manifesto Footnote */}
                <div className="mt-6 border-t border-[rgba(243,242,238,0.08)] pt-4">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-lime">
                    &rarr; {principle.manifesto}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
