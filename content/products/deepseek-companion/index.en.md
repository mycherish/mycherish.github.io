---
title: "DSH Chat Buddy"
date: 2026-11-13T10:00:00+08:00
draft: false
type: "products"
hiddenFromHomePage: true
description: "Chat with your own DeepSeek web account in DSH Web on macOS, with streaming replies, Deep Think, Search, images, history, and three window modes."
subtitle:
  - "Your DeepSeek."
  - "Beside your workspace."
intro: "Keep chatting with your own DeepSeek web account in DSH Web. Deep Think, Search, images, and conversation history, right beside your work."
version: "0.1.3"
weight: 10
summary: "DeepSeek web chat in DSH Web, with streaming replies, images, conversation history, and three window modes."
platformSummary: "macOS · Supported DSH Web versions · Desktop not supported"
repository: "https://github.com/mycherish/dsh-deepseek-companion"
market: "https://mycherish.github.io/dsh-deepseek-companion/index.json"
issues: "https://github.com/mycherish/dsh-deepseek-companion/issues"
screenshot: "float.png"
screenshotAlt: "Companion floating over DSH Web with the FR5_MARKET_OK test reply and message composer. The application screenshot is in Chinese."
brandName: "Chat Buddy"
eyebrow: "DSH CHAT BUDDY"
supportLines:
  [
    "macOS · Supported DSH Web versions · Third-party open source",
    "Official Desktop is not supported yet",
  ]
screenshotCaption: "One workspace. Three ways to chat."
screenshotNote: "Previous-name 0.1.0 release screenshot · Test conversation"
featureIntro: "Bring web conversations into your DSH workspace. Start on demand, work quietly in the background, and show the browser only when you choose to sign in."
installNote: "Check your host version and browser prerequisites before installing."
license: "MIT licensed"
disclaimer: "An independent project, not affiliated with DeepSeek."
featureHeading: ["Less switching.", "More focus."]
installHeading: ["A few steps.", "Then keep chatting."]
closing:
  title: "Keep the conversation close."
  text: "Start with a compatible Web environment."
installLink:
  url: "https://www.npmjs.com/package/dsh-chat-buddy"
  label: "View on npm"
features:
  - title: "Familiar chat controls"
    text: "Stream replies, render Markdown and code, toggle Deep Think and Search, and stop generation."
  - title: "Images and history"
    text: "Send PNG, JPEG, WebP, and GIF images and switch conversations. Unavailable historical images keep a filename fallback."
  - title: "Three ways to keep it close"
    text: "Dock, draggable and resizable Float, and a separate Pop-out share messages and service state. Unsent text drafts belong to each window."
  - title: "Careful recovery"
    text: "Reconnect streams and recover from page or browser failures. When session identity cannot be verified, messages are preserved and sending pauses; messages are never automatically resent."
faq:
  - question: "Is this an official DeepSeek plugin?"
    answer: "No. It is a third-party open-source plugin for DeepSeek Harness (DSH), installed through the official plugin mechanism without modifying DSH source code."
  - question: "Does it use my DeepSeek API balance?"
    answer: "It uses DeepSeek web chat rather than the paid API. Web account limits, site rules, and risk controls still apply. It is not an API Provider or OpenAI-compatible Gateway."
  - question: "Does it support official DSH Desktop?"
    answer: "Not yet. Version 0.1.3 supports local DSH Web 0.1.5-rc.2, 0.2.1-rc.2, and 0.2.2-rc.1 on macOS. Other host versions, operating systems, browsers, and remote headless deployments have not been validated."
  - question: "Does signing in to DSH sign me in to DeepSeek?"
    answer: "No. DSH and DeepSeek web login are separate. Choose Sign in to DeepSeek in Chat Buddy, sign in manually in the separate window, then finish signing in and return to chat. The plugin does not use your DSH account as a substitute for web login."
  - question: "Will a browser window open when I start DSH?"
    answer: "Not in 0.1.3. Starting DSH creates no work browser; opening Chat Buddy starts a background instance. A visible window opens only when you choose to sign in or manage your login. Finishing sign-in or closing that window returns to the background. If sign-in is incomplete, Chat Buddy keeps showing its login prompt without reopening the window automatically."
  - question: "Does uninstalling remove my login?"
    answer: "Normal plugin removal keeps the DeepSeek browser login directory. Stop the corresponding DSH instance before upgrading. Unsent drafts and Host in-memory messages are not guaranteed to survive process restarts. Do not delete your entire DSH_HOME."
  - question: "How do I report an issue?"
    answer: "Use GitHub Issues with the plugin, DSH, and operating system versions plus reproduction steps. Do not include cookies, tokens, full login directories, or raw logs containing private conversations."
---

## Check before you start

**Supported: macOS, local DSH Web `0.1.5-rc.2` / `0.2.1-rc.2` / `0.2.2-rc.1`, and Node.js meeting both the plugin requirement (22 or later) and the selected DSH host requirements. Official Desktop is not supported yet.**

Run `dsh --version` first. A newer host version is not automatically supported. Background startup and login switching in 0.1.3 were validated on Web `0.2.2-rc.1`. The other two fixed host versions retain their existing compatibility declarations; their full chat matrices were not repeated in this round.

### 01 · Install the plugin

Use DSH's official plugin command to install the exact published version:

```sh
dsh plugin --profile web add dsh-chat-buddy@0.1.3
```

Replace `web` with your actual Web profile name. Do not use `desktop`.

### 02 · Prepare Chromium

Check that Playwright reports `1.62.0`, then install its matching full Chromium browser:

```sh
dsh plugin --profile web exec playwright --version
dsh plugin --profile web exec playwright install chromium --no-shell
```

Download time depends on your network. Do not substitute `playwright@latest`. Version 0.1.3 uses the same full Chromium browser for background work and visible sign-in, without a separate Headless Shell installation. Install and run as the same system user. If you use `PLAYWRIGHT_BROWSERS_PATH`, keep it consistent for installation and runtime.

### 03 · Open Chat Buddy

```sh
dsh --profile web --no-open
```

Open the local address printed by DSH and complete the host's initial onboarding. Starting DSH creates no work browser. You do not need to configure a DSH API key for Chat Buddy.

The plugin currently uses Chinese control labels; the exact labels are included below.

1. Open **快速聊天** (Quick chat) in the sidebar. Only then does Chat Buddy prepare its background web session.
2. If you are signed out, choose **登录 DeepSeek** (Sign in to DeepSeek) and sign in manually in the separate window.
3. Return to Chat Buddy and choose **完成登录，返回聊天** (Finish signing in and return to chat). The visible window closes and the background instance takes over. Closing the sign-in window also returns to the background; incomplete sign-in leaves the login prompt visible in Chat Buddy.
4. Use **管理登录** (Manage login) when needed. Finish any send or recovery operation and send or remove image drafts before switching modes.

Closing the Chat Buddy panel keeps its background instance running; exiting the corresponding DSH host releases the work browser.

### Install through a custom market

In the validated DSH Web `0.2.1-rc.2`, enable **Custom plugin markets** from the experimental plugins, open **Discover**, and add this index:

```text
https://mycherish.github.io/dsh-deepseek-companion/index.json
```

Find DSH Chat Buddy `0.1.3`, verify its source, confirm installation, and enable it. The Chromium prerequisite still applies. Use the command-line path above for other supported hosts. The Discover entry follows the earlier Web 0.2.1-rc.2 acceptance. This 0.1.3 round used the official CLI installer on Web 0.2.2-rc.1 and verified the public market index; the Discover installation flow was not repeated. This is a custom market, not a listing preinstalled in the official default market.

### Know the boundaries

Search links are created only for sources that can be accurately mapped. Very fast consecutive sends with an empty parent anchor and branching history safely fail instead of guessing the conversation. Version 0.1.3 does not include document attachments, multiple accounts, active heartbeat detection, Host message persistence, Proxy, or Handoff.

To uninstall, stop the corresponding DSH instance first, then run the command and restart DSH:

```sh
dsh plugin --profile web remove dsh-chat-buddy
```

## Migrating from the previous name

Previously DeepSeek Companion. The old `dsh-deepseek-companion@0.1.0` package remains available. Do not install both names in one profile. Save drafts and stop DSH, run `dsh plugin --profile web remove dsh-deepseek-companion`, then install `dsh-chat-buddy@0.1.3`, restart and refresh. Existing login directories and settings are retained; in-memory messages and unsent drafts are not guaranteed across restarts. The market URL and this page URL stay unchanged. Official Desktop remains unsupported.
