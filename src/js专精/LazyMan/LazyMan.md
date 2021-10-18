# LazyMan

## LazyMan介绍

LazyMan 可以被如下调用

```
实现一个LazyMan，可以按照以下方式调用:
LazyMan(“Hank”)输出:
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
以此类推。
```


## 代码

```js
function LazyMan(name){
  let queue = []
  let next = ()=>{
    const first = queue.shift()
    first?.()
  }
  const task = ()=>{
    console.log(`Hello I am ${name}`)
    next()
  }
  queue.push(task)
  let api = {
    eat(type){
      const task = ()=>{
        console.log(`I am eating,it's ${type === 'lunch' ? 'lunch' : 'dinner'}`)
        next()
      }
      queue.push(task)
      return api
    },
    sleep(time){
      const task = ()=>{
        setTimeout(()=>{
          console.log(`I wake up, I sleep ${time}s`)
          next()
        },time * 1000)
      }
      queue.push(task)
      return api
    },
    sleepFirst(time){
      const task = ()=>{
        setTimeout(()=>{
          console.log(`I wake up, I sleep ${time} s`)
          next()
        },time * 1000)
      }
      queue.unshift(task)
      return api
    },
  }
  setTimeout(next)
  return api
}

LazyMan('jack').sleepFirst(5).eat('lunch').sleep(3).eat('dinner')
```



[LazyMan体验](https://stackblitz.com/edit/js-kge3vv)