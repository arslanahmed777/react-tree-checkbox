import React, { useState } from "react";
import TreeView from "react-tree-checkbox";
import { basicNodes } from "../data/basicNodes";
import ExampleSection from "./ExampleSection";

const code = `<TreeView
  nodes={nodes}
  expanded={expanded}
  onExpandedChange={setExpanded}
  onNodesChange={setNodes}
  allowCheck={false}
/>`;

export default function HideCheckboxesExample() {
  const [nodes, setNodes] = useState(basicNodes);
  const [expanded, setExpanded] = useState([1, 2]);

  return (
    <ExampleSection
      id="hide-checkboxes"
      title="Hide Checkboxes Example"
      description="Pass allowCheck={false} to use the component as a plain expandable tree."
      code={code}
    >
      <TreeView
        nodes={nodes}
        expanded={expanded}
        onExpandedChange={setExpanded}
        onNodesChange={setNodes}
        allowCheck={false}
      />
    </ExampleSection>
  );
}
