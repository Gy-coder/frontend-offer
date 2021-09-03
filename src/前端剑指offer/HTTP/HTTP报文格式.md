# HTTP 报文

## 报文的格式

请求/响应报文由以下内容组成：

- 请求行，例如：GET /logo.gif HTTP/1.1 或状态码行，例如：HTTP/1.1 200 OK，
- HTTP 头字段
- 空行
- 可选的 HTTP 报文主体数据

## 请求例子

```
----  请求行
POST /auth/login HTTP/1.1
---- 请求头
Host: blog-server.hunger-valley.com
Connection: keep-alive
Content-Length: 41
Accept: application/json, text/plain, */*
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imh1bmdlciIsImlkIjoxLCJpYXQiOjE2MTExMjc1MjMsImV4cCI6MTYxMTM4NjcyM30.U-CkNW7WU0zprsjI23eK-0TE5wS_gD-2ZTFW8wE31FU
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36
Content-Type: application/json;charset=UTF-8
Origin: https://jirengu-inc.github.io
Referer: https://jirengu-inc.github.io/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
---- 空行

---- 可选的Http报文主体数据
{"username":"hunger","password":"123456"}
```

## 响应例子

```
----  请求行
HTTP/1.1 200 OK
---- 请求头
Server: nginx/1.4.6 (Ubuntu)
Date: Wed, 20 Jan 2021 07:28:09 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 406
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, PUT, POST, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
ETag: W/"196-Ay8U/71Rt0EbDzvYIuK2YtXe7xE"
---- 空行

---- 可选的Http报文主体数据
{"status":"ok","msg":"登录成功","data":{"id":1,"username":"hunger","avatar":"https://avatars.dicebear.com/api/human/hunger.svg?mood[]=happy","createdAt":"2020-09-17T03:03:55.803Z","updatedAt":"2020-09-17T03:03:55.803Z"},"token":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imh1bmdlciIsImlkIjoxLCJpYXQiOjE2MTExMjc2ODksImV4cCI6MTYxMTM4Njg4OX0.dcO4DTvWAVYPPL5do3j9zyfa48-69j157iAiXae5yrw"}
```
