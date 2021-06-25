const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;
const deepClone = require("../index");

describe("测试深拷贝", () => {
  it("deepClone是个函数", () => {
    assert.isFunction(deepClone);
  });
  it("能够复制基本类型", () => {
    const n = 1;
    const n2 = deepClone(n);
    assert.isTrue(n === n2);
    const s = "123";
    const s2 = s;
    assert.isTrue(s === s2);
    const b = false;
    const b2 = b;
    assert.isTrue(b === b2);
    const u = undefined;
    const u2 = u;
    assert.isTrue(u === u2);
    const e = null;
    const e2 = e;
    assert.isTrue(e === e2);
    const sym = Symbol();
    const sym2 = sym;
    assert.isTrue(sym === sym2);
  });
  describe("能够复制对象", () => {
    it("能够复制普通对象", () => {
      const a = { name: "jack", age: 18, children: { name: "baby", age: 3 } };
      const a2 = deepClone(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.children !== a2.children);
      assert(a.children.name === a2.children.name);
    });
    it("能够复制数组", () => {
      const a = [
        [11, 12],
        [21, 22],
        [31, 32],
      ];
      const a2 = deepClone(a);
      assert(a[0] !== a2[0]);
      assert(a[0][0] === a2[0][0]);
    });
  });
  it("能够复制函数", () => {
    const a = function (x, y) {
      return x + y;
    };
    a.xxx = { yyy: { zzz: 1 } };
    const a2 = deepClone(a);
    assert(a !== a2);
    assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
    assert(a.xxx.yyy !== a2.xxx.yyy);
    assert(a.xxx !== a2.xxx);
    assert(a(1, 2) === a2(1, 2));
  });
});
