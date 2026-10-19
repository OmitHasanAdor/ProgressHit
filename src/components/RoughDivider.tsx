import { useId } from "react";

/**
 * RoughDivider
 * --------------
 * Hand-drawn, scratchy horizontal rule (like the dividers on medshamim.com).
 * Two overlapping strokes of different weight are wobbled by an SVG
 * turbulence displacement filter, so the line looks pencil-dragged
 * rather than a clean CSS border.
 *
 * Works as a server or client component (no hooks besides useId).
 *
 * Usage:
 *   <RoughDivider />
 *   <RoughDivider seed={7} className="text-white/60" />   // vary seed per use
 *
 * Colour comes from `currentColor`, so control it with a text-* class.
 */

export default function RoughDivider({
  className = "",
  seed = 3,
}: {
  className?: string;
  seed?: number;
}) {
  // useId returns ":r1:"-style strings; colons break url(#...) references
  const id = `rough-${useId().replace(/:/g, "")}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 10"
      preserveAspectRatio="none"
      className={`block h-2.5 w-full text-white/35 ${className}`}
    >
      <defs>
        <filter id={id} x="-2%" y="-300%" width="104%" height="700%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.09 0.3"
            numOctaves="2"
            seed={seed}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <g
        filter={`url(#${id})`}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      >
        <line x1="0" y1="4" x2="600" y2="4" strokeWidth="1.6" opacity="0.9" />
        <line x1="6" y1="6.5" x2="590" y2="6.5" strokeWidth="0.8" opacity="0.55" />
      </g>
    </svg>
  );
}