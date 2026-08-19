export type CustomerStatus = "active" | "disconnected" | "pending";
export type BillingStatus = "paid" | "overdue" | "none";
export type AccountType = "residential" | "commercial";

export interface MeterInfo {
  serialNumber: string;
  initialReading: number;
  installationDate: string;
  lastReadingDate: string;
}

export interface ConsumptionRecord {
  month: string;
  reading: number;
  consumption: number;
  amount: number;
  status: "paid" | "overdue" | "pending";
}

export interface Customer {
  id: string;
  accountNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  zone: string;
  meter: MeterInfo;
  accountType: AccountType;
  status: CustomerStatus;
  balance: number;
  joinDate: string;
  consumptionHistory: ConsumptionRecord[];
}

export interface CustomerFilters {
  search: string;
  status: string;
  billingStatus: string;
  zone: string;
}
