import {useState} from 'react'
import {useLocalStorage} from '../hooks/useLocalStorage';

export const useTodos = () => {
  // CustomHook localStorage
  const {
    item: todos,
    saveItems: saveTodos,
    sincronizeItem: sincronizeTodos,
    loading,
    error
  } = useLocalStorage('TODOS_V2', []);

  const [searchValue, setSearchValue] = useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  // Nueva variable que va a recibir los TODOS y renderizaremos en el componente
  let searchedTodos = [];

  // Si el estado searchValue cambia se activa el buscador
  if (!searchValue >= 1) {
    searchedTodos = todos;
  } else {
    // filtrar los TODO
    searchedTodos = todos.filter(todo => {
      // pasar los TODO a minusculas
      const todoText = todo.text.toLowerCase();
      // pasar el estado a minusculas
      const searchedText = searchValue.toLowerCase();
      // comparamos que al menos un caracter del search coincida con el TODO
      return todoText.includes(searchedText);
    })
  }

  // Agregar función para Agregar todo que reciba el texto TODO's
  const handleNewTodo = (text) => {
    // Se genera el id para el nuevo todo
    const id = newTodoId(todos);
    // Generamos un nuevo array con la copia de todos los TODOS
    const newArrayTodos = [...todos];
    // Agregamos el nuevo TODO a la lista
    newArrayTodos.push(
      {
        text,
        completed: false,
        id
      }
    )
    // Actualizamos el estado de los TODOS
    saveTodos(newArrayTodos)
  }

  /**
   * Esta función nos permite obtener un registro de TODO
   * @param {Number} id Es el id del TODO
   * @return {Object} Retorna un registro
   * */
    //Buscar TODO por medio del id
  const getTodo = (id) => {
      const todoIndex = todos.findIndex(todo => todo.id === id);
      return todos[todoIndex];
    }

  // Manejador de TODOS completados
  const handleToggleTodo = (id) => {
    // buscar el index del TODO por medio del texto
    const todoIndex = todos.findIndex(todo => todo.id === id);
    // Generamos un nuevo array con la copia de todos los TODOS
    const newArrayTodos = [...todos];
    // Accedemos al index del TODO seleccionado y le asignamos el valor verdadero en su propiedad completed
    !newArrayTodos[todoIndex].completed ? newArrayTodos[todoIndex].completed = true : newArrayTodos[todoIndex].completed = false;
    // Actualizamos el estado de los TODOS
    saveTodos(newArrayTodos)
  }

  // Manejar TODOs editado
  const handleEditTodo = (id, newText) => {
    // buscar el index del TODO por medio del texto
    const todoIndex = todos.findIndex(todo => todo.id === id);
    // Generamos un nuevo array con la copia de todos los TODOS
    const newArrayTodos = [...todos];
    // Accedemos al index del TODO seleccionado y le asignamos el valor verdadero en su propiedad completed
    newArrayTodos[todoIndex].text = newText;
    // Actualizamos el estado de los TODOS
    saveTodos(newArrayTodos)
  }

  // Manejador de TODOS eliminados
  const handleDeleteTodo = (id) => {
    // buscar el index del TODO por medio del id
    const todoIndex = todos.findIndex(todo => todo.id === id);
    // Generamos un nuevo array con la copia de todos los TODOS
    const newArrayTodos = [...todos];
    // Cambiamos el contenido del array en este caso eliminamos
    newArrayTodos.splice(todoIndex, 1);
    saveTodos(newArrayTodos);
  }

  const state = {
    loading,
    error,
    totalTodos,
    getTodo,
    completedTodos,
    searchValue,
    searchedTodos
  }

  const stateUpdaters = {
    setSearchValue,
    handleNewTodo,
    handleToggleTodo,
    handleEditTodo,
    handleDeleteTodo,
    sincronizeTodos
  }

  return {state, stateUpdaters};
};

export const newTodoId = (todoList) => {
  //Validar si no hay ningún registro de todo que retorne 1 para el id
  if (todoList.length === 0) {
    return 1;
  }
  //Buscar él id más grande y al retornarlo le sumamos 1 para el nuevo id
  const idList = todoList.map(todo => todo.id);
  const idMax = Math.max(...idList);
  return idMax + 1;
}