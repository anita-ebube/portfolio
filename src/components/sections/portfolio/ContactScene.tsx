"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE_IDENTITY } from "@/lib/portfolio-data";
import { EASE_EDITORIAL, usePrefersReducedMotion } from "@/lib/motion";
import { useSectionTransition } from "@/components/portfolio/SectionTransitionContext";

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

export function ContactScene() {
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { goToSection } = useSectionTransition();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_IDENTITY.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section
      id="contact"
      aria-label="Scene 06: Contact & Dialogue"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-canvas bg-architectural-grid py-12 sm:py-16 lg:py-20"
    >
      {/* Ambient Lighting Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-1/4 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(200,255,0,0.08)_0%,transparent_70%)] blur-3xl"
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
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-lime font-semibold">
              Contact
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Direct Inquiries &amp; Collaborations
          </span>
        </motion.div>

        {/* Center Stage: Bold Closing Monument */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={containerVariants}
          className="my-auto mx-auto max-w-3xl text-center space-y-4 sm:space-y-6"
        >
          {/* Availability Pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(200,255,0,0.3)] bg-[rgba(200,255,0,0.06)] px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-lime">
              OPEN TO PRODUCT MANAGEMENT &amp; FRONTEND ROLES
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={itemVariants}
            className="font-display text-[clamp(2.1rem,5vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-ink"
          >
            Hiring a PM or developer? <br />
            <span className="text-lime">Let&apos;s talk.</span>
          </motion.h2>

          {/* Supporting Copy */}
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-[50ch] text-[14.5px] sm:text-[16.5px] leading-relaxed text-ink-secondary"
          >
            {SITE_IDENTITY.contactSupporting}
          </motion.p>

          {/* Interactive Email Bar & Copy Action */}
          <motion.div
            variants={itemVariants}
            className="mx-auto flex max-w-lg flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          >
            <Button
              href={`mailto:${SITE_IDENTITY.email}`}
              variant="primary"
              size="lg"
              icon={<Mail className="h-4 w-4" />}
            >
              Send Direct Email
            </Button>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(243,242,238,0.16)] bg-[rgba(13,15,18,0.8)] px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink backdrop-blur-md transition-colors hover:border-lime hover:text-lime cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-lime" />
                  <span className="text-lime">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Social Links Rail */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 pt-3"
          >
            <a
              href={SITE_IDENTITY.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(243,242,238,0.12)] bg-[rgba(13,15,18,0.6)] text-ink transition-colors hover:border-lime hover:text-lime"
            >
              <svg
                className="h-4 w-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            <a
              href={SITE_IDENTITY.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(243,242,238,0.12)] bg-[rgba(13,15,18,0.6)] text-ink transition-colors hover:border-lime hover:text-lime"
            >
              <svg
                className="h-4 w-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.5a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
              </svg>
            </a>

            <div className="font-mono text-[11px] text-ink-muted">
              {SITE_IDENTITY.email}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Return to Start */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={itemVariants}
          className="border-t border-[rgba(243,242,238,0.08)] flex flex-col sm:flex-row items-center sm:justify-between gap-2.5 pt-3 text-[10px] sm:text-[11px] text-ink-muted font-mono text-center sm:text-left pb-2 sm:pb-0"
        >
          <span>© 2026 ANITA UGOEBILLAH · ALL RIGHTS RESERVED</span>

          <button
            type="button"
            onClick={() => goToSection(0)}
            className="group inline-flex items-center gap-2 text-ink-secondary hover:text-lime transition-colors cursor-pointer"
          >
            <ArrowUp className="h-3.5 w-3.5 text-lime transition-transform group-hover:-translate-y-0.5" />
            <span>Return to top</span>
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
