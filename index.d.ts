import * as React from "react";

export interface TreeNodeData {
  id: number;
  text: React.ReactNode;
  value?: string;
  status: boolean;
  nodes: TreeNodeData[];
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
}

export interface TreeViewRef {
  addNewNode: (nodeId: number, obj: Partial<TreeNodeData> & { text: string }) => void;
}

export interface TreeViewProps {
  filternodes: TreeNodeData[];
  expanded: number[];
  handleExpand: (expandedIds: number[]) => void;
  changeState?: (updatedNodes: TreeNodeData[] | undefined) => void;
  column?: number;
  onNodeClick?: (result: TreePathResult | null) => void;
  onNodeClickOptions?: OnNodeClickOptions;
  customStyling?: React.CSSProperties;
  horizontalSpacing?: string;
  verticalSpacing?: string;
  borderLeft?: string;
  allowCheck?: boolean;
  allowDelete?: boolean;
  allowAdd?: boolean;
  addText?: string;
  icons?: TreeIcons;
  handleAddNode?: (nodeId: number) => void;
}

declare const TreeView: React.ForwardRefExoticComponent<
  TreeViewProps & React.RefAttributes<TreeViewRef>
>;

export default TreeView;
