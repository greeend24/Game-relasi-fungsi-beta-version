const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const srcDir = path.resolve(__dirname, '..', 'src');

function getAllFiles(dir, exts = ['.js', '.jsx']) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(full, exts));
    } else if (exts.includes(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

const allFiles = getAllFiles(srcDir);
const results = [];

for (const filePath of allFiles) {
  const relPath = path.relative(srcDir, filePath);
  const code = fs.readFileSync(filePath, 'utf8');

  let ast;
  try {
    ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
  } catch (err) {
    console.error(`[Error parsing ${relPath}]:`, err.message);
    continue;
  }

  const unusedImports = [];
  const unusedFunctions = [];

  traverse(ast, {
    Program(progPath) {
      const bindings = progPath.scope.bindings;
      for (const [name, binding] of Object.entries(bindings)) {
        // Check if binding is an import
        if (binding.kind === 'module') {
          if (!binding.referenced) {
            // Note: React might be needed for JSX in older setups, but in Vite/React 17+ jsx-runtime it's not strictly needed unless JSX pragma used.
            // Still, let's report React as unused if not used.
            unusedImports.push({
              name,
              line: binding.identifier.loc?.start.line,
              source: binding.path.parentPath?.node?.source?.value || '',
            });
          }
        }
        // Check if binding is a local function declaration that isn't exported and isn't referenced
        else if (binding.path.isFunctionDeclaration()) {
          const isExported = binding.path.parentPath.isExportNamedDeclaration() ||
                             binding.path.parentPath.isExportDefaultDeclaration();
          if (!isExported && !binding.referenced) {
            unusedFunctions.push({
              name,
              line: binding.identifier.loc?.start.line,
            });
          }
        }
      }
    },
  });

  if (unusedImports.length > 0 || unusedFunctions.length > 0) {
    results.push({
      file: relPath,
      unusedImports,
      unusedFunctions,
    });
  }
}

fs.writeFileSync(path.join(__dirname, 'unused_report.json'), JSON.stringify(results, null, 2));
console.log(`Report generated with ${results.length} files containing unused items.`);
