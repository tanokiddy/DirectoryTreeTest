/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { IDirectoryTreeViewProps } from "../../interface";
import { DirectoryProvider } from "../../contexts/DirectoryTreeContext/DirectoryTreeContext";
import TreeViewComponent from "./TreeViewComponent";

export default function DirectoryTreeComponent(
  props: IDirectoryTreeViewProps<any>
) {
  const {
    defaultCollapseIcon,
    defaultExpandIcon,
    defaultExpanded,
    directoryActionComponents,
    startIcon,
    checkboxItems,
    setCheckboxItems,
    onGetRawData,
    onConvertData,
    ...rest
  } = props;

  if (
    typeof checkboxItems === "undefined" ||
    typeof setCheckboxItems === "undefined"
  )
    return null;

  return (
    <DirectoryProvider
      startIcon={startIcon}
      onGetRawData={onGetRawData}
      onConvertData={onConvertData}
      checkboxItems={checkboxItems}
      setCheckboxItems={setCheckboxItems}
      directoryActionComponents={directoryActionComponents}
    >
      <TreeViewComponent />
    </DirectoryProvider>
  );
}
