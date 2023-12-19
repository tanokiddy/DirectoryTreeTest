import React from "react";
import CheckboxAction from "AWING/HierarchyTree/components/TemplateAction/CheckboxAction";
import CreateDirectoryAction from "AWING/HierarchyTree/components/TemplateAction/CreateDirectory";
import { TreeNode } from "AWING/HierarchyTree/interface";
import { makeStyles } from "@mui/styles";

type TemplateActionProps = {
  onCheckbox?: () => TreeNode;
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    gap: 8
  },
});

export const TemplateAction = (props: TemplateActionProps) => {

  const { onCheckbox } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CheckboxAction onCheckbox={onCheckbox} />
    </div>
  );
};
