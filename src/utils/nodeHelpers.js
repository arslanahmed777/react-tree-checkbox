/**
 * Default label: prefer `text` (ReactNode-friendly). Override via getLabel.
 * @param {object} node
 * @param {(node: object) => import("react").ReactNode} [getLabel]
 * @returns {import("react").ReactNode}
 */
export function getNodeLabel(node, getLabel) {
  if (typeof getLabel === "function") {
    return getLabel(node);
  }
  if (node.text != null && node.text !== "") {
    return node.text;
  }
  return node.value;
}

/**
 * Whether a node is disabled.
 * @param {object} node
 * @param {(node: object) => boolean} [isNodeDisabled]
 * @returns {boolean}
 */
export function isDisabledNode(node, isNodeDisabled) {
  if (typeof isNodeDisabled === "function") {
    return Boolean(isNodeDisabled(node));
  }
  return Boolean(node && node.disabled);
}
