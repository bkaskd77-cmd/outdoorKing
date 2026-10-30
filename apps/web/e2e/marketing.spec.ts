import { expect, test, type Page } from "@playwright/test";

async function dismissCookies(page: Page) {
  // The banner mounts after hydration, so a one-shot isVisible() can run too early.
  // Until consent is stored it is guaranteed to appear, so wait for it and click.
  const accepted = await page.evaluate(
    () => window.localStorage.getItem("ok-cookie-consent") === "essential",
  );
  if (!accepted) await page.getByRole("button", { name: /essential cookies/i }).click();
}

async function fillDateWindow(page: Page) {
  const month = page.getByLabel("Month you want to travel");
  const start = page.getByLabel("Earliest start");
  await expect(month).toBeVisible();
  await expect(async () => {
    await month.fill("2026-04");
    await start.fill("2026-04-10");
    await expect(month).toHaveValue("2026-04");
    await expect(start).toHaveValue("2026-04-10");
  }).toPass();
}

async function fillWizardToClosingNote(page: Page) {
  const next = page.getByRole("button", { name: "Next", exact: true });
  await fillDateWindow(page);
  await page.getByLabel(/Trip length/).fill("14");
  await next.click();
  await expect(page.getByLabel("Adults")).toBeVisible();
  await page.getByLabel("Adults").fill("2");
  await page.getByRole("radio", { name: "Regular hiker" }).check();
  await next.click();
  await page.getByRole("radio", { name: "Balanced", exact: true }).check();
  await next.click();
  await page.getByRole("button", { name: /Skip — send without a draft/i }).click();
  await expect(
    page.getByRole("heading", { name: "Where should we send your private quote?" }),
  ).toBeVisible();
  await expect(page.getByLabel("A note for the specialist (optional)")).toBeVisible();
  await expect(page.getByRole("button", { name: /Send my request/i })).toBeVisible();
}

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
    page.getByRole("link", { name: /Design this trip/i }).first(),
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
  await expect(
    page.getByRole("heading", { name: "Designing Everest Base Camp Trek" }),
  ).toBeVisible();
  await expect(page.getByText("When and how long", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "What are you dreaming of?" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Choose a different trip" }),
  ).toBeVisible();

  const next = page.getByRole("button", { name: "Next", exact: true });
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

test("trip cards open the trip page, not the designer", async ({ page }) => {
  await page.goto("/");
  const cookies = page.getByRole("button", { name: /essential cookies/i });
  if (await cookies.isVisible()) await cookies.click();
  const card = page.getByRole("link", { name: /Annapurna Base Camp Trek/i }).first();
  await expect(card).toHaveAttribute("href", "/trips/annapurna-base-camp-trek");
  await card.click();
  await expect(page).toHaveURL(/\/trips\/annapurna-base-camp-trek\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Annapurna Base Camp Trek",
  );
  await expect(page.getByRole("heading", { name: "Day by day" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Design this trip" }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "What are you dreaming of?" }),
  ).toHaveCount(0);
});

test("Design this trip on a trip page skips the chooser", async ({ page }) => {
  await page.goto("/trips/annapurna-base-camp-trek");
  const cookies = page.getByRole("button", { name: /essential cookies/i });
  if (await cookies.isVisible()) await cookies.click();
  await page.evaluate(() => window.localStorage.removeItem("ok-design-wizard"));
  await page.reload();
  if (await cookies.isVisible()) await cookies.click();
  await page.getByRole("link", { name: "Design this trip" }).first().click();
  await dismissCookies(page);
  await expect(page).toHaveURL(/\/design-my-trip\?trip=annapurna-base-camp-trek/);
  await expect(
    page.getByRole("heading", { name: "Designing Annapurna Base Camp Trek" }),
  ).toBeVisible();
  await expect(page.getByText("When and how long", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Earliest start")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "What are you dreaming of?" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Choose a different trip" }).click();
  await expect(
    page.getByRole("heading", { name: "What are you dreaming of?" }),
  ).toBeVisible();
});

test("header Design my trip still opens the full chooser", async ({ page }) => {
  await page.goto("/");
  const cookies = page.getByRole("button", { name: /essential cookies/i });
  if (await cookies.isVisible()) await cookies.click();
  await page.evaluate(() => window.localStorage.removeItem("ok-design-wizard"));
  await page.getByRole("banner").getByRole("link", { name: "Design my trip" }).click();
  await expect(page).toHaveURL(/\/design-my-trip/);
  expect(new URL(page.url()).searchParams.get("trip")).toBeFalsy();
  await expect(
    page.getByRole("heading", { name: "What are you dreaming of?" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Trek", exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Annapurna", exact: true }),
  ).toBeVisible();
  await expect(page.getByTestId("matching-trips")).toHaveCount(0);
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
  await expect(page.getByRole("heading", { name: "When can you travel?" })).toBeVisible();
  await expect(page.getByTestId("wizard-gaps")).toHaveCount(0);

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
  await expect(page.getByLabel("A note for the specialist (optional)")).toBeVisible();
});

test("design-my-trip keeps the traveler note off step 1 and on the last step", async ({
  page,
}) => {
  await page.goto("/design-my-trip");
  await dismissCookies(page);
  await page.evaluate(() => window.localStorage.removeItem("ok-design-wizard"));
  await page.reload();
  await dismissCookies(page);

  await expect(
    page.getByRole("heading", { name: "What are you dreaming of?" }),
  ).toBeVisible();
  await expect(page.getByText("Describe it in your own words")).toHaveCount(0);
  await expect(page.getByLabel("A note for the specialist (optional)")).toHaveCount(0);
  await expect(page.locator("#freeText")).toHaveCount(0);

  await page.getByRole("button", { name: "Trek", exact: true }).click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await fillWizardToClosingNote(page);
  await expect(page.getByText("Describe it in your own words")).toHaveCount(0);
  const note = page.getByLabel("A note for the specialist (optional)");
  await expect(note).toBeVisible();
  const phoneBox = await page.getByLabel("Phone / WhatsApp (optional)").boundingBox();
  const privacyBox = await page
    .getByLabel("I have read the privacy policy (required)")
    .boundingBox();
  const updatesBox = await page
    .getByLabel("Optional updates about new journeys")
    .boundingBox();
  const submitBox = await page
    .getByRole("button", { name: /Send my request/i })
    .boundingBox();
  const noteBox = await note.boundingBox();
  expect(phoneBox && noteBox && phoneBox.y < noteBox.y).toBeTruthy();
  expect(noteBox && privacyBox && noteBox.y < privacyBox.y).toBeTruthy();
  expect(privacyBox && updatesBox && privacyBox.y < updatesBox.y).toBeTruthy();
  expect(updatesBox && submitBox && updatesBox.y < submitBox.y).toBeTruthy();
});

test("Design this trip from a trip page still reaches the closing note", async ({
  page,
}) => {
  await page.goto("/trips/annapurna-base-camp-trek");
  await dismissCookies(page);
  await page.evaluate(() => window.localStorage.removeItem("ok-design-wizard"));
  await page.reload();
  await dismissCookies(page);
  await page.getByRole("link", { name: "Design this trip" }).first().click();
  await dismissCookies(page);
  await expect(
    page.getByRole("heading", { name: "Designing Annapurna Base Camp Trek" }),
  ).toBeVisible();
  await expect(page.getByLabel("A note for the specialist (optional)")).toHaveCount(0);
  await fillWizardToClosingNote(page);
});

test("account login stays private and the desk opens the admin", async ({ page }) => {
  await page.goto("/account/login");
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  await expect(page.getByText(/Staff sign in from the admin/i)).toBeVisible();
  for (const path of [
    "/desk",
    "/desk/quotes",
    "/desk/ops",
    "/desk/analytics",
    "/desk/ai",
  ]) {
    await page.goto(path);
    await expect(page).toHaveURL(/\/admin\/login$/);
    await expect(page.getByRole("heading", { name: /staff/i })).toBeVisible();
  }
  await page.goto("/pay/return");
  await expect(page.getByText(/does not mark a payment paid/i)).toBeVisible();
  await page.goto("/account/bookings");
  await expect(page.getByRole("heading", { name: "Your bookings" })).toBeVisible();
});

test("Travel with Purpose opens the five-percent promise", async ({ page }) => {
  await page.setViewportSize({ width: 1800, height: 900 });
  await page.goto("/");
  await dismissCookies(page);

  const banner = page.getByRole("banner");
  const purpose = banner
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Travel with Purpose" });
  const design = banner.getByRole("link", { name: "Design my trip" });
  await expect(purpose).toBeVisible();
  await expect(design).toBeVisible();

  await purpose.click();
  await expect(page).toHaveURL(/\/purpose\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /travel with purpose/i,
  );
  await expect(page.locator("main")).toContainText(
    "5% of each traveler's booking supports social work in Nepal, across more than one field.",
  );
  expect(await page.getByRole("heading", { level: 2 }).count()).toBeGreaterThanOrEqual(5);
  await expect(page.locator("main")).not.toContainText(
    /USD\s+\d|\$\s?\d|€\s?\d|£\s?\d|stock libraries/i,
  );
  const gallery = page.locator("#purpose-gallery img");
  await expect(gallery).toHaveCount(9);
  const frames = await gallery.evaluateAll((imgs) =>
    imgs.map((img) => {
      const box = img.getBoundingClientRect();
      return { top: Math.round(box.top), height: box.height };
    }),
  );
  expect(new Set(frames.map((frame) => frame.top)).size).toBeGreaterThan(1);
  expect(Math.min(...frames.map((frame) => frame.height))).toBeGreaterThan(240);
  await expect(page.getByRole("button", { name: "Next photographs" })).toHaveCount(0);

  for (const path of ["/de/purpose", "/fr/purpose", "/zh-Hans/purpose"]) {
    const response = await page.goto(path);
    expect(response?.ok(), path).toBeTruthy();
  }
  await expect(
    page.getByRole("banner").getByRole("link", { name: "有目的的旅行" }),
  ).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await dismissCookies(page);
  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(overflows).toBe(false);
  await expect(banner.getByRole("link", { name: "Travel with Purpose" })).toHaveCount(0);
  await page.getByRole("banner").getByRole("button", { name: "Menu" }).click();
  const itemNames = await page.getByRole("menuitem").allTextContents();
  const purposeAt = itemNames.findIndex((name) => name.includes("Travel with Purpose"));
  const englishAt = itemNames.findIndex((name) => name.trim() === "English");
  expect(purposeAt).toBeGreaterThan(englishAt);
  await page.getByRole("menuitem", { name: "Travel with Purpose" }).click();
  await expect(page).toHaveURL(/\/purpose\/?$/);
});

test("3D map loads after click", async ({ page }) => {
  await page.goto("/trips/everest-base-camp-trek");
  const explore = page.getByRole("button", { name: "Explore in 3D" });
  await explore.scrollIntoViewIfNeeded();
  await explore.click();
  await expect(page.getByTestId("route-map")).toBeVisible();
});
