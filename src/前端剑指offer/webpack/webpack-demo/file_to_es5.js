const parser = require("@babel/parser");
const babel = require('@babel/core')
const fs = require('fs')

let code = fs.readFileSync('./test.js').toString()
const ast = parser.parse(code,{sourceType: 'module'})
const result = babel.transformFromAstSync(ast,code,{
  presets: ['@babel/preset-env']
})

fs.writeFileSync('./test.es5.js',result.code)

