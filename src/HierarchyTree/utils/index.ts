export * from "./rawDirectory";

type IMockData = {
  [key: string]: string
}

export const mockData:IMockData = {
  '100': 'https://run.mocky.io/v3/ac7587d9-9006-46c8-9f88-84382799657d',//rawDirectory2_4
  '11': 'https://run.mocky.io/v3/5fdc2e13-b621-4512-8aec-cc726294c7f9',//rawDirectory3_5
  '900': 'https://run.mocky.io/v3/6183c7dd-1d75-4fce-8379-d8fc93ca6d7a', //rawDirectory4_6
  '5036872129342215728': 'https://run.mocky.io/v3/6183c7dd-1d75-4fce-8379-d8fc93ca6d7a',//rawDirectory5_7
}

// const handleConvertData = (
//   input: IRawData[],
//   parentId: string | null = input[0].parentDirectoryId
// ): IConvertedData[] => {
//   const result: IConvertedData[] = [];
//   for (let i = 0; i < input.length; i++) {
//     const item = input[i];
//     if (item.parentDirectoryId === parentId) {
//       const newItem: IConvertedData = {
//         nodeId: item.directoryId,
//         labelText: item.name,
//         level: item.level,
//         isSystem: item.isSystem
//       };
//       const children = handleConvertData(input, item.directoryId);
//       if (children.length > 0) {
//         newItem.children = children;
//       }
//       result.push(newItem);
//     }
//   }
//   return result;
// };