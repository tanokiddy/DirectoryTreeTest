import React from "react";
import { Checkbox, Typography } from "@material-ui/core";
import { IConvertedData } from "../../../interface";
import { useRecoilValue } from "recoil";
import {
  callbackFnState,
  endCheckboxState,
  labelTreeState,
  startCheckboxState,
} from "../../../recoil/atom";
import { makeStyles } from "@material-ui/styles";

type ILabelTreeItemProps<T> = {
  convertedData: IConvertedData<T>;
  handleStartCheckbox: (v: boolean, convertedData: IConvertedData<T>) => void;
  handleEndCheckbox: (nodeId: string) => void;
  isIndeterminate: (convertedData: IConvertedData<T>) => boolean
};

const useStyles = makeStyles({
  root: {
    boxSizing: 'border-box',
    display: "flex",
    alignItems: "center",
    justifyContent: 'space-between',
    gap: 16,
    height: 56,
    padding: 16
  },
  boxLabel: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  labelText: {
    display: 'flex',
    alignItems: 'center',
    gap: 16
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  checkbox: {
    padding: 'unset'
  }
});

const LabelTreeItem:React.FC<ILabelTreeItemProps<any>> = (props) => {
  const {
    convertedData,
    handleStartCheckbox,
    handleEndCheckbox,
    isIndeterminate,
  } = props;

  const classes = useStyles();

  const { startCheckbox } = useRecoilValue(startCheckboxState);
  const { endCheckbox } = useRecoilValue(endCheckboxState);
  const { startIcon, actionComponents } = useRecoilValue(labelTreeState);
  const { onGetLabelName, onGetNodeId } = useRecoilValue(callbackFnState);

  return (
    <div className={classes.root}>
      <div className={classes.boxLabel}>
        {startCheckbox ? (
          <Typography>
            <Checkbox
              className={classes.checkbox}
              onClick={(e) => e.stopPropagation()}
              onChange={(e, v) => {
                handleStartCheckbox(v, convertedData);
              }}
              checked={startCheckbox.includes(onGetNodeId(convertedData))}
              indeterminate={
                convertedData.children !== undefined &&
                isIndeterminate(convertedData)
              }
            />
          </Typography>
        ) : null}
        <div className={classes.labelText}>
          {startIcon && <Typography>{startIcon}</Typography>}
          <Typography>{onGetLabelName(convertedData)}</Typography>
        </div>
      </div>
      <div className={classes.actions}>
        {actionComponents ? (
          <div onClick={e => e.stopPropagation()}>
            {actionComponents(convertedData)}
          </div>
        ) : null}
        {endCheckbox ? (
          <Typography>
            <Checkbox
              className={classes.checkbox}
              onClick={(e) => e.stopPropagation()}
              onChange={() => handleEndCheckbox(onGetNodeId(convertedData))}
              checked={endCheckbox.includes(onGetNodeId(convertedData))}
            />
          </Typography>
        ) : null}
      </div>
    </div>
  );
};

export default LabelTreeItem;
