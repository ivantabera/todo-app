import {useEffect, useReducer} from 'react'

// Crear customHook para almacenar en localStorage
export const useLocalStorage = (itemName, initValue) => {

    const [state, dispatch] = useReducer(reducer, initialState({initValue}));

    const {
        sincronizedItem,
        error,
        loading,
        item
    } = state;

    //Action creators
    const onSuccess = (parcedItems) => dispatch({
        type: actionTypes.success,
        payload: parcedItems
    });

    const onError = (error) => dispatch({
        type: actionTypes.error,
        payload: error
    });

    const onUpdate = (newItems) => dispatch({
        type: actionTypes.save,
        payload: newItems
    });

    const onParing = () => dispatch({
        type: actionTypes.paring,
    })

    useEffect(() => {
        // simulamos que nuestra app se tarda 1 segundo en cargar
        setTimeout(() => {
            try {
                // Creamos un nuevo item en el localStorage
                const localStorageItems = localStorage.getItem(itemName);
                let parcedItems;

                // validamos si nuestro item contiene texto
                if (!localStorageItems) {
                    // si el item no contiene informacion le vamos a agregar un arreglo
                    localStorage.setItem(itemName, JSON.stringify(initValue));
                    // Generamos un arreglo vacio cuando no tenemos datos en nuestro item para nuestro initialValue del useState todos
                    parcedItems = initValue
                } else {
                    // Si el item del local storage tiene informacion vamos pasarla a Javascript para usarla en el useStaete de todos
                    parcedItems = JSON.parse(localStorageItems);
                }
                // Actualizar el estado del item y el loading
                onSuccess(parcedItems);
            } catch (error) {
                // Actualizar el estado si hay algun error 
                onError(error);
            }
        }, 1000);
    }, [sincronizedItem])


    // Funcion que nos sirve de puente entre los manejadores de TODOS completados / eliminados y el localStorage
    const saveItems = (newItems) => {
        try {
            // Enviamos la información convertida a texto a nuestro item
            localStorage.setItem(itemName, JSON.stringify(newItems));
            // Actualizamos nuestro estado de TODOS
            onUpdate(newItems)
        } catch (error) {
            onError(error)
        }
    }

    const sincronizeItem = () => {
        onParing();
    }

    // Cambiar el array por objeto, ya que tenemos más estados en este customHook y esto es más conveniente
    // Retornamos el estado actualizado y la función completados /eliminados
    return {
        item,
        saveItems,
        loading,
        error,
        sincronizeItem
    }
}

const initialState = ({initValue}) => ({
    sincronizedItem: true,
    error: false,
    loading: true,
    item: initValue
})

const actionTypes = {
    success: 'SUCCESS',
    error: 'ERROR',
    save: 'SAVE',
    paring: 'PARING'
}

const reducerObject = (state, payload) => ({
    [actionTypes.success]: {
        ...state,
        error: false,
        loading: false,
        sincronizedItem: true,
        item: payload
    },
    [actionTypes.error]: {
        ...state,
        error: true
    },
    [actionTypes.save]: {
        ...state,
        item: payload
    },
    [actionTypes.paring]: {
        ...state,
        loading: true,
        sincronizedItem: false
    }
})

const reducer = (state, action) => {
    return reducerObject(state, action.payload)[action.type] || state;
}
