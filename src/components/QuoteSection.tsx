"use client";

import { useEffect, useState, useCallback } from "react";
import { Quote, ChevronLeft, ChevronRight, RefreshCw, Sparkles } from "lucide-react";

/**
 * QuoteSection
 * --------------
 * Gamified "words from the summit" section for ProgressHit — pulls
 * motivational quotes (goals / success / failure themed) from the
 * free DummyJSON Quotes API (no key required, CORS-friendly).
 *
 * Behavior:
 * - On every page load/reload, fetches a fresh batch of quotes
 *   starting from a random offset, so the quote shown changes.
 * - User can step Previous / Next through the fetched batch locally
 *   (no extra network calls needed for that).
 * - When they reach the end of the batch, the next click quietly
 *   fetches a new batch and continues.
 *
 * Usage:
 *   import QuoteSection from "@/components/QuoteSection";
 *   <QuoteSection />
 *
 * API used: https://dummyjson.com/quotes
 * Docs: https://dummyjson.com/docs/quotes
 */

const BATCH_SIZE = 10;
const TOTAL_QUOTES = 1400; // DummyJSON has 1400+ quotes available

type ApiQuote = {
  id: number;
  quote: string;
  author: string;
};

function randomSkip() {
  return Math.floor(Math.random() * Math.max(TOTAL_QUOTES - BATCH_SIZE, 1));
}

export default function QuoteSection() {
  const [quotes, setQuotes] = useState<ApiQuote[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchBatch = useCallback(async (skip: number) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://dummyjson.com/quotes?limit=${BATCH_SIZE}&skip=${skip}`
      );
      if (!res.ok) throw new Error("Failed to fetch quotes");
      const data = await res.json();
      setQuotes(data.quotes ?? []);
      setIndex(0);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // fresh random batch on every mount / reload
  useEffect(() => {
    fetchBatch(randomSkip());
  }, [fetchBatch]);

  const handlePrev = () => {
    if (index > 0) {
      setIndex((i) => i - 1);
    } else {
      // wrap to a fresh batch from a new random point
      fetchBatch(randomSkip());
    }
  };

  const handleNext = () => {
    if (index < quotes.length - 1) {
      setIndex((i) => i + 1);
    } else {
      // ran out of the current batch — quietly pull a new one
      fetchBatch(randomSkip());
    }
  };

  const current = quotes[index];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#3D1030] via-[#4A1533] to-[#241033] py-20">
      {/* ambient glow, same family as hero/footer */}
      <div className="pointer-events-none absolute -top-10 left-1/4 h-72 w-72 rounded-full bg-[#38E1C6] opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 right-1/5 h-56 w-56 rounded-full bg-[#FFD34D] opacity-10 blur-3xl" />

      <div className="relative mx-auto max-w-2xl px-6">
        {/* eyebrow */}
        <div className="mb-8 flex items-center justify-center gap-2 text-xs font-medium text-white/60">
          <Sparkles className="h-3.5 w-3.5 text-[#FFD34D]" />
          Words from the summit
        </div>

        {/* quote card */}
        <div className="min-h-[220px] rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:p-10">
          <Quote
            className="mx-auto mb-5 h-8 w-8 text-[#38E1C6] opacity-70"
            strokeWidth={1.5}
          />

          {loading && (
            <div className="flex flex-col items-center gap-3 py-6 text-white/50">
              <RefreshCw className="h-5 w-5 animate-spin" />
              <span className="text-sm">Fetching some wisdom...</span>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <p className="text-sm text-white/60">
                Couldn&apos;t load a quote right now.
              </p>
              <button
                onClick={() => fetchBatch(randomSkip())}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/15"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && current && (
            <div className="text-center">
              <p className="text-xl font-semibold leading-snug text-white sm:text-2xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <p className="mt-5 text-sm font-medium text-[#38E1C6]">
                — {current.author}
              </p>
            </div>
          )}
        </div>

        {/* prev / next controls */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={loading}
            aria-label="Previous quote"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="text-xs font-medium text-white/40">
            {quotes.length > 0 ? `${index + 1} / ${quotes.length}` : "—"}
          </span>

          <button
            onClick={handleNext}
            disabled={loading}
            aria-label="Next quote"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15 disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}