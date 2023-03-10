import React from 'react';
import {TodoIcon} from "./TodoIcon";

export const CompleteIcon = ({ completed, onComplete }) => {
  return (
    <TodoIcon
      type="check"
      color={completed ? '#4caf50' : 'gray'}
      onClick={onComplete}
    />
  );
};