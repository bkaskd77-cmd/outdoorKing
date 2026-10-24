import { expect, test, type Page } from "@playwright/test";

async function preparePublicPage(page: Page) {
  await page.addStyleTag({
    content:
      "nextjs-portal, [data-next-badge-root], [data-nextjs-dev-overlay] { display: none !important; }",
  });
  const cookies = page.getByRole("button", { name: /Continue with essential cookies/i });
  try {
    await cookies.waitFor({ state: "visible", timeout: 4000 });
    await cookies.click();
  } catch {
    // Already accepted in this browser context.
  }
}

async function openConcierge(page: Page) {
  await preparePublicPage(page);
  await page.getByTestId("concierge-launcher").click({ force: true });
  return page.getByRole("dialog", { name: "Ask a specialist" });
}

test("locale switcher serves German chrome with English catalog fallback", async ({
  page,
}) => {
  await page.goto("/de");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Himalaya");
  await expect(page.getByRole("button", { name: "Sprache" })).toBeVisible();
  await page.getByRole("button", { name: "Sprache" }).click();
  await page.getByRole("menuitem", { name: "English" }).click();
  await expect(page.getByRole("button", { name: "Language" })).toBeVisible();
});

test("header drops rescue policy and specialist; safety page publishes the policy", async ({
  page,
}) => {
  await page.goto("/");
  await preparePublicPage(page);
  const header = page.locator("header").first();
  await expect(header.getByText("Published rescue policy")).toHaveCount(0);
  await expect(header.getByRole("button", { name: "Ask a specialist" })).toHaveCount(0);
  await expect(header.getByRole("link", { name: "Ask a specialist" })).toHaveCount(0);
  await expect(page.getByTestId("concierge-launcher")).toBeVisible();
  await expect(page.getByTestId("concierge-launcher")).toContainText("Ask a specialist");
  await expect(
    page.getByRole("contentinfo").getByRole("link", { name: "Safety and rescue" }),
  ).toBeVisible();

  await page.goto("/trust/safety-and-rescue");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Safety and rescue");
  await expect(
    page.getByRole("heading", { name: "Published rescue policy" }),
  ).toBeVisible();
});

test("concierge streams a grounded answer with citations and no public price", async ({
  page,
}) => {
  await page.goto("/");
  const chat = await openConcierge(page);
  await expect(chat).toBeVisible();
  const box = await chat.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThan(400);
  expect(box?.height ?? 0).toBeGreaterThan(420);
  await expect(page.getByLabel("Ask about a trek, permit or season")).toBeVisible();
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
  const chat = await openConcierge(page);
  await page
    .getByLabel("Ask about a trek, permit or season")
    .fill("I need a rescue, I cannot breathe");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(chat).toContainText("OutdoorKing on-call operations", {
    timeout: 15_000,
  });
  await expect(chat).toContainText("Himalayan Rescue Association");
});

test("asking for a real person follows up through Design my trip", async ({
  page,
}) => {
  await page.goto("/");
  const chat = await openConcierge(page);
  await page
    .getByLabel("Ask about a trek, permit or season")
    .fill("chat with customer");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(chat).toContainText(/Design my trip/i, { timeout: 15_000 });
  await expect(chat).not.toContainText(/Ama Dablam|Alpine|glacier travel|NMA climbing/i);
  await expect(chat).not.toContainText("the number is missing");
  await expect(page.getByTestId("whatsapp-handoff")).toHaveCount(0);
});
