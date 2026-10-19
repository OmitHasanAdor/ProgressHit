// ===============================================================
// 1) src/app/layout.tsx  — load the two fonts
// ===============================================================
import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollParallaxBackground from "@/components/ScrollParallaxBackground";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

const label = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "ProgressHit",
  description: "Set. Track. Progress. Achieve.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${label.variable} antialiased`}>
        <ScrollParallaxBackground />
        {children}
      </body>
    </html>
  );
}

// ===============================================================
// 2) Sample section — same pattern as the reference screenshot:
//    mono date/label -> serif title -> rough divider -> repeat.
//    Save as src/components/EntryList.tsx
// ===============================================================
import RoughDivider from "@/components/RoughDivider";

const ENTRIES = [
  { label: "OCT 19, 2026", title: "Ship the landing page" },
  { label: "OCT 12, 2026", title: "Finish the Express + Prisma backend" },
  { label: "OCT 5, 2026", title: "Read 20 pages every day" },
];

export function EntryList() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-4xl tracking-tight">Recent goals</h2>
        <a
          href="/dashboard"
          className="font-label text-xs uppercase tracking-[0.18em] text-[--muted] hover:text-white"
        >
          All goals →
        </a>
      </div>

      <ul className="mt-6">
        {ENTRIES.map((e, i) => (
          <li key={e.title}>
            <RoughDivider seed={i + 2} />
            <div className="py-5">
              <p className="font-label text-xs uppercase tracking-[0.18em] text-[--muted]">
                {e.label}
              </p>
              <p className="mt-2 font-display text-2xl">{e.title}</p>
            </div>
          </li>
        ))}
        <li>
          <RoughDivider seed={9} />
        </li>
      </ul>
    </section>
  );
}