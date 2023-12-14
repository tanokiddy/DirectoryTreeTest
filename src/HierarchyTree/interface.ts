export type IConvertedData = {
  name: string
  nodeId: string
  /**
   * trạng thái check của node
   */
  checked?: boolean
  /**
   * trạng thái trung gian của node, tức node đó có phải là node cha của các node khác hay không
   */
  indeterminate?: boolean
  parentId: string
  children?: IConvertedData[] | [];
};
export interface IDirectoryTreeViewProps {
  //OPTIONAL feature TreeView
  defaultCollapseIcon?: React.ReactNode;
  defaultExpandIcon?: React.ReactNode;
  defaultExpanded?: string[];
  startIcon?: React.ReactNode;

  //OPTIONAL feature TreeItem
  actionComponents?: (data?: IConvertedData) => React.ReactNode;
  startCheckbox?: string[];
  setStartCheckbox?: React.Dispatch<React.SetStateAction<string[]>>;
  endCheckbox?: string[];
  setEndCheckbox?: React.Dispatch<React.SetStateAction<string[]>>;

  //REQUIRED feature TreeContainer
  onGetConvertedData?: (nodeId?: string) => Promise<IConvertedData>;
  // onGetLabelName?: (item?: IConvertedData) => string;
  // onGetNodeId?: (item?: IConvertedData) => string;

  onGetCheckedList: (treeData: IConvertedData) => IConvertedData
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

export type ILabelTreeState = {
  startIcon?: React.ReactNode;
  actionComponents?: (data?: IConvertedData) => React.ReactNode;
};

export type ICalledApiState = string[]

export type IConvertDataFnState = {
  onGetConvertedData: (id?: string) => Promise<IConvertedData>
}

// export type ICallbackFnState = {
//   onGetLabelName: (item: T) => string
//   onGetNodeId: (item: T) => string
// }