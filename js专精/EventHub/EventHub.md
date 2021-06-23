# 手写EventHub

## 手写思路

1. 确定API
2. 添加测试用例
3. 测试pass
4. 重构代码

## 需求分析(确定api)

1. EventHub#on
2. EventHub#off
3. EventHub#emit


## EventHub代码

```js
class EventHub {
  private cache: { [K: string]: Array<Function> } = {}; // {name:[fn1,fn2,fn3]}
  on(name: string, fn: Function) {
    this.cache[name] = this.cache[name] || [];
    this.cache[name].push(fn);
  }
  emit(name: string, data?) {
    (this.cache[name] || []).forEach((fn) => {
      fn(data);
    });
  }
  off(name: string, fn: Function) {
    let index = indexOf(this.cache[name], fn);
    if (index === -1) {
      return;
    }
    this.cache[name].splice(index, 1);
  }
}
```

## 使用方法

```js
const eventHub = new EventHub();
let fn = (data) => {console.log(data)};
eventHub.on("执行fn", fn);
eventHub.emit("执行fn",'fn被执行');
eventHub.off("执行fn", fn);
```