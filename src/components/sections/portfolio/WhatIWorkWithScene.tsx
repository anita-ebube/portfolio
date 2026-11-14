"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight, Code2, Compass, Layers, Sparkles, Terminal, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WHAT_I_WORK_WITH } from "@/lib/portfolio-data";
import { EASE_EDITORIAL, usePrefersReducedMotion } from "@/lib/motion";
import { useSectionTransition } from "@/components/portfolio/SectionTransitionContext";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_EDITORIAL,
    },
  },
};

export function WhatIWorkWithScene() {
  const [mobileActiveCategory, setMobileActiveCategory] = useState<"frontend" | "product">("frontend");
  const prefersReducedMotion = usePrefersReducedMotion();
  const { goToSection, nextSection } = useSectionTransition();

  const frontendData = WHAT_I_WORK_WITH.find((c) => c.id === "frontend") || WHAT_I_WORK_WITH[0];
  const productData = WHAT_I_WORK_WITH.find((c) => c.id === "product") || WHAT_I_WORK_WITH[1];

  return (
    <section
      id="work-with"
      aria-label="Scene 04: What I Work With"
      className="relative flex h-[100svh] w-full flex-col justify-between overflow-hidden bg-canvas bg-architectural-grid pt-[var(--nav-height)] select-none"
    >
      {/* Ambient Lighting Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(200,255,0,0.06)_0%,transparent_70%)] blur-3xl z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-1/4 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(110,231,183,0.05)_0%,transparent_70%)] blur-3xl z-10"
      />

      <Container className="relative z-20 flex flex-1 flex-col justify-between py-2 sm:py-3 lg:py-4 h-[calc(100svh-var(--nav-height))]">
        {/* Top Meta Bar */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={itemVariants}
          className="flex items-center justify-between gap-3 pb-2 border-b border-[rgba(243,242,238,0.08)]"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-lime font-semibold">
              04 // WHAT I WORK WITH
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            BALANCED CAPABILITIES · FRONTEND ENGINEERING × PRODUCT MANAGEMENT
          </span>
        </motion.div>

        {/* Section Header & Positioning Statement */}
        <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">
              What I Work With
            </h2>
            <p className="mt-0.5 text-xs sm:text-[13.5px] text-ink-secondary max-w-2xl leading-relaxed">
              Equally balanced across frontend engineering and product management craft.
            </p>
          </div>

          {/* Mobile Category Segmented Control (Only visible on small viewports) */}
          <div className="flex sm:hidden items-center rounded-full border border-[rgba(243,242,238,0.12)] bg-[rgba(13,15,18,0.8)] p-1 backdrop-blur-md self-start">
            <button
              type="button"
              onClick={() => setMobileActiveCategory("frontend")}
              className={`relative px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                mobileActiveCategory === "frontend" ? "text-canvas font-bold" : "text-ink-secondary"
              }`}
            >
              {mobileActiveCategory === "frontend" && (
                <motion.span
                  layoutId="mobile-skill-pill"
                  className="absolute inset-0 rounded-full bg-lime"
                  transition={{ duration: 0.2 }}
                />
              )}
              <span className="relative z-10">01 Frontend (14)</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileActiveCategory("product")}
              className={`relative px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                mobileActiveCategory === "product" ? "text-canvas font-bold" : "text-ink-secondary"
              }`}
            >
              {mobileActiveCategory === "product" && (
                <motion.span
                  layoutId="mobile-skill-pill"
                  className="absolute inset-0 rounded-full bg-[#6ee7b7]"
                  transition={{ duration: 0.2 }}
                />
              )}
              <span className="relative z-10">02 Product (13)</span>
            </button>
          </div>
        </div>

        {/* Dual Major Visual Groups: 50/50 Balanced Presentation */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 items-stretch">
          {/* GROUP 1: FRONTEND DEVELOPMENT */}
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            variants={containerVariants}
            className={`flex flex-col justify-between rounded-2xl border border-[rgba(243,242,238,0.12)] bg-[rgba(13,15,18,0.72)] p-3.5 sm:p-4 lg:p-5 backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:border-[rgba(200,255,0,0.4)] ${
              mobileActiveCategory === "frontend" ? "block" : "hidden sm:flex"
            }`}
          >
            {/* Ambient Corner Accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-lime/10 blur-xl"
            />

            <div className="space-y-3 sm:space-y-4">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-[rgba(243,242,238,0.08)] pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[rgba(200,255,0,0.12)] text-lime">
                    <Code2 className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-lime font-bold">
                      01 // ENGINEERING
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-bold text-ink leading-tight">
                      Frontend Development
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink-muted rounded-full border border-[rgba(243,242,238,0.1)] px-2.5 py-0.5 bg-canvas/60">
                  14 Technologies
                </span>
              </div>

              {/* Subgroup 1: Languages and Frontend Technologies */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="h-1 w-1 rounded-full bg-lime animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                    LANGUAGES &amp; FRONTEND TECHNOLOGIES
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {frontendData.subgroups[0].skills.map((tech) => (
                    <motion.div
                      key={tech}
                      variants={itemVariants}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -1 }}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-[rgba(243,242,238,0.14)] bg-[rgba(18,21,26,0.85)] px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs font-mono font-medium text-ink transition-all duration-200 hover:border-lime hover:bg-[rgba(200,255,0,0.08)] hover:text-lime cursor-default shadow-sm"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-lime/60 group-hover:bg-lime group-hover:shadow-[0_0_8px_#c8ff00] transition-colors" />
                      <span>{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Subgroup 2: Backend, Databases and Development Tools */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="h-1 w-1 rounded-full bg-ink-muted" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                    BACKEND, DATABASES &amp; TOOLS
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {frontendData.subgroups[1].skills.map((tech) => (
                    <motion.div
                      key={tech}
                      variants={itemVariants}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -1 }}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-[rgba(243,242,238,0.12)] bg-[rgba(15,17,21,0.8)] px-3 py-1 sm:px-3 sm:py-1.5 text-xs font-mono font-medium text-ink-secondary transition-all duration-200 hover:border-ink-secondary hover:text-ink hover:bg-[rgba(243,242,238,0.06)] cursor-default shadow-sm"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-ink transition-colors" />
                      <span>{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Technical Telemetry */}
            <div className="mt-3 sm:mt-4 pt-2.5 border-t border-[rgba(243,242,238,0.06)] flex items-center justify-between font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink-muted">
              <span>ARCHITECTURE // MODULAR · REACTIVE · ACCESSIBLE</span>
              <span className="text-lime">CODE READY</span>
            </div>
          </motion.div>

          {/* GROUP 2: PRODUCT MANAGEMENT */}
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            variants={containerVariants}
            className={`flex flex-col justify-between rounded-2xl border border-[rgba(243,242,238,0.12)] bg-[rgba(13,15,18,0.72)] p-3.5 sm:p-4 lg:p-5 backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:border-[rgba(110,231,183,0.4)] ${
              mobileActiveCategory === "product" ? "block" : "hidden sm:flex"
            }`}
          >
            {/* Ambient Corner Accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-[#6ee7b7]/10 blur-xl"
            />

            <div className="space-y-3 sm:space-y-4">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-[rgba(243,242,238,0.08)] pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[rgba(110,231,183,0.12)] text-[#6ee7b7]">
                    <Compass className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6ee7b7] font-bold">
                      02 // STRATEGY
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-bold text-ink leading-tight">
                      Product Management
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink-muted rounded-full border border-[rgba(243,242,238,0.1)] px-2.5 py-0.5 bg-canvas/60">
                  13 Capabilities &amp; Tools
                </span>
              </div>

              {/* Subgroup 1: Product Management Capabilities */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="h-1 w-1 rounded-full bg-[#6ee7b7] animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                    PRODUCT MANAGEMENT CAPABILITIES
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {productData.subgroups[0].skills.map((skill) => (
                    <motion.div
                      key={skill}
                      variants={itemVariants}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -1 }}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-[rgba(243,242,238,0.14)] bg-[rgba(18,21,26,0.85)] px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs font-sans font-medium text-ink transition-all duration-200 hover:border-[#6ee7b7] hover:bg-[rgba(110,231,183,0.08)] hover:text-[#6ee7b7] cursor-default shadow-sm"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#6ee7b7]/60 group-hover:bg-[#6ee7b7] group-hover:shadow-[0_0_8px_#6ee7b7] transition-colors" />
                      <span>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Subgroup 2: Product Management Tools */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="h-1 w-1 rounded-full bg-[#6ee7b7]" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                    PRODUCT MANAGEMENT TOOLS
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {productData.subgroups[1].skills.map((tool) => (
                    <motion.div
                      key={tool}
                      variants={itemVariants}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -1 }}
                      className="group inline-flex items-center gap-2 rounded-full border border-[rgba(110,231,183,0.3)] bg-[rgba(110,231,183,0.06)] px-4 py-1.5 text-xs font-display font-semibold text-ink transition-all duration-200 hover:border-[#6ee7b7] hover:bg-[rgba(110,231,183,0.14)] hover:text-[#6ee7b7] cursor-default shadow-sm"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#6ee7b7] shadow-[0_0_6px_#6ee7b7]" />
                      <span>{tool}</span>
                      <span className="font-mono text-[9px] uppercase text-[#6ee7b7]/80">
                        {tool === "ClickUp" ? "Sprint / Backlog" : "Design / Spec"}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Strategy Telemetry */}
            <div className="mt-3 sm:mt-4 pt-2.5 border-t border-[rgba(243,242,238,0.06)] flex items-center justify-between font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink-muted">
              <span>DISCIPLINE // HUMAN-CENTERED · HYPOTHESIS-DRIVEN</span>
              <span className="text-[#6ee7b7]">EXECUTION READY</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar: Action to Advance / Return */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={itemVariants}
          className="border-t border-[rgba(243,242,238,0.08)] flex items-center justify-between pt-2 sm:pt-2.5"
        >
          <button
            type="button"
            onClick={nextSection}
            className="group inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-secondary hover:text-lime transition-colors cursor-pointer"
          >
            <span>Proceed to Selected Projects</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-lime transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={() => goToSection(2)}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted hover:text-ink transition-colors cursor-pointer"
          >
            ↑ Back to Experience
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
