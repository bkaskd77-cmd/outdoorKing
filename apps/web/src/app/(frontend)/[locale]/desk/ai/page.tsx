import { redirect } from "next/navigation";

import { quotesHref } from "@/components/desk/paths";

export default function DeskAiPage() {
  redirect(quotesHref("ai"));
}
