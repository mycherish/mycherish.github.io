---
title: "DeepSeek Companion"
date: 2026-11-13T10:00:00+08:00
draft: false
type: "products"
hiddenFromHomePage: true
description: "在 macOS 的 DSH Web 中使用自己的 DeepSeek 网页账号，支持流式聊天、深度思考、搜索、图片与历史会话，以及 Dock、Float、Pop-out 三种窗口。"
subtitle:
  - "你的 DeepSeek，"
  - "就在工作台旁边。"
intro: "用自己的 DeepSeek 网页账号，在 DSH Web 中继续对话。深度思考、搜索、图片与历史会话，都可以在熟悉的工作台里完成。"
version: "0.1.0"
weight: 10
summary: "在 DSH Web 中使用自己的 DeepSeek 网页账号，支持流式聊天、图片、历史与三种窗口。"
platformSummary: "macOS · 指定版本 DSH Web · Desktop 暂未兼容"
repository: "https://github.com/mycherish/dsh-deepseek-companion"
market: "https://mycherish.github.io/dsh-deepseek-companion/index.json"
issues: "https://github.com/mycherish/dsh-deepseek-companion/issues"
screenshot: "float.png"
screenshotAlt: "DSH Web 中的 Companion 浮动窗口，显示 FR5_MARKET_OK 测试回复和聊天输入框"
brandName: "Companion"
eyebrow: "DEEPSEEK COMPANION"
supportLines:
  ["macOS · 指定版本 DSH Web · 第三方开源插件", "官方 Desktop 暂未兼容"]
screenshotCaption: "一个工作台，三种打开方式。"
screenshotNote: "真实发布验收画面 · Float 模式 · 内容为测试对话"
featureIntro: "把网页对话带到 DSH 工作台里，保留熟悉的聊天方式。"
installNote: "安装前请先确认宿主版本和浏览器前置条件。"
license: "MIT 开源"
disclaimer: "第三方项目，与 DeepSeek 官方无隶属关系。"
featureHeading: ["少一次切换，", "多一点专注。"]
installHeading: ["几步准备，", "接着聊。"]
closing:
  title: "让对话，留在手边。"
  text: "从一个兼容的 Web 环境开始。"
installLink:
  url: "https://www.npmjs.com/package/dsh-deepseek-companion"
  label: "在 npm 查看"
features:
  - title: "熟悉的聊天能力"
    text: "流式回答、Markdown 与代码展示，支持切换深度思考、智能搜索和停止生成。"
  - title: "图片与历史，接着聊"
    text: "发送 PNG、JPEG、WebP、GIF 图片，切换历史会话。历史图片失效时保留文件名提示。"
  - title: "按你的节奏摆放"
    text: "Dock 停靠、可拖动缩放的 Float、独立 Pop-out，共享消息和服务状态。未发送文字为各窗口本地草稿。"
  - title: "恢复时，保留上下文"
    text: "支持连接重连、页面及浏览器故障恢复；身份无法确认时保留消息并暂停发送，不自动重发。"
faq:
  - question: "这是 DeepSeek 官方插件吗？"
    answer: "不是。这是面向 DeepSeek Harness（DSH）的第三方开源插件，通过官方插件机制安装，不修改 DSH 源码。"
  - question: "会消耗 DeepSeek API 余额吗？"
    answer: "插件使用 DeepSeek 网页聊天，不调用付费 API；使用仍受网页账号额度、站点规则和风控限制。它不是 API Provider 或 OpenAI-compatible Gateway。"
  - question: "支持官方 DSH Desktop 吗？"
    answer: "目前不支持。0.1.0 只声明兼容 macOS 上的本地 DSH Web 0.1.5-rc.2 和 0.2.1-rc.2；其它宿主版本、操作系统、浏览器和远程无界面部署尚未验收。"
  - question: "登录 DSH 后就能直接使用吗？"
    answer: "DSH 登录与 DeepSeek 网页登录是两套状态。首次使用需要自己的 DeepSeek 网页登录状态。发布验收验证了已有登录状态下的聊天；站点首次登录入口因匿名访问行为未被观察到，不宣称从零输入凭据登录已实测通过。"
  - question: "卸载会删除登录状态吗？"
    answer: "普通插件卸载不删除 DeepSeek 浏览器登录目录。升级前停止对应 DSH 实例；未发送草稿和 Host 内存消息不承诺跨进程保留。不要手工删除整个 DSH_HOME。"
  - question: "遇到问题怎么反馈？"
    answer: "通过 GitHub Issues 提供插件版本、DSH 版本、系统版本和复现步骤。不要上传 Cookie、token、完整登录目录或含私人聊天的原始日志。"
---

## 准备好，再开始

**当前支持 macOS、本地 DSH Web `0.1.5-rc.2` / `0.2.1-rc.2`，Node.js 22 或以上。官方 Desktop 暂未兼容。**

先用 `dsh --version` 检查宿主版本。不要跳过兼容范围，也不要直接把最新宿主视为已支持。

### 01 · 安装插件

通过 DSH 官方插件命令，安装已公开发布的确切版本：

```sh
dsh plugin --profile web add dsh-deepseek-companion@0.1.0
```

将 `web` 替换为你实际使用的 Web profile 名称。不要填 `desktop`。

### 02 · 准备浏览器

确认 Playwright 显示 `1.62.0`，再安装与它匹配的完整 Chromium：

```sh
dsh plugin --profile web exec playwright --version
dsh plugin --profile web exec playwright install chromium --no-shell
```

下载时间取决于网络。不要用 `playwright@latest` 替代。安装和运行使用同一系统用户；如果设置了 `PLAYWRIGHT_BROWSERS_PATH`，两者保持一致。

### 03 · 启动，打开 Companion

```sh
dsh --profile web --no-open
```

在浏览器打开终端提示的本地地址，完成 DSH 的初始引导，再从侧栏打开 Companion。按界面提示打开独立 DeepSeek 网页并处理自己的登录状态，返回 Companion 开始聊天。无需为 Companion 配置 DSH API Key。

### 也可以通过自定义市场安装

在已验收的 DSH Web `0.2.1-rc.2` 中，进入 **插件 → 实验性插件 → 自定义插件市场**，启用后打开“发现”，添加以下索引：

```text
https://mycherish.github.io/dsh-deepseek-companion/index.json
```

选择「DeepSeek 网页伴侣」`0.1.0`，核对来源并确认安装、启用；浏览器前置条件仍需满足。旧版保留上面的命令行安装路径。这是自定义市场，不是官方默认市场预置插件。

### 使用前了解的边界

Search 仅将准确映射到的来源展示为链接。极快连续发送的空 parent anchor、树形分支历史仍采取安全拒绝，不猜测会话。首版没有文档附件、多账号、主动心跳探测、Host 消息持久化、Proxy 或 Handoff。

停止对应 DSH 实例后，可用以下命令卸载，随后重新启动：

```sh
dsh plugin --profile web remove dsh-deepseek-companion
```
