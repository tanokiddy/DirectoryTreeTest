import { IRawData } from './../component';
import { atom } from "recoil";
import {
  CALLED_API_KEY,
  CHECK_BOX_KEY,
  LABEL_TREE_KEY,
  ONCLICK_TREE_KEY,
  RAW_DATA_KEY,
  ROOT_DATA_KEY,
  TREE_VIEW_KEY,
} from "../constants";
import {
  IDirectoryActionComponentsProps,
  ILabelTreeItemProps,
} from "../interface";

type ICheckbox = {
  checkboxItems?: string[];
  setCheckboxItems?: React.Dispatch<React.SetStateAction<string[]>>;
};

type IOnCLickTree = (id?: string) => Promise<void>;

type ILabelTreeState = {
  startIcon?: JSX.Element;
  directoryActionComponents?: React.FC<IDirectoryActionComponentsProps>;
};

type IRawDataState = {
  rawData?: IRawData[],
  onGetRawData: (id?: string) => Promise<IRawData | []>
}

export const treeViewState = atom({
  key: TREE_VIEW_KEY,
  default: {},
});

export const labelTreeState = atom<ILabelTreeState>({
  key: LABEL_TREE_KEY,
  default: {},
});

export const checkboxState = atom<ICheckbox>({
  key: CHECK_BOX_KEY,
  default: {
    checkboxItems: [],
    setCheckboxItems: () => {}
  },
});

export const rootConvertedState = atom({
  key: ROOT_DATA_KEY,
  default: {},
});

export const calledApiState = atom<string[]>({
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

export const onClickTreeState = atom<IOnCLickTree>({
  key: ONCLICK_TREE_KEY,
  default: async () => {}
});
