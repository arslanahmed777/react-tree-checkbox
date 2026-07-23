import React, { useRef, useState } from "react";
import TreeView from "react-tree-checkbox";
import { basicNodes } from "../data/basicNodes";
import ExampleSection from "./ExampleSection";

const code = `const treeRef = useRef(null);

<TreeView
  ref={treeRef}
  allowAdd
  allowEdit
  allowDelete
  handleAddNode={(nodeId) => {
    treeRef.current.addNewNode(nodeId, {
      text: "New Node",
      value: "new-node",
    });
  }}
  handleEditNode={(node) => {
    treeRef.current.editNode(node.id, {
      text: \`\${node.text} (edited)\`,
      value: \`\${node.value || node.text}-edited\`,
    });
  }}
/>`;

export default function CrudExample() {
  const treeRef = useRef(null);
  const [nodes, setNodes] = useState(basicNodes);
  const [expanded, setExpanded] = useState([1, 2]);
  const [log, setLog] = useState("Hover a node to add, edit, or delete.");

  return (
    <ExampleSection
      id="crud"
      title="Add / Edit / Delete Example"
      description="Enable allowAdd, allowEdit, and allowDelete. Use ref methods addNewNode and editNode after your own UI flow. Omit handleDeleteNode to use built-in local delete."
      code={code}
    >
      <p className="exampleLog">{log}</p>
      <TreeView
        ref={treeRef}
        filternodes={nodes}
        expanded={expanded}
        handleExpand={setExpanded}
        changeState={setNodes}
        allowAdd
        allowEdit
        allowDelete
        handleAddNode={(nodeId) => {
          setLog(`Add clicked for nodeId=${nodeId}`);
          treeRef.current.addNewNode(nodeId, {
            text: "New Node",
            value: `new-node-${Date.now()}`,
          });
        }}
        handleEditNode={(node) => {
          setLog(`Edit clicked for id=${node.id}`);
          treeRef.current.editNode(node.id, {
            text: `${node.text || node.value} (edited)`,
            value: `${node.value || node.text}-edited`,
          });
        }}
      />
    </ExampleSection>
  );
}
