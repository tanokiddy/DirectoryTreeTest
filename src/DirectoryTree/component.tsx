/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { FolderOpen } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { handleConvertData, mockData } from "./utils";
import { DirectoryProvider } from "./contexts/DirectoryTreeContext/DirectoryTreeContext";
import DirectoryTreeComponent from "./components/DirectoryTreeComponent";

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
