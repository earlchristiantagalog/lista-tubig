"use client";

import { useState } from "react";
import { CustomerTable } from "./components/customer-table";
import { CustomerDrawer } from "./components/customer-drawer";
import { AddCustomerModal } from "./components/add-customer-modal";
import { CustomerKpiCards } from "./components/kpi-cards";
import { customers } from "./data";
import type { Customer } from "./types";

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    console.log("Edit:", customer);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Customer Accounts
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage household and commercial water service accounts.
          </p>
        </div>
        <AddCustomerModal />
      </div>

      {/* KPI Cards */}
      <CustomerKpiCards customers={customers} />

      {/* Data Table */}
      <CustomerTable
        customers={customers}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
      />

      {/* Side Drawer */}
      <CustomerDrawer
        customer={selectedCustomer}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}