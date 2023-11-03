---
title: "M1 Mac Docker Compose Dnmp 开发环境配置"
date: 2023-11-02T17:13:12+08:00
draft: false
---

<!--more-->


## 目录结构

```bash
.
├── compose.dockerfile
│   ├── docker-compose.yml
│   ├── mysql8.0.34
│   │   └── Dockerfile
│   ├── nginx
│   │   └── Dockerfile
│   ├── php7.3
│   │   └── Dockerfile
│   ├── php8.1
│   │   └── Dockerfile
│   └── redis
│       └── Dockerfile
├── data
├── etc
├── log
```



## Docker 安装

官方安装教程：https://docs.docker.com/desktop/install/mac-install/

> 我用的手动安装

1. 使用 Homebrew 安装

   https://yeasy.gitbook.io/docker_practice/install/mac

   ```bash
   brew install --cask docker
   ```

   或者

   https://www.runoob.com/docker/macos-docker-install.html

   ```bash
   $ brew install --cask --appdir=/Applications docker
   
   ==> Creating Caskroom at /usr/local/Caskroom
   ==> We'll set permissions properly so we won't need sudo in the future
   Password:          # 输入 macOS 密码
   ==> Satisfying dependencies
   ==> Downloading https://download.docker.com/mac/stable/21090/Docker.dmg
   ######################################################################## 100.0%
   ==> Verifying checksum for Cask docker
   ==> Installing Cask docker
   ==> Moving App 'Docker.app' to '/Applications/Docker.app'.
   &#x1f37a;  docker was successfully installed!
   ```

2. 手动下载安装

   点击以下链接下载 [Install Docker Desktop on Mac](https://docs.docker.com/docker-for-mac/install/)

   ![image-20230509101309211](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/image-20230509101309211.png)

   选择适合自己的下载

   安装完成打开 Docker Desktop，完成基本设置和入门教程（可以跳过）。

   在终端可以使用以下命令检查安装的 Docker 的版本

   ```bash
   ╰─ docker -v
   Docker version 23.0.5, build bc4487a
   ```


## 镜像加速

>  Docker 镜像加速:https://www.runoob.com/docker/docker-mirror-acceleration.html

- 阿里云：**https://<你的ID>.mirror.aliyuncs.com**
- 科大镜像：**https://docker.mirrors.ustc.edu.cn/**
- 网易：**https://hub-mirror.c.163.com/**
- 七牛云加速器：**https://reg-mirror.qiniu.com**
- 百度：https://mirror.baidubce.com

1. 阿里云镜像获取地址：https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors，登陆后，左侧菜单点击“镜像工具”中“镜像加速器”就可以看到你的专属地址了。

2. 配置镜像（阿里云镜像加速器页面下边也会有说明）

   建议多添加几个国内的镜像，如果有不能使用的，会切换到可以使用个的镜像来拉取。

   > 在任务栏点击 Docker Desktop 应用图标 -> Perferences，在左侧导航菜单选择 Docker Engine，在右侧输入栏编辑 json 文件。
   >
   > 将上个步骤中的加速地址(https://<你的ID>.mirror.aliyuncs.com)，加到`registry-mirrors`的数组里，没有的话添加一个 key；
   >
   > 点击 Apply & Restart 按钮，等待 Docker 重启并应用配置的镜像加速器。

   ```json
   {
     "builder": {
       "gc": {
         "defaultKeepStorage": "20GB",
         "enabled": true
       }
     },
     "experimental": false,
     "features": {
       "buildkit": true
     },
     "registry-mirrors": [
       "https://<你的ID>.mirror.aliyuncs.com",
       "https://hub-mirror.c.163.com",
       "https://mirror.baidubce.com"
     ]
   }
   ```

3. 检查加速器是否生效

   在命令行执行

   ```bash
   docker info
   ```

   如果从结果中看到了如下内容，说明配置成功。

   > Registry Mirrors:
   > https://hub-mirror.c.163.com/
   > https://mirror.baidubce.com/



## 安装 Nginx

> 参考：https://learnku.com/articles/31344
>
> 官方文档：<a id='https://hub.docker.com/_/nginx'>https://hub.docker.com/_/nginx</a>

1. 关闭本地 nginx（如果开启了的话，且恰好占用 80 端口）

    ```bash
    sudo nginx -s stop
    ```

2. 直接执行一下命令默认拉取最新的镜像

    ```bash
    docker pull nginx
    ```

3. 根据[官方文档](https://hub.docker.com/_/nginx)中 Complex configuration 部分

    后台启动一个名为 tmp-nginx 的容器

    ```bash
    docker run --name tmp-nginx -d nginx
    ```

    将 nginx 整个配置目录 copy 到本地一份，`/Users/username/dockerServer/etc/`根据自己的实际目录换成自己的，没有的话需要手动创建

    ```bash
    docker cp tmp-nginx:/etc/nginx ~/dockerServer/etc/nginx
    ```

    删除刚刚新建的容器

    ```bash
    docker rm -f tmp-nginx
    ```

    运行一个 html 文件，查看效果

    首先准备一个 html 文件：`~/dockerServer/www/hello.html`，然后执行命令

    ```bash
    docker run --name run-nginx -p 80:80 \
    -v ~/dockerServer/www:/usr/share/nginx/html:ro \
    -d nginx
    ```
    
    > 命令说明：
    >
    > 后台启动一个名为 run-nginx 的容器，将容器的 80 端口映射到主机的 80 端口`主机(宿主)端口:容器端口`，绑定本地的一个目录(www)到 nginx 容器中的 web 目录（html）
    >
    > 容器中的 web 目录可以到 `~/dockerServer/etc/nginx/conf.d/default.conf` 中查看
    >
    > 
    >
    > ![image-20230510113527076](https://cdn.jsdelivr.net/gh/mycherish/imgCloud/img/image-20230510113527076.png)

    浏览器访问 http://localhost/hello.html 看看效果
    
    删除容器，后面我们改完配置再来启动它。
    
    ```bash
    docker rm -f run-nginx
    ```



## 安装 php:7.3-fpm

地址：https://hub.docker.com/_/php

Dockerfile 一直没成功，故直接`pull`，扩展之后再说

```bash
docker pull php:7.3-fpm
```

copy 出 nginx 配置一份，将 php 的相关配置也 copy 到本地。

```bash
docker run --name tmp-php-fpm -d php:7.3-fpm
mkdir -p ~/dockerServer/etc/php7.3

docker cp tmp-php-fpm:/usr/local/etc/php/php.ini-development ~/dockerServer/etc/php7.3
docker cp tmp-php-fpm:/usr/local/etc/php-fpm.d/www.conf ~/dockerServer/etc/php7.3
docker cp tmp-php-fpm:/usr/local/etc/php/conf.d/ ~/dockerServer/etc/php7.3

docker rm -f tmp-php-fpm
```



## 修改 nginx、php 配置文件

1. 修改 nginx 配置

   复制一份 default.conf

   ```bash
   cd ~/dockerServer/etc/nginx/conf.d
   cp default.conf phpinfo.conf
   ```

   在新文件中加入以下内容

   ```bash
   location ~ \.php$ {
      fastcgi_pass   php-fpm-container:9000;
      fastcgi_index  index.php;
      fastcgi_param  SCRIPT_FILENAME  /var/www/html$fastcgi_script_name;
      fastcgi_param  SCRIPT_NAME      $fastcgi_script_name;
      include        fastcgi_params;
   }
   ```

   > `php-fpm-container`这个是咱们自己创建的 php-fpm 容器的别名，具体是在启动 nginx 的时候指定的，后边会提到

2. 修改 php 相关配置

   进入 `~/dockerServer/etc/php7.3` 下，将 php.ini-development 复制改名为 php.ini，配置内容根据自己情况修改即可。

   ```bash
   cd ~/dockerServer/etc/php7.3
   ```
   
   ```bash
   cp php.ini-development php.ini
   ```



## 启动 php、nginx 容器

### docker run 启动

1. 启动 php-fpm

    ```bash
    docker run --name run-my-php-fpm \
    -p 9000:9000 \
    -v ~/dockerServer/www:/var/www/html \
    -v ~/dockerServer/etc/php7.3/php.ini:/usr/local/etc/php/php.ini \
    -v ~/dockerServer/etc/php7.3/www.conf:/usr/local/etc/php-fpm.d/www.conf \
    -v ~/dockerServer/etc/php7.3/conf.d:/usr/local/etc/php/conf.d \
    -v ~/dockerServer/log/php7.3:/var/log/php \
    -d php:7.3-fpm
    ```
    
    > ~/dockerServer/log/php 文件如果不存在需要手动创建
    
2. 启动 nginx

    ```bash
    docker run --name run-nginx \
    -p 80:80 \
    --link run-my-php-fpm:php-fpm-container \
    -v ~/dockerServer/www:/usr/share/nginx/html \
    -v ~/dockerServer/etc/nginx/conf.d:/etc/nginx/conf.d \
    -v ~/dockerServer/etc/nginx/nginx.conf:/etc/nginx/nginx.conf \
    -v ~/dockerServer/log/nginx:/var/log/nginx \
    -d nginx
    ```
    
    > ~/dockerServer/log/nginx 文件如果不存在需要手动创建
    
    说明：
    
    - 将配置目录、日志目录和 web 目录都分别进行了绑定，方便在本地环境中修改。
    - 还记得上面提到的 nginx 中有个配置填写的 `php-fpm-container` 吗？实际上就是在这里指定的，连接两个容器，并给 php-fpm 容器起了个别名，配置中通过别名访问。



### PHP7.3 Dockerfile 

创建 Dockerfile 文件

```bash
cd ~/dockerServer/compose.dockerfile
mkdir php7.3 && cd php7.3
vim Dockerfile
```

1. 使用脚本

   > 原始方法安装 imagick 扩展一直不成功

   GitHub地址：https://github.com/mlocati/docker-php-extension-installer
   
   Dockerfile 内容
   
   ```dockerfile
   FROM php:7.3-fpm
   
   LABEL xuweidong="determined_xw@126.com"
   
   ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
   
   RUN chmod +x /usr/local/bin/install-php-extensions && \
       install-php-extensions gd xdebug redis mcrypt memcached swoole
   RUN chmod uga+x /usr/local/bin/install-php-extensions && sync && \
       install-php-extensions imagick
   RUN docker-php-ext-configure opcache --enable-opcache && docker-php-ext-install opcache
   
   RUN docker-php-ext-install -j$(nproc) bcmath calendar exif gettext sockets dba pcntl shmop sysvmsg sysvsem sysvshm
   RUN docker-php-ext-install -j$(nproc) mysqli pdo pdo_mysql
   
   
   # 容器启动时执行指令
   CMD ["php-fpm"]
   ```
   
   创建镜像
   
   ```bash
   docker build -t my-php-fpm:myphp.7.3 .
   ```
   
   启动容器
   
   ```bash
   docker run --name tmp-my-php-fpm -d my-php-fpm:myphp.7.3
   ```
   
   进入容器
   
   ```bash
   docker exec -it tmp-my-php-fpm bash
   ```
   
   镜像创建完成之后，可以像上面我们拷贝出 nginx 配置一样，将 php 的相关配置也拷贝到本地。
   
   ```bash
   docker cp tmp-my-php-fpm:/usr/local/etc/php/php.ini-development ~/dockerServer/etc/php7.3
   docker cp tmp-my-php-fpm:/usr/local/etc/php-fpm.d/www.conf ~/dockerServer/etc/php7.3
   docker cp tmp-my-php-fpm:/usr/local/etc/php/conf.d/ ~/dockerServer/etc/php7.3
   # 删除容器
   docker rm -f tmp-my-php-fpm
   ```
   
   PHP配置文件
   
   ```bash
   cd ~/dockerServer/etc/php7.3/
   cp php.ini-development php.ini
   ```
   
   修改 xdebug 的配置文件，加入一下内容
   
   ```bash
   vim ~/dockerServer/etc/php7.3/conf.d/docker-php-ext-xdebug.ini
   ```
   
   添加
   
   ```bash
   
   xdebug.mode=debug
   xdebug.remote_handler = dbgp
   xdebug.client_host = host.docker.internal 
   xdebug.client_port = 9001
   xdebug.log = /var/log/php/xdebug.log
   xdebug.idekey = PHPSTOR
   ```
   
   > 以上设置主要是开启 xdebug 的远程调试模式，因为 php-fpm 使用了 9000 端口，所以这里我们把 xdebug 的端口改为了 9001；`host.docker.internal` 是 docker 18.03 新加入的，可以解析获得宿主机的 ip 地址，这样就不用写死 ip 地址了。
   
   启动 php-fpm 容器
   
   ```bash
   docker run --privileged --name run-my-php-fpm \
   -p 9000:9000 \
   -v ~/dockerServer/www:/var/www/html \
   -v ~/dockerServer/etc/php7.3/php.ini:/usr/local/etc/php/php.ini \
   -v ~/dockerServer/etc/php7.3/www.conf:/usr/local/etc/php-fpm.d/www.conf \
   -v ~/dockerServer/etc/php7.3/conf.d:/usr/local/etc/php/conf.d \
   -v ~/dockerServer/log/php7.3:/var/log/php \
   -d my-php-fpm:myphp.7.3
   ```
   
   启动 nginx 容器
   
   ```bash
   docker run --name run-nginx \
   -p 80:80 \
   --link run-my-php-fpm:php-fpm-container \
   -v ~/dockerServer/www:/usr/share/nginx/html \
   -v ~/dockerServer/etc/nginx:/etc/nginx \
   -v ~/dockerServer/log/nginx:/var/log/nginx \
   -d nginx
   ```
   
   复制一个 Nginx 配置文件
   
   ```bash
   cd ~/dockerServer/etc/nginx/conf.d
   cp default.conf phpinfo.conf
   vim phpinfo.conf
   ```
   
   参考以下内容修改
   
   ```json
   server {
       listen       80;
       server_name  localhost;
   
       location / {
           root   /usr/share/nginx/html;
           index  index.php index.html index.htm;
       }
   
       error_page   500 502 503 504  /50x.html;
       location = /50x.html {
           root   /usr/share/nginx/html;
       }
       location ~ \.php$ {
           root           /var/www/html;
           fastcgi_pass   php-fpm-container:9000;
           fastcgi_index  index.php;
           fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;
           include        fastcgi_params;
       }
   }
   ```
   
   修改完配置文件，重启nginx容器
   
   ```bash
   docker restart run-nginx
   ```
   
   在 `~/dockerServer/www` 中创建一个 phpinfo.php 文件，输出 php 信息，通过 http://localhost/phpinfo.php 访问来查看。
   
   
   
   项目配置 nginx 参考
   
   ```json
   server {
       listen       80;
       server_name  dev-www.sx1211.com;
   
       root    /usr/share/nginx/html/laravel10/public;
       index   index.php index.html index.htm;
       location / {
           if (!-e $request_filename) {
               rewrite ^/index.php(.*)$ /index.php?s=$1 last;
               rewrite ^(.*)$ /index.php?s=$1 last;
               break;
           }
       }
   
       error_page   500 502 503 504  /50x.html;
       location = /50x.html {
           root   /usr/share/nginx/html;
       }
   
       location ~ \.php$ {
           root           /var/www/html/laravel10/public;
           fastcgi_split_path_info  ^(.+\.php)(.*)$;
           fastcgi_param  PATH_INFO   $fastcgi_path_info;
           fastcgi_pass   php-fpm-container:9000;
           fastcgi_index  index.php;
           fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;
           include        fastcgi_params;
       }
   }
   ```
   

### Nginx Dockerfile

```bash
cd ~/dockerServer/compose.dockerfile
mkdir ningx && cd nginx
vim Dockerfile
```

Dockerfile 内容

```dockerfile
FROM nginx:1.25.1
# 维护者信息
LABEL xuweidong="determined_xw@126.com"
# 时区
ENV TZ Asia/Shanghai
RUN date -R


# 容器启动时执行指令
CMD ["nginx", "-g", "daemon off;"]
```

构建镜像

```bash
docker build -t my-nginx:mynginx.1.25.1 .
```

启动容器

```bash
docker run --name run-my-nginx \
-p 80:80 \
--link run-my-php-fpm:php-fpm-container \
-v ~/dockerServer/www:/usr/share/nginx/html \
-v ~/dockerServer/etc/nginx:/etc/nginx \
-v ~/dockerServer/log/nginx:/var/log/nginx \
-d my-nginx:mynginx.1.25.1
```



## 安装 Redis

### Dockerfile

> 参考：https://www.cnblogs.com/kendoziyu/p/15814418.html

```bash
cd ~/dockerServer/compose.dockerfile
mkdir redis && cd redis
vim Dockerfile
```

Dockerfile 内容

```dockerfile
FROM redis:7.0.5
# 维护者信息
LABEL xuweidong="determined_xw@126.com"
# 时区
ENV TZ Asia/Shanghai
RUN date -R
# 容器启动时执行指令
CMD ["redis-server"]
```

### 配置

下载：https://github.com/redis/redis/blob/7.0.5/redis.conf

```bash
mkdir -p ~/dockerServer/etc/redis/
cd ~/dockerServer/etc/redis
mv ~/Downloads/redis.conf redis.conf

mkdir ~/dockerServer/data/redis
```

修改配置

```bash
vim redis.conf
```

注释`bind 127.0.0.1 -::1` ，解绑 local ip

```bash
# bind 127.0.0.1 -::1
```

或者

```json
bind 0.0.0.0
```

确保 daemonize，为no(默认) ,否则通过`docker -d`方式不能启动 redis， (非 docker 方式,需要改为`yes`实现后台启动)

```bash
daemonize no
```

外网访问

```bash
#protected-mode yes
protected-mode no
```

设定密码

```bash
#requirepass foobared
requirepass welcome1
```

使用 aof 持久化方式

```bash
#appendonly no
appendonly yes
```

创建镜像

```bash
docker build -t my-redis:redis.7.0.5 .
```

创建启动容器，由于本地 redis 占用 6379 端口，故映射 6380

```bash
docker run --name redis01 \
-p 6380:6379 \
--restart=always \
-v ~/dockerServer/etc/redis/redis.conf:/etc/redis.conf \
-v ~/dockerServer/data/redis:/data \
-v ~/dockerServer/log/redis:/var/log \
-itd my-redis:redis.7.0.5 \
redis-server /etc/redis.conf
```

> 注意：项目不能使用 IP + 端口号 的方式链接 redis
>
> 解决：
>
> ```bash
> vim .env
> ```
>
> 删除`REDIS_PORT`，把`REDIS_HOST`的值改为`redis`
>
> ```bash
> REDIS_HOST=redis
> # REDIS_PORT=6380
> ```
>
> 参考：https://stackoverflow.com/questions/42360356/docker-redis-connection-refused/42361204

写个 PHP 脚本测试

```php
<?php
// 连接到本地Redis服务器，默认端口是6379
$redis_host = '127.0.0.1';
$redis_port = 6380;

// 创建Redis客户端
$redis = new Redis();
$redis->connect($redis_host, $redis_port);

// 设置键值对
$redis->set('name', 'John');
$redis->set('age', 30);

// 获取键对应的值
$name = $redis->get('name');
$age = $redis->get('age');

echo "Name: $name, Age: $age\n";

// 使用哈希表（Hash）存储一些数据
$user_id = 1;
$user_data = array(
    'name' => 'Alice',
    'age' => 25,
    'email' => 'alice@example.com'
);
$redis->hmset("user:$user_id", $user_data);

// 获取哈希表中的字段值
$user_info = $redis->hgetall("user:$user_id");
print_r("User Info: ");
print_r($user_info);
?>
```

成功

>╰─ php test.php
>Name: John, Age: 30
>User Info: Array
>(
>    [name] => Alice
>    [age] => 25
>    [email] => alice@example.com
>)



## 安装 MySQL

### 配置

1. mysql:8.0.34

    ```bash
    # 拉取镜像
    docker pull mysql:8.0.34
    # 启动容器
    docker run -p 3306:3306 --name tmp-mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8.0.34
    # 复制配置文件
    mkdir -p  ~/dockerServer/etc/mysql8.0.34/
    docker cp tmp-mysql:/etc/my.cnf ~/dockerServer/etc/mysql8.0.34/
    # 删除容器
    docker rm -f tmp-mysql
    
    # 进入容器
    docker exec -it tmp-mysql bash
    # 进入mysql
    mysql -u root -p
    # 查看mysql版本
    select version();
    ```

    启动容器：挂载配置文件、日志、数据

    ```bash
    docker run -p 3306:3306 \
    --name run-mysql \
    -e MYSQL_ROOT_PASSWORD=123456 \
    -v ~/dockerServer/etc/mysql8.0.34/my.cnf:/etc/my.cnf \
    -v ~/dockerServer/log/mysql8.0.34:/var/log \
    -v ~/dockerServer/data/mysql8.0.34:/var/lib/mysql \
    -v ~/dockerServer/data/mysql-files8.0.34:/var/lib/mysql-files \
    -d mysql:8.0.34
    ```

2. mysql:5.7.41

    ```bash
    docker pull mysql:5.7.43
    ```

    但是，由于 m1 直接从 dockerhub 拉取镜像报错，查了相关文章说，docker 官方仓库没有适配 M1 的镜像

    > no matching manifest for linux/arm64/v8 in the manifest list entries

    **解决方式：**

    在 dockerhub 搜索 `mysql/mysql-server` https://hub.docker.com/r/mysql/mysql-server/tags?page=1&name=5.7

    > 但是，docker-compose 方式启动，可以进入容器，但是无法连接，Dockerfile 可以连接

    ```bash
    # 拉取镜像
    docker pull mysql/mysql-server:5.7.41
    # 启动容器
    docker run -p 3307:3306 --name tmp-mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql/mysql-server:5.7.41
    # 复制配置文件
    mkdir -p  ~/dockerServer/etc/mysql5.7.41/
    docker cp tmp-mysql:/etc/my.cnf ~/dockerServer/etc/mysql5.7.41/
    
    # 进入容器
    docker exec -it tmp-mysql bash
    # 进入mysql
    mysql -u root -p
    # 查看mysql版本
    select version();
    
    # 删除容器
    docker rm -f tmp-mysql
    ```



### Dockerfile

1. mysql:8.0.34

    ```bash
    cd ~/dockerServer/compose.dockerfile
    mkdir mysql8.0.34 && cd mysql8.0.34
    vim Dockerfile
    ```

    Dockerfile 文件内容

    ```dockerfile
    FROM mysql:8.0.34
    
    # 维护者信息
    LABEL xuweidong="determined_xw@126.com"  
    
    # 时区
    ENV TZ Asia/Shanghai
    RUN date -R
    
    # 容器启动时执行指令
    CMD ["mysqld"]
    ```

    构建镜像

    ```bash
    docker build -t my-mysql:mysql-8.0.34 .
    ```

    启动容器

    ```bash
    docker run -p 3306:3306 \
    --name run-mysql \
    -e MYSQL_ROOT_PASSWORD=123456 \
    -v ~/dockerServer/etc/mysql8.0.34/my.cnf:/etc/my.cnf \
    -v ~/dockerServer/log/mysql8.0.34:/var/log \
    -v ~/dockerServer/data/mysql8.0.34:/var/lib/mysql \
    -v ~/dockerServer/data/mysql-files8.0.34:/var/lib/mysql-files \
    -d my-mysql:mysql-8.0.34
    ```

2. mysql/mysql-server:5.7.41

    ```bash
    cd ~/dockerServer/compose.dockerfile
    mkdir mysql5.7.41 && cd mysql5.7.41
    vim Dockerfile
    ```

    Dockerfile 文件内容

    ```dockerfile
    FROM mysql/mysql-server:5.7.41
    
    # 维护者信息
    LABEL xuweidong="determined_xw@126.com"  
    
    # 时区
    ENV TZ Asia/Shanghai
    RUN date -R
    
    # 容器启动时执行指令
    CMD ["mysqld"]
    ```

    构建镜像

    ```bash
    docker build -t my-mysql:mysql-5.7.41 .
    ```

    启动容器

    ```bash
    docker run -p 3307:3306 \
    --name run-mysql \
    -e MYSQL_ROOT_PASSWORD=123456 \
    -v ~/dockerServer/etc/mysql5.7.41/my.cnf:/etc/my.cnf \
    -v ~/dockerServer/log/mysql5.7.41:/var/log \
    -v ~/dockerServer/data/mysql5.7.41:/var/lib/mysql \
    -v ~/dockerServer/data/mysql-files5.7.41:/var/lib/mysql-files \
    -d my-mysql:mysql-5.7.41
    ```



## 安装 PHP8.1

### 配置文件

```bash
docker pull php:8.1-fpm

docker run --name tmp-php-fpm -d php:8.1-fpm

# 拷贝配置文件到本地
mkdir -p ~/dockerServer/etc/php8.1
docker cp tmp-php-fpm:/usr/local/etc/php/php.ini-development ~/dockerServer/etc/php8.1
docker cp tmp-php-fpm:/usr/local/etc/php-fpm.d/www.conf ~/dockerServer/etc/php8.1
docker cp tmp-php-fpm:/usr/local/etc/php/conf.d/ ~/dockerServer/etc/php8.1
# 删除临时镜像
docker rm -f tmp-php-fpm

cd ~/dockerServer/etc/php8.1
cp php.ini-development php.ini
```

### Dockerfile

```bash
cd ~/dockerServer/compose.dockerfile
mkdir php8.1 && cd php8.1
vim Dockerfile
```

Dockerfile 文件内容

```dockerfile
FROM php:8.1-fpm

LABEL xuweidong="determined_xw@126.com"

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions gd xdebug redis mcrypt memcached swoole
RUN chmod uga+x /usr/local/bin/install-php-extensions && sync && \
    install-php-extensions imagick
RUN docker-php-ext-configure opcache --enable-opcache && docker-php-ext-install opcache

RUN docker-php-ext-install -j$(nproc) bcmath calendar exif gettext sockets dba pcntl shmop sysvmsg sysvsem sysvshm
RUN docker-php-ext-install -j$(nproc) mysqli pdo pdo_mysql


# 容器启动时执行指令
CMD ["php-fpm"]
```



## Docker Compose 

```bash
cd ~/dockerServer/compose.dockerfile
```

```bash
vim docker-compose.yml
```

docker-compose.yml 内容

```yaml
version: "3"

services:
  nginx:
    build: ./nginx
    ports:
      - "80:80"
    restart: always
    tty: true
    container_name: nginx
    volumes:
      - ~/dockerServer/www:/usr/share/nginx/html
      - ~/dockerServer/log/nginx:/var/log/nginx
      - ~/dockerServer/etc/nginx/conf.d:/etc/nginx/conf.d
      - ~/dockerServer/etc/nginx/nginx.conf:/etc/nginx/nginx.conf
    networks:
      - lnmp-networks
  
  mysql8.0.34:
    build: ./mysql8.0.34
    container_name: mysql8.0.34
    tty: true
    restart: always
    ports:
      - "3306:3306"
    volumes:
      - ~/dockerServer/data/mysql8.0.34:/var/lib/mysql
      - ~/dockerServer/data/mysql-files8.0.34:/var/lib/mysql-files
      - ~/dockerServer/etc/mysql8.0.34/my.cnf:/etc/my.cnf
      - ~/dockerServer/log/mysql8.0.34:/var/log
    environment:
      MYSQL_ROOT_PASSWORD: 123456
    networks:
      - lnmp-networks
      
  redis:
    build: ./redis
    container_name: redis
    tty: true
    restart: always
    ports:
      - "6380:6379"
    volumes:
      - ~/dockerServer/etc/redis/redis.conf:/etc/redis.conf
      - ~/dockerServer/data/redis:/data
      - ~/dockerServer/log/redis:/var/log
    networks:
      - lnmp-networks

  php7.3:
    build: ./php7.3
    tty: true
    restart: always
    container_name: php7.3
    ports:
      - "9000:9000"
    volumes:
      - ~/dockerServer/www:/var/www/html
      - ~/dockerServer/log/php7.3:/var/log/php
      - ~/dockerServer/etc/php7.3/php.ini:/usr/local/etc/php/php.ini
      - ~/dockerServer/etc/php7.3/www.conf:/usr/local/etc/php-fpm.d/www.conf
      - ~/dockerServer/etc/php7.3/conf.d:/usr/local/etc/php/conf.d
    depends_on:
      - nginx
    networks:
      - lnmp-networks
      
  php8.1:
    build: ./php8.1
    tty: true
    restart: always
    container_name: php8.1
    ports:
      - "9081:9000"
    volumes:
      - ~/dockerServer/www:/var/www/html
      - ~/dockerServer/log/php8.1:/var/log/php
      - ~/dockerServer/etc/php8.1/php.ini:/usr/local/etc/php/php.ini
      - ~/dockerServer/etc/php8.1/www.conf:/usr/local/etc/php-fpm.d/www.conf
      - ~/dockerServer/etc/php8.1/conf.d:/usr/local/etc/php/conf.d
    depends_on:
      - nginx
    networks:
      - lnmp-networks

networks:
  lnmp-networks:
```

启动

```bash
docker-compose up -d
```



## 使用 docker 命令执行容器的命令

> docker exec -it 容器名称 实际命令

```bash
docker exec -it redis redis-cli -v
docker exec -it php8.1 php -v
docker exec -it php8.1 php -m
# 重启 nginx
docker exec -it nginx nginx -s reload
```



## 项目中配置修改

> 设置自定义路径的都需要修改

admin .env 配置文件修改

```bash
;文件、日志目录
SCRIPT_FILE_PATH=/var/www/html/sx-code/www/script/
CURRENT_PATH=/var/www/html/sx-code/admin/
RUNTIME_PATH=/var/log/php/admin/new_trunk/php/runtimes/
```

teacher_center .env 配置文件修改

```bash
;课件
COURSEWARE_DOWNLOAD_PATH='/var/log/php/teacher_center/tmpfile/'
```



参考

- https://learnku.com/articles/31344#62c3b1
- https://learnku.com/articles/38186
