import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
const CheckboxDiv = styled.div`
  .category-heading {
    text-transform: uppercase;
  }
  li {
    padding: 0.25rem 0;
  }
`

const FilterDropDownButton = styled.button`
  white-space: nowrap;
  display: flex;
  width: 100%;
  justify-content: left;
`

const CategoryFilter = ({ setFilter, classFilter, category, selections }) => {
  const [isOpen, toggleIsOpen] = useState(false)
  // const dropDownRef = useRef()

  function removeFromArray(array, item) {
    const index = array.indexOf(item)
    array.splice(index, 1)
    return array
  }

  function handleChange(category, selection) {
    const newSelections = []
    //if filter already has a key of category, check if the selection is in the array.. add it or take it out, and delete the key&array if it is now empty
    if (classFilter.hasOwnProperty([category])) {
      if (classFilter[category].includes(selection)) {
        removeFromArray(classFilter[category], selection)
        if (classFilter[category].length === 0) {
          delete classFilter[category]
        }
      } else {
        classFilter[category].push(selection)
      }
    }
    //filter does not already have a key of category... make one and put choice in the array.
    else {
      classFilter[category] = [selection]
    }

    setFilter((filter) =>
      Object.hasOwnProperty([category])
        ? { ...filter, [category]: newSelections }
        : { ...filter }
    )
  }

  function formatHeading(category) {
    if (category === 'competitiveLevel') {
      return 'Competitive Level'
    }
    if (category === 'ageDivision') {
      return 'Age Group'
    }
    return category
  }

  return (
    <CheckboxDiv>
      <FilterDropDownButton onClick={() => toggleIsOpen(!isOpen)}>
        {formatHeading(category)}
      </FilterDropDownButton>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.1 } }}
            // ref={dropDownRef}
          >
            <ul>
              {selections &&
                selections.map((selection) => {
                  return (
                    <li key={selection}>
                      <label>
                        <input
                          type='checkbox'
                          checked={
                            classFilter.hasOwnProperty([category]) &&
                            classFilter[category].includes(selection)
                          }
                          onChange={() => handleChange(category, selection)}
                        />
                        {selection}
                      </label>
                    </li>
                  )
                })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </CheckboxDiv>
  )
}

export default CategoryFilter
