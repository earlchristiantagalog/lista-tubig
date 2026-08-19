"use client";

import {
  Droplets,
  Home,
  PhilippinePeso,
  Percent,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { KPICard } from "../types";

const iconMap = {
  droplets: Droplets,
  home: Home,
  "philippine-peso": PhilippinePeso,
  percent: Percent,
};

const colorMap = {
  sky: {
    bg: "bg-sky-50",
    icon: "text-sky-600",
    badge: "bg-sky-100 text-sky-700",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
  },
  rose: {
    bg: "bg-rose-50",
    icon: "text-rose-600",
    badge: "bg-rose-100 text-rose-700",
  },
};

export function KpiCards({ cards }: { cards: KPICard[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = iconMap[card.icon as keyof typeof iconMap];
        const colors = colorMap[card.color];
        const isPositive = card.change >= 0;

        return (
          <Card key={card.title} className="border-border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    {card.value}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge}`}
                    >
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {isPositive ? "+" : ""}
                      {card.change}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {card.changeLabel}
                    </span>
                  </div>
                </div>
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colors.bg}`}
                >
                  <Icon className={`h-5 w-5 ${colors.icon}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
