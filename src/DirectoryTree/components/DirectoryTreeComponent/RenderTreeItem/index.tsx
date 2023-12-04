/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LabelTreeItem from "../LabelTreeItem";
import React from "react";
import { TreeItem } from "@material-ui/lab";
import { useDirectory } from "../../../contexts/DirectoryTreeContext/DirectoryTreeContext";
import { IConvertedData } from "../../../interface";

type RenderTreeItemProps = {
  convertedData?: any;
};

const RenderTreeItem: React.FC<RenderTreeItemProps> = (props) => {
  const { convertedData } = props;

  const {
    convertedRootData,
    localCheckbox,
    setLocalCheckbox,
    onClickTreeItem,
  } = useDirectory();

  const handleCheckFatherItem = (
    parentData: IConvertedData<any>,
    convertedData: IConvertedData<any>,
    arr: string[]
  ) => {
    if (!parentData || !convertedData || !parentData.children) return;

    const allChildrenChecked = parentData.children?.every((child: any) =>
      arr.includes(child.directoryId)
    );

    parentData.children?.forEach((parentDataChildren: IConvertedData<any>) => {
      if (parentDataChildren.directoryId === convertedData.directoryId) {
        if (allChildrenChecked) {
          arr.push(parentData.directoryId);
          handleCheckFatherItem(convertedRootData, parentData, arr);
        }
        // return;
      }
      handleCheckFatherItem(parentDataChildren, convertedData, arr);
    });
  };

  const handleCheckIndeterminate = (
    parentData: IConvertedData<any>,
    convertedData: IConvertedData<any>,
    arr: string[]
  ) => {
    if (!parentData?.directoryId || !convertedData?.directoryId) return;
    parentData.children?.forEach((parentDataChildren: IConvertedData<any>) => {
      if (parentDataChildren.directoryId === convertedData.directoryId) {
        const idx = arr.findIndex((item) => item === parentData.directoryId);
        if (idx > -1) {
          arr.splice(idx, 1);
          handleCheckIndeterminate(convertedRootData, parentData, arr);
        }
        // return;
      }
      handleCheckIndeterminate(parentDataChildren, convertedData, arr);
    });
  };

  const handleRemoveCheckbox = (
    arr: string[],
    convertedData: IConvertedData<any>
  ) => {
    const idx = arr.findIndex((item) => item === convertedData.directoryId);
    if (idx > -1) {
      arr.splice(idx, 1);
    }
    if (!convertedData.children?.length) return;
    convertedData.children.forEach(
      (convertedDataChildren: IConvertedData<any>) => {
        const idx = arr.findIndex(
          (item) => item === convertedDataChildren.directoryId
        );
        if (idx > -1) {
          arr.splice(idx, 1);
        }
        handleRemoveCheckbox(arr, convertedDataChildren);
      }
    );
  };

  const handleCheckNested = (
    arr: string[],
    convertedData: IConvertedData<any>
  ) => {
    convertedData?.children?.forEach(
      (convertedDataChildren: IConvertedData<any>) => {
        if (!arr.includes(convertedDataChildren.directoryId)) {
          arr.push(convertedDataChildren.directoryId);
          handleCheckNested(arr, convertedDataChildren);
        }
        // else {
        //   return;
        // }
      }
    );
  };

  const handleCheckbox = (
    // e: React.ChangeEvent<HTMLInputElement>,
    v: boolean,
    convertedData: IConvertedData<any>
  ) => {
    if (
      typeof localCheckbox === "undefined" ||
      typeof setLocalCheckbox === "undefined"
    )
      return;
    let newLocalCheckbox = [...localCheckbox];
    //remove nested
    if (!v) {
      handleRemoveCheckbox(newLocalCheckbox, convertedData);
      setLocalCheckbox(newLocalCheckbox);
      handleCheckIndeterminate(
        convertedRootData,
        convertedData,
        newLocalCheckbox
      );
      return;
    }
    //add
    newLocalCheckbox.push(convertedData.directoryId);
    handleCheckFatherItem(convertedRootData, convertedData, newLocalCheckbox);
    setLocalCheckbox(newLocalCheckbox);

    if (!convertedData.children?.length) return;
    //add nested
    convertedData.children.forEach(
      (convertedDataChildren: IConvertedData<any>) => {
        if (!newLocalCheckbox.includes(convertedDataChildren.directoryId)) {
          newLocalCheckbox.push(convertedDataChildren.directoryId);
          handleCheckNested(newLocalCheckbox, convertedDataChildren);
        } else {
          return;
        }
      }
    );
  };

  const isIndeterminate = (convertedData: IConvertedData<any>): boolean => {
    if (!convertedData.children || convertedData.children.length === 0) {
      return false;
    }

    const allChildrenChecked = convertedData.children.every((child) =>
      localCheckbox.includes(child.directoryId)
    );

    const someChildrenChecked = convertedData.children.some((child) =>
      localCheckbox.includes(child.directoryId)
    );

    const someDescendantChecked = convertedData.children.some((child) =>
      isIndeterminate(child)
    );

    return (
      (someChildrenChecked && !allChildrenChecked) || someDescendantChecked
    );
  };

  return (
    <div>
      <TreeItem
        style={{ userSelect: "none" }}
        key={convertedData.directoryId}
        nodeId={convertedData.directoryId}
        label={
          <LabelTreeItem
            convertedData={convertedData}
            handleCheckbox={handleCheckbox}
            isIndeterminate={isIndeterminate}
          />
        }
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
