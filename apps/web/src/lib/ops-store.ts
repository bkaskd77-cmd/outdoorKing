import { randomUUID } from "node:crypto";

export type StoredGuideAssignment = {
  id: string;
  bookingId: string;
  guidePayloadId: string;
  role: string;
  fromDate?: string;
  toDate?: string;
  notes?: string;
  createdAt: string;
};

export type StoredDeparture = {
  id: string;
  tripSlug: string;
  startDate: string;
  endDate?: string;
  status: string;
  capacity?: string;
  notes?: string;
  createdAt: string;
};

export type StoredPermitApplication = {
  id: string;
  bookingId: string;
  permitPayloadId: string;
  status: string;
  reference?: string;
  notes?: string;
  createdAt: string;
};

const assignments = new Map<string, StoredGuideAssignment>();
const departures = new Map<string, StoredDeparture>();
const permits = new Map<string, StoredPermitApplication>();

export function assignGuide(input: {
  bookingId: string;
  guidePayloadId: string;
  role: string;
  fromDate?: string;
  toDate?: string;
  notes?: string;
}): StoredGuideAssignment {
  const row: StoredGuideAssignment = {
    id: randomUUID(),
    bookingId: input.bookingId,
    guidePayloadId: input.guidePayloadId,
    role: input.role,
    fromDate: input.fromDate,
    toDate: input.toDate,
    notes: input.notes,
    createdAt: new Date().toISOString(),
  };
  assignments.set(row.id, row);
  void persistAssignment(row);
  return row;
}

export function scheduleDeparture(input: {
  tripSlug: string;
  startDate: string;
  endDate?: string;
  status?: string;
  capacity?: string;
  notes?: string;
}): StoredDeparture {
  const row: StoredDeparture = {
    id: randomUUID(),
    tripSlug: input.tripSlug,
    startDate: input.startDate,
    endDate: input.endDate,
    status: input.status ?? "planned",
    capacity: input.capacity,
    notes: input.notes,
    createdAt: new Date().toISOString(),
  };
  departures.set(row.id, row);
  void persistDeparture(row);
  return row;
}

export function trackPermit(input: {
  bookingId: string;
  permitPayloadId: string;
  status?: string;
  reference?: string;
  notes?: string;
}): StoredPermitApplication {
  const row: StoredPermitApplication = {
    id: randomUUID(),
    bookingId: input.bookingId,
    permitPayloadId: input.permitPayloadId,
    status: input.status ?? "not_started",
    reference: input.reference,
    notes: input.notes,
    createdAt: new Date().toISOString(),
  };
  permits.set(row.id, row);
  void persistPermit(row);
  return row;
}

export function updatePermitStatus(
  id: string,
  status: string,
): StoredPermitApplication | undefined {
  const row = permits.get(id);
  if (!row) return undefined;
  row.status = status;
  permits.set(id, row);
  void persistPermit(row);
  return row;
}

export function listGuideAssignments() {
  return [...assignments.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function listDepartures() {
  return [...departures.values()].sort((a, b) => b.startDate.localeCompare(a.startDate));
}

export function listPermitApplications() {
  return [...permits.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

async function persistAssignment(row: StoredGuideAssignment) {
  try {
    const { db, guideAssignments } = await import("@ok/db");
    await db.insert(guideAssignments).values({
      id: row.id,
      bookingId: row.bookingId,
      guidePayloadId: row.guidePayloadId,
      role: row.role,
      fromDate: row.fromDate,
      toDate: row.toDate,
      notes: row.notes,
    });
  } catch {
    // preview/CI without Postgres
  }
}

async function persistDeparture(row: StoredDeparture) {
  try {
    const { db, departures: table } = await import("@ok/db");
    await db.insert(table).values({
      id: row.id,
      tripSlug: row.tripSlug,
      startDate: row.startDate,
      endDate: row.endDate,
      status: row.status,
      capacity: row.capacity,
      notes: row.notes,
    });
  } catch {
    // preview/CI without Postgres
  }
}

async function persistPermit(row: StoredPermitApplication) {
  try {
    const { db, permitApplications } = await import("@ok/db");
    await db
      .insert(permitApplications)
      .values({
        id: row.id,
        bookingId: row.bookingId,
        permitPayloadId: row.permitPayloadId,
        status: row.status,
        notes: row.notes,
      })
      .onConflictDoUpdate({
        target: permitApplications.id,
        set: { status: row.status, notes: row.notes },
      });
  } catch {
    // preview/CI without Postgres
  }
}
