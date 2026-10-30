import { redirect } from "next/navigation";

export function generateStaticParams() {
  return [{ slug: "seasons" }];
}

/** The journal has no posts yet; until it does, readers go to the travel guides. */
export default function BlogCategoryPage() {
  redirect("/guides");
}
