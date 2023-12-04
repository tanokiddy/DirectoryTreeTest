/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
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
  name: string;
  order: number;
};

const handleConvertData = (
  input: IConvertedData<any>[],
  parentId = input?.[0].parentDirectoryId
) => {
  if (Array.isArray(input)) {
    const result: IConvertedData<any>[] = [];

    for (let i = 0; i < input.length; i++) {
      if (input[i].parentDirectoryId === parentId) {
        const newItem = { ...input[i] };
        newItem.children = handleConvertData(input, newItem.directoryId);

        result.push(newItem);
      }
    }
    return result;
  }
};

export default function TreeViewTest() {
  const [localCheckbox, setLocalCheckbox] = useState<string[]>([])

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
      setLocalCheckbox={setLocalCheckbox}
      localCheckbox={localCheckbox}
    />
  );
}
