/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  IConvertedData,
  IDirectoryActionComponentsProps,
} from "../../interface";
import { handleConvertData } from "../../utils";
import React from "react";
import { IRawData } from "../../component";

type DirectoryProps = {
  onGetRawData: (id?: string) => Promise<any>;
  children: React.ReactNode;
  localCheckbox: string[];
  setLocalCheckbox: React.Dispatch<React.SetStateAction<string[]>>;
  startIcon?: JSX.Element;
  directoryActionComponents?: React.FC<IDirectoryActionComponentsProps>;
};

interface IContextValue {
  onClickTreeItem: (id?: string) => Promise<void>;
  rawData: IRawData[];
  localCheckbox: string[];
  setLocalCheckbox: Dispatch<SetStateAction<string[]>>;
  convertedRootData: IConvertedData<IRawData>;
  startIcon?: JSX.Element;
  directoryActionComponents?: React.FC<IDirectoryActionComponentsProps>;
}

const DirectoryContext = createContext<IContextValue | null>(null);

export const DirectoryProvider = ({
  onGetRawData,
  children,
  localCheckbox,
  setLocalCheckbox,
  startIcon,
}: DirectoryProps) => {

  useEffect(() => {
    const fetchAPI = async () => {
      const rawData = await onGetRawData();
      setRawData(rawData);
      const newCalledApiItems = [...calledApiItems];
      newCalledApiItems.push(rawData[0].directoryId);
      setCalledApiItems(newCalledApiItems);
    };
    fetchAPI();
  }, []);

  const onClickTreeItem = async (id?: string) => {
    if (!id || calledApiItems.includes(id)) return;
    const newDataApi = await onGetRawData(id);
    const concatRawDataWithDataAPI = rawData.concat(newDataApi);
    const newRawData = concatRawDataWithDataAPI.filter(
      (item: any, index: number, array: any[]) =>
        array.findIndex((t: any) => t.directoryId === item.directoryId) ===
        index
    );
    setRawData(newRawData);
    const newCalledApiItems = [...calledApiItems];
    newCalledApiItems.push(id);
    setCalledApiItems(newCalledApiItems);
  };

  const [rawData, setRawData] = useState<any>([]);
  const [calledApiItems, setCalledApiItems] = useState<string[]>([]);

  if (!rawData.length) return null;

  const convertedRootData = handleConvertData(rawData)?.[0];

  const contextValue: IContextValue = {
    onClickTreeItem,
    localCheckbox,
    setLocalCheckbox,
    rawData,
    convertedRootData,
    startIcon,
  };

  return (
    <DirectoryContext.Provider value={contextValue}>
      {children}
    </DirectoryContext.Provider>
  );
};

export const useDirectory = () => {
  const directory = useContext(DirectoryContext);
  if (!directory) {
    throw Error(
      "__ERROR__: usedirectory must be inside a directoryProvider with a value"
    );
  }
  return directory;
};
