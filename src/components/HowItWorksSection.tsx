"use client";

import { Target, ListChecks, TrendingUp, Trophy } from "lucide-react";

/**
 * HowItWorksSection
 * --------------------
 * Visualizes ProgressHit's core loop — Set → Track → Progress → Achieve —
 * as a quest path with 4 numbered nodes, matching the mountain-quest
 * theme used across the hero, footer, and quote section.
 *
 * Usage:
 *   import HowItWorksSection from "@/components/HowItWorksSection";
 *   <HowItWorksSection />
 *
 * Note: give the section id="how-it-works" so navbar anchor links work.
 */

const STEPS = [
  {
    icon: Target,
    label: "Set",
    title: "Set your target",
    description:
      "Pick a goal that actually matters to you. Give it a name, a deadline, and break it into targets you can hit.",
    color: "#38E1C6",
  },
  {
    icon: ListChecks,
    label: "Track",
    title: "Track the tasks",
    description:
      "Turn the goal into bite-sized tasks. Check them off as you go — every completed task feeds your streak.",
    color: "#FFD34D",
  },
  {
    icon: TrendingUp,
    label: "Progress",
    title: "Watch progress climb",
    description:
      "Your dashboard shows exactly how far you've come — completion %, streaks, and momentum, all in one view.",
    color: "#FF8A3D",
  },
  {
    icon: Trophy,
    label: "Achieve",
    title: "Hit the summit",
    description:
      "Cross the finish line, bank the win, and level up. Then set the next target — the climb never really ends.",
    color: "#FF6FA8",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-linear-to-b from-[#241033] via-[#3D1030] to-[#241033] py-24"
    >
      {/* ambient glow, same family as rest of the page */}
      <div className="pointer-events-none absolute -top-10 right-1/4 h-72 w-72 rounded-full bg-[#38E1C6] opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/5 h-56 w-56 rounded-full bg-[#FF6FA8] opacity-10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* heading */}
        <div className="mx-auto mb-16 max-w-xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80">
            The quest, mapped out
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            How{" "}
            <span className="bg-linear-to-r from-[#38E1C6] to-[#FFD34D] bg-clip-text text-transparent">
              ProgressHit
            </span>{" "}
            works
          </h2>
          <p className="mt-3 text-sm text-white/60 sm:text-base">
            Four steps between &quot;I want to&quot; and &quot;I did it.&quot;
          </p>
        </div>

        {/* ---- desktop: horizontal quest path ---- */}
        <div className="relative hidden sm:block">
          {/* connecting dotted path */}
          <div className="absolute left-0 right-0 top-9 h-px">
            <svg
              viewBox="0 0 1000 2"
              preserveAspectRatio="none"
              className="h-px w-full"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="1"
                x2="1000"
                y2="1"
                stroke="white"
                strokeOpacity="0.15"
                strokeWidth="2"
                strokeDasharray="2 12"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="relative grid grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <StepCard key={step.label} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* ---- mobile: vertical quest path ---- */}
        <div className="relative flex flex-col gap-6 sm:hidden">
          <div className="absolute bottom-0 left-9 top-9 w-px">
            <svg
              viewBox="0 0 2 1000"
              preserveAspectRatio="none"
              className="h-full w-px"
              aria-hidden="true"
            >
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="1000"
                stroke="white"
                strokeOpacity="0.15"
                strokeWidth="2"
                strokeDasharray="2 12"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {STEPS.map((step, i) => (
            <StepCard key={step.label} step={step} index={i} horizontal />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
  horizontal = false,
}: {
  step: (typeof STEPS)[number];
  index: number;
  horizontal?: boolean;
}) {
  const Icon = step.icon;

  return (
    <div
      className={
        horizontal
          ? "relative flex items-start gap-4"
          : "relative flex flex-col items-center text-center"
      }
    >
      {/* numbered node */}
      <div
        className="relative z-10 flex h-18 w-18 shrink-0 items-center justify-center rounded-full border-2 bg-[#1A0B26]"
        style={{ borderColor: step.color }}
      >
        <Icon className="h-7 w-7" style={{ color: step.color }} strokeWidth={2} />
        <span
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-[#1A0B26]"
          style={{ backgroundColor: step.color }}
        >
          {index + 1}
        </span>
      </div>

      <div className={horizontal ? "pt-1" : "mt-4"}>
        <p
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: step.color }}
        >
          {step.label}
        </p>
        <h3 className="mt-1 text-base font-bold text-white">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          {step.description}
        </p>
      </div>
    </div>
  );
}