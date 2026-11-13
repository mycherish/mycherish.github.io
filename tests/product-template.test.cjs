const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
  copyFileSync,
} = require("node:fs");
const { tmpdir } = require("node:os");
const { join, resolve } = require("node:path");
const { execFileSync } = require("node:child_process");
const site = resolve(__dirname, "..");
let scratch;
let output;
function fixture(name, data, body = "") {
  const dir = join(scratch, "content/products", name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, "index.md"),
    `---\n${JSON.stringify({ title: name, ...data })}\n---\n${body}`,
  );
}
function html(route) {
  return readFileSync(join(output, route, "index.html"), "utf8");
}
function links(source) {
  return [...source.matchAll(/href="([^"]*)"/g)].map((match) => match[1]);
}
before(() => {
  scratch = mkdtempSync(join(tmpdir(), "caelum-product-template-"));
  output = join(scratch, "public");
  const options = {
    env: { ...process.env, HUGO_RESOURCEDIR: join(scratch, "resources") },
    stdio: "pipe",
  };
  execFileSync(
    "hugo",
    ["--source", site, "--destination", output, "--noBuildLock"],
    options,
  );
  fixture(
    "template-download-test",
    {
      brandName: "Download tool",
      version: "1.2.3",
      eyebrow: "DOWNLOAD TOOL",
      subtitle: ["A useful tool."],
      intro: "A standalone application.",
      supportLines: ["macOS Apple Silicon"],
      features: [
        { title: "Manage packages", text: "A product-specific feature." },
      ],
      featureHeading: ["Package management"],
      featureIntro: "A different workflow.",
      installHeading: ["Download the application"],
      installNote: "Choose your supported platform.",
      installLink: {
        url: "https://example.com/download",
        label: "Download release",
      },
      license: "Apache-2.0",
      disclaimer: "Independent download tool.",
    },
    "## Installation\n\nDownload the application from the release page.",
  );
  fixture("template-showcase-test", {
    screenshot: "preview.png",
    screenshotAlt: "A download tool preview",
    screenshotCaption: "Application overview",
    screenshotNote: "Product screenshot",
    closing: { title: "Try this tool", text: "A standalone workflow." },
    issues: "https://example.com/issues",
    faq: [{ question: "Which platform?", answer: "Apple Silicon." }],
    intro: "<script>unsafe()</script>",
  });
  copyFileSync(
    join(site, "content/products/deepseek-companion/float.png"),
    join(scratch, "content/products/template-showcase-test/preview.png"),
  );
  fixture("template-minimal-test", {});
  fixture("template-external-test", {
    installLink: { url: "https://example.com/install", label: "Download" },
  });
  execFileSync(
    "hugo",
    [
      "--source",
      site,
      "--contentDir",
      join(scratch, "content"),
      "--destination",
      output,
      "--noBuildLock",
    ],
    options,
  );
});
after(() => {
  if (scratch) rmSync(scratch, { recursive: true, force: true });
});
test("download product uses its own content and distribution link", () => {
  const source = html("products/template-download-test");
  assert.match(source, /Caelum<span> \/ <\/span>Download tool/);
  for (const text of [
    "DOWNLOAD TOOL",
    "macOS Apple Silicon",
    "Package management",
    "A different workflow.",
    "Download the application",
    "Choose your supported platform.",
    "Download release",
    "Apache-2.0",
    "Independent download tool.",
  ])
    assert(source.includes(text), text);
  assert(links(source).includes("https://example.com/download"));
  assert(
    source.includes("Download release 1.2.3"),
    "Distribution label must use the product version",
  );
  assert(links(source).includes("#install"));
  assert.doesNotMatch(source, /Companion|DeepSeek|DSH|npm|Float|Web 环境/);
  assert.doesNotMatch(source, /class="showcase|class="faq|class="closing/);
});
test("minimal product has title fallback and no empty sections or dangling actions", () => {
  const source = html("products/template-minimal-test");
  assert.match(source, /<h1[^>]*>\s*template-minimal-test\s*<\/h1>/);
  assert.doesNotMatch(source, /Companion|DeepSeek|DSH|npm/);
  assert.doesNotMatch(
    source,
    /class="showcase|class="features|class="install-section|class="faq|class="closing|class="hero-bottom/,
  );
  for (const href of links(source))
    assert(!["", "#install", "#features", "#"].includes(href), href);
});
test("product without installation prose can link directly to its installer", () => {
  const source = html("products/template-external-test");
  assert.match(
    source,
    /class="button primary" href="https:\/\/example.com\/install"/,
  );
  assert(!links(source).includes("#install"));
});
test("existing translated Companion pages retain their product content", () => {
  for (const [route, expected] of [
    [
      "products/deepseek-companion",
      [
        "一个工作台，三种打开方式。",
        "官方 Desktop 暂未兼容",
        "少一次切换，",
        "几步准备，",
        "让对话，留在手边。",
        "MIT 开源",
      ],
    ],
    [
      "en/products/deepseek-companion",
      [
        "One workspace. Three ways to chat.",
        "Official Desktop is not supported yet",
        "Less switching.",
        "A few steps.",
        "Keep the conversation close.",
        "MIT licensed",
      ],
    ],
  ]) {
    const source = html(route);
    for (const text of expected)
      assert(source.includes(text), `${route}: ${text}`);
    assert(
      links(source).includes(
        "https://www.npmjs.com/package/dsh-deepseek-companion",
      ),
    );
    assert.equal((source.match(/class="feature-list"/g) || []).length, 1);
    assert.match(
      source,
      /class="site-language-menu"|class="site-tool site-language-menu"/,
    );
    assert.match(source, /alt="[^"]+"/);
  }
});

test("screenshot, FAQ and closing use product data without leaking Companion defaults", () => {
  const source = html("products/template-showcase-test");
  for (const text of [
    "Application overview",
    "Product screenshot",
    "Try this tool",
    "A standalone workflow.",
    "Which platform?",
    "Apple Silicon.",
  ])
    assert(source.includes(text), text);
  assert.match(source, /alt="A download tool preview"/);
  assert.match(
    source,
    /property="og:image" content="https:\/\/mycherish.github.io\/products\/template-showcase-test\/preview.png"/,
  );
  assert(links(source).includes("https://example.com/issues"));
  assert.doesNotMatch(source, /Companion|DeepSeek|DSH|npm|<script>unsafe/);
  assert(!links(source).includes("#install"));
  assert(!source.includes("site-language-menu"));
});
test("configured missing screenshot fails the build instead of publishing an empty frame", () => {
  const content = join(scratch, "invalid-content/products/invalid-product");
  mkdirSync(content, { recursive: true });
  writeFileSync(
    join(content, "index.md"),
    "---\ntitle: Missing preview\nscreenshot: missing.png\n---\n",
  );
  assert.throws(
    () =>
      execFileSync(
        "hugo",
        [
          "--source",
          site,
          "--contentDir",
          join(scratch, "invalid-content"),
          "--destination",
          join(scratch, "invalid-output"),
          "--noBuildLock",
        ],
        {
          env: { ...process.env, HUGO_RESOURCEDIR: join(scratch, "resources") },
        },
      ),
    (error) => {
      assert(
        String(error.stdout).includes('screenshot "missing.png" was not found'),
      );
      return true;
    },
  );
});
