import { Dispatch, SetStateAction } from "react";

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
  localCheckbox?: string[];
  setLocalCheckbox?: React.Dispatch<React.SetStateAction<string[]>>
  // onGetConvertedData: (id?: string) => T;
  onConvertData: (rawData?: any) => any
  onGetRawData: (id?: string) => T,
}
export type ILabelTreeItemProps<T> = {
  convertedData?: T;
};

export type IHandleCheckBox<T> = (
  e: React.ChangeEvent<HTMLInputElement>,
  data: IConvertedData<T>
) => void;
