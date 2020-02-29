import styled from "styled-components";

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

    setFilter(filter =>
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
      <h4 className="category-heading">{formatHeading(category)}</h4>
      <ul>
        {choices &&
          choices.map(choice => {
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
    </CheckboxDiv>
  );
};

export default CategoryFilter;
