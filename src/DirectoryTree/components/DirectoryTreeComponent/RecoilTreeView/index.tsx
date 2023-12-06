import React, { useEffect } from "react";
import { selector, useRecoilState } from "recoil";
import { calledApiState, rawDataState } from "../../../recoil/atom";

type IDirectoryActionComponentsProps = {
  isSystem?: boolean;
  id?: number;
};

type RecoilTreeViewProps<T> = {
  startIcon?: JSX.Element;
  defaultCollapseIcon?: JSX.Element;
  defaultExpandIcon?: JSX.Element;
  defaultExpanded?: string[];
  directoryActionComponents?: React.FC<IDirectoryActionComponentsProps>;
  checkboxItems?: string[];
  setCheckboxItems?: React.Dispatch<React.SetStateAction<string[]>>;
  // onGetConvertedData: (id?: string) => T;
  onConvertData: (rawData?: any) => any;
  onGetRawData: (id?: string) => T;
};

const RecoilTreeView = (props: RecoilTreeViewProps<any>) => {
  const { onGetRawData } = props;
  const [, setRawData] = useRecoilState(rawDataState);
  const [calledApiItems, setCalledApiItems] = useRecoilState(calledApiState);

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

  return <div></div>;
};

export default RecoilTreeView;
