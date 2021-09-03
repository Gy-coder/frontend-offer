# 手写bind

## 第一版

新语法 不支持ie

```js
function bind1(asThis,...args){
    const fn = this
    return function(...arg2){
        return fn.call(asThis,...args,...arg2)
    }
}
```

## 第二版

不支持new

```js
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
```


### 第三版

支持new

```js
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
    resultFn.prototype = fn.prototype
    return resultFn
}
```

## 小问题

1. 如何判断是不是new 调用的

    ```js
    this instanceof resultFn
    ```


2. 如何在新对象上绑定原型

    ```js
    resultFn.prototype = fn.prototype
    ```