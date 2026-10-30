import type { GlobalConfig } from "payload";

import { companyFactsWrite, hasPermission, staffWrite } from "../access";
import { staffGlobalAdmin } from "../staff-admin";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: staffGlobalAdmin({ description: "Tagline and default search text." }),
  access: { read: () => true, update: staffWrite },
  fields: [
    { name: "tagline", type: "text" },
    { name: "defaultSeoTitle", type: "text" },
    { name: "defaultSeoDescription", type: "textarea" },
  ],
};

export const CompanyFacts: GlobalConfig = {
  slug: "company-facts",
  label: "Company details",
  admin: staffGlobalAdmin({
    description: "Licence, registration and address. Changes need a proof document.",
  }),
  access: {
    read: () => true,
    update: companyFactsWrite,
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (!hasPermission(req.user, "company_facts:write")) {
          throw new Error("company-facts updates require company_facts:write.");
        }
        if (data && !data.proof) {
          throw new Error("company-facts changes require a proof upload.");
        }
        return data;
      },
    ],
  },
  fields: [
    { name: "licenceNo", type: "text" },
    { name: "legalEntity", type: "text" },
    { name: "address", type: "text" },
    { name: "pan", type: "text" },
    { name: "foundedYear", type: "text" },
    { name: "memberships", type: "textarea" },
    { name: "reviewSummary", type: "text" },
    { name: "proof", type: "upload", relationTo: "media" },
  ],
};

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Menu",
  admin: staffGlobalAdmin({ description: "Links in the site's main menu." }),
  access: { read: () => true, update: staffWrite },
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
  ],
};

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  admin: staffGlobalAdmin({ description: "The line at the bottom of every page." }),
  access: { read: () => true, update: staffWrite },
  fields: [
    { name: "legalLine", type: "text" },
    { name: "securityTxt", type: "text", defaultValue: "/.well-known/security.txt" },
  ],
};

export const SafetyRules: GlobalConfig = {
  slug: "safety-rules",
  label: "Safety rules",
  admin: staffGlobalAdmin({
    description: "Altitude limits every trip itinerary is checked against.",
  }),
  access: { read: () => true, update: staffWrite },
  fields: [
    { name: "maxSleepGainAbove3000M", type: "number", defaultValue: 550 },
    { name: "restEveryDays", type: "number", defaultValue: 4 },
    { name: "luklaContingencyRequired", type: "checkbox", defaultValue: true },
  ],
};

export const PaymentPolicy: GlobalConfig = {
  slug: "payment-policy",
  label: "Payments",
  admin: staffGlobalAdmin({ description: "Default deposit and balance due dates." }),
  access: {
    read: ({ req }) => hasPermission(req.user, "finance:read"),
    update: ({ req }) => hasPermission(req.user, "finance:read"),
  },
  fields: [
    { name: "depositPct", type: "number", defaultValue: 30, min: 10, max: 100 },
    { name: "balanceDueDaysBefore", type: "number", defaultValue: 45, min: 7, max: 120 },
  ],
};
