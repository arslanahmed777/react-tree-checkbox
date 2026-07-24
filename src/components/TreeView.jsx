import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import PropTypes from "prop-types";
import { TreeContext } from "../context/TreeContext.js";
import { useMergedIcons } from "../hooks/useMergedIcons.js";
import { useTreeCrud } from "../hooks/useTreeCrud.js";
import {
  useRovingFocus,
  useTreeExpansion,
} from "../hooks/useTreeExpansion.js";
import { useTreeSelection } from "../hooks/useTreeSelection.js";
import {
  DEFAULT_ON_NODE_CLICK_OPTIONS,
  DEFAULT_SPACING,
  resolveNodes,
  resolveOnExpandedChange,
  resolveOnNodesChange,
  resolveStyle,
  warnDeprecated,
} from "../constants/defaults.js";
import { getNodePath } from "../utils/getNodePath.js";
import { flattenVisibleNodes } from "../utils/mutateTree.js";
import { isDisabledNode } from "../utils/nodeHelpers.js";
import { getCheckState } from "../utils/updateNodeStatus.js";
import { TreeNodeList } from "./TreeNode.jsx";
import "../styles/tree.css";

const TreeView = forwardRef(function TreeView(props, ref) {
  const {
    nodes: nodesProp,
    filternodes,
    defaultNodes,
    expanded: expandedProp,
    defaultExpanded,
    onNodesChange: onNodesChangeProp,
    changeState,
    onExpandedChange: onExpandedChangeProp,
    handleExpand,
    column = 12,
    onNodeClick,
    onNodeClickOptions: onNodeClickOptionsProp,
    style: styleProp,
    customStyling,
    className,
    horizontalSpacing = DEFAULT_SPACING.horizontalSpacing,
    verticalSpacing = DEFAULT_SPACING.verticalSpacing,
    borderLeft = DEFAULT_SPACING.borderLeft,
    allowCheck = true,
    allowDelete = false,
    allowAdd = false,
    allowEdit = false,
    icons: iconsProp,
    handleAddNode,
    handleEditNode,
    handleDeleteNode,
    onError,
    getLabel,
    isNodeDisabled,
  } = props;

  if (
    column !== 12 &&
    typeof process !== "undefined" &&
    process.env?.NODE_ENV !== "production"
  ) {
    warnDeprecated("column", "CSS width / className");
  }

  const hasNodesProp = nodesProp != null || filternodes != null;
  const resolvedNodesProp = resolveNodes(nodesProp, filternodes);
  const onNodesChange = resolveOnNodesChange(onNodesChangeProp, changeState);
  const onExpandedChange = resolveOnExpandedChange(
    onExpandedChangeProp,
    handleExpand
  );
  const rootStyle = resolveStyle(styleProp, customStyling);
  const icons = useMergedIcons(iconsProp);
  const onNodeClickOptions = useMemo(
    () => ({
      ...DEFAULT_ON_NODE_CLICK_OPTIONS,
      ...(onNodeClickOptionsProp || {}),
    }),
    [onNodeClickOptionsProp]
  );

  const { nodes, setNodes, setNodeChecked } = useTreeSelection({
    nodes: hasNodesProp ? resolvedNodesProp : undefined,
    defaultNodes: defaultNodes || [],
    onNodesChange,
  });

  const { expanded, toggleExpanded, isExpanded } = useTreeExpansion({
    expanded: expandedProp,
    defaultExpanded: defaultExpanded || [],
    onExpandedChange,
  });

  useTreeCrud(ref, { nodes, setNodes, onError });

  const { focusedId, setFocusedId } = useRovingFocus(
    Array.isArray(nodes) && nodes[0] ? nodes[0].id : null
  );

  const treeRef = useRef(null);

  const visibleNodes = useMemo(
    () => flattenVisibleNodes(nodes, expanded),
    [nodes, expanded]
  );

  const focusNodeById = useCallback(
    (id) => {
      setFocusedId(id);
      requestAnimationFrame(() => {
        const target = treeRef.current?.querySelector(
          `.rtc-tree__item[data-node-id="${CSS.escape(String(id))}"] > .rtc-tree__row`
        );
        target?.focus?.();
      });
    },
    [setFocusedId]
  );

  useEffect(() => {
    if (!visibleNodes.length) return;
    if (!visibleNodes.some((n) => n.id === focusedId)) {
      setFocusedId(visibleNodes[0].id);
    }
  }, [visibleNodes, focusedId, setFocusedId]);

  const handleKeyDown = useCallback(
    (event) => {
      const keys = [
        "ArrowDown",
        "ArrowUp",
        "ArrowLeft",
        "ArrowRight",
        "Home",
        "End",
        "Enter",
        " ",
      ];
      if (!keys.includes(event.key)) return;

      const index = visibleNodes.findIndex((n) => n.id === focusedId);
      const current = visibleNodes[index] || visibleNodes[0];
      if (!current) return;

      const disabled = isDisabledNode(current, isNodeDisabled);
      const hasChild = Array.isArray(current.nodes) && current.nodes.length > 0;
      const expandedNow =
        Array.isArray(expanded) && expanded.includes(current.id);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const next =
          visibleNodes[Math.min(Math.max(index, 0) + 1, visibleNodes.length - 1)];
        if (next) focusNodeById(next.id);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const prev = visibleNodes[Math.max(index - 1, 0)];
        if (prev) focusNodeById(prev.id);
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        focusNodeById(visibleNodes[0].id);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        focusNodeById(visibleNodes[visibleNodes.length - 1].id);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (disabled) return;
        if (hasChild && !expandedNow) {
          toggleExpanded(current.id);
        } else if (hasChild && expandedNow && visibleNodes[index + 1]) {
          focusNodeById(visibleNodes[index + 1].id);
        }
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (disabled) return;
        if (hasChild && expandedNow) {
          toggleExpanded(current.id);
        } else if (index > 0) {
          focusNodeById(visibleNodes[index - 1].id);
        }
        return;
      }

      if (event.key === " " && allowCheck && !disabled) {
        event.preventDefault();
        const state = getCheckState(current);
        setNodeChecked(current.id, state !== "checked");
        return;
      }

      if (event.key === "Enter" && onNodeClick && !disabled) {
        event.preventDefault();
        onNodeClick(
          getNodePath(
            nodes,
            current.id,
            onNodeClickOptions.key,
            onNodeClickOptions.delimiter
          )
        );
      }
    },
    [
      allowCheck,
      expanded,
      focusNodeById,
      focusedId,
      isNodeDisabled,
      nodes,
      onNodeClick,
      onNodeClickOptions,
      setNodeChecked,
      toggleExpanded,
      visibleNodes,
    ]
  );

  const contextValue = useMemo(
    () => ({
      icons,
      allowCheck,
      allowAdd,
      allowEdit,
      allowDelete,
      column,
      onNodeClick,
      onNodeClickOptions,
      nodes,
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
    }),
    [
      icons,
      allowCheck,
      allowAdd,
      allowEdit,
      allowDelete,
      column,
      onNodeClick,
      onNodeClickOptions,
      nodes,
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
    ]
  );

  const cssVars = {
    "--rtc-indent": horizontalSpacing,
    "--rtc-row-gap": verticalSpacing,
    "--rtc-guide":
      borderLeft === "none" ? "0 solid transparent" : borderLeft,
  };

  return (
    <TreeContext.Provider value={contextValue}>
      <div
        ref={treeRef}
        className={["rtc-tree", className].filter(Boolean).join(" ")}
        style={{ ...cssVars, ...(rootStyle || {}) }}
        role="tree"
        aria-multiselectable={allowCheck || undefined}
        onKeyDown={handleKeyDown}
      >
        <div className="rtc-tree__scroll">
          <ul
            className="rtc-tree__list rtc-tree__list--columns"
            role="presentation"
          >
            <TreeNodeList nodes={nodes} root />
          </ul>
        </div>
      </div>
    </TreeContext.Provider>
  );
});

TreeView.displayName = "TreeView";

TreeView.propTypes = {
  nodes: PropTypes.array,
  filternodes: PropTypes.array,
  defaultNodes: PropTypes.array,
  expanded: PropTypes.array,
  defaultExpanded: PropTypes.array,
  onNodesChange: PropTypes.func,
  changeState: PropTypes.func,
  onExpandedChange: PropTypes.func,
  handleExpand: PropTypes.func,
  column: PropTypes.number,
  onNodeClick: PropTypes.func,
  onNodeClickOptions: PropTypes.object,
  style: PropTypes.object,
  customStyling: PropTypes.object,
  className: PropTypes.string,
  horizontalSpacing: PropTypes.string,
  verticalSpacing: PropTypes.string,
  borderLeft: PropTypes.string,
  allowCheck: PropTypes.bool,
  allowDelete: PropTypes.bool,
  allowAdd: PropTypes.bool,
  allowEdit: PropTypes.bool,
  icons: PropTypes.object,
  handleAddNode: PropTypes.func,
  handleEditNode: PropTypes.func,
  handleDeleteNode: PropTypes.func,
  onError: PropTypes.func,
  getLabel: PropTypes.func,
  isNodeDisabled: PropTypes.func,
};

export default TreeView;
