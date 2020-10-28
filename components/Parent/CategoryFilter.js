import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
const CheckboxDiv = styled.div`
  .category-heading {
    text-transform: uppercase;
  }
  li {
    padding: 0.25rem 0;
  }
`;

const CategoryFilter = ({ setFilter, classFilter, category, selections }) => {
  const [isOpen, toggleIsOpen] = useState(false);
  const dropDownRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keyup", handleEscKey);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keyup", handleEscKey);
    };
  }, []);

  function handleEscKey(e) {
    if (e.key === "Escape") toggleIsOpen(false);
  }
  function handleClickOutside(e) {
    if (!dropDownRef?.current?.contains(e.target)) {
      toggleIsOpen(false);
    }
  }

  function removeFromArray(array, item) {
    const index = array.indexOf(item);
    array.splice(index, 1);
    return array;
  }

  function handleChange(category, selection) {
    // const oldChoices = filter[category];
    const newSelections = [];
    //if filter already has a key of category, check if the selection is in the array.. add it or take it out, and delete the key&array if it is now empty
    if (classFilter.hasOwnProperty([category])) {
      if (classFilter[category].includes(selection)) {
        removeFromArray(classFilter[category], selection);
        if (classFilter[category].length === 0) {
          delete classFilter[category];
        }
      } else {
        classFilter[category].push(selection);
      }
    }
    //filter does not already have a key of category... make one and put choice in the array.
    else {
      classFilter[category] = [selection];
    }

    setFilter((filter) =>
      Object.hasOwnProperty([category])
        ? { ...filter, [category]: newSelections }
        : { ...filter }
    );
  }

  function formatHeading(category) {
    if (category === "competitiveLevel") {
      return "Competitive Level";
    }
    if (category === "ageDivision") {
      return "Age Group";
    }
    return category;
  }

  const FilterDropDownButton = styled.button`
    position: "relative";
    pointer-events: ${(props) => (props.ignoreClick ? "none" : "auto")};
  `;

  return (
    <CheckboxDiv>
      <button
        onClick={() => toggleIsOpen(!isOpen)}
        className="category-heading"
      >
        {formatHeading(category)}
      </button>
      <AnimatePresence>
        {isOpen && (
          <MotionContainer
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            ref={dropDownRef}
          >
            <ul>
              {selections &&
                selections.map((selection) => {
                  return (
                    <li key={selection}>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            classFilter.hasOwnProperty([category]) &&
                            classFilter[category].includes(selection)
                          }
                          onChange={() => handleChange(category, selection)}
                        />
                        {selection}
                      </label>
                    </li>
                  );
                })}
            </ul>
          </MotionContainer>
        )}
      </AnimatePresence>
    </CheckboxDiv>
  );
};

export default CategoryFilter;
