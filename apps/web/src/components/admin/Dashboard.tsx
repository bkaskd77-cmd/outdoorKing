import type { Route } from "next";
import { redirect } from "next/navigation";
import type { AdminViewServerProps } from "payload";

export function DashboardView({ initPageResult, user }: AdminViewServerProps) {
  if (!initPageResult.req.user && !user) {
    redirect("/admin/login");
  }
  redirect("/admin/quotes" as Route);
}
