import { useCallback, useState } from "react";
import { updateNodeStatus } from "../utils/updateNodeStatus.js";

/**
 * Controlled or uncontrolled tree node data + checkbox updates.
 * @param {{
 *   nodes?: Array,
 *   defaultNodes?: Array,
 *   onNodesChange?: (nodes: Array) => void,
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
    (next) => {
      const value = typeof next === "function" ? next(nodes) : next;
      if (!isControlled) {
        setUncontrolled(value);
      }
      if (typeof onNodesChange === "function") {
        onNodesChange(value);
      }
    },
    [nodes, isControlled, onNodesChange]
  );

  const setNodeChecked = useCallback(
    (id, checked) => {
      setNodes((prev) => updateNodeStatus(prev, id, checked));
    },
    [setNodes]
  );

  return { nodes, setNodes, setNodeChecked, isControlled };
}
