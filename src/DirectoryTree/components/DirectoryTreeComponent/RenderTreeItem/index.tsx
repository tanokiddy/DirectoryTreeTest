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
  const { convertedData } = props;

  const { onClickTreeItem } = useDirectory();

  return (
    <div>
      <TreeItem
        key={convertedData?.directoryId}
        nodeId={convertedData?.directoryId}
        label={<LabelTreeItem convertedData={convertedData} />}
        onClick={() => {
          typeof onClickTreeItem !== "undefined" &&
            onClickTreeItem(convertedData.directoryId);
        }}
      >
        {Array.isArray(convertedData.children) &&
        convertedData.children.length > 0
          ? convertedData.children.map((convertedDataChildren: any) => {
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
