"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  BarChart3,
  Receipt,
  ShieldCheck,
  Zap,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email or Account ID is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const features = [
  {
    icon: BarChart3,
    title: "Real-time Consumption Tracking",
    description: "Monitor water usage patterns with live dashboards and analytics.",
  },
  {
    icon: Receipt,
    title: "Automated Utility Billing",
    description: "Generate invoices and track payments with zero manual effort.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Grade Security",
    description: "Role-based access control with audit logs and session management.",
  },
];

const demoAccounts = [
  { role: "Admin", email: "admin@listatubig.ph", password: "admin123" },
  { role: "Staff", email: "staff@listatubig.ph", password: "staff123" },
  { role: "Customer", email: "customer@listatubig.ph", password: "cust123" },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeRole, setActiveRole] = useState<"admin" | "customer">("admin");
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setGlobalError(null);
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (data.email === "wrong@email.com") {
      setGlobalError("Invalid email or password. Please try again.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    window.location.href = "/admin";
  };

  const fillDemo = (account: (typeof demoAccounts)[0]) => {
    setValue("email", account.email, { shouldValidate: true });
    setValue("password", account.password, { shouldValidate: true });
    setGlobalError(null);
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* ─── Left Branding Panel ─── */}
      <div className="hidden relative overflow-hidden bg-slate-900 lg:flex lg:w-[58%]">
        {/* Gradient mesh background */}
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-sky-600/20 blur-[120px]" />
          <div className="absolute bottom-[-15%] right-[-5%] h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-[100px]" />
          <div className="absolute top-[40%] left-[30%] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Water wave SVG decoration */}
        <svg
          className="absolute bottom-0 left-0 w-full text-white/[0.03]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: "30%" }}
        >
          <path
            fill="currentColor"
            d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,218.7C672,213,768,171,864,165.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            fill="currentColor"
            d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,224C672,213,768,171,864,170.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            opacity="0.5"
          />
        </svg>

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-between p-12 xl:p-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500">
              <Droplets className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Lista Tubig
            </span>
          </motion.div>

          {/* Hero */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                Water Management,
                <br />
                <span className="text-sky-400">Simplified.</span>
              </h1>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-400">
                A modern platform for tracking consumption, automating billing,
                and managing household water accounts.
              </p>
            </motion.div>

            {/* Feature list */}
            <div className="space-y-5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                    <feature.icon className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xs text-slate-500"
          >
            &copy; {new Date().getFullYear()} Lista Tubig. All rights reserved.
          </motion.p>
        </div>
      </div>

      {/* ─── Right Auth Panel ─── */}
      <div className="flex flex-1 flex-col bg-slate-50/80">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[400px]"
          >
            {/* Mobile logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Lista Tubig
              </span>
            </div>

            {/* Role toggle */}
            <div className="mb-8">
              <div className="inline-flex rounded-lg bg-white p-1 shadow-sm ring-1 ring-slate-200">
                {(["admin", "customer"] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => setActiveRole(role)}
                    className={`relative rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                      activeRole === role
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {role === "admin" ? "Admin / Staff" : "Customer Portal"}
                  </button>
                ))}
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                {activeRole === "admin" ? "Welcome back" : "Customer Login"}
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">
                {activeRole === "admin"
                  ? "Sign in to your management dashboard"
                  : "Access your water account and billing details"}
              </p>
            </div>

            {/* Global Error */}
            <AnimatePresence>
              {globalError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <Alert variant="destructive" className="border-rose-200 bg-rose-50">
                    <AlertCircle className="h-4 w-4 text-rose-600" />
                    <AlertDescription className="text-rose-700">
                      {globalError}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                  {activeRole === "admin" ? "Email Address" : "Account ID / Email"}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    placeholder={
                      activeRole === "admin"
                        ? "admin@listatubig.ph"
                        : "Enter your account ID"
                    }
                    className="h-11 pl-10 bg-white ring-1 ring-slate-200 focus-visible:ring-sky-500 focus-visible:ring-2"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 text-xs text-rose-600"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.email.message}
                  </motion.p>
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
                    className="h-11 pl-10 pr-11 bg-white ring-1 ring-slate-200 focus-visible:ring-sky-500 focus-visible:ring-2"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 text-xs text-rose-600"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="rememberMe"
                  onCheckedChange={(checked) =>
                    setValue("rememberMe", checked === true)
                  }
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm text-slate-600 cursor-pointer"
                >
                  Remember me for 30 days
                </Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full bg-sky-600 text-white hover:bg-sky-700 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">or</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Demo credentials */}
            <div className="space-y-2">
              <p className="text-center text-xs font-medium text-slate-500">
                Quick access demo accounts
              </p>
              <div className="flex gap-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.role}
                    onClick={() => fillDemo(account)}
                    className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-xs font-medium text-slate-600 transition-all hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 active:scale-[0.97]"
                  >
                    {account.role}
                  </button>
                ))}
              </div>
            </div>

            {/* Sign up link */}
            <p className="mt-8 text-center text-sm text-slate-500">
              {activeRole === "admin" ? (
                <>
                  Need an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    Contact administrator
                  </a>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    Register here
                  </a>
                </>
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
