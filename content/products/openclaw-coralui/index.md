---
title: OpenClaw CoralUI
date: "2026-04-03T12:15:00+08:00"
draft: false
type: products
hiddenFromHomePage: true
aliases:
  - "/openclaw-coralui/"
license: MIT 开源
brandName: CoralUI
eyebrow: OPENCLAW CORALUI
description: OpenClaw 图形管理工具，提供服务管理、状态概览与日志；当前公开下载为 macOS ARM64，源码还包含托盘与 Quick Chat。
summary: 以图形界面管理 OpenClaw 服务、状态与日志。当前提供 macOS ARM64 安装包，源码功能与发布包范围分开说明。
subtitle:
  - 管理 OpenClaw，
  - 多一点直观。
intro: 把 OpenClaw 服务管理、系统状态和日志集中到桌面界面。仓库还提供托盘与 Quick Chat 等源码功能；安装包与源码的范围在下方分别说明。
version: 1.0.0
weight: 40
platformSummary: 当前下载：macOS ARM64 · 其它平台见源码说明
supportLines:
  - 公开安装包：v1.0.0 · macOS ARM64
  - 源码含跨平台构建配置，不等于已提供各平台安装包
repository: https://github.com/mycherish/openclaw-coralui
issues: https://github.com/mycherish/openclaw-coralui/issues
actionLabel: 下载与安装
installLink:
  url: https://github.com/mycherish/openclaw-coralui/releases/tag/v1.0.0
  label: 查看发布版本
screenshot: preview.png
screenshotAlt: OpenClaw CoralUI 深色桌面管理界面，展示 OpenClaw 状态信息
screenshotCaption: 服务与状态，放在同一处。
screenshotNote: 原介绍截图，包含源码功能；不保证 v1.0.0 安装包拥有全部截图功能
featureHeading:
  - 日常管理，
  - 看得更清楚。
featureIntro: 以下为仓库介绍的功能方向；当前源码与公开安装包可能不同，下载范围以发布附件为准。
features:
  - title: 状态概览
    text: 查看安装情况、网关、健康状态，以及节点、模型与渠道等信息。
  - title: 服务与日志
    text: 通过图形界面管理 OpenClaw Gateway，查看运行日志和操作状态。
  - title: 安装与卸载选项
    text: 仓库提供分级安装和卸载功能；涉及本机数据时，应先确认界面说明及操作范围。
  - title: 托盘与 Quick Chat（源码）
    text: 当前源码介绍包含托盘、全局快捷键、浮动聊天与开机自启；不将其视为 v1.0.0 下载包逐项验收承诺。
installHeading:
  - 先确认版本，
  - 再下载安装。
installNote: 当前公开发布是 v1.0.0；旧文章的源码功能描述不等于已有 v1.1.0 安装包。
faq:
  - question: Windows 和 Linux 安装包在哪里？
    answer: 当前 v1.0.0 发布附件仅有 macOS ARM64 DMG，未提供 Windows 或 Linux 安装包。仓库有对应平台构建命令，但不等于安装包已经发布或完成验收。
  - question: 托盘与 Quick Chat 是否包含在下载包中？
    answer: 仓库当前源码和原介绍包含这些功能。本轮没有对 v1.0.0 安装包逐项运行验证，因此不承诺下载包与当前源码功能完全相同。
  - question: 需要安装 OpenClaw 吗？
    answer: CoralUI 是 OpenClaw 的管理界面，不是独立模型服务。请先阅读仓库的 OpenClaw 环境准备与检测说明。
closing:
  title: 从适合你的版本开始。
  text: 普通用户查看公开安装包，开发者查看源码说明。
disclaimer: 独立开源项目，与 OpenClaw 官方无隶属关系。
---

## 下载前确认

当前公开版本为 **`v1.0.0`**，发布附件是 **`OpenClaw.CoralUI-1.0.0-arm64.dmg`**，面向 **macOS ARM64 / Apple Silicon**。

**当前未提供 Windows 或 Linux 安装包。** README 中的跨平台描述和构建配置表示源码提供相应方向，不应当理解为已有可下载且完成验收的全平台版本。

### 01 · 安装公开版本

打开 [OpenClaw CoralUI v1.0.0](https://github.com/mycherish/openclaw-coralui/releases/tag/v1.0.0)，下载上述 DMG，按安装界面操作。

首次启动、OpenClaw 检测与所需权限，见 [仓库 README](https://github.com/mycherish/openclaw-coralui#readme)。请确认提示对应的实际操作，再授予所需权限。

### 02 · 准备 OpenClaw 环境

CoralUI 管理的是 OpenClaw 服务。请按仓库说明准备 OpenClaw，启动应用后检查概览中的安装与网关状态，再使用服务和日志页面。

### 当前源码功能与快捷键

仓库当前源码介绍了系统托盘、Quick Chat 浮窗、开机自启、本地设置保存和自定义快捷键。原文章将这组功能写成“v1.1.0 新功能”，但当前公开 Release 仍只有 `v1.0.0`；本页不再把它们当作已发布 v1.1.0 的承诺。

| 快捷键                 | 源码介绍中的操作     |
| ---------------------- | -------------------- |
| `Cmd/Ctrl + Shift + O` | 切换 Quick Chat 浮窗 |
| `Cmd/Ctrl + Q`         | 退出应用             |

快捷键可在源码版本的设置中调整。需要这些功能时，先核对仓库当前状态与构建说明；本轮没有重新验收应用或公开安装包。

### 界面预览

以下图片沿用原介绍，包含源码功能画面，不能用于证明公开安装包已拥有全部功能。

![OpenClaw CoralUI 概览面板](overview.png)

![OpenClaw CoralUI 安装管理页面](installation.png)

![OpenClaw CoralUI 监控页面](monitoring.png)

![OpenClaw CoralUI Quick Chat 浮动聊天源码界面](quick-chat.png)

### 源码开发

项目基于 Electron、React、TypeScript 和 Vite。依赖安装、平台构建、目录结构及排障统一见 [仓库 README](https://github.com/mycherish/openclaw-coralui#readme)，产品页不重复维护整套开发说明。
