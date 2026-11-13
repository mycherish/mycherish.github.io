const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { mkdtempSync, readFileSync, existsSync, rmSync } = require("node:fs");
const { tmpdir } = require("node:os");
const { join, resolve } = require("node:path");
const { execFileSync } = require("node:child_process");
const site = resolve(__dirname, "..");
const products = ["caelum-orbis", "brew-manager", "openclaw-coralui"];
let scratch;
let output;
const html = (route) => readFileSync(join(output, route, "index.html"), "utf8");
before(() => {
  scratch = mkdtempSync(join(tmpdir(), "caelum-migration-test-"));
  output = join(scratch, "public");
  execFileSync(
    "hugo",
    ["--source", site, "--destination", output, "--noBuildLock"],
    { env: { ...process.env, HUGO_RESOURCEDIR: join(scratch, "resources") } },
  );
});
after(() => {
  if (scratch) rmSync(scratch, { recursive: true, force: true });
});
for (const slug of products)
  test(`${slug}: product page replaces post and keeps old address`, () => {
    assert(
      !existsSync(join(site, `content/posts/${slug}.md`)),
      "Old post must be migrated",
    );
    const source = html(`products/${slug}`);
    assert(
      source.includes(
        `rel="canonical" href="https://mycherish.github.io/products/${slug}/"`,
      ),
    );
    assert.match(source, /<h1[^>]*>.+?<\/h1>/s);
    assert.match(source, /<img[^>]+alt="[^"]+"/);
    assert(
      !source.includes("site-language-menu"),
      "No invented English translation",
    );
    assert(
      !source.includes("官方 Desktop 暂未兼容"),
      "No inherited Companion platform claim",
    );
    const old = html(slug);
    assert.match(
      old,
      /<meta http-equiv="refresh" content="0; url=https:\/\/mycherish.github.io\/products\//,
    );
    assert(old.includes(`/products/${slug}/`));
    assert(!existsSync(join(output, `en/products/${slug}/index.html`)));
    const localImages = [
      ...source.matchAll(/<img\b[^>]*?\ssrc="([^"]+)"/g),
    ].map((m) => m[1]);
    assert.equal(localImages.length, slug === "caelum-orbis" ? 2 : 5);
    for (const image of localImages) {
      assert(
        image.startsWith(`/products/${slug}/`),
        `Real product image required: ${image}`,
      );
      assert(image.startsWith("/"), image);
      assert(existsSync(join(output, image)), image);
    }
  });
test("directory and search index expose products while blog archives and feeds exclude them", () => {
  const directory = html("products");
  assert.equal((directory.match(/class="product-item"/g) || []).length, 4);
  const index = JSON.parse(readFileSync(join(output, "index.json"), "utf8"));
  const sitemap = readFileSync(join(output, "zh-cn/sitemap.xml"), "utf8");
  for (const slug of products) {
    assert(directory.includes(`/products/${slug}/`));
    assert(
      index.some((entry) => entry.uri === `/products/${slug}/`),
      "Product must be searchable",
    );
    assert(
      !index.some((entry) => entry.uri === `/${slug}/`),
      "Old article must leave search index",
    );
    for (const route of ["", "posts", "categories", "tags"]) {
      const page = html(route);
      assert(!page.includes(`href="/${slug}/"`), `${route}: old article link`);
      assert(
        !page.includes(`href="/products/${slug}/"`),
        `${route}: product in article listing`,
      );
    }
    for (const path of ["index.xml", "posts/index.xml"])
      assert(
        !readFileSync(join(output, path), "utf8").includes(
          `/products/${slug}/`,
        ),
        path,
      );
    assert(sitemap.includes(`/products/${slug}/`));
  }
});
test("published download limits and Orbis host range are explicit", () => {
  const orbis = html("products/caelum-orbis");
  assert(orbis.includes("0.2.2-rc.1") && orbis.includes("0.3.0"));
  assert(orbis.includes("dsh-orbis@2.1.13"));
  const brew = html("products/brew-manager");
  assert(brew.includes("Apple Silicon"));
  const coral = html("products/openclaw-coralui");
  assert(coral.includes("v1.0.0") && coral.includes("ARM64"));
  assert(
    coral.includes("Windows") &&
      coral.includes("Linux") &&
      coral.includes("未提供"),
  );
  assert(coral.includes("源码") && coral.includes("Quick Chat"));
});
