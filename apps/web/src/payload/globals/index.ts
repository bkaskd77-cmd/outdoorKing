import type { GlobalConfig } from "payload";

import { companyFactsWrite, hasPermission, staffWrite } from "../access";
import { staffGlobalAdmin } from "../staff-admin";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: staffGlobalAdmin(),
  access: { read: () => true, update: staffWrite },
  fields: [
    { name: "tagline", type: "text" },
    { name: "defaultSeoTitle", type: "text" },
    { name: "defaultSeoDescription", type: "textarea" },
  ],
};

export const CompanyFacts: GlobalConfig = {
  slug: "company-facts",
  admin: staffGlobalAdmin(),
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
  admin: staffGlobalAdmin(),
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
  admin: staffGlobalAdmin(),
  access: { read: () => true, update: staffWrite },
  fields: [
    { name: "legalLine", type: "text" },
    { name: "securityTxt", type: "text", defaultValue: "/.well-known/security.txt" },
  ],
};

export const SafetyRules: GlobalConfig = {
  slug: "safety-rules",
  admin: staffGlobalAdmin(),
  access: { read: () => true, update: staffWrite },
  fields: [
    { name: "maxSleepGainAbove3000M", type: "number", defaultValue: 550 },
    { name: "restEveryDays", type: "number", defaultValue: 4 },
    { name: "luklaContingencyRequired", type: "checkbox", defaultValue: true },
  ],
};

export const PaymentPolicy: GlobalConfig = {
  slug: "payment-policy",
  admin: staffGlobalAdmin(),
  access: {
    read: ({ req }) => hasPermission(req.user, "finance:read"),
    update: ({ req }) => hasPermission(req.user, "finance:read"),
  },
  fields: [
    { name: "depositPct", type: "number", defaultValue: 30, min: 10, max: 100 },
    { name: "balanceDueDaysBefore", type: "number", defaultValue: 45, min: 7, max: 120 },
  ],
};
