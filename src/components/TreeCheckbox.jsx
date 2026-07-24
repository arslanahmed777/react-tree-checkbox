import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * Checkbox with optional indeterminate state.
 */
function TreeCheckbox({
  id,
  checked,
  indeterminate,
  disabled,
  labelledBy,
  onChange,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  return (
    <span className="rtc-tree__checkbox-wrap">
      <input
        ref={inputRef}
        className="rtc-tree__checkbox"
        type="checkbox"
        value={id}
        name={String(id)}
        checked={checked}
        disabled={disabled}
        aria-labelledby={labelledBy}
        aria-checked={indeterminate ? "mixed" : checked}
        onChange={(event) => onChange(event.target.checked)}
      />
    </span>
  );
}

TreeCheckbox.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  labelledBy: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TreeCheckbox;
