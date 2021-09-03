var slice = Array.prototype.slice
function bind1(){
   var fn = this
    if(typeof fn !== 'function'){
        throw new Error('调用bind的必须是函数')
    }
    const asThis = arguments[0]
    var args = slice.call(arguments,1)
    function resultFn(){
        var args2 = slice.call(arguments,0)
        return fn.apply(
                this instanceof resultFn  ? this :  asThis,
                args.concat(args2)
            )
    }
    // resultFn.prototype = fn.prototype
    return resultFn
}


/* 
var slice = Array.prototype.slice
function bind1(){
   var fn = this
    if(typeof fn !== 'function'){
        throw new Error('调用bind的必须是函数')
    }
    const asThis = arguments[0]
    var args = slice.call(arguments,1)
    return function(){
        var args2 = slice.call(arguments,0)
        return fn.apply(asThis,args.concat(args2))
    }
}
*/

/*
function _bind1(asThis,...args){
    const fn = this
    return function(...arg2){
        return fn.call(asThis,...args,...arg2)
    }
}
*/
module.exports = bind1

if(!Function.prototype.bind){
    Function.prototype.bind = bind1
}

// fn.bind(asthis,p1,p2) => fn.bind.call(fn,asthis,p1,p2) => this === fn