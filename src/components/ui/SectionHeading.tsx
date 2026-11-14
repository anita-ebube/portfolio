interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-lime">
        {eyebrow}
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold leading-[0.98] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-ink-secondary sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
