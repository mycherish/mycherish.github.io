const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { runInNewContext } = require("node:vm");

const source = readFileSync(
  join(__dirname, "../static/js/companion-theme.js"),
  "utf8",
);
function boot({
  stored = null,
  systemDark = false,
  blocked = false,
  defaultTheme = "auto",
} = {}) {
  const events = {};
  const attributes = {};
  let onClick;
  let onMedia;
  const button = {
    hidden: true,
    setAttribute: (key, value) => {
      attributes[key] = value;
    },
    addEventListener: (_, callback) => {
      onClick = callback;
    },
  };
  const root = { dataset: { defaultTheme } };
  const media = {
    matches: systemDark,
    addEventListener: (_, callback) => {
      onMedia = callback;
    },
  };
  const storage = {
    getItem: () => {
      if (blocked) throw Error("blocked");
      return stored;
    },
    setItem: (_, value) => {
      if (blocked) throw Error("blocked");
      stored = value;
    },
  };
  runInNewContext(source, {
    document: {
      documentElement: root,
      querySelector: () => button,
      addEventListener: (_, callback) => {
        events.ready = callback;
      },
    },
    window: {
      matchMedia: () => media,
      addEventListener: (_, callback) => {
        events.storage = callback;
      },
    },
    localStorage: storage,
  });
  return {
    root,
    button,
    attributes,
    ready: () => events.ready(),
    click: () => onClick(),
    stored: () => stored,
    changeSystem: (dark) => {
      media.matches = dark;
      onMedia();
    },
    storageEvent: (key, newValue) => events.storage({ key, newValue }),
  };
}
test("blog's stored dark takes precedence over a light OS before DOM ready", () => {
  const s = boot({ stored: "dark" });
  assert.equal(s.root.dataset.theme, "dark");
});
test("blog's stored light takes precedence over a dark OS", () => {
  const s = boot({ stored: "light", systemDark: true });
  assert.equal(s.root.dataset.theme, "light");
  s.changeSystem(false);
  s.changeSystem(true);
  assert.equal(s.root.dataset.theme, "light");
});
test("without a saved choice the page tracks system changes", () => {
  const s = boot();
  assert.equal(s.root.dataset.theme, "light");
  s.changeSystem(true);
  assert.equal(s.root.dataset.theme, "dark");
  s.changeSystem(false);
  assert.equal(s.root.dataset.theme, "light");
});
test("toggle persists LoveIt's value and exposes its accessible state", () => {
  const s = boot();
  s.ready();
  assert.equal(s.button.hidden, false);
  s.click();
  assert.equal(s.stored(), "dark");
  assert.equal(s.attributes["aria-pressed"], "true");
  s.click();
  assert.equal(s.stored(), "light");
  assert.equal(s.attributes["aria-pressed"], "false");
});
test("theme changes in another tab update the page, unrelated storage does not", () => {
  const s = boot();
  s.storageEvent("theme", "dark");
  assert.equal(s.root.dataset.theme, "dark");
  s.storageEvent("other", "light");
  assert.equal(s.root.dataset.theme, "dark");
  s.storageEvent("theme", null);
  assert.equal(s.root.dataset.theme, "light");
});
test("clearing storage falls back to the configured default", () => {
  const s = boot({ stored: "dark", defaultTheme: "light", systemDark: true });
  s.storageEvent(null, null);
  assert.equal(s.root.dataset.theme, "light");
});
test("blocked storage does not prevent rendering or a local toggle", () => {
  const s = boot({ blocked: true });
  s.ready();
  s.click();
  assert.equal(s.root.dataset.theme, "dark");
});
