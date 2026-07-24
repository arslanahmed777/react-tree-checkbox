import { useState } from "react";
import TreeView, { collectNodeIds } from "react-tree-checkbox";
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";
import nodesData from "../../../nodes";
import ExampleSection from "./ExampleSection";

const code = `import TreeView, { collectNodeIds } from "react-tree-checkbox";

const [nodes, setNodes] = useState(nodesData);
const [expanded, setExpanded] = useState([]);

const handleExpandAll = () => {
  setExpanded(collectNodeIds(nodes));
};

const handleCollapseAll = () => {
  setExpanded([]);
};

<>
  <button type="button" onClick={handleExpandAll}>Expand All</button>
  <button type="button" onClick={handleCollapseAll}>Collapse All</button>
  <TreeView
    nodes={nodes}
    onNodesChange={setNodes}
    expanded={expanded}
    onExpandedChange={setExpanded}
  />
</>`;

export default function ExpandAllCollapseAllExample() {
  const [nodes, setNodes] = useState(nodesData);
  const [expanded, setExpanded] = useState([]);

  const handleExpandAll = () => {
    setExpanded(collectNodeIds(nodes));
  };

  const handleCollapseAll = () => {
    setExpanded([]);
  };

  return (
    <ExampleSection
      id="expand-all-collapse-all"
      title="Expand All / Collapse All"
      description="Own the expanded id array in your app. Use the exported collectNodeIds helper to open every branch, or pass [] to collapse."
      code={code}
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <TreeView
            nodes={nodes}
            onNodesChange={setNodes}
            expanded={expanded}
            onExpandedChange={setExpanded}
            allowCheck
            column={12}
          />
        </div>
        <div className="col-span-4 flex flex-col gap-2">
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white outline-none transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleExpandAll}
          >
            <FaRegSquarePlus className="size-4" />
            Expand All
          </button>
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white outline-none transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleCollapseAll}
          >
            <FaRegSquareMinus className="size-4" />
            Collapse All
          </button>
        </div>
      </div>
    </ExampleSection>
  );
}
