"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StatusBeacon } from "@/components/ui/StatusBeacon";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { EASE_EDITORIAL, usePrefersReducedMotion } from "@/lib/motion";
import { SITE_IDENTITY } from "@/lib/navigation";

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

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgressRef = useRef(0);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollTo } = useSmoothScroll();

  // Track hero scroll progress without triggering React re-renders
  useEffect(() => {
    const updateScrollProgress = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = Math.max(section.offsetHeight, 1);
      const progress = Math.min(Math.max(-rect.top / total, 0), 1);
      scrollProgressRef.current = progress;

      if (scrollTrackRef.current) {
        scrollTrackRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Hero"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-canvas bg-architectural-grid pt-[var(--nav-height)]"
    >
      {/* Atmospheric Radial Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-hero-vignette"
      />

      <Container className="relative z-20 flex flex-1 flex-col justify-between py-5 sm:py-7 lg:py-8">
        {/* Top Meta Bar: Status Beacon & Stage Tag */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={itemVariants}
          className="flex flex-wrap items-center justify-between gap-3 pb-3 sm:pb-4"
        >
          <StatusBeacon label={SITE_IDENTITY.statusLabel} />
          
        </motion.div>

        {/* Center Stage: Balanced Editorial Composition */}
        <div className="my-auto grid grid-cols-1 items-center gap-6 py-2 sm:gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Left Column: Purposeful Branding, Editorial Typography & CTAs */}
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            variants={containerVariants}
            className="flex flex-col lg:col-span-6 xl:col-span-7"
          >
            {/* Purposeful Introductory Discipline Lockup (Elevates PM × FE without repeating name) */}
            <motion.div
              variants={itemVariants}
              className="inline-flex max-w-full items-center gap-2 self-start rounded-full border border-[rgba(200,255,0,0.32)] bg-[rgba(200,255,0,0.06)] px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime animate-pulse" />
              <p className="font-mono text-[9.5px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-lime">
                <span className="sm:hidden">PM × FE // PRODUCT &amp; FRONTEND</span>
                <span className="hidden sm:inline">PRODUCT MANAGEMENT × FRONTEND DEVELOPER</span>
              </p>
            </motion.div>

            {/* Oversized Masked Editorial Headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-3.5 font-display text-[clamp(2.35rem,5.4vw,5.1rem)] font-bold leading-[0.96] tracking-[-0.035em] text-ink sm:mt-5"
            >
              <span className="sr-only">{SITE_IDENTITY.headline}</span>
              {HEADLINE_LINES.map((line, index) => (
                <span
                  key={line}
                  aria-hidden="true"
                  className="block overflow-hidden pb-[0.06em]"
                >
                  <motion.span
                    variants={lineVariants}
                    className={`block ${
                      index === 2 ? "text-lime" : "text-ink"
                    }`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* Mobile-only 3D Sculpture Placement: Intentionally framed between headline & copy */}
            <motion.div
              variants={stageVariants}
              className="relative my-3 flex h-[210px] w-full items-center justify-center sm:h-[250px] lg:hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,255,0,0.09)_0%,rgba(243,242,238,0.03)_34%,transparent_68%)]"
              />
              <HeroCanvas scrollProgressRef={scrollProgressRef} />
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              variants={itemVariants}
              className="max-w-[42ch] text-[15px] leading-[1.6] text-ink-secondary sm:text-base lg:text-lg"
            >
              {SITE_IDENTITY.supportingCopy}
            </motion.p>

            {/* CTA Pair with Comfortable Breathing Room */}
            <motion.div
              variants={itemVariants}
              className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-4"
            >
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
            </motion.div>
          </motion.div>

          {/* Desktop Right Column: Focused 3D Sculpture Stage */}
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            variants={stageVariants}
            className="relative hidden items-center justify-center lg:flex lg:col-span-6 xl:col-span-5"
          >
            <div className="relative h-[480px] xl:h-[540px] w-full">
              {/* Subtle radial spotlight framing the chrome artwork */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,255,0,0.08)_0%,rgba(243,242,238,0.028)_32%,transparent_68%)]"
              />
              <HeroCanvas scrollProgressRef={scrollProgressRef} />
            </div>
          </motion.div>
        </div>

        {/* Bottom Architectural Bar & Scroll Indicator */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={itemVariants}
          className="hairline-t flex items-center justify-between gap-4 pt-4 sm:pt-5"
        >
          <button
            type="button"
            onClick={() => scrollTo("#foundation-index")}
            className="group inline-flex items-center gap-3 text-left font-mono text-[11px] uppercase tracking-[0.2em] text-ink-secondary transition-colors hover:text-lime cursor-pointer"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(243,242,238,0.16)] transition-colors group-hover:border-lime">
              <ArrowDown
                className="h-3.5 w-3.5 motion-safe:animate-bounce"
                aria-hidden="true"
              />
            </span>
            <span>Scroll to explore</span>
          </button>

          <div className="hidden sm:flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
              MOVE CURSOR TO ORBIT
            </span>
            <div
              aria-hidden="true"
              className="h-[2px] w-24 overflow-hidden rounded-full bg-[rgba(243,242,238,0.12)]"
            >
              <div
                ref={scrollTrackRef}
                className="h-full w-full origin-left scale-x-0 bg-lime transition-transform duration-75"
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
