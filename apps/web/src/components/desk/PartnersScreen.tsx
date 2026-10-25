import { Heading, Text } from "@ok/ui";

import { loadPartnerDesk, loadStaffContext } from "@/app/(frontend)/actions/desk";
import { canonical } from "@/lib/site";

import { PartnerForm } from "./PartnerForm";
import { quotesHref } from "./paths";

export async function PartnersScreen() {
  const ctx = await loadStaffContext();
  if (!ctx.ok) return null;
  const desk = await loadPartnerDesk();

  return (
    <>
      <Heading as="h1">Partners</Heading>
      {!desk.ok ? (
        <Text className="mt-4">This role cannot open the partner desk.</Text>
      ) : (
        <div className="mt-8 grid gap-10">
          <Text>
            Affiliate codes attribute trip requests. Partners see lead status only — never
            quote amounts or public prices.
          </Text>
          <PartnerForm />
          <section>
            <Heading as="h2">Active codes</Heading>
            <ul className="mt-4 grid gap-3">
              {desk.partners.map((row) => (
                <li key={row.id} className="rounded-md border border-border p-4">
                  <p className="font-semibold">
                    {row.name} · {row.code} · {row.status}
                  </p>
                  <p className="text-small text-muted-foreground">
                    {row.leads} referred requests · portal{" "}
                    {canonical(`/partners/${row.portalToken}`)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <Heading as="h2">Attributed requests</Heading>
            <ul className="mt-4 grid gap-2">
              {desk.leads.length === 0 ? (
                <li>None yet.</li>
              ) : (
                desk.leads.map((row) => (
                  <li key={row.id} className="rounded-md border border-border p-3">
                    <a className="underline" href={quotesHref(row.id)}>
                      {row.name} · {row.tripSlug ?? "custom"}
                    </a>
                    <p className="text-small text-muted-foreground">
                      {row.affiliateCode} · {row.status} · {row.email}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      )}
    </>
  );
}
