"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  EDUCATION_DATA,
  LEADERSHIP_DATA,
  ACHIEVEMENTS_DATA,
} from "@/lib/portfolio-data";
import { EASE_EDITORIAL, usePrefersReducedMotion } from "@/lib/motion";
import { useSectionTransition } from "@/components/portfolio/SectionTransitionContext";

export function ExperienceScene() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { goToSection, nextSection, activeSection } = useSectionTransition();
  const isActive = activeSection === 2;

  // Staggered word reveal for COMPUTER SCIENCE
  const wordRevealVariants: Variants = {
    hidden: { y: "115%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.85,
        delay: prefersReducedMotion ? 0 : 0.2 + i * 0.15,
        ease: EASE_EDITORIAL,
      },
    }),
  };

  // Horizontal line drawing variant
  const lineDrawVariants: Variants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: (delay: number) => ({
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.8,
        delay: prefersReducedMotion ? 0 : delay,
        ease: EASE_EDITORIAL,
      },
    }),
  };

  // Vertical timeline progression line
  const verticalLineVariants: Variants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.85,
        delay: prefersReducedMotion ? 0 : 0.5,
        ease: EASE_EDITORIAL,
      },
    },
  };

  // Column entrance variants
  const columnVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.7,
        delay: prefersReducedMotion ? 0 : 0.1 + i * 0.14,
        ease: EASE_EDITORIAL,
      },
    }),
  };

  // Staggered child item
  const childItemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: EASE_EDITORIAL,
      },
    }),
  };

  return (
    <section
      id="experience"
      aria-label="Scene 03: Education, Leadership & Achievements"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-canvas bg-architectural-grid py-12 sm:py-16 lg:py-20"
    >
      {/* Ambient Lighting Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(200,255,0,0.05)_0%,transparent_70%)] blur-3xl"
      />

      <Container className="relative z-20 flex flex-1 flex-col justify-between py-2 sm:py-4">
        {/* Top Meta Bar */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={childItemVariants}
          custom={0.05}
          className="flex items-center justify-between gap-3 pb-2 sm:pb-3 border-b border-[rgba(243,242,238,0.08)]"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-lime">
              Experience
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Education · Leadership · Achievements
          </span>
        </motion.div>

        {/* Center Stage: 3 Monumental Architectural Milestones */}
        <div className="my-auto w-full py-2">
          {/* Connecting Timeline Axis Rail across Desktop */}
          <div className="hidden lg:grid grid-cols-3 gap-6 xl:gap-8 px-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-lime ring-4 ring-lime/20" />
              <div className="h-[1px] flex-1 bg-gradient-to-r from-lime/50 to-lime/20" />
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-lime ring-4 ring-lime/20" />
              <div className="h-[1px] flex-1 bg-gradient-to-r from-lime/50 to-lime/20" />
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-lime ring-4 ring-lime/20" />
              <div className="h-[1px] flex-1 bg-gradient-to-r from-lime/50 to-lime/20" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-6 xl:gap-8 items-stretch">
            {/* ======================================================== */}
            {/* EDUCATION */}
            {/* ======================================================== */}
            <motion.div
              initial={prefersReducedMotion ? false : "hidden"}
              animate={isActive ? "visible" : "hidden"}
              variants={columnVariants}
              custom={0}
              className="group relative flex flex-col justify-between rounded-2xl border border-[rgba(243,242,238,0.1)] bg-[rgba(13,15,18,0.65)] p-5 sm:p-6 lg:p-7 backdrop-blur-xl hover:border-[rgba(243,242,238,0.22)] transition-colors duration-300 min-h-[310px] lg:min-h-[370px]"
            >
              {/* Subtle top edge metallic glow */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-lime/50 to-transparent" />

              <div>
                {/* Header Lockup */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-lime flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    Education
                  </span>
                  <motion.span
                    variants={childItemVariants}
                    custom={0.18}
                    className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-ink-muted px-2.5 py-0.5 rounded-full border border-[rgba(243,242,238,0.12)] bg-canvas/80 shrink-0"
                  >
                    {EDUCATION_DATA.period}
                  </motion.span>
                </div>

                {/* Animated Accent Line */}
                <motion.div
                  variants={lineDrawVariants}
                  custom={0.25}
                  style={{ originX: 0 }}
                  className="h-[1px] w-full bg-gradient-to-r from-lime/70 via-lime/20 to-transparent my-3 sm:my-4"
                />

                {/* Oversized Masked Typography: COMPUTER SCIENCE as a single semantic h2 */}
                <h2 className="font-display text-[clamp(1.5rem,2.15vw,2.35rem)] font-extrabold tracking-tight uppercase leading-[0.96] space-y-0.5 mt-2 sm:mt-3">
                  <span className="block overflow-hidden">
                    <motion.span
                      custom={0}
                      variants={wordRevealVariants}
                      className="block text-ink"
                    >
                      COMPUTER
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span
                      custom={1}
                      variants={wordRevealVariants}
                      className="block text-lime"
                    >
                      SCIENCE
                    </motion.span>
                  </span>
                </h2>

                {/* Institution & Degree */}
                <motion.div
                  variants={childItemVariants}
                  custom={0.42}
                  className="mt-4 sm:mt-5 space-y-1.5"
                >
                  <div className="font-display text-[15px] sm:text-[16px] xl:text-[17px] font-semibold text-ink leading-snug">
                    {EDUCATION_DATA.institution}
                  </div>
                  <div className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.16em] text-lime font-medium">
                    {EDUCATION_DATA.degree}
                  </div>
                </motion.div>
              </div>

              {/* Graduation Note */}
              <motion.div
                variants={childItemVariants}
                custom={0.52}
                className="mt-6 pt-3.5 border-t border-[rgba(243,242,238,0.08)]"
              >
                <p className="text-[12px] sm:text-[13px] text-ink-secondary leading-relaxed">
                  {EDUCATION_DATA.summary}
                </p>
              </motion.div>
            </motion.div>

            {/* ======================================================== */}
            {/* LEADERSHIP */}
            {/* ======================================================== */}
            <motion.div
              initial={prefersReducedMotion ? false : "hidden"}
              animate={isActive ? "visible" : "hidden"}
              variants={columnVariants}
              custom={1}
              className="group relative flex flex-col justify-between rounded-2xl border border-[rgba(243,242,238,0.1)] bg-[rgba(13,15,18,0.65)] p-5 sm:p-6 lg:p-7 backdrop-blur-xl hover:border-[rgba(243,242,238,0.22)] transition-colors duration-300 min-h-[310px] lg:min-h-[370px]"
            >
              {/* Subtle top edge metallic glow */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-lime/50 to-transparent" />

              <div>
                {/* Header Lockup */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-lime flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    Leadership
                  </span>
                </div>

                {/* Animated Accent Line */}
                <motion.div
                  variants={lineDrawVariants}
                  custom={0.32}
                  style={{ originX: 0 }}
                  className="h-[1px] w-full bg-gradient-to-r from-lime/70 via-lime/20 to-transparent my-3 sm:my-4"
                />

                {/* Two NACOS Positions with Animated Timeline Progression */}
                <div className="relative mt-4 sm:mt-5 space-y-5">
                  {/* Position 01: Vice President — NACOS UNN */}
                  <motion.div
                    variants={childItemVariants}
                    custom={0.42}
                    className="relative pl-6 sm:pl-7"
                  >
                    {/* Node 1 */}
                    <div className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-lime ring-4 ring-lime/20" />
                    </div>

                    <h3 className="font-display text-[18px] sm:text-[20px] xl:text-[22px] font-bold text-ink leading-tight">
                      {LEADERSHIP_DATA[0].role}
                    </h3>
                    <div className="font-mono text-[12px] sm:text-[13px] font-semibold text-lime uppercase tracking-wider mt-1">
                      {LEADERSHIP_DATA[0].organization}
                    </div>
                  </motion.div>

                  {/* Connecting Timeline Trace Line */}
                  <div className="relative pl-6 sm:pl-7 py-0.5">
                    <motion.div
                      variants={verticalLineVariants}
                      style={{ originY: 0 }}
                      className="absolute left-[7px] -top-2.5 -bottom-2.5 w-[1.5px] bg-gradient-to-b from-lime via-lime/40 to-lime"
                    />
                  </div>

                  {/* Position 02: Assistant Zonal Coordinator — NACOS */}
                  <motion.div
                    variants={childItemVariants}
                    custom={0.62}
                    className="relative pl-6 sm:pl-7"
                  >
                    {/* Node 2 */}
                    <div className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center">
                      <span className="h-2.5 w-2.5 rounded-full border-2 border-lime bg-lime/40 ring-4 ring-lime/10" />
                    </div>

                    <h3 className="font-display text-[18px] sm:text-[20px] xl:text-[22px] font-bold text-ink leading-tight">
                      {LEADERSHIP_DATA[1].role}
                    </h3>
                    <div className="font-mono text-[12px] sm:text-[13px] font-semibold text-lime uppercase tracking-wider mt-1">
                      {LEADERSHIP_DATA[1].organization}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Minimalist balanced footer spacing */}
              <div className="mt-6 pt-3.5 border-t border-[rgba(243,242,238,0.08)] opacity-0">
                <span className="text-[12px] leading-relaxed select-none">.</span>
              </div>
            </motion.div>

            {/* ======================================================== */}
            {/* ACHIEVEMENTS */}
            {/* ======================================================== */}
            <motion.div
              initial={prefersReducedMotion ? false : "hidden"}
              animate={isActive ? "visible" : "hidden"}
              variants={columnVariants}
              custom={2}
              className="group relative flex flex-col justify-between rounded-2xl border border-[rgba(243,242,238,0.1)] bg-[rgba(13,15,18,0.65)] p-5 sm:p-6 lg:p-7 backdrop-blur-xl hover:border-[rgba(243,242,238,0.22)] transition-colors duration-300 min-h-[310px] lg:min-h-[370px]"
            >
              {/* Subtle top edge metallic glow */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-lime/50 to-transparent" />

              <div>
                {/* Header Lockup */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-lime flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    Achievements
                  </span>
                </div>

                {/* Animated Accent Line */}
                <motion.div
                  variants={lineDrawVariants}
                  custom={0.42}
                  style={{ originX: 0 }}
                  className="h-[1px] w-full bg-gradient-to-r from-lime/70 via-lime/20 to-transparent my-3 sm:my-4"
                />

                {/* Two Distinct Finalist Achievements */}
                <div className="mt-4 sm:mt-5 space-y-4">
                  {/* Achievement 01: HNG Finalist — Product Management I16 */}
                  <motion.div
                    variants={childItemVariants}
                    custom={0.52}
                    className="group/item relative overflow-hidden rounded-xl border border-[rgba(243,242,238,0.12)] bg-[rgba(20,24,30,0.55)] p-4 sm:p-4.5 backdrop-blur-md hover:border-lime/40 hover:bg-[rgba(200,255,0,0.03)] transition-all duration-300"
                  >
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-lime/60 to-transparent opacity-60 group-hover/item:opacity-100 transition-opacity" />
                    <h3 className="font-display text-[17px] sm:text-[19px] xl:text-[20px] font-bold text-ink leading-tight">
                      {ACHIEVEMENTS_DATA[0].title}
                    </h3>
                    <div className="font-mono text-[11.5px] sm:text-[12.5px] text-lime font-medium uppercase tracking-wider mt-1">
                      {ACHIEVEMENTS_DATA[0].track}
                    </div>
                  </motion.div>

                  {/* Achievement 02: Web3 Bridge — Frontend Track Finalist */}
                  <motion.div
                    variants={childItemVariants}
                    custom={0.68}
                    className="group/item relative overflow-hidden rounded-xl border border-[rgba(243,242,238,0.12)] bg-[rgba(20,24,30,0.55)] p-4 sm:p-4.5 backdrop-blur-md hover:border-lime/40 hover:bg-[rgba(200,255,0,0.03)] transition-all duration-300"
                  >
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-lime/60 to-transparent opacity-60 group-hover/item:opacity-100 transition-opacity" />
                    <h3 className="font-display text-[17px] sm:text-[19px] xl:text-[20px] font-bold text-ink leading-tight">
                      {ACHIEVEMENTS_DATA[1].title}
                    </h3>
                    <div className="font-mono text-[11.5px] sm:text-[12.5px] text-lime font-medium uppercase tracking-wider mt-1">
                      {ACHIEVEMENTS_DATA[1].track}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Minimalist balanced footer spacing */}
              <div className="mt-6 pt-3.5 border-t border-[rgba(243,242,238,0.08)] opacity-0">
                <span className="text-[12px] leading-relaxed select-none">.</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar: Scene Advancement Triggers */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate={isActive ? "visible" : "hidden"}
          variants={childItemVariants}
          custom={0.65}
          className="border-t border-[rgba(243,242,238,0.08)] flex items-center justify-between pt-2.5 sm:pt-3"
        >
          <button
            type="button"
            onClick={nextSection}
            className="group inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-secondary hover:text-lime transition-colors cursor-pointer"
          >
            <span>Proceed to What I Work With</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-lime transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={() => goToSection(1)}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted hover:text-ink transition-colors cursor-pointer"
          >
            Back to About
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
