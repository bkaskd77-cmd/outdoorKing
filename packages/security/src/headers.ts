import { brand } from "@ok/config";

export type CspOptions = {
  admin?: boolean;
  gatewayOrigins?: string[];
  reportUri?: string;
  r2AccountId?: string;
  unsafeEval?: boolean;
  vercelBlob?: boolean;
};

const mediaHost = `https://${brand.mediaHost}`;

export function buildCsp(nonce: string, options: CspOptions = {}): string {
  const gateways = (options.gatewayOrigins ?? []).filter(Boolean);
  const frameSrc = ["https://challenges.cloudflare.com", ...gateways].join(" ");
  const formAction = ["'self'", ...gateways].join(" ");
  const r2Connect = options.r2AccountId
    ? `https://${options.r2AccountId}.r2.cloudflarestorage.com`
    : "";
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    "https://challenges.cloudflare.com",
    options.unsafeEval ? "'unsafe-eval'" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const directives = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: ${mediaHost} https://*.maptiler.com`,
    "font-src 'self'",
    [
      "connect-src 'self'",
      "https://*.ingest.sentry.io",
      "https://api.maptiler.com",
      "https://*.maptiler.com",
      mediaHost,
      r2Connect,
      // Admin uploads go straight from the browser to Vercel Blob.
      options.vercelBlob ? "https://vercel.com/api/blob/" : "",
    ]
      .filter(Boolean)
      .join(" "),
    "worker-src 'self' blob:",
    `frame-src ${frameSrc}`,
    `form-action ${formAction}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "object-src 'none'",
    "media-src 'self'",
    "upgrade-insecure-requests",
    options.reportUri ? `report-uri ${options.reportUri}` : "report-to csp-endpoint",
  ];

  if (options.admin) {
    directives.push("frame-src 'self' https://challenges.cloudflare.com");
  }

  return directives.join("; ");
}

export function staticSecurityHeaders(): {
  source: string;
  headers: { key: string; value: string }[];
}[] {
  const headers = [
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value:
        "camera=(), microphone=(), geolocation=(), payment=(self), interest-cohort=()",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "Cross-Origin-Resource-Policy", value: "same-site" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-DNS-Prefetch-Control", value: "off" },
  ];

  return [
    { source: "/:path*", headers },
    {
      source: "/admin/:path*",
      headers: [...headers, { key: "Cache-Control", value: "no-store" }],
    },
  ];
}

export const STATIC_HEADER_NAMES = [
  "Strict-Transport-Security",
  "X-Content-Type-Options",
  "Referrer-Policy",
  "Permissions-Policy",
  "Cross-Origin-Opener-Policy",
  "Cross-Origin-Resource-Policy",
  "X-Frame-Options",
] as const;
