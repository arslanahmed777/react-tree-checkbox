import { useCallback, useState } from "react";

/**
 * Controlled or uncontrolled expansion state.
 * @param {{
 *   expanded?: Array<string|number>,
 *   defaultExpanded?: Array<string|number>,
 *   onExpandedChange?: (ids: Array<string|number>) => void,
 * }} options
 */
export function useTreeExpansion({
  expanded: expandedProp,
  defaultExpanded = [],
  onExpandedChange,
}) {
  const isControlled = expandedProp != null;
  const [uncontrolled, setUncontrolled] = useState(defaultExpanded);
  const expanded = isControlled ? expandedProp : uncontrolled;

  const setExpanded = useCallback(
    (next) => {
      const value = typeof next === "function" ? next(expanded) : next;
      if (!isControlled) {
        setUncontrolled(value);
      }
      if (typeof onExpandedChange === "function") {
        onExpandedChange(value);
      }
    },
    [expanded, isControlled, onExpandedChange]
  );

  const toggleExpanded = useCallback(
    (id) => {
      setExpanded((prev) => {
        const list = Array.isArray(prev) ? prev : [];
        if (list.includes(id)) {
          return list.filter((value) => value !== id);
        }
        return [...list, id];
      });
    },
    [setExpanded]
  );

  const isExpanded = useCallback(
    (id) => (Array.isArray(expanded) ? expanded.includes(id) : false),
    [expanded]
  );

  return { expanded, setExpanded, toggleExpanded, isExpanded };
}

/**
 * Roving tabindex focus id for keyboard navigation.
 */
export function useRovingFocus(initialId = null) {
  const [focusedId, setFocusedId] = useState(initialId);
  return { focusedId, setFocusedId };
}
