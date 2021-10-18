# webpack 专精

## 先从 babel 说起

1. babel 的原理

   - parse 把代码 code 变为 AST

   * traverse 遍历 AST 进行修改
   * generate 把 AST 变为 newCode

   即 code -> AST -> AST2 -> newCode
