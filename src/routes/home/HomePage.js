import React from 'react';

import {useTodos} from '../../hooks/useTodos';

import {TodoCounter} from '../../common/todoCounter/TodoCounter';
import {TodoSearch} from '../../common/todoSearch/TodoSearch';
import {TodoList} from '../../ui/todoList/TodoList';
import {TodoItem} from '../../ui/todoItem/TodoItem';
import {CreateTodoButton} from '../../common/createTodoButton/CreateTodoButton';
import {TodoHeader} from '../../common/todoHeader/TodoHeader';
import {TodosError} from '../../common/todosError/TodosError';
import {TodosLoading} from '../../common/todosLoading/TodosLoading';
import {EmptyTodos} from '../../common/emptyTodos/EmptyTodos';
import {ChangeAlert} from '../../common/changeAlert/ChangeAlert';
import {useNavigate} from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const {
    state,
    stateUpdaters
  } = useTodos();

  const {
    loading,
    searchedTodos,
    searchValue,
    completedTodos,
    totalTodos,
    error
  } = state;

  const {
    handleDeleteTodo,
    handleToggleTodo,
    setSearchValue,
    sincronizeTodos
  } = stateUpdaters

  return (
    <React.Fragment>

      <TodoHeader loading={loading}>
        <TodoCounter
          completedTodos={completedTodos}
          totalTodos={totalTodos}
        />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}

        />
      </TodoHeader>

      {/* Patron Render Prop */}
      <TodoList
        error={error}
        loading={loading}
        searchedTodos={searchedTodos}
        searchValue={searchValue}
        totalTodos={totalTodos}
        onError={() => <TodosError/>}
        onLoading={() => <TodosLoading/>}
        onEmptyTodos={() => <EmptyTodos/>}
        onEmptySearchResults={
          (textValue) => <p>No hay resultados para {textValue}</p>
        }
        render={todo => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            editTodo={() =>
              navigate(
                `/edit/${todo.id}`,
                {state:{todo}}
              )
            }
            toggleTodo={() => handleToggleTodo(todo.id)}
            deleteTodo={() => handleDeleteTodo(todo.id)}
          />
        )
        }
      >
      </TodoList>
      {/* crear la render function TODO's */}

      {/*{!!openModal && (
                <Modal>
                    <TodoForm
                        handleNewTodo={handleNewTodo}
                        setOpenModal={setOpenModal}
                    />
                </Modal>
            )}*/}

      <CreateTodoButton
        onClick={() => navigate('/new')}
      />

      <ChangeAlert sincronizeTodos={sincronizeTodos}/>

    </React.Fragment>
  )

};
