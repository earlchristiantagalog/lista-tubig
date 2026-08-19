"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, Calculator } from "lucide-react";

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
import { households, RATE_PER_CUBIC_METER } from "../data";

const readingSchema = z.object({
  householdId: z.string().min(1, "Please select a household"),
  currentReading: z
    .number()
    .min(0, "Reading must be positive"),
  readingDate: z.string().min(1, "Reading date is required"),
});

type ReadingFormData = z.infer<typeof readingSchema>;

export function RecordReadingDialog() {
  const [open, setOpen] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState<
    (typeof households)[0] | null
  >(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReadingFormData>({
    resolver: zodResolver(readingSchema),
    defaultValues: {
      householdId: "",
      currentReading: 0,
      readingDate: new Date().toISOString().split("T")[0],
    },
  });

  const currentReading = watch("currentReading");
  const previousReading = selectedHousehold ? 4520 : 0;
  const consumption =
    currentReading > previousReading ? currentReading - previousReading : 0;
  const totalAmount = consumption * RATE_PER_CUBIC_METER;

  const handleHouseholdChange = (value: string | null) => {
    if (!value) return;
    const household = households.find((h) => h.id === value);
    setSelectedHousehold(household || null);
    setValue("householdId", value, { shouldValidate: true });
  };

  const onSubmit = (data: ReadingFormData) => {
    console.log("Reading submitted:", {
      ...data,
      previousReading,
      consumption,
      totalAmount,
    });
    reset();
    setSelectedHousehold(null);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v: boolean | null) => {
        setOpen(v ?? false);
        if (!v) {
          reset();
          setSelectedHousehold(null);
        }
      }}
    >
      <DialogTrigger className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700">
        <Calculator className="h-4 w-4" />
        Record Reading
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Record Water Reading</DialogTitle>
          <DialogDescription>
            Enter the meter reading for a household account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Household selector */}
          <div className="space-y-2">
            <Label>Household / Account</Label>
            <Select
              value={watch("householdId")}
              onValueChange={handleHouseholdChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a household" />
              </SelectTrigger>
              <SelectContent>
                {households
                  .filter((h) => h.status === "active")
                  .map((h) => (
                    <SelectItem key={h.id} value={h.id}>
                      {h.name} — {h.accountNumber}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {errors.householdId && (
              <p className="text-xs text-destructive">
                {errors.householdId.message}
              </p>
            )}
          </div>

          {/* Meter info */}
          {selectedHousehold && (
            <div className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-muted/50 p-3">
              <div>
                <p className="text-xs text-muted-foreground">Meter Number</p>
                <p className="text-sm font-medium">
                  {selectedHousehold.meterNumber}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm font-medium">
                  {selectedHousehold.address}
                </p>
              </div>
            </div>
          )}

          {/* Readings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Previous Reading (m³)</Label>
              <Input
                type="number"
                value={previousReading}
                disabled
                className="bg-muted/50 font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentReading">Current Reading (m³)</Label>
              <Input
                id="currentReading"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="font-mono"
                {...register("currentReading", { valueAsNumber: true })}
              />
              {errors.currentReading && (
                <p className="text-xs text-destructive">
                  {errors.currentReading.message}
                </p>
              )}
            </div>
          </div>

          {/* Auto-calculated summary */}
          {selectedHousehold && consumption > 0 && (
            <div className="grid grid-cols-2 gap-4 rounded-lg border border-sky-200 bg-sky-50 p-3">
              <div>
                <p className="text-xs text-sky-600/80">Total Consumption</p>
                <p className="text-lg font-bold text-sky-700">
                  {consumption} m³
                </p>
              </div>
              <div>
                <p className="text-xs text-sky-600/80">Total Amount</p>
                <p className="text-lg font-bold text-sky-700">
                  ₱
                  {totalAmount.toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          )}

          {/* Reading date */}
          <div className="space-y-2">
            <Label htmlFor="readingDate">Reading Date</Label>
            <Input id="readingDate" type="date" {...register("readingDate")} />
            {errors.readingDate && (
              <p className="text-xs text-destructive">
                {errors.readingDate.message}
              </p>
            )}
          </div>

          {/* Photo upload */}
          <div className="space-y-2">
            <Label>Photo Proof (optional)</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Camera className="h-4 w-4" />
                Upload Photo
              </Button>
              <span className="text-xs text-muted-foreground">
                JPG, PNG up to 5MB
              </span>
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
              disabled={isSubmitting || !selectedHousehold}
            >
              Save Reading
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
