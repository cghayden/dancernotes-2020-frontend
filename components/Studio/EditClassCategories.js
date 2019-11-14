import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { CATEGORIES_QUERY } from "./Queries";
import ClassCategoryList from "./ClassCategoryList";

const StyledClassCategories = styled.div`
  padding: 1rem;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
  justify-content: center;
  grid-gap: 20px;
  h3 {
    justify-self: center;
    grid-column: 1/-1;
  }

  h4 {
    text-align: center;
    font-size: 2rem;
    margin: 0;
  }
  input {
    max-width: 80%;
  }
`;

const EditClassCategories = () => {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);
  const studioCategories = data ? data.studioCategories : {};
  const categories = ["styles", "levels", "divisions"];
  if (loading) return <h1>5, 6, 7, 8...</h1>;
  if (error) return <Error error={error} />;
  return (
    <StyledClassCategories>
      {categories.map(cat => (
        <ClassCategoryList
          key={cat}
          category={cat}
          currentItems={studioCategories[cat]}
        />
      ))}
    </StyledClassCategories>
  );
};

export { CATEGORIES_QUERY };
export default EditClassCategories;
