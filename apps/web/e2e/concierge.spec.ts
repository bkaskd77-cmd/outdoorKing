import { expect, test } from "@playwright/test";

async function dismissCookies(page: import("@playwright/test").Page) {
  const cookies = page.getByRole("button", { name: /Continue with essential cookies/i });
  try {
    await cookies.waitFor({ state: "visible", timeout: 4000 });
    await cookies.click();
  } catch {
    // Already accepted in this browser context.
  }
}

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
  await dismissCookies(page);
  await page.getByRole("button", { name: "Ask a specialist" }).click();
  const chat = page.getByRole("dialog", { name: "Ask a specialist" });
  await expect(chat).toBeVisible();
  await page
    .getByLabel("Ask about a trek, permit or season")
    .fill("Tell me about the Everest Base Camp trek");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(chat).toContainText(/Everest Base Camp|Khumbu|Namche/i, {
    timeout: 15_000,
  });
  await expect(chat).toContainText(/Sources/i);
  const text = await chat.innerText();
  expect(text).not.toMatch(/USD\s+\d|\$\s?\d|per person from/i);
});

test("altitude emergency shows static rescue contacts", async ({ page }) => {
  await page.goto("/");
  await dismissCookies(page);
  await page.getByRole("button", { name: "Ask a specialist" }).click();
  const chat = page.getByRole("dialog", { name: "Ask a specialist" });
  await page
    .getByLabel("Ask about a trek, permit or season")
    .fill("I need a rescue, I cannot breathe");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(chat).toContainText("OutdoorKing on-call operations", {
    timeout: 15_000,
  });
  await expect(chat).toContainText("Himalayan Rescue Association");
});
