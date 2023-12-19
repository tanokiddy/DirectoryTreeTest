/* eslint-disable react-hooks/exhaustive-deps */
import { TreeView } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import RenderTreeItem from "../RenderTreeItem";
import { ChevronRight, ExpandMore } from "@material-ui/icons";
import {
  IConvertedData,
  IDirectoryTreeViewProps,
} from "AWING/HierarchyTree/interface";

export const TreeViewComponent: React.FC<IDirectoryTreeViewProps> = (props) => {
  const { onGetConvertedData } = props;
  const [convertedTreeData, setConvertedTreeData] = useState<IConvertedData>();

  useEffect(() => {
    if (!onGetConvertedData) return;
    const fetchAPI = async () => {
      const convertedData = await onGetConvertedData();
      setConvertedTreeData(convertedData);
    };
    fetchAPI();
  }, []);


  if (!convertedTreeData) return null;

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
    >
      <RenderTreeItem
        convertedTreeData={convertedTreeData}
        convertedData={convertedTreeData}
      />
    </TreeView>
  );
};


import React from "react";
import { TreeItem } from "@material-ui/lab";
import LabelTreeItem from "../LabelTreeItem";
import { IConvertedData } from "AWING/HierarchyTree/interface";

interface RenderTreeItemProps {
  convertedData?: IConvertedData;
  convertedTreeData: IConvertedData
}

const RenderTreeItem: React.FC<RenderTreeItemProps> = (props) => {
  const { convertedData, convertedTreeData } = props;
  
  if (!convertedData) return null;

  return (
    <TreeItem
      style={{ userSelect: "none" }}
      key={convertedData.nodeId}
      nodeId={convertedData.nodeId}
      label={
        <LabelTreeItem
          convertedData={convertedData}
        />
      }
    >
      {Array.isArray(convertedData.children) &&
        convertedData.children.length > 0 &&
        convertedData.children.map((convertedDataChildren) => {
          return (
            <RenderTreeItem
              key={convertedDataChildren.nodeId}
              convertedData={convertedDataChildren}
              convertedTreeData={convertedTreeData}
            />
          );
        })}
    </TreeItem>
  );
};

export default RenderTreeItem;


import React from "react";
import { Checkbox, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { IConvertedData } from "AWING/HierarchyTree/interface";

type ILabelTreeItemProps = {
  convertedData: IConvertedData;
};

const useStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    height: 56,
    padding: 16,
  },
  boxLabel: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  labelText: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  checkbox: {
    padding: "unset",
  },
});

const LabelTreeItem: React.FC<ILabelTreeItemProps> = (props) => {
  const { convertedData} = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.boxLabel}>
        <Typography>
          <Checkbox
              checked={convertedData.checked}
              indeterminate={convertedData.indeterminate}
              onClick={(e) => {
                e.stopPropagation();
              }}
          />
        </Typography>

        <div className={classes.labelText}>
          <Typography>{convertedData.name}</Typography>
        </div>
      </div>
    </div>
  );
};

export default LabelTreeItem;
