import React from 'react';
import './TodoSearch.css'

export const TodoSearch = ({searchValue, setSearchValue, loading} ) => {

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value)
  }

  return (
      <input 
        className="TodoSearch" 
        placeholder="Buscar..." 
        onChange={ handleSearchValueChange }
        value={searchValue}
        disabled={loading}
      />
  )
}
