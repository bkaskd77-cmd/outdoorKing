import pino from "pino";

export const logger = pino({
  level: "info",
  redact: {
    paths: [
      "*.email",
      "*.phone",
      "*.passport",
      "*.passportNumber",
      "authorization",
      "cookie",
      "*.token",
      "*.secret",
      "*.password",
    ],
    censor: "[REDACTED]",
  },
});
