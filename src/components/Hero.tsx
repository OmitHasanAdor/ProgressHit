"use client";

import { useEffect, useRef, useState } from "react";
import { Flame, Zap, Trophy, ChevronRight, Sparkles } from "lucide-react";

/**
 * GamifiedHeroBanner
 * --------------------
 * Gen Z-leaning hero for ProgressHit: mountain-quest background,
 * a live "goals crushed" ticker for social proof, a level/XP bar,
 * streak counter, and a bold gradient headline.
 *
 * Usage in app/page.tsx:
 *   import GamifiedHeroBanner from "@/components/GamifiedHeroBanner";
 *   <GamifiedHeroBanner />
 *
 * Requires: lucide-react (already in your stack)
 */

export default function GamifiedHeroBanner() {
  const [xp, setXp] = useState(62); // animated fill on mount, 0-100
  const farRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // XP bar fills in on load for a satisfying "loading progress" feel
    const t = setTimeout(() => setXp(78), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (farRef.current) farRef.current.style.transform = `translate3d(${x * 4}px, ${y * 2}px, 0)`;
      if (midRef.current) midRef.current.style.transform = `translate3d(${x * 9}px, ${y * 4}px, 0)`;
      if (nearRef.current) nearRef.current.style.transform = `translate3d(${x * 16}px, ${y * 7}px, 0)`;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section className="relative isolate min-h-screen overflow-hidden flex items-center">
      {/* ---------- Background ---------- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#241033] via-[#5A1E4A] to-[#D9542E]" />
        <div className="absolute left-1/2 top-[16%] h-75 w-75 -translate-x-1/2 rounded-full bg-[#FF8AC2] opacity-30 blur-3xl animate-[pulseGlow_5s_ease-in-out_infinite]" />
        <div className="absolute right-[10%] top-[30%] h-45 w-45 rounded-full bg-[#38E1C6] opacity-20 blur-3xl animate-[pulseGlow_7s_ease-in-out_infinite]" />

        <div ref={farRef} className="absolute inset-x-0 bottom-0 transition-transform duration-300 ease-out">
          <svg viewBox="0 0 1280 320" preserveAspectRatio="none" className="h-[38vh] w-full min-h-55" aria-hidden="true">
            <polygon points="0,220 120,140 260,190 420,110 600,175 780,120 960,200 1140,150 1280,220 1280,320 0,320" fill="#7C2E63" opacity="0.55" />
          </svg>
        </div>
        <div ref={midRef} className="absolute inset-x-0 bottom-0 transition-transform duration-300 ease-out">
          <svg viewBox="0 0 1280 320" preserveAspectRatio="none" className="h-[38vh] w-full min-h-55" aria-hidden="true">
            <polygon points="0,260 160,170 340,230 520,140 700,225 900,160 1080,240 1280,190 1280,320 0,320" fill="#B8355F" opacity="0.75" />
          </svg>
        </div>
        <div ref={nearRef} className="absolute inset-x-0 bottom-0 transition-transform duration-300 ease-out">
          <svg viewBox="0 0 1280 340" preserveAspectRatio="none" className="h-[44vh] w-full min-h-65" role="img" aria-label="Winding path climbing toward a flag at the summit">
            <polygon points="0,300 220,150 420,240 640,90 860,220 1060,140 1280,260 1280,340 0,340" fill="#4A1533" />
            <path d="M120,340 C220,290 200,250 300,225 C400,200 380,170 460,150 C540,130 560,110 640,95" fill="none" stroke="#FFD9E8" strokeWidth="6" strokeLinecap="round" strokeDasharray="2 14" opacity="0.7" />
            <circle cx="220" cy="270" r="7" fill="#38E1C6" />
            <circle cx="330" cy="212" r="7" fill="#38E1C6" />
            <circle cx="470" cy="148" r="7" fill="#38E1C6" />
            <circle cx="560" cy="118" r="9" fill="#FFD34D" />
            <line x1="640" y1="95" x2="640" y2="55" stroke="#FFD9E8" strokeWidth="3" />
            <polygon points="640,55 672,64 640,73" fill="#38E1C6" />
          </svg>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        {/* live social proof ticker */}
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
          <Flame className="h-3.5 w-3.5 text-[#FFB13D]" />
          <span>12,483 goals crushed this week</span>
        </div>

        <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
          Turn your goals
          <br />
          into your{" "}
          <span className="bg-linear-to-r from-[#38E1C6] via-[#FFD34D] to-[#FF6FA8] bg-clip-text text-transparent">
            main character era
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base text-white/80 sm:text-lg">
          Set targets, stack streaks, level up. ProgressHit makes progress feel
          like the game you actually want to keep playing.
        </p>

        {/* gamified stat bar: level + XP + streak */}
        <div className="mx-auto mt-8 flex max-w-md items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-white">
            <Trophy className="h-4 w-4 text-[#FFD34D]" />
            <span className="text-sm font-semibold">Lvl 7</span>
          </div>

          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-linear-to-r from-[#38E1C6] to-[#FFD34D] transition-all duration-1000 ease-out"
              style={{ width: `${xp}%` }}
            />
          </div>

          <div className="flex items-center gap-1.5 text-white">
            <Flame className="h-4 w-4 text-[#FF8A3D]" />
            <span className="text-sm font-semibold">9 day streak</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/signup"
            className="group relative inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#38E1C6] to-[#1D9E75] px-7 py-3 text-sm font-bold text-[#04342C] shadow-[0_0_0_0_rgba(56,225,198,0.5)] transition-all duration-300 hover:shadow-[0_0_28px_6px_rgba(56,225,198,0.45)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <Zap className="h-4 w-4" />
            Start free — no cap
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD34D] opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-[#FFD34D]" />
            </span>
          </a>

          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/15"
          >
            <Sparkles className="h-4 w-4" />
            See it in action
          </a>
        </div>

        <p className="mt-4 text-xs text-white/50">
          Free forever plan · No credit card · Takes 30 seconds
        </p>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.25; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.45; transform: translateX(-50%) scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </section>
  );
}