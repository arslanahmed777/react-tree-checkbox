import React, { useState } from "react";
import TreeView from "react-tree-checkbox";
import ExampleSection from "./ExampleSection";

const initial = [
  {
    id: 1,
    text: "Remote root",
    value: "root",
    status: false,
    nodes: [
      {
        id: 2,
        text: "Lazy folder (expand to load)",
        value: "lazy",
        status: false,
        nodes: [],
        lazy: true,
      },
      {
        id: 3,
        text: "Already loaded",
        value: "ready",
        status: false,
        nodes: [
          { id: 4, text: "Child A", value: "a", status: false, nodes: [] },
        ],
      },
    ],
  },
];

const code = `const onExpandedChange = async (ids) => {
  setExpanded(ids);
  if (ids.includes(lazyId) && !loaded) {
    const children = await fetchChildren();
    setNodes(attachChildren(nodes, lazyId, children));
  }
};`;

function attachChildren(list, parentId, children) {
  return list.map((node) => {
    if (node.id === parentId) {
      return { ...node, lazy: false, nodes: children };
    }
    if (node.nodes?.length) {
      return { ...node, nodes: attachChildren(node.nodes, parentId, children) };
    }
    return node;
  });
}

export default function LazyLoadExample() {
  const [nodes, setNodes] = useState(initial);
  const [expanded, setExpanded] = useState([1]);
  const [loading, setLoading] = useState(false);

  const handleExpandedChange = (ids) => {
    setExpanded(ids);
    const lazyNode = nodes[0]?.nodes?.find((n) => n.lazy);
    if (!lazyNode || !ids.includes(lazyNode.id)) return;

    setLoading(true);
    window.setTimeout(() => {
      setNodes((prev) =>
        attachChildren(prev, lazyNode.id, [
          { id: 101, text: "Fetched one", value: "f1", status: false, nodes: [] },
          { id: 102, text: "Fetched two", value: "f2", status: false, nodes: [] },
        ])
      );
      setLoading(false);
    }, 600);
  };

  return (
    <ExampleSection
      id="lazy"
      title="Lazy loading"
      description="Load children when a node expands. The tree stays controlled; your app fetches and merges nodes."
      code={code}
    >
      {loading ? <p className="demoHint">Loading children…</p> : null}
      <TreeView
        nodes={nodes}
        onNodesChange={setNodes}
        expanded={expanded}
        onExpandedChange={handleExpandedChange}
      />
    </ExampleSection>
  );
}
