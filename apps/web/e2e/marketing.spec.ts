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

test("design-my-trip form is email-only", async ({ page }) => {
  await page.goto("/design-my-trip?trip=everest-base-camp-trek");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Design my trip");
  await expect(page.getByText(/no AI designer/i)).toBeVisible();
  const cookies = page.getByRole("button", { name: /essential cookies/i });
  if (await cookies.isVisible()) await cookies.click();
  await page.getByLabel("Name").fill("Bikash Tester");
  await page.getByLabel("Email").fill("bikash@example.com");
  await page.getByLabel("Country").fill("Nepal");
  await page.getByLabel("I have read the privacy policy (required)").check();
  await page.getByRole("button", { name: /private quote/i }).click();
  await expect(page.getByRole("status")).toContainText("private quote");
});

test("3D map loads after click", async ({ page }) => {
  await page.goto("/trips/everest-base-camp-trek");
  const explore = page.getByRole("button", { name: "Explore in 3D" });
  await explore.scrollIntoViewIfNeeded();
  await explore.click();
  await expect(page.getByTestId("route-map")).toBeVisible();
});
