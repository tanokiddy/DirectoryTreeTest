import { TreeView } from "@material-ui/lab";
import React, { useEffect } from "react";
import RenderTreeItem from "../RenderTreeItem";
import { ChevronRight, ExpandMore } from "@material-ui/icons";
import { IDirectoryTreeViewProps } from "../../../interface";
import { useRecoilState } from "recoil";
import {
  calledApiState,
  startCheckboxState,
  convertDataFnState,
  labelTreeState,
  rootConvertedState,
  treeViewState,
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
    directoryActionComponents,
    startIcon,
    startCheckbox,
    setStartCheckbox,
    endCheckbox,
    setEndCheckbox
  } = props;

  const [, setTreeView] = useRecoilState(treeViewState);
  const [, setLabelTree] = useRecoilState(labelTreeState);
  const [, setCheckboxStart] = useRecoilState(startCheckboxState);
  const [, setCheckboxEnd] = useRecoilState(endCheckboxState);
  const [calledApiItems, setCalledApiItems] = useRecoilState(calledApiState);
  const [convertedRootData, setConvertedRootData] = useRecoilState(rootConvertedState)
  const [convertDataFn, setConvertDataFn] = useRecoilState(convertDataFnState)
  
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
      directoryActionComponents,
    });
  }, [startIcon, directoryActionComponents]);

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

  useEffect(() => {
    setTreeView({
      defaultCollapseIcon,
      defaultExpandIcon,
      defaultExpanded,
    });
  }, [defaultCollapseIcon, defaultExpandIcon, defaultExpanded]);

  if (!convertedRootData?.nodeId) return null;
  
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      defaultExpanded={defaultExpanded}
    >
      <RenderTreeItem convertedData={convertedRootData} />
    </TreeView>
  );
};