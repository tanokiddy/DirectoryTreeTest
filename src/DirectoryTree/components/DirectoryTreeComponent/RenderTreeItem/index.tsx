/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LabelTreeItem from "../LabelTreeItem";
import React from "react";
import { TreeItem } from "@material-ui/lab";
import { IDirectoryActionComponentsProps } from "../../../interface";

type RenderTreeItemProps = {
  checkboxItems?: string[];
  setCheckboxItems?: (checkboxItem: string[]) => void;
  directoryActionComponents?: React.FC<IDirectoryActionComponentsProps>;
  startIcon?: JSX.Element;
  convertedData?: any;
  onClickTreeItem?: (id: string) => Promise<void>;
  rootData?: any
};

const RenderTreeItem: React.FC<RenderTreeItemProps> = (props) => {
  const {
    checkboxItems,
    setCheckboxItems,
    directoryActionComponents,
    startIcon,
    convertedData,
    onClickTreeItem,
    rootData,
    ...rest
  } = props;

  return (
    <div>
      <TreeItem
        key={convertedData.directoryId}
        nodeId={convertedData.directoryId}
        label={
          <LabelTreeItem
            startIcon={startIcon}
            convertedData={convertedData}
            checkboxItems={checkboxItems}
            setCheckboxItems={setCheckboxItems}
            directoryActionComponents={directoryActionComponents}
            rootData={rootData}
          />
        }
        onClick={() => {
          typeof onClickTreeItem !== "undefined" &&
            onClickTreeItem(convertedData.directoryId);
        }}
        {...rest}
      >
        {Array.isArray(convertedData.children) &&
        convertedData.children.length > 0
          ? convertedData.children.map((convertedDataChildren: any) => {
              return (
                <RenderTreeItem
                  key={convertedDataChildren.directoryId}
                  convertedData={convertedDataChildren}
                  rootData={convertedData}
                  checkboxItems={checkboxItems}
                  setCheckboxItems={setCheckboxItems}
                  directoryActionComponents={directoryActionComponents}
                  onClickTreeItem={onClickTreeItem}
                />
              );
            })
          : null}
      </TreeItem>
    </div>
  );
};

export default RenderTreeItem;
