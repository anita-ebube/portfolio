"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_EDITORIAL, usePrefersReducedMotion } from "@/lib/motion";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: ReactNode;
}

interface LinkButtonProps extends ButtonBaseProps {
  href: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

interface ActionButtonProps extends ButtonBaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-lime text-canvas font-semibold border border-lime shadow-[0_0_32px_rgba(200,255,0,0.18)] hover:bg-lime-hover hover:shadow-[0_0_40px_rgba(200,255,0,0.3)]",
  secondary:
    "bg-[rgba(13,15,18,0.72)] text-ink border border-[rgba(243,242,238,0.18)] backdrop-blur-md hover:border-[rgba(200,255,0,0.55)] hover:text-lime",
  ghost:
    "bg-transparent text-ink-secondary border border-transparent hover:text-ink hover:bg-[rgba(243,242,238,0.05)]",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm gap-2.5",
  lg: "h-13 px-7 text-sm sm:text-[15px] gap-3",
};

export function Button({
  children,
  variant = "primary",
  size = "lg",
  className = "",
  icon,
  ...rest
}: ButtonProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const baseClasses =
    "group relative inline-flex items-center justify-center rounded-full tracking-[-0.01em] transition-colors duration-200 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-lime";
  const combinedClasses = `${baseClasses} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon ? (
        <span
          aria-hidden="true"
          className="relative z-10 inline-flex items-center transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.985 },
        transition: { duration: 0.22, ease: EASE_EDITORIAL },
      };

  if ("href" in rest && rest.href !== undefined) {
    return (
      <motion.div className="inline-flex w-full sm:w-auto" {...motionProps}>
        <Link
          href={rest.href}
          onClick={rest.onClick}
          target={rest.target}
          rel={rest.rel}
          className={`${combinedClasses} w-full sm:w-auto`}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={rest.type ?? "button"}
      onClick={rest.onClick}
      disabled={rest.disabled}
      className={combinedClasses}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
