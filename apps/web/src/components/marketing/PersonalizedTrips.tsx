import { Container, Heading, Section, Text } from "@ok/ui";
import { getTranslations } from "next-intl/server";

import { tripsForRequester } from "@/lib/personalization";
import { getAuthSession } from "@/lib/session";

export async function PersonalizedTrips() {
  const session = await getAuthSession();
  const email = session?.user.email;
  if (!email) return null;
  const trips = tripsForRequester(email);
  if (trips.length === 0) return null;
  const t = await getTranslations();
  return (
    <Section>
      <Container>
        <Heading as="h2">{t("forYou")}</Heading>
        <Text muted className="mt-2">
          {t("forYouLead")}
        </Text>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {trips.map((trip) => (
            <li key={trip.slug} className="rounded-xl bg-surface p-6 shadow-1">
              <Heading as="h3">
                <a href={`/trips/${trip.slug}`}>{trip.title}</a>
              </Heading>
              <Text muted className="mt-2">
                {trip.subtitle}
              </Text>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
