import { expect, test } from "@playwright/test";

test("locale switcher serves German chrome with English catalog fallback", async ({
  page,
}) => {
  await page.goto("/de");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Himalaya");
  await expect(page.getByRole("combobox", { name: "Sprache" })).toHaveValue("de");
  await page.getByRole("combobox", { name: "Sprache" }).selectOption("en");
  await expect(page.getByRole("combobox", { name: "Language" })).toHaveValue("en");
});

test("concierge streams a grounded answer with citations and no public price", async ({
  page,
}) => {
  await page.goto("/");
  const cookies = page.getByRole("button", { name: /essential cookies/i });
  if (await cookies.isVisible()) await cookies.click();
  await page.getByRole("button", { name: "Ask a specialist" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByLabel("Ask about a trek, permit or season")
    .fill("Tell me about the Everest Base Camp trek");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    /Everest Base Camp|Khumbu|Namche/i,
    {
      timeout: 15_000,
    },
  );
  await expect(page.getByRole("dialog")).toContainText(/Sources/i);
  const chat = await page.getByRole("dialog").innerText();
  expect(chat).not.toMatch(/USD\s+\d|\$\s?\d|per person from/i);
});

test("altitude emergency shows static rescue contacts", async ({ page }) => {
  await page.goto("/");
  const cookies = page.getByRole("button", { name: /essential cookies/i });
  if (await cookies.isVisible()) await cookies.click();
  await page.getByRole("button", { name: "Ask a specialist" }).click();
  await page
    .getByLabel("Ask about a trek, permit or season")
    .fill("I need a rescue, I cannot breathe");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByRole("dialog")).toContainText("OutdoorKing on-call operations", {
    timeout: 15_000,
  });
  await expect(page.getByRole("dialog")).toContainText("Himalayan Rescue Association");
});
