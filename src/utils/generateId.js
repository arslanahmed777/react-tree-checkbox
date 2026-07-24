/**
 * Generate a numeric id suitable for new tree nodes.
 * @param {number} [length=8]
 * @returns {number}
 */
export function generateId(length = 8) {
  const raw = Math.ceil(Math.random() * Date.now())
    .toPrecision(length)
    .toString()
    .replace(".", "");
  return parseInt(raw, 10);
}
