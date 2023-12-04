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
  checkboxItems?: string[];
  setCheckboxItems?: (checkboxItem: string[]) => void;
  onConvertData: (rawData?: any) => any
  onGetRawData: (id?: string) => T,
}
export type ILabelTreeItemProps<T> = Pick<
  IDirectoryTreeViewProps<T>,
  | "startIcon"
  | "directoryActionComponents"
  | "checkboxItems"
  | "setCheckboxItems"
> & {
  convertedData?: T;
  localCheckbox?: string[]
  setLocalCheckbox?: Dispatch<SetStateAction<string[]>>
  rootData: T
};
export type IHandleCheckBox<T> = (
  e: React.ChangeEvent<HTMLInputElement>,
  data: IConvertedData<T>
) => void;
