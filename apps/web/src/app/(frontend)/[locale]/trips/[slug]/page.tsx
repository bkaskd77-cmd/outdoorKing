import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { TripDetail } from "@/components/trip/TripDetail";
import { getTrip, getTrips } from "@/content/catalog";
import { canonical } from "@/lib/site";

export function generateStaticParams() {
  return getTrips().map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) return {};
  return {
    title: trip.title,
    description: trip.overview.slice(0, 160),
    alternates: {
      canonical: canonical(`/trips/${trip.slug}`),
      languages: {
        en: canonical(`/trips/${trip.slug}`),
        "x-default": canonical(`/trips/${trip.slug}`),
      },
    },
    robots: trip.status === "draft" ? { index: false, follow: false } : undefined,
  };
}

export default async function TripPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const trip = getTrip(slug);
  if (!trip) notFound();
  return <TripDetail trip={trip} />;
}
