import React from "react";
import { Checkbox, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { IConvertedData } from "../../../interface";

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
  const {convertedData} = props
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.boxLabel}>
        <Typography>
          <Checkbox
            className={classes.checkbox}
            onClick={(e) => e.stopPropagation()}
          />
        </Typography>
        <Typography>
          {convertedData.name}
        </Typography>
      </div>
    </div>
  );
};

export default LabelTreeItem;
