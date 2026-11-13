const { test } = require("node:test");
const assert = require("node:assert/strict");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_BASE_URL || "http://localhost:1313";
function contrast(a, b) {
  const luminance = (color) =>
    color
      .match(/[\d.]+/g)
      .slice(0, 3)
      .map(Number)
      .map((v) => v / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
      .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
test("restyled pages keep content visible, readable and reachable", async (t) => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 390]) {
      await t.test(`${width}px`, async () => {
        const page = await browser.newPage({
          viewport: { width, height: 1000 },
        });
        try {
          await page.goto(`${base}/`);
          const profile = await page.locator(".home-profile").boundingBox();
          const header = await page
            .locator(width < 600 ? "#header-mobile" : "#header-desktop")
            .boundingBox();
          assert(
            profile.y >= header.y + header.height,
            "Profile must not sit under the fixed header",
          );
          assert.equal(
            await page.locator('a[href="/documentation/"]').count(),
            0,
          );
          const excerpt = page.locator(".entry-description").first();
          if (width < 600)
            assert(
              (await excerpt.boundingBox()).width > width * 0.75,
              "Mobile excerpt must not be squeezed by thumbnail",
            );
          const colors = await excerpt.evaluate((e) => ({
            text: getComputedStyle(e).color,
            bg: getComputedStyle(document.body).backgroundColor,
          }));
          assert(
            contrast(colors.text, colors.bg) >= 4.5,
            "Summary text must have adequate contrast",
          );
          const article = await page
            .locator(".editorial-entry h3 a")
            .first()
            .getAttribute("href");
          assert.equal(
            (await page.request.get(new URL(article, base).href)).status(),
            200,
          );
          for (const path of [
            "/products/deepseek-companion/",
            "/en/products/deepseek-companion/",
          ]) {
            await page.goto(base + path);
            assert(
              (await page.locator(".showcase img").boundingBox()).y < 750,
              "Screenshot should appear early",
            );
            for (const mode of ["light", "dark"]) {
              await page.evaluate(
                (mode) => window.sitePreferences.choose(mode),
                mode,
              );
              await page.waitForTimeout(200);
              const colors = await page
                .locator(".primary")
                .first()
                .evaluate((e) => ({
                  text: getComputedStyle(e).color,
                  bg: getComputedStyle(e).backgroundColor,
                }));
              assert(
                contrast(colors.text, colors.bg) >= 4.5,
                "Primary action must be readable in both themes",
              );
            }
            assert(
              await page.evaluate(
                () => document.documentElement.scrollWidth <= innerWidth,
              ),
            );
          }
        } finally {
          await page.close();
        }
      });
    }
  } finally {
    await browser.close();
  }
});
