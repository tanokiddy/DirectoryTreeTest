import { atom } from "recoil";
import {
  CALLED_API_KEY,
  CONVERT_DATA_FN_KEY,
  END_CHECKBOX,
  LABEL_TREE_KEY,
  ROOT_DATA_KEY,
  START_CHECKBOX,
  TREE_VIEW_KEY,
} from "../constants";
import {
  ICalledApiState,
  IConvertDataFnState,
  IConvertedData,
  IEndCheckboxState,
  ILabelTreeState,
  IStartCheckboxState,
  ITreeViewState,
} from "../interface";

export const treeViewState = atom<ITreeViewState>({
  key: TREE_VIEW_KEY,
  default: {},
});

export const labelTreeState = atom<ILabelTreeState>({
  key: LABEL_TREE_KEY,
  default: {},
});

export const startCheckboxState = atom<IStartCheckboxState>({
  key: START_CHECKBOX,
  default: {
    startCheckbox: [],
    setStartCheckbox: () => {},
  },
});

export const endCheckboxState = atom<IEndCheckboxState>({
  key: END_CHECKBOX,
  default: {
    endCheckbox: [],
    setEndCheckbox: () => {},
  },
});

export const calledApiState = atom<ICalledApiState>({
  key: CALLED_API_KEY,
  default: [],
});

export const convertDataFnState = atom<IConvertDataFnState>({
  key: CONVERT_DATA_FN_KEY,
  default: {
    onGetConvertedData: async () => {
      return {
        nodeId: '',
        labelText: ''
      }
    }
  },
});

export const rootConvertedState = atom<IConvertedData>({
  key: ROOT_DATA_KEY,
  default: undefined,
});
