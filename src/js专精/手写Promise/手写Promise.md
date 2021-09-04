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


## 代码

```js
class Promise1 {
  callback = { succeed: [], fail: [], handle: null };
  state = "pending";
  resolve(result) {
    if (this.state !== "pending") return;
    this.state = "fulfilled";
    nextTick(() => {
      this.callback.succeed.forEach((fn) => {
        if (typeof fn === "function") {
          let x;
          try {
            x = fn.call(undefined, result);
          } catch (error) {
            return this.callback.handle.reject(error);
          }
          this.callback.handle.resolveWith(x);
        }
      });
    });
  }
  reject(reason) {
    if (this.state !== "pending") return;
    this.state = "rejected";
    nextTick(() => {
      this.callback.fail.forEach((fn) => {
        let x;
        if (typeof fn === "function") {
          try {
            x = fn.call(undefined, reason);
          } catch (error) {
            return this.callback.handle.reject(error);
          }
          this.callback.handle.resolveWith(x);
        }
      });
    });
  }
  constructor(fn) {
    if (typeof fn !== "function") {
      throw new Error("我只接受函数参数");
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }
  then(succeed, fail) {
    if (typeof succeed === "function") this.callback.succeed.push(succeed);
    if (typeof fail === "function") this.callback.fail.push(fail);
    this.callback.handle = new Promise1(() => {});
    return this.callback.handle;
  }
  resolveWith(x) {
    if (this === x) {
      return this.reject(new TypeError());
    } else if (x instanceof Promise1) {
      x.then(
        (result) => {
          this.resolve(result);
        },
        (reason) => {
          this.reject(reason);
        }
      );
    } else if (x instanceof Object) {
      let then;
      try {
        then = x.then;
      } catch (e) {
        this.reject(e);
      }
      if (x instanceof Function) {
        try {
          x.then(
            (y) => {
              this.resolveWith(y);
            },
            (r) => {
              this.reject(r);
            }
          );
        } catch (error) {
          this.reject(error);
        }
      } else {
        this.resolve(x);
      }
    } else {
      this.resolve(x);
    }
  }
}

function nextTick(fn) {
  if (process !== undefined && typeof process.nextTick === "function") {
    return process.nextTick(fn);
  } else {
    var counter = 1;
    var observer = new MutationObserver(fn);
    var textNode = document.createTextNode(String(counter));

    observer.observe(textNode, {
      characterData: true,
    });

    counter = counter + 1;
    textNode.data = String(counter);
  }
}

```