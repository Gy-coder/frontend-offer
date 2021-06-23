class EventHub {
  private cache: { [K: string]: Array<Function> } = {}; // {name:[fn1,fn2,fn3]}
  on(name: string, fn: Function) {
    this.cache[name] = this.cache[name] || [];
    this.cache[name].push(fn);
  }
  emit(name: string, data?) {
    (this.cache[name] || []).forEach((fn) => {
      fn(data);
    });
  }
  off(name: string, fn: Function) {
    let index = indexOf(this.cache[name], fn);
    if (index === -1) {
      return;
    }
    this.cache[name].splice(index, 1);
  }
}

export default EventHub;

/**
 * 辅助函数indexOf
 * @param arr : Array<any>
 * @param item : any
 * @return number
 */

function indexOf(arr: Array<any>, item: any) {
  if (arr === undefined) return -1;
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      index = i;
      break;
    }
  }
  return index;
}
