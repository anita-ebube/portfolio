"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StatusBeacon } from "@/components/ui/StatusBeacon";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { EASE_EDITORIAL, usePrefersReducedMotion } from "@/lib/motion";
import { SITE_IDENTITY } from "@/lib/portfolio-data";
import { useSectionTransition } from "@/components/portfolio/SectionTransitionContext";

const HEADLINE_LINES = ["I turn ideas", "into digital", "experiences."] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE_EDITORIAL,
    },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: EASE_EDITORIAL,
    },
  },
};

const stageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: EASE_EDITORIAL,
    },
  },
};

export function HomeScene() {
  const scrollProgressRef = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { goToSection, nextSection, activeSection } = useSectionTransition();
  const isHeroActive = activeSection === 0;

  return (
    <section
      id="home"
      aria-label="Scene 01: Home"
      className="relative flex h-[100svh] w-full flex-col justify-between overflow-hidden bg-canvas bg-architectural-grid pt-[var(--nav-height)] select-none"
    >
      {/* Atmospheric Radial Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-hero-vignette"
      />

      <Container className="relative z-20 flex flex-1 flex-col justify-between py-3 sm:py-5 lg:py-6">
        

        {/* Center Stage: Balanced Editorial Composition */}
        <div className="my-auto grid grid-cols-1 items-center gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left Column: Purposeful Branding, Editorial Typography & CTAs */}
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            variants={containerVariants}
            className="flex flex-col lg:col-span-6 xl:col-span-7"
          >
            {/* Purposeful Introductory Discipline Lockup */}
            <motion.div
              variants={itemVariants}
              className="inline-flex max-w-full items-center gap-2 self-start rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md"
            >
              {/* <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime animate-pulse" /> */}
              <p className="font-mono text-[9.5px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-lime">
                <span className="sm:hidden">PM × FE // PRODUCT &amp; FRONTEND</span>
                <span className="hidden sm:inline">PRODUCT MANAGER × FRONTEND DEVELOPER</span>
              </p>
            </motion.div>

            {/* Oversized Masked Editorial Headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-3 font-display text-[clamp(2.15rem,5.2vw,4.8rem)] font-bold leading-[0.96] tracking-[-0.035em] text-ink sm:mt-4"
            >
              <span className="block text-ink">I turn ideas</span>
              <span className="block text-ink">into digital</span>
              <span className="block text-lime">experiences.</span>
            </motion.h1>

            {/* Mobile-only 3D Sculpture Placement */}
            <motion.div
              variants={stageVariants}
              className="relative my-2 flex h-[190px] w-full items-center justify-center sm:h-[220px] lg:hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,255,0,0.09)_0%,rgba(243,242,238,0.03)_34%,transparent_68%)]"
              />
              <HeroCanvas
                scrollProgressRef={scrollProgressRef}
                isActive={isHeroActive}
              />
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              variants={itemVariants}
              className="mt-1 max-w-[44ch] text-[14px] leading-[1.55] text-ink-secondary sm:text-[15.5px] lg:text-[17px]"
            >
              {SITE_IDENTITY.heroSupporting}
            </motion.p>

            {/* CTA Pair with Section Transition Triggers */}
            <motion.div
              variants={itemVariants}
              className="mt-4 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:items-center sm:gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowUpRight className="h-4 w-4" />}
                onClick={() => goToSection(4)}
              >
                Explore Selected Work
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={<ArrowUpRight className="h-4 w-4" />}
                onClick={() => goToSection(5)}
              >
                Let&apos;s Connect
              </Button>
            </motion.div>
          </motion.div>

          {/* Desktop Right Column: Focused 3D Sculpture Stage */}
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            variants={stageVariants}
            className="relative hidden items-center justify-center lg:flex lg:col-span-6 xl:col-span-5"
          >
            <div className="relative h-[440px] xl:h-[500px] w-full">
              {/* Subtle radial spotlight framing the chrome artwork */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,255,0,0.08)_0%,rgba(243,242,238,0.028)_32%,transparent_68%)]"
              />
              <HeroCanvas
                scrollProgressRef={scrollProgressRef}
                isActive={isHeroActive}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Architectural Bar & Advance Trigger */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={itemVariants}
          className="hairline-t flex items-center justify-between gap-4 pt-3 sm:pt-4"
        >
          <button
            type="button"
            onClick={nextSection}
            className="group inline-flex items-center gap-3 text-left font-mono text-[11px] uppercase tracking-[0.2em] text-ink-secondary transition-colors hover:text-lime cursor-pointer"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(243,242,238,0.16)] transition-colors group-hover:border-lime group-hover:bg-lime/10">
              <ArrowDown
                className="h-3.5 w-3.5 motion-safe:animate-bounce text-lime"
                aria-hidden="true"
              />
            </span>
            <span>Scroll or click to advance to About</span>
          </button>

          <div className="hidden sm:flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
              INTERACTIVE 3D · DRAG TO ORBIT
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
