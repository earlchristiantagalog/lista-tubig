"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCards } from "./components/kpi-cards";
import { ConsumptionChart, RevenueChart } from "./components/charts";
import { RecordReadingDialog } from "./components/record-reading-dialog";
import { TransactionsTable } from "./components/transactions-table";
import { kpiCards, consumptionData, invoices } from "./data";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Overview of your water utility operations.
          </p>
        </div>
        <RecordReadingDialog />
      </div>

      {/* KPI Cards */}
      <KpiCards cards={kpiCards} />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ConsumptionChart data={consumptionData} />
        <RevenueChart data={consumptionData} />
      </div>

      {/* Transactions Table */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                Recent Transactions
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Latest invoices and payment statuses
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TransactionsTable invoices={invoices} />
        </CardContent>
      </Card>
    </div>
  );
}
