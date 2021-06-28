const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const flat = require("../index.js");

const assert = chai.assert;

chai.use(sinonChai);

describe("测试数组拍平", () => {
  it("flat是个函数", () => {
    assert.isFunction(flat);
  });
  it("flat可以处理一维数组", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = flat(arr);
    assert.deepEqual(result, [1, 2, 3, 4, 5]);
  });
  it("flat可以处理二位数组", () => {
    const arr = [1, 2, 3, [4, 5]];
    const result = flat(arr);
    assert.deepEqual(result, [1, 2, 3, 4, 5]);
  });
  it("flat可以处理多维数组", () => {
    let arr = [3, 4, [4, 5, ["s"]]];
    const result = flat(arr);
    assert.deepEqual(result, [3, 4, 4, 5, "s"]);
  });
  it("flat可以处理多维数组", () => {
    let arr = [0, [1, [2, [3]], [4, [5]], [6]], [7, 8, [9, 10]]];
    const result = flat(arr);
    assert.deepEqual(result, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
