export interface Household {
  id: string;
  accountNumber: string;
  name: string;
  address: string;
  meterNumber: string;
  status: "active" | "inactive" | "disconnected";
}

export interface MeterReading {
  id: string;
  householdId: string;
  householdName: string;
  meterNumber: string;
  previousReading: number;
  currentReading: number;
  consumption: number;
  readingDate: string;
  photoUrl?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  householdId: string;
  householdName: string;
  meterNumber: string;
  readingDate: string;
  previousReading: number;
  currentReading: number;
  consumption: number;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  paidDate?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  householdName: string;
  amount: number;
  paymentDate: string;
  method: "cash" | "gcash" | "bank_transfer" | "check";
  referenceNumber?: string;
}

export interface KPICard {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  color: "sky" | "emerald" | "amber" | "rose";
}

export interface ConsumptionDataPoint {
  month: string;
  consumption: number;
  revenue: number;
  unpaid: number;
}
