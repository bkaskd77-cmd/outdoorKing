import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [] as { slug: string }[];
}

export default function TeamMemberPage() {
  notFound();
}
