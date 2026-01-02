---
title: "解决 Laravel Migration Error: Syntax error or access violation: 1071 Specified key was too long; max key length is 767 bytes"
date: 2024-06-15T16:39:50+08:00
draft: false
tags: ["Laravel", "MySQL"]
categories: ["项目报错"]
---



## 报错信息

> Laravel Migration Error: Syntax error or access violation: 1071 Specified key was too long; max key length is 767 bytes

<!--more-->

## 方法一：

根据[官方 Laravel 7.x 文档](https://laravel.com/docs/7.x/migrations#creating-indexes)，你可以很容易地解决这个问题。

更新您的`/app/Providers/AppServiceProvider.php`以包含：

```php
use Illuminate\Support\Facades\Schema;
  
/**
 * Bootstrap any application services.
 *
 * @return void
 */
public function boot()
{
    Schema::defaultStringLength(191);
}
```

请谨慎使用此解决方案。

## **方法二：**

编辑`config`文件夹中的`database.php`

```php
'charset' => 'utf8mb4',
'collation' => 'utf8mb4_unicode_ci',
```

为

```php
'charset' => 'utf8',
'collation' => 'utf8_unicode_ci',
```

## **方法三：**

只需将默认数据库引擎设置为`InnoDB`

找到`/config/database.php`

```php
'mysql' => [
    ...,
    ...,
    'engine' => 'InnoDB',
 ]
```

然后运行

````bash
php artisan config:cache
````

清除并刷新配置缓存



> 参考：https://stackoverflow.com/questions/42244541/laravel-migration-error-syntax-error-or-access-violation-1071-specified-key-wa