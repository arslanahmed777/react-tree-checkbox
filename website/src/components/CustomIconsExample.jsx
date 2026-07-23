import React, { useState } from "react";
import TreeView from "react-tree-checkbox";
import { basicNodes } from "../data/basicNodes";
import ExampleSection from "./ExampleSection";

const code = `<TreeView
  filternodes={nodes}
  expanded={expanded}
  handleExpand={setExpanded}
  changeState={setNodes}
  icons={{
    expandIcon: "▾",
    compressIcon: "▸",
    deleteIcon: "×",
    addIcon: "+",
    editIcon: "✎",
  }}
/>`;

export default function CustomIconsExample() {
  const [nodes, setNodes] = useState(basicNodes);
  const [expanded, setExpanded] = useState([1]);

  return (
    <ExampleSection
      id="custom-icons"
      title="Custom Icons Example"
      description="Replace default SVG icons with your own React nodes or emoji-style markers."
      code={code}
    >
      <TreeView
        filternodes={nodes}
        expanded={expanded}
        handleExpand={setExpanded}
        changeState={setNodes}
        icons={{
          expandIcon: <span className="demoIcon">▾</span>,
          compressIcon: <span className="demoIcon">▸</span>,
          deleteIcon: <span className="demoIcon">×</span>,
          addIcon: <span className="demoIcon">+</span>,
          editIcon: <span className="demoIcon">✎</span>,
        }}
      />
    </ExampleSection>
  );
}
