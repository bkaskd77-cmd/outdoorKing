import { Heading, Text } from "@ok/ui";

import { loadOpsBoard, loadStaffContext } from "@/app/(frontend)/actions/desk";

import { DepartureForm, GuideAssignmentForm, PermitForm } from "./OpsForms";

export async function OpsScreen() {
  const ctx = await loadStaffContext();
  if (!ctx.ok) return null;
  const board = await loadOpsBoard();

  return (
    <>
      <Heading as="h1">Operations</Heading>
      {!board.ok ? (
        <Text className="mt-4">This role cannot open ops.</Text>
      ) : (
        <div className="mt-8 grid gap-10">
          {board.canWrite ? (
            <div className="grid gap-6 md:grid-cols-3">
              <GuideAssignmentForm />
              <DepartureForm />
              <PermitForm />
            </div>
          ) : (
            <Text>Read-only. Ops write is limited to the ops role and admins.</Text>
          )}
          <section>
            <Heading as="h2">Guide assignments</Heading>
            <ul className="mt-4 grid gap-2">
              {board.assignments.length === 0 ? (
                <li>None yet.</li>
              ) : (
                board.assignments.map((row) => (
                  <li key={row.id} className="rounded-md border border-border p-3">
                    {row.guidePayloadId} · {row.role} · booking {row.bookingId}
                  </li>
                ))
              )}
            </ul>
          </section>
          <section>
            <Heading as="h2">Departures</Heading>
            <ul className="mt-4 grid gap-2">
              {board.departures.length === 0 ? (
                <li>None yet.</li>
              ) : (
                board.departures.map((row) => (
                  <li key={row.id} className="rounded-md border border-border p-3">
                    {row.tripSlug} · {row.startDate} · {row.status}
                  </li>
                ))
              )}
            </ul>
          </section>
          <section>
            <Heading as="h2">Permit applications</Heading>
            <ul className="mt-4 grid gap-2">
              {board.permits.length === 0 ? (
                <li>None yet.</li>
              ) : (
                board.permits.map((row) => (
                  <li key={row.id} className="rounded-md border border-border p-3">
                    {row.permitPayloadId} · {row.status}
                    {row.reference ? ` · ${row.reference}` : ""}
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      )}
    </>
  );
}
