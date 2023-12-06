/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
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
