import React from 'react'
import './CreateTodoButton.css'

export const CreateTodoButton = (props) => {

  return (
    <button 
      className="CreateTodoButton"
      onClick={ props.onClick }
    >
      +
    </button>
  )
}
