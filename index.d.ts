import * as React from "react";

export type NodeId = string | number;

export interface TreeNodeData {
  id: NodeId;
  text?: React.ReactNode;
  value?: string;
  status?: boolean;
  disabled?: boolean;
  nodes?: TreeNodeData[];
  [key: string]: unknown;
}

export interface TreePathResult {
  path: string;
  node: TreeNodeData;
}

export interface OnNodeClickOptions {
  allowExpand?: boolean;
  key?: string;
  delimiter?: string;
}

export interface TreeIcons {
  compressIcon?: React.ReactNode;
  expandIcon?: React.ReactNode;
  nodeCompressIcon?: React.ReactNode;
  nodeExpandIcon?: React.ReactNode;
  nonNodeIcon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  addIcon?: React.ReactNode;
  editIcon?: React.ReactNode;
}

export interface TreeViewRef {
  addNewNode: (
    nodeId: NodeId,
    obj: Partial<TreeNodeData> & { text: string }
  ) => { ok: boolean; node?: TreeNodeData; nodes?: TreeNodeData[]; error?: Error };
  editNode: (
    nodeId: NodeId,
    obj: Partial<TreeNodeData> & { text: string }
  ) => { ok: boolean; nodes?: TreeNodeData[]; error?: Error };
}

export interface TreeViewProps {
  /** Tree data (preferred). */
  nodes?: TreeNodeData[];
  /** @deprecated Use `nodes`. */
  filternodes?: TreeNodeData[];
  /** Initial nodes for uncontrolled mode. */
  defaultNodes?: TreeNodeData[];
  /** Expanded node ids (controlled). */
  expanded?: NodeId[];
  /** Initial expanded ids for uncontrolled mode. */
  defaultExpanded?: NodeId[];
  /** Called when tree data changes (preferred). */
  onNodesChange?: (updatedNodes: TreeNodeData[]) => void;
  /** @deprecated Use `onNodesChange`. */
  changeState?: (updatedNodes: TreeNodeData[]) => void;
  /** Called when expanded ids change (preferred). */
  onExpandedChange?: (expandedIds: NodeId[]) => void;
  /** @deprecated Use `onExpandedChange`. */
  handleExpand?: (expandedIds: NodeId[]) => void;
  /** @deprecated Prefer CSS/`className` for width. */
  column?: number;
  onNodeClick?: (result: TreePathResult | null) => void;
  onNodeClickOptions?: OnNodeClickOptions;
  style?: React.CSSProperties;
  /** @deprecated Use `style`. */
  customStyling?: React.CSSProperties;
  className?: string;
  horizontalSpacing?: string;
  verticalSpacing?: string;
  borderLeft?: string;
  allowCheck?: boolean;
  allowDelete?: boolean;
  allowAdd?: boolean;
  allowEdit?: boolean;
  icons?: TreeIcons;
  handleAddNode?: (node: TreeNodeData) => void;
  handleEditNode?: (node: TreeNodeData) => void;
  handleDeleteNode?: (node: TreeNodeData) => void;
  /** Called when ref CRUD validation fails (replaces alert). */
  onError?: (error: Error) => void;
  /** Custom label renderer. Default prefers `text`, then `value`. */
  getLabel?: (node: TreeNodeData) => React.ReactNode;
  /** Custom disabled predicate (in addition to `node.disabled`). */
  isNodeDisabled?: (node: TreeNodeData) => boolean;
}

declare const TreeView: React.ForwardRefExoticComponent<
  TreeViewProps & React.RefAttributes<TreeViewRef>
>;

export function getNodePath(
  nodes: TreeNodeData[],
  id: NodeId,
  key?: string,
  delimiter?: string
): TreePathResult | null;

export function updateNodeStatus(
  nodes: TreeNodeData[],
  id: NodeId,
  status: boolean
): TreeNodeData[];

export function getCheckState(
  node: TreeNodeData
): "checked" | "unchecked" | "indeterminate";

export function filterTree(
  nodes: TreeNodeData[],
  predicate: (node: TreeNodeData) => boolean
): TreeNodeData[];

export function collectNodeIds(nodes: TreeNodeData[]): NodeId[];

export function flattenVisibleNodes(
  nodes: TreeNodeData[],
  expandedIds: NodeId[]
): TreeNodeData[];

export default TreeView;
export { TreeView };
