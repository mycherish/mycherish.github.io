---
title: Caelum Orbis
date: "2026-11-10T23:58:03+08:00"
draft: false
type: products
hiddenFromHomePage: true
aliases:
  - "/caelum-orbis/"
license: MIT 开源
brandName: Orbis
eyebrow: CAELUM ORBIS
description: DeepSeek Harness 的任务状态伴侣：常驻进度 HUD、3D 状态球、活动记录与执行时间线，不额外调用模型。
summary: 用常驻进度面板与 3D 状态球，看见 AI 正在思考、执行工具还是等待确认。
subtitle:
  - AI 在忙什么，
  - 一眼就看见。
intro: 常驻进度面板展示任务、阶段和最近活动；需要细节时，再打开 3D 状态球工作区。状态来自 DSH 事件，插件不额外调用模型。
version: 2.1.13
weight: 20
platformSummary: DSH 0.2.2-rc.1 至 <0.3.0 · 本机使用
supportLines:
  - DSH ≥0.2.2-rc.1、<0.3.0 · 本机 loopback 地址
  - 提供 Desktop / Web profile 安装方式，验证边界见下方
repository: https://github.com/mycherish/dsh-orbis
issues: https://github.com/mycherish/dsh-orbis/issues
installLink:
  url: https://www.npmjs.com/package/dsh-orbis
  label: 在 npm 查看
screenshot: hud-panel.webp
screenshotAlt: Caelum Orbis 深色进度面板，显示任务阶段、最近活动和当前状态
screenshotCaption: 任务、进度和状态，留在手边。
screenshotNote: 原产品介绍中的 HUD 截图，不代表本轮重新运行验收
featureHeading:
  - 少翻面板，
  - 看清进度。
featureIntro: 从正在执行的工具，到需要你确认的操作，用事件说明当前状态。
features:
  - title: 常驻任务进度
    text: 展示任务标题、阶段、运行时长和最近 5 条活动。空闲时收起，手动折叠后不主动弹回。
  - title: 会变色的 3D 状态球
    text: 真实 WebGL 渲染，随思考、执行、等待、完成等状态平滑变化，可拖动并记住位置。
  - title: 工作区看细节
    text: 集中查看活动记录、执行时间线和计数；支持自动展开、始终紧凑与仅能量球三种模式。
  - title: 按需控制动态效果
    text: 可调帧率、粒子、光效和减少动态效果，支持后台暂停与总开关。
installHeading:
  - 安装之后，
  - 刷新一次页面。
installNote: 先核对 DSH、Node.js 和本机访问条件；不要把安装方式等同于所有环境均已实测。
faq:
  - question: 和 DeepSeek Companion 是同一个插件吗？
    answer: 不是。Orbis 观察 DSH Agent 的任务状态；Companion 用于 DeepSeek 网页聊天，两者功能和兼容范围不同。
  - question: 会额外消耗模型 Token 吗？
    answer: 插件不额外调用模型，只观察 DSH 已有事件。DSH 主任务本身仍按所用模型正常消耗 Token。
  - question: 安静了，是不是代表卡住？
    answer: 不代表。面板报告一段时间没有收到新活动，不把静默直接判定为故障；长时间执行的工具仍可保持执行中。
  - question: 能给局域网其它设备使用吗？
    answer: 当前仅支持本机 loopback 地址。请求过滤并不是身份认证，不要把 DSH 直接暴露到局域网后依赖这层过滤。
closing:
  title: 看清进度，再继续工作。
  text: 先安装，再让 Agent 开始一轮任务。
disclaimer: 第三方项目，与 DeepSeek 官方无隶属关系。
---

## 安装前确认

宿主范围为 **DSH `>=0.2.2-rc.1 <0.3.0-0`**；Node.js 为 **`^22.19.0 || >=24.0.0`**。通过本机 `localhost` 或 loopback 地址访问。

仓库记录了 **DSH `0.2.2-rc.1` / Desktop profile** 下的本机验证，并提供 Web profile 安装方式；不据此承诺其它宿主、系统和浏览器组合均已验收。详细边界见 [仓库 README](https://github.com/mycherish/dsh-orbis#readme)。

### 01 · 安装插件

```sh
dsh plugin --profile desktop add dsh-orbis@2.1.13
```

如果使用 `dsh web`，把 `desktop` 换成实际的 Web profile 名称。也可以在 **设置 → 插件 → 添加插件 → 安装第三方插件** 中填写 `dsh-orbis@2.1.13`。

安装后刷新一次 Harness 页面，启用插件，再让 Agent 开始一轮任务。界面会按所选模式显示进度卡或状态球。

国内网络需要镜像时：

```sh
dsh plugin --profile desktop add dsh-orbis@2.1.13 --registry=https://registry.npmmirror.com
```

镜像可能存在同步延迟。已有 `link:` 开发安装时不要用 npm 命令覆盖，开发说明见仓库。

### 02 · 按习惯显示

| 模式     | 常驻形态                   | 操作           |
| -------- | -------------------------- | -------------- |
| 自动展开 | 活跃时进度卡，空闲时收成球 | 展开或收起     |
| 始终紧凑 | 一行状态胶囊               | 打开完整工作区 |
| 仅能量球 | 76px 状态球                | 打开完整工作区 |

点击球打开工作区；`Esc` 关闭。拖动可调整球的位置，悬停查看状态，点击面板的固定按钮可保持展开。设置还提供帧率、粒子、轨道、光效和减少动态效果等选项。

### 03 · 读懂状态

蓝色表示空闲或启动，紫色表示思考或回复，青蓝表示执行工具，琥珀表示等待确认或中断，绿色表示完成，红色表示错误。静默状态显示真实时长，不等于已经卡死。

![Caelum Orbis 不同任务状态下的十一种状态球外观](orb-states-v2.webp)

### 数据与运行边界

插件只读观察，不执行工具、不修改会话、不写数据库，也不新增模型调用。仓库的隐私说明列明事件字段与脱敏规则；不把这些说明扩展成对所有部署方式的安全保证。

仅支持本机访问；请求头过滤不是身份认证。不要直接把 DSH 暴露到局域网并把该过滤视为访问控制。更多说明见 [仓库安全与环境说明](https://github.com/mycherish/dsh-orbis#readme)。

### 卸载

```sh
dsh plugin --profile desktop remove dsh-orbis
```

Web 用户改用实际 profile。浏览器可能保留面板位置、折叠状态等 `orbis.*` 本地偏好；卸载不等于清空所有浏览器数据。
