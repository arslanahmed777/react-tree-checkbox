/**
 * Immutable checkbox cascade helpers.
 *
 * - Checking a node checks all descendants.
 * - Unchecking a node unchecks all descendants.
 * - Parent `status` is derived from children (all checked → true, else false).
 * - Partial selection is exposed via `getCheckState` → "indeterminate".
 */

/**
 * @param {object} node
 * @returns {"checked"|"unchecked"|"indeterminate"}
 */
export function getCheckState(node) {
  if (!node) return "unchecked";
  const children = Array.isArray(node.nodes) ? node.nodes : [];
  if (children.length === 0) {
    return node.status ? "checked" : "unchecked";
  }

  let checkedCount = 0;
  let indeterminateCount = 0;
  for (let i = 0; i < children.length; i += 1) {
    const state = getCheckState(children[i]);
    if (state === "checked") checkedCount += 1;
    else if (state === "indeterminate") indeterminateCount += 1;
  }

  if (checkedCount === children.length) return "checked";
  if (checkedCount === 0 && indeterminateCount === 0) return "unchecked";
  return "indeterminate";
}

function setDescendantsStatus(node, status) {
  const children = Array.isArray(node.nodes) ? node.nodes : [];
  return {
    ...node,
    status,
    nodes: children.map((child) => setDescendantsStatus(child, status)),
  };
}

function deriveParentStatus(node) {
  const children = Array.isArray(node.nodes) ? node.nodes : [];
  if (children.length === 0) return node;

  const nextChildren = children.map(deriveParentStatus);
  const allChecked = nextChildren.every((child) => getCheckState(child) === "checked");
  return {
    ...node,
    status: allChecked,
    nodes: nextChildren,
  };
}

/**
 * Toggle / set checked status for a node by id (immutable).
 * @param {Array} nodes
 * @param {string|number} id
 * @param {boolean} status
 * @returns {Array}
 */
export function updateNodeStatus(nodes, id, status) {
  if (!Array.isArray(nodes)) return [];

  const walk = (list) =>
    list.map((node) => {
      if (node.id === id) {
        return setDescendantsStatus(node, status);
      }
      if (Array.isArray(node.nodes) && node.nodes.length > 0) {
        const nextChildren = walk(node.nodes);
        const nextNode = { ...node, nodes: nextChildren };
        return deriveParentStatus(nextNode);
      }
      return node;
    });

  return walk(nodes).map(deriveParentStatus);
}
