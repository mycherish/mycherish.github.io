---
title: "Windows Install Pillow"
date: 2024-06-14T15:12:21+08:00
draft: false
---


运行
```bash
pip install pillow 
```
报错
>Could not find a version that satisfies the requirement pillow (from versions: )
No matching distribution found for pillow

![image.png](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/202406141608902.png)

这个时候就需要我们手动去下载第三方库然后安装。
首先，点击：[https://www.lfd.uci.edu/~gohlke/pythonlibs/](https://www.lfd.uci.edu/~gohlke/pythonlibs/)
找到 Pillow，单击即可下载

![image.png](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/202406141609253.png)

然后，使用命令安装
```
pip install path\文件名  
```
![image.png](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/202406141610024.png)

如果安装了`git`可以使用
```
pip install path/文件名 
```

![image.png](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/202406141610201.png)

安装成功。

