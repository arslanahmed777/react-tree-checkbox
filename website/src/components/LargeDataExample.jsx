import React, { useMemo, useState } from "react";
import TreeView from "react-tree-checkbox";
import largeNodes from "../../../nodes.js";
import ExampleSection from "./ExampleSection";

const code = `import largeNodes from "./nodes";

<TreeView
  filternodes={nodes}
  expanded={expanded}
  handleExpand={setExpanded}
  changeState={setNodes}
/>`;

export default function LargeDataExample() {
  const initialNodes = useMemo(() => structuredClone(largeNodes), []);
  const [nodes, setNodes] = useState(initialNodes);
  const [expanded, setExpanded] = useState([]);

  return (
    <ExampleSection
      id="large-data"
      title="Large Data Example"
      description="The tree can render a deep hierarchy with many nodes in one view."
      code={code}
    >
      <div className="largeTreeWrap">
        <TreeView
          filternodes={nodes}
          expanded={expanded}
          handleExpand={setExpanded}
          changeState={setNodes}
        />
      </div>
    </ExampleSection>
  );
}
