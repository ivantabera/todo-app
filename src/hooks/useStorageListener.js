import { useState } from 'react'

export function useStorageListener(sincronizeTodos){

        const [storageChange, setStorageChange] = useState(false)

        // Validar si hay algun cambio en el storage y actualizar el estado
        window.addEventListener('storage', (change) =>{
            if(change.key === 'TODOS_V1'){
                // console.log('Hubo cambios en TODOS_V1');
                setStorageChange(true)
            }
        } );

        const toggleShow= () => {
            sincronizeTodos();
            setStorageChange(false);
        }

        return {
            show:storageChange,
            toggleShow
        }
        
}