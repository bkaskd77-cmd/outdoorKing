import {
  loadBookingPipeline,
  loadPipeline,
  loadQuotePipeline,
  loadStaffContext,
} from "@/app/(frontend)/actions/desk";

import { quotesHref } from "./paths";

export async function PipelineScreen() {
  const ctx = await loadStaffContext();
  if (!ctx.ok) return null;
  const desk = await loadPipeline();
  const quotes = ctx.canQuotes ? await loadQuotePipeline() : null;
  const bookings = ctx.canBookings ? await loadBookingPipeline() : null;
  const requestCount = desk.ok ? desk.rows.length : 0;
  const quoteCount = quotes?.ok ? quotes.rows.length : 0;
  const bookingCount = bookings?.ok ? bookings.rows.length : 0;

  return (
    <div className="ok-desk-board">
      {!ctx.canLeads ? (
        <article className="ok-desk-empty">
          <p className="ok-desk-empty-kicker">Sales</p>
          <h2>Quotes stay with the desk</h2>
          <p>
            This role edits journeys from Content. Ask an admin if you also need the
            pipeline.
          </p>
        </article>
      ) : requestCount === 0 ? (
        <article className="ok-desk-empty">
          <p className="ok-desk-empty-kicker">Pipeline</p>
          <h2>No requests yet</h2>
          <p>
            When a traveler asks for a journey, their name, dates, and route land here.
            Quote them from this desk.
          </p>
        </article>
      ) : (
        <ul className="ok-desk-list">
          {desk.rows.map((row) => (
            <li key={row.id}>
              <a href={quotesHref(row.id)}>
                <strong>
                  {row.name}
                  <span>{row.tripSlug ?? "Custom journey"}</span>
                </strong>
                <em>
                  {row.status}
                  {row.affiliateCode ? ` · ${row.affiliateCode}` : ""}
                </em>
              </a>
            </li>
          ))}
        </ul>
      )}

      <ul className="ok-desk-stats">
        {ctx.canLeads ? (
          <li>
            <strong>{requestCount}</strong>
            <span>Requests</span>
          </li>
        ) : null}
        {ctx.canQuotes ? (
          <li>
            <strong>{quoteCount}</strong>
            <span>Quotes</span>
          </li>
        ) : null}
        {ctx.canBookings ? (
          <li>
            <strong>{bookingCount}</strong>
            <span>Bookings</span>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
