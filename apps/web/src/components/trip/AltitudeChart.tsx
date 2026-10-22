import type { CatalogDay } from "@/content/types";

export function AltitudeChart({ days }: { days: CatalogDay[] }) {
  const width = 720;
  const height = 240;
  const pad = 32;
  const maxAlt = Math.max(
    ...days.map((d) => Math.max(d.highPointM, d.sleepAltitudeM)),
    1,
  );
  const x = (i: number) => pad + (i / Math.max(days.length - 1, 1)) * (width - pad * 2);
  const y = (alt: number) => height - pad - (alt / maxAlt) * (height - pad * 2);
  const sleep = days
    .map((d, i) => `${String(x(i))},${String(y(d.sleepAltitudeM))}`)
    .join(" ");
  const high = days.map((d, i) => `${String(x(i))},${String(y(d.highPointM))}`).join(" ");

  return (
    <figure>
      <figcaption className="mb-3 text-small text-muted-foreground">
        Sleep altitude versus daily high point. Rest days are marked.
      </figcaption>
      <svg
        role="img"
        aria-label="Altitude profile showing sleep and high point for each day"
        viewBox={`0 0 ${String(width)} ${String(height)}`}
        className="w-full rounded-md bg-surface"
      >
        <polyline
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.35}
          strokeWidth={2}
          points={high}
        />
        <polyline fill="none" stroke="currentColor" strokeWidth={3} points={sleep} />
        {days.map((day, i) => (
          <g key={day.dayNumber}>
            <circle
              cx={x(i)}
              cy={y(day.sleepAltitudeM)}
              r={day.dayType === "rest-acclimatization" ? 6 : 3}
              fill={
                day.dayType === "rest-acclimatization" ? "currentColor" : "transparent"
              }
              stroke="currentColor"
            />
            {day.dayType === "rest-acclimatization" ? (
              <text
                x={x(i)}
                y={y(day.sleepAltitudeM) - 10}
                textAnchor="middle"
                fontSize={10}
              >
                Rest
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </figure>
  );
}
