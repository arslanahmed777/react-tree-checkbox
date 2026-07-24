import PropTypes from "prop-types";

function TreeNodeLabel({
  id,
  label,
  clickable,
  disabled,
  onClick,
}) {
  return (
    <span
      id={id}
      className={`rtc-tree__label${clickable ? " rtc-tree__label--clickable" : ""}`}
      tabIndex={clickable && !disabled ? 0 : undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={
        clickable && !disabled
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick?.(event);
              }
            }
          : undefined
      }
      role={clickable ? "button" : undefined}
    >
      {label}
    </span>
  );
}

TreeNodeLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
  clickable: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default TreeNodeLabel;
