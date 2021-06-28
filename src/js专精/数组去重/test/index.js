const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const assert = chai.assert;
const depulication = require("../index");

describe("数组去重", () => {
  it("deplication是一个函数", () => {
    assert.isFunction(depulication);
  });
  it("可以去重复", () => {
    const arr = [
      1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 5, 6, 6, 7, 7, 8, 8, 8, 9,
    ];
    const result = depulication(arr);
    assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  it("支持字符串", () => {
    const arr = [1, "1", 1, 1, 1, 1, "1", 2, 2, "2", "2", 3];
    const result = depulication(arr);
    assert.deepEqual(result, [1, "1", 2, "2", 3]);
  });
  it("支持Boolean", () => {
    const arr = [false, false, true, 1, 2, 2, 3, "3", "3", true];
    const result = depulication(arr);
    assert.deepEqual(result, [false, true, 1, 2, 3, "3"]);
  });
  it("支持NaN", () => {
    const arr = [1, 1, 2, 2, NaN, 3, 4, 3, 3, 4, 4, NaN, NaN];
    const result = depulication(arr);
    assert.deepEqual(result, [1, 2, NaN, 3, 4]);
  });
  it("支持undefined", () => {
    const arr = [
      undefined,
      undefined,
      undefined,
      1,
      1,
      1,
      1,
      1,
      undefined,
      1,
      1,
      1,
      1,
      undefined,
      1,
    ];
    const result = depulication(arr);
    assert.deepEqual(result, [undefined, 1]);
  });
  it("支持null", () => {
    const arr = [1, 1, 1, null, null, 1, 1, 1, null, null, null, 1];
    const result = depulication(arr);
    assert.deepEqual(result, [1, null]);
  });
  xit("支持对象", () => {
    const obj = { name: "jack", age: 18 };
    const arr = [obj, { name: "jack", age: 18 }];
    const result = depulication(arr);
    assert.deepEqual(result, [obj, { name: "jack", age: 18 }]);
  });
});
