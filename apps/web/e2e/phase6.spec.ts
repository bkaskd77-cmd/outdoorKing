import { expect, test } from "@playwright/test";

test("PWA manifest and offline catalog have itineraries and rescue copy", async ({
  page,
  request,
}) => {
  const manifest = await request.get("/manifest.webmanifest");
  expect(manifest.ok()).toBeTruthy();
  const json = (await manifest.json()) as { display?: string; start_url?: string };
  expect(json.display).toBe("browser");
  expect(json.start_url).toBe("/");

  const sw = await request.get("/sw.js");
  expect(sw.ok()).toBeTruthy();
  expect(await sw.text()).toContain("ok-offline-v2");

  const catalog = await request.get("/api/offline/catalog");
  expect(catalog.ok()).toBeTruthy();
  const body = (await catalog.json()) as {
    trips: { slug: string }[];
    rescue: { policyPath: string; contacts: unknown[] };
  };
  expect(body.trips.some((trip) => trip.slug === "everest-base-camp-trek")).toBe(true);
  expect(body.rescue.policyPath).toBe("/trust/safety-and-rescue");
  expect(body.rescue.contacts.length).toBeGreaterThan(0);
  expect(JSON.stringify(body)).not.toMatch(/USD\s+\d|\$\s?\d|per person from/i);

  await page.goto("/");
  await expect(page.getByTestId("pwa-ready")).toHaveCount(1);
});

test("partner portal lite tracks referred leads without prices", async ({ page }) => {
  await page.goto("/?ref=HIMALAYA");
  await page.goto("/partners/demo-partner-token");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Himalayan Outfitters",
  );
  await expect(page.getByText(/journeys stay private/i)).toBeVisible();
  await expect(page.getByText(/Share \/\?ref=HIMALAYA/i)).toBeVisible();
  const main = await page.locator("main").innerText();
  expect(main).not.toMatch(/USD\s+\d|\$\s?\d|per person from/i);
});

test("staff partner desk stays inside the admin", async ({ page }) => {
  await page.goto("/desk/partners");
  await expect(page).toHaveURL(/\/admin\/login$/);
  await expect(page.getByRole("heading", { name: /staff/i })).toBeVisible();
});
