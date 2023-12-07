import React from "react";
import { IDirectoryTreeViewProps } from "../../interface";
import { RecoilRoot } from "recoil";
import { TreeViewComponent } from "./TreeViewComponent";

export default function DirectoryTreeComponent(
  props: IDirectoryTreeViewProps
) {
  return (
    <RecoilRoot>
      <TreeViewComponent {...props} />
    </RecoilRoot>
  );
}
