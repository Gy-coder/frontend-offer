# 手写 Ajax

## 一些状态

### XMLHttpRequest.readyState

**XMLHttpRequest.readyState 属性返回一个 XMLHttpRequest 代理当前所处的状态。**

| 值  |  状态   |                  含义                   |
| :-: | :-----: | :-------------------------------------: |
|  0  | unsent  |     创建代理，但并未调用 open 方法      |
|  1  | opened  |          open() 方法已经被调用          |
|  2  | sended  | send 方法被调用，可以获得头部和尾部状态 |
|  3  | loading | 下载中，responseText 中已经包含部分数据 |
|  4  |  done   |              下载操作完成               |

### XMLHttpRequest.status

**返回 HTTP 状态码**

### XMLHttpRequest.open()

**XMLHttpRequest.open 方法用于指定 HTTP 请求的参数，或者说初始化 XMLHttpRequest 实例对象。**

open 中的参数如下所示:

1. method: 表示 HTTP 动词方法，比如 GET、POST、PUT
2. url: 目标的地址
3. async: 可选参数，默认为 true，表示异步加载，一般不设为 false(由于同步 AJAX 请求会造成浏览器失去响应)

### XMLHttpRequest.send()

**XMLHttpRequest.send 方法用于实际发出 HTTP 请求。**

send 方法中的参数是可选的，如果不带参数，就表示 HTTP 请求只有一个 URL，没有数据体('GET'),如果带有参数，就表示除了头信息，还带有包含具体数据的信息体('POST')

## 代码

```js
const request = new XMLHttpServer();
request.open("GET", "/a/b/c?name=ff");
request.onreadystate = function () {
    if(request.readyState === 4 && request.status === 200) {
     console.log(request.responseText);
   }};};
request.send();
```
