import React, { Children, cloneElement } from 'react'

export const TodoHeader = ({children, loading}) => {

    return (
        <header>
            {
                Children
                .toArray(children)
                .map( child => cloneElement(child, {loading}))
            }
        </header>
    )
}
