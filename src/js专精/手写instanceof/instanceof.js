function myInstanceOf(target, targetConstructor) {
  if (typeof targetConstructor !== "function" || !targetConstructor) {
    throw new Error("targetConstructor应该是一个函数");
  }
  if (!target || (typeof target !== "object" && typeof target !== "function")) {
    return false;
  }
  while (target.__proto__) {
    if (target.__proto__ === targetConstructor.prototype) {
      return true;
    }
    target = target.__proto__;
  }
  return false;
}

module.exports = myInstanceOf;
