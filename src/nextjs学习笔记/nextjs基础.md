# Nextjs 开端

## Nextjs 定位

Nextjs 是一个全栈框架 具有以下的特性

- CSS - in - JS
- 页面预渲染 + SSR(服务端渲染)
- 前后端同构(代码分别运行在两端)

* Node.js > 10
* React 支持
* TypeScript 支持

Nextjs 的弱项:

- 没有提供数据库相关内容 需要自己搭配
  TypeORM 或 Sequelize

* 没有提供单元测试相关功能 需要自己搭配
  Jest/ Cypress

## 创建 nextjs 项目

```
$  npm init next-app [项目名]
$ cd [项目名]
$ yarn dev
```

**建议在 yarn dev 之前在.gitignore 中添加/.idea/ & /.vscode/**

## nextjs 初上手

### 添加一个页面

1. 在 pages 目录下新建一个 posts 目录，并在 posts 目录下新建一个 first-posts.js 文件
2. 写一个函数组件 返回一个 div
3. 浏览器打开 http://localhost:3000/posts/first-post 就可以看到页面了
   **如果报错就重启 yarn dev**

### Link 快速导航

用法:

```html
<Link href="xxx">
    <a>回到首页</a>
</Link>
```

优点:

1. 页面不会刷新，用 Ajax 请求新页面的内容
2. 不会重复请求 HTML、CSS、JS 等内容
3. 自动在页面中自动插入新内容，删除旧内容
4. 由于省去很多请求和解析的过程，因此加快了速度

### 同构代码

所谓的同构代码就是: 你写的代码会在 Nodejs 和浏览器中同时运行

**不是所有的代码都可以在两端运行，有些需要用户触发**
**不是所有 API 都能用，，比如 node 就没有 window 对象**

## nextjs 全局配置

### 自定义 Head

head 可以配置单个页面的 title 和 meta

1. 自定义单个页面的 head

   ```html
   <head>
     <title>我的博客</title>
   </head>
   ```

2. 全局配置 Head

   - pages/\_app.js
   - export default function App 是每个页面的根组件

   * 页面切换时 App 不会被销毁，App 里面的组件会被销毁
   * 可用 App 保存全局状态

   ```js
   // _app.js的内容
   export default function App({ Component, pageProps }) {
     return (
       <>
         // head为配置项
         <Head>
           <title>My title</title>
         </Head>
         <Component {...pageProps} />
       </>
     );
   }
   ```

### 全局 css

在根组件中写入

```js
import "../styles/global.css";
```

**global.css 只能在跟组件中用，用在其他组件会报错，这是 nextjs 的规定**

### 局部 css

1. style-jsx

   在自定义组件的 jsx 中写入

   ```html
   <style jsx>
     {`
     …
     `}
   </style>
   ```

   例如

   ```jsx
   import React from "react";
   import Link from "next/link";

   const FirstPost = () => {
     console.log(1);
     return (
       <>
         <div>
           <h1>Yes</h1>This is my FirstPost
           <hr />
           <Link href="/">
             <a>回到首页</a>
           </Link>
         </div>
         <style jsx>{`
           h1 {
             color: red;
           }
         `}</style>
       </>
     );
   };
   ```

2. css module(以 first-post.js 为例)

   1. 在 styles 目录中新建 first-post.module.css 文件并写入

      ```css
      .wrapper {
        background: red;
      }
      ```

   2. 在 first-post.js 写入

      ```js
      import styles from "style/first-post.module.css";
      ```

   3. 在要用的 div 中写入 className

      ```jsx
      return <div className={styles.wrapper}></div>;
      ```

### 绝对路径配置

1. 新建 jsconfig.json / tsconfig.json
2. 在新建的文件内写入

   ```json
   {
     "compilerOptions": {
       "baseUrl": ","
     }
   }
   ```

## 在 nextjs 中配置 weback

1. 创建 nextconfig.js 文件

2. 在 nextconfig.js 中写入

   ```js
   module.exports = {
     webpack: (config, options) => {
       config.module.rules.push({
         test: /\.mdx/,
         use: [
           options.defaultLoaders.babel,
           {
             loader: "@mdx-js/loader",
             options: pluginOptions.options,
           },
         ],
       });

       return config;
     },
   };
   ```

## 使用 next-image 插件

在 nextconfig.js 中写入

```js
const withImages = require("next-images");
module.exports = withImages({
  webpack(config, options) {
    return config;
  },
});
```

## 如何使用 typescript 进行 nextjs 开发

1. 执行 yarn global add typescript
2. 执行 tsc --init 创建 tsconfig.json
3. 合并 jsconfig.json 内容到 tsconfig.json
4. 删除 jsconfig.json
5. yarn add --dev typescript @type/react @type/node
6. yarn dev
7. 改.js 为.tsx

## 使用 nextjs api

1. 在 api 目录下新建 v1 目录，然后在 v1 目录下新建 post.tsx
2. 在 post.tsx 中写入

   ```ts
   import { NextApiRequest, NextApiResponse } from "next";

   const Post = (req: NextApiRequest, res: NextApiResponse) => {
     res.statusCode = 200;
     res.setHeader("Content-Type", "application/json");
     res.write(JSON.stringify({ name: "jack" }));
     res.end();
   };

   export default Post;
   ```

3. 访问 http://localhost:3000/api/v1/posts
