/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ChevronRight, ExpandMore } from "@material-ui/icons";
import { TreeView } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { IDirectoryTreeViewProps } from "../../interface";
import { useDirectory } from "../../contexts/DirectoryTreeContext/DirectoryTreeContext";
import RenderTreeItem from "./RenderTreeItem";

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

  useEffect(() => {
    const fetchAPI = async () => {
      const rawData = await onGetRawData();
      setRawData(rawData);
      const newCalledApiItems = [...calledApiItems];
      newCalledApiItems.push(rawData[0].directoryId);
      setCalledApiItems(newCalledApiItems);
    };
    fetchAPI();
  }, []);

  const onClickTreeItem = async (id?: string) => {
    if (!id || calledApiItems.includes(id) || (id !=='11' || '900' || '11' || "5036872129342215728")) return;
    const newDataApi = await onGetRawData(id);
    const concatRawDataWithDataAPI = rawData.concat(newDataApi);
    const newRawData = concatRawDataWithDataAPI.filter(
      (item: any, index: number, array: any[]) =>
        array.findIndex((t: any) => t.directoryId === item.directoryId) ===
        index
    );
    setRawData(newRawData);
    const newCalledApiItems = [...calledApiItems];
    newCalledApiItems.push(id);
    setCalledApiItems(newCalledApiItems);
  };

  const [rawData, setRawData] = useState<any>([]);
  const [calledApiItems, setCalledApiItems] = useState<string[]>([]);

  if (!rawData.length) return null;
  const convertedData = onConvertData(rawData)?.[0];

  return (
    <TreeView
      multiSelect={true}
      defaultExpanded={defaultExpanded}
      defaultCollapseIcon={defaultCollapseIcon || <ExpandMore />}
      defaultExpandIcon={defaultExpandIcon || <ChevronRight />}
    >
      <RenderTreeItem
        startIcon={startIcon}
        checkboxItems={checkboxItems}
        setCheckboxItems={setCheckboxItems}
        directoryActionComponents={directoryActionComponents}
        convertedData={convertedData}
        onClickTreeItem={onClickTreeItem}
        {...rest}
      />
    </TreeView>
  );
}
