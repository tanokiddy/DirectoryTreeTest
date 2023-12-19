import React from "react";

type CreateDirectoryProps = {
  onCreate?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const CreateDirectoryAction = (props: CreateDirectoryProps) => {
  const { onCreate } = props;

  return <div onClick={onCreate && ((e) => {onCreate(e)})}>CreateDirectoryAction</div>;
};

export default CreateDirectoryAction;
