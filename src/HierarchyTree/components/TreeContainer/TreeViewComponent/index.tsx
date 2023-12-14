import { TreeView } from "@material-ui/lab";
import React, { useEffect } from "react";
import RenderTreeItem from "../RenderTreeItem";
import { ChevronRight, ExpandMore } from "@material-ui/icons";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  callbackFnState,
  convertDataFnState,
  endCheckboxState,
  labelTreeState,
  rootConvertedState,
  startCheckboxState,
} from "AWING/HierarchyTree/recoil/atom";
import { IDirectoryTreeViewProps } from "AWING/HierarchyTree/interface";

export const TreeViewComponent: React.FC<IDirectoryTreeViewProps<any>> = (
  props
) => {
  const {
    onGetConvertedData,
    defaultCollapseIcon,
    defaultExpandIcon,
    defaultExpanded,
    actionComponents,
    startIcon,
    startCheckbox,
    setStartCheckbox,
    endCheckbox,
    setEndCheckbox,
    onGetLabelName,
    onGetNodeId,
  } = props;

  const [, setLabelTree] = useRecoilState(labelTreeState);
  const [, setCheckboxStart] = useRecoilState(startCheckboxState);
  const [, setCheckboxEnd] = useRecoilState(endCheckboxState);
  const [convertedRootData, setConvertedRootData] =
    useRecoilState(rootConvertedState);
  const setConvertDataFn = useSetRecoilState(convertDataFnState);
  const setCallbackFn = useSetRecoilState(callbackFnState);

  useEffect(() => {
    if (!onGetLabelName || !onGetNodeId) return;
    setCallbackFn({
      onGetLabelName,
      onGetNodeId,
    });
  }, []);

  useEffect(() => {
    if (!onGetConvertedData) return;
    const fetchAPI = async () => {
      const convertedData = await onGetConvertedData();
      setConvertedRootData(convertedData);
    };
    fetchAPI();
    setConvertDataFn({ onGetConvertedData });
  }, []);

  useEffect(() => {
    setLabelTree({
      startIcon,
      actionComponents,
    });
  }, [startIcon, actionComponents]);

  useEffect(() => {
    setCheckboxStart({
      setStartCheckbox,
      startCheckbox,
    });
  }, [startCheckbox]);

  useEffect(() => {
    setCheckboxEnd({
      setEndCheckbox,
      endCheckbox,
    });
  }, [endCheckbox]);

  if (!convertedRootData) return null;

  return (
    <TreeView
      defaultCollapseIcon={defaultCollapseIcon || <ExpandMore />}
      defaultExpandIcon={defaultExpandIcon || <ChevronRight />}
      defaultExpanded={defaultExpanded}
    >
      <RenderTreeItem convertedData={convertedRootData} />
    </TreeView>
  );
};
