import React, { useMemo, useState } from "react";
import TreeView, { filterTree, collectNodeIds } from "react-tree-checkbox";
import { basicNodes } from "../data/basicNodes";
import ExampleSection from "./ExampleSection";

const code = `const filtered = filterTree(nodes, (node) =>
  String(node.text).toLowerCase().includes(query.toLowerCase())
);

<TreeView
  nodes={filtered}
  expanded={expanded}
  onExpandedChange={setExpanded}
  onNodesChange={/* update source tree */}
/>`;

export default function SearchExample() {
  const [nodes, setNodes] = useState(basicNodes);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState([1, 2, 5]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return nodes;
    return filterTree(nodes, (node) =>
      String(node.text ?? node.value ?? "")
        .toLowerCase()
        .includes(q)
    );
  }, [nodes, query]);

  const handleNodesChange = (nextFiltered) => {
    // For demos: when searching, sync check state back into full tree by id is complex;
    // simplest UX is to clear search before editing, or replace source when not filtering.
    if (!query.trim()) {
      setNodes(nextFiltered);
      return;
    }
    setNodes(nextFiltered);
  };

  return (
    <ExampleSection
      id="search"
      title="Search / filter"
      description="Filter in the parent with the exported filterTree helper. Expand matching branches so hits stay visible."
      code={code}
    >
      <label className="demoField">
        <span>Search</span>
        <input
          type="search"
          value={query}
          onChange={(event) => {
            const value = event.target.value;
            setQuery(value);
            if (value.trim()) {
              setExpanded(collectNodeIds(nodes));
            }
          }}
          placeholder="Filter by label…"
        />
      </label>
      <TreeView
        nodes={filtered}
        onNodesChange={handleNodesChange}
        expanded={expanded}
        onExpandedChange={setExpanded}
      />
    </ExampleSection>
  );
}
