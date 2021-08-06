class Promise1 {
  callback = { succeed: [], fail: [] };
  state = "pending";
  resolve(result) {
    if (this.state !== "pending") return;
    this.state = "fulfilled";
    setTimeout(() => {
      this.callback.succeed.forEach((fn) => {
        if (typeof fn === "function") fn.call(undefined, result);
      });
    }, 0);
  }
  reject(reason) {
    if (this.state !== "pending") return;
    this.state = "rejected";
    setTimeout(() => {
      this.callback.fail.forEach((fn) => {
        if (typeof fn === "function") fn.call(undefined, reason);
      });
    }, 0);
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
  }
}

module.exports = Promise1;
