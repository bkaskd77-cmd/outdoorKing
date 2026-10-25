import { redirect } from "next/navigation";

import { quotesHref } from "@/components/desk/paths";

export default function DeskAnalyticsPage() {
  redirect(quotesHref("analytics"));
}
