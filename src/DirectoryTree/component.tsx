import { FolderOpen } from "@material-ui/icons";
import React, { useState } from "react";
import { mockData } from "./utils";
import DirectoryTreeComponent from "./components/DirectoryTreeComponent";
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
): IConvertedData[] => {
  const result: IConvertedData[] = [];

  for (let i = 0; i < input.length; i++) {
    const item = input[i];
    if (item.parentDirectoryId === parentId) {
      const newItem: IConvertedData = {
        nodeId: item.directoryId,
        labelText: item.name,
        level: item.level,
        isSystem: item.isSystem
      };
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
  const [checkboxItems, setCheckboxItems] = useState<string[]>([]);
  const onGetRawData = async (id = "100") => {
    const res = await fetch(mockData[id]);
    const rawData = await res.json();
    return rawData.data;
  };
  return (
    <DirectoryTreeComponent
      onConvertData={handleConvertData}
      onGetRawData={onGetRawData}
      startIcon={<FolderOpen />}
      setCheckboxItems={setCheckboxItems}
      checkboxItems={checkboxItems}
    />
  );
}
