import React from "react";
import { NodeStatus, TreeNode } from "AWING/HierarchyTree/interface";
import { Checkbox, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

type ILabelTreeItemProps = {
  treeNode: TreeNode;
  onCheck?: (treeNode: TreeNode) => void;
  actionComponents?: (props?: any) => React.JSX.Element;
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
  const { treeNode, onCheck, actionComponents } = props;

  const classes = useStyles();

  const isChecked = (currentNode: TreeNode) => {
    if (currentNode.status === NodeStatus.Checked) {
      return true;
    } else if (currentNode.status === NodeStatus.Unchecked) {
      return false;
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.boxLabel}>
        {onCheck && (
          <Typography>
            <Checkbox
              data-nodeid={treeNode.nodeId}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={() => {
                onCheck(treeNode);
              }}
              checked={isChecked(treeNode)}
              indeterminate={treeNode.status === NodeStatus.Indeterminate}
            />
          </Typography>
        )}

        <div className={classes.labelText}>
          <Typography>{treeNode.name}</Typography>
        </div>
      </div>
      <Typography>{actionComponents && actionComponents(treeNode)}</Typography>
    </div>
  );
};

export default LabelTreeItem;
