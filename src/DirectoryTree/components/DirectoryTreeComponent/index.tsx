/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ChevronRight, ExpandMore } from "@material-ui/icons";
import { TreeView } from "@material-ui/lab";
import React from "react";
import { IDirectoryTreeViewProps } from "../../interface";
import {
  DirectoryProvider,
  useDirectory,
} from "../../contexts/DirectoryTreeContext/DirectoryTreeContext";
import RenderTreeItem from "./RenderTreeItem";
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
    localCheckbox,
    setLocalCheckbox,
    onGetRawData,
    onConvertData,
    ...rest
  } = props;

  if (
    typeof localCheckbox === "undefined" ||
    typeof setLocalCheckbox === "undefined"
  )
    return null;

  return (
    <DirectoryProvider
      onGetRawData={onGetRawData}
      localCheckbox={localCheckbox}
      setLocalCheckbox={setLocalCheckbox}
      startIcon={startIcon}
      directoryActionComponents={directoryActionComponents}
    >
      <TreeViewComponent/>
    </DirectoryProvider>
  );
}
