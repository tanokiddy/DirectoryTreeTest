import { IRawData } from "../component";
import { IConvertedData } from "../interface";
import { rawDirectory2_4, rawDirectoryAll } from "./rawDirectory";

export * from "./rawDirectory";
export * from "./dummy";

type IMockData = {
  [key: string]: string
}

export const mockData:IMockData = {
  '100': 'https://run.mocky.io/v3/ac7587d9-9006-46c8-9f88-84382799657d',//rawDirectory2_4
  '11': 'https://run.mocky.io/v3/5fdc2e13-b621-4512-8aec-cc726294c7f9',//rawDirectory3_5
  '900': 'https://run.mocky.io/v3/6183c7dd-1d75-4fce-8379-d8fc93ca6d7a', //rawDirectory4_6
  '5036872129342215728': 'https://run.mocky.io/v3/6183c7dd-1d75-4fce-8379-d8fc93ca6d7a',//rawDirectory5_7
}

const handleConvertData = (
  input: IRawData[],
  parentId: string | null = input[0].parentDirectoryId
): IConvertedData[] => {
  const result: IConvertedData[] = [];

  // Sử dụng vòng lặp for dạng for(let i = 0; i < array.length; i++)
  console.log('input: ', input);
  for (let i = 0; i < input.length; i++) {
    const item = input[i];

    // Kiểm tra xem phần tử có phải là con của parentId không
    if (item.parentDirectoryId === parentId) {
      // Tạo một đối tượng mới để lưu trữ dữ liệu chuyển đổi
      const newItem: IConvertedData = {
        nodeId: item.directoryId || item.objectTypeCode,
        labelText: item.description || item.directoryPath,
        order: item.level,
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
  // else if (typeof input === "object") {
  //   const transformSchemaDetails = (schemaDetails) => {
  //     const result = [];

  //     schemaDetails.forEach((detail) => {
  //       const { objectDefinition, children } = detail;

  //       if (objectDefinition) {
  //         const { fieldPath } = objectDefinition;
  //         const fieldPathParts = fieldPath.split(".").filter(Boolean);

  //         if (fieldPathParts.length > 1) {
  //           const parentField = fieldPathParts[fieldPathParts.length - 2];
  //           const parentDetail = schemaDetails.find(
  //             (d) =>
  //               d.objectDefinition &&
  //               d.objectDefinition.fieldName === parentField
  //           );

  //           if (parentDetail) {
  //             if (!parentDetail.children) {
  //               parentDetail.children = [];
  //             }

  //             parentDetail.children.push(detail);
  //           }
  //         } else {
  //           result.push(detail);
  //         }
  //       }

  //       if (children) {
  //         detail.children = transformSchemaDetails(children);
  //       }
  //     });

  //     return result;
  //   };

  //   data.schemaDetails = transformSchemaDetails(data.schemaDetails);

  //   return data;
  // }

// const transformData = (data) => {
//   const transformSchemaDetails = (schemaDetails) => {
//     const result = [];

//     schemaDetails.forEach((detail) => {
//       const { objectDefinition, children } = detail;

//       if (objectDefinition) {
//         const { fieldPath } = objectDefinition;
//         const fieldPathParts = fieldPath.split('.').filter(Boolean);

//         if (fieldPathParts.length > 1) {
//           const parentField = fieldPathParts[fieldPathParts.length - 2];
//           const parentDetail = schemaDetails.find((d) => d.objectDefinition && d.objectDefinition.fieldName === parentField);

//           if (parentDetail) {
//             if (!parentDetail.children) {
//               parentDetail.children = [];
//             }

//             parentDetail.children.push(detail);
//           }
//         } else {
//           result.push(detail);
//         }
//       }

//       if (children) {
//         detail.children = transformSchemaDetails(children);
//       }
//     });

//     return result;
//   };

//   data.schemaDetails = transformSchemaDetails(data.schemaDetails);

//   return data;
// };

// export const transformedData = transformData(data);

// export const convertArray = (input: any, parentId = input[0].parentDirectoryId) => {
//   let result = [];
//   for (let i = 0; i < input.length; i++) {
//     if (input[i].parentDirectoryId === parentId) {
//       const newItem = { ...input[i] };
//       newItem.children = convertArray(input, newItem.directoryId);

//       result.push(newItem);
//     }
//   }
//   return result
// };

// console.log(convertArray(rawDirectory))