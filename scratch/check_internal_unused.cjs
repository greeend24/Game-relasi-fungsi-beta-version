const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const srcDir = path.resolve(__dirname, '..', 'src');

function getAllFiles(dir) {
  let res = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) res = res.concat(getAllFiles(full));
    else if (['.js', '.jsx'].includes(path.extname(e.name))) res.push(full);
  }
  return res;
}

const allFiles = getAllFiles(srcDir);
const unusedFunctionsList = [];

for (const file of allFiles) {
  const rel = path.relative(srcDir, file);
  const code = fs.readFileSync(file, 'utf8');
  let ast;
  try {
    ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
  } catch (e) { continue; }

  traverse(ast, {
    Program(progPath) {
      for (const [name, binding] of Object.entries(progPath.scope.bindings)) {
        // Check functions declared at module level: function xxx() or const xxx = () => / function
        let isFunc = false;
        if (binding.path.isFunctionDeclaration()) {
          isFunc = true;
        } else if (binding.path.isVariableDeclarator()) {
          const init = binding.path.node.init;
          if (init && (init.type === 'ArrowFunctionExpression' || init.type === 'FunctionExpression')) {
            isFunc = true;
          }
        }

        if (isFunc) {
          const isExported = binding.path.parentPath?.isExportNamedDeclaration?.() ||
                             binding.path.parentPath?.isExportDefaultDeclaration?.();
          if (!isExported && !binding.referenced) {
            unusedFunctionsList.push({
              file: rel,
              name,
              line: binding.identifier.loc?.start.line,
              type: 'module-level function'
            });
          }
        }
      }
    },
    // Also check functions declared inside components
    Function(funcPath) {
      if (!funcPath.scope) return;
      for (const [name, binding] of Object.entries(funcPath.scope.bindings)) {
        let isFunc = false;
        if (binding.path.isFunctionDeclaration()) {
          isFunc = true;
        } else if (binding.path.isVariableDeclarator()) {
          const init = binding.path.node.init;
          if (init && (init.type === 'ArrowFunctionExpression' || init.type === 'FunctionExpression')) {
            isFunc = true;
          }
        }
        if (isFunc && !binding.referenced) {
          unusedFunctionsList.push({
            file: rel,
            name,
            line: binding.identifier.loc?.start.line,
            type: 'inner function'
          });
        }
      }
    }
  });
}

console.log(JSON.stringify(unusedFunctionsList, null, 2));
