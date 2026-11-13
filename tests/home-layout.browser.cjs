const { test } = require("node:test");
const assert = require("node:assert/strict");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_BASE_URL || "http://localhost:1313";

test("home profile never overlaps the introduction at different viewport sizes", async (t) => {
  const browser = await chromium.launch();
  try {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 1440, height: 1400 },
      { width: 390, height: 844 },
    ]) {
      await t.test(`${viewport.width}x${viewport.height}`, async () => {
        const page = await browser.newPage({ viewport });
        try {
          await page.goto(`${base}/en/`);
          const profile = await page.locator(".home-profile").boundingBox();
          const content = await page.locator(".home #content").boundingBox();
          assert(profile && content);
          assert(
            profile.y + profile.height <= content.y,
            "Profile must stay above the Markdown introduction",
          );
          assert(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          );
          await page
            .getByRole("link", { name: "Explore my products", exact: true })
            .click();
          await page.waitForURL("**/en/products/");
        } finally {
          await page.close();
        }
      });
    }
  } finally {
    await browser.close();
  }
});
