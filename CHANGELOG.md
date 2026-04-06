# Changelog

## 1.3.0

- Added dual-package output in `dist/`:
  - `dist/index.esm.js` for ESM consumers
  - `dist/index.cjs.js` for CJS consumers
- Fixed default export interop so package resolves to the `TreeView` component function in both import and require usage.
- Added package `exports` map with explicit `import` and `require` targets.
- Moved React runtime packages to `peerDependencies` (`react`, `react-dom`) so host apps provide them.
- Added local interop verification script: `npm run verify:interop`.
