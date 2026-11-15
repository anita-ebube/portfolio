"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EditorialPortrait } from "@/components/about/EditorialPortrait";
import { EASE_EDITORIAL, usePrefersReducedMotion } from "@/lib/motion";
import { SITE_IDENTITY } from "@/lib/portfolio-data";
import { useSectionTransition } from "@/components/portfolio/SectionTransitionContext";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
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

export function AboutScene() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { goToSection, nextSection } = useSectionTransition();

  return (
    <section
      id="about"
      aria-label="Scene 02: About"
      className="relative flex h-[100svh] w-full flex-col justify-between overflow-hidden bg-canvas bg-architectural-grid pt-[var(--nav-height)] select-none"
    >
      {/* Ambient Lighting Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(200,255,0,0.06)_0%,transparent_70%)] blur-3xl"
      />

      <Container className="relative z-20 flex flex-1 flex-col justify-between py-3 sm:py-5 lg:py-6">
        {/* Top Meta Bar */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={itemVariants}
          className="flex items-center justify-between gap-3 pb-2 sm:pb-3 border-b border-[rgba(243,242,238,0.08)]"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-lime">
              About
            </span>
          </div>
        </motion.div>

        {/* Center Stage: Balanced 2-Column Editorial Spread */}
        <div className="my-auto grid grid-cols-1 items-center gap-3 sm:gap-6 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Left Column: Architectural Portrait Frame */}
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            variants={itemVariants}
            className="flex flex-col items-center justify-center lg:col-span-5"
          >
            <div className="w-full max-w-[160px] sm:max-w-[300px] lg:max-w-[360px] xl:max-w-[390px]">
              <EditorialPortrait />
            
            </div>
          </motion.div>

          {/* Right Column: Editorial Bio, Philosophy & Credential Badges */}
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            variants={containerVariants}
            className="flex flex-col lg:col-span-7"
          >
            {/* Main Statement */}
            <motion.h2
              variants={itemVariants}
              className="font-display text-[clamp(1.35rem,3.2vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink"
            >
              Hi, I&apos;m <span className="text-lime">Anita Ugoebillah.</span>
            </motion.h2>

            {/* Narrative Body Copy */}
            <motion.div
              variants={itemVariants}
              className="mt-2 sm:mt-4 space-y-1.5 sm:space-y-2.5 text-[13px] sm:text-[15px] lg:text-[16px] leading-[1.6] text-ink-secondary"
            >
              <p>
                I&apos;m a Computer Science graduate from the University of Nigeria, Nsukka (UNN) working across product management and frontend engineering. I talk directly with users, write clear technical specifications, and build responsive web applications in React.
              </p>
              <p className="hidden sm:block">
                From streamlining student dues and clearance verification for NACOS to shipping customer-facing ordering and reservation systems for SilentKrowd, I focus on building software that solves concrete problems for real people.
              </p>
            </motion.div>

            {/* Monumental Philosophy Card */}
            <motion.div
              variants={itemVariants}
              className="mt-2.5 sm:mt-4 relative overflow-hidden rounded-xl border border-[rgba(200,255,0,0.28)] bg-[rgba(200,255,0,0.04)] p-2.5 sm:p-4 backdrop-blur-md"
            >
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-lime/10 blur-2xl"
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-lime font-semibold">
                WORKING PRINCIPLE
              </span>
              <p className="mt-0.5 sm:mt-1 font-display text-[13.5px] sm:text-[16.5px] font-semibold text-ink leading-[1.35]">
                &ldquo;{SITE_IDENTITY.philosophy}&rdquo;
              </p>
            </motion.div>

            {/* Prominent DOWNLOAD CV ↗ Callout */}
            <motion.div
              variants={itemVariants}
              className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              <a
                href="/CV.pdf"
                download="Anita_Ugoebillah_CV.pdf"
                className="group relative inline-flex items-center gap-2 rounded-full bg-lime px-4 sm:px-5 py-2 sm:py-2.5 font-display text-[11px] sm:text-xs font-bold uppercase tracking-wider text-canvas shadow-[0_0_24px_rgba(200,255,0,0.32)] transition-all duration-300 hover:bg-[#d6ff38] hover:shadow-[0_0_36px_rgba(200,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                aria-label="Download Anita's CV (PDF)"
              >
                <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-canvas transition-transform duration-300 group-hover:translate-y-0.5" />
                <span>DOWNLOAD CV</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(243,242,238,0.18)] bg-[rgba(13,15,18,0.65)] px-3.5 py-2 font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.16em] text-ink-secondary backdrop-blur-md transition-colors duration-200 hover:border-lime hover:text-lime cursor-pointer"
                aria-label="Open Anita's CV in new browser tab"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>View CV ↗</span>
              </a>

              <span className="hidden xl:inline-block font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">
                PDF · 136 KB
              </span>
            </motion.div>

           
          </motion.div>
        </div>

        {/* Bottom Bar: Action to advance */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={itemVariants}
          className="border-t border-[rgba(243,242,238,0.08)] flex items-center justify-between pt-2.5 sm:pt-3"
        >
          <button
            type="button"
            onClick={nextSection}
            className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-ink-secondary hover:text-lime transition-colors cursor-pointer"
          >
            <span>View Experience</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-lime transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={() => goToSection(0)}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted hover:text-ink transition-colors cursor-pointer"
          >
            ↑ Back to Home
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
