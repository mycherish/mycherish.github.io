// Requires a running Hugo server and Playwright with matching Chromium.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_BASE_URL || "http://localhost:1313";

async function mouseClick(page, locator) {
  const point = await locator.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const x = rect.x + rect.width / 2;
    const y = rect.y + rect.height / 2;
    const hit = document.elementFromPoint(x, y);
    return { x, y, reachable: hit === element || element.contains(hit) };
  });
  assert(
    point.reachable,
    "Control must receive real pointer input without auto-scrolling",
  );
  await page.mouse.click(point.x, point.y);
}

test("theme and language menus receive real mouse input on blog and product pages", async (t) => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 390]) {
      for (const path of [
        "/",
        "/products/",
        "/products/deepseek-companion/",
        "/en/",
        "/en/products/",
        "/en/products/deepseek-companion/",
      ]) {
        await t.test(`${width}px ${path}`, async () => {
          const context = await browser.newContext({
            viewport: { width, height: 1000 },
            colorScheme: "light",
          });
          try {
            const page = await context.newPage();
            const errors = [];
            page.on("pageerror", (error) => errors.push(error.message));
            await page.goto(base + path);
            if (width < 600 && !path.includes("deepseek-companion"))
              await page.locator("#menu-toggle-mobile").click();
            const tools = page.locator("[data-site-tools]:visible");
            const theme = tools.locator(".site-theme-menu");
            for (const value of ["dark", "light", "auto"]) {
              await mouseClick(page, theme.locator("summary"));
              await mouseClick(
                page,
                theme.locator(`[data-theme-choice=${value}]`),
              );
              assert.equal(
                await page
                  .locator("html")
                  .getAttribute("data-theme-preference"),
                value,
              );
              assert.equal(
                await page.locator("body").getAttribute("theme"),
                value === "dark" ? "dark" : "light",
              );
            }
            await page.emulateMedia({ colorScheme: "dark" });
            await page.waitForFunction(
              () => document.body.getAttribute("theme") === "dark",
            );
            const language = tools.locator(".site-language-menu");
            await mouseClick(page, language.locator("summary"));
            const target = language.locator(
              path.startsWith("/en/") ? 'a[lang="zh-cn"]' : 'a[lang="en"]',
            );
            const href = await target.getAttribute("href");
            await mouseClick(page, target);
            await page.waitForURL(new URL(href, base).href);
            assert.equal(
              await page.locator("body").getAttribute("theme"),
              "dark",
            );
            assert.deepEqual(errors, []);
          } finally {
            await context.close();
          }
        });
      }
    }
  } finally {
    await browser.close();
  }
});
