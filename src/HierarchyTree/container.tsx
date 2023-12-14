import React from "react";
import { TreeViewComponent } from "./components/TreeContainer/TreeViewComponent";
import { IConvertedData, IDirectoryTreeViewProps } from "./interface";
import { mockData } from "./utils";
export type IRawData = {
  description: null | string;
  directoryPath: string;
  isFile: boolean;
  isSystem: boolean;
  level: number;
  objectTypeCode: string;
  directoryId: string;
  parentDirectoryId: string;
  name: string;
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
        name: item.name,
        nodeId: item.directoryId,
        parentId: item.parentDirectoryId,
      }
      const children = handleConvertData(input, item.directoryId);
      if (children.length > 0) {
        newItem.children = children;
        newItem.indeterminate = false
      }
      result.push(newItem);
    }
  }
  return result;
};

const TreeContainer: React.FC<IDirectoryTreeViewProps> = (props) => {
  const onGetConvertedData = async (id = "100") => {
    const res = await fetch(mockData[id]);
    const rawData = await res.json();
    const convertedData = handleConvertData(rawData.data);
    return convertedData[0];
  };
  return (
      <TreeViewComponent {...props} onGetConvertedData={onGetConvertedData}/>
  );
};

export default TreeContainer
export * from "./interface";
