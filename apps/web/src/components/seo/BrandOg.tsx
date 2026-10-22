import type { ReactNode } from "react";

export function BrandOgFrame({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}): ReactNode {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: "100%",
        height: "100%",
        padding: 72,
        background: "linear-gradient(180deg, #1c4a52 0%, #141c1a 100%)",
        color: "#f4efe6",
      }}
    >
      <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>
        {eyebrow ?? "OutdoorKing"}
      </div>
      <div style={{ fontSize: 64, fontWeight: 600, marginTop: 16, maxWidth: 980 }}>
        {title}
      </div>
      {subtitle ? (
        <div style={{ fontSize: 28, marginTop: 16, maxWidth: 900 }}>{subtitle}</div>
      ) : null}
    </div>
  );
}
