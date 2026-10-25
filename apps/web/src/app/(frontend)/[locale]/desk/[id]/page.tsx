import { redirect } from "next/navigation";

import { quotesHref } from "@/components/desk/paths";

export default async function DeskRequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(quotesHref(id));
}
