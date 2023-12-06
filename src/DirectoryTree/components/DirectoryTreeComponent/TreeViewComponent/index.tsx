import { TreeView } from "@material-ui/lab";
import React, { useEffect } from "react";
import RenderTreeItem from "../RenderTreeItem";
import { ChevronRight, ExpandMore } from "@material-ui/icons";
import { IDirectoryTreeViewProps } from "../../../interface";
import { useRecoilState } from "recoil";
import {
  calledApiState,
  checkboxState,
  labelTreeState,
  rawDataState,
  treeViewState,
} from "../../../recoil/atom";

export const TreeViewComponent: React.FC<IDirectoryTreeViewProps<any>> = (
  props
) => {
  const {
    onConvertData,
    onGetRawData,
    defaultCollapseIcon,
    defaultExpandIcon,
    defaultExpanded,
    directoryActionComponents,
    checkboxItems,
    setCheckboxItems,
    startIcon,
  } = props;
  const [, setTreeView] = useRecoilState(treeViewState);
  const [, setLabelTree] = useRecoilState(labelTreeState);
  const [checkbox, setCheckbox] = useRecoilState(checkboxState);
  const [calledApiItems, setCalledApiItems] = useRecoilState(calledApiState);
  const [relatedRawData, setRelatedRawData] = useRecoilState(rawDataState);
  
  useEffect(() => {
    const fetchAPI = async () => {
      const rawData = await onGetRawData();
      const newRawData = {rawData, onGetRawData}
      setRelatedRawData(newRawData)
      const newCalledApiItems = [...calledApiItems];
      newCalledApiItems.push(rawData[0].directoryId);
      setCalledApiItems(newCalledApiItems);
    };
    fetchAPI();
    setTreeView({
      defaultCollapseIcon,
      defaultExpandIcon,
      defaultExpanded
    })
    setLabelTree({
      startIcon,
      directoryActionComponents
    })
    setCheckbox({
      setCheckboxItems,
      checkboxItems
    })
    setRelatedRawData({
      onGetRawData
    })
  }, []);

  if(!relatedRawData.rawData?.length) return null
  const convertedRootData = onConvertData(relatedRawData.rawData)?.[0]
  
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
    >
      <RenderTreeItem convertedData={convertedRootData} />
    </TreeView>
  );
};
