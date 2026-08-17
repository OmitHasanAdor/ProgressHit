"use client";

import { useState } from "react";
import {
  Flame,
  Trophy,
  Target,
  ListChecks,
  Send,
  ArrowUpRight,
} from "lucide-react";
import { FaXTwitter, FaInstagram, FaGithub } from "react-icons/fa6";

/**
 * GamifiedFooter
 * ----------------
 * Footer for ProgressHit matching the GamifiedHeroBanner theme —
 * same night-to-sunset gradient, streak/XP language, and mountain-quest
 * motif. Includes a playful newsletter signup ("join the guild"),
 * a mini achievement strip, sitemap columns, and socials.
 *
 * Usage:
 *   import GamifiedFooter from "@/components/Footer";
 *   <GamifiedFooter />
 */

export default function GamifiedFooter() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setJoined(true);
  }

  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-[#1A0B26] to-[#3D1030] text-white">
      {/* ambient glow, same family as hero */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#38E1C6] opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute -top-10 right-1/5 h-56 w-56 rounded-full bg-[#FF6FA8] opacity-10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 pt-16">
        {/* ---- streak reminder / newsletter ---- */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                <Flame className="h-3.5 w-3.5 text-[#FFB13D]" />
                Don&apos;t break the streak
              </div>
              <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">
                Get weekly nudges,
                <br className="hidden sm:block" /> not spam.
              </h3>
              <p className="mt-2 max-w-sm text-sm text-white/70">
                One email a week. Streak reminders, new features, and the
                occasional flex-worthy stat about your progress.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-sm items-center gap-2 sm:w-auto"
            >
              {joined ? (
                <div className="flex items-center gap-2 rounded-full bg-[#1D9E75]/20 px-4 py-2.5 text-sm font-semibold text-[#38E1C6]">
                  <Trophy className="h-4 w-4" />
                  You&apos;re in. See you tomorrow.
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#38E1C6]/60"
                  />
                  <button
                    type="submit"
                    className="flex shrink-0 items-center gap-1.5 rounded-full bg-linear-to-r from-[#38E1C6] to-[#1D9E75] px-4 py-2.5 text-sm font-bold text-[#04342C] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Join
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* ---- mini achievement strip ---- */}
        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
          <AchievementChip icon={<Target className="h-4 w-4" />} label="2.1M goals set" />
          <AchievementChip icon={<ListChecks className="h-4 w-4" />} label="890K tasks done" />
          <AchievementChip icon={<Flame className="h-4 w-4" />} label="34K active streaks" />
        </div>

        {/* ---- sitemap ---- */}
        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
          <div>
            <p className="text-sm font-bold">ProgressHit</p>
            <p className="mt-2 text-xs leading-relaxed text-white/50">
              Set. Track. Achieve. The goal tracker built for people who like
              seeing the number go up.
            </p>
          </div>

          <FooterColumn
            title="Product"
            links={[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how-it-works" },
              { label: "Pricing", href: "/pricing" },
              { label: "Changelog", href: "/changelog" },
            ]}
          />

          <FooterColumn
            title="Company"
            links={[
              { label: "About", href: "/about" },
              { label: "Blog", href: "/blog" },
              { label: "Careers", href: "/careers" },
              { label: "Contact", href: "/contact" },
            ]}
          />

          <FooterColumn
            title="Legal"
            links={[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ]}
          />
        </div>

        {/* ---- bottom bar ---- */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} ProgressHit. Keep the streak alive.</p>

          <div className="flex items-center gap-4">
            <SocialIcon href="https://twitter.com" label="Twitter">
              <FaXTwitter className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" label="Instagram">
              <FaInstagram className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href="https://github.com" label="GitHub">
              <FaGithub className="h-4 w-4" />
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}

function AchievementChip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-semibold text-white/80 sm:text-sm">
      <span className="text-[#FFD34D]">{icon}</span>
      {label}
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/20 hover:text-white"
    >
      {children}
    </a>
  );
}