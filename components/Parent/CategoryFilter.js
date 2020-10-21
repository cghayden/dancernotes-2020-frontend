import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
const CheckboxDiv = styled.div`
  .category-heading {
    text-transform: uppercase;
  }
  ul {
    padding: 1rem;
  }
  li {
    padding: 0.25rem 0;
  }
`;

const CategoryFilter = ({ setFilter, filter, category, choices }) => {
  const [isOpen, toggleIsOpen] = useState(false);

  function removeFromArray(array, item) {
    const index = array.indexOf(item);
    array.splice(index, 1);
    return array;
  }

  function handleChange(category, choice) {
    const oldChoices = filter[category];
    const newChoices = [];
    //if filter already has a key of category, check if the selection is in the array.. add it or take it out, and delete the key&array if it is now empty
    if (filter.hasOwnProperty([category])) {
      if (filter[category].includes(choice)) {
        removeFromArray(filter[category], choice);
        if (filter[category].length === 0) {
          delete filter[category];
        }
      } else {
        filter[category].push(choice);
      }
    }
    //filter does not already have a key of category... make one and put choice in the array.
    else {
      filter[category] = [choice];
    }

    setFilter((filter) =>
      Object.hasOwnProperty([category])
        ? { ...filter, [category]: newChoices }
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

  return (
    <CheckboxDiv>
      <button
        // role="button"
        // tabIndex="0"
        onClick={() => toggleIsOpen(!isOpen)}
        className="category-heading"
      >
        {formatHeading(category)}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            style={{ overflow: "hidden" }}
          >
            <ul>
              {choices &&
                choices.map((choice) => {
                  return (
                    <li key={choice}>
                      <input
                        type="checkbox"
                        checked={
                          filter.hasOwnProperty([category]) &&
                          filter[category].includes(choice)
                        }
                        onChange={() => handleChange(category, choice)}
                      />
                      <label>{choice}</label>
                    </li>
                  );
                })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </CheckboxDiv>
  );
};

export default CategoryFilter;
