import { redirect } from "next/navigation";

import { quotesHref } from "@/components/desk/paths";

export default function DeskPage() {
  redirect(quotesHref());
}
