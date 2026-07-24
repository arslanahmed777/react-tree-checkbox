/**
 * Returns true if `id` is not used anywhere in the tree.
 * @param {string|number} id
 * @param {Array} nodes
 * @returns {boolean}
 */
export function isUniqueId(id, nodes) {
  if (!Array.isArray(nodes)) return true;

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (node.id === id) return false;
    if (Array.isArray(node.nodes) && node.nodes.length > 0) {
      if (!isUniqueId(id, node.nodes)) return false;
    }
  }
  return true;
}
