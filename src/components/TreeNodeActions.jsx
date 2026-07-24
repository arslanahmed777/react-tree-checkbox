import PropTypes from "prop-types";

function TreeNodeActions({
  node,
  allowAdd,
  allowEdit,
  allowDelete,
  icons,
  onAdd,
  onEdit,
  onDelete,
  disabled,
}) {
  if (!allowAdd && !allowEdit && !allowDelete) {
    return null;
  }

  return (
    <span className="rtc-tree__actions">
      {allowDelete ? (
        <button
          type="button"
          className="rtc-tree__action rtc-tree__action--delete"
          title="Delete"
          aria-label="Delete node"
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation();
            onDelete?.(node);
          }}
        >
          {icons.deleteIcon}
        </button>
      ) : null}
      {allowEdit ? (
        <button
          type="button"
          className="rtc-tree__action rtc-tree__action--edit"
          title="Edit"
          aria-label="Edit node"
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation();
            onEdit?.(node);
          }}
        >
          {icons.editIcon}
        </button>
      ) : null}
      {allowAdd ? (
        <button
          type="button"
          className="rtc-tree__action rtc-tree__action--add"
          title="Add"
          aria-label="Add child node"
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation();
            onAdd?.(node);
          }}
        >
          {icons.addIcon}
        </button>
      ) : null}
    </span>
  );
}

TreeNodeActions.propTypes = {
  node: PropTypes.object.isRequired,
  allowAdd: PropTypes.bool,
  allowEdit: PropTypes.bool,
  allowDelete: PropTypes.bool,
  icons: PropTypes.object.isRequired,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TreeNodeActions;
