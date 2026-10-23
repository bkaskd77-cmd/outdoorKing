"use server";

import { getPartnerByPortalToken } from "@/lib/partner-store";
import { listRequestsForAffiliate } from "@/lib/quote-store";

export async function loadPartnerPortal(token: string) {
  const partner = getPartnerByPortalToken(token);
  if (!partner || partner.status !== "active") return null;
  const leads = listRequestsForAffiliate(partner.code).map((row) => ({
    id: row.id,
    tripSlug: row.tripSlug,
    status: row.status,
    createdAt: row.createdAt,
  }));
  return {
    partnerName: partner.name,
    code: partner.code,
    sharePath: `/?ref=${partner.code}`,
    leads,
  };
}
