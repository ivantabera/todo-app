import React from 'react'
import './TodoItem.css'
import {CompleteIcon} from "../../common/todoIcon/CompleteIcon";
import {EditIcon} from "../../common/todoIcon/EditIcon";
import {DeleteIcon} from "../../common/todoIcon/DeleteIcon";

export const TodoItem = (props) => {

  return (
    <li className="TodoItem">
      <CompleteIcon
        completed={props.completed}
        onComplete={props.toggleTodo}
      />
      <p
        className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}
      >
        {props.text}
      </p>
      <EditIcon
        onEdit={props.editTodo}
      />
      <DeleteIcon
        onDelete={props.deleteTodo}
      />
    </li>
  )
}
