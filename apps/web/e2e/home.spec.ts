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

test("public menus close on outside click, Escape, and exclusive open", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const cookies = page.getByRole("button", { name: /essential cookies/i });
  if (await cookies.isVisible()) await cookies.click();

  const activities = page.getByRole("button", { name: "Activities" });
  await activities.click();
  await expect(page.getByRole("menuitem", { name: "All activities" })).toBeVisible();

  await page.locator("main").click({ position: { x: 24, y: 24 } });
  await expect(page.getByRole("menuitem", { name: "All activities" })).toHaveCount(0);

  await activities.click();
  await expect(page.getByRole("menuitem", { name: "All activities" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("menuitem", { name: "All activities" })).toHaveCount(0);

  await activities.click();
  await page.getByRole("button", { name: "Language" }).click();
  await expect(page.getByRole("menuitem", { name: "All activities" })).toHaveCount(0);
  await expect(page.getByRole("menuitem", { name: "English" })).toBeVisible();
});

test("primary CTA lifts on hover", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const cookies = page.getByRole("button", { name: /essential cookies/i });
  if (await cookies.isVisible()) await cookies.click();

  const cta = page.getByRole("banner").getByRole("link", { name: "Design my trip" });
  await expect(cta).toBeVisible();
  const before = await cta.evaluate((el) => {
    const style = getComputedStyle(el);
    return `${style.translate}|${style.backgroundColor}`;
  });
  await cta.hover();
  await expect
    .poll(async () =>
      cta.evaluate((el) => {
        const style = getComputedStyle(el);
        return `${style.translate}|${style.backgroundColor}`;
      }),
    )
    .not.toBe(before);
});
