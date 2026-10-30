"use client";

import { useDocumentInfo, useFormFields } from "@payloadcms/ui";
import { useEffect, useState } from "react";

import { checkTrip, type SafetyDay, type SafetyResult } from "@/payload/safety";

type Loaded =
  { state: "loading" } | { state: "failed" } | { state: "ready"; days: SafetyDay[] };

/**
 * Sidebar panel on the trip editor: runs the publish safety check on the trip's
 * itinerary as the editor works, so a refused publish is never a surprise.
 */
export function TripSafetyCheck() {
  const { id } = useDocumentInfo();
  const maxAltitudeM = useFormFields(([fields]) => fields.maxAltitudeM?.value) as
    number | undefined;
  const usesLukla = useFormFields(([fields]) => fields.usesLukla?.value) as
    boolean | undefined;
  const [loaded, setLoaded] = useState<Loaded>({ state: "loading" });

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    const query = new URLSearchParams({
      "where[trip][equals]": String(id),
      limit: "200",
      depth: "0",
      draft: "true",
      sort: "dayNumber",
    });
    fetch(`/api/itinerary-days?${query.toString()}`, {
      credentials: "include",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(String(response.status));
        const body = (await response.json()) as { docs?: SafetyDay[] };
        setLoaded({ state: "ready", days: body.docs ?? [] });
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoaded({ state: "failed" });
      });
    return () => controller.abort();
  }, [id]);

  if (!id) {
    return (
      <Panel tone="info" title="Safety check">
        <p>Save the trip, then add its itinerary days. The check runs on those days.</p>
      </Panel>
    );
  }
  if (loaded.state === "loading") {
    return (
      <Panel tone="info" title="Safety check">
        <p>Checking the itinerary…</p>
      </Panel>
    );
  }
  if (loaded.state === "failed") {
    return (
      <Panel tone="info" title="Safety check">
        <p>The itinerary did not load. Refresh to run the check.</p>
      </Panel>
    );
  }
  if (loaded.days.length === 0) {
    return (
      <Panel tone="info" title="Safety check">
        <p>No itinerary days yet. Add them in the Itinerary tab.</p>
      </Panel>
    );
  }

  const result: SafetyResult = checkTrip({ maxAltitudeM, usesLukla }, loaded.days);
  if (result.problems.length === 0) {
    return (
      <Panel tone="ok" title="Safety check passed">
        <p>
          {loaded.days.length} days checked. Highest point{" "}
          {(result.itineraryMaxM ?? 0).toLocaleString("en-US")} m.
        </p>
        <Findings items={result.warnings} label="Worth a look" />
      </Panel>
    );
  }
  return (
    <Panel tone="bad" title="Fix before publishing">
      <p>
        Publishing is blocked until these are fixed. You can still save drafts. Itinerary
        changes show here after you reload.
      </p>
      <Findings items={result.problems} />
      <Findings items={result.warnings} label="Also worth a look" />
    </Panel>
  );
}

function Panel({
  tone,
  title,
  children,
}: {
  tone: "ok" | "bad" | "info";
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`ok-safety ok-safety--${tone}`} aria-live="polite">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function Findings({
  items,
  label,
}: {
  items: { id: string; message: string }[];
  label?: string;
}) {
  if (items.length === 0) return null;
  return (
    <>
      {label ? <p className="ok-safety-label">{label}</p> : null}
      <ul>
        {items.map((item, index) => (
          <li key={`${item.id}-${String(index)}`}>{item.message}</li>
        ))}
      </ul>
    </>
  );
}
