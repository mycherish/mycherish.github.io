---
title: "Laravel 网页出现 419 是什么意思？"
date: 2024-06-15T16:02:20+08:00
draft: true
---


因为网站是用 Laravel（一个 PHP 框架）开发的，有些网站因为配置问题在运行一段时间后 csrf token 会过期，Laravel 会因为没有 csrf token 就会自动帮网站做防范，所以就会出现“419 Page Expired”错误。

> 注释：
>
> Laravel 是一个由Taylor Otwell所创建，自由开源的 PHP Web 框架，旨在实现的Web软件的MVC架构，并作为CodeIgniter的替代方案。其源代码托管于GitHub，许可条款为MIT许可证。
>
> CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。 利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。
>
> Token是服务端生成的一串字符串，以作客户端进行请求的一个令牌，当第一次登录后，服务器生成一个Token便将此Token返回给客户端，以后客户端只需带上这个Token前来请求数据即可，无需再次带上用户名和密码。
> [Reference] https://answers.fuyeor.com/zh-hans/question/10703

如果你是网站管理员，可以关闭 csrf 验证。

## **方法一：**

打开文件：app\Http\Kernel.php，把这行注释掉：

```php
'App\Http\Middleware\VerifyCsrfToken'
```

## **方法二：**

打开文件：app\Http\Middleware\VerifyCsrfToken.php，修改为：

```php
<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier {

    /**
     * Handle an incoming request.
    *
    * @param \Illuminate\Http\Request $request
    * @param \Closure $next
    * @return mixed
    */
    public function handle($request, Closure $next)
    {
        // 使用CSRF
        //return parent::handle($request, $next);
        // 禁用CSRF
        return $next($request);
    }

}
```

参考：https://docs.fuyeor.com/answer/10703.html
