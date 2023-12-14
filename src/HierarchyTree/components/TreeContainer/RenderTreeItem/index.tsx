import React from "react";
import { TreeItem } from "@material-ui/lab";
import LabelTreeItem from "../LabelTreeItem";
import { IConvertedData } from "../../../interface";

interface RenderTreeItemProps {
  convertedTreeData?: IConvertedData;
}

const RenderTreeItem: React.FC<RenderTreeItemProps> = (props) => {
  const { convertedTreeData } = props;

  if (!convertedTreeData) return null;

  return (
    <TreeItem
      style={{ userSelect: "none" }}
      key={convertedTreeData.nodeId}
      nodeId={convertedTreeData.nodeId}
      label={
        <LabelTreeItem
          convertedData={convertedTreeData}
        />
      }
    >
      {Array.isArray(convertedTreeData.children) &&
        convertedTreeData.children.length > 0 &&
        convertedTreeData.children.map((treeDataChildren:any) => {
          return (
            <RenderTreeItem
              key={treeDataChildren.nodeId}
              convertedTreeData={treeDataChildren}
            />
          );
        })}
    </TreeItem>
  );
};

export default RenderTreeItem;
