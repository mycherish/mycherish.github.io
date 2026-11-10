---
title: "我的图床：Github、PicGo、jsDelivr、Typora、VSCode"
date: 2023-05-04T10:50:22+08:00
draft: false
categories: ["工具"]
tags: ["图床"]
---

<!--more-->

## 在 GitHub 新建图片仓库

必须是公开库，私有库不支持 **`jsDelivr`** cdn 加速

留意分支 `master`

## jsDelivr

对于使用存储在 GitHub 上面的静态文件，不只是图片，可使用 jsDelivr CDN 快速访问

```bash
https://cdn.jsdelivr.net/gh/用户名/仓库名/文件路径

# 获取最新资源
https://cdn.jsdelivr.net/gh/mycherish/imgCloud/notion-avatar.png
# 获取1.0版本的资源
https://cdn.jsdelivr.net/gh/mycherish/imgCloud@1.0/notion-avatar.png
```

## PicGo 安装

下载安装：[PicGo-Doc](https://picgo.github.io/PicGo-Doc/zh/guide/#%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85) 

brew 安装命令

```bash
brew install picgo --cask
```



下载安装包：[GitHub Release](https://github.com/Molunerfinn/PicGo/releases)

### 解决 Mac 安装软件的“已损坏，无法打开。 您应该将它移到废纸篓”问题

> [https://blog.csdn.net/outman_1921/article/details/114012537](https://blog.csdn.net/outman_1921/article/details/114012537)

 1. 打开任何来源
  
      打开终端或者 iTerm2 输入命令
      ```bash
      sudo spctl  --master-disable
      ```
      然后回车，继续输入密码（密码输入时是不可见的），然后回车，然后就会出现任何来源选项
      ![20230504105710](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/vscode/20230504105710.png)
  2. 如果发现还是显示“已损坏，无法打开。 您应该将它移到废纸篓”，不急，接下来用这种方法：
  
      在终端粘贴复制输入以下命令先不要回车，先进入应用程序目录把 PicGo 拖到终端或 iTerm2 里

      ```bash
      sudo xattr -r -d com.apple.quarantine 
      ```
  
      完整命令
  
      ```bash
      sudo xattr -r -d com.apple.quarantine  /Applications/PicGo.app
      ```
  
      回车就可以打开了。

## 申请 GitHub 令牌（token）

点击右上角头像，然后
Settings -> Developer settings->Personal access tokens → tokens classic → Generate new token → Generate new token(classic)  
![20230504105903](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/vscode/20230504105903.png)

把 repo 的勾打上即可。然后翻到页面最底部，点击 Generate token 的绿色按钮生成 token。
![20230504105949](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/20230529132051.png)

创建成功后，及时复制保存，因为之后将不会在出现

## 配置 PicGo

![20230504105949](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/vscode/20230504105949.png)
- 仓库名
  
    > 账户名/仓库名的格式填写
    > 
- 分支名
  
    > 填写创建仓库时候的分支，一般是master
    > 
- Token
  
    > 刚才在 GitHub 生成的Token
    > 
- 存储路径
  
    > 最后一定要加上 `/`
    > 
- 自定义域名
  
    > https://cdn.jsdelivr.net/gh/用户名/仓库名
    > 
    
    如
    > https://cdn.jsdelivr.net/gh/mycherish/imgCloud

## Typora 使用
简单设置一下即可
![20230504110338](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/vscode/20230504110338.png)

点击验证测试一下

使用方式：直接粘贴图片就可以自动变成 JsDelivr 的链接，应该不用设置什么

## Vs Code 使用

下载扩展（picGo）：[https://marketplace.visualstudio.com/items?itemName=Spades.vs-picgo](https://marketplace.visualstudio.com/items?itemName=Spades.vs-picgo)

配置如下
![20230504110502](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/vscode/20230504110502.png)
使用说明
![20230504110533](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/vscode/20230504110533.png)

- 从剪切板上传图片：cmd + opt + u
- 从资源管理器上传：cmd + opt + e
- 从输入框上传：cmd + opt + o

📃 参考：

- [https://juejin.cn/post/7031461637986975757](https://juejin.cn/post/7031461637986975757)

- [https://blog.csdn.net/A_zhiyuan/article/details/120042300](https://blog.csdn.net/A_zhiyuan/article/details/120042300)

- [https://zhuanlan.zhihu.com/p/346643522](https://zhuanlan.zhihu.com/p/346643522)