import React from 'react'
import { IDirectoryTreeViewProps } from "../../interface";
import { RecoilRoot } from "recoil";
import { TreeViewComponent } from "./TreeViewComponent";

export default function TreeContainer(
  props: IDirectoryTreeViewProps<any>
) {
  return (
    <RecoilRoot>
      <TreeViewComponent {...props} />
    </RecoilRoot>
  );
}
