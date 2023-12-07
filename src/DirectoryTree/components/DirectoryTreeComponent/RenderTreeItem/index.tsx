import LabelTreeItem from "../LabelTreeItem";
import React from "react";
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
    parentData: IConvertedData,
    convertedData: IConvertedData,
    arr: string[]
  ) => {
    if (!parentData || !convertedData || !parentData.children) return;
    const allChildrenChecked = parentData.children?.every((child: any) =>
      arr.includes(child.nodeId)
    );

    parentData.children?.forEach((parentDataChildren: IConvertedData) => {
      if (parentDataChildren.nodeId === convertedData.nodeId) {
        if (allChildrenChecked) {
          arr.push(parentData.nodeId);
          handleCheckFatherItem(convertedRootData, parentData, arr);
        }
        // return;
      }
      handleCheckFatherItem(parentDataChildren, convertedData, arr);
    });
  };

  const handleCheckIndeterminate = (
    parentData: IConvertedData,
    convertedData: IConvertedData,
    arr: string[]
  ) => {
    if (!parentData?.nodeId || !convertedData?.nodeId) return;
    parentData.children?.forEach((parentDataChildren: IConvertedData) => {
      if (parentDataChildren.nodeId === convertedData.nodeId) {
        const idx = arr.findIndex((item) => item === parentData.nodeId);
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
    convertedData: IConvertedData
  ) => {
    const idx = arr.findIndex((item) => item === convertedData.nodeId);
    if (idx > -1) {
      arr.splice(idx, 1);
    }
    if (!convertedData.children?.length) return;
    convertedData.children.forEach(
      (convertedDataChildren: IConvertedData) => {
        const idx = arr.findIndex(
          (item) => item === convertedDataChildren.nodeId
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
    convertedData: IConvertedData
  ) => {
    convertedData?.children?.forEach(
      (convertedDataChildren: IConvertedData) => {
        if (!arr.includes(convertedDataChildren.nodeId)) {
          arr.push(convertedDataChildren.nodeId);
          handleCheckNested(arr, convertedDataChildren);
        }
      }
    );
  };

  const handleCheckbox = (v: boolean, convertedData: IConvertedData) => {
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
    newcheckboxItems.push(convertedData.nodeId);
    handleCheckFatherItem(convertedRootData, convertedData, newcheckboxItems);
    setCheckboxItems(newcheckboxItems);
    if (!convertedData.children?.length) return;
    //add nested
    convertedData.children.forEach(
      (convertedDataChildren: IConvertedData) => {
        if (!newcheckboxItems.includes(convertedDataChildren.nodeId)) {
          newcheckboxItems.push(convertedDataChildren.nodeId);
          handleCheckNested(newcheckboxItems, convertedDataChildren);
        } else {
          return;
        }
      }
    );
  };

  const isIndeterminate = (convertedData: IConvertedData): boolean => {
    if (
      !convertedData.children ||
      convertedData.children.length === 0 ||
      checkboxItems === undefined
    ) {
      return false;
    }

    const allChildrenChecked = convertedData.children.every((child) =>
      checkboxItems.includes(child.nodeId)
    );

    const someChildrenChecked = convertedData.children.some((child) =>
      checkboxItems.includes(child.nodeId)
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
      array.findIndex((t: any) => t.nodeId === item.nodeId) ===
      index
      );
    console.log('newRawData: ', newRawData);
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
        key={convertedData.nodeId}
        nodeId={convertedData.nodeId}
        label={
          <LabelTreeItem
            convertedData={convertedData}
            handleCheckbox={handleCheckbox}
            isIndeterminate={isIndeterminate}
          />
        }
        onClick={() => {
          typeof onClickTreeItem !== "undefined" &&
            onClickTreeItem(convertedData.nodeId);
        }}
      >
        {Array.isArray(convertedData.children) &&
        convertedData.children.length > 0
          ? convertedData.children.map((convertedDataChildren: any) => {
              return (
                <RenderTreeItem
                  key={convertedDataChildren.nodeId}
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
