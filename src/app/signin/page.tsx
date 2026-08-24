import type { Metadata } from "next";
import SignInForm from "@/components/SignInForm";

/**
 * app/login/page.tsx
 * ---------------------
 * Server component. Owns the route's metadata (SEO/social preview)
 * and renders the client-side form component. No "use client" here —
 * this file never needs interactivity, so keep it a server component.
 */

export const metadata: Metadata = {
  title: "Log in — ProgressHit",
  description:
    "Log in to ProgressHit to pick up your goals, tasks, and streaks right where you left off.",
  openGraph: {
    title: "Log in — ProgressHit",
    description: "Keep the streak going. Log in to ProgressHit.",
    images: ["/og-image.png"],
  },
  robots: {
    index: false, // auth pages generally shouldn't be indexed
    follow: false,
  },
};

export default function LoginPage() {
  return <SignInForm />;
}