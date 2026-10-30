import { redirect } from "next/navigation";

/** The journal has no posts yet; until it does, readers go to the travel guides. */
export default function BlogPage() {
  redirect("/guides");
}
