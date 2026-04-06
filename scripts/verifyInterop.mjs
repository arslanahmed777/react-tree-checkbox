import assert from "node:assert/strict";
import { createRequire } from "node:module";

function createMockElement() {
  return {
    children: [],
    styleSheet: {},
    appendChild(child) {
      this.children.push(child);
      child.parentNode = this;
      this.firstChild = this.children[0];
      return child;
    },
    removeChild(child) {
      this.children = this.children.filter((current) => current !== child);
      this.firstChild = this.children[0] || null;
      return child;
    },
    setAttribute() {},
  };
}

const mockHead = createMockElement();
const mockDocument = {
  head: mockHead,
  querySelector(selector) {
    if (selector === "head") {
      return mockHead;
    }
    return null;
  },
  createElement() {
    return createMockElement();
  },
  createTextNode(text) {
    return { textContent: text };
  },
};

globalThis.window = { HTMLIFrameElement: class {} };
globalThis.document = mockDocument;

const { default: treeViewFromImport } = await import("react-tree-checkbox");

const require = createRequire(import.meta.url);
const treeViewFromRequire = require("react-tree-checkbox");

assert.ok(
  treeViewFromImport && ["function", "object"].includes(typeof treeViewFromImport),
  "ESM default import should resolve directly to a React component value"
);

assert.equal(
  treeViewFromImport.default,
  undefined,
  "ESM default import must be component-first, not a namespace wrapper"
);

assert.equal(
  ["function", "object"].includes(typeof treeViewFromRequire),
  true,
  "CJS require should resolve directly to a React component value"
);

assert.equal(
  treeViewFromRequire.default,
  treeViewFromRequire,
  "CJS default should alias module.exports"
);

console.log("Interop verified:");
console.log("- import TreeView from 'react-tree-checkbox' -> component value");
console.log("- const TreeView = require('react-tree-checkbox') -> component value");
