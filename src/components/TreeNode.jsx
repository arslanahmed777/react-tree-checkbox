import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useTreeContext } from "../context/TreeContext.js";
import { getCheckState } from "../utils/updateNodeStatus.js";
import { getNodeLabel, isDisabledNode } from "../utils/nodeHelpers.js";
import { getNodePath } from "../utils/getNodePath.js";
import { removeNode } from "../utils/mutateTree.js";
import TreeCheckbox from "./TreeCheckbox.jsx";
import TreeExpandButton from "./TreeExpandButton.jsx";
import TreeNodeLabel from "./TreeNodeLabel.jsx";
import TreeNodeActions from "./TreeNodeActions.jsx";

function TreeNodeList({ nodes, root = false }) {
  const { column } = useTreeContext();

  if (!Array.isArray(nodes) || nodes.length === 0) return null;

  const rootColClass =
    root && column >= 1 && column <= 12
      ? `rtc-tree__root--col-${column}`
      : root
        ? "rtc-tree__root--col-12"
        : undefined;

  return (
    <>
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} rootClassName={rootColClass} />
      ))}
    </>
  );
}

const TreeNode = memo(function TreeNode({ node, rootClassName }) {
  const {
    icons,
    allowCheck,
    allowAdd,
    allowEdit,
    allowDelete,
    onNodeClick,
    onNodeClickOptions,
    nodes: rootNodes,
    setNodes,
    setNodeChecked,
    isExpanded,
    toggleExpanded,
    focusedId,
    setFocusedId,
    handleAddNode,
    handleEditNode,
    handleDeleteNode,
    getLabel,
    isNodeDisabled,
  } = useTreeContext();

  const hasChild = Array.isArray(node.nodes) && node.nodes.length > 0;
  const expanded = isExpanded(node.id);
  const disabled = isDisabledNode(node, isNodeDisabled);
  const checkState = getCheckState(node);
  const labelId = `rtc-label-${node.id}`;
  const label = getNodeLabel(node, getLabel);
  const isFocused = focusedId === node.id;

  const handleToggle = useCallback(() => {
    if (disabled || !hasChild) return;
    toggleExpanded(node.id);
  }, [disabled, hasChild, node.id, toggleExpanded]);

  const handleCheck = useCallback(
    (checked) => {
      if (disabled) return;
      setNodeChecked(node.id, checked);
    },
    [disabled, node.id, setNodeChecked]
  );

  const handleLabelClick = useCallback(() => {
    if (disabled) return;
    setFocusedId(node.id);
    if (!onNodeClick) return;
    const result = getNodePath(
      rootNodes,
      node.id,
      onNodeClickOptions.key,
      onNodeClickOptions.delimiter
    );
    onNodeClick(result);
    if (onNodeClickOptions.allowExpand && hasChild) {
      toggleExpanded(node.id);
    }
  }, [
    disabled,
    hasChild,
    node.id,
    onNodeClick,
    onNodeClickOptions,
    rootNodes,
    setFocusedId,
    toggleExpanded,
  ]);

  const onDelete = useCallback(
    (target) => {
      if (typeof handleDeleteNode === "function") {
        handleDeleteNode(target);
        return;
      }
      setNodes(removeNode(rootNodes, target.id), target);
    },
    [handleDeleteNode, rootNodes, setNodes]
  );

  let nodeIcon = null;
  if (hasChild) {
    nodeIcon = expanded ? icons.nodeExpandIcon : icons.nodeCompressIcon;
  } else if (icons.nonNodeIcon) {
    nodeIcon = icons.nonNodeIcon;
  }

  return (
    <li
      className={["rtc-tree__item", rootClassName].filter(Boolean).join(" ")}
      role="treeitem"
      aria-expanded={hasChild ? expanded : undefined}
      aria-selected={isFocused}
      aria-disabled={disabled || undefined}
      data-node-id={node.id}
    >
      <div
        className={`rtc-tree__row${disabled ? " rtc-tree__row--disabled" : ""}`}
        tabIndex={isFocused ? 0 : -1}
        onFocus={() => setFocusedId(node.id)}
      >
        {hasChild ? (
          <TreeExpandButton
            nodeId={node.id}
            expanded={expanded}
            expandIcon={icons.expandIcon}
            compressIcon={icons.compressIcon}
            onToggle={handleToggle}
          />
        ) : (
          <span className="rtc-tree__expand-spacer" aria-hidden="true" />
        )}

        {allowCheck ? (
          <TreeCheckbox
            id={node.id}
            checked={checkState === "checked"}
            indeterminate={checkState === "indeterminate"}
            disabled={disabled}
            labelledBy={labelId}
            onChange={handleCheck}
          />
        ) : null}

        <span className="rtc-tree__content">
          {nodeIcon ? <span className="rtc-tree__node-icon">{nodeIcon}</span> : null}
          <TreeNodeLabel
            id={labelId}
            label={label}
            clickable={Boolean(onNodeClick)}
            disabled={disabled}
            onClick={handleLabelClick}
          />
          <TreeNodeActions
            node={node}
            allowAdd={allowAdd}
            allowEdit={allowEdit}
            allowDelete={allowDelete}
            icons={icons}
            onAdd={handleAddNode}
            onEdit={handleEditNode}
            onDelete={onDelete}
            disabled={disabled}
          />
        </span>
      </div>

      {hasChild && expanded ? (
        <ul className="rtc-tree__children" role="group">
          <TreeNodeList nodes={node.nodes} />
        </ul>
      ) : null}
    </li>
  );
});

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  rootClassName: PropTypes.string,
};

TreeNodeList.propTypes = {
  nodes: PropTypes.array,
  root: PropTypes.bool,
};

export { TreeNodeList };
export default TreeNode;
