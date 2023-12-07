import LabelTreeItem from "../LabelTreeItem";
import React from "react";
import { TreeItem } from "@material-ui/lab";
import { IConvertedData } from "../../../interface";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  calledApiState,
  convertDataFnState,
  endCheckboxState,
  rootConvertedState,
  startCheckboxState,
} from "../../../recoil/atom";

type RenderTreeItemProps = {
  convertedData?: any;
};

const RenderTreeItem: React.FC<RenderTreeItemProps> = (props) => {
  const { convertedData } = props;

  const convertedRootData = useRecoilValue(rootConvertedState);
  const checkboxStart = useRecoilValue(startCheckboxState);
  const {startCheckbox, setStartCheckbox} = checkboxStart
  const [rootConvertedData, setRootConvertedData] =
    useRecoilState(rootConvertedState);
  const [calledApiItems, setCalledApiItems] = useRecoilState(calledApiState);
  const convertDataFn = useRecoilValue(convertDataFnState);
  const checkboxEnd = useRecoilValue(endCheckboxState)
  const {endCheckbox, setEndCheckbox} = checkboxEnd

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
    convertedData.children.forEach((convertedDataChildren: IConvertedData) => {
      const idx = arr.findIndex(
        (item) => item === convertedDataChildren.nodeId
      );
      if (idx > -1) {
        arr.splice(idx, 1);
      }
      handleRemoveCheckbox(arr, convertedDataChildren);
    });
  };

  const handleCheckNested = (arr: string[], convertedData: IConvertedData) => {
    convertedData?.children?.forEach(
      (convertedDataChildren: IConvertedData) => {
        if (!arr.includes(convertedDataChildren.nodeId)) {
          arr.push(convertedDataChildren.nodeId);
          handleCheckNested(arr, convertedDataChildren);
        }
      }
    );
  };

  const handleStartCheckbox = (v: boolean, convertedData: IConvertedData) => {
    if (
      typeof  startCheckbox === "undefined" ||
      typeof setStartCheckbox === "undefined"
    )
      return;
    let newcheckboxItems = [...startCheckbox];
    //remove nested
    if (!v) {
      handleRemoveCheckbox(newcheckboxItems, convertedData);
      setStartCheckbox(newcheckboxItems);
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
    setStartCheckbox(newcheckboxItems);
    if (!convertedData.children?.length) return;
    //add nested
    convertedData.children.forEach((convertedDataChildren: IConvertedData) => {
      if (!newcheckboxItems.includes(convertedDataChildren.nodeId)) {
        newcheckboxItems.push(convertedDataChildren.nodeId);
        handleCheckNested(newcheckboxItems, convertedDataChildren);
      } else {
        return;
      }
    });
  };

  const isIndeterminate = (convertedData: IConvertedData): boolean => {
    if (
      !convertedData.children ||
      convertedData.children.length === 0 ||
      startCheckbox === undefined
    ) {
      return false;
    }

    const allChildrenChecked = convertedData.children.every((child) =>
      startCheckbox.includes(child.nodeId)
    );

    const someChildrenChecked = convertedData.children.some((child) =>
      startCheckbox.includes(child.nodeId)
    );

    const someDescendantChecked = convertedData.children.some((child) =>
      isIndeterminate(child)
    );

    return (
      (someChildrenChecked && !allChildrenChecked) || someDescendantChecked
    );
  };

  const replaceChildren = (object1: IConvertedData, object2: IConvertedData) => {
    if (object1.nodeId === object2.nodeId) {
      const newObj1 = { ...object1 };
      newObj1.children = object2.children;
      return newObj1;
    }
    if (object1.children && object1.children.length > 0) {
      const newChildren = object1.children.map((child) =>
        replaceChildren(child, object2)
      );
      const newObj1 = { ...object1 };
      newObj1.children = newChildren;
      return newObj1;
    }
    return object1;
  }

  const onClickTreeItem = async (id?: string) => {
    if (!id || calledApiItems.includes(id)) return;
    const newDataApi = await convertDataFn.onGetConvertedData(id);
    if(!newDataApi) return
    const newRootConvertedData = replaceChildren(rootConvertedData, newDataApi);
    setRootConvertedData(newRootConvertedData);
    const newCalledApiItems = [...calledApiItems];
    newCalledApiItems.push(id);
    setCalledApiItems(newCalledApiItems);
  };

  const handleEndCheckbox = (nodeId: string) => {
    if(typeof endCheckbox === 'undefined' || typeof setEndCheckbox === 'undefined') return
    const newEndCheckbox = [...endCheckbox]
    const isInclude = newEndCheckbox.includes(nodeId)
    if(!isInclude) {
      newEndCheckbox.push(nodeId)
    } else {
      const idx = newEndCheckbox.findIndex(item => item === nodeId)
      if(idx > -1) {
        newEndCheckbox.splice(idx, 1)
      }
    }
    setEndCheckbox(newEndCheckbox)
  }

  return (
    <div>
      <TreeItem
        style={{ userSelect: "none" }}
        key={convertedData.nodeId}
        nodeId={convertedData.nodeId}
        label={
          <LabelTreeItem
            convertedData={convertedData}
            handleStartCheckbox={handleStartCheckbox}
            handleEndCheckbox={handleEndCheckbox}
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
