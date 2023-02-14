import React from "react";
import {TodoForm} from "../../ui/todoForm/TodoForm";
import {useTodos} from "../../hooks/useTodos";
import {useLocation, useParams} from "react-router-dom";

export const EditTodoPage = () => {
  const location = useLocation();

  const params = useParams();
  const id = Number(params.id)

  const {state, stateUpdaters} = useTodos();
  const {handleEditTodo} = stateUpdaters;
  const {getTodo, loading} = state;

  let todoText;
  if (location.state?.todo) {
    todoText = location.state.todo.text;
  } else if (loading) {
    return <p>Cargando...</p>
  } else {
    const todoUse = getTodo(id);
    todoText = todoUse.text;
  }

  return (
    <TodoForm
      defaultTodoText={todoText}
      handleSubmitEvent={(newText) => handleEditTodo(id, newText)}
      label="Edita la información de ToDo"
      placeholder="Edita la información del ToDo"
      submitText="Editar"
    />
  );

};