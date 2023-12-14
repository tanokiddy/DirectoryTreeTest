export type IConvertedData<T> = T & {
  children?: IConvertedData<T>[] | [];
};
export interface IDirectoryTreeViewProps<T> {
  //OPTIONAL feature TreeView
  defaultCollapseIcon?: React.ReactNode;
  defaultExpandIcon?: React.ReactNode;
  defaultExpanded?: string[];
  startIcon?: React.ReactNode;

  //OPTIONAL feature TreeItem
  actionComponents?: (data?: IConvertedData<T>) => React.ReactNode;
  startCheckbox?: string[];
  setStartCheckbox?: React.Dispatch<React.SetStateAction<string[]>>;
  endCheckbox?: string[];
  setEndCheckbox?: React.Dispatch<React.SetStateAction<string[]>>;

  //REQUIRED feature TreeContainer
  onGetConvertedData?: (nodeId?: string) => Promise<IConvertedData<T>>;
  onGetLabelName?: (item?: IConvertedData<T>) => string;
  onGetNodeId?: (item?: IConvertedData<T>) => string;
}

//RECOIL ATOM TYPE
export type IStartCheckboxState = {
  startCheckbox?: string[];
  setStartCheckbox?: React.Dispatch<React.SetStateAction<string[]>>;
};

export type IEndCheckboxState = {
  endCheckbox?: string[];
  setEndCheckbox?: React.Dispatch<React.SetStateAction<string[]>>;
};

export type ILabelTreeState<T> = {
  startIcon?: React.ReactNode;
  actionComponents?: (data?: IConvertedData<T>) => React.ReactNode;
};

export type ICalledApiState = string[]

export type IConvertDataFnState<T> = {
  onGetConvertedData: (id?: string) => Promise<IConvertedData<T>>
}

export type ICallbackFnState<T> = {
  onGetLabelName: (item: T) => string
  onGetNodeId: (item: T) => string
}