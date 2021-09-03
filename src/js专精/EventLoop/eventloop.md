# Eventloop

JavaScript 是单线程的，有了 event loop 的加持，Node.js 才可以非阻塞地执行 I/O 操作，把这些操作尽量转移给操作系统来执行。

## 事件循环的阶段（从上往下走，再回到 1，一个循环）

1. timers
2. I/O callbacks
3. idle,prepare
4. poll
5. check
6. close callbacks

## 我们需要知道的

1. timer
2. poll
3. check

## 在 Nodejs 异步任务

- setTimeout -> 在 timer 阶段执行
- setImmediate -> 在 check 阶段执行
- process.nextTick 在这个阶段结束后执行

## 在 Chrome上的异步任务

* setTimeout -> 宏任务
* setInterval -> 宏任务

* Promise -> 微任务

同步代码执行完后，先执行微任务，再执行宏任务

**例题:**

1. 求下列代码的执行顺序

   ```js
   setTimeout(() => {
     console.log("timeout");
   }, 0);

   setImmediate(() => {
     console.log("immediate");
   });

   // timeout immediate
   // immediate timeout
   // 两种都有可能
   ```

   为什么会造成上述状况？

   因为 eventloop 和 js v8 的启动均是异步任务

   所以两者谁先启动就无法知道

   若 eventloop 先启动，则 eventloop 先走到 poll 阶段，再执行 js，js 在队列挂载异步任务，之后根据顺序会先到 check 阶段，打印 immediate，再到 timer 阶段，打印 timeout;

   若 js 先启动，则先在队列挂载异步任务，然后启动 eventloop，在 timer 阶段打印 timeout，然后进入 poll，发现 check 状态有任务，则执行该任务，打印 immediate

2. 求打印顺序

   ```js
   setImmediate(() => {
     // f1
     console.log("immediate1");
     setTimeout(() => {
       // f3
       console.log("timeout1");
     }, 0);
   });

   setTimeout(() => {
     // f2
     console.log("timeout2");
     setImmediate(() => {
       // f4
       console.log("immediate1");
     });
   }, 0);

   /*
    immediate1
    timeout2
    timeout1
    immediate2
   */
   ```

   ![](../../../images/js专精/eventloop%20题目2.png)
