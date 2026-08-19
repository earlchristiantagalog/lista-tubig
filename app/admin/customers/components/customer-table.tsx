"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Unplug,
  FileText,
  ArrowUpDown,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Customer } from "../types";
import { zones } from "../data";

const statusConfig = {
  active: { label: "Active", className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" },
  disconnected: { label: "Disconnected", className: "bg-rose-100 text-rose-700 hover:bg-rose-100" },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700 hover:bg-amber-100" },
};

const ROWS_PER_PAGE = 8;

function getInitials(firstName: string, lastName: string) {
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
}

interface CustomerTableProps {
  customers: Customer[];
  onViewDetails: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
}

export function CustomerTable({ customers, onViewDetails, onEdit }: CustomerTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [billingFilter, setBillingFilter] = useState("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Customer, unknown>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-sky-600"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)} />
        ),
        cell: ({ row }) => (
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-sky-600"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(e.target.checked)} />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "accountNumber",
        header: "Account #",
        cell: ({ row }) => (
          <span className="font-mono text-sm font-medium">{row.original.accountNumber}</span>
        ),
      },
      {
        id: "customer",
        header: "Customer",
        accessorFn: (row) => row.firstName + " " + row.lastName,
        cell: ({ row }) => {
          const c = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
                {getInitials(c.firstName, c.lastName)}
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{c.firstName} {c.lastName}</p>
                <p className="truncate text-xs text-muted-foreground">{c.phoneNumber}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "address",
        header: "Address / Zone",
        cell: ({ row }) => (
          <div>
            <p className="text-sm">{row.original.address}</p>
            <p className="text-xs text-muted-foreground">{row.original.zone}</p>
          </div>
        ),
      },
      {
        accessorFn: (row) => row.meter.serialNumber,
        id: "meter",
        header: "Meter #",
        cell: ({ row }) => (
          <span className="font-mono text-sm">{row.original.meter.serialNumber}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const cfg = statusConfig[row.original.status];
          return <Badge variant="secondary" className={cfg.className}>{cfg.label}</Badge>;
        },
      },
      {
        accessorKey: "balance",
        header: ({ column }) => (
          <button className="inline-flex items-center gap-1 hover:text-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Balance <ArrowUpDown className="h-3.5 w-3.5" />
          </button>
        ),
        cell: ({ row }) => {
          const balance = row.original.balance;
          const isOverdue = balance > 0 && row.original.consumptionHistory.some((h) => h.status === "overdue");
          const cls = "font-medium " + (isOverdue ? "text-rose-600" : "text-foreground");
          return (
            <span className={cls}>
              {"\u20B1"}{balance.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </span>
          );
        },
      },
      {
        id: "actions",
        enableHiding: false,
        size: 48,
        cell: ({ row }) => {
          const customer = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">
                <MoreHorizontal className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem className="gap-2" onClick={() => onViewDetails(customer)}>
                  <Eye className="h-4 w-4" /> View Details
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <FileText className="h-4 w-4" /> Record Reading
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2" onClick={() => onEdit(customer)}>
                  <Pencil className="h-4 w-4" /> Edit Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-destructive">
                  <Unplug className="h-4 w-4" /> Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [onViewDetails, onEdit]
  );

  const filteredData = useMemo(() => {
    return customers.filter((c) => {
      const q = search.toLowerCase();
      const fullName = (c.firstName + " " + c.lastName).toLowerCase();
      const matchesSearch = search === "" || fullName.includes(q) || c.accountNumber.toLowerCase().includes(q) || c.meter.serialNumber.toLowerCase().includes(q) || c.address.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      const matchesBilling = billingFilter === "all" || (billingFilter === "paid" && c.consumptionHistory.every((h) => h.status === "paid")) || (billingFilter === "overdue" && c.consumptionHistory.some((h) => h.status === "overdue"));
      const matchesZone = zoneFilter === "all" || c.zone === zoneFilter;
      return matchesSearch && matchesStatus && matchesBilling && matchesZone;
    });
  }, [customers, search, statusFilter, billingFilter, zoneFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search name, account, meter, address..." value={search}
            onChange={(e) => { setSearch(e.target.value); table.setPageIndex(0); }} className="pl-9" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v ?? "all"); table.setPageIndex(0); }}>
            <SelectTrigger className="w-[130px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="disconnected">Disconnected</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={billingFilter} onValueChange={(v) => { setBillingFilter(v ?? "all"); table.setPageIndex(0); }}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Billing" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Billing</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Select value={zoneFilter} onValueChange={(v) => { setZoneFilter(v ?? "all"); table.setPageIndex(0); }}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Zone" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              {zones.map((z) => (<SelectItem key={z} value={z}>{z}</SelectItem>))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="bg-slate-50/80">
                  {hg.headers.map((h) => (
                    <TableHead key={h.id} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    No customers found.
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer hover:bg-slate-50/50"
                    onClick={() => onViewDetails(row.original)}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Showing {currentPage * ROWS_PER_PAGE + 1} to {Math.min((currentPage + 1) * ROWS_PER_PAGE, filteredData.length)} of {filteredData.length} customers
          {Object.keys(rowSelection).length > 0 && (
            <span className="ml-2 font-medium text-sky-600">({Object.keys(rowSelection).length} selected)</span>
          )}
        </p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const isActive = p === currentPage + 1;
            const cls = isActive ? "h-8 w-8 bg-sky-600 text-white hover:bg-sky-700" : "h-8 w-8";
            return (
              <Button key={p} variant={isActive ? "default" : "outline"} size="icon" className={cls}
                onClick={() => table.setPageIndex(p - 1)}>
                {p}
              </Button>
            );
          })}
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
