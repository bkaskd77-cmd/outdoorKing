import { redirect } from "next/navigation";

import { quotesHref } from "@/components/desk/paths";

export default function DeskOpsPage() {
  redirect(quotesHref("ops"));
}
