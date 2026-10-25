"use client";

import { DefaultListView, useListDrawerContext } from "@payloadcms/ui";
import type { ListViewClientProps } from "payload";
import type { ReactNode } from "react";

export function StaffCollectionSwitch({
  listProps,
  view,
}: {
  listProps: ListViewClientProps;
  view: ReactNode;
}) {
  const drawer = useListDrawerContext() as { isInDrawer?: boolean };
  if (drawer.isInDrawer) return <DefaultListView {...listProps} />;
  return view;
}
