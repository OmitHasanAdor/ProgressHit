"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollParallaxBackground
 * --------------------------
 * Fixed full-page background that reacts to SCROLL (not the mouse), so it
 * works on phones and trackpads. Layers move at different rates, and each
 * glow also drifts slowly on its own, so the page never feels frozen.
 *
 * How it works: one rAF-throttled scroll listener writes `--sy` onto the
 * container; layers read it via calc() — no React re-renders on scroll.
 *
 * Usage (once, in app/layout.tsx or page.tsx, above your content):
 *   <ScrollParallaxBackground />
 *
 * Requires the `drift` keyframes from globals-additions.css.
 */

export default function ScrollParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      el.style.setProperty("--sy", String(window.scrollY));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#1c1c1c]"
    >
      {/* teal glow — slow scroll rate */}
      <div
        className="absolute -left-24 top-[8%] will-change-transform"
        style={{ transform: "translate3d(0, calc(var(--sy, 0) * -0.06px), 0)" }}
      >
        <div className="h-96 w-96 animate-[drift_16s_ease-in-out_infinite_alternate] rounded-full bg-[#38E1C6]/15 blur-3xl" />
      </div>

      {/* magenta glow — medium scroll rate */}
      <div
        className="absolute -right-20 top-[40%] will-change-transform"
        style={{ transform: "translate3d(0, calc(var(--sy, 0) * -0.12px), 0)" }}
      >
        <div className="h-112 w-md animate-[drift_22s_ease-in-out_infinite_alternate-reverse] rounded-full bg-[#B8355F]/15 blur-3xl" />
      </div>

      {/* faint ridge line — fastest scroll rate, reads as nearest layer */}
      <div
        className="absolute inset-x-0 bottom-[-6%] will-change-transform"
        style={{ transform: "translate3d(0, calc(var(--sy, 0) * -0.18px), 0)" }}
      >
        <svg
          viewBox="0 0 1280 200"
          preserveAspectRatio="none"
          className="h-48 w-full text-white/10"
        >
          <polyline
            points="0,160 140,90 260,130 430,40 600,120 780,60 960,140 1130,80 1280,150"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}