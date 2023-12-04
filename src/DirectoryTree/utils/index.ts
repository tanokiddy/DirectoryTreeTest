import { IConvertedData } from "../interface";

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

export const handleConvertData = (
  input: IConvertedData<any>[],
  parentId = input?.[0].parentDirectoryId
) => {
  if (Array.isArray(input)) {
    const result: IConvertedData<any>[] = [];

    for (let i = 0; i < input.length; i++) {
      if (input[i].parentDirectoryId === parentId) {
        const newItem = { ...input[i] };
        newItem.children = handleConvertData(
          input,
          newItem.directoryId
        );

        result.push(newItem);
      }
    }
    return result;
  }
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
};

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