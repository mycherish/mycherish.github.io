const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { runInNewContext } = require("node:vm");
const source = readFileSync(
  join(__dirname, "../static/js/site-preferences.js"),
  "utf8",
);
function boot({
  stored = null,
  systemDark = false,
  blocked = false,
  defaultTheme = "auto",
} = {}) {
  const events = {};
  const root = { dataset: { defaultTheme } };
  const body = {
    setAttribute: (k, v) => {
      body[k] = v;
    },
  };
  const media = {
    matches: systemDark,
    addEventListener: (_, cb) => {
      events.media = cb;
    },
  };
  const window = {
    matchMedia: () => media,
    addEventListener: (key, cb) => {
      events[key] = cb;
    },
  };
  const storage = {
    getItem: () => {
      if (blocked) throw Error("blocked");
      return stored;
    },
    setItem: (_, v) => {
      if (blocked) throw Error("blocked");
      stored = v;
    },
  };
  runInNewContext(source, {
    window,
    localStorage: storage,
    document: {
      documentElement: root,
      body,
      querySelectorAll: () => [],
      addEventListener: (key, cb) => {
        events[key] = cb;
      },
    },
  });
  return {
    root,
    body,
    choose: window.sitePreferences.choose,
    stored: () => stored,
    system: (dark) => {
      media.matches = dark;
      events.media();
    },
    storage: (key, newValue) => events.storage({ key, newValue }),
  };
}
test("saved dark overrides light OS before ready and updates blog body", () => {
  const s = boot({ stored: "dark" });
  assert.equal(s.root.dataset.theme, "dark");
  assert.equal(s.body.theme, "dark");
});
test("saved light overrides dark OS even after OS changes", () => {
  const s = boot({ stored: "light", systemDark: true });
  s.system(false);
  s.system(true);
  assert.equal(s.root.dataset.theme, "light");
});
test("no saved choice tracks system changes", () => {
  const s = boot();
  s.system(true);
  assert.equal(s.root.dataset.theme, "dark");
  s.system(false);
  assert.equal(s.root.dataset.theme, "light");
});
test("explicit selection persists compatible light and dark values", () => {
  const s = boot();
  s.choose("dark");
  assert.equal(s.stored(), "dark");
  s.choose("light");
  assert.equal(s.stored(), "light");
});
test("auto can be restored after manual choice and tracks OS", () => {
  const s = boot();
  s.choose("dark");
  s.choose("auto");
  assert.equal(s.stored(), "auto");
  assert.equal(s.root.dataset.theme, "light");
  s.system(true);
  assert.equal(s.root.dataset.theme, "dark");
  assert.equal(s.root.dataset.themePreference, "auto");
});
test("other tabs update preference, unrelated keys do not", () => {
  const s = boot();
  s.storage("theme", "dark");
  s.storage("other", "light");
  assert.equal(s.root.dataset.theme, "dark");
  s.storage("theme", null);
  assert.equal(s.root.dataset.theme, "light");
});
test("clearing storage respects configured default", () => {
  const s = boot({ stored: "dark", defaultTheme: "light", systemDark: true });
  s.storage(null, null);
  assert.equal(s.root.dataset.theme, "light");
});
test("blocked storage does not prevent local selection", () => {
  const s = boot({ blocked: true });
  s.choose("dark");
  assert.equal(s.root.dataset.theme, "dark");
  s.choose("auto");
  assert.equal(s.root.dataset.theme, "light");
});
test("invalid theme is ignored safely", () => {
  const s = boot();
  s.choose("unexpected");
  assert.equal(s.root.dataset.themePreference, "auto");
});
