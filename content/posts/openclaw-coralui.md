---
title: "OpenClaw CoralUI - 现代化的 OpenClaw 图形化管理工具"
date: 2026-04-03T12:15:00+08:00
draft: false
featuredImage: "https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/20260530004120592.png"
tags: ["Electron", "React", "TypeScript", "OpenClaw", "桌面应用"]
categories: ["开源项目"]
description: "基于 Electron + React + TypeScript 构建的 OpenClaw 图形化管理工具，支持系统托盘、Quick Chat、开机自启等功能"
---

<!--more-->

## 前言

[OpenClaw](https://openclaw.ai/) 是一个强大的 AI 代理框架，但日常使用中频繁的命令行操作让我萌生了开发一个图形化管理工具的想法。于是 **OpenClaw CoralUI**（珊瑚界面）诞生了 —— 一个现代化的、macOS 风格的桌面应用。

项目地址：[mycherish/openclaw-coralui](https://github.com/mycherish/openclaw-coralui)

***

## ✨ 核心功能

### 🎨 现代化界面

- **macOS 原生风格**：采用 `hiddenInset` 标题栏，保留原生红绿灯控件
- **可拖动标题栏**：顶部整个区域支持拖动窗口
- **流畅动画**：基于 Tailwind CSS 的过渡动画，交互丝滑

### 📊 实时监控

- **概览面板**：一眼看清安装状态、网关状态、健康状态、版本信息
- **服务监控**：Gateway、Nodes、Models、Channels 状态一目了然
- **实时日志**：查看 OpenClaw 运行日志

### 🔧 服务管理

- **安装管理**：四级安装选项（核心、基础、标准、完整）
- **卸载选项**：四级卸载模式（服务、状态、工作区、完全）
- **Gateway 控制**：一键启动、停止、重启

### 🎯 v1.1.0 新功能

| 功能 | 说明 |
|------|------|
| 🖼️ **系统托盘** | 快速访问：显示/隐藏主窗口、Quick Chat、开机自启开关、退出 |
| ⌨️ **Quick Chat** | 浮动聊天窗口，全局快捷键 `Cmd/Ctrl+Shift+O` 唤起 |
| 🚀 **开机自启** | 可选择系统启动时自动运行 |
| ⚙️ **设置持久化** | 所有设置本地保存，跨会话保留 |
| 🎹 **自定义快捷键** | 在设置中录制和修改 Quick Chat 快捷键 |

***

## 🛠️ 技术栈

| 层级 | 技术 |
|------|------|
| **桌面框架** | [Electron 28](https://www.electronjs.org/) |
| **前端框架** | [React 18](https://reactjs.org/) |
| **类型系统** | [TypeScript 5.3](https://www.typescriptlang.org/) |
| **构建工具** | [Vite 5](https://vitejs.dev/) |
| **样式方案** | [Tailwind CSS](https://tailwindcss.com/) |
| **状态管理** | React Context |

***

## 📸 界面预览

| 概览 | 安装 | 监控 |  Quick Chat |
| :--- | :--- | :--- | :--- |
| ![](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/20260530004204921.png) | ![](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/20260530004258911.png) | ![](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/20260530004324625.png) | ![](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/20260530004521305.png) |

***

## 🚀 快速上手

### 下载安装

前往 [GitHub Releases](https://github.com/mycherish/openclaw-coralui/releases) 下载对应平台的安装包：

- **macOS**: `.dmg` 文件
- **Windows**: `.exe` 安装包
- **Linux**: `.AppImage` 或 `.deb`

### macOS 用户注意

由于未进行 Apple 开发者签名，首次运行请执行：

```bash
sudo xattr -rd com.apple.quarantine /Applications/OpenClaw\ CoralUI.app
```

### 开发模式

```bash
# 克隆仓库
git clone https://github.com/mycherish/openclaw-coralui.git
cd openclaw-coralui

# 安装依赖
npm install

# 启动开发服务器
npm run electron:dev
```

### 构建打包

```bash
# 构建当前平台
npm run electron:build

# 指定平台
npm run electron:build -- --mac
npm run electron:build -- --win
npm run electron:build -- --linux
```

***

## ⌨️ 快捷键

| 快捷键 | 操作 |
|--------|------|
| `Cmd/Ctrl + Shift + O` | 切换 Quick Chat 窗口 |
| `Cmd/Ctrl + Q` | 退出应用 (macOS) |

> 快捷键可在 设置 > 快捷键 中自定义

***

## 📁 项目结构

```
openclaw-coralui/
├── electron/              # Electron 主进程
│   ├── main.js           # 窗口、托盘、IPC 处理
│   └── preload.js        # 上下文桥接
├── src/                  # React 源码
│   ├── components/       # UI 组件
│   ├── contexts/         # 全局状态
│   ├── pages/            # 页面组件
│   └── types/            # TypeScript 类型定义
├── public/               # 静态资源
└── build/                # 构建输出和图标
```

***

## 💬 开发心得

这个项目是我学习 Electron 桌面开发的实践。从最初简单的状态展示，到现在的系统托盘、全局快捷键、Quick Chat 浮窗，每一步都让我对 Electron 的 IPC 通信、窗口管理、原生集成有了更深的理解。

特别值得一提的技术点：

1. **IPC 安全设计**：主进程与渲染进程通过 `contextBridge` 安全通信，避免 `nodeIntegration` 带来的安全风险
2. **全局快捷键**：使用 `globalShortcut` API 实现 Quick Chat 的快速唤起
3. **窗口失焦隐藏**：Quick Chat 窗口失去焦点时自动隐藏，模拟 Spotlight 的交互体验
4. **设置持久化**：使用 JSON 文件存储用户配置，轻量且跨平台

***

## 🔗 相关链接

- **GitHub**: [github.com/mycherish/openclaw-coralui](https://github.com/mycherish/openclaw-coralui)
- **OpenClaw**: [openclaw.ai](https://openclaw.ai/)
- **Electron**: [electronjs.org](https://www.electronjs.org/)
- **React**: [reactjs.org](https://reactjs.org/)

***

> 如果你觉得这个项目有用，欢迎在 GitHub 上点个 **Star** ⭐！
