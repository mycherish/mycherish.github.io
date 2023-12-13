---
title: "macOS 创建各个版本的 php 软链接到环境变量"
date: 2023-12-11T14:47:00+08:00
draft: true
tags: ["php", "软链接", "zsh", "bash"]
categories: ["环境配置"]
---

<!--more-->

> 本文主要介绍了如何在 macOS 上创建各个版本的 php 软链接到环境变量中， 并将其添加到 PATH 中。

## 先看效果
![image-20231213095606502](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/image-20231213095606502.png)


## 步骤

1. 查看现有的 PHP 软链接

    ```bash
    # intel 芯片
    cd /usr/local/opt
    # apple 芯片
    cd /opt/homebrew/opt
    
    ls -alh | grep php
    ```

    ![image-20220225173434276](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/image-20220225173434276.png)

2. 为了方便管理，我在宿主目录下新建了一个文件夹存放所有我配置的命令

    ```bash
    mkdir -p ~/program/bin # 创建存放命令的文件夹
    cd ~/program/bin # 进入到该文件夹
    ```

3. brew`安装的php命令所在的文件夹是`/usr/local/opt/php@7.3/bin

    其中`php@7.3`为对应版本的目录， 还有`php@5.6`, `php@7.4`两个目录，如果你安装了另外版本的php， 还有对应该版本的文件夹

    下面开始创建软链接，此时我们在 `~/program/bin`目录下

    ```bash
    ln -s /usr/local/opt/php@5.6/bin/php ./php56
    ln -s /usr/local/opt/php@7.3/bin/php ./php73
    ln -s /usr/local/opt/php@7.4/bin/php ./php74
    ```

4. 将该目录添加到环境变量

    如果你用的是`zsh`

    ```bash
    echo 'export PATH="/Users/用户名/program/bin:$PATH"' >> ~/.zshrc
    source ~/.zshrc
    ```

    如果你用的是`bash`

    ```bash
    echo 'export PATH="/Users/用户名/program/bin:$PATH"' >> ~/.bashrc
    source ~/.bashrc
	```

    注意把用户名替换成你自己的用户名

    此时可以使用`php56`, `php73`, `php74`来代指对应版本的php命令了

    ```bash
    php56 -v
    php73 -v
    php74 -v
    ```

## 其他命令

```bash
# 删除软链接
rm -rf [目标文件]

# 修改软链接
ln -snf [源文件或目录] [目标文件或目录]
# 如：
ln -snf /opt/homebrew/opt/php@8.2/bin/php ./php82
```