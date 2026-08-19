"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { zones } from "../data";

const customerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  address: z.string().min(1, "Address is required"),
  zone: z.string().min(1, "Zone is required"),
  meterSerial: z.string().min(1, "Meter serial is required"),
  initialReading: z.number().min(0, "Must be 0 or greater"),
  accountType: z.string().min(1, "Account type is required"),
});

type CustomerFormData = z.infer<typeof customerSchema>;

export function AddCustomerModal() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
      zone: "",
      meterSerial: "",
      initialReading: 0,
      accountType: "",
    },
  });

  const onSubmit = (data: CustomerFormData) => {
    console.log("Customer submitted:", data);
    reset();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v ?? false);
        if (!v) reset();
      }}
    >
      <DialogTrigger className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700">
        <Plus className="h-4 w-4" />
        Add New Customer
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>
            Register a new household or commercial account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Juan"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-xs text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Dela Cruz"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-xs text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Contact Number</Label>
              <Input
                id="phoneNumber"
                placeholder="0917-123-4567"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <p className="text-xs text-destructive">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Installation Address</Label>
            <Input
              id="address"
              placeholder="123 Street Name"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-xs text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Zone / District</Label>
              <Select
                value={watch("zone")}
                onValueChange={(v) =>
                  setValue("zone", v ?? "", { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select zone" />
                </SelectTrigger>
                <SelectContent>
                  {zones.map((z) => (
                    <SelectItem key={z} value={z}>
                      {z}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.zone && (
                <p className="text-xs text-destructive">
                  {errors.zone.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Account Type</Label>
              <Select
                value={watch("accountType")}
                onValueChange={(v) =>
                  setValue("accountType", v ?? "", { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
              {errors.accountType && (
                <p className="text-xs text-destructive">
                  {errors.accountType.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meterSerial">Meter Serial Number</Label>
              <Input
                id="meterSerial"
                placeholder="WM-XXXXX"
                className="font-mono"
                {...register("meterSerial")}
              />
              {errors.meterSerial && (
                <p className="text-xs text-destructive">
                  {errors.meterSerial.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="initialReading">Initial Reading (m&#179;)</Label>
              <Input
                id="initialReading"
                type="number"
                step="0.01"
                className="font-mono"
                {...register("initialReading", { valueAsNumber: true })}
              />
              {errors.initialReading && (
                <p className="text-xs text-destructive">
                  {errors.initialReading.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-sky-600 text-white hover:bg-sky-700"
              disabled={isSubmitting}
            >
              Create Account
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
