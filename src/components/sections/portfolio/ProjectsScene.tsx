"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PROJECTS, type ProjectItem } from "@/lib/portfolio-data";
import { EASE_EDITORIAL, usePrefersReducedMotion } from "@/lib/motion";
import { useSectionTransition } from "@/components/portfolio/SectionTransitionContext";
import { FallingTechPillsRain } from "@/components/projects/FallingTechPillsRain";
import { ProjectVisualPreview } from "@/components/projects/ProjectVisualPreview";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_EDITORIAL,
    },
  },
};

export function ProjectsScene() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS[0].id);

  useEffect(() => {
    (window as unknown as { __setSelectedProject?: (id: string) => void }).__setSelectedProject = setSelectedProjectId;
  }, []);

  const selectedProject =
    PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  const prefersReducedMotion = usePrefersReducedMotion();
  const { goToSection, nextSection, activeSection } = useSectionTransition();
  const isActiveSection = activeSection === 4;

  return (
    <section
      id="projects"
      aria-label="Scene 05: Selected Projects"
      className="relative flex h-[100svh] w-full flex-col justify-between overflow-hidden bg-canvas bg-architectural-grid pt-[var(--nav-height)] select-none"
    >
      {/* Continuous Ambient Falling Technology Pills Rain (strictly active project stack) */}
      <FallingTechPillsRain
        technologies={selectedProject.technologies}
        projectId={selectedProject.id}
        isActiveSection={isActiveSection}
      />

      {/* Ambient Lighting Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(200,255,0,0.07)_0%,transparent_70%)] blur-3xl z-10"
      />

      <Container className="relative z-20 flex flex-1 flex-col justify-between py-2 sm:py-4 lg:py-5 h-[calc(100svh-var(--nav-height))]">
        {/* Top Meta Bar */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={itemVariants}
          className="flex items-center justify-between gap-3 pb-2 border-b border-[rgba(243,242,238,0.08)]"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-lime font-semibold">
              Projects
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            4 Shipped Production Projects
          </span>
        </motion.div>

        {/* Center Stage: Minimal, Bold Editorial Showcase */}
        <div className="my-auto grid grid-cols-1 items-center gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Project Information Hierarchy */}
          <div className="flex flex-col lg:col-span-5 xl:col-span-5 z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                className="space-y-3 sm:space-y-4"
              >
                {/* 1. Project Number & Category Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(243,242,238,0.12)] bg-[rgba(13,15,18,0.65)] px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                  <span className="font-semibold text-lime">{selectedProject.number}</span>
                  <span className="text-ink-muted">·</span>
                  <span className="text-ink-secondary">{selectedProject.category}</span>
                </div>

                {/* 2. Project Name — Prominent & Bold */}
                <div>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink">
                    {selectedProject.title}
                  </h2>
                  {selectedProject.fullName && (
                    <p className="font-mono text-[11px] uppercase tracking-wider text-ink-muted mt-1">
                      {selectedProject.fullName}
                    </p>
                  )}
                </div>

                {/* 3. One-Sentence Description */}
                <p className="font-sans text-[13.5px] sm:text-[15px] leading-relaxed text-ink-secondary max-w-[46ch]">
                  {selectedProject.shortDescription}
                </p>

                {/* 5. Falling Technology Pills (Active Project Technology Strip) */}
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-1 w-1 rounded-full bg-lime animate-pulse" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">
                      TECHNOLOGY STACK
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map((tech, idx) => (
                      <div
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(243,242,238,0.16)] bg-[rgba(13,15,18,0.8)] px-3 py-1 backdrop-blur-md transition-all hover:border-[rgba(200,255,0,0.5)] hover:text-lime"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            idx === 0
                              ? "bg-lime shadow-[0_0_6px_#c8ff00]"
                              : "bg-white/60"
                          }`}
                        />
                        <span className="font-mono text-[11px] font-semibold text-ink">
                          {tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. View Project Action (Only if valid URL exists) */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2 sm:pt-3">
                  {selectedProject.links?.demo ? (
                    <Button
                      variant="primary"
                      size="md"
                      icon={<ExternalLink className="h-3.5 w-3.5" />}
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </Button>
                  ) : (
                    <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(243,242,238,0.12)] bg-[rgba(13,15,18,0.65)] px-3.5 py-1.5 font-mono text-[10px] text-ink-muted backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60" />
                      <span>Live URL Pending</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: 4. Actual Project Interface Preview & Project Switcher Deck */}
          <div className="flex flex-col gap-3 lg:col-span-7 xl:col-span-7 z-20">
            {/* 4. Actual Project Interface Preview */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
              >
                <ProjectVisualPreview project={selectedProject} />
              </motion.div>
            </AnimatePresence>

            {/* 4-Project Switcher Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {PROJECTS.map((proj) => {
                const isActive = proj.id === selectedProjectId;

                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setSelectedProjectId(proj.id)}
                    className={`group relative flex flex-col items-start rounded-xl border p-2 sm:p-2.5 text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "border-[rgba(200,255,0,0.5)] bg-[rgba(200,255,0,0.06)] shadow-[0_0_15px_rgba(200,255,0,0.08)]"
                        : "border-[rgba(243,242,238,0.08)] bg-[rgba(13,15,18,0.6)] hover:border-[rgba(243,242,238,0.22)] hover:bg-[rgba(13,15,18,0.85)]"
                    }`}
                  >
                    <span
                      className={`font-mono text-[9px] uppercase tracking-wider ${
                        isActive ? "text-lime font-bold" : "text-ink-muted"
                      }`}
                    >
                      {proj.number}
                    </span>
                    <span
                      className={`font-display text-[12px] sm:text-[13px] font-semibold truncate w-full ${
                        isActive ? "text-ink" : "text-ink-secondary group-hover:text-ink"
                      }`}
                    >
                      {proj.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Scene Advancement Triggers */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={itemVariants}
          className="border-t border-[rgba(243,242,238,0.08)] flex items-center justify-between pt-2 sm:pt-3"
        >
          <button
            type="button"
            onClick={nextSection}
            className="group inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-secondary hover:text-lime transition-colors cursor-pointer"
          >
            <span>Proceed to Contact</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-lime transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={() => goToSection(3)}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted hover:text-ink transition-colors cursor-pointer"
          >
            Back to What I Work With
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
