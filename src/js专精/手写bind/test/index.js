'use strict'
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;
const bind1 = require('../index')
Function.prototype.bind1 = bind1


describe('测试bind',()=>{
    it('bind1存在',()=>{
        assert(Function.prototype.bind1)
    })
    it('传this',()=>{
        const fn1 = function(){return this}
        const newFn1 = fn1.bind1({name:'xxx'})
        assert(newFn1().name === 'xxx')
    })
    it('传参数',()=>{
        const fn1 = function(p1,p2){return [this,p1,p2]}
        const newFn1 = fn1.bind1(null,124,456)
        assert(newFn1()[0] === null)
        assert(newFn1()[1] === 124)
        assert(newFn1()[2] === 456)
    })
    it('fn.bind1(asThis)(param1)',()=>{
        const fn1 = function(p1,p2){return [this,p1,p2]}
        const newFn1 = fn1.bind1({name: 'xxx'})
        assert(newFn1(123,456)[0].name === 'xxx')
        assert.equal(newFn1(123,456)[1],123)
        assert(newFn1(123,456)[2] === 456)
    })
    it('支持new',()=>{
        const fn1 = function(p1,p2){
            this.p1 = p1
            this.p2 = p2
        }
        const newFn1 = fn1.bind1(undefined,'x','y')
        const obj = new newFn1()
        assert.deepEqual(obj,{p1:'x',p2:'y'})
    })
    it('支持new,并且fn有prototype.sayHi(){}',()=>{
        const fn1 = function(p1,p2){
            this.p1 = p1
            this.p2 = p2
        }
        fn1.prototype.sayHi = function(){}
        const newFn1 = fn1.bind1(undefined,'x','y')
        const obj = new newFn1()
        // assert.deepEqual(obj,{p1:'x',p2:'y',__proto__:{sayHi(){}}})
        assert.isTrue(obj.__proto__ === newFn1.prototype)
        // console.log()
        assert.isTrue(typeof obj.sayHi === 'function')
    })
})