# 手写 Promise

## 面试答题方法

1. 该技术解决了什么问题 - why？
2. 该技术如何解决问题 - how？
3. 该技术的优点
4. 该技术的缺点
5. 如何解决这些缺点

## Promise 解决什么问题？

- 解决回调地狱问题

## Promise 的优点

1. 减少缩进

   把函数中函数变成 then 底下的 then

2. 消灭 if(err)

## 如何使用

```js
function 摇骰子() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = Math.floor(Math.random() * 6 + 1);
      resolve(res);
    }, 3000);
  });
}

摇骰子().then((n) => console.log(`你摇出来个${n}`));
```

## Promise 的完整 API 是什么？

Promise 是个类

1. js 中 类是一个特殊的函数
2. 类属性: length(可忽略)
3. 类方法: all/allSettled/race/reject/resolve
4. 对象属性: then/catch/finally
5. 对象内部属性 state = pending/fulfilled/rejected
