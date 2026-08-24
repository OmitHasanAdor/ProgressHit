import type { Metadata } from "next";
import SignUpForm from "./SignUpForm";


/**
 * app/signup/page.tsx
 * ---------------------
 * Server component. Owns the route's metadata (SEO/social preview)
 * and renders the client-side form component. No "use client" here —
 * this file never needs interactivity, so keep it a server component.
 */

export const metadata: Metadata = {
  title: "Sign up — ProgressHit",
  description:
    "Create your ProgressHit account and start turning your goals into progress you can see.",
  openGraph: {
    title: "Sign up — ProgressHit",
    description: "Start your quest. Create your free ProgressHit account.",
    images: ["/og-image.png"],
  },
  robots: {
    index: false, // auth pages generally shouldn't be indexed
    follow: false,
  },
};

export default function SignUpPage() {
  return <SignUpForm />;
}