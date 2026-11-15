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

      {/* Clean Portrait Frame */}
      <motion.div
        whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
        transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
        className="relative overflow-hidden rounded-2xl border border-[rgba(243,242,238,0.14)] bg-[rgba(13,15,18,0.85)] p-1.5 sm:p-2 backdrop-blur-xl shadow-xl transition-colors duration-300 hover:border-[rgba(200,255,0,0.45)]"
      >
        {/* 4:5 Aspect Ratio Image Canvas */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[rgba(7,8,9,0.95)]">
          {/* Subtle Loading State Skeleton */}
          {!isImageLoaded && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[rgba(13,15,18,0.94)] backdrop-blur-md">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(200,255,0,0.3)] bg-[rgba(200,255,0,0.08)]">
                <span className="h-2.5 w-2.5 rounded-full bg-lime animate-ping" />
              </div>
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
        </div>
      </motion.div>

     
    </div>
  );
}
