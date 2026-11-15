"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Code2, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EASE_EDITORIAL, usePrefersReducedMotion } from "@/lib/motion";
import { useSectionTransition } from "@/components/portfolio/SectionTransitionContext";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: EASE_EDITORIAL,
    },
  },
};

interface KeyProofSkill {
  name: string;
  proof: string;
}

const FRONTEND_PROOF_SKILLS: KeyProofSkill[] = [
  {
    name: "React & Tailwind CSS",
    proof: "Production UI across SilentKrowd, NIHSA, NACOS Dues & System Vet",
  },
  {
    name: "Supabase",
    proof: "Realtime orders, reservation flow & menu sync in SilentKrowd",
  },
  {
    name: "Firebase",
    proof: "Online dues payment & verification pipeline in NACOS Dues",
  },
  {
    name: "Next.js",
    proof: "Component-driven architecture, SSR & high-performance frontend",
  },
];

const FRONTEND_ALL_SKILLS = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "Bootstrap",
  "Vue.js",
  "Laravel",
  "MySQL",
  "Git",
  "GitHub",
];

const PRODUCT_PROOF_SKILLS: KeyProofSkill[] = [
  {
    name: "Requirements Gathering & User Stories",
    proof: "Defined temporary-to-permanent clearance workflows in NACOS Dues",
  },
  {
    name: "Product Roadmapping & Prioritisation",
    proof: "Feature scoping & customer checkout workflows for SilentKrowd",
  },
  {
    name: "Agile & Scrum",
    proof: "Sprint delivery, UX teardowns & iterative execution as HNG Finalist",
  },
  {
    name: "ClickUp & Figma",
    proof: "Backlog management, wireframes, user journeys & developer handoffs",
  },
];

const PRODUCT_ALL_SKILLS = [
  "Product Strategy",
  "Product Discovery",
  "Backlog Management",
  "Sprint Planning",
  "Stakeholder Management",
  "Product Documentation",
];

export function WhatIWorkWithScene() {
  const [mobileActiveCategory, setMobileActiveCategory] = useState<"frontend" | "product">("frontend");
  const prefersReducedMotion = usePrefersReducedMotion();
  const { goToSection, nextSection } = useSectionTransition();

  return (
    <section
      id="work-with"
      aria-label="Scene 04: What I Work With"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-canvas bg-architectural-grid py-12 sm:py-16 lg:py-20"
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

      <Container className="relative z-20 flex flex-1 flex-col justify-between py-2 sm:py-4">
        {/* Top Meta Bar */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={itemVariants}
          className="flex items-center justify-between gap-3 pb-2 border-b border-[rgba(243,242,238,0.08)]"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-lime">
              What I Work With
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Frontend Engineering × Product Management
          </span>
        </motion.div>

        {/* Section Header & Positioning Statement */}
        <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">
              What I Work With
            </h2>
            <p className="mt-0.5 text-xs sm:text-[13.5px] text-ink-secondary max-w-2xl leading-relaxed">
              Capabilities across product management and frontend engineering, verified through shipped production software.
            </p>
          </div>

          {/* Mobile Category Segmented Control (Only visible on small viewports) */}
          <div className="flex sm:hidden items-center rounded-full border border-[rgba(243,242,238,0.12)] bg-[rgba(13,15,18,0.8)] p-1 backdrop-blur-md self-start">
            <button
              type="button"
              onClick={() => setMobileActiveCategory("frontend")}
              className={`relative px-3.5 py-1 font-mono text-[10.5px] uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
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
              <span className="relative z-10">Frontend</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileActiveCategory("product")}
              className={`relative px-3.5 py-1 font-mono text-[10.5px] uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
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
              <span className="relative z-10">Product Management</span>
            </button>
          </div>
        </div>

        {/* Dual Major Visual Groups: Balanced Presentation */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 items-stretch py-2">
          {/* GROUP 1: FRONTEND DEVELOPMENT */}
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            variants={containerVariants}
            className={`flex flex-col justify-between rounded-2xl border border-[rgba(243,242,238,0.12)] bg-[rgba(13,15,18,0.75)] p-4 sm:p-5 lg:p-5.5 backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:border-[rgba(200,255,0,0.35)] ${
              mobileActiveCategory === "frontend" ? "block" : "hidden sm:flex"
            }`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-lime/10 blur-xl"
            />

            <div className="space-y-3.5 sm:space-y-4">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-[rgba(243,242,238,0.08)] pb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgba(200,255,0,0.12)] text-lime">
                    <Code2 className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-ink leading-tight">
                      Frontend Development
                    </h3>
                    <p className="font-mono text-[9.5px] uppercase tracking-wider text-ink-muted">
                      Applied in production software
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Skills Tied Directly to Practical Proof */}
              <div className="space-y-2">
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-lime" />
                  <span>KEY TECHNOLOGIES &amp; SHIPPED PROOF</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {FRONTEND_PROOF_SKILLS.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="group rounded-xl border border-[rgba(243,242,238,0.1)] bg-[rgba(18,21,26,0.7)] p-2.5 sm:p-3 transition-colors hover:border-lime/40 hover:bg-[rgba(200,255,0,0.04)]"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-lime shrink-0" />
                        <span className="font-mono text-xs font-semibold text-ink group-hover:text-lime transition-colors">
                          {item.name}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] sm:text-[11.5px] text-ink-secondary leading-snug">
                        {item.proof}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Complementary Tools & Stack */}
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted flex items-center gap-1.5 mb-2">
                  <span className="h-1 w-1 rounded-full bg-ink-muted" />
                  <span>ADDITIONAL TECHNOLOGIES &amp; TOOLS</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {FRONTEND_ALL_SKILLS.map((tech) => (
                    <motion.span
                      key={tech}
                      variants={itemVariants}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                      className="inline-flex items-center rounded-full border border-[rgba(243,242,238,0.1)] bg-[rgba(15,17,21,0.7)] px-2.5 py-1 text-[11px] font-mono text-ink-secondary hover:text-ink hover:border-[rgba(243,242,238,0.25)] transition-colors cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Real Architecture Context */}
            <div className="mt-3 sm:mt-4 pt-2.5 border-t border-[rgba(243,242,238,0.06)] flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
              <span>Architecture: Modular, component-driven, responsive</span>
              <span className="text-lime">Production Tested</span>
            </div>
          </motion.div>

          {/* GROUP 2: PRODUCT MANAGEMENT */}
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            variants={containerVariants}
            className={`flex flex-col justify-between rounded-2xl border border-[rgba(243,242,238,0.12)] bg-[rgba(13,15,18,0.75)] p-4 sm:p-5 lg:p-5.5 backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:border-[rgba(110,231,183,0.35)] ${
              mobileActiveCategory === "product" ? "block" : "hidden sm:flex"
            }`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-[#6ee7b7]/10 blur-xl"
            />

            <div className="space-y-3.5 sm:space-y-4">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-[rgba(243,242,238,0.08)] pb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgba(110,231,183,0.12)] text-[#6ee7b7]">
                    <Compass className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-ink leading-tight">
                      Product Management
                    </h3>
                    <p className="font-mono text-[9.5px] uppercase tracking-wider text-ink-muted">
                      Validated in real workflows
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Capabilities Tied Directly to Practical Proof */}
              <div className="space-y-2">
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#6ee7b7]" />
                  <span>KEY CAPABILITIES &amp; PRACTICAL PROOF</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRODUCT_PROOF_SKILLS.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="group rounded-xl border border-[rgba(243,242,238,0.1)] bg-[rgba(18,21,26,0.7)] p-2.5 sm:p-3 transition-colors hover:border-[#6ee7b7]/40 hover:bg-[rgba(110,231,183,0.04)]"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#6ee7b7] shrink-0" />
                        <span className="font-mono text-xs font-semibold text-ink group-hover:text-[#6ee7b7] transition-colors">
                          {item.name}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] sm:text-[11.5px] text-ink-secondary leading-snug">
                        {item.proof}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Complementary Capabilities & Tools */}
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted flex items-center gap-1.5 mb-2">
                  <span className="h-1 w-1 rounded-full bg-ink-muted" />
                  <span>ADDITIONAL CAPABILITIES &amp; TOOLS</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {PRODUCT_ALL_SKILLS.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={itemVariants}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                      className="inline-flex items-center rounded-full border border-[rgba(243,242,238,0.1)] bg-[rgba(15,17,21,0.7)] px-2.5 py-1 text-[11px] font-sans text-ink-secondary hover:text-ink hover:border-[rgba(243,242,238,0.25)] transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Real Discipline Context */}
            <div className="mt-3 sm:mt-4 pt-2.5 border-t border-[rgba(243,242,238,0.06)] flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
              <span>Discipline: User discovery, specs &amp; iterative sprints</span>
              <span className="text-[#6ee7b7]">Execution Focused</span>
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
            <span>Proceed to Projects</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-lime transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={() => goToSection(2)}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted hover:text-ink transition-colors cursor-pointer"
          >
            Back to Experience
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
