import React, { useState } from "react";
import TreeView from "react-tree-checkbox";
import { basicNodes } from "../data/basicNodes";
import ExampleSection from "./ExampleSection";

const code = `const [nodes, setNodes] = useState(basicNodes);
const [expanded, setExpanded] = useState([1, 2]);

<TreeView
  filternodes={nodes}
  expanded={expanded}
  handleExpand={setExpanded}
  changeState={setNodes}
/>`;

export default function BasicExample() {
  const [nodes, setNodes] = useState(basicNodes);
  const [expanded, setExpanded] = useState([1, 2]);

  return (
    <ExampleSection
      id="basic"
      title="Basic Example"
      description="Start with a simple checkbox tree. Parent and child check states update through changeState."
      code={code}
    >
      <TreeView
        filternodes={nodes}
        expanded={expanded}
        handleExpand={setExpanded}
        changeState={setNodes}
      />
    </ExampleSection>
  );
}
