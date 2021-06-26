class DeepClone {
  constructor() {
    this.cache = [];
  }
  clone(source) {
    if (source instanceof Object) {
      let cacheDist = this.findCache(source);
      if (cacheDist) {
        return cacheDist;
      } else {
        let dist;
        if (source instanceof Array) {
          dist = new Array();
        } else if (source instanceof Function) {
          dist = function () {
            return source.call(this, ...arguments);
          };
        } else if (source instanceof RegExp) {
          dist = new RegExp(source.source, source.flags);
        } else if (source instanceof Date) {
          dist = new Date(source);
        } else {
          dist = new Object();
        }
        this.cache.push({ source, dist });
        for (let key in source) {
          if (source.hasOwnProperty(key)) {
            dist[key] = this.clone(source[key]);
          }
        }
        return dist;
      }
    }
    return source;
  }

  findCache(source) {
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i].source === source) {
        return this.cache[i].dist;
      }
    }
    return undefined;
  }
}

module.exports = DeepClone;
