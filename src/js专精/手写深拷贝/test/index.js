const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;
const DeepClone = require("../index");

describe("测试深拷贝", () => {
  it("DeepClone是个类", () => {
    assert.isFunction(DeepClone);
  });
  it("能够复制基本类型", () => {
    const n = 1;
    const n2 = new DeepClone().clone(n);
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
      const a2 = new DeepClone().clone(a);
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
      const a2 = new DeepClone().clone(a);
      assert(a[0] !== a2[0]);
      assert(a[0][0] === a2[0][0]);
    });
    it("能够复制函数", () => {
      const a = function (x, y) {
        return x + y;
      };
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = new DeepClone().clone(a);
      assert(a !== a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
      assert(a(1, 2) === a2(1, 2));
    });
    it("环也可以复制", () => {
      const a = { name: "jack" };
      a.self = a;
      const a2 = new DeepClone().clone(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.self !== a2.self);
    });
    xit("不会爆栈", () => {
      let a = { child: null };
      let b = a;
      for (let i = 0; i < 50000; i++) {
        b.child = {
          child: null,
        };
        b = b.child;
      }
      let a2 = new DeepClone().clone(a);
      assert(a !== a2);
    });
    it("可以复制正则表达式", () => {
      const a = new RegExp("hi\\d+", "gi");
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = new DeepClone().clone(a);
      assert(a.source === a2.source);
      assert(a.flags === a2.flags);
      assert(a !== a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
    it("可以复制Date", () => {
      const a = new Date();
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = new DeepClone().clone(a);
      assert(a !== a2);
      assert(a.getTime() === a2.getTime());
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
    it("可以自动跳过原型", () => {
      const a = Object.create({ name: "aa" });
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = new DeepClone().clone(a);
      assert(a !== a2);
      assert.isFalse("name" in a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
    it("很复杂的对象", () => {
      const a = {
        n: NaN,
        n2: Infinity,
        s: "",
        bool: false,
        null: null,
        u: undefined,
        sym: Symbol(),
        o: {
          n: NaN,
          n2: Infinity,
          s: "",
          bool: false,
          null: null,
          u: undefined,
          sym: Symbol(),
        },
        array: [
          {
            n: NaN,
            n2: Infinity,
            s: "",
            bool: false,
            null: null,
            u: undefined,
            sym: Symbol(),
          },
        ],
      };
      const a2 = new DeepClone().clone(a);
      assert(a !== a2);
      assert.isNaN(a2.n);
      assert(a.n2 === a2.n2);
      assert(a.s === a2.s);
      assert(a.bool === a2.bool);
      assert(a.null === a2.null);
      assert(a.u === a2.u);
      assert(a.sym === a2.sym);
      assert(a.o !== a2.o);
      assert.isNaN(a2.o.n);
      assert(a.o.n2 === a2.o.n2);
      assert(a.o.s === a2.o.s);
      assert(a.o.bool === a2.o.bool);
      assert(a.o.null === a2.o.null);
      assert(a.o.u === a2.o.u);
      assert(a.o.sym === a2.o.sym);
      assert(a.array !== a2.array);
      assert(a.array[0] !== a2.array[0]);
      assert.isNaN(a2.array[0].n);
      assert(a.array[0].n2 === a2.array[0].n2);
      assert(a.array[0].s === a2.array[0].s);
      assert(a.array[0].bool === a2.array[0].bool);
      assert(a.array[0].null === a2.array[0].null);
      assert(a.array[0].u === a2.array[0].u);
      assert(a.array[0].sym === a2.array[0].sym);
    });
  });
});
