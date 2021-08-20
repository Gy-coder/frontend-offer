# 手写 instanceOf

## instanceof 的原理

```js
obj.__proto__ === 构造函数.prototype;
```

遍历对象的 obj.**proto**

然后比较上述表达式

## 代码

```js
function myInstanceOf(target, targetConstructor) {
  if (typeof targetConstructor !== "function" || !targetConstructor) {
    throw new Error("targetConstructor应该是一个函数");
  }
  if (!target || (typeof target !== "object" && typeof target !== "function")) {
    return false;
  }
  while (target.__proto__) {
    if (target.__proto__ === targetConstructor.prototype) {
      return true;
    }
    target = target.__proto__;
  }
  return false;
}
```
