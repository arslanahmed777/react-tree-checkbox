import React, { useState } from "react";
import TreeView from "react-tree-checkbox";
import {
  FiChevronDown,
  FiChevronRight,
  FiPlus,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { basicNodes } from "../data/basicNodes";
import ExampleSection from "./ExampleSection";

const code = `import {
  FiChevronDown,
  FiChevronRight,
  FiPlus,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

<TreeView
  filternodes={nodes}
  expanded={expanded}
  handleExpand={setExpanded}
  changeState={setNodes}
  icons={{
    expandIcon: <FiChevronDown />,
    compressIcon: <FiChevronRight />,
    deleteIcon: <FiTrash2 />,
    addIcon: <FiPlus />,
    editIcon: <FiEdit2 />,
  }}
/>`;

export default function CustomIconsExample() {
  const [nodes, setNodes] = useState(basicNodes);
  const [expanded, setExpanded] = useState([1]);

  return (
    <ExampleSection
      id="custom-icons"
      title="Custom Icons Example"
      description="Replace default SVG icons with your own React nodes, like icons from react-icons."
      code={code}
    >
      <TreeView
        filternodes={nodes}
        expanded={expanded}
        handleExpand={setExpanded}
        changeState={setNodes}
        icons={{
          expandIcon: <FiChevronDown className="demoIcon" />,
          compressIcon: <FiChevronRight className="demoIcon" />,
          deleteIcon: <FiTrash2 className="demoIcon" />,
          addIcon: <FiPlus className="demoIcon" />,
          editIcon: <FiEdit2 className="demoIcon" />,
        }}
      />
    </ExampleSection>
  );
}
