"use client";

const stats = [
  {
    label: "Earnings (Monthly)",
    value: "$40,000",
    color: "blue",
    icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5",
  },
  {
    label: "Earnings (Annual)",
    value: "$215,000",
    color: "emerald",
    icon: "M12 6v12m-3-2.818.879.659 1.171-1.096.681.521A3.375 3.375 0 0 0 18 15.75V6.75A2.25 2.25 0 0 0 15.75 4.5h-1.5A2.25 2.25 0 0 0 12 6.75v0Zm-3-2.818.879.659 1.171-1.096.681.521A3.375 3.375 0 0 0 15 6.75V6h-3Z",
  },
  {
    label: "Tasks",
    value: "50%",
    color: "cyan",
    icon: "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75",
    progress: 50,
  },
  {
    label: "Pending Requests",
    value: "18",
    color: "amber",
    icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-l-blue-500",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-l-emerald-500",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    text: "text-cyan-600 dark:text-cyan-400",
    border: "border-l-cyan-500",
    iconBg: "bg-cyan-100 dark:bg-cyan-900/50",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-l-amber-500",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
  },
};

const projects = [
  { name: "Server Migration", progress: 20, color: "bg-red-500" },
  { name: "Sales Tracking", progress: 40, color: "bg-amber-500" },
  { name: "Customer Database", progress: 60, color: "bg-blue-500" },
  { name: "Payout Details", progress: 80, color: "bg-cyan-500" },
  { name: "Account Setup", progress: 100, color: "bg-emerald-500", complete: true },
];

const revenueData = [
  { label: "Direct", color: "bg-blue-500" },
  { label: "Social", color: "bg-emerald-500" },
  { label: "Referral", color: "bg-cyan-500" },
];

const barValues = [30, 45, 65, 55, 80, 70, 90, 60, 75, 85, 50, 95];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Welcome back, here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const colors = colorMap[stat.color];
          return (
            <div
              key={stat.label}
              className={`rounded-xl border-l-4 ${colors.border} bg-white p-5 shadow-sm dark:bg-zinc-900`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className={`text-xs font-semibold uppercase tracking-wider ${colors.text}`}>
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    {stat.value}
                  </p>
                  {stat.progress !== undefined && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                        <div
                          className={`h-full rounded-full ${colors.iconBg.replace("bg-", "bg-")} transition-all`}
                          style={{ width: `${stat.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${colors.iconBg}`}>
                  <svg
                    className={`h-6 w-6 ${colors.text}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={stat.icon}
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Area chart placeholder */}
        <div className="col-span-1 rounded-xl bg-white p-6 shadow-sm lg:col-span-2 dark:bg-zinc-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Earnings Overview
            </h2>
            <button className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </button>
          </div>
          {/* Simple bar chart */}
          <div className="flex items-end gap-2" style={{ height: 200 }}>
            {barValues.map((val, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-blue-500 transition-all hover:bg-blue-600 dark:bg-blue-400"
                  style={{ height: `${val}%` }}
                />
                <span className="text-[10px] text-zinc-400">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie chart placeholder */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
          <h2 className="mb-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Revenue Sources
          </h2>
          {/* Donut chart via CSS */}
          <div className="mx-auto mb-4 flex items-center justify-center" style={{ width: 160, height: 160 }}>
            <div
              className="relative rounded-full"
              style={{
                width: 160,
                height: 160,
                background: `conic-gradient(#3b82f6 0% 45%, #10b981 45% 75%, #06b6d4 75% 100%)`,
              }}
            >
              <div className="absolute inset-6 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900">
                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">$215k</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {revenueData.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${item.color}`} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects & recent activity row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Projects */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
          <h2 className="mb-5 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.name}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {project.name}
                  </span>
                  <span className={`text-xs font-semibold ${project.complete ? "text-emerald-500" : "text-zinc-500 dark:text-zinc-400"}`}>
                    {project.complete ? "Complete!" : `${project.progress}%`}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div
                    className={`h-full rounded-full transition-all ${project.color}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
          <h2 className="mb-5 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { text: "New user registered", time: "2 min ago", color: "bg-emerald-500" },
              { text: "Listing approved", time: "15 min ago", color: "bg-blue-500" },
              { text: "Payment received", time: "1 hour ago", color: "bg-amber-500" },
              { text: "Server alert resolved", time: "3 hours ago", color: "bg-cyan-500" },
              { text: "New report generated", time: "5 hours ago", color: "bg-purple-500" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1 flex h-2.5 w-2.5 flex-shrink-0 items-center justify-center">
                  <span className={`block h-2.5 w-2.5 rounded-full ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">{activity.text}</p>
                  <p className="text-xs text-zinc-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
