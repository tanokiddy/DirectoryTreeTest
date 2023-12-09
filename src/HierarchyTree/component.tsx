import { FolderOpen } from "@material-ui/icons";
import React, { useState } from "react";
import { mockData } from "./utils";
import TreeContainer from "./components/TreeContainer";
import { IConvertedData } from "./interface";

export type IRawData = {
  description: null | string;
  directoryPath: string;
  isFile: boolean;
  isSystem: boolean;
  level: number;
  objectTypeCode: string;
  directoryId: string;
  parentDirectoryId: string;
  name:string
};

const handleConvertData = (
  input: IRawData[],
  parentId: string | null = input[0].parentDirectoryId
): IConvertedData<IRawData>[] => {
  const result: IConvertedData<IRawData>[] = [];
  for (let i = 0; i < input.length; i++) {
    const item = input[i];
    if (item.parentDirectoryId === parentId) {
      const newItem: IConvertedData<IRawData> = { ...item };
      const children = handleConvertData(input, item.directoryId);
      if (children.length > 0) {
        newItem.children = children;
      }
      result.push(newItem);
    }
  }
  return result;
};


export default function TreeViewTest() {
  const [startCheckbox, setStartCheckbox] = useState<string[]>([]);
  const [endCheckbox, setEndCheckbox] = useState<string[]>([])

  const onGetConvertedData = async (id = "100") => {
    const res = await fetch(mockData[id])
    const rawData = await res.json()
    const convertedData = handleConvertData(rawData.data)
    return convertedData[0]
  }
  const onGetLabelName = (item: IConvertedData<IRawData>) => item.name
  const onGetNodeId = (item: IConvertedData<IRawData>) => item.directoryId
  const onGetLevel = (item: IConvertedData<IRawData>) => item.level
  
  return (
    <TreeContainer
      onGetLabelName={onGetLabelName}
      onGetLevel={onGetLevel}
      onGetNodeId={onGetNodeId}
      onGetConvertedData={onGetConvertedData}
      startIcon={<FolderOpen />}
      setStartCheckbox={setStartCheckbox}
      startCheckbox={startCheckbox}
      endCheckbox={endCheckbox}
      setEndCheckbox={setEndCheckbox}
    />
  );
}
