export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-gradient-to-br from-zinc-100 via-white to-zinc-200 font-sans dark:from-black dark:via-zinc-950 dark:to-black">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200/60 bg-white/80 p-10 shadow-xl shadow-black/5 backdrop-blur-sm dark:border-white/[.08] dark:bg-zinc-900/80 dark:shadow-none dark:backdrop-blur-sm">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black dark:bg-zinc-50">
            <svg
              className="h-6 w-6 text-white dark:text-black"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Sign in to your account
          </p>
        </div>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Username / ID
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              autoFocus
              placeholder="you@example.com"
              className="h-11 rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-300 dark:focus:ring-zinc-300"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="h-11 rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-300 dark:focus:ring-zinc-300"
            />
          </div>

          <button
            type="submit"
            className="mt-1 h-11 rounded-xl bg-zinc-950 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
          Don&apos;t have an account?{" "}
          <a
            href="#"
            className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
          >
            Contact admin
          </a>
        </p>
      </div>
    </div>
  );
}
