export type IConvertedData<T> = T & {
  children?: IConvertedData<T>[] | [];
};
export type IDirectoryActionComponentsProps = {
  isSystem?: boolean;
  id?: number;
};
export interface IDirectoryTreeViewProps<T> {
  startIcon?: JSX.Element;
  defaultCollapseIcon?: JSX.Element;
  defaultExpandIcon?: JSX.Element;
  defaultExpanded?: string[];
  directoryActionComponents?: React.FC<IDirectoryActionComponentsProps>;
  checkboxItems?: string[];
  setCheckboxItems?: React.Dispatch<React.SetStateAction<string[]>>;
  // onGetConvertedData: (id?: string) => T;
  onConvertData: (rawData?: any) => any;
  onGetRawData: (id?: string) => T;
}
export type ILabelTreeItemProps<T> = {
  convertedData?: T;
  handleCheckbox: (v: boolean, convertedData: IConvertedData<any>) => void;
  isIndeterminate: (convertedData: any) => boolean
};

export type IHandleCheckBox<T> = (
  e: React.ChangeEvent<HTMLInputElement>,
  data: IConvertedData<T>
) => void;
