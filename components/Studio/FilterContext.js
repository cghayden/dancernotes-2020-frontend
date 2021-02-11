import { useState, createContext, useContext } from 'react'
const FilterContext = createContext(null)

function FilterProvider({ children }) {
  const [filter, setFilter] = useState({})
  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  )
}

function useFilter() {
  const filterState = useContext(FilterContext)
  return filterState
}

export { useFilter, FilterProvider, FilterContext }
