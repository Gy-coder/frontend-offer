const chai = require("chai");
const Promise1 = require("../promise.ts");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;

describe("测试Promise", () => {
  it("Promise是个类", () => {
    assert.isFunction(Promise1);
    assert(Promise1.prototype);
  });
  it("new Promise必须接受一个函数", () => {
    assert.throw(() => {
      new Promise1();
    });
    assert.throw(() => {
      new Promise1(false);
    });
    assert.throw(() => {
      new Promise1(1);
    });
  });
  it("Promise含有then方法", () => {
    const promise = new Promise1(() => {});
    assert(typeof promise.then === "function");
  });
  it("new Promise中的fn立即执行", () => {
    let fn = sinon.fake();
    new Promise1(fn);
    assert(fn.called);
  });
  it("new Promise中的fn接受resolve，reject两个函数", (done) => {
    new Promise1((resolve, reject) => {
      assert.isFunction(resolve);
      assert.isFunction(reject);
      done();
    });
  });
  it("promise中的success会在resolve中执行", (done) => {
    let success = sinon.fake();
    const promise = new Promise1((resolve, reject) => {
      assert.isFalse(success.called);
      resolve();
      setTimeout(() => {
        assert.isTrue(success.called);
        done();
      });
    });
    promise.then(success);
  });
  it("promise中的fail会在reject中执行", (done) => {
    let fail = sinon.fake();
    const promise = new Promise1((resolve, reject) => {
      assert.isFalse(fail.called);
      reject();
      setTimeout(() => {
        assert.isTrue(fail.called);
        done();
      });
    });
    promise.then(null, fail);
  });
  it("2.2.1", () => {
    const promise = new Promise1((resolve) => {
      resolve();
    });
    promise.then(false, null);
  });
  it("2.2.2", (done) => {
    let success = sinon.fake();
    const promise = new Promise1((resolve, reject) => {
      assert.isFalse(success.called);
      resolve(233);
      resolve(2344);
      setTimeout(() => {
        assert(promise.state === "fulfilled");
        assert.isTrue(success.calledOnce);
        assert(success.calledWith(233));
        done();
      });
    });
    promise.then(success);
  });
  it("2.2.3", (done) => {
    let fail = sinon.fake();
    const promise = new Promise1((resolve, reject) => {
      assert.isFalse(fail.called);
      reject(233);
      reject(2344);
      setTimeout(() => {
        assert(promise.state === "rejected");
        assert.isTrue(fail.calledOnce);
        assert(fail.calledWith(233));
        done();
      });
    });
    promise.then(null, fail);
  });
  it("2.2.4 在我的代码执行完之前不得调用 then 后面的俩函数", (done) => {
    let success = sinon.fake();
    const promise = new Promise1((resolve, reject) => {
      resolve();
    });
    promise.then(success);
    console.log(1);
    assert.isFalse(success.called);
    setTimeout(() => {
      assert.isTrue(success.called);
      done();
    }, 0);
  });
  it("2.2.4 失败回调", (done) => {
    let fail = sinon.fake();
    const promise = new Promise1((resolve, reject) => {
      reject();
    });
    promise.then(null, fail);
    console.log(1);
    assert.isFalse(fail.called);
    setTimeout(() => {
      assert.isTrue(fail.called);
      done();
    }, 0);
  });
  it("2.2.5 onFulfilled 和 onRejected 必须作为函数被调用(没有this)", (done) => {
    const promise = new Promise1((resolve) => {
      resolve();
    });
    promise.then(function () {
      "use strict";
      assert(this === undefined);
      done();
    });
  });
  it("2.2.6 then方法可能被多次调用", (done) => {
    const promise = new Promise1((resolve) => {
      resolve();
    });
    let arr = [sinon.fake(), sinon.fake(), sinon.fake()];
    promise.then(arr[0]);
    promise.then(arr[1]);
    promise.then(arr[2]);
    setTimeout(() => {
      assert(arr[0].called);
      assert(arr[1].calledAfter(arr[0]));
      assert(arr[2].calledAfter(arr[1]));
      done();
    }, 0);
  });
  it("2.2.6 失败方法多次调用", (done) => {
    const promise = new Promise1((resolve, reject) => {
      reject();
    });
    let arr = [sinon.fake(), sinon.fake(), sinon.fake()];
    promise.then(null, arr[0]);
    promise.then(null, arr[1]);
    promise.then(null, arr[2]);
    setTimeout(() => {
      assert(arr[0].called);
      assert(arr[1].calledAfter(arr[0]));
      assert(arr[2].calledAfter(arr[1]));
      done();
    }, 0);
  });
  it("2.2.7 then必须返回一个promise", () => {
    const promise = new Promise1((resolve) => {
      resolve();
    });
    const promise2 = promise.then(
      () => {},
      () => {}
    );
    assert(promise2 instanceof Promise1);
  });
  it(`2.2.7.1 如果onFulfilled或onRejected返回一个值x
  , 运行 Promise Resolution Procedure [[Resolve]](promise2, x)`, (done) => {
    const promise = new Promise1((resolve) => {
      resolve();
    });
    const promise2 = promise
      .then(
        () => "成功",
        () => {}
      )
      .then((result) => {
        assert.equal(result, "成功");
        done();
      });
    assert(promise2 instanceof Promise1);
  });
  it(`2.2.7.1 x是一个Promise`, (done) => {
    const promise = new Promise1((resolve) => {
      resolve();
    });
    const fn = sinon.fake();
    const promise2 = promise.then(() => {
      return new Promise1((resolve) => {
        resolve();
      });
    });
    promise2.then(fn);
    setTimeout(() => {
      assert(fn.called);
      done();
    }, 0);
  });
  it(`2.2.7.1.2 x是一个Promise 且失败了`, (done) => {
    const promise = new Promise1((resolve, reject) => {
      resolve();
    });
    const fn = sinon.fake();
    const promise2 = promise.then(() => {
      return new Promise1((resolve, reject) => {
        reject();
      });
    });
    promise2.then(null, fn);
    setTimeout(() => {
      assert(fn.called);
      done();
    }, 0);
  });
  it(`2.2.7.1 第二个函数x是一个Promise`, (done) => {
    const promise = new Promise1((resolve, reject) => {
      reject();
    });
    const fn = sinon.fake();
    const promise2 = promise.then(null, () => {
      return new Promise1((resolve) => {
        resolve();
      });
    });
    promise2.then(fn);
    setTimeout(() => {
      assert(fn.called);
      done();
    }, 0);
  });
  it(`2.2.7.1.2 第二个函数x是一个Promise 且失败了`, (done) => {
    const promise = new Promise1((resolve, reject) => {
      reject();
    });
    const fn = sinon.fake();
    const promise2 = promise.then(null, () => {
      return new Promise1((resolve, reject) => {
        reject();
      });
    });
    promise2.then(null, fn);
    setTimeout(() => {
      assert(fn.called);
      done();
    }, 0);
  });
  it(`2.2.7.2 如果success/fail抛出一个异常e，则promise2必须被拒绝`, (done) => {
    const promise = new Promise1((resolve, reject) => {
      resolve();
    });
    const fn = sinon.fake();
    const error = new Error();
    const promise2 = promise.then(() => {
      throw error;
    });
    promise2.then(null, fn);
    setTimeout(() => {
      assert(fn.called);
      assert(fn.calledWith(error));
      done();
    }, 0);
  });
  it(`2.2.7.2 如果success/fail抛出一个异常e，则promise2必须被拒绝`, (done) => {
    const promise = new Promise1((resolve, reject) => {
      reject();
    });
    const fn = sinon.fake();
    const error = new Error();
    const promise2 = promise.then(null, () => {
      throw error;
    });
    promise2.then(null, fn);
    setTimeout(() => {
      assert(fn.called);
      assert(fn.calledWith(error));
      done();
    }, 0);
  });
});
