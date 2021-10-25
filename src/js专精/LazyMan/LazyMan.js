function LazyMan(name) {
  var queue = [];
  const next = () => {
    const first = queue.shift();
    first && first();
  };
  const task = () => {
    console.log(`你好 我是${name}`);
    next();
  };
  queue.push(task);
  const api = {
    sleep(n) {
      const task = () => {
        setTimeout(() => {
          console.log(`我醒了 我刚睡了${n}秒`);
          next();
        }, n * 1000);
      };
      queue.push(task);
      return api;
    },
    eat(type) {
      const task = () => {
        console.log(type === "lunch" ? "吃午饭" : "吃晚饭");
        next();
      };
      queue.push(task);
      return api;
    },
    sleepFirst(n) {
      const task = () => {
        setTimeout(() => {
          console.log(`我醒了 我刚睡了${n}秒`);
          next();
        }, n * 1000);
      };
      queue.unshift(task);
      return api;
    },
  };
  setTimeout(() => next());
  return api;
}

LazyMan("frank").sleepFirst(10).eat("lunch");