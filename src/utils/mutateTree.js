import { generateId } from "./generateId.js";
import { isUniqueId } from "./isUniqueId.js";

/**
 * Remove a node by id (immutable).
 * @param {Array} nodes
 * @param {string|number} nodeId
 * @returns {Array}
 */
export function removeNode(nodes, nodeId) {
  if (!Array.isArray(nodes)) return [];

  return nodes
    .filter((node) => node.id !== nodeId)
    .map((node) => {
      if (!Array.isArray(node.nodes) || node.nodes.length === 0) return node;
      return { ...node, nodes: removeNode(node.nodes, nodeId) };
    });
}

/**
 * Add a child under parentId, or push to root when parentId === 0.
 * @param {Array} nodes
 * @param {string|number} parentId
 * @param {object} newNode
 * @returns {Array}
 */
export function addNode(nodes, parentId, newNode) {
  const list = Array.isArray(nodes) ? nodes : [];

  if (parentId === 0) {
    return [...list, newNode];
  }

  return list.map((node) => {
    if (node.id === parentId) {
      const children = Array.isArray(node.nodes) ? node.nodes : [];
      return { ...node, nodes: [...children, newNode] };
    }
    if (Array.isArray(node.nodes) && node.nodes.length > 0) {
      return { ...node, nodes: addNode(node.nodes, parentId, newNode) };
    }
    return node;
  });
}

/**
 * Update text/value of a node by id (immutable). Keeps id and children.
 * @param {Array} nodes
 * @param {string|number} nodeId
 * @param {{ text: string, value?: string }} patch
 * @returns {Array}
 */
export function updateNode(nodes, nodeId, patch) {
  if (!Array.isArray(nodes)) return [];

  return nodes.map((node) => {
    if (node.id === nodeId) {
      const nextValue =
        patch.value != null && patch.value !== ""
          ? patch.value
          : typeof patch.text === "string"
            ? patch.text.replace(/\s/g, "").toLowerCase()
            : node.value;
      return {
        ...node,
        text: patch.text,
        value: nextValue,
      };
    }
    if (Array.isArray(node.nodes) && node.nodes.length > 0) {
      return { ...node, nodes: updateNode(node.nodes, nodeId, patch) };
    }
    return node;
  });
}

/**
 * Build a new node object from a partial input.
 * @param {object} obj
 * @param {Array} existingNodes
 * @returns {{ ok: true, node: object } | { ok: false, error: Error }}
 */
export function buildNewNode(obj, existingNodes) {
  if (!obj || typeof obj.text !== "string" || obj.text === "") {
    return {
      ok: false,
      error: new Error('key "text" is missing in the object or passed empty string'),
    };
  }

  let id = obj.id != null && obj.id !== "" ? obj.id : generateId(8);
  if (!isUniqueId(id, existingNodes)) {
    return {
      ok: false,
      error: new Error("Every node id must be unique. This id already exists in the tree."),
    };
  }

  const value =
    obj.value != null && obj.value !== ""
      ? obj.value
      : obj.text.replace(/\s/g, "").toLowerCase();

  const nodes = Array.isArray(obj.nodes) ? obj.nodes : [];

  return {
    ok: true,
    node: {
      ...obj,
      text: obj.text,
      value,
      status: obj.status === true,
      nodes,
      id,
    },
  };
}

/**
 * Collect all node ids in the tree (depth-first).
 * @param {Array} nodes
 * @returns {Array<string|number>}
 */
export function collectNodeIds(nodes) {
  const ids = [];
  const walk = (list) => {
    if (!Array.isArray(list)) return;
    for (let i = 0; i < list.length; i += 1) {
      ids.push(list[i].id);
      if (Array.isArray(list[i].nodes)) walk(list[i].nodes);
    }
  };
  walk(nodes);
  return ids;
}

/**
 * Flatten visible nodes given an expanded id set (for keyboard nav).
 * @param {Array} nodes
 * @param {Array} expandedIds
 * @returns {Array<object>}
 */
export function flattenVisibleNodes(nodes, expandedIds) {
  const expanded = new Set(expandedIds || []);
  const result = [];

  const walk = (list) => {
    if (!Array.isArray(list)) return;
    for (let i = 0; i < list.length; i += 1) {
      const node = list[i];
      result.push(node);
      const hasChildren = Array.isArray(node.nodes) && node.nodes.length > 0;
      if (hasChildren && expanded.has(node.id)) {
        walk(node.nodes);
      }
    }
  };

  walk(nodes);
  return result;
}

/**
 * Filter tree by predicate; keep ancestors of matches.
 * @param {Array} nodes
 * @param {(node: object) => boolean} predicate
 * @returns {Array}
 */
export function filterTree(nodes, predicate) {
  if (!Array.isArray(nodes)) return [];

  return nodes.reduce((acc, node) => {
    const children = filterTree(node.nodes || [], predicate);
    if (predicate(node) || children.length > 0) {
      acc.push({ ...node, nodes: children });
    }
    return acc;
  }, []);
}
