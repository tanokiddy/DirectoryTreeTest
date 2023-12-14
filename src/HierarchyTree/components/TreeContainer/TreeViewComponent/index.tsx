/* eslint-disable react-hooks/exhaustive-deps */
import { TreeView } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import RenderTreeItem from "../RenderTreeItem";
import { ChevronRight, ExpandMore } from "@material-ui/icons";
import { IConvertedData, IDirectoryTreeViewProps } from "../../../interface";

export const TreeViewComponent: React.FC<IDirectoryTreeViewProps> = (props) => {
  const { onGetConvertedData } = props;

  const [convertedTreeData, setConvertedTreeData] =
    useState<IConvertedData>();

  useEffect(() => {
    if (!onGetConvertedData) return;
    const fetchAPI = async () => {
      const convertedData = await onGetConvertedData();
      setConvertedTreeData(convertedData);
    };
    fetchAPI();
  }, []);

  if (!convertedTreeData) return null;

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
    >
      <RenderTreeItem
        convertedTreeData={convertedTreeData}
      />
    </TreeView>
  );
};
