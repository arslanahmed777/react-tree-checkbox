/**
 * Find a node by id and return its path string plus the node.
 * @param {Array} nodes
 * @param {string|number} id
 * @param {string} [key="text"]
 * @param {string} [delimiter="/"]
 * @returns {{ path: string, node: object } | null}
 */
export function getNodePath(nodes, id, key = "text", delimiter = "/") {
  if (!Array.isArray(nodes)) return null;

  const stack = nodes.map((item) => ({
    path: `${delimiter}${item[key]}`,
    currObj: item,
  }));

  while (stack.length) {
    const { path, currObj } = stack.pop();
    if (currObj.id === id) {
      return { path, node: currObj };
    }
    if (Array.isArray(currObj.nodes) && currObj.nodes.length > 0) {
      for (let i = 0; i < currObj.nodes.length; i += 1) {
        const item = currObj.nodes[i];
        stack.push({
          path: `${path}${delimiter}${item[key]}`,
          currObj: item,
        });
      }
    }
  }

  return null;
}
