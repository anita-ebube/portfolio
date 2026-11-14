"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Users,
  Trophy,
  Layers,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EASE_EDITORIAL, usePrefersReducedMotion } from "@/lib/motion";

interface Milestone {
  id: string;
  phase: string;
  year: string;
  title: string;
  role: string;
  institution: string;
  icon: typeof GraduationCap;
  summary: string;
  details: string[];
  tags: string[];
  highlight: string;
}

const MILESTONES: Milestone[] = [
  {
    id: "unn-cs",
    phase: "01 // THE FOUNDATION",
    year: "ACADEMICS",
    title: "Computer Science Degree",
    role: "Undergraduate Scholar & Developer",
    institution: "University of Nigeria, Nsukka (UNN)",
    icon: GraduationCap,
    summary:
      "Grounded my engineering intuition in rigorous computer science principles—algorithms, data structures, and distributed systems—while discovering that the hardest part of software isn't writing code; it's defining the right problem.",
    details: [
      "Mastered foundational computing architectures, object-oriented design, and database systems.",
      "Recognized early on that technically flawless code fails if user friction is ignored.",
      "Began bridging technical coursework with hands-on frontend web development and interface design.",
    ],
    tags: ["Algorithms", "Software Theory", "Web Systems", "UNN Alumna"],
    highlight: "Where computational discipline met human-centered curiosity.",
  },
  {
    id: "nacos-coordinator",
    phase: "02 // LEADERSHIP AT SCALE",
    year: "COMMUNITY",
    title: "NACOS Southeast Coordinator",
    role: "Regional Student Technology Leader",
    institution: "Nigeria Association of Computing Students",
    icon: Users,
    summary:
      "Elected to coordinate and represent computing student bodies across tertiary institutions in Southeast Nigeria. Championed tech inclusion, organized regional hackathons, and mobilized student developer communities.",
    details: [
      "Led cross-institutional student committees to plan and execute tech conferences and skill-acquisition bootcamps.",
      "Mediated between university leadership, industry sponsors, and collegiate developer groups.",
      "Honed practical leadership, public communication, and the art of aligning people behind a shared mission.",
    ],
    tags: ["Regional Leadership", "Tech Community", "Stakeholder Alignment", "Public Speaking"],
    highlight: "Learned how to motivate people, build consensus, and lead without authority.",
  },
  {
    id: "hng-finalist",
    phase: "03 // THE HIGH-STAKES CRUCIBLE",
    year: "SPRINT TRIAL",
    title: "HNG Finalist",
    role: "Product Management & Frontend Contender",
    institution: "HNG Internship",
    icon: Trophy,
    summary:
      "Advanced through the highly competitive stages of HNG to become a finalist. Solved real product teardowns, diagnosed conversion drop-offs, and shipped frontend deliverables under relentless deadlines.",
    details: [
      "Conducted comprehensive teardowns on live platforms (such as Zedu onboarding friction and LMS workflows).",
      "Drafted high-fidelity user journeys, identified authentication drop-offs, and specified actionable UX improvements.",
      "Collaborated in multidisciplinary pods under fast turnaround cycles with zero margin for fluff.",
    ],
    tags: ["HNG Finalist", "Product Teardowns", "UX Optimization", "Agile Execution"],
    highlight: "Validated the ability to diagnose, design, and deliver under intense real-world constraints.",
  },
  {
    id: "pm-fe-convergence",
    phase: "04 // THE DUAL-TRACK CRAFT",
    year: "PRESENT",
    title: "The PM × FE Convergence",
    role: "Product Manager & Frontend Technologist",
    institution: "Digital Products & Systems",
    icon: Layers,
    summary:
      "Unified product strategy and frontend engineering into a singular craft. Bringing technical depth into product specs, and product clarity into production code.",
    details: [
      "Translating ambiguous customer requirements into structured, shippable product backlogs.",
      "Authoring high-craft, accessible frontend applications with Next.js, TypeScript, and modern styling architectures.",
      "Ensuring that what gets designed is technically feasible, and what gets built actually matters to the end user.",
    ],
    tags: ["Product Strategy", "Design Systems", "TypeScript", "Next.js", "Human Empathy"],
    highlight: "One unified mind connecting strategy, interface, and code.",
  },
];

export function AboutStoryTimeline() {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(
    MILESTONES[0].id,
  );
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="my-story"
      aria-label="Anita's Journey and Milestones"
      className="hairline-t relative bg-surface py-20 sm:py-28 lg:py-32"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 pb-12 sm:flex-row sm:items-end sm:pb-16">
          <div>
            <SectionHeading
              eyebrow="CHRONICLE // MY STORY"
              title="A journey forged in code, community, and product clarity."
              description="From lecture halls in Nsukka to high-pressure product sprints, each chapter sharpened my ability to connect people and technology."
            />
          </div>
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-[rgba(243,242,238,0.12)] bg-[rgba(7,8,9,0.7)] px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-lime">
            <Sparkles className="h-3.5 w-3.5 text-lime" />
            <span>INTERACTIVE CHRONICLE</span>
          </div>
        </div>

        {/* Editorial Timeline Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Navigation / Timeline Rail (Desktop) */}
          <div className="flex flex-col gap-3 lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted pb-2">
              SELECT MILESTONE
            </p>
            {MILESTONES.map((item, idx) => {
              const isActive = item.id === activeMilestoneId;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveMilestoneId(item.id)}
                  aria-pressed={isActive}
                  className={`group relative flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-lime bg-elevated shadow-[0_0_32px_rgba(200,255,0,0.12)]"
                      : "border-[rgba(243,242,238,0.08)] bg-[rgba(7,8,9,0.5)] hover:border-[rgba(243,242,238,0.22)] hover:bg-[rgba(13,15,18,0.8)]"
                  }`}
                >
                  {/* Left Icon Pill */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                      isActive
                        ? "border-lime bg-lime text-canvas font-bold"
                        : "border-[rgba(243,242,238,0.14)] bg-[rgba(20,23,28,0.8)] text-ink-muted group-hover:border-lime group-hover:text-lime"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  {/* Text Header */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-mono text-[10px] font-semibold uppercase tracking-[0.18em] ${
                          isActive ? "text-lime" : "text-ink-muted"
                        }`}
                      >
                        {item.phase}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                        0{idx + 1}
                      </span>
                    </div>
                    <p
                      className={`mt-1 font-display text-lg font-bold tracking-tight truncate transition-colors ${
                        isActive ? "text-ink" : "text-ink-secondary group-hover:text-ink"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-xs text-ink-muted truncate">
                      {item.institution}
                    </p>
                  </div>

                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-transform duration-300 self-center ${
                      isActive
                        ? "translate-x-0.5 text-lime"
                        : "text-ink-muted group-hover:translate-x-0.5 group-hover:text-ink"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Stage: Detailed Editorial Milestone Inspection */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {MILESTONES.map((item) => {
                if (item.id !== activeMilestoneId) return null;
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                    className="relative flex flex-col justify-between rounded-3xl border border-[rgba(200,255,0,0.35)] bg-[rgba(13,15,18,0.92)] p-7 backdrop-blur-2xl sm:p-10"
                  >
                    {/* Top Identity Tag */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(243,242,238,0.1)] pb-6">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(200,255,0,0.4)] bg-[rgba(200,255,0,0.1)] text-lime">
                            <Icon className="h-4.5 w-4.5" />
                          </span>
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">
                              {item.phase}
                            </span>
                            <p className="text-xs text-ink-muted">
                              {item.year}
                            </p>
                          </div>
                        </div>

                        <span className="rounded-full border border-[rgba(243,242,238,0.14)] bg-[rgba(7,8,9,0.7)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-secondary">
                          {item.role}
                        </span>
                      </div>

                      {/* Main Title & Institution */}
                      <div className="mt-6">
                        <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                          {item.title}
                        </h3>
                        <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-lime">
                          {item.institution}
                        </p>
                      </div>

                      {/* Narrative Summary */}
                      <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
                        {item.summary}
                      </p>

                      {/* Highlight Pull-Callout */}
                      <div className="mt-6 rounded-2xl border-l-2 border-lime bg-[rgba(200,255,0,0.05)] p-4 sm:p-5">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-lime">
                          KEY TAKEAWAY
                        </p>
                        <p className="mt-1 font-display text-base font-bold text-ink sm:text-lg">
                          &ldquo;{item.highlight}&rdquo;
                        </p>
                      </div>

                      {/* Granular Breakdown Bullet Points */}
                      <div className="mt-6 space-y-3">
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                          PRACTICAL EXPERIENCE &amp; IMPACT
                        </p>
                        <ul className="space-y-2.5">
                          {item.details.map((detail, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-sm text-ink-secondary sm:text-[15px]"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime"
                              />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer Tags */}
                    <div className="mt-8 flex flex-wrap gap-2 border-t border-[rgba(243,242,238,0.1)] pt-6">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[rgba(243,242,238,0.1)] bg-[rgba(7,8,9,0.7)] px-3 py-1 font-mono text-[11px] text-ink-secondary transition-colors hover:border-lime hover:text-lime"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
