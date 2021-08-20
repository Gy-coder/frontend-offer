const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const assert = chai.assert;

const myInstanceOf = require("../instanceof");

describe("myInstanceof", () => {
  it("myInstaceof是个函数", () => {
    assert(typeof myInstanceOf === "function");
  });
  it("普通类型都是false", () => {
    assert.isFalse(myInstanceOf(3, Object));
    assert.isFalse(myInstanceOf("1", Object));
    assert.isFalse(myInstanceOf(undefined, Object));
    assert.isFalse(myInstanceOf(null, Object));
    assert.isFalse(myInstanceOf(false, Object));
  });
  it("普通对象可以", () => {
    const obj = {};
    assert.isTrue(myInstanceOf(obj, Object));
    assert.isFalse(myInstanceOf(obj, Array));
  });
  it("数组可以", () => {
    const arr = [];
    assert.isTrue(myInstanceOf(arr, Array));
  });
  it("函数可以", () => {
    const fn = function () {};
    assert.isTrue(myInstanceOf(fn, Function));
  });
  it("自定义对象可以", () => {
    class Dog {
      constructor(name) {
        this.name = name;
      }
    }
    const dog = new Dog("nancy");
    assert.isTrue(myInstanceOf(dog, Dog));
    assert.isTrue(myInstanceOf(dog, Object));
  });
  it("继承", () => {
    class Animal {
      constructor() {}
    }
    class Dog extends Animal {
      constructor() {
        super();
      }
    }
    const dog = new Dog();
    assert.isTrue(myInstanceOf(dog, Animal));
  });
});
