import { useMemo } from "react";
import { defaultIcons } from "../icons/defaultIcons.jsx";

/**
 * Merge consumer icons over defaults.
 * @param {object} [iconsProp]
 */
export function useMergedIcons(iconsProp) {
  return useMemo(
    () => ({ ...defaultIcons, ...(iconsProp || {}) }),
    [iconsProp]
  );
}
