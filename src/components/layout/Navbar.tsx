"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { useSectionTransition } from "@/components/portfolio/SectionTransitionContext";
import {
  EASE_EDITORIAL,
  SPRING_TACTILE,
  mobileDrawerItemVariants,
  mobileDrawerVariants,
  navBarVariants,
  usePrefersReducedMotion,
} from "@/lib/motion";
import { NAV_ITEMS, SITE_IDENTITY } from "@/lib/navigation";

export function Navbar() {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();
  const sectionTransition = useSectionTransition();
  const prefersReducedMotion = usePrefersReducedMotion();

  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpenForPath, setDrawerOpenForPath] = useState<string | null>(
    null,
  );
  const mobileOpen = drawerOpenForPath === pathname;

  const isSinglePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer with Escape and lock body scroll when open
  useEffect(() => {
    if (!mobileOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpenForPath(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isSinglePage && sectionTransition) {
      e.preventDefault();
      sectionTransition.goToSection(0);
    } else if (pathname === "/") {
      e.preventDefault();
      scrollTo(0);
    }
    setDrawerOpenForPath(null);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionIndex: number,
  ) => {
    if (isSinglePage && sectionTransition) {
      e.preventDefault();
      sectionTransition.goToSection(sectionIndex);
      setDrawerOpenForPath(null);
    }
  };

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? false : "hidden"}
        animate="visible"
        variants={navBarVariants}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          isScrolled || isSinglePage
            ? "bg-[rgba(7,8,9,0.78)] backdrop-blur-xl border-b border-[rgba(243,242,238,0.09)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <Container className="flex h-[var(--nav-height)] items-center justify-between gap-6">
          {/* Brand Identity */}
          <Link
            href="/"
            onClick={handleHomeClick}
            className="group inline-flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-lime rounded-full py-1 pr-2 cursor-pointer"
            aria-label={`${SITE_IDENTITY.name} — Home`}
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(243,242,238,0.18)] bg-[rgba(13,15,18,0.8)] transition-colors duration-300 group-hover:border-lime">
              <span className="h-2 w-2 rounded-full bg-lime transition-transform duration-300 group-hover:scale-125" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-bold tracking-[0.06em] text-ink">
                {SITE_IDENTITY.monogram}
              </span>
              <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-muted">
                PM × FE
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center rounded-full border border-[rgba(243,242,238,0.1)] bg-[rgba(13,15,18,0.68)] p-1 backdrop-blur-xl"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = isSinglePage && sectionTransition
                ? sectionTransition.activeSection === item.sectionIndex
                : item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

              return (
                <button
                  key={item.index}
                  type="button"
                  onClick={() => {
                    if (isSinglePage && sectionTransition) {
                      sectionTransition.goToSection(item.sectionIndex);
                    }
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-[0.01em] transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-canvas font-semibold"
                      : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="navbar-active-pill"
                      transition={
                        prefersReducedMotion ? { duration: 0 } : SPRING_TACTILE
                      }
                      className="absolute inset-0 rounded-full bg-lime shadow-[0_0_24px_rgba(200,255,0,0.22)]"
                    />
                  ) : null}
                  <span
                    className={`relative z-10 font-mono text-[10px] ${
                      isActive ? "text-canvas/75" : "text-ink-muted"
                    }`}
                  >
                    {item.index}
                  </span>
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Secondary Action + CV Link + Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Subtle CV Link */}
            <a
              href="/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Anita_Ugoebillah_CV.pdf"
              className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(243,242,238,0.16)] bg-[rgba(13,15,18,0.65)] px-3 sm:px-3.5 py-1.5 font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.16em] text-ink-secondary transition-all duration-200 hover:border-lime hover:text-lime hover:bg-[rgba(200,255,0,0.06)] cursor-pointer"
              aria-label="Download or view Anita's CV (PDF)"
            >
              <span>CV</span>
              <ArrowUpRight className="h-3 w-3 text-lime" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => {
                if (isSinglePage && sectionTransition) {
                  sectionTransition.goToSection(5);
                }
              }}
              className="hidden lg:inline-flex items-center gap-2 rounded-full border border-[rgba(243,242,238,0.16)] bg-[rgba(13,15,18,0.65)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors duration-200 hover:border-lime hover:text-lime cursor-pointer"
            >
              <span>Let&apos;s Connect</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() =>
                setDrawerOpenForPath((prev) =>
                  prev === pathname ? null : pathname,
                )
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(243,242,238,0.16)] bg-[rgba(13,15,18,0.8)] text-ink backdrop-blur-md transition-colors hover:border-lime hover:text-lime md:hidden cursor-pointer"
            >
              {mobileOpen ? (
                <X className="h-4.5 w-4.5" aria-hidden="true" />
              ) : (
                <Menu className="h-4.5 w-4.5" aria-hidden="true" />
              )}
            </button>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Fullscreen Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={prefersReducedMotion ? false : "closed"}
            animate="open"
            exit="closed"
            variants={mobileDrawerVariants}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[rgba(7,8,9,0.96)] pt-24 pb-10 backdrop-blur-2xl md:hidden"
          >
            <Container className="flex flex-1 flex-col justify-between">
              <nav aria-label="Mobile Primary Navigation" className="mt-4">
                <ul className="divide-y divide-[rgba(243,242,238,0.08)] border-y border-[rgba(243,242,238,0.08)]">
                  {NAV_ITEMS.map((item) => {
                    const isActive = isSinglePage && sectionTransition
                      ? sectionTransition.activeSection === item.sectionIndex
                      : item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                    return (
                      <motion.li
                        key={item.index}
                        variants={
                          prefersReducedMotion
                            ? undefined
                            : mobileDrawerItemVariants
                        }
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            if (isSinglePage && sectionTransition) {
                              sectionTransition.goToSection(item.sectionIndex);
                            }
                            setDrawerOpenForPath(null);
                          }}
                          aria-current={isActive ? "page" : undefined}
                          className="group flex w-full items-center justify-between py-5 text-left cursor-pointer"
                        >
                          <div className="flex items-baseline gap-4">
                            <span
                              className={`font-mono text-xs ${
                                isActive ? "text-lime" : "text-ink-muted"
                              }`}
                            >
                              {item.index}
                            </span>
                            <div>
                              <span
                                className={`block font-display text-2xl font-bold tracking-[-0.02em] transition-colors ${
                                  isActive
                                    ? "text-lime"
                                    : "text-ink group-hover:text-lime"
                                }`}
                              >
                                {item.label}
                              </span>
                              <span className="mt-1 block text-xs text-ink-secondary">
                                {item.description}
                              </span>
                            </div>
                          </div>
                          <ArrowUpRight
                            className={`h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                              isActive ? "text-lime" : "text-ink-muted"
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Mobile Drawer Dedicated CV Download Button */}
              <motion.div
                variants={
                  prefersReducedMotion ? undefined : mobileDrawerItemVariants
                }
                className="pt-4"
              >
                <a
                  href="/CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Anita_Ugoebillah_CV.pdf"
                  onClick={() => setDrawerOpenForPath(null)}
                  className="group flex w-full items-center justify-between rounded-xl border border-[rgba(200,255,0,0.35)] bg-[rgba(200,255,0,0.08)] p-3.5 text-ink transition-all duration-200 hover:border-lime hover:bg-[rgba(200,255,0,0.15)] cursor-pointer"
                  aria-label="Download Anita's CV (PDF)"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime font-mono text-[11px] font-bold text-canvas">
                      CV
                    </span>
                    <div>
                      <span className="block font-display text-sm font-bold text-ink group-hover:text-lime">
                        DOWNLOAD CV
                      </span>
                      <span className="block font-mono text-[9.5px] uppercase tracking-wider text-ink-muted">
                        PDF · 136 KB · Verified Resume
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-lime transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.div>

              <motion.div
                variants={
                  prefersReducedMotion ? undefined : mobileDrawerItemVariants
                }
                transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
                className="flex items-center justify-between pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted"
              >
                <span>{SITE_IDENTITY.name}</span>
                <span>{SITE_IDENTITY.statusLabel}</span>
              </motion.div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
