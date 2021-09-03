# 函数与闭包

## 什么是函数？

## 函数的返回值由什么确定？

1. 调用时的参数 params
2. 定义时的环境 env

   ```js
   let x = "x";
   let a = "1";

   function f1(x) {
     return x + a;
   }

   {
     let a = "2";
     console.log(f1("x")); // 'x1'
   }
   ```

   **a 是定义时的 a 而不是运行时的 a**

   ```js
   let x = "x";
   let a = "1";

   function f1(x) {
     return x + a;
   }
   a = "3";

   {
     let a = "2";
     console.log(f1("x")); // 'x3'
   }
   ```

   **只确定是哪个 a 而不确定具体的值**

   ```js
   let x = "x";
   let a = "1";

   function f1(c) {
     return c();
   }

   {
     let a = "2";
     function f2() {
       return x + a;
     }
     console.log(f1(f2)); // 'x2'
   }
   ```

   **在函数的里面可以访问到函数外面的变量**

## 什么是闭包？

如果函数里面可以访问外面的变量，那么函数 + 外面的参数 = 闭包

#### 一个面试题

```js
for (var i = 0; i < 6; i++) {
  setTimeout(() => console.log(i));
}

// 6个6
```

#### 闭包的特点

1. 可以让函数维持一个变量
2. 但是无法维持变量的值
3. 特别是这个值变化的时候

## this 相关

**一个问题: this 究竟是参数、还是环境？**

**答: 对于普通函数、this 是参数，对于箭头函数，this 是环境**

#### this 的确定

1. 普通函数

   - 显式 this

     ```js
     fn.call(asThis, 1, 2);
     fn.apply(asThis, [1, 2]);
     obj.method.call(obj, 1, 2);
     ```

- 隐式 this

  ```js
  fn(1, 2); // fn.call(undefined,1,2)
  obj.method(1, 2); // obj.method.call(obj,1,2)
  arr[0](1, 2); // arr.0.call(arr,1,2,)
  ```

#### 测试题

1. 求 this 的值

   ```js
   button.onclick = function (e) {
     console.log(this);
   };
   ```

   答：无法确定 要看调用方法

   ```js
   点击调用 -> this === button
   ```

   ```js
   const f = button.onclick
   f() -> this === undefined -> window
   ```

   ```js
   const f= button.onclick
   f.call({x: 'x'}) -> this === {x: 'x'}对象
   ```

2. 输出什么？

   ```js
   let length = 10;
   function fn() {
     console.log(this.length);
   }
   let obj = {
     length: 5,
     method(fn) {
       fn();
       arguments[0]();
     },
   };
   obj.method(fn, 1);
   ```

   答: 当前页面 iframe 的个数 2

   ```js
   let length = 10; // let不会把变量挂载到window上
   function fn() {
     console.log(this.length);
   }
   let obj = {
     length: 5,
     method(fn) {
       fn.call(undefined)  // -> window.length
       arguments.0.call(arguments) // -> fn.call(arguments) -> arguments.length === 2(arguments为实参的长度)
     },
   };
   obj.method(fn, 1);
   ```
