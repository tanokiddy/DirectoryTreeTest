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

  // Sử dụng vòng lặp for dạng for(let i = 0; i < array.length; i++)
  for (let i = 0; i < input.length; i++) {
    const item = input[i];

    // Kiểm tra xem phần tử có phải là con của parentId không
    if (item.parentDirectoryId === parentId) {
      // Tạo một đối tượng mới để lưu trữ dữ liệu chuyển đổi
      const newItem: IConvertedData = {
        nodeId: item.directoryId,
        labelText: item.name,
        level: item.level,
        isSystem: item.isSystem
      };

      // Gọi đệ quy để xử lý các phần tử con
      const children = handleConvertData(input, item.directoryId);

      // Nếu có phần tử con, thêm chúng vào đối tượng newItem
      if (children.length > 0) {
        newItem.children = children;
      }

      // Thêm newItem vào mảng kết quả
      result.push(newItem);
    }
  }

  // Trả về mảng kết quả sau khi lặp qua tất cả các phần tử
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
