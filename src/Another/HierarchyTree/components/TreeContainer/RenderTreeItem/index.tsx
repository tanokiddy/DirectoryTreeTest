import React from "react";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import LabelTreeItem from "../LabelTreeItem";
import { TreeNode } from "AWING/HierarchyTree/interface";

interface RenderTreeItemProps {
  treeNode?: TreeNode;
  onCheck: (treeNode: TreeNode) => void;
  onGetMoreData: (nodeId: string) => Promise<void>;
  actionComponents?: (data?: TreeNode) => React.JSX.Element;
}

const RenderTreeItem: React.FC<RenderTreeItemProps> = (props) => {
  const { treeNode, onCheck, actionComponents, onGetMoreData } = props;

  if (!treeNode) return null;

  return (
    <TreeItem
      style={{ userSelect: "none" }}
      key={treeNode.nodeId}
      nodeId={treeNode.nodeId}
      label={
        <LabelTreeItem
          treeNode={treeNode}
          onCheck={onCheck}
          actionComponents={actionComponents}
        />
      }
      onClick={() => onGetMoreData(treeNode.nodeId)}
    >
      {Array.isArray(treeNode.children) &&
        treeNode.children.length > 0 &&
        treeNode.children.map((treeNodeChildren) => {
          return (
            <RenderTreeItem
              key={treeNodeChildren.nodeId}
              treeNode={treeNodeChildren}
              onCheck={onCheck}
              onGetMoreData={onGetMoreData}
              actionComponents={actionComponents}
            />
          );
        })}
    </TreeItem>
  );
};

export default RenderTreeItem;
