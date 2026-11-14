export default function Loading() {
  return (
    <div
      aria-label="Loading application..."
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-canvas bg-architectural-grid p-6 select-none"
    >
      <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(243,242,238,0.16)] bg-[rgba(13,15,18,0.92)] shadow-[0_0_24px_rgba(200,255,0,0.15)]">
        <span className="font-display text-xl font-bold tracking-wider text-ink">
          A
        </span>
        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-lime animate-ping" />
      </div>

      <div className="w-48 sm:w-56">
        <div className="h-[2px] w-full rounded-full bg-[rgba(243,242,238,0.12)] overflow-hidden">
          <div className="h-full w-1/2 bg-lime shadow-[0_0_10px_#c8ff00] animate-[pulse_1.5s_ease-in-out_infinite]" />
        </div>
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          LOADING EXPERIENCE...
        </p>
      </div>
    </div>
  );
}
