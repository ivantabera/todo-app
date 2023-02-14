import React from "react";
import {TodoIcon} from "./TodoIcon";

export const EditIcon = ({onEdit}) => {
  return(
    <TodoIcon
      type="edit"
      onClick={onEdit}
    />
  );
};