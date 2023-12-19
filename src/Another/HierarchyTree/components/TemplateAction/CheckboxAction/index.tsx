import { Typography, Checkbox } from "@mui/material";
import { TreeNode } from "AWING/HierarchyTree/interface";
import React from "react";

type CheckboxProps = {
  onCheckbox?: (v?: boolean, checklist?: TreeNode) => void;
  node: TreeNode;
};

const CheckboxAction: React.FC<CheckboxProps> = (props) => {
  const { onCheckbox, node } = props;

  return (
    <Typography>
      {onCheckbox && (
        <Checkbox
          onClick={(e) => e.stopPropagation()}
          onChange={(e, v) => onCheckbox(v, node)}
        />
      )}
    </Typography>
  );
};

export default CheckboxAction;
