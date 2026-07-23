import React, { useState } from "react";
import TreeView from "react-tree-checkbox";
import { basicNodes } from "../data/basicNodes";
import ExampleSection from "./ExampleSection";

const code = `<TreeView
  filternodes={nodes}
  expanded={expanded}
  handleExpand={setExpanded}
  changeState={setNodes}
  onNodeClick={(result) => console.log(result)}
  onNodeClickOptions={{
    allowExpand: true,
    key: "text",
    delimiter: "/",
  }}
/>`;

export default function NodeClickExample() {
  const [nodes, setNodes] = useState(basicNodes);
  const [expanded, setExpanded] = useState([1]);
  const [clicked, setClicked] = useState(null);

  return (
    <ExampleSection
      id="node-click"
      title="Clickable Labels Example"
      description="Use onNodeClick to receive path and node data. enable allowExpand to expand while clicking labels."
      code={code}
    >
      <p className="exampleLog">
        {clicked
          ? `path: ${clicked.path} | id: ${clicked.node.id}`
          : "Click a node label to see its path."}
      </p>
      <TreeView
        filternodes={nodes}
        expanded={expanded}
        handleExpand={setExpanded}
        changeState={setNodes}
        onNodeClick={(result) => setClicked(result)}
        onNodeClickOptions={{
          allowExpand: true,
          key: "text",
          delimiter: "/",
        }}
      />
    </ExampleSection>
  );
}
