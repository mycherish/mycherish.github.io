const { test } = require("node:test");
const assert = require("node:assert/strict");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_BASE_URL || "http://localhost:1313";
const products = ["caelum-orbis", "brew-manager", "openclaw-coralui"];
test("migrated product pages and legacy entry URLs work on desktop and mobile", async (t) => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 390])
      for (const slug of products)
        await t.test(`${width}px ${slug}`, async () => {
          const page = await browser.newPage({
            viewport: { width, height: 1000 },
          });
          const errors = [];
          const failedResources = [];
          page.on("pageerror", (e) => errors.push(e.message));
          page.on("response", (r) => {
            if (r.url().startsWith(base) && r.status() >= 400)
              failedResources.push(r.url());
          });
          try {
            await page.goto(`${base}/products/${slug}/`);
            assert((await page.title()).includes("Caelum"));
            assert(await page.locator("h1").innerText());
            assert.equal(await page.locator(".site-language-menu").count(), 0);
            await page.locator(".showcase img").evaluate((img) => img.decode());
            assert.equal(
              await page.locator(".feature-list article").count(),
              4,
            );
            for (const mode of ["dark", "light", "auto"]) {
              const theme = page.locator(".site-theme-menu");
              await theme.locator("summary").click();
              await theme.locator(`[data-theme-choice="${mode}"]`).click();
              assert.equal(
                await page
                  .locator("html")
                  .getAttribute("data-theme-preference"),
                mode,
              );
              assert(
                await page.evaluate(
                  () => document.documentElement.scrollWidth <= innerWidth,
                ),
              );
            }
            await page.locator(".hero .primary").click();
            await page.waitForURL("**/#install");
            const distribution = page.locator(
              ".install-layout aside .text-link",
            );
            const href = await distribution.getAttribute("href");
            assert(
              href.includes(
                slug === "caelum-orbis"
                  ? "npmjs.com/package/dsh-orbis"
                  : `github.com/mycherish/${slug}/releases/tag/`,
              ),
            );
            for (const img of await page.locator("main img").all()) {
              await img.scrollIntoViewIfNeeded();
              await img.evaluate((img) => img.decode());
              const actual = await img.evaluate((img) => ({
                src: img.currentSrc,
                width: img.naturalWidth,
              }));
              assert(actual.src.includes(`/products/${slug}/`), actual.src);
              assert(
                actual.width > 100,
                "Actual screenshot must replace the loading placeholder",
              );
            }
            for (const anchor of await page
              .locator('main a[href^="#"]')
              .all()) {
              const href = await anchor.getAttribute("href");
              assert(await page.locator(href).count(), href);
            }
            const faq = page.locator(".faq details").first();
            await faq.locator("summary").click();
            assert((await faq.getAttribute("open")) !== null);
            await page.goto(`${base}/${slug}/`);
            await page.waitForURL(`${base}/products/${slug}/`);
            await page.waitForLoadState("load");
            assert.equal(
              await page.locator("html").getAttribute("data-theme-preference"),
              "auto",
            );
            assert.deepEqual(errors, []);
            assert.deepEqual(failedResources, []);
          } finally {
            await page.close();
          }
        });
    const page = await browser.newPage();
    try {
      await page.goto(`${base}/products/`);
      assert.equal(await page.locator(".product-item").count(), 4);
      for (const slug of products)
        assert.equal(
          await page
            .locator(`.product-item h2 a[href="/products/${slug}/"]`)
            .count(),
          1,
        );
      await page.goto(`${base}/en/products/`);
      assert.equal(await page.locator(".product-item").count(), 1);
    } finally {
      await page.close();
    }
  } finally {
    await browser.close();
  }
});
