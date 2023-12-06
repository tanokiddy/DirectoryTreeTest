import { Checkbox, Typography } from "@material-ui/core";
import React from "react";
import { ILabelTreeItemProps } from "../../../interface";
import { useRecoilState, useRecoilValue } from "recoil";
import { checkboxState, labelTreeState } from "../../../recoil/atom";

const LabelTreeItem = (props: ILabelTreeItemProps<any>) => {
  const { convertedData, handleCheckbox, isIndeterminate } = props;
  
  const [checkList, setCheckList] = useRecoilState(checkboxState);
  const {checkboxItems, setCheckboxItems} = checkList
  const labelTreeProps = useRecoilValue(labelTreeState)
  const {startIcon, directoryActionComponents} = labelTreeProps

  
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {typeof checkboxItems !== "undefined"  ? (
        <Typography>
          <Checkbox
            onClick={(e) => e.stopPropagation()}
            style={{ color: "unset" }}
            onChange={(e, v) => {
              handleCheckbox(v, convertedData);
            }}
            checked={checkboxItems.includes(convertedData.directoryId)}
            indeterminate={
              convertedData.children !== undefined &&
              isIndeterminate(convertedData)
            }
          />
        </Typography>
      ) : null}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Typography>{startIcon}</Typography>
        <Typography>{convertedData.name}</Typography>
      </div>
      {directoryActionComponents ? (
        <Typography style={{ width: 70, height: 40 }}>
          {directoryActionComponents(convertedData.isSystem)}
        </Typography>
      ) : null}
    </div>
  );
};

export default LabelTreeItem;
