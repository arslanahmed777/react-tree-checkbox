import React from "react";
import TreeView from "react-tree-checkbox";
import { basicNodes } from "../data/basicNodes";
import ExampleSection from "./ExampleSection";

const code = `<TreeView
  defaultNodes={basicNodes}
  defaultExpanded={[1, 2]}
/>`;

export default function UncontrolledExample() {
  return (
    <ExampleSection
      id="uncontrolled"
      title="Uncontrolled"
      description="Pass defaultNodes and defaultExpanded and let the tree manage its own state. Use onNodesChange / onExpandedChange if you still want to observe updates."
      code={code}
    >
      <TreeView defaultNodes={basicNodes} defaultExpanded={[1, 2]} />
    </ExampleSection>
  );
}
