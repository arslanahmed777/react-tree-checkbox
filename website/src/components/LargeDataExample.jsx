import React, { useMemo, useState } from "react";
import TreeView from "react-tree-checkbox";
import largeNodes from "../../../nodes.js";
import ExampleSection from "./ExampleSection";

const code = `import largeNodes from "./nodes";

<TreeView
  nodes={nodes}
  expanded={expanded}
  onExpandedChange={setExpanded}
  onNodesChange={setNodes}
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
          nodes={nodes}
          expanded={expanded}
          onExpandedChange={setExpanded}
          onNodesChange={setNodes}
        />
      </div>
    </ExampleSection>
  );
}
