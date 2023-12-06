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
  rootConvertedState,
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
  const [, setCheckbox] = useRecoilState(checkboxState);
  const [calledApiItems, setCalledApiItems] = useRecoilState(calledApiState);
  const [relatedRawData, setRelatedRawData] = useRecoilState(rawDataState);
  const [, setConvertedRootData] = useRecoilState(rootConvertedState)

  useEffect(() => {
    if(!relatedRawData.rawData?.length) return
    setConvertedRootData(onConvertData(relatedRawData.rawData)[0])
  },[relatedRawData.rawData])

  useEffect(() => {
    const fetchAPI = async () => {
      const rawData = await onGetRawData();
      const newRawData = { rawData, onGetRawData };
      setRelatedRawData(newRawData);
      const newCalledApiItems = [...calledApiItems];
      newCalledApiItems.push(rawData[0].directoryId);
      setCalledApiItems(newCalledApiItems);
    };
    fetchAPI();
    setRelatedRawData({
      onGetRawData,
    });
  }, []);

  useEffect(() => {
    setLabelTree({
      startIcon,
      directoryActionComponents,
    });
  }, [startIcon, directoryActionComponents]);

  useEffect(() => {
    setCheckbox({
      setCheckboxItems,
      checkboxItems,
    });
  }, [checkboxItems]);

  useEffect(() => {
    setTreeView({
      defaultCollapseIcon,
      defaultExpandIcon,
      defaultExpanded,
    });
  }, [defaultCollapseIcon, defaultExpandIcon, defaultExpanded]);

  if (!relatedRawData.rawData?.length) return null;
  const convertedRootData = onConvertData(relatedRawData.rawData)[0];

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
    >
      <RenderTreeItem convertedData={convertedRootData} />
    </TreeView>
  );
};
