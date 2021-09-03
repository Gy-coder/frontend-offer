const { expect } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;
const currify = require('../index')

describe('测试柯里化',()=>{
    it('两个参数',()=>{
        const add = (a,b) => a + b
        const newAdd = currify(add)
        expect(newAdd(1)(2)).equal(3)
        expect(newAdd(10)(2)).equal(12)
    })
    it('三个参数',()=>{
        const add = (a,b,c) => a + b + c
        const newAdd = currify(add)
        expect(newAdd(1)(2)(3)).equal(6)
        expect(newAdd(10)(2)(5)).equal(17)
    })
    it('四个参数',()=>{
        const add = (a,b,c,d) => a + b + c + d
        const newAdd = currify(add)
        expect(newAdd(1)(2)(3)(4)).equal(10)
        expect(newAdd(10)(2)(5)(100)).equal(117)
    })
    it('混合参数',()=>{
        const add = (a,b,c,d) => a + b + c + d
        const newAdd = currify(add)
        expect(newAdd(1)(2,3)(4)).equal(10)
        expect(newAdd(10)(2,5,100)).equal(117)
        expect(newAdd(10,2)(5,100)).equal(117)
    })
})