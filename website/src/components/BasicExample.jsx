import React, { useState } from "react";
import TreeView from "react-tree-checkbox";
import { basicNodes } from "../data/basicNodes";
import ExampleSection from "./ExampleSection";

const code = `const [nodes, setNodes] = useState(basicNodes);
const [expanded, setExpanded] = useState([]);

<TreeView
  nodes={nodes}
  onNodesChange={setNodes}
  expanded={expanded}
  onExpandedChange={setExpanded}
/>`;

export default function BasicExample() {
  const [nodes, setNodes] = useState(basicNodes);
  const [expanded, setExpanded] = useState([]);

  return (
    <ExampleSection
      id="basic"
      title="Basic / Controlled"
      description="Fully controlled tree: you own nodes and expanded state. Parent checks cascade to children with indeterminate parents."
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
