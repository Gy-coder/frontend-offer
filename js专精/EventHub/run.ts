import EventHub from "./EventHub";

const run = () => {
  const eventHub = new EventHub();
  let fn = (data) => {
    console.log(data);
  };
  eventHub.on("执行fn", fn);
  eventHub.emit("执行fn", "fn被执行");
  eventHub.off("执行fn", fn);
};

run();
