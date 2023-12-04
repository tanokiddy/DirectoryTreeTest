/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LabelTreeItem from "../LabelTreeItem";
import React from "react";
import { TreeItem } from "@material-ui/lab";
import { useDirectory } from "../../../contexts/DirectoryTreeContext/DirectoryTreeContext";
import { IDirectoryActionComponentsProps } from "../../../interface";

type RenderTreeItemProps = {
  directoryActionComponents?: React.FC<IDirectoryActionComponentsProps>;
  startIcon?: JSX.Element;
  convertedData?: any;
};

const RenderTreeItem: React.FC<RenderTreeItemProps> = (props) => {
  const { convertedData, ...rest } = props;

  const { onClickTreeItem, convertedRootData } = useDirectory();

  return (
    <div>
      <TreeItem
        key={convertedData?.directoryId || convertedRootData.directoryId}
        nodeId={convertedData?.directoryId || convertedRootData.directoryId}
        label={<LabelTreeItem convertedData={convertedData || convertedRootData} />}
        onClick={() => {
          typeof onClickTreeItem !== "undefined" &&
            onClickTreeItem(convertedData.directoryId || convertedRootData.directoryId);
        }}
      >
        {Array.isArray(convertedRootData.children) &&
        convertedRootData.children.length > 0
          ? convertedRootData.children.map((convertedDataChildren: any) => {
              return (
                <RenderTreeItem
                  key={convertedDataChildren.directoryId}
                  convertedData={convertedDataChildren}
                />
              );
            })
          : null}
      </TreeItem>
    </div>
  );
};

export default RenderTreeItem;
