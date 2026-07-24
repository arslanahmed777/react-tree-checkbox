import React, { useState } from "react";
import TreeView from "react-tree-checkbox";
import ExampleSection from "./ExampleSection";

const disabledNodes = [
  {
    id: 1,
    text: "Workspace",
    value: "workspace",
    status: false,
    nodes: [
      {
        id: 2,
        text: "Editable folder",
        value: "editable",
        status: false,
        nodes: [
          { id: 3, text: "Read-only file", value: "ro", status: false, disabled: true, nodes: [] },
          { id: 4, text: "Writable file", value: "rw", status: false, nodes: [] },
        ],
      },
      {
        id: 5,
        text: "Locked folder",
        value: "locked",
        status: true,
        disabled: true,
        nodes: [
          { id: 6, text: "Locked child", value: "locked-child", status: true, disabled: true, nodes: [] },
        ],
      },
    ],
  },
];

const code = `<TreeView
  nodes={nodes}
  onNodesChange={setNodes}
  expanded={expanded}
  onExpandedChange={setExpanded}
  // or: isNodeDisabled={(node) => node.value === "ro"}
/>`;

export default function DisabledExample() {
  const [nodes, setNodes] = useState(disabledNodes);
  const [expanded, setExpanded] = useState([1, 2, 5]);

  return (
    <ExampleSection
      id="disabled"
      title="Disabled nodes"
      description="Set disabled: true on a node (or pass isNodeDisabled) to block check and action interactions."
      code={code}
    >
      <TreeView
        nodes={nodes}
        onNodesChange={setNodes}
        expanded={expanded}
        onExpandedChange={setExpanded}
      />
    </ExampleSection>
  );
}
