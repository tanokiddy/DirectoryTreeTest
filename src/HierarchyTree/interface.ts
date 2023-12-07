export type IConvertedData = {
  nodeId: string
  labelText: string
  order?: number
  level?: number
  isSystem?: boolean
  children?: IConvertedData[] | [];
};
export interface IDirectoryTreeViewProps {
  defaultCollapseIcon?: JSX.Element;
  defaultExpandIcon?: JSX.Element;
  defaultExpanded?: string[];
  startIcon?: JSX.Element;
  actionComponents?: React.FC;
  startCheckbox?: string[];
  setStartCheckbox?: React.Dispatch<React.SetStateAction<string[]>>;
  endCheckbox?: string[]
  setEndCheckbox?: React.Dispatch<React.SetStateAction<string[]>>;
  onGetConvertedData?: (nodeId?: string) => Promise<IConvertedData>
}
export type ILabelTreeItemProps = {
  convertedData: IConvertedData;
  handleStartCheckbox: (v: boolean, convertedData: IConvertedData) => void;
  handleEndCheckbox: (nodeId: string) => void;
  isIndeterminate: (convertedData: IConvertedData) => boolean
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
  startIcon?: JSX.Element;
  actionComponents?: React.FC;
};

export type ICalledApiState = string[]

export type IConvertDataFnState = {
  onGetConvertedData: (id?: string) => Promise<IConvertedData>
}