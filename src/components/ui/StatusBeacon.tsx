interface StatusBeaconProps {
  label: string;
  className?: string;
}

export function StatusBeacon({ label, className = "" }: StatusBeaconProps) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border border-[rgba(243,242,238,0.12)] bg-[rgba(13,15,18,0.72)] px-3.5 py-1.5 backdrop-blur-md ${className}`}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-65" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-secondary">
        {label}
      </span>
    </div>
  );
}
