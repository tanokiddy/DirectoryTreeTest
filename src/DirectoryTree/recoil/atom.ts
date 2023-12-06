import { IRawData } from './../component';
import { atom } from "recoil";
import {
  CALLED_API_KEY,
  CHECK_BOX_KEY,
  LABEL_TREE_KEY,
  RAW_DATA_KEY,
  ROOT_DATA_KEY,
  TREE_VIEW_KEY,
} from "../constants";
import {
  IConvertedData,
  IDirectoryActionComponentsProps,
} from "../interface";

type ICheckboxState = {
  checkboxItems?: string[];
  setCheckboxItems?: React.Dispatch<React.SetStateAction<string[]>>;
};

type ILabelTreeState = {
  startIcon?: JSX.Element;
  directoryActionComponents?: React.FC<IDirectoryActionComponentsProps>;
};

type IRawDataState = {
  rawData?: IRawData[],
  onGetRawData: (id?: string) => Promise<IRawData | []>
}

type ITreeViewState = {
  defaultExpandIcon?: JSX.Element
  defaultCollapseIcon?: JSX.Element
  defaultExpanded?: string[]
}

type ICalledApiState = string[]

export const treeViewState = atom<ITreeViewState>({
  key: TREE_VIEW_KEY,
  default: {},
});

export const labelTreeState = atom<ILabelTreeState>({
  key: LABEL_TREE_KEY,
  default: {},
});

export const checkboxState = atom<ICheckboxState>({
  key: CHECK_BOX_KEY,
  default: {
    checkboxItems: [],
    setCheckboxItems: () => {}
  },
});

export const calledApiState = atom<ICalledApiState>({
  key: CALLED_API_KEY,
  default: [],
});

export const rawDataState = atom<IRawDataState>({
  key: RAW_DATA_KEY,
  default: {
    rawData: [],
    onGetRawData: async () => []
  },
});

export const rootConvertedState = atom<IConvertedData<any>>({
  key: ROOT_DATA_KEY,
  default: {},
});
