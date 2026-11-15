"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { ProjectItem } from "@/lib/portfolio-data";

interface ProjectVisualPreviewProps {
  project: ProjectItem;
}

const PROJECT_SCREENSHOTS: Record<string, string> = {
  silentkrowd: "/images/projects/silentkrowd.png",
  nihsa: "/images/projects/nihsa.png",
  "nacos-dues": "/images/projects/nacos-dues.png",
  "system-vet": "/images/projects/system-vet.png",
};

export function ProjectVisualPreview({ project }: ProjectVisualPreviewProps) {
  const screenshotSrc =
    PROJECT_SCREENSHOTS[project.id] || "/images/projects/silentkrowd.png";

  const domain = project.links?.demo
    ? project.links.demo.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${project.id}.com`;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[rgba(243,242,238,0.14)] bg-[rgba(13,15,18,0.85)] shadow-2xl backdrop-blur-xl">
      {/* Top Browser / Chassis Bar */}
      <div className="flex items-center justify-between border-b border-[rgba(243,242,238,0.08)] bg-[rgba(7,8,9,0.7)] px-3.5 py-2.5">
        {/* macOS Action Pips */}
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>

        {/* Real Domain URL Pill */}
        <div className="flex items-center gap-1.5 rounded-full border border-[rgba(243,242,238,0.12)] bg-canvas/80 px-3 py-0.5 font-mono text-[10.5px] text-ink-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
          <span>{domain}</span>
        </div>

        {/* Live Site Link */}
        {project.links?.demo ? (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 text-[11px] font-medium text-ink-muted transition-colors hover:text-lime"
          >
            <span className="hidden sm:inline">Open</span>
            <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : (
          <div className="w-5" />
        )}
      </div>

      {/* Main Preview Screen: Real Shipped Interface Screenshot */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full overflow-hidden bg-[rgba(7,8,9,0.95)] group">
        <Image
          key={project.id}
          src={screenshotSrc}
          alt={`${project.title} live interface screenshot`}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 640px"
          priority
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />

        {/* Subtle bottom gradient for readability */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(7,8,9,0.75)] to-transparent"
        />

        {/* Hover Action Link */}
        {project.links?.demo && (
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(200,255,0,0.35)] bg-[rgba(13,15,18,0.9)] px-3 py-1 font-sans text-[11.5px] font-semibold text-lime backdrop-blur-md transition-all hover:bg-lime hover:text-canvas shadow-lg"
            >
              <span>Visit live website</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Product Metadata Footer */}
      <div className="flex items-center justify-between border-t border-[rgba(243,242,238,0.08)] bg-canvas/60 px-3.5 py-1.5 text-[11px] text-ink-muted font-sans">
        <span className="font-medium text-ink-secondary">{project.category}</span>
        <span className="text-ink-muted">{project.technologies.join(" · ")}</span>
      </div>
    </div>
  );
}
