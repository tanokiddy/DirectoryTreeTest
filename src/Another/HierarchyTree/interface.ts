import React from "react";

export type TreeNode = {
  nodeId: string
  name: string
  /**
   * trạng thái của node
   */
  status: NodeStatus
  children: TreeNode[] | [];
};

export enum NodeStatus {
  Checked = "CHECKED",
  Unchecked = "UNCHECKED",
  Indeterminate = "INDETERMINATE"
}
export interface IDirectoryTreeViewProps {
  //OPTIONAL feature TreeView
  data: TreeNode
  defaultCollapseIcon?: React.ReactNode;
  defaultExpandIcon?: React.ReactNode;
  defaultExpanded?: string[];
  startIcon?: React.ReactNode;

  //OPTIONAL feature TreeItem
  actionComponents?: (node?: TreeNode) => React.JSX.Element

  //REQUIRED feature TreeContainer
  onGetConvertedData?: (nodeId?: string) => Promise<TreeNode>;
  onGetCheckedList?: (checkList: string[]) => string[]
  onGetMoreData: (nodeId: string) => Promise<void>
  onGetTreeNode: (treeNode: TreeNode) => TreeNode

  //
}
