const fs = require("node:fs");
const path = require("node:path");

const distDir = path.resolve(__dirname, "..", "dist");
const cjsEntryFile = path.join(distDir, "index.cjs.js");

const cjsInteropSource = `"use strict";

const treeView = require("./index.cjs.bundle.js");
module.exports = treeView;
module.exports.default = treeView;
`;

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(cjsEntryFile, cjsInteropSource, "utf8");
console.log("Created CJS interop entry:", cjsEntryFile);
