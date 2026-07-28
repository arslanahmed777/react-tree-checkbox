import { useCallback, useState } from "react";
import { findNodeById } from "../utils/findNode.js";
import { updateNodeStatus } from "../utils/updateNodeStatus.js";

/**
 * Controlled or uncontrolled tree node data + checkbox updates.
 * @param {{
 *   nodes?: Array,
 *   defaultNodes?: Array,
 *   onNodesChange?: (nodes: Array, changedNode?: object|null) => void,
 * }} options
 */
export function useTreeSelection({
  nodes: nodesProp,
  defaultNodes = [],
  onNodesChange,
}) {
  const isControlled = nodesProp != null;
  const [uncontrolled, setUncontrolled] = useState(defaultNodes);
  const nodes = isControlled ? nodesProp : uncontrolled;

  const setNodes = useCallback(
    (next, changedNode) => {
      const value = typeof next === "function" ? next(nodes) : next;
      if (!isControlled) {
        setUncontrolled(value);
      }
      if (typeof onNodesChange === "function") {
        onNodesChange(value, changedNode);
      }
    },
    [nodes, isControlled, onNodesChange]
  );

  const setNodeChecked = useCallback(
    (id, checked) => {
      const value = updateNodeStatus(nodes, id, checked);
      const changedNode = findNodeById(value, id);
      setNodes(value, changedNode);
    },
    [nodes, setNodes]
  );

  return { nodes, setNodes, setNodeChecked, isControlled };
}
