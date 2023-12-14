import React from "react";
import { RecoilRoot } from "recoil";
import { TreeViewComponent } from "./components/TreeContainer/TreeViewComponent";
import { IDirectoryTreeViewProps } from "AWING/HierarchyTree/interface";

const TreeContainer: React.FC<IDirectoryTreeViewProps<any>> = (props) => {
  return (
    <RecoilRoot>
      <TreeViewComponent {...props} />
    </RecoilRoot>
  );
};

export default TreeContainer
export * from "./interface";
