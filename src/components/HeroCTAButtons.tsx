export function HeroCTAButtons() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
      {/* Primary: Start quest */}
      <a
        href="/signup"
        className="group relative inline-flex items-center gap-2 rounded-full bg-[#1D9E75] px-7 py-3 text-sm font-semibold text-white shadow-[0_0_0_0_rgba(29,158,117,0.6)] transition-all duration-300 hover:shadow-[0_0_24px_4px_rgba(29,158,117,0.55)] hover:-translate-y-0.5 active:translate-y-0"
      >
        <FlagIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        Start your quest
        <span className="absolute -right-1 -top-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFE8C2] opacity-75" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-[#FBC85A]" />
        </span>
      </a>

      {/* Secondary: See how it works */}
      <a
        href="#how-it-works"
        className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
      >
        <BadgeIcon className="h-4 w-4" />
        See how it works
      </a>
    </div>
  );
}

function FlagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 4l14 4-14 4" fill="currentColor" />
    </svg>
  );
}

function BadgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M9 14l-2 7 5-3 5 3-2-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}