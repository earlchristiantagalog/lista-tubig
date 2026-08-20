"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Droplet,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const loginSchema = z.object({
  identifier: z.string().min(1, "Email or Account ID is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    setGlobalError(null);
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    if (data.identifier === "wrong@email.com") {
      setGlobalError("Invalid credentials. Please try again.");
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
    window.location.href = "/admin";
  };

  const fillDemo = () => {
    setValue("identifier", "admin@listatubig.ph", { shouldValidate: true });
    setValue("password", "admin123", { shouldValidate: true });
    setGlobalError(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50/80 px-4 font-sans">
      {/* Ambient background mesh */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-sky-100/40 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-slate-200/50 blur-[100px]" />
      </div>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50">
          {/* Brand */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 ring-1 ring-sky-100">
              <Droplet className="h-6 w-6 text-sky-600" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Lista Tubig
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* Error */}
          {globalError && (
            <Alert variant="destructive" className="mb-5 border-rose-200 bg-rose-50">
              <AlertCircle className="h-4 w-4 text-rose-600" />
              <AlertDescription className="text-rose-700">
                {globalError}
              </AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Identifier */}
            <div className="space-y-1.5">
              <Label htmlFor="identifier" className="text-sm font-medium text-slate-700">
                Email or Account ID
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="identifier"
                  placeholder="admin@listatubig.ph or LT-1029"
                  autoFocus
                  autoComplete="username"
                  className="h-11 pl-10 ring-1 ring-slate-200 focus-visible:ring-sky-500 focus-visible:ring-2"
                  {...register("identifier")}
                />
              </div>
              {errors.identifier && (
                <p className="flex items-center gap-1 text-xs text-rose-600">
                  <AlertCircle className="h-3 w-3" />
                  {errors.identifier.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-xs font-medium text-sky-600 hover:text-sky-700 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-11 pl-10 pr-11 ring-1 ring-slate-200 focus-visible:ring-sky-500 focus-visible:ring-2"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="flex items-center gap-1 text-xs text-rose-600">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Demo autofill */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={fillDemo}
            className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-500 shadow-sm transition-all hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 active:scale-[0.97]"
          >
            Use Demo Admin
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Lista Tubig. All rights reserved.
        </p>
      </div>
    </div>
  );
}
