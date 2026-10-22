"use client";

import { Button, Input, Label } from "@ok/ui";
import { useState, type ReactNode } from "react";

import {
  createDeparture,
  createGuideAssignment,
  createPermitApplication,
} from "@/app/(frontend)/actions/desk";

function FormStatus({
  action,
  children,
}: {
  action: (formData: FormData) => Promise<{ ok: boolean; error?: string }>;
  children: ReactNode;
}) {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  async function run(formData: FormData) {
    setError("");
    setDone(false);
    const result = await action(formData);
    if (!result.ok) {
      setError(result.error ?? "Could not save.");
      return;
    }
    setDone(true);
  }
  return (
    <form action={run} className="grid gap-3 rounded-md border border-border p-4">
      {children}
      {error ? (
        <p role="alert" className="text-small text-prayer-red">
          {error}
        </p>
      ) : null}
      {done ? <p role="status">Saved.</p> : null}
    </form>
  );
}

export function GuideAssignmentForm() {
  return (
    <FormStatus
      action={async (formData) =>
        createGuideAssignment({
          bookingId: String(formData.get("bookingId") ?? ""),
          guidePayloadId: String(formData.get("guidePayloadId") ?? ""),
          role: String(formData.get("role") ?? "lead"),
          fromDate: String(formData.get("fromDate") ?? "") || undefined,
          toDate: String(formData.get("toDate") ?? "") || undefined,
        })
      }
    >
      <p className="font-semibold">Assign guide</p>
      <Label htmlFor="bookingId">Booking id</Label>
      <Input id="bookingId" name="bookingId" required />
      <Label htmlFor="guidePayloadId">Guide payload id</Label>
      <Input id="guidePayloadId" name="guidePayloadId" required />
      <Label htmlFor="role">Role</Label>
      <Input id="role" name="role" defaultValue="lead" />
      <Label htmlFor="fromDate">From</Label>
      <Input id="fromDate" name="fromDate" type="date" />
      <Label htmlFor="toDate">To</Label>
      <Input id="toDate" name="toDate" type="date" />
      <Button type="submit">Save assignment</Button>
    </FormStatus>
  );
}

export function DepartureForm() {
  return (
    <FormStatus
      action={async (formData) =>
        createDeparture({
          tripSlug: String(formData.get("tripSlug") ?? ""),
          startDate: String(formData.get("startDate") ?? ""),
          endDate: String(formData.get("endDate") ?? "") || undefined,
          capacity: String(formData.get("capacity") ?? "") || undefined,
        })
      }
    >
      <p className="font-semibold">Schedule departure</p>
      <Label htmlFor="tripSlug">Trip slug</Label>
      <Input id="tripSlug" name="tripSlug" required />
      <Label htmlFor="startDate">Start</Label>
      <Input id="startDate" name="startDate" type="date" required />
      <Label htmlFor="endDate">End</Label>
      <Input id="endDate" name="endDate" type="date" />
      <Label htmlFor="capacity">Capacity</Label>
      <Input id="capacity" name="capacity" defaultValue="private" />
      <Button type="submit">Save departure</Button>
    </FormStatus>
  );
}

export function PermitForm() {
  return (
    <FormStatus
      action={async (formData) =>
        createPermitApplication({
          bookingId: String(formData.get("permitBookingId") ?? ""),
          permitPayloadId: String(formData.get("permitPayloadId") ?? ""),
          status: String(formData.get("status") ?? "not_started"),
          reference: String(formData.get("reference") ?? "") || undefined,
        })
      }
    >
      <p className="font-semibold">Track permit</p>
      <Label htmlFor="permitBookingId">Booking id</Label>
      <Input id="permitBookingId" name="permitBookingId" required />
      <Label htmlFor="permitPayloadId">Permit payload id</Label>
      <Input id="permitPayloadId" name="permitPayloadId" required />
      <Label htmlFor="status">Status</Label>
      <Input id="status" name="status" defaultValue="not_started" />
      <Label htmlFor="reference">Reference</Label>
      <Input id="reference" name="reference" />
      <Button type="submit">Save permit</Button>
    </FormStatus>
  );
}
