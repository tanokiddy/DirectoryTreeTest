import React from "react";
import { IDirectoryTreeViewProps } from "../../interface";
import { RecoilRoot } from "recoil";
import { TreeViewComponent } from "./TreeViewComponent";

export default function DirectoryTreeComponent(
  props: IDirectoryTreeViewProps<any>
) {
  const {
    defaultCollapseIcon,
    defaultExpandIcon,
    defaultExpanded,
    directoryActionComponents,
    startIcon,
    checkboxItems,
    setCheckboxItems,
    onGetRawData,
    onConvertData,
    ...rest
  } = props;
  
  return (
    <RecoilRoot>
      <TreeViewComponent
        startIcon={startIcon}
        onGetRawData={onGetRawData}
        onConvertData={onConvertData}
        checkboxItems={checkboxItems}
        setCheckboxItems={setCheckboxItems}
        directoryActionComponents={directoryActionComponents}
        {...rest}
      />
    </RecoilRoot>
  );
}
