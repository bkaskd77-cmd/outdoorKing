import type { CollectionConfig, GlobalConfig } from "payload";

const listComponent = "/components/admin/StaffCollectionList#StaffCollectionList";
const editComponent = "/components/admin/StaffDocument#StaffDocument";

export function staffCollectionAdmin(
  admin: NonNullable<CollectionConfig["admin"]> = {},
): NonNullable<CollectionConfig["admin"]> {
  return {
    pagination: { defaultLimit: 60 },
    ...admin,
    components: {
      ...admin.components,
      views: {
        ...admin.components?.views,
        list: { Component: listComponent },
        edit: {
          ...(admin.components?.views?.edit ?? {}),
          default: { Component: editComponent },
        },
      },
    },
  } as NonNullable<CollectionConfig["admin"]>;
}

export function staffGlobalAdmin(
  admin: NonNullable<GlobalConfig["admin"]> = {},
): NonNullable<GlobalConfig["admin"]> {
  return {
    ...admin,
    components: {
      ...admin.components,
      views: {
        ...admin.components?.views,
        edit: {
          ...(admin.components?.views?.edit ?? {}),
          default: { Component: editComponent },
        },
      },
    },
  } as NonNullable<GlobalConfig["admin"]>;
}
