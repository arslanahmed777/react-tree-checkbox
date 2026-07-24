import { useImperativeHandle } from "react";
import { addNode, buildNewNode, updateNode } from "../utils/mutateTree.js";

/**
 * Expose addNewNode / editNode on a ref.
 * @param {import("react").Ref} ref
 * @param {{
 *   nodes: Array,
 *   setNodes: (nodes: Array) => void,
 *   onError?: (error: Error) => void,
 * }} options
 */
export function useTreeCrud(ref, { nodes, setNodes, onError }) {
  useImperativeHandle(
    ref,
    () => ({
      addNewNode(parentId, obj) {
        const result = buildNewNode(obj, nodes);
        if (!result.ok) {
          if (typeof onError === "function") {
            onError(result.error);
          }
          return { ok: false, error: result.error };
        }
        const next = addNode(nodes, parentId, result.node);
        setNodes(next);
        return { ok: true, node: result.node, nodes: next };
      },
      editNode(nodeId, obj) {
        if (!obj || typeof obj.text !== "string" || obj.text === "") {
          const error = new Error(
            'key "text" is missing in the object or passed empty string'
          );
          if (typeof onError === "function") {
            onError(error);
          }
          return { ok: false, error };
        }
        const next = updateNode(nodes, nodeId, obj);
        setNodes(next);
        return { ok: true, nodes: next };
      },
    }),
    [nodes, setNodes, onError]
  );
}
