import { TreeView } from "@material-ui/lab";
import React from "react";
import RenderTreeItem from "../RenderTreeItem";
import { ChevronRight, ExpandMore } from "@material-ui/icons";
import { useDirectory } from "../../../contexts/DirectoryTreeContext/DirectoryTreeContext";

export default function TreeViewComponent() {

    const { convertedRootData } = useDirectory()

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
    >
      <RenderTreeItem convertedData={convertedRootData}/>
    </TreeView>
  );
}
