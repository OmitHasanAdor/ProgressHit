"use client";

import { useEffect, useState } from "react";
import { Flame, Menu, X, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/**
 * GamifiedNavbar
 * ----------------
 * Sticky navbar for ProgressHit matching the hero/footer theme —
 * always uses the same dark violet-to-magenta gradient family as the
 * hero (no gray/washed-out blend), solidifying further on scroll.
 * Includes a level badge for logged-in users and a mobile menu.
 *
 * Usage:
 *   import Navbar from "@/components/Navbar";
 *   <Navbar />
 *
 * Set `isLoggedIn` from your auth session (Better Auth) to swap
 * between the marketing CTA and the in-app streak/level pill.
 *
 * Logo: place your file at /public/logo.png — do NOT import it,
 * next/image reads public assets directly via a string path.
 */

const NAV_LINKS = [
  { label: "Add Task", href: "/add-task" },
  { label: "Milestones", href: "/achieved-milestones" },
  { label: "Quotes", href: "/quotes" },
];

export default function GamifiedNavbar({
  isLoggedIn = false,
}: {
  isLoggedIn?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-linear-to-r from-[#1A0B26] via-[#2B0F30] to-[#1A0B26] shadow-lg shadow-black/20 backdrop-blur-md"
          : "border-white/5 bg-linear-to-r from-[#1A0B26]/95 via-[#2B0F30]/95 to-[#1A0B26]/95 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white p-1.5">
            <Image
              src="/logo.png"
              alt="ProgressHit logo"
              width={20}
              height={20}
              className="object-contain"
            />
          </span>
          <span className="text-base font-extrabold tracking-tight">
            ProgressHit
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: auth-aware CTA */}
        <div className="hidden items-center gap-3 sm:flex">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80">
                <Trophy className="h-3.5 w-3.5 text-[#FFD34D]" />
                Lvl 7
                <span className="mx-1 h-3 w-px bg-white/15" />
                <Flame className="h-3.5 w-3.5 text-[#FF8A3D]" />9
              </div>
              <Link
                href="/dashboard"
                className="rounded-full bg-linear-to-r from-[#38E1C6] to-[#1D9E75] px-4 py-2 text-sm font-bold text-[#04342C] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="group relative inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-[#38E1C6] to-[#1D9E75] px-4 py-2 text-sm font-bold text-[#04342C] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Start free
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD34D] opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#FFD34D]" />
                </span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white sm:hidden"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-linear-to-b from-[#1A0B26] to-[#2B0F30] px-6 py-4 backdrop-blur-md sm:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-white/80"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-4">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="rounded-full bg-linear-to-r from-[#38E1C6] to-[#1D9E75] px-4 py-2.5 text-center text-sm font-bold text-[#04342C]"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-white/80">
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-full bg-linear-to-r from-[#38E1C6] to-[#1D9E75] px-4 py-2.5 text-center text-sm font-bold text-[#04342C]"
                  >
                    Start free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}