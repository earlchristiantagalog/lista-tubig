"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ConsumptionDataPoint } from "../types";

const formatCurrency = (value: number) =>
  `₱${(value / 1000).toFixed(0)}k`;

export function ConsumptionChart({
  data,
}: {
  data: ConsumptionDataPoint[];
}) {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Consumption Trend
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Monthly water usage (m³) over the past 12 months
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(v: number) => `${v}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
                formatter={(value) => [
                  `${value} m³`,
                  "Consumption",
                ]}
              />
              <Line
                type="monotone"
                dataKey="consumption"
                stroke="hsl(210, 90%, 45%)"
                strokeWidth={2.5}
                dot={{ fill: "hsl(210, 90%, 45%)", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function RevenueChart({
  data,
}: {
  data: ConsumptionDataPoint[];
}) {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Revenue vs. Unpaid Bills
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Collections and outstanding balances
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={formatCurrency}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
                formatter={(
                  value,
                  name,
                ) => [
                  `₱${Number(value).toLocaleString()}`,
                  name === "revenue" ? "Revenue" : "Unpaid",
                ]}
              />
              <Legend
                formatter={(value: string) =>
                  value === "revenue" ? "Revenue" : "Unpaid"
                }
                iconType="circle"
                iconSize={8}
              />
              <Bar
                dataKey="revenue"
                fill="hsl(210, 90%, 45%)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="unpaid"
                fill="hsl(32, 95%, 55%)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
