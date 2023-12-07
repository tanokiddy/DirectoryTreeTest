import { TreeView } from "@material-ui/lab";
import React, { useEffect } from "react";
import RenderTreeItem from "../RenderTreeItem";
import { ChevronRight, ExpandMore } from "@material-ui/icons";
import { IDirectoryTreeViewProps } from "../../../interface";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  startCheckboxState,
  convertDataFnState,
  labelTreeState,
  rootConvertedState,
  endCheckboxState,
} from "../../../recoil/atom";

export const TreeViewComponent: React.FC<IDirectoryTreeViewProps> = (
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
    setEndCheckbox
  } = props;

  const [, setLabelTree] = useRecoilState(labelTreeState);
  const [, setCheckboxStart] = useRecoilState(startCheckboxState);
  const [, setCheckboxEnd] = useRecoilState(endCheckboxState);
  const [convertedRootData, setConvertedRootData] = useRecoilState(rootConvertedState)
  const setConvertDataFn = useSetRecoilState(convertDataFnState)
  
  useEffect(() => {
    if(typeof onGetConvertedData === 'undefined') return
    const fetchAPI = async () => {
      const convertedData = await onGetConvertedData()
      setConvertedRootData(convertedData)
    };
    fetchAPI();
    setConvertDataFn({onGetConvertedData})
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

  if (!convertedRootData?.nodeId) return null;
  
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