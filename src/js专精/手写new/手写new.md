# 手写 new

## new 做了什么？

1. 创建一个空对象 obj
2. obj.**proto** === 构造函数.prototype
3. 执行构造函数，其中 this 就是 obj
4. 如果构造函数返回值是一个对象(a)，则返回构造函数返回的对象(a),否则返回 obj

```js
function myNew(Fn, ...args) {
  let obj = {};
  obj.__proto__ = Fn.prototype;
  let res = Fn.call(obj, ...args);
  return typeof res === "object" ? res : obj;
}
```
