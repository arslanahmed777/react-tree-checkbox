import React, { useState } from "react";
import TreeView from "react-tree-checkbox";
import { basicNodes } from "../data/basicNodes";
import ExampleSection from "./ExampleSection";

const code = `<TreeView
  nodes={nodes}
  expanded={expanded}
  onExpandedChange={setExpanded}
  onNodesChange={setNodes}
  column={6}
  horizontalSpacing="28px"
  verticalSpacing="8px"
  borderLeft="1px solid #cbd5e1"
  style={{
    padding: "12px",
    background: "#f8fafc",
  }}
/>`;

export default function StylingExample() {
  const [nodes, setNodes] = useState(basicNodes);
  const [expanded, setExpanded] = useState([1, 2]);

  return (
    <ExampleSection
      id="styling"
      title="Spacing & Columns Example"
      description="Control layout with column, horizontalSpacing, verticalSpacing, borderLeft, and style."
      code={code}
    >
      <TreeView
        nodes={nodes}
        expanded={expanded}
        onExpandedChange={setExpanded}
        onNodesChange={setNodes}
        column={6}
        horizontalSpacing="28px"
        verticalSpacing="8px"
        borderLeft="1px solid #cbd5e1"
        style={{
          padding: "12px",
          background: "#f8fafc",
        }}
      />
    </ExampleSection>
  );
}
