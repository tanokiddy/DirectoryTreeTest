export type IConvertedData = {
  nodeId: string
  labelText: string
  order?: number
  level?: number
  isSystem?: boolean
  children?: IConvertedData[] | [];
};
// export type IDirectoryActionComponentsProps = {
//   isSystem?: boolean;
//   id?: number;
// };
export interface IDirectoryTreeViewProps {
  startIcon?: JSX.Element;
  defaultCollapseIcon?: JSX.Element;
  defaultExpandIcon?: JSX.Element;
  defaultExpanded?: string[];
  directoryActionComponents?: React.FC;
  checkboxItems?: string[];
  setCheckboxItems?: React.Dispatch<React.SetStateAction<string[]>>;
  onConvertData: (rawData?: any) => IConvertedData[];
  onGetRawData: (id?: string) => any;
}
export type ILabelTreeItemProps = {
  convertedData: IConvertedData;
  handleCheckbox: (v: boolean, convertedData: IConvertedData) => void;
  isIndeterminate: (convertedData: IConvertedData) => boolean
};
