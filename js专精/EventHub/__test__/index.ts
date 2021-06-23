import EventHub from "../EventHub";

const test1 = (message?) => {
  const eventHub = new EventHub();
  console.assert(eventHub instanceof Object === true, "eventHub是个对象");
  console.log(message);
};

// On Emit
const test2 = (message?) => {
  const eventHub = new EventHub();
  let called = false;
  eventHub.on("xxx", (y) => {
    called = true;
    console.assert(y === "今天林志玲结婚了");
  });
  eventHub.emit("xxx", "今天林志玲结婚了");
  setTimeout(() => {
    console.assert(called === true);
  }, 1000);
  console.log(message);
};

const test3 = (message?) => {
  const eventHub = new EventHub();
  let called = false;
  let fn1 = () => {
    called = true;
  };
  eventHub.on("yyy", fn1);
  eventHub.off("yyy", fn1);
  eventHub.emit("yyy");
  setTimeout(() => {
    console.assert(called === false);
  }, 1000);
  console.log(message);
};

test1("eventHub 可以创建对象");
test2("on之后 emit 函数会执行");
test3("off有效");
