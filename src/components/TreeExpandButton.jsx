import PropTypes from "prop-types";

function TreeExpandButton({ nodeId, expanded, expandIcon, compressIcon, onToggle }) {
  return (
    <button
      type="button"
      className="rtc-tree__expand"
      aria-expanded={expanded}
      aria-label={expanded ? "Collapse" : "Expand"}
      data-node-id={nodeId}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
    >
      {expanded ? expandIcon : compressIcon}
    </button>
  );
}

TreeExpandButton.propTypes = {
  nodeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  expanded: PropTypes.bool.isRequired,
  expandIcon: PropTypes.node,
  compressIcon: PropTypes.node,
  onToggle: PropTypes.func.isRequired,
};

export default TreeExpandButton;
