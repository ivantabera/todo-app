import React from 'react';
import './TodoList.css'

export const TodoList = (props) => {

    const renderFunction = props.render || props.children;

    return (
        <section className='TodoList-Container'>

            {props.error && props.onError()}
            {props.loading && props.onLoading()}

            {/* si no hay TODOS ¡Crea tu primer TODO!*/}
            {(!props.loading && !props.totalTodos) && props.onEmptyTodos()}

            {/* validar si totalTodos no es 0 y si searchtodos es nulo entonces *No hay resultados para {lo que el usuario escriba}**/}
            {(!!props.totalTodos && !props.searchedTodos.length) && props.onEmptySearchResults(props.searchValue)}

            {(!props.loading && !props.error) && props.searchedTodos.map(renderFunction)}


            <ul>
                {props.children}
            </ul>
        </section>
    )
}
