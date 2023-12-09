import React from 'react'
import { Checkbox, Typography } from "@material-ui/core";
import { ILabelTreeItemProps } from "../../../interface";
import { useRecoilValue } from "recoil";
import {
  callbackFnState,
  endCheckboxState,
  labelTreeState,
  startCheckboxState,
} from "../../../recoil/atom";

const LabelTreeItem = (props: ILabelTreeItemProps<any>) => {
  const {
    convertedData,
    handleStartCheckbox,
    handleEndCheckbox,
    isIndeterminate,
  } = props;

  const checkboxStart = useRecoilValue(startCheckboxState);
  const { startCheckbox } = checkboxStart;
  const checkboxEnd = useRecoilValue(endCheckboxState);
  const { endCheckbox } = checkboxEnd;
  const labelTreeProps = useRecoilValue(labelTreeState);
  const { startIcon, actionComponents } = labelTreeProps;
  const callbackFn = useRecoilValue(callbackFnState)
  const {onGetLabelName,onGetNodeId} = callbackFn

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {typeof startCheckbox !== "undefined" ? (
        <Typography>
          <Checkbox
            onClick={(e) => e.stopPropagation()}
            style={{ color: "unset" }}
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
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Typography>{startIcon}</Typography>
        <Typography>{onGetLabelName(convertedData)}</Typography>
      </div>
      {actionComponents ? (
        <Typography style={{ width: 70, height: 40 }}>
          {actionComponents}
        </Typography>
      ) : null}
      {typeof endCheckbox !== "undefined" ? (
        <Typography>
          <Checkbox
            onClick={(e) => e.stopPropagation()}
            style={{ color: "unset" }}
            onChange={() => handleEndCheckbox(onGetNodeId(convertedData))}
            checked={endCheckbox.includes(onGetNodeId(convertedData))}
          />
        </Typography>
      ) : null}
    </div>
  );
};

export default LabelTreeItem;
