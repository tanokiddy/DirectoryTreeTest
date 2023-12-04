/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { Checkbox, Typography } from "@material-ui/core";
import React from "react";
import { IConvertedData, ILabelTreeItemProps } from "../../../interface";
import { useDirectory } from "../../../contexts/DirectoryTreeContext/DirectoryTreeContext";

const LabelTreeItem = (props: ILabelTreeItemProps<any>) => {
  const { convertedData } = props;

  const {
    convertedRootData,
    localCheckbox,
    setLocalCheckbox,
    startIcon,
    directoryActionComponents,
  } = useDirectory();

  const handleCheckFatherItem = (
    parentData: IConvertedData<any>,
    convertedData: IConvertedData<any>,
    arr: string[]
  ) => {
    if (!parentData || !convertedData || !parentData.children) return;

    const allChildrenChecked = parentData.children?.every((child) =>
      arr.includes(child.directoryId)
    );

    parentData.children?.forEach(
      (parentDataChildren: IConvertedData<any>) => {
        if (parentDataChildren.directoryId === convertedData.directoryId) {
          if (allChildrenChecked) {
            arr.push(parentData.directoryId);
            handleCheckFatherItem(convertedRootData, parentData, arr);
          }
          return;
        }
        handleCheckFatherItem(parentDataChildren, convertedData, arr);
      }
    );
  };

  const handleCheckIndeterminate = (
    parentData: IConvertedData<any>,
    convertedData: IConvertedData<any>,
    arr: string[]
  ) => {
    if (!parentData?.directoryId || !convertedData?.directoryId) return;
    parentData.children?.forEach(
      (parentDataChildren: IConvertedData<any>) => {
        if (parentDataChildren.directoryId === convertedData.directoryId) {
          const idx = arr.findIndex((item) => item === parentData.directoryId);
          if (idx > -1) {
            arr.splice(idx, 1);
            handleCheckIndeterminate(convertedRootData, parentData, arr);
          }
          return;
        }
        handleCheckIndeterminate(parentDataChildren, convertedData, arr);
      }
    );
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
        } else {
          return;
        }
      }
    );
  };

  const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    convertedData: IConvertedData<any>
  ) => {
    if (
      typeof localCheckbox === "undefined" ||
      typeof setLocalCheckbox === "undefined"
    )
      return;
    let newLocalCheckbox = [...localCheckbox];
    //remove nested
    if (!e.target?.checked) {
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

  const isIndeterminate = (
    convertedData: IConvertedData<any>
  ): boolean => {
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {typeof localCheckbox !== "undefined" &&
      typeof setLocalCheckbox !== "undefined" ? (
        <Typography>
          {convertedData.children !== undefined ? (
            <Checkbox
              onClick={(e) => e.stopPropagation()}
              style={{ color: "unset" }}
              onChange={(e) => {
                handleCheckbox(e, convertedData);
              }}
              checked={localCheckbox.includes(convertedData.directoryId)}
              indeterminate={isIndeterminate(convertedData)}
            />
          ) : (
            <Checkbox
              onClick={(e) => e.stopPropagation()}
              style={{ color: "unset" }}
              onChange={(e) => {
                handleCheckbox(e, convertedData);
              }}
              checked={localCheckbox.includes(convertedData.directoryId)}
            />
          )}
        </Typography>
      ) : null}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Typography>{startIcon}</Typography>
        <Typography>{convertedData.name}</Typography>
      </div>
      {directoryActionComponents ? (
        <Typography style={{ width: 70, height: 40 }}>
          {directoryActionComponents(convertedData.isSystem)}
        </Typography>
      ) : null}
    </div>
  );
};

export default LabelTreeItem;
