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

test("home offers a way past the lead activities and six journeys", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const cookies = page.getByRole("button", { name: /essential cookies/i });
  if (await cookies.isVisible()) await cookies.click();

  const wayIn = page.getByRole("heading", { name: "Choose your way in" });
  await expect(wayIn).toBeVisible();
  for (const name of ["Trekking", "Tours", "Peak climbing", "Expeditions"]) {
    await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
  }
  const viewMore = page.getByRole("link", { name: "View more", exact: true });
  await expect(viewMore).toHaveAttribute("href", "/activities");
  const beforeMore = await viewMore.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  await viewMore.hover();
  await expect
    .poll(async () => viewMore.evaluate((el) => getComputedStyle(el).backgroundColor))
    .not.toBe(beforeMore);

  await viewMore.click();
  await expect(page).toHaveURL(/\/activities\/?$/);
  await expect(page.getByRole("heading", { name: "Wildlife" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Heli treks" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cultural journeys" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pilgrimage" })).toBeVisible();

  await page.goto("/");
  const flagship = page.locator("section").filter({
    has: page.getByRole("heading", { name: "Flagship journeys", exact: true }),
  });
  await expect(
    flagship.getByRole("heading", { name: "Flagship journeys" }),
  ).toBeVisible();
  for (const name of [
    "Annapurna Circuit Trek",
    "Everest Base Camp Trek",
    "Island Peak Climbing",
    "Annapurna Base Camp Trek",
    "Manaslu Circuit Trek",
    "Langtang Valley Trek",
  ]) {
    await expect(flagship.getByRole("heading", { name, exact: true })).toBeVisible();
  }
  const everyJourney = flagship.getByRole("link", {
    name: "See every journey",
    exact: true,
  });
  await expect(everyJourney).toHaveAttribute("href", "/trips");
  await everyJourney.click();
  await expect(page).toHaveURL(/\/trips\/?$/);
  await expect(page.getByRole("heading", { level: 1, name: "Journeys" })).toBeVisible();
});

test("region showcase sits under flagship journeys and switches with the region", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const cookies = page.getByRole("button", { name: /essential cookies/i });
  if (await cookies.isVisible()) await cookies.click();

  const documentTop = (locator: ReturnType<typeof page.getByRole>) =>
    locator.evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
  const flagshipTop = await documentTop(
    page.getByRole("heading", { name: "Flagship journeys", exact: true }),
  );
  const regionsTop = await documentTop(
    page.getByRole("heading", { name: "Nepal’s regions", exact: true }),
  );
  const galleryTop = await documentTop(
    page.getByRole("heading", { name: "Ridges, not portraits", exact: true }),
  );
  expect(regionsTop).toBeGreaterThan(flagshipTop);
  expect(galleryTop).toBeGreaterThan(regionsTop);

  const showcase = page.locator("#region-showcase");
  const everest = showcase.getByRole("button", { name: "Everest / Khumbu", exact: true });
  const annapurna = showcase.getByRole("button", { name: "Annapurna", exact: true });
  await expect(everest).toHaveAttribute("aria-pressed", "true");
  await expect(annapurna).toHaveAttribute("aria-pressed", "false");
  await expect(
    showcase.getByRole("heading", { name: "Everest / Khumbu", exact: true }),
  ).toBeVisible();
  await expect(
    showcase.getByRole("heading", { name: "Everest Base Camp Trek", exact: true }),
  ).toBeVisible();
  await expect(
    showcase.getByRole("heading", { name: "Annapurna Circuit Trek", exact: true }),
  ).toHaveCount(0);

  await showcase.scrollIntoViewIfNeeded();
  const before = await annapurna.evaluate((el) => {
    const style = getComputedStyle(el);
    return `${style.backgroundColor}|${style.transform}`;
  });
  await annapurna.hover();
  await expect
    .poll(async () =>
      annapurna.evaluate((el) => {
        const style = getComputedStyle(el);
        return `${style.backgroundColor}|${style.transform}`;
      }),
    )
    .not.toBe(before);

  await annapurna.click();
  await expect(annapurna).toHaveAttribute("aria-pressed", "true");
  await expect(everest).toHaveAttribute("aria-pressed", "false");
  await expect(
    showcase.getByRole("heading", { name: "Annapurna", exact: true }),
  ).toBeVisible();
  await expect(
    showcase.getByRole("heading", { name: "Annapurna Circuit Trek", exact: true }),
  ).toBeVisible();
  await expect(
    showcase.getByRole("heading", { name: "Everest Base Camp Trek", exact: true }),
  ).toHaveCount(0);
  await expect(showcase.getByText(/\$|USD|EUR|GBP|per person/i)).toHaveCount(0);

  await showcase.getByRole("link", { name: "Annapurna Circuit Trek" }).click();
  await expect(page).toHaveURL(/\/trips\/annapurna-circuit-trek\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Annapurna Circuit",
  );

  await page.goto("/");
  await showcase.getByRole("button", { name: "Mustang", exact: true }).click();
  await expect(
    showcase.getByRole("heading", { name: "Upper Mustang Trek", exact: true }),
  ).toBeVisible();
  await expect(
    showcase.getByRole("heading", { name: "Everest Base Camp Trek", exact: true }),
  ).toHaveCount(0);
  await showcase.getByRole("link", { name: "See Mustang", exact: true }).click();
  await expect(page).toHaveURL(/\/regions\/mustang\/?$/);
  await expect(page.getByRole("heading", { level: 1, name: "Mustang" })).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(showcase.getByRole("button", { name: "Everest / Khumbu" })).toBeVisible();
  await showcase.getByRole("button", { name: "Langtang", exact: true }).click();
  const langtangJourney = showcase.getByRole("link", { name: "Langtang Valley Trek" });
  await expect(langtangJourney).toBeVisible();
  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(overflows).toBe(false);
  const cardBox = await langtangJourney.boundingBox();
  expect(cardBox?.width ?? 0).toBeLessThanOrEqual(390);
  await langtangJourney.click();
  await expect(page).toHaveURL(/\/trips\/langtang-valley-trek\/?$/);
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
