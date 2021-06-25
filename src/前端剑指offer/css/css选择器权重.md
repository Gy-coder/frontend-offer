# CSS选择器权重计算

## 基础知识

计算方法: !important > 权重高的 > 权重相同位置靠后的 > 来自继承的

权重计算方法

1. 千位: 声明在style标签中则该位置得1分

2. 百位: 选择器中包含id选择器该位置得1分

3. 十位: 选择器中包含类选择器 属性选择器 伪类 则该位置得1分

4. 个位: 选择器中包含标签选择器 伪元素选择器 则该位置得1分

例：

```css
#header p.content.active  /* 得分0121 */
.header p.active::before /* 得分为0022 */
```

## 习题

1. 有如下标签 p的颜色是什么？

    ```html
    <p style="color: red">this is p</p>
    <style>
    p { color: blue!important; }
    </style>
    ```

    解: 答案是blue !important是优先级最高的

2. 有如下标签，p标签的颜色是什么?

    ```html
    <p>饥人谷前端</p>
    <style>
    p { color: red  }
    body { color: blue!important; }
    </style>
    ```

    解: 答案是red 因为蓝色虽然是!important 但是是继承body的 优先级最低

3. 有如下代码，a标签的颜色是什么?

    ```html
    <a>饥人谷前端</a>
    <style>
    body { color: red!important; }
    </style>
    ```

    解: 答案是默认的a标签颜色 red是继承的 优先级最低


4. 有如下代码，h1标签的颜色是什么?

    ```html
    <div id="article" class="box">
    <h1 id="title" class="title">饥人谷前端</h1>
    </div>

    <style>
    div.box h1#title { color: yellow }
    #article h1.title { color: red }
    </style>
    ```

    解: 第一个的权重是0112 第二个的权重为0111 所以颜色为yellow


5. 有如下代码，h1标签的颜色是什么?

    ```html
    <div id="article" class="box">
    <h1 id="title" class="title">饥人谷前端</h1>
    </div>

    <style>
    .box h1#title { color: yellow }
    #article h1.title { color: red }
    </style>
    ```

    解: 第一个的权重为0111 第二个的权重为0111 由于第二个在后面 所以颜色为red

6. 有如下代码，h1标签的颜色是什么?

    ```html
    <div id="article" class="box">
    <h1 id="title" class="title" style="color:red">饥人谷前端</h1>
    </div>

    <style>
    .box h1#title.title { color: yellow }
    </style>
    ```

    解: red的优先级为1000 style标签内的优先级为0121 所以red的优先级更高。颜色为red
