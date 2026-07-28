# react-tree-checkbox

Accessible React checkbox tree with cascading selection, keyboard navigation, custom icons, and optional CRUD helpers.

## Installation

```bash
npm i react-tree-checkbox
```

Peer dependencies: `react` and `react-dom` (>= 16.8).

## Demo

[https://arslanahmed777.github.io/react-tree-checkbox](https://arslanahmed777.github.io/react-tree-checkbox)

```bash
npm run docs:dev
```

## Quick start (controlled)

```jsx
import { useState } from "react";
import TreeView from "react-tree-checkbox";

const initial = [
  {
    id: 1,
    text: "Animals",
    value: "animals",
    status: false,
    nodes: [
      { id: 2, text: "Cat", value: "cat", status: false, nodes: [] },
      { id: 3, text: "Dog", value: "dog", status: false, nodes: [] },
    ],
  },
];

export default function App() {
  const [nodes, setNodes] = useState(initial);
  const [expanded, setExpanded] = useState([1]);

  return (
    <TreeView
      nodes={nodes}
      onNodesChange={setNodes}
      expanded={expanded}
      onExpandedChange={setExpanded}
    />
  );
}
```

## Uncontrolled

```jsx
<TreeView defaultNodes={initial} defaultExpanded={[1]} />
```

## Node shape

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string \| number` | Required unique id |
| `text` | `ReactNode` | Display label (preferred) |
| `value` | `string` | Data / path field |
| `status` | `boolean` | Checked state |
| `disabled` | `boolean` | Blocks interaction |
| `nodes` | `TreeNodeData[]` | Children (use `[]` for leaves) |

Extra keys are preserved.

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `nodes` | `TreeNodeData[]` | — | Controlled data |
| `defaultNodes` | `TreeNodeData[]` | `[]` | Uncontrolled initial data |
| `onNodesChange` | `(nodes, changedNode?) => void` | — | Data updates; `changedNode` is the toggled/deleted node when applicable |
| `expanded` | `Array<id>` | — | Controlled expansion |
| `defaultExpanded` | `Array<id>` | `[]` | Uncontrolled expansion |
| `onExpandedChange` | `(ids) => void` | — | Expansion updates |
| `allowCheck` | `boolean` | `true` | Show checkboxes |
| `allowAdd` / `allowEdit` / `allowDelete` | `boolean` | `false` | CRUD action buttons |
| `handleAddNode` | `(node) => void` | — | Add action (receives **node**) |
| `handleEditNode` | `(node) => void` | — | Edit action |
| `handleDeleteNode` | `(node) => void` | — | Delete action; if omitted, deletes locally |
| `onNodeClick` | `(result) => void` | — | `{ path, node }` |
| `onNodeClickOptions` | `object` | `{ allowExpand: false, key: "text", delimiter: "/" }` | Path building |
| `icons` | `TreeIcons` | built-ins | Custom expand / CRUD icons |
| `getLabel` | `(node) => ReactNode` | prefers `text` | Custom label |
| `isNodeDisabled` | `(node) => boolean` | `node.disabled` | Disable predicate |
| `onError` | `(error) => void` | — | Ref validation errors |
| `className` / `style` | — | — | Root element |
| `horizontalSpacing` | `string` | `1.25rem` | Maps to `--rtc-indent` |
| `verticalSpacing` | `string` | `0.15rem` | Maps to `--rtc-row-gap` |
| `borderLeft` | `string` | `none` | Child guide line |

### Deprecated aliases (still work)

| Legacy | Prefer |
|--------|--------|
| `filternodes` | `nodes` |
| `changeState` | `onNodesChange` |
| `handleExpand` | `onExpandedChange` |
| `customStyling` | `style` |
| `column` | CSS / `className` |

## Ref API

```jsx
const ref = useRef(null);

ref.current.addNewNode(parentId, { text: "New" }); // parentId `0` = root
ref.current.editNode(nodeId, { text: "Renamed" });
```

Both return `{ ok, node?, nodes?, error? }` instead of using `alert`.

## Theming

Override CSS variables on the root (or a parent):

```css
.rtc-tree {
  --rtc-indent: 1.5rem;
  --rtc-row-gap: 0.25rem;
  --rtc-guide: 1px solid #d1d5db;
  --rtc-focus-ring: 2px solid #2563eb;
  --rtc-hover-bg: rgba(0, 0, 0, 0.04);
}
```

Styles are injected automatically when you import the package. Class prefix: `rtc-tree`.

## Accessibility

- `role="tree"` / `treeitem` / `group`
- Roving tabindex between visible rows
- Arrow keys, Home/End, Space (toggle check), Enter (node click)
- `aria-expanded`, `aria-checked` (including `mixed` for indeterminate)
- Action buttons visible on `:focus-within`

## Helpers

```js
import {
  getNodePath,
  updateNodeStatus,
  getCheckState,
  filterTree,
  collectNodeIds,
  flattenVisibleNodes,
} from "react-tree-checkbox";
```

## FAQ

**Why did my label change in v2?**  
Labels prefer `text` over `value`. Use `getLabel={(n) => n.value}` if you need the old behavior.

**Does it virtualize large trees?**  
No. Mid-sized trees are fine; very large lists should be filtered or paginated by the host app.

**Can I use it without checkboxes?**  
Yes — `allowCheck={false}`.

## Migration guide (1.x → 2.0)

1. Rename props: `filternodes` → `nodes`, `changeState` → `onNodesChange`, `handleExpand` → `onExpandedChange`, `customStyling` → `style` (aliases still work with a console warning).
2. Labels now prefer `text`. Update data or pass `getLabel`.
3. `handleAddNode` receives the **node object** (not an id). Types now match runtime.
4. `addText` / root add UI was removed in 1.x already — use `ref.addNewNode(0, { text })` or your own button.
5. Ref CRUD no longer calls `alert`; handle `onError` or the returned `{ ok, error }`.
6. Tree updates are immutable — always use the array returned by `onNodesChange`.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | ESM + CJS bundles |
| `npm test` | Unit tests + interop verify |
| `npm run docs:dev` | Local docs site |

## License

ISC
