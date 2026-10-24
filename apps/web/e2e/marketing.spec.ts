import { expect, test } from "@playwright/test";

test("trip page has the flagship sections and no public price", async ({ page }) => {
  const res = await page.goto("/trips/everest-base-camp-trek");
  expect(res?.ok()).toBeTruthy();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Everest Base Camp",
  );
  await expect(page.getByRole("heading", { name: "Day by day" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Altitude profile" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Our acclimatization logic" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Contingency and flight plan" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Design my private version/i }).first(),
  ).toBeVisible();
  const body = await page.locator("main").innerText();
  expect(body).not.toMatch(/USD\s+\d|\$\s?\d|per person from/i);
});

test("design-my-trip chooser filters published trips by activity, region and days", async ({
  page,
}) => {
  await page.goto("/design-my-trip");
  await expect(
    page.getByRole("heading", { name: "What are you dreaming of?" }),
  ).toBeVisible();
  const cookies = page.getByRole("button", { name: /essential cookies/i });
  if (await cookies.isVisible()) await cookies.click();

  await page.getByRole("button", { name: "Tour", exact: true }).click();
  await expect(page.getByTestId("matching-trips")).toBeVisible();
  await expect(page.getByRole("button", { name: "Annapurna Circuit Trek" })).toHaveCount(
    0,
  );

  await page.getByRole("button", { name: "Trek", exact: true }).click();
  const allTreks = page.getByTestId("matching-trips").getByRole("button");
  expect(await allTreks.count()).toBeGreaterThan(6);

  await page.getByRole("button", { name: "Annapurna", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Annapurna Circuit Trek" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Annapurna Base Camp Trek" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Ghorepani Poon Hill Trek" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Mardi Himal Trek" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Khopra Danda Trek" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Everest Base Camp Trek" })).toHaveCount(
    0,
  );
  await expect(page.getByRole("button", { name: "Island Peak Climbing" })).toHaveCount(0);

  await page.getByRole("button", { name: "Langtang", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Annapurna", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await expect(
    page.getByRole("button", { name: "Langtang", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Langtang Valley Trek" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Annapurna Circuit Trek" })).toHaveCount(
    0,
  );

  await page.getByRole("button", { name: "Langtang", exact: true }).click();
  expect(await allTreks.count()).toBeGreaterThan(6);
  await page.getByRole("button", { name: "Annapurna", exact: true }).click();

  const annapurnaCount = await page
    .getByTestId("matching-trips")
    .getByRole("button")
    .count();
  await page.getByRole("button", { name: "Up to 7 days" }).click();
  const shortCount = await page.getByTestId("matching-trips").getByRole("button").count();
  expect(shortCount).toBeGreaterThan(1);
  expect(shortCount).toBeLessThan(annapurnaCount);
  await expect(page.getByRole("button", { name: "Annapurna Circuit Trek" })).toHaveCount(
    0,
  );
});

test("design-my-trip wizard drafts and submits a private request", async ({ page }) => {
  await page.goto("/design-my-trip?trip=everest-base-camp-trek");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Design my trip");
  await expect(page.getByText(/AI-assisted draft/i)).toBeVisible();
  const cookies = page.getByRole("button", { name: /essential cookies/i });
  if (await cookies.isVisible()) await cookies.click();

  const next = page.getByRole("button", { name: "Next", exact: true });
  await next.click();
  await page.getByLabel("Earliest start").fill("2026-04-10");
  await page.getByLabel(/Trip length/).fill("14");
  await next.click();
  await page.getByLabel("Adults").fill("2");
  await page.getByRole("radio", { name: "Regular hiker" }).check();
  await next.click();
  await page.getByRole("radio", { name: "Balanced", exact: true }).check();
  await next.click();
  await expect(
    page.getByRole("heading", { name: "Here is a first sketch." }),
  ).toBeVisible();
  const generate = page.getByRole("button", { name: /Generate draft/i });
  if (await generate.isVisible()) await generate.click();
  await expect(page.getByText(/Day 1/i).first()).toBeVisible({ timeout: 30_000 });
  await expect(page.getByRole("heading", { name: "Why this plan" })).toBeVisible();
  await expect(page.locator("main")).not.toContainText(/ALT-00|LOG-00|PRM-00/);
  await expect(page.locator("main")).not.toContainText(/USD\s+\d|\$\s?\d/);

  await next.click();
  await page.getByLabel("Name").fill("Bikash Tester");
  await page.getByLabel("Email").fill("bikash@example.com");
  await page.getByLabel("Country").fill("Nepal");
  await page.getByLabel("I have read the privacy policy (required)").check();
  await page.getByRole("button", { name: /Send my request/i }).click();
  await expect(page.getByRole("heading", { name: /Thank you/ })).toBeVisible();
  await expect(page.getByRole("status")).toContainText("design it around your dates");
});

test("design-my-trip names missing required answers before Next", async ({ page }) => {
  await page.goto("/design-my-trip");
  const cookies = page.getByRole("button", { name: /essential cookies/i });
  if (await cookies.isVisible()) await cookies.click();
  await page.evaluate(() => window.localStorage.removeItem("ok-design-wizard"));
  await page.reload();
  if (await cookies.isVisible()) await cookies.click();

  const next = page.getByRole("button", { name: "Next", exact: true });
  await next.click();
  await expect(page.getByTestId("wizard-gaps")).toContainText("Choose an activity");
  await expect(
    page.getByRole("heading", { name: "What are you dreaming of?" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Not sure", exact: true }).click();
  await next.click();
  await expect(page.getByTestId("wizard-gaps")).toContainText("Describe the journey");

  await page.getByRole("button", { name: "Trek", exact: true }).click();
  await next.click();
  await expect(page.getByRole("heading", { name: "When can you travel?" })).toBeVisible();

  await page.getByRole("button", { name: "Step 6: Your details" }).click();
  await expect(page.getByTestId("wizard-gaps")).toBeVisible();
  await page.getByLabel("Earliest start").fill("2026-10-12");
  await page.getByLabel(/Trip length/).fill("12");
  await next.click();
  await page.getByLabel("Adults").fill("2");
  await page.getByRole("radio", { name: "Regular hiker" }).check();
  await next.click();
  await page.getByRole("radio", { name: "Relaxed" }).check();
  await next.click();
  await next.click();
  await expect(
    page.getByRole("heading", { name: "Where should we send your private quote?" }),
  ).toBeVisible();
  await page.getByLabel("Name (required)").fill("Bikash Tester");
  await page.getByLabel("I have read the privacy policy (required)").check();
  await page.getByRole("button", { name: /Send my request/i }).click();
  await expect(page.getByTestId("wizard-gaps")).toContainText("email");
});

test("account login and staff desk are private", async ({ page }) => {
  await page.goto("/account/login");
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  await page.goto("/desk");
  await expect(page.getByRole("heading", { name: "Quote desk" })).toBeVisible();
  await expect(page.getByText(/Staff only/i)).toBeVisible();
  await page.goto("/desk/quotes");
  await expect(page.getByText(/Staff only/i)).toBeVisible();
  await page.goto("/desk/ops");
  await expect(page.getByText(/Staff only/i)).toBeVisible();
  await page.goto("/desk/analytics");
  await expect(page.getByText(/Staff only/i)).toBeVisible();
  await page.goto("/desk/ai");
  await expect(page.getByText(/Staff only/i)).toBeVisible();
  await page.goto("/pay/return");
  await expect(page.getByText(/does not mark a payment paid/i)).toBeVisible();
  await page.goto("/account/bookings");
  await expect(page.getByRole("heading", { name: "Your bookings" })).toBeVisible();
});

test("3D map loads after click", async ({ page }) => {
  await page.goto("/trips/everest-base-camp-trek");
  const explore = page.getByRole("button", { name: "Explore in 3D" });
  await explore.scrollIntoViewIfNeeded();
  await explore.click();
  await expect(page.getByTestId("route-map")).toBeVisible();
});
