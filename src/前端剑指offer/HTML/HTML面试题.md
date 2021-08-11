# HTML 面试题

1. 如何理解 HTML 语义化

   - 荒野阶段 -> 后端写 HTML、用 table 布局 -> 维护麻烦

   * 美工阶段 -> DIV + CSS -> 不够语义化

   * 前端阶段 -> 用正确的标签写页面

   比如段落就用 p 标签，标题就用 h1-h6，主要区域就用 main 标签，导航栏就用 nav

2. meta viewpoint

   ```HTML
   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1">
   ```

   - width：控制 viewport 的大小，可以给它指定一个值(正整数)，或者是一个特殊的值(如：device-width 设备独立像素宽度，单位缩放为 1 时)

   * initial-scale -> 初始缩放比例，即当页面第一次加载时的缩放比例(可以带小数)

   - maximum-scale：允许用户缩放到的最大比例，为一个数字(可以带小数)
   - minimum-scale：允许用户缩放到的最小比例，为一个数字(可以带小数)
   - user-scalable：是否允许用户手动缩放，值为 "no"(不允许) 或 "yes"(允许)；

3. 你用过什么 HTML 标签

   - 内容相关: header main footer article
   - 功能相关: canvas video audio(搜 MDN)

4. 什么是 H5
