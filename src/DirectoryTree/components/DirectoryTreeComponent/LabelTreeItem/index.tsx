/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { Checkbox, Typography } from "@material-ui/core";
import React from "react";
import { IConvertedData, ILabelTreeItemProps } from "../../../interface";
import { useDirectory } from "../../../contexts/DirectoryTreeContext/DirectoryTreeContext";

const LabelTreeItem = (props: ILabelTreeItemProps<any>) => {
  const { convertedData, handleCheckbox, isIndeterminate } = props;

  const {
    localCheckbox,
    setLocalCheckbox,
    startIcon,
    directoryActionComponents,
  } = useDirectory();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {typeof localCheckbox !== "undefined" &&
      typeof setLocalCheckbox !== "undefined" ? (
        <Typography>
          <Checkbox
            onClick={(e) => e.stopPropagation()}
            style={{ color: "unset" }}
            onChange={(e, v) => {
              handleCheckbox(v, convertedData);
            }}
            checked={localCheckbox.includes(convertedData.directoryId)}
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
