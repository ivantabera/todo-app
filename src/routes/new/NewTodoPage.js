import React from "react";
import {TodoForm} from "../../ui/todoForm/TodoForm";
import {useTodos} from "../../hooks/useTodos";

export const NewTodoPage = () => {
  const {stateUpdaters} = useTodos();
  const {handleNewTodo} = stateUpdaters;

  return(
    <TodoForm
      handleSubmitEvent={(text)=> handleNewTodo(text)}
      label="Escribe tu nuevo ToDo"
      placeholder="Escribe un nuevo ToDo"
      submitText="Crear"
    />
  )
}