/**
 * v2 API defaults and deprecation helpers.
 *
 * Prop renames (aliases still accepted):
 *   filternodes  → nodes
 *   changeState  → onNodesChange
 *   handleExpand → onExpandedChange
 *   customStyling → style
 *   column       → deprecated (kept for layout compat)
 *
 * Removed: addText (UI was already gone in 1.x)
 * Label display: prefers `text` (was `value || text`)
 */

export const DEFAULT_ON_NODE_CLICK_OPTIONS = {
  allowExpand: false,
  key: "text",
  delimiter: "/",
};

export const DEFAULT_SPACING = {
  horizontalSpacing: "1.25rem",
  verticalSpacing: "0.15rem",
  borderLeft: "none",
};

const warned = new Set();

/**
 * Warn once per deprecated prop name in development.
 * @param {string} oldName
 * @param {string} newName
 */
export function warnDeprecated(oldName, newName) {
  if (typeof process !== "undefined" && process.env && process.env.NODE_ENV === "production") {
    return;
  }
  if (warned.has(oldName)) return;
  warned.add(oldName);
  console.warn(
    `[react-tree-checkbox] "${oldName}" is deprecated. Use "${newName}" instead.`
  );
}

/**
 * Resolve nodes from v2 `nodes` or legacy `filternodes`.
 */
export function resolveNodes(nodes, filternodes) {
  if (nodes != null) return nodes;
  if (filternodes != null) {
    warnDeprecated("filternodes", "nodes");
    return filternodes;
  }
  return [];
}

/**
 * Resolve onNodesChange from v2 name or legacy `changeState`.
 */
export function resolveOnNodesChange(onNodesChange, changeState) {
  if (typeof onNodesChange === "function") return onNodesChange;
  if (typeof changeState === "function") {
    warnDeprecated("changeState", "onNodesChange");
    return changeState;
  }
  return undefined;
}

/**
 * Resolve onExpandedChange from v2 name or legacy `handleExpand`.
 */
export function resolveOnExpandedChange(onExpandedChange, handleExpand) {
  if (typeof onExpandedChange === "function") return onExpandedChange;
  if (typeof handleExpand === "function") {
    warnDeprecated("handleExpand", "onExpandedChange");
    return handleExpand;
  }
  return undefined;
}

/**
 * Resolve root style from v2 `style` or legacy `customStyling`.
 */
export function resolveStyle(style, customStyling) {
  if (style != null) return style;
  if (customStyling != null) {
    warnDeprecated("customStyling", "style");
    return customStyling;
  }
  return undefined;
}
