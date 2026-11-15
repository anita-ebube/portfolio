"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { StatusBeacon } from "@/components/ui/StatusBeacon";
import { EditorialPortrait } from "@/components/about/EditorialPortrait";
import { EASE_EDITORIAL, usePrefersReducedMotion } from "@/lib/motion";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE_EDITORIAL,
    },
  },
};

export function AboutHero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      aria-label="About Anita — Introduction"
      className="relative flex flex-col justify-between overflow-hidden bg-canvas bg-architectural-grid pt-[calc(var(--nav-height)+2rem)] pb-16 sm:pb-24 lg:pt-[calc(var(--nav-height)+3.5rem)] lg:pb-28"
    >
      {/* Ambient Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-hero-vignette"
      />

      <Container className="relative z-10 flex flex-1 flex-col justify-between">
        {/* Top Eyebrow Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 sm:pb-8">
          <div className="flex items-center gap-3">
            <StatusBeacon label="About Anita Ugoebillah" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            Biography
          </span>
        </div>

        {/* Editorial Split: Left Narrative, Right Portrait */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16"
        >
          {/* Left Column: Headline & Human Narrative */}
          <div className="flex flex-col lg:col-span-7">
            {/* Purposeful Discipline Kicker */}
            <motion.div
              variants={itemVariants}
              className="inline-flex max-w-full items-center gap-2 self-start rounded-full border border-[rgba(200,255,0,0.32)] bg-[rgba(200,255,0,0.06)] px-3.5 py-1.5 backdrop-blur-md"
            >
              <Sparkles className="h-3 w-3 text-lime" aria-hidden="true" />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-lime sm:text-[11px]">
                PRODUCT MANAGER × FRONTEND DEVELOPER
              </p>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-4 font-display text-[clamp(2.35rem,5vw,4.5rem)] font-bold leading-[1.0] tracking-[-0.035em] text-ink sm:mt-5"
            >
              More than a job title. A mind that connects{" "}
              <span className="text-lime">ideas</span>,{" "}
              <span className="text-ink">people</span> and{" "}
              <span className="text-lime">technology</span>.
            </motion.h1>

            {/* Mobile Portrait Placement (shows on mobile between headline and body copy) */}
            <motion.div variants={itemVariants} className="my-6 lg:hidden">
              <EditorialPortrait />
            </motion.div>

            {/* Narrative Prose: Personal, Human, Grounded */}
            <motion.div
              variants={itemVariants}
              className="mt-6 space-y-4 text-base leading-relaxed text-ink-secondary sm:text-lg sm:leading-relaxed"
            >
              <p>
                I didn&apos;t arrive at product thinking from a slide deck or a
                marketing sprint. I came to it through code, curiosity, and a
                steady conviction that software is only as good as the human
                reality it touches.
              </p>
              <p>
                With a degree in Computer Science from the University of
                Nigeria, Nsukka, I learned how systems behave under the hood.
                But the deeper I went into software development, the clearer it
                became: technical feasibility means nothing without clarity of
                purpose. That realization pulled me toward Product Management—not
                to step away from technology, but to give engineering a sharper,
                more empathetic direction.
              </p>
              <p>
                Today, I operate as a hybrid: someone who can sit with engineers
                to debate technical constraints, step into design to protect
                interaction nuance, and step back with stakeholders to ask the
                hardest question of all:{" "}
                <span className="font-semibold text-ink">
                  are we solving a problem that truly matters?
                </span>
              </p>
            </motion.div>

            {/* Quick Metrics / Signals */}
            <motion.div
              variants={itemVariants}
              className="mt-8 grid grid-cols-2 gap-4 border-t border-[rgba(243,242,238,0.1)] pt-6 sm:grid-cols-3"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-lime">
                  EDUCATION
                </p>
                <p className="mt-1 font-display text-base font-bold text-ink">
                  B.Sc Computer Science
                </p>
                <p className="text-xs text-ink-muted">Univ. of Nigeria, Nsukka</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-lime">
                  DISCIPLINE
                </p>
                <p className="mt-1 font-display text-base font-bold text-ink">
                  Dual-Track Craft
                </p>
                <p className="text-xs text-ink-muted">Product Mgmt × Frontend</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="font-mono text-xs uppercase tracking-wider text-lime">
                  LEADERSHIP
                </p>
                <p className="mt-1 font-display text-base font-bold text-ink">
                  Southeast Coordinator
                </p>
                <p className="text-xs text-ink-muted">NACOS Nigeria</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Portrait (Desktop) */}
          <motion.div
            variants={itemVariants}
            className="hidden items-center justify-center lg:flex lg:col-span-5"
          >
            <EditorialPortrait />
          </motion.div>
        </motion.div>

        {/* Bottom Scroll Cue */}
        <div className="mt-12 flex items-center justify-between border-t border-[rgba(243,242,238,0.08)] pt-6 sm:mt-16">
          <button
            type="button"
            onClick={() => scrollTo("#my-story")}
            className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-secondary transition-colors hover:text-lime cursor-pointer"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(243,242,238,0.16)] transition-colors group-hover:border-lime">
              <ArrowDown
                className="h-3.5 w-3.5 motion-safe:animate-bounce"
                aria-hidden="true"
              />
            </span>
            <span>Explore My Journey</span>
          </button>

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
            Chronicle
          </span>
        </div>
      </Container>
    </section>
  );
}
