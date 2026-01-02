---
title: "WSL安装zsh"
date: 2023-04-24T16:59:46+08:00
draft: false
tags: ["Windows", "WSL", "Zsh"]
categories: ["工具"]
---


> 两行命令来安装 zsh 和 oh-my-zsh

<!--more-->

# 安装

```bash
sudo apt install zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

## 更换主题

只要编辑`~/.zshrc`文件，找到`ZSH_THEME`一行，值改为你喜欢的主题即可。

```bash
vim ~/.zshrc
```

![image-20211105115421799](https://mycherish.github.io/images/image-20211105115421799.png)

好了，打开一个新的终端或者重启此终端就可以看到效果了

![image-20211105115557298](https://mycherish.github.io/images/image-20211105115557298.png)

其他主题可以查看github：https://github.com/ohmyzsh/ohmyzsh/wiki/Themes

## 安装插件

这里只推荐两个最有用的插件，`语法高亮(zsh-syntax-highlighting)`和`自动补全(zsh-autosuggestions)`

### 1. 语法高亮

下载

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

加上插件，编辑 ~/.zshrc

```bash
vim  ~/.zshrc
```

![image-20211105120210060](https://mycherish.github.io/images/image-20211105120210060.png)

执行命令使插件生效

```bash
source ~/.zshrc
```

### 2. 自动补全

下载

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

加上插件，编辑 ~/.zshrc

```bash
vim  ~/.zshrc
```

![image-20211105120452887](https://mycherish.github.io/images/image-20211105120452887.png)

修改了`.zshrc`文件，都需要执行命令使之生效

```bash
source ~/.zshrc
```

