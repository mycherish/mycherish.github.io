---
title: "Brew Manager 优雅地管理 Homebrew"
date: 2026-05-29T16:14:25+08:00
draft: false
featuredImage: "https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/20260530003500085.png"
tags: ["Go", "HomeBrew", "Mac", "Docker", "Wails"]
categories: ["工具"]
description: "基于 Wails + Vue 3 构建的 macOS 原生质感 Homebrew 管理工具，支持 Docker 容器管理、LaunchPad 一键启动、Tap 管理等"
---

<!--more-->

## 前言

作为 macOS 开发者，`Homebrew` 几乎是装机必备。但随着安装的服务（Services）越来越多，每次开关 Redis、MySQL 或 Nginx 都要打开终端输入 `brew services start/stop ...`，不仅繁琐，而且难以直观地查看哪些服务正在后台运行。

为了解决这个问题，我决定利用业余时间开发一款属于自己的图形化管理工具：**Brew-Manager**。

项目地址：[mycherish/brew-manager](https://github.com/mycherish/brew-manager)

***

## ✨ 核心特性

### 🖥️ 沉浸式的 macOS 原生体验

Brew-Manager 深度适配了 macOS 的 **Vibrancy（毛玻璃）** 效果。它不仅仅是一个窗口，更像是一个系统内置的组件。通过 Wails 框架，应用完美支持暗色模式，并采用了符合 Apple 规范的圆角设计。

### ⚡ 状态实时感知

无需手动刷新，应用内置了智能轮询机制。无论是你通过本工具还是在终端手动切换服务状态，Brew-Manager 都会在几秒内自动同步，并通过带呼吸灯效果的状态点直观反馈。

### 🔍 丝滑的交互细节

*   **快速搜索**：毫秒级的关键词过滤，帮助你在几十个 Casks 和 Formulae 中瞬间定位。
*   **Toast 通知系统**：自研的类 macOS 系统通知，让每一次操作的成功与失败都清晰可见，且不干扰核心交互。
*   **单行操作保护**：在启动或停止服务时，会有加载态保护，防止重复点击导致系统命令冲突。

### 🚀 强大的功能矩阵

| 功能 | 说明 |
|------|------|
| 🐳 **Docker 容器管理** | 查看、启动、停止 Docker 容器，自动检测 Docker Desktop 状态，未启动时一键拉起 |
| 🚀 **LaunchPad** | 将 Brew 服务 + Docker 容器自由组合为服务组，批量启动/停止/重启 |
| 🔌 **Tap 管理** | 添加、移除、更新 Homebrew Tap，统一管理体验，批量查询优化 |
| 🔍 **软件包搜索** | 搜索 Formulae、Casks、Taps，支持一键安装 |
| 📦 **应用图标** | 自动获取 Homebrew Cask 应用图标，批量异步加载，界面更直观 |
| ⚡ **智能刷新** | 每 2 分钟自动刷新当前 Tab 数据，底部进度条显示剩余时间 |

***

## 🛠️ 技术栈

| 层级 | 技术 |
|------|------|
| **后端** | [Wails v2](https://wails.io/) (Go 语言，调用系统底层命令) |
| **前端** | [Vue 3](https://vuejs.org/) + Vite (极速的开发体验) |
| **样式** | 纯 CSS 实现的 macOS 材质感 + 响应式布局 |

***

## 📸 预览

| 概览 | GUI 应用 | Docker 容器管理 | LaunchPad |
| :--- | :--- | :--- | :--- |
| ![](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/20260530000844103.png) | ![](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/20260530000944841.png) | ![](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/20260530001159764.png) | ![](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/20260530000716319.png) |

***

## 🚀 快速上手

### 安装方式

1. 前往 [GitHub Releases](https://github.com/mycherish/brew-manager/releases) 下载最新的 `.dmg` 安装包

2. 打开 `.dmg` 并将 `Brew-Manager.app` 拖入 **Applications** 文件夹

### 解除隔离

由于未进行 Apple 开发者签名，首次运行请执行：

```bash
sudo xattr -rd com.apple.quarantine /Applications/Brew-Manager.app
```

### 开发模式

```bash
# 克隆仓库
git clone https://github.com/mycherish/brew-manager.git

# 启动开发服务器
cd brew-manager
wails dev
```

***

## 🆕 v1.5.0 更新日志

### 🚀 LaunchPad 一键启动面板

- 将 Brew 服务 + Docker 容器自由组合为"服务组"
- 支持批量启动/停止/重启服务组内所有服务
- 服务组配置持久化保存（JSON 文件）
- 实时显示每组运行状态（全部运行 / 部分运行 / 已停止）
- 操作结果面板逐项展示成功/失败详情
- Modal 搜索 + 分类筛选（Brew / Docker）

### 🐳 Docker 容器管理

- 查看所有 Docker 容器列表（运行状态、镜像、端口）
- 一键启动/停止容器，未安装时引导启动 Docker Desktop
- 自动轮询检测 Docker Desktop 启动完成（60 秒超时）
- 实时状态指示（运行中 / 已停止 / 暂停）
- 侧边栏实时显示容器数量徽章

### ⚡ 性能优化

- Tab 独立刷新：切换页面只请求对应数据，不再全量查询
- 批量图标加载：后端 `GetAppIcons(names)` 批量接口，1 次 RPC 替代 N 次调用
- Tap 批量查询：使用 `brew tap-info --json` 一次性获取所有 Tap 信息
- 提取公共函数避免代码重复

### 🔧 Tap 管理简化

- 移除官方/第三方 Tap 分类，统一管理体验
- 批量查询优化，显著减少命令调用次数

***

## 💬 结语

Brew Manager 是我从 0 到 1 学习 Wails 开发的一次尝试。从最初的一个简单列表，到现在的 Docker 容器管理、LaunchPad 服务编排，以及毛玻璃特效，每一个功能的打磨都让我对 macOS 开发有了更深的理解。

如果你也厌倦了频繁输入终端命令，或者想找一个简洁优雅的工具来美化你的开发环境，欢迎试用并给个 **Star** 🌟！

***

## 🔗 相关链接

- **GitHub**: [github.com/mycherish/brew-manager](https://github.com/mycherish/brew-manager)
- **Wails**: [wails.io](https://wails.io/)
- **Vue 3**: [vuejs.org](https://vuejs.org/)

***

> 感谢你的阅读，欢迎在 Issue 提出你宝贵的建议！
