const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const baselineData = require("../data/baseline.json");

function isSourceCodeFile(fileName) {
  return /\.(js|ts|jsx|tsx)$/.test(fileName) && !fileName.endsWith(".min.js");
}

function scanFile(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  let ast;

  console.log(`📄 Scanning: ${filePath} (${(code.length / 1024).toFixed(1)} KB)`);

  try {
    // Try normal parse
    ast = parser.parse(code, {
      sourceType: "unambiguous",
      plugins: ["jsx", "typescript"]
    });
  } catch (err) {
    // Fallback parser with extended plugins for complex syntax
    try {
      ast = parser.parse(code, {
        sourceType: "script",
        allowReturnOutsideFunction: true,
        plugins: [
          "jsx",
          "typescript",
          "classProperties",
          "optionalChaining",
          "nullishCoalescingOperator",
          "objectRestSpread",
          "dynamicImport",
          "topLevelAwait",
          "decorators-legacy"
        ]
      });
      console.warn(`⚠️ Recovered from parse error in: ${filePath}`);
    } catch (retryErr) {
      console.error(`❌ Could not parse ${filePath}: ${retryErr.message}`);
      return [];
    }
  }

  const results = [];

  traverse(ast, {
    MemberExpression(path) {
      const obj = path.node.object;
      const prop = path.node.property;

      const objName = obj.name || (obj.object && obj.object.name);
      const propName = prop.name;

      if (!objName || !propName) return;

      const featureName = `${objName}.${propName}`;

      if (baselineData[featureName] === false) {
        results.push({
          file: filePath,
          line: path.node.loc?.start.line || '?',
          feature: featureName,
          message: "Not in Baseline"
        });
      }
    }
  });

  return results;
}

function scanDirectory(directoryPath) {
  const results = [];

  const walk = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath); // recursive
      } else if (entry.isFile() && isSourceCodeFile(entry.name)) {
        results.push(...scanFile(fullPath));
      }
    }
  };

  walk(directoryPath);
  return results;
}

async function scanPath(targetPath) {
  const stat = fs.statSync(targetPath);

  if (stat.isFile()) {
    if (!isSourceCodeFile(targetPath)) {
      console.warn(`⚠️ Skipping non-source file: ${targetPath}`);
      return [];
    }
    return scanFile(targetPath);
  }

  if (stat.isDirectory()) {
    return scanDirectory(targetPath);
  }

  throw new Error("Target path is not a file or directory.");
}

module.exports = {
  scanPath
};
