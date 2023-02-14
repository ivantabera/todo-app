import React from 'react'
import { useStorageListener } from '../../hooks/useStorageListener'

import './ChangeAlert.css';

export const ChangeAlert = ( { sincronizeTodos } ) => {

    const { show, toggleShow } = useStorageListener(sincronizeTodos);

    if (show) {
        return (
            <div className='ChangeAlert-bg'>
                <div className='ChangeAlert-container'>
                    <p>Hubo Cambios en los TODOS en otra pestaña o ventana del navegador</p>
                    <p>Quieres sincronizar tus TODOS</p>
                    <button
                        className='TodoForm-button TodoForm-button--add'
                        onClick={ () => toggleShow(false) }
                    >
                        Si
                    </button>
                </div>
            </div>
        )
    } else {
        return <></>;
    }
    
}