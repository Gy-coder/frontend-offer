function currify(fn,params = []){
    return function(...args){
        if(params.length + args.length === fn.length){
            return fn(...params,...args)
        }else{
            return currify(fn,[...params,...args])
        }
    }
}


module.exports = currify