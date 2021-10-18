const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

const code = `let a = 5;let b = 'string'`;
const ast = parser.parse(code, { sourceType: "module" });

traverse(ast, {
    enter: item => {
        if(item.node.type === 'VariableDeclaration'){
            if(item.node.kind === 'let'){
                item.node.kind = 'var'
            }
        }
    }
});

let newCode = generator(ast,{},code)
console.log(newCode.code)
// node -r ts-node src/前端剑指offer/webpack/webpack-demo/let_to_var.ts
