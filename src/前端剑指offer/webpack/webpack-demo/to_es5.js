const parser = require("@babel/parser");
const babel = require('@babel/core')

let code = `let a = 1;let b = 2;const c = 3`;
const ast = parser.parse(code,{sourceType: 'module'})
const result = babel.transformFromAstSync(ast,code,{
  presets: ['@babel/preset-env']
})

console.log(result.code)

