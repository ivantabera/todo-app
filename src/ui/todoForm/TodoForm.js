import React, {useState} from 'react'
import './TodoForm.css';
import {useNavigate} from "react-router-dom";

export const TodoForm = (props) => {
  const navigate = useNavigate();

  const [newTodoValue, setNewTodoValue] = useState(props.defaultTodoText || '');

  const onChange = (e) => {
    setNewTodoValue(e.target.value);
  }

  const onCancel = () => {
    navigate('/')
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.handleSubmitEvent(newTodoValue);
    navigate('/')
  }


  return (
    <form onSubmit={onSubmit}>
      <label>{props.label}</label>
      <textarea
        placeholder={props.placeholder}
        onChange={onChange}
        value={newTodoValue}
      />
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button-cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>

        <button
          className="TodoForm-button TodoForm-button-add"
          type="submit"
        >
          {props.submitText}
        </button>
      </div>
    </form>
  )
}
