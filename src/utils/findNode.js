/**
 * Find a node by id (immutable read).
 * @param {Array} nodes
 * @param {string|number} id
 * @returns {object|null}
 */
export function findNodeById(nodes, id) {
  if (!Array.isArray(nodes)) return null;

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (node.id === id) return node;
    if (Array.isArray(node.nodes) && node.nodes.length > 0) {
      const found = findNodeById(node.nodes, id);
      if (found) return found;
    }
  }
  return null;
}
