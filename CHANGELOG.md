# Changelog

## 1.4.1

- Added edit support with `allowEdit`, `handleEditNode`, and `editIcon`.
- Exposed `editNode(nodeId, obj)` on the component ref (alongside existing `addNewNode`).
- Added optional `handleDeleteNode` callback; when omitted, package still deletes locally.
- Node label now prefers `value` and falls back to `text`.
- Updated TypeScript declarations and README for the new API.
- Added GitHub Pages demo website under `website/` with interactive examples (`docs:dev`, `docs:build`, `docs:deploy`).

## 1.3.1

- Added bundled TypeScript declarations via `index.d.ts`.
- Added `types` field and `exports.types` mapping in `package.json` to remove TS7016 warnings for consumers.

## 1.3.0

- Added dual-package output in `dist/`:
  - `dist/index.esm.js` for ESM consumers
  - `dist/index.cjs.js` for CJS consumers
- Fixed default export interop so package resolves to the `TreeView` component function in both import and require usage.
- Added package `exports` map with explicit `import` and `require` targets.
- Moved React runtime packages to `peerDependencies` (`react`, `react-dom`) so host apps provide them.
- Added local interop verification script: `npm run verify:interop`.
