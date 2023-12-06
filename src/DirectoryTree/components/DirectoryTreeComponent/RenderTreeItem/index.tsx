/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LabelTreeItem from "../LabelTreeItem";
import React, { useCallback } from "react";
import { TreeItem } from "@material-ui/lab";
import { IConvertedData } from "../../../interface";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  calledApiState,
  checkboxState,
  rawDataState,
  rootConvertedState,
} from "../../../recoil/atom";

type RenderTreeItemProps = {
  convertedData?: any;
};

const RenderTreeItem: React.FC<RenderTreeItemProps> = (props) => {
  const { convertedData } = props;

  const convertedRootData = useRecoilValue(rootConvertedState);
  const [checkList, setCheckList] = useRecoilState(checkboxState);
  const { checkboxItems, setCheckboxItems } = checkList;
  const [relatedRawData, setRelatedData] = useRecoilState(rawDataState);
  const [calledApiItems, setCalledApiItems] = useRecoilState(calledApiState);

  const handleCheckFatherItem = (
    parentData: IConvertedData<any>,
    convertedData: IConvertedData<any>,
    arr: string[]
  ) => {
    if (!parentData || !convertedData || !parentData.children) return;
    const allChildrenChecked = parentData.children?.every((child: any) =>
      arr.includes(child.directoryId)
    );

    parentData.children?.forEach((parentDataChildren: IConvertedData<any>) => {
      if (parentDataChildren.directoryId === convertedData.directoryId) {
        if (allChildrenChecked) {
          arr.push(parentData.directoryId);
          handleCheckFatherItem(convertedRootData, parentData, arr);
        }
        // return;
      }
      handleCheckFatherItem(parentDataChildren, convertedData, arr);
    });
  };

  const handleCheckIndeterminate = (
    parentData: IConvertedData<any>,
    convertedData: IConvertedData<any>,
    arr: string[]
  ) => {
    if (!parentData?.directoryId || !convertedData?.directoryId) return;
    parentData.children?.forEach((parentDataChildren: IConvertedData<any>) => {
      if (parentDataChildren.directoryId === convertedData.directoryId) {
        const idx = arr.findIndex((item) => item === parentData.directoryId);
        if (idx > -1) {
          arr.splice(idx, 1);
          handleCheckIndeterminate(convertedRootData, parentData, arr);
        }
      }
      handleCheckIndeterminate(parentDataChildren, convertedData, arr);
    });
  };

  const handleRemoveCheckbox = (
    arr: string[],
    convertedData: IConvertedData<any>
  ) => {
    const idx = arr.findIndex((item) => item === convertedData.directoryId);
    if (idx > -1) {
      arr.splice(idx, 1);
    }
    if (!convertedData.children?.length) return;
    convertedData.children.forEach(
      (convertedDataChildren: IConvertedData<any>) => {
        const idx = arr.findIndex(
          (item) => item === convertedDataChildren.directoryId
        );
        if (idx > -1) {
          arr.splice(idx, 1);
        }
        handleRemoveCheckbox(arr, convertedDataChildren);
      }
    );
  };

  const handleCheckNested = (
    arr: string[],
    convertedData: IConvertedData<any>
  ) => {
    convertedData?.children?.forEach(
      (convertedDataChildren: IConvertedData<any>) => {
        if (!arr.includes(convertedDataChildren.directoryId)) {
          arr.push(convertedDataChildren.directoryId);
          handleCheckNested(arr, convertedDataChildren);
        }
      }
    );
  };

  const handleCheckbox = (v: boolean, convertedData: IConvertedData<any>) => {
    if (
      typeof checkboxItems === "undefined" ||
      typeof setCheckboxItems === "undefined"
    )
      return;
    let newcheckboxItems = [...checkboxItems];
    //remove nested
    if (!v) {
      handleRemoveCheckbox(newcheckboxItems, convertedData);
      setCheckboxItems(newcheckboxItems);
      handleCheckIndeterminate(
        convertedRootData,
        convertedData,
        newcheckboxItems
      );
      return;
    }
    //add
    newcheckboxItems.push(convertedData.directoryId);
    handleCheckFatherItem(convertedRootData, convertedData, newcheckboxItems);
    setCheckboxItems(newcheckboxItems);
    if (!convertedData.children?.length) return;
    //add nested
    convertedData.children.forEach(
      (convertedDataChildren: IConvertedData<any>) => {
        if (!newcheckboxItems.includes(convertedDataChildren.directoryId)) {
          newcheckboxItems.push(convertedDataChildren.directoryId);
          handleCheckNested(newcheckboxItems, convertedDataChildren);
        } else {
          return;
        }
      }
    );
  };

  const isIndeterminate = (convertedData: IConvertedData<any>): boolean => {
    if (
      !convertedData.children ||
      convertedData.children.length === 0 ||
      checkboxItems === undefined
    ) {
      return false;
    }

    const allChildrenChecked = convertedData.children.every((child) =>
      checkboxItems.includes(child.directoryId)
    );

    const someChildrenChecked = convertedData.children.some((child) =>
      checkboxItems.includes(child.directoryId)
    );

    const someDescendantChecked = convertedData.children.some((child) =>
      isIndeterminate(child)
    );

    return (
      (someChildrenChecked && !allChildrenChecked) || someDescendantChecked
    );
  };

  const onClickTreeItem = (async (id?: string) => {
    if (!id || calledApiItems.includes(id)) return;
    const newDataApi = await relatedRawData.onGetRawData(id);
    const concatRawDataWithDataAPI = relatedRawData.rawData?.concat(newDataApi);
    const newRawData = concatRawDataWithDataAPI?.filter(
      (item: any, index: number, array: any[]) =>
        array.findIndex((t: any) => t.directoryId === item.directoryId) ===
        index
    );
    const newRelatedRawData = {
      ...relatedRawData,
      rawData: newRawData,
    };
    setRelatedData(newRelatedRawData);
    const newCalledApiItems = [...calledApiItems];
    newCalledApiItems.push(id);
    setCalledApiItems(newCalledApiItems);
  });
  return (
    <div>
      <TreeItem
        style={{ userSelect: "none" }}
        key={convertedData.directoryId}
        nodeId={convertedData.directoryId}
        label={
          <LabelTreeItem
            convertedData={convertedData}
            handleCheckbox={handleCheckbox}
            isIndeterminate={isIndeterminate}
          />
        }
        onClick={() => {
          typeof onClickTreeItem !== "undefined" &&
            onClickTreeItem(convertedData.directoryId);
        }}
      >
        {Array.isArray(convertedData.children) &&
        convertedData.children.length > 0
          ? convertedData.children.map((convertedDataChildren: any) => {
              return (
                <RenderTreeItem
                  key={convertedDataChildren.directoryId}
                  convertedData={convertedDataChildren}
                />
              );
            })
          : null}
      </TreeItem>
    </div>
  );
};

export default RenderTreeItem;
