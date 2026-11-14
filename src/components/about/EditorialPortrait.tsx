"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_EDITORIAL, usePrefersReducedMotion } from "@/lib/motion";

interface EditorialPortraitProps {
  className?: string;
}

export function EditorialPortrait({ className = "" }: EditorialPortraitProps) {
  const [imgSrc, setImgSrc] = useState<string>("/images/potrait.jpeg");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Ensure author portrait is loaded with reliable fallback
  useEffect(() => {
    if (typeof window === "undefined") return;

    const probe = new window.Image();
    probe.src = "/images/potrait.jpeg";
    probe.onload = () => {
      setImgSrc("/images/potrait.jpeg");
    };
    probe.onerror = () => {
      const probeFallback = new window.Image();
      probeFallback.src = "/potrait.jpeg";
      probeFallback.onload = () => {
        setImgSrc("/potrait.jpeg");
      };
      probeFallback.onerror = () => {
        setImgSrc("/images/anita-portrait-placeholder.svg");
      };
    };
  }, []);

  return (
    <div
      className={`group relative w-full max-w-[400px] lg:max-w-[440px] mx-auto select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient Electric Lime Radial Spotlight Behind the Frame */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-6 rounded-3xl bg-[radial-gradient(ellipse_at_50%_50%,rgba(200,255,0,0.14)_0%,rgba(200,255,0,0.03)_40%,transparent_70%)] transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-60"
        }`}
      />

      {/* Outer Architectural Container with 4:5 Editorial Ratio */}
      <motion.div
        whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
        transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
        className="relative overflow-hidden rounded-2xl border border-[rgba(243,242,238,0.16)] bg-[rgba(13,15,18,0.85)] p-2 backdrop-blur-xl transition-colors duration-300 hover:border-[rgba(200,255,0,0.45)]"
      >
        {/* Corner Calipers / Registration Marks in Electric Lime */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-lime z-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-lime z-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-lime z-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-lime z-20"
        />

        {/* 4:5 Aspect Ratio Image Canvas */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[rgba(7,8,9,0.95)]">
          {/* Subtle Loading State Skeleton */}
          {!isImageLoaded && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[rgba(13,15,18,0.94)] backdrop-blur-md">
              <div className="relative mb-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(200,255,0,0.3)] bg-[rgba(200,255,0,0.08)]">
                <span className="h-2 w-2 rounded-full bg-lime animate-ping" />
              </div>
              <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink-muted">
                LOADING PORTRAIT...
              </span>
            </div>
          )}

          <Image
            src={imgSrc}
            alt="Anita Ugoebillah — Product Manager and Frontend Developer"
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 440px"
            priority
            onLoad={() => setIsImageLoaded(true)}
            className={`object-cover object-[center_15%] transition-all duration-700 ease-out group-hover:scale-105 ${
              isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />

          {/* Film Grain & Dark Editorial Gradient Scrim */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(7,8,9,0.85)] via-transparent to-[rgba(7,8,9,0.2)]"
          />

          {/* Top Frame Telemetry Overlay */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3 sm:p-4 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-ink-secondary">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
              <span>PORTRAIT // 01</span>
            </span>
            <span className="rounded border border-[rgba(243,242,238,0.12)] bg-[rgba(7,8,9,0.7)] px-2 py-0.5 text-lime">
              RATIO 4:5
            </span>
          </div>

          {/* Bottom Telemetry Monogram */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between p-3 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink-muted">
            <span className="text-ink">ANITA UGOEBILLAH</span>
            <span className="text-lime">PM × FE</span>
          </div>

          
        </div>
      </motion.div>

     
    </div>
  );
}
