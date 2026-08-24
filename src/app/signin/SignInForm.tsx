"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Flame, Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Adjust this import to wherever your Better Auth client is set up
// e.g. lib/auth-client.ts -> export const authClient = createAuthClient({ ... })
import { authClient } from "@/lib/auth-client";

/**
 * SignInForm
 * ------------
 * Client component. All interactivity for the login screen lives here —
 * form state, validation, and the Better Auth calls. Rendered by the
 * server component at app/login/page.tsx, which owns the route metadata.
 *
 * Requires: react-hook-form, zod, @hookform/resolvers, sonner, react-icons
 */

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: SignInValues) {
    setIsSubmitting(true);
    try {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message ?? "Couldn't sign you in. Check your details.");
        return;
      }

      toast.success("Welcome back — streak's still alive.");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch {
      toast.error("Google sign-in failed. Try again.");
      setGoogleLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-[#1A0B26] via-[#3D1030] to-[#241033] px-4 py-12">
      {/* ambient glow, same family as rest of the app */}
      <div className="pointer-events-none absolute -top-16 left-1/4 h-72 w-72 rounded-full bg-[#38E1C6] opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/5 h-64 w-64 rounded-full bg-[#FF6FA8] opacity-10 blur-3xl" />

      <div className="relative w-full max-w-sm">
        {/* logo + brand */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white p-1.5">
            <Image src="/logo.png" alt="ProgressHit logo" width={20} height={20} className="object-contain" />
          </span>
          <span className="text-base font-extrabold tracking-tight text-white">
            ProgressHit
          </span>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
          {/* streak-flavored heading */}
          <div className="mb-6 text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              <Flame className="h-3.5 w-3.5 text-[#FFB13D]" />
              Pick up where you left off
            </div>
            <h1 className="text-2xl font-extrabold text-white">Welcome back</h1>
            <p className="mt-1.5 text-sm text-white/60">
              Log in to keep the streak going.
            </p>
          </div>

          {/* Google sign-in */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full gap-2 border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {googleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FcGoogle className="h-4 w-4" />
            )}
            Continue with Google
          </Button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/40">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* email/password form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-white/80">
                Email
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  autoComplete="email"
                  {...register("email")}
                  className="border-white/15 bg-white/5 pl-9 text-white placeholder:text-white/30 focus-visible:ring-[#38E1C6]"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-[#FF8A8A]">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white/80">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#38E1C6] hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register("password")}
                  className="border-white/15 bg-white/5 px-9 text-white placeholder:text-white/30 focus-visible:ring-[#38E1C6]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-[#FF8A8A]">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gap-2 bg-linear-to-r from-[#38E1C6] to-[#1D9E75] font-bold text-[#04342C] hover:opacity-90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-white/60">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-[#38E1C6] hover:underline">
            Start your quest
          </Link>
        </p>
      </div>
    </main>
  );
}