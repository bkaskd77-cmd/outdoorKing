import { env } from "@ok/env/server";

export async function initObservability() {
  if (env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    const { registerOTel } = await import("@vercel/otel");
    registerOTel({ serviceName: "outdoorking-web" });
  }
}

void initObservability();
