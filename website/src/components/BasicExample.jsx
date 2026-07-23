import React, { useState } from "react";
import TreeView from "react-tree-checkbox";
import { basicNodes } from "../data/basicNodes";
import ExampleSection from "./ExampleSection";

const code = `const [nodes, setNodes] = useState(basicNodes);
const [expanded, setExpanded] = useState([]);
const handleExpand = (newArray) => {
    setExpanded([...newArray]);
  };
  const handleCheck = (treeNodes) => {
    setNodes([...treeNodes]);
  };

<TreeView
  filternodes={nodes}
  expanded={expanded}
  handleExpand={handleExpand}
  changeState={handleCheck}
/>`;

export default function BasicExample() {
  const [nodes, setNodes] = useState(basicNodes);
  const [expanded, setExpanded] = useState([]);
  const handleExpand = (newArray) => {
    setExpanded([...newArray]);
  };
  const handleCheck = (treeNodes) => {
    setNodes([...treeNodes]);
  };
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
        handleExpand={handleExpand}
        changeState={handleCheck}
      />
    </ExampleSection>
  );
}
