"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers,
  Sparkles,
  X,
} from "lucide-react";
import { type ProjectItem } from "@/lib/portfolio-data";
import { EASE_EDITORIAL, usePrefersReducedMotion } from "@/lib/motion";

interface ProjectDetailOverlayProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailOverlay({
  project,
  isOpen,
  onClose,
}: ProjectDetailOverlayProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8"
        >
          {/* Backdrop with Heavy Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-[rgba(7,8,9,0.85)] backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 16 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
            data-allow-scroll="true"
            className="relative z-10 flex max-h-[92svh] w-full max-w-3xl flex-col overflow-y-auto rounded-2xl border border-[rgba(243,242,238,0.18)] bg-[rgba(13,15,18,0.96)] p-5 sm:p-8 shadow-2xl backdrop-blur-2xl"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(243,242,238,0.1)]">
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: project.accentColor }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-lime font-semibold">
                  PROJECT {project.number} // {project.category}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project modal"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(243,242,238,0.15)] bg-canvas text-ink transition-colors hover:border-lime hover:text-lime cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Title & Description */}
            <div className="mt-5">
              <h2
                id="case-study-title"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink"
              >
                {project.title}
              </h2>
              {project.fullName && (
                <p className="mt-1 font-mono text-[12px] text-lime">
                  {project.fullName}
                </p>
              )}
              <p className="mt-3 text-[14px] leading-relaxed text-ink-secondary">
                {project.shortDescription}
              </p>
            </div>

            {/* Verified Technology Stack */}
            <div className="mt-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime font-semibold block mb-2.5">
                VERIFIED TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(243,242,238,0.16)] bg-canvas px-3 py-1 font-mono text-xs text-ink"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Features */}
            {project.features && project.features.length > 0 && (
              <div className="mt-6 rounded-xl border border-[rgba(243,242,238,0.08)] bg-canvas/50 p-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime font-semibold block mb-2.5">
                  CORE FEATURES &amp; FUNCTIONALITY
                </span>
                <ul className="space-y-2">
                  {project.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2 text-[13px] text-ink-secondary"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-lime shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Footer */}
            <div className="mt-8 flex items-center justify-between border-t border-[rgba(243,242,238,0.1)] pt-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                PROJECT {project.number} · {project.title}
              </span>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-lime px-6 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-canvas transition-opacity hover:opacity-90 cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
