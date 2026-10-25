"use client";

import { DefaultEditView, useConfig, useDocumentInfo } from "@payloadcms/ui";
import type { DocumentViewClientProps } from "payload";

function plain(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const preferred = record.en ?? record["zh-Hans"] ?? record.de ?? record.fr;
    if (typeof preferred === "string") return preferred.trim();
    for (const item of Object.values(record)) {
      if (typeof item === "string" && item.trim()) return item.trim();
    }
  }
  return "";
}

function labelText(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim()) return value;
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return plain(record.en) || plain(record.singular) || plain(record.plural) || fallback;
  }
  return fallback;
}

export function StaffDocument(props: DocumentViewClientProps) {
  const { collectionSlug, data, globalSlug, id } = useDocumentInfo();
  const { getEntityConfig } = useConfig();
  const entity = (
    collectionSlug
      ? getEntityConfig({ collectionSlug })
      : globalSlug
        ? getEntityConfig({ globalSlug })
        : null
  ) as {
    admin?: { useAsTitle?: string };
    labels?: { plural?: unknown; singular?: unknown };
  } | null;
  const useAsTitle = entity?.admin?.useAsTitle || "id";
  const title = plain(data?.[useAsTitle]) || (id ? "Untitled" : "New");
  const kicker = labelText(
    entity?.labels?.singular,
    collectionSlug ?? globalSlug ?? "Edit",
  );
  const plural = labelText(entity?.labels?.plural, kicker);
  const backHref = collectionSlug
    ? `/admin/collections/${collectionSlug}`
    : "/admin/quotes";

  return (
    <div className="ok-staff-doc">
      <header className="ok-desk-head">
        <p className="ok-desk-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="ok-desk-lead">
          <a href={backHref}>Back to {plural}</a>
        </p>
      </header>
      <DefaultEditView {...props} />
    </div>
  );
}
