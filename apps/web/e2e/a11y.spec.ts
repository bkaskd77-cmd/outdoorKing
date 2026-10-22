import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("design system has no serious axe issues", async ({ page }) => {
  await page.goto("/_design");
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(
    (v) => v.impact === "serious" || v.impact === "critical",
  );
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
});

test("reduced motion disables Lenis", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-lenis", "off");
});
