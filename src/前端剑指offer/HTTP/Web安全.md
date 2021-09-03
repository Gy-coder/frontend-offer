# Web安全

## 常见的攻击

1. 跨站脚本XSS
2. SQL 注入
3. DOS 攻击
4. 跨站伪造 CSRF
5. 钓鱼网站

## DOS 攻击

Denial of Service attack。攻击者发送大量的请求，或模拟大量的用户访问，占用服务器资源，使真正有需求的用户访问。

## SQL注入

攻击者可以恶意将sql语句插入到输入字段以执行
比如有这样一个功能：网站前端有一个查询输入框，输入用户输入的姓名查询并展示拥有该姓名的所有用户。当后端接收到查询参数后，做sql语句的拼接，然后执行sql，返回查询结果。

```js
let userName = req.body.userName
let sql = "SELECT * FROM users WHERE name = '" + userName + "';"
exec(sql)
```

但是用户输入这些之后

```sql
a';DROP TABLE users; SELECT * FROM userinfo WHERE 't' = 't
```

最终相当于执行

```sql
let sql = "SELECT * FROM users WHERE name = 'a';DROP TABLE users; SELECT * FROM userinfo WHERE 't' = 't';"
```

一次查询就能删库。当然也能做其他任何数据库操作。

应对措施
* 方法1：使用ORM库，调用API，而不是直接运行SQL语句
* 方法2：在运行SQL语句前对拼接的查询字段进行转义
* 方法3：对数据库操作权限也做适当配置，比如不允许删库，能减小损失


### XSS攻击

由于网站漏洞，使得攻击者可以在网站输入恶意代码，并让恶意代码在其他用户浏览器中运行，窃取用户信息。

**防范措施:**

1. 对富文本编辑器，过滤script等不安全标签(比如语雀等博客编辑器，且支持HTML)

2. 对用户的输入进行转义，比如```<script></script>```转译为```&lt;script&/script&gt;```

3. 代码尽量使用innerText取代innerHTML，使用v-text取代v-html，尽量少做HTML字符串拼接，禁用eval执行js

4. 服务端set Cookie时，带上HttpOnly字段，阻止js获取Cookie

5. 对于上传图片的场景，禁止用户填写图片地址，特别是MarkDown编辑器


## CSRF

跨站点请求伪造， 

## 解决方法: 

1. Samesite Cookie

    ```js
    Set-Cookie: sid=1; Samesite=Strict
    ```
    Samesite Cookie的字段含义:

    * Samesite=Strict。严格模式。假设b.com种下的Cookie设置Strict，当在a.com请求b.com的接口时不会带上Cookie，从a.com 打开一个b.com的链接，这个请求也不会带上cookie。
    * Samesite=Lax。宽松模式，新版Chrome的默认模式。假设b.com种下的Cookie设置Lax，当在a.com请求b.com的接口时不会带上Cookie，但从a.com 打开一个b.com的链接，这个请求会带上cookie。
    * Samesite=None。假设b.com种下的Cookie设置None，当在a.com请求b.com的接口时会带上Cookie，从a.com 打开一个b.com的链接，这个请求也会带上cookie。


2. CSRF Token   

    用户访问并登录b.com 时，服务器会写入Cookie，同时会在返回的HTML上埋点```<input type="hiden">```

    ```HTML
    <form>
        <input type="hiden" csrftoken="afe3f94jjfwr" >
    <input type="text" name="username" value="">
    <input type="password" name="password" value="">
    </form>
    ```

    当用户提交表单或者发送Ajax请求时，在请求参数或者请求头带上之前埋入的csrftoken。请求到服务器后服务端会做验证，识别通过后才响应请求。

    因为这个token是埋在b.com里，攻击者从第三方网站伪造请求时得不到这个token，所以请求会失败。

    这种方式的优点是安全，缺点是服务端同时也要存储和维护token，比较麻烦。

3. 无需存储的CSRF Token

    用户访问并登录b.com 时，服务器会写入用于登录的Cookie。同时服务端会做两件事
    在返回的HTML上埋点```<input type="hiden">```
    在Cookie里写入该csrftoken值



    当用户提交表单或者发送Ajax请求时，在请求参数或者请求头带上之前埋入的csrftoken。请求到服务器后服务端会从用户的请求参数里拿出token和请求自带的cookie里的token做比对，如果都存在且一致，则请求通过。

    因为这个token是埋在b.com里，攻击者从第三方网站伪造请求时得不到这个token，所以无法在请求参数里带上该token，请求会失败。