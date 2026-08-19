"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Gauge,
  Droplets,
  FileText,
  Pencil,
  Wrench,
} from "lucide-react";
import type { Customer } from "../types";

const statusConfig = {
  active: { label: "Active", className: "bg-emerald-100 text-emerald-700" },
  disconnected: {
    label: "Disconnected",
    className: "bg-rose-100 text-rose-700",
  },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700" },
};

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

interface CustomerDrawerProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomerDrawer({
  customer,
  open,
  onOpenChange,
}: CustomerDrawerProps) {
  if (!customer) return null;
  const c = customer;
  const cfg = statusConfig[c.status];
  const validHistory = c.consumptionHistory.filter((h) => h.consumption > 0);
  const avgUsage =
    validHistory.length > 0
      ? validHistory.reduce((sum, h) => sum + h.consumption, 0) /
        validHistory.length
      : 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sky-100 text-lg font-bold text-sky-700">
              {getInitials(c.firstName, c.lastName)}
            </div>
            <div>
              <SheetTitle className="text-lg">
                {c.firstName} {c.lastName}
              </SheetTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className={cfg.className}>
                  {cfg.label}
                </Badge>
                <span className="text-sm text-muted-foreground font-mono">
                  {c.accountNumber}
                </span>
              </div>
            </div>
          </div>
          <SheetDescription>
            {c.accountType.charAt(0).toUpperCase() + c.accountType.slice(1)}{" "}
            Account
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 p-4">
          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Contact Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" /> {c.phoneNumber}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" /> {c.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {c.address}, {c.zone}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" /> Member since {c.joinDate}
              </div>
            </div>
          </div>

          <Separator />

          {/* Meter Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Meter Information
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-muted-foreground">Serial #</p>
                <p className="font-mono text-sm font-medium">
                  {c.meter.serialNumber}
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-muted-foreground">
                  Initial Reading
                </p>
                <p className="font-mono text-sm font-medium">
                  {c.meter.initialReading} m&#179;
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-muted-foreground">Installed</p>
                <p className="text-sm font-medium">
                  {c.meter.installationDate}
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-muted-foreground">Last Reading</p>
                <p className="text-sm font-medium">
                  {c.meter.lastReadingDate}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Quick Stats */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Account Summary
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-sky-50 p-3">
                <div className="flex items-center gap-1.5 text-sky-600">
                  <Droplets className="h-4 w-4" />
                  <p className="text-xs font-medium">Avg. Usage</p>
                </div>
                <p className="text-lg font-bold text-sky-700">
                  {avgUsage.toFixed(0)} m&#179;/mo
                </p>
              </div>
              <div className="rounded-lg bg-amber-50 p-3">
                <div className="flex items-center gap-1.5 text-amber-600">
                  <Gauge className="h-4 w-4" />
                  <p className="text-xs font-medium">Balance</p>
                </div>
                <p
                  className={`text-lg font-bold ${
                    c.balance > 0 ? "text-rose-600" : "text-emerald-600"
                  }`}
                >
                  &#8369;
                  {c.balance.toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Consumption History */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Consumption History
            </h3>
            <div className="space-y-2">
              {c.consumptionHistory.map((h) => (
                <div
                  key={h.month}
                  className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{h.month}</p>
                    <p className="text-xs text-muted-foreground">
                      {h.reading} m&#179; &middot; {h.consumption} m&#179; used
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {h.amount > 0
                        ? `&#8369;${h.amount.toLocaleString()}`
                        : "\u2014"}
                    </p>
                    <Badge
                      variant="secondary"
                      className={
                        h.status === "paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : h.status === "overdue"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                      }
                    >
                      {h.status.charAt(0).toUpperCase() + h.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                className="gap-2 bg-sky-600 text-white hover:bg-sky-700"
              >
                <FileText className="h-4 w-4" /> Generate Invoice
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Gauge className="h-4 w-4" /> Log Reading
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Wrench className="h-4 w-4" /> Manage Connection
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Pencil className="h-4 w-4" /> Edit Account
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
