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
  actionComponents?: React.FC;
  startCheckbox?: string[];
  setStartCheckbox?: React.Dispatch<React.SetStateAction<string[]>>;
  endCheckbox?: string[]
  setEndCheckbox?: React.Dispatch<React.SetStateAction<string[]>>;

  //REQUIRED feature TreeContainer
  onGetConvertedData?: (nodeId?: string) => Promise<IConvertedData<T>>
  onGetLabelName?: (item?: IConvertedData<T>) => string
  onGetNodeId?: (item?: IConvertedData<T>) => string
  onGetLevel?: (item?: IConvertedData<T>) => number
}

export type ILabelTreeItemProps<T> = {
  convertedData: IConvertedData<T>;
  handleStartCheckbox: (v: boolean, convertedData: IConvertedData<T>) => void;
  handleEndCheckbox: (nodeId: string) => void;
  isIndeterminate: (convertedData: IConvertedData<T>) => boolean
};



//RECOIL ATOM TYPE
export type IStartCheckboxState = {
  startCheckbox?: string[];
  setStartCheckbox?: React.Dispatch<React.SetStateAction<string[]>>;
};

export type IEndCheckboxState = {
  endCheckbox?: string[];
  setEndCheckbox?: React.Dispatch<React.SetStateAction<string[]>>;
};

export type ILabelTreeState = {
  startIcon?: React.ReactNode;
  actionComponents?: React.FC;
};

export type ICalledApiState = string[]

export type IConvertDataFnState<T> = {
  onGetConvertedData: (id?: string) => Promise<IConvertedData<T>>
}

export type ICallbackFnState<T> = {
  onGetLabelName: (item: T) => string
  onGetNodeId: (item: T) => string
  onGetLevel: (item: T) => number
}