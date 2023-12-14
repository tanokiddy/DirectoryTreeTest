import { atom } from "recoil";
import {
  CALLED_API_KEY,
  CONVERT_DATA_FN_KEY,
  LABEL_TREE_KEY,
  ROOT_DATA_KEY,
  END_CHECKBOX_KEY,
  START_CHECKBOX_KEY,
  CALLBACK_FN_KEY,
} from "../constants";
import {
  ICallbackFnState,
  ICalledApiState,
  IConvertDataFnState,
  IConvertedData,
  IEndCheckboxState,
  ILabelTreeState,
  IStartCheckboxState,
} from "../interface";

export const labelTreeState = atom<ILabelTreeState<{}>>({
  key: LABEL_TREE_KEY,
  default: {},
});

export const startCheckboxState = atom<IStartCheckboxState>({
  key: START_CHECKBOX_KEY,
  default: {
    startCheckbox: [],
    setStartCheckbox: () => {},
  },
});

export const endCheckboxState = atom<IEndCheckboxState>({
  key: END_CHECKBOX_KEY,
  default: {
    endCheckbox: [],
    setEndCheckbox: () => {},
  },
});

export const calledApiState = atom<ICalledApiState>({
  key: CALLED_API_KEY,
  default: [],
});

export const convertDataFnState = atom<IConvertDataFnState<{}>>({
  key: CONVERT_DATA_FN_KEY,
  default: {
    onGetConvertedData: async () => {
      return {};
    },
  },
});

export const rootConvertedState = atom<IConvertedData<{}>>({
  key: ROOT_DATA_KEY,
  default: undefined,
});

export const callbackFnState = atom<ICallbackFnState<any>>({
  key: CALLBACK_FN_KEY,
  default: {
    onGetLabelName: () => "",
    onGetNodeId: () => "",
  },
});
