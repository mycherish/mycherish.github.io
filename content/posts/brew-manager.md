---
title: "Brew Manager"
date: 2026-03-05T10:32:25+08:00
draft: false
tags: ["Go", "HomeBrew", "Mac"]
categories: ["工具"]
description: "优雅地管理 Homebrew：我用 Wails 开发了一款 macOS 原生感十足的 GUI 工具"
---


<!--more-->


![Main Window](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/20260301002735681.png)

## 前言

作为 macOS 开发者，`Homebrew` 几乎是装机必备。但随着安装的服务（Services）越来越多，每次开关 Redis、MySQL 或 Nginx 都要打开终端输入 `brew services start/stop ...`，不仅繁琐，而且难以直观地查看哪些服务正在后台运行。

为了解决这个问题，我决定利用业余时间开发一款属于自己的图形化管理工具：**Brew-Manager**。

项目地址：[mycherish/brew-manager](https://github.com/mycherish/brew-manager)

***

## ✨ 为什么选择 Brew-Manager？

市面上虽然也有一些 Homebrew GUI 工具，但我希望它能更“原生”、更“轻量”。

### 1. 沉浸式的 macOS 原生体验

Brew-Manager 深度适配了 macOS 的 **Vibrancy（毛玻璃）** 效果。它不仅仅是一个窗口，更像是一个系统内置的组件。通过 Wails 框架，应用完美支持暗色模式，并采用了符合 Apple 规范的 **Squircle（超椭圆）** 圆角设计。

### 2. 状态实时感知

无需手动刷新，应用内置了智能轮询机制。无论是你通过本工具还是在终端手动切换服务状态，Brew-Manager 都会在几秒内自动同步，并通过带呼吸灯效果的状态点直观反馈。

### 3. 丝滑的交互细节

*   **快速搜索**：毫秒级的关键词过滤，帮助你在几十个 Casks 和 Formulae 中瞬间定位。

*   **通知系统**：自研的类 macOS 系统通知（Toast），让每一次操作的成功与失败都清晰可见，且不干扰核心交互。

*   **单行操作保护**：在启动或停止服务时，会有加载态保护，防止重复点击导致系统命令冲突。

### 4. ✨ 功能特性
* **视觉进化**：自动获取 Homebrew Cask 应用图标，界面更直观。
* **原生转换引擎**：集成 macOS 系统级 `sips` 技术，实现 `.icns` 到 Web 兼容格式的零延迟转换。
* **智能映射算法**：内置名称映射与模糊匹配逻辑，解决包名（如 `iterm2`）与应用名（如 `iTerm.app`）不一致的问题。
* **高性能加载**：采用异步并发提取机制，并配合进程级隔离的临时缓存，确保图标加载不卡顿、不错位。

***

## 🛠️ 技术栈揭秘

这款工具背后的技术栈非常轻量且高效：

*   **Backend**: [Wails v2](https://wails.io/) (基于 Go 语言，调用系统底层命令)

*   **Frontend**: [Vue 3](https://vuejs.org/) + **Vite** (极速的开发体验)

*   **UI Design**: 纯 CSS 实现的 macOS 材质感 + 响应式布局

*   **Icon Design**: 结合 macOS 图标安全区域规范设计的 3D 质感图标

***

## 📸 预览

![Search](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/20260301002838262.png)

*   **主界面**：左右分栏设计，左侧管理终端工具（Formulae），右侧管理桌面应用（Casks）。

*   **实时反馈**：点击启动按钮，绿色的呼吸灯亮起，这就是掌控感。

***

## 🚀 快速上手

你可以直接从 [GitHub Releases](https://github.com/mycherish/brew-manager/releases) 页面下载最新的 `.dmg` 安装包。

```bash
# 由于未签名，首次运行请执行以下命令解除隔离：
sudo xattr -rd com.apple.quarantine /Applications/Brew-Manager.app
```

***

## 结语

`Brew-Manager` 是我从 0 到 1 学习 Wails 开发的一次尝试。从最初的一个简单列表，到现在的圆角图标、动画通知、以及毛玻璃特效，每一个像素的打磨都让我对 macOS 开发有了更深的理解。

如果你也厌倦了频繁输入终端命令，或者想找一个简洁优雅的工具来美化你的开发环境，欢迎试用并给个 **Star 🌟**！

**项目 GitHub：** <https://github.com/mycherish/brew-manager>

***

*感谢你的阅读，欢迎在 Issue 提出你宝贵的建议！*
