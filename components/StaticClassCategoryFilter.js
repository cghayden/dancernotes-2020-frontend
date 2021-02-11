// on the class filter for mobile screens, the options are all viewable, not hidden in a dropdown for the cartegory as they are on a larger screen
import { useState, useRef } from 'react'
import styled from 'styled-components'

const CheckboxDiv = styled.div`
  background: ${(props) => props.theme.gray0};
  padding-left: 0.5rem;
  border-radius: 5px;

  li {
    padding: 0.25rem 0;
  }
`

const StaticClassCategoryFilter = ({
  setFilter,
  classFilter,
  category,
  selections,
}) => {
  const [isOpen, toggleIsOpen] = useState(false)
  const dropDownRef = useRef()

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
      <button onClick={() => toggleIsOpen(!isOpen)}>
        {formatHeading(category)}
      </button>

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
    </CheckboxDiv>
  )
}

export default StaticClassCategoryFilter
