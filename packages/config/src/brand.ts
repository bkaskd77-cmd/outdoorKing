/**
 * Public brand identity. Change this module — and only this module —
 * when the trading name is confirmed.
 */
export const brand = {
  name: "OutdoorKing",
  shortName: "OK",
  domain: "outdoorking.com",
  mediaHost: "media.outdoorking.com",
  siteUrl: "https://www.outdoorking.com",
  emailFrom: "hello@outdoorking.com",
  securityEmail: "security@outdoorking.com",
} as const;

export type Brand = typeof brand;

export const brandName = brand.name;
