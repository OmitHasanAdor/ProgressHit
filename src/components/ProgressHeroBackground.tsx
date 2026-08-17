"use client";

import { useEffect, useRef } from "react";

/**
 * ProgressHeroBackground
 * -----------------------
 * A layered, animated hero background for ProgressHit — a dawn-toned sky,
 * parallax mountains, and a winding path climbing toward a flag at the peak,
 * with dots marking milestones along the way. Mouse movement gives a light
 * parallax tilt to the mountain layers.
 *
 * Usage:
 *   <section className="relative isolate overflow-hidden">
 *     <ProgressHeroBackground />
 *     <div className="relative z-10">...your hero content...</div>
 *   </section>
 *
 * Drop this file in e.g. components/ProgressHeroBackground.tsx
 */

export default function ProgressHeroBackground() {
  const farRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (farRef.current) {
        farRef.current.style.transform = `translate3d(${x * 4}px, ${y * 2}px, 0)`;
      }
      if (midRef.current) {
        midRef.current.style.transform = `translate3d(${x * 9}px, ${y * 4}px, 0)`;
      }
      if (nearRef.current) {
        nearRef.current.style.transform = `translate3d(${x * 16}px, ${y * 7}px, 0)`;
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-[#FDEBD3] via-[#F8CBA6] to-[#F4A97E]" />

      {/* Soft sun glow */}
      <div className="absolute left-1/2 top-[18%] h-70 w-70 -translate-x-1/2 rounded-full bg-[#FFE8C2] opacity-70 blur-3xl animate-[pulseGlow_6s_ease-in-out_infinite]" />

      {/* Drifting clouds */}
      <div className="absolute inset-0 overflow-hidden">
        <Cloud className="top-[12%] left-[-10%] w-40 opacity-80 animate-[driftSlow_60s_linear_infinite]" />
        <Cloud className="top-[22%] left-[-30%] w-28 opacity-60 animate-[driftSlow_90s_linear_infinite]" style={{ animationDelay: "-20s" }} />
        <Cloud className="top-[8%] left-[-50%] w-24 opacity-50 animate-[driftSlow_75s_linear_infinite]" style={{ animationDelay: "-40s" }} />
      </div>

      {/* Far mountains */}
      <div ref={farRef} className="absolute inset-x-0 bottom-0 transition-transform duration-300 ease-out">
        <MountainLayer fill="#E8875F" opacity={0.55} points="0,220 120,140 260,190 420,110 600,175 780,120 960,200 1140,150 1280,220 1280,320 0,320" />
      </div>

      {/* Mid mountains */}
      <div ref={midRef} className="absolute inset-x-0 bottom-0 transition-transform duration-300 ease-out">
        <MountainLayer fill="#D96C43" opacity={0.75} points="0,260 160,170 340,230 520,140 700,225 900,160 1080,240 1280,190 1280,320 0,320" />
      </div>

      {/* Near mountain with goal path + flag */}
      <div ref={nearRef} className="absolute inset-x-0 bottom-0 transition-transform duration-300 ease-out">
        <GoalMountain />
      </div>

      {/* Ground haze for content legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#2B1B14] to-transparent opacity-40" />

      <style>{`
        @keyframes driftSlow {
          from { transform: translateX(0); }
          to { transform: translateX(140vw); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.55; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.85; transform: translateX(-50%) scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </div>
  );
}

function MountainLayer({
  fill,
  opacity,
  points,
}: {
  fill: string;
  opacity: number;
  points: string;
}) {
  return (
    <svg
      viewBox="0 0 1280 320"
      preserveAspectRatio="none"
      className="h-[38vh] w-full min-h-55"
      aria-hidden="true"
    >
      <polygon points={points} fill={fill} opacity={opacity} />
    </svg>
  );
}

function GoalMountain() {
  return (
    <svg
      viewBox="0 0 1280 340"
      preserveAspectRatio="none"
      className="h-[44vh] w-full min-h-65"
      role="img"
      aria-label="Illustration of a winding path climbing a mountain toward a flag at the summit"
    >
      {/* mountain body */}
      <polygon
        points="0,300 220,150 420,240 640,90 860,220 1060,140 1280,260 1280,340 0,340"
        fill="#B84E2E"
      />
      {/* snow-ish highlight near peak */}
      <polygon points="600,110 640,90 680,112 660,130 620,130" fill="#F7D9B8" opacity="0.9" />

      {/* winding path */}
      <path
        d="M120,340 C220,290 200,250 300,225 C400,200 380,170 460,150 C540,130 560,110 640,95"
        fill="none"
        stroke="#F4E3C8"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="2 14"
      />

      {/* milestone dots */}
      <circle cx="220" cy="270" r="7" fill="#FBE7C6" />
      <circle cx="330" cy="212" r="7" fill="#FBE7C6" />
      <circle cx="470" cy="148" r="7" fill="#FBE7C6" />
      <circle cx="560" cy="118" r="9" fill="#FFFFFF" />

      {/* flag at the peak */}
      <line x1="640" y1="95" x2="640" y2="55" stroke="#3C2417" strokeWidth="3" />
      <polygon points="640,55 672,64 640,73" fill="#1D9E75" />
    </svg>
  );
}

function Cloud({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 200 80"
      className={`absolute ${className ?? ""}`}
      style={style}
      aria-hidden="true"
    >
      <ellipse cx="60" cy="45" rx="55" ry="26" fill="#FFF6E9" />
      <ellipse cx="110" cy="35" rx="45" ry="30" fill="#FFF6E9" />
      <ellipse cx="150" cy="48" rx="38" ry="20" fill="#FFF6E9" />
    </svg>
  );
}