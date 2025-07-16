---
title: "Wsl 快速搭建开发环境-迁移新电脑-迁移非系统盘"
date: 2025-07-15T18:30:54+08:00
draft: false
tags: ["Windows", "WSL"]
categories: ["开发", "环境配置"]
---


<!--more-->

> 首选保证有一台电脑已经配置好 wsl 环境

## 从旧电脑导出

1. **查看当前 WSL 分发版的名称和版本**
    
    ```powershell
    wsl -l -v
    ```
    
2. **导出现有的 WSL 分发版**
    
    ```powershell
    # 创建目录
    New-Item -Path "D:\WSL" -ItemType Directory
    # wsl --export <分发版名称> <导出路径>
    wsl --export Ubuntu-22.04 D:\WSL\Ubuntu-22.04.tar
    ```

## 新电脑导入，或者导入到非系统盘
    
1. **卸载现有的 WSL 分发版**（可选，如果只是导入到非系统盘的话需要卸载）
    
    在迁移之前，建议先卸载现有的分发版以避免冲突。运行以下命令：
    
    ```powershell
    # wsl --unregister <分发版名称>
    wsl --unregister Ubuntu-22.04
    ```
    
2. **重新导入 WSL 分发版到新位置**
    
    ```powershell
    # wsl --import <分发版名称> <安装目录> <存档文件路径> [--version <版本号>]
    wsl --import Ubuntu-22.04 D:\WSL\Ubuntu-22.04 D:\WSL\Ubuntu-22.04.tar --version 2
    ```
    
3. **设置默认启动的 WSL 分发版（可选）**
    
    如果需要更改默认启动的分发版，可以运行以下命令：
    
    ```powershell
    wsl --set-default <分发版名称>
    ```
    
    例如，设置 Ubuntu 为默认分发版：
    
    ```powershell
    wsl --set-default Ubuntu-22.04
    ```
    
4. **配置 WSL 的高级设置（可选）**
    
    对于 WSL 2，可以通过创建 **`.wslconfig`** 文件进一步自定义存储位置和其他设置。该文件需存储在 **`%UserProfile%`** 目录下（如 C:\Users<用户名>.wslconfig）。示例内容如下：
    
    ```powershell
    [wsl2]
    memory=4GB       # 内存限制
    processors=2     # CPU 核心数限制
    swap=1GB          # 交换分区大小
    localhostForwarding=true  # 允许本地主机转发
    ```
    
5. **验证更改**
    
    ```powershell
    wsl -l -v
    ```
    

## 修改默认登录用户

迁移后的系统默认使用 root 用户登录的，需要修改默认登录用户

1. 查看当前登录用户
    
    ```bash
    whoami
    ```
    
2. 临时修改
    登录时指定
    
    ```powershell
    wsl --user uroot --distribution Ubuntu-22.04
    ```
    
3. 永久：**修改 WSL 分发版的配置文件**
    
    ```powershell
    # 启动 WSL 并以 root 登录 
    wsl -u root
    # 编辑配置文件
    vim /etc/wsl.conf
    ```
    
    **添加以下内容** （替换 **`username`** 为实际用户名）：
    
    ```powershell
    [user]
    default=username
    ```
    
4. **重启 WSL**
    
    先退出 wsl，重新启动
    
    ```powershell
    wsl --shutdown
    
    wsl
    ```


