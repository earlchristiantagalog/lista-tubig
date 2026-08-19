"use client";

import { Users, Droplets, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Customer } from "../types";

interface CustomerKpiCardsProps {
  customers: Customer[];
}

export function CustomerKpiCards({ customers }: CustomerKpiCardsProps) {
  const active = customers.filter((c) => c.status === "active").length;
  const totalMeters = customers.length;
  const outstanding = customers.filter((c) => c.balance > 0).length;
  const avgUsage =
    customers.reduce((sum, c) => {
      const validHistory = c.consumptionHistory.filter(
        (h) => h.consumption > 0
      );
      const cusAvg =
        validHistory.length > 0
          ? validHistory.reduce((s, h) => s + h.consumption, 0) /
            validHistory.length
          : 0;
      return sum + cusAvg;
    }, 0) / Math.max(customers.length, 1);

  const cards = [
    {
      title: "Active Households",
      value: active.toString(),
      icon: Users,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Connected Meters",
      value: totalMeters.toString(),
      icon: Droplets,
      color: "bg-sky-50 text-sky-600",
    },
    {
      title: "Outstanding Accounts",
      value: outstanding.toString(),
      icon: AlertTriangle,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Avg. Monthly Usage",
      value: `${avgUsage.toFixed(0)} m\u00B3`,
      icon: TrendingUp,
      color: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  {card.value}
                </p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.color}`}
              >
                <card.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
