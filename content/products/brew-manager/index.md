---
title: Brew Manager
date: "2026-05-29T16:14:25+08:00"
draft: false
type: products
hiddenFromHomePage: true
aliases:
  - "/brew-manager/"
license: MIT 开源
brandName: Brew Manager
eyebrow: BREW MANAGER
description:
  macOS Apple Silicon 上的 Homebrew 图形管理工具，集中管理软件包、服务、Docker 容器与 LaunchPad
  服务组。
summary: 把 Homebrew 软件包、服务与 Docker 容器放进一个界面，用服务组启动常用开发环境。
subtitle:
  - 你的开发环境，
  - 一处管理。
intro: 查看 Homebrew 软件包和后台服务，管理 Docker 容器，再把常用服务组成一组。少记几条命令，把启动环境变成一次操作。
version: 1.5.0
weight: 30
platformSummary: macOS · Apple Silicon · DMG 下载
supportLines:
  - macOS · Apple Silicon（ARM64）
  - 需要 Homebrew；容器功能需要 Docker Desktop
repository: https://github.com/mycherish/brew-manager
issues: https://github.com/mycherish/brew-manager/issues
actionLabel: 下载与安装
installLink:
  url: https://github.com/mycherish/brew-manager/releases/tag/v1.5.0
  label: 查看发布版本
screenshot: preview.png
screenshotAlt: Brew Manager 深色界面，展示 Homebrew 软件包与开发服务管理
screenshotCaption: 软件包、服务与容器，一个界面。
screenshotNote: 沿用原产品介绍截图，本轮不重新验收应用功能
featureHeading:
  - 从软件包，
  - 到整组服务。
featureIntro: 以 Homebrew 为基础，把日常环境管理集中在可见的界面里。
features:
  - title: 软件包与 Tap
    text: 查看 Formulae、Casks 和 Taps，搜索软件包，管理第三方软件源。
  - title: 服务状态与控制
    text: 查看后台服务状态，执行启动、停止和重启，并在界面中查看操作结果。
  - title: Docker 容器管理
    text: 查看容器状态、镜像和端口，启动或停止容器；容器功能依赖 Docker Desktop。
  - title: LaunchPad 服务组
    text: 组合 Brew 服务与 Docker 容器，批量启动、停止或重启常用开发环境。
installHeading:
  - 下载应用，
  - 连接本机环境。
installNote: 当前发布支持 Apple Silicon；Intel Mac 不在本页下载支持范围内。
faq:
  - question: 支持 Intel Mac、Windows 或 Linux 吗？
    answer: 当前仓库说明和发布下载面向 macOS Apple Silicon（ARM64）。本页不声明其它平台已支持。
  - question: 下载安装包后还需要 Go 和 Node.js 吗？
    answer:
      Go、Node.js 和 Wails CLI 用于源码开发。普通用户使用 DMG；Homebrew 是应用管理软件包和服务的前提，Docker
      Desktop 是容器功能的前提。
  - question: 下载后提示无法验证开发者怎么办？
    answer: 应用未进行 Apple 开发者签名。先确认安装包来源，再查看仓库的首次启动说明；不要把系统提示理解为已经完成签名或公证。
closing:
  title: 把常用环境，整理好。
  text: 先确认芯片架构和依赖，再下载安装。
disclaimer: 独立开源项目，与 Homebrew 或 Docker 官方无隶属关系。
---

## 安装前确认

需要 **macOS Apple Silicon（ARM64）**。本机应已安装 [Homebrew](https://brew.sh/)；使用容器功能时，还需要 Docker Desktop。

### 01 · 下载与安装

前往 [Brew Manager v1.5.0](https://github.com/mycherish/brew-manager/releases/tag/v1.5.0)，下载 **`Brew-Manager-v1.5.0.dmg`**，打开后把应用拖入 **Applications**。

应用未进行 Apple 开发者签名。首次启动遇到系统阻止时，先确认下载来自该仓库，再参考 [README 的首次启动说明](https://github.com/mycherish/brew-manager#readme)。本页不要求所有用户先执行解除隔离命令。

### 02 · 管理日常环境

- **概览**：查看软件、服务和容器数量。
- **软件包与 Tap**：查看已安装软件、搜索安装，以及添加、移除和更新 Tap。
- **服务**：启动、停止或重启后台服务，观察状态变化和操作结果。
- **Docker**：查看容器，按需启动或停止；先准备 Docker Desktop。
- **LaunchPad**：新建服务组，选择 Brew 服务与 Docker 容器，再对整组执行操作。

### 界面预览

以下图片来自原产品介绍，展示不同页面；不作为本轮应用功能复验的证据。

![Brew Manager 概览与服务组](overview.png)

![Brew Manager 已安装的 GUI 应用列表](applications.png)

![Brew Manager Docker 容器状态与操作](docker.png)

![Brew Manager LaunchPad 服务组配置](launchpad.png)

### 更新与源码

`v1.5.0` 增加 LaunchPad 服务组和 Docker 容器管理，并改进按 Tab 刷新、图标加载与 Tap 查询。完整记录见 [GitHub Releases](https://github.com/mycherish/brew-manager/releases)。

项目基于 Wails v2、Go、Vue 3 和 Vite。源码构建、开发环境和贡献方式统一维护在 [仓库 README](https://github.com/mycherish/brew-manager#readme)，产品页不重复维护开发命令。
