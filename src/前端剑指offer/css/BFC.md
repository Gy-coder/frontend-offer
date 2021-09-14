# BFC

## 如何答题？

1. 先答出 BFC 是什么？ B？ F？ C？
2. 规则
3. 什么可以创建 BFC
4. 为什么研究它？ -> 隔离带的特性


## 什么是BFC

BFC的全称是 Block formatting contexts (块级格式化上下文)。block：块级元素， formatting：格式化、规定...的格式， contexts：上下文、环境。翻译过来就是：BFC是规定内部块级元素格式(摆放规则)的一个独立的环境。

## 规则

一个块级元素占据一整行空间，一个挨一个从上到下排列，盒子间的垂直距离由margin决定。相邻块级盒子的垂直margin会出现折叠。BFC里的盒子左侧边缘不会超出BFC，除非这个盒子自己也变成了一个新的BFC。

## 什么可以创建BFC

1. 浮动元素（元素的 float 不是 none）
2. 绝对定位元素（元素的 position 为 absolute 或 fixed）
3. 行内块元素
4. overflow 值不为 visible 的块元素
5. 弹性元素（display为 flex 或 inline-flex元素的直接子元素）