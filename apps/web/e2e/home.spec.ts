import { expect, test } from "@playwright/test";

test("placeholder home renders", async ({ page }) => {
  const res = await page.goto("/");
  expect(res?.ok()).toBeTruthy();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Himalaya");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeAttached();
});

test("health endpoint is ok", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.status()).toBe(200);
  await expect(res.json()).resolves.toMatchObject({ status: "ok" });
});
