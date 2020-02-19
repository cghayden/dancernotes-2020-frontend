import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import gql from "graphql-tag";
import { CATEGORIES_QUERY } from "./Queries";
import { STUDIO_USER_QUERY } from "./useStudio";
import XIcon from "../Icons/X";
import Card from "../styles/Card";
import Form from "../styles/Form";

//TODO - add optimistic return to add category to list
const CategoryCard = styled(Card)`
  min-width: unset;
  width: unset;
`;

const StyledDeleteButton = styled.button`
  height: 1.5em;
  width: 1.5em;
  padding: 0;
  margin: 0 1rem 0 0;
  border-radius: 50%;
  background: none;
  box-shadow: none;
  border: none;
  svg {
    pointer-events: none;
  }
`;

const StyledUl = styled.ul`
  li {
    display: flex;
    align-items: center;
    padding: 0.25rem 0;
  }
`;

const UPDATE_CATEGORY_MUTATION = gql`
  mutation UPDATE_CATEGORY_MUTATION($category: String!, $items: [String]!) {
    updateStudioClassCategory(category: $category, items: $items) {
      id
    }
  }
`;

function ClassCategoryList({ existingItems, category }) {
  const [newItems, setNewItems] = useState("");

  const [updateCategoryMutation, { loading, error }] = useMutation(
    UPDATE_CATEGORY_MUTATION,
    {
      refetchQueries: [
        { query: CATEGORIES_QUERY },
        { query: STUDIO_USER_QUERY }
      ]
    }
  );

  const regex = new RegExp(`,\s*`, "g");

  async function deleteItemFromCategoryList(e) {
    const newItems = existingItems.filter(item => item !== e.target.value);
    return await updateCategoryMutation({
      variables: {
        category,
        items: newItems
      }
    });
  }

  function formatCategoryHeading(category) {
    if (category === "styles") return "Styles";
    if (category === "ageDivisions") return "Age Divisions";
    if (category === "competitiveLevels") return "Competitive Levels";
  }

  const categoryHeading = formatCategoryHeading(category);

  return (
    <CategoryCard>
      <Form
        method="post"
        onSubmit={async e => {
          e.preventDefault(e);
          const newItemsArray = newItems.split(regex);
          const items = [...existingItems, ...newItemsArray];
          console.log("items:", items);
          await updateCategoryMutation({
            variables: { category, items }
          });
          setNewItems("");
        }}
      >
        <h4>{categoryHeading}</h4>

        <div className="card__section">
          <StyledUl>
            {existingItems.map(item => (
              <li key={item}>
                <StyledDeleteButton
                  value={item}
                  onClick={e => deleteItemFromCategoryList(e)}
                >
                  <XIcon />
                </StyledDeleteButton>{" "}
                {item}
              </li>
            ))}
          </StyledUl>
        </div>
        <fieldset>
          <div className="input-item">
            <label>
              {`Add ${categoryHeading.slice(0, -1)}(s), separated by a comma`}
            </label>
            <input
              // pattern="\S+"
              type="text"
              name="newItem"
              value={newItems}
              placeholder={`${categoryHeading.slice(0, -1)}s...`}
              onChange={e => setNewItems(e.target.value)}
            />
          </div>
          <div className="form-footer">
            <button type="submit" className="btn-action-primary">
              Add to Category
            </button>
          </div>
        </fieldset>
      </Form>
    </CategoryCard>
  );
}

export default ClassCategoryList;
