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

module.exports = Promise1;

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
